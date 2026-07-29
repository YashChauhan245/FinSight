"use server";

import { checkUser } from "@/lib/checkUser";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { GoogleGenerativeAI } from "@google/generative-ai";
import aj from "@/lib/arcjet";
import { request } from "@arcjet/next";
import fs from "fs";

function getGeminiApiKey() {
  try {
    if (fs.existsSync(".env")) {
      const envContent = fs.readFileSync(".env", "utf8");
      const lines = envContent.split("\n");
      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith("GEMINI_API_KEY=")) {
          const val = trimmed.replace("GEMINI_API_KEY=", "").trim();
          if (val) return val;
        }
      }
    }
  } catch (e) {}
  return process.env.GEMINI_API_KEY || "";
}

const serializeAmount = (obj) => ({
  ...obj,
  amount: typeof obj.amount?.toNumber === "function" ? obj.amount.toNumber() : Number(obj.amount) || 0,
});

// Create Transaction
export async function createTransaction(data) {
  try {
    const user = await checkUser();
    if (!user) throw new Error("Unauthorized");

    // Protect via Arcjet if key is configured
    if (process.env.ARCJET_KEY && aj) {
      try {
        const req = await request();
        const decision = await aj.protect(req, {
          userId: user.id,
          requested: 1,
        });

        if (decision.isDenied()) {
          if (decision.reason.isRateLimit()) {
            throw new Error("Too many requests. Please try again later.");
          }
          throw new Error("Request blocked by security rules");
        }
      } catch (arcjetErr) {
        if (arcjetErr.message?.includes("Too many requests")) {
          throw arcjetErr;
        }
        console.warn("Arcjet protection warning bypassed:", arcjetErr?.message);
      }
    }

    const account = await db.account.findUnique({
      where: {
        id: data.accountId,
        userId: user.id,
      },
    });

    if (!account) {
      throw new Error("Account not found. Please select a valid account.");
    }

    const numAmount = parseFloat(data.amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      throw new Error("Please enter a valid amount greater than 0");
    }

    const txDate = data.date ? new Date(data.date) : new Date();

    // Calculate new balance
    const balanceChange = data.type === "EXPENSE" ? -numAmount : numAmount;
    const currentBalance = typeof account.balance?.toNumber === "function"
      ? account.balance.toNumber()
      : Number(account.balance) || 0;
    const newBalance = currentBalance + balanceChange;

    // Create transaction and update account balance
    const transaction = await db.$transaction(async (tx) => {
      const newTransaction = await tx.transaction.create({
        data: {
          ...data,
          amount: numAmount,
          date: txDate,
          userId: user.id,
          nextRecurringDate:
            data.isRecurring && data.recurringInterval
              ? calculateNextRecurringDate(txDate, data.recurringInterval)
              : null,
        },
      });

      await tx.account.update({
        where: { id: data.accountId },
        data: { balance: newBalance },
      });

      return newTransaction;
    });

    revalidatePath("/dashboard");
    revalidatePath(`/account/${transaction.accountId}`);

    return { success: true, data: serializeAmount(transaction) };
  } catch (error) {
    console.error("Create transaction error details:", error);
    throw new Error(error.message || "Failed to create transaction");
  }
}

export async function getTransaction(id) {
  const user = await checkUser();
  if (!user) throw new Error("Unauthorized");

  const transaction = await db.transaction.findUnique({
    where: {
      id,
      userId: user.id,
    },
  });

  if (!transaction) throw new Error("Transaction not found");

  return serializeAmount(transaction);
}

export async function updateTransaction(id, data) {
  try {
    const user = await checkUser();
    if (!user) throw new Error("Unauthorized");

    // Get original transaction to calculate balance change
    const originalTransaction = await db.transaction.findUnique({
      where: {
        id,
        userId: user.id,
      },
      include: {
        account: true,
      },
    });

    if (!originalTransaction) throw new Error("Transaction not found");

    const numAmount = parseFloat(data.amount) || 0;
    const oldAmount = typeof originalTransaction.amount?.toNumber === "function"
      ? originalTransaction.amount.toNumber()
      : Number(originalTransaction.amount) || 0;

    // Calculate balance changes
    const oldBalanceChange =
      originalTransaction.type === "EXPENSE"
        ? -oldAmount
        : oldAmount;

    const newBalanceChange =
      data.type === "EXPENSE" ? -numAmount : numAmount;

    const netBalanceChange = newBalanceChange - oldBalanceChange;
    const txDate = data.date ? new Date(data.date) : new Date();

    // Update transaction and account balance in a transaction
    const transaction = await db.$transaction(async (tx) => {
      const updated = await tx.transaction.update({
        where: {
          id,
          userId: user.id,
        },
        data: {
          ...data,
          amount: numAmount,
          date: txDate,
          nextRecurringDate:
            data.isRecurring && data.recurringInterval
              ? calculateNextRecurringDate(txDate, data.recurringInterval)
              : null,
        },
      });

      // Update account balance
      await tx.account.update({
        where: { id: data.accountId },
        data: {
          balance: {
            increment: netBalanceChange,
          },
        },
      });

      return updated;
    });

    revalidatePath("/dashboard");
    revalidatePath(`/account/${data.accountId}`);

    return { success: true, data: serializeAmount(transaction) };
  } catch (error) {
    console.error("Update transaction error details:", error);
    throw new Error(error.message || "Failed to update transaction");
  }
}

// Get User Transactions
export async function getUserTransactions(query = {}) {
  try {
    const user = await checkUser();
    if (!user) throw new Error("Unauthorized");

    const transactions = await db.transaction.findMany({
      where: {
        userId: user.id,
        ...query,
      },
      include: {
        account: true,
      },
      orderBy: {
        date: "desc",
      },
    });

    return { success: true, data: transactions };
  } catch (error) {
    throw new Error(error.message);
  }
}

// Scan Receipt
export async function scanReceipt(file) {
  try {
    const apiKey = getGeminiApiKey();
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is missing in .env");
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    // Convert File to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    // Convert ArrayBuffer to Base64
    const base64String = Buffer.from(arrayBuffer).toString("base64");

    const prompt = `
      Analyze this receipt image and extract the following information in JSON format:
      - Total amount (just the number)
      - Date (in ISO format)
      - Description or items purchased (brief summary)
      - Merchant/store name
      - Suggested category (one of: housing,transportation,groceries,utilities,entertainment,food,shopping,healthcare,education,personal,travel,insurance,gifts,bills,other-expense )
      
      Only respond with valid JSON in this exact format:
      {
        "amount": number,
        "date": "ISO date string",
        "description": "string",
        "merchantName": "string",
        "category": "string"
      }

      If its not a receipt, return an empty object
    `;

    const modelsToTry = [
      "gemini-2.5-flash",
      "gemini-2.0-flash",
      "gemini-2.0-flash-lite",
      "gemini-1.5-flash-8b"
    ];

    let result = null;
    let lastErr = "";

    for (const modelName of modelsToTry) {
      try {
        const model = genAI.getGenerativeModel({ model: modelName });
        result = await model.generateContent([
          {
            inlineData: {
              data: base64String,
              mimeType: file.type || "image/jpeg",
            },
          },
          prompt,
        ]);
        if (result) break;
      } catch (err) {
        lastErr = err?.message || String(err);
        console.warn(`Receipt scan model ${modelName} failed:`, lastErr);
      }
    }

    if (!result) {
      throw new Error(`Receipt scan error: ${lastErr}`);
    }

    const response = await result.response;
    const text = response.text();
    const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();

    try {
      const data = JSON.parse(cleanedText);
      return {
        amount: parseFloat(data.amount) || 0,
        date: data.date ? new Date(data.date) : new Date(),
        description: data.description || "",
        category: data.category || "other-expense",
        merchantName: data.merchantName || "",
      };
    } catch (parseError) {
      console.error("Error parsing JSON response:", parseError);
      throw new Error("Invalid response format from Gemini");
    }
  } catch (error) {
    console.error("Error scanning receipt:", error);
    throw new Error(error.message || "Failed to scan receipt");
  }
}

// Helper function to calculate next recurring date
function calculateNextRecurringDate(startDate, interval) {
  const date = new Date(startDate);

  switch (interval) {
    case "DAILY":
      date.setDate(date.getDate() + 1);
      break;
    case "WEEKLY":
      date.setDate(date.getDate() + 7);
      break;
    case "MONTHLY":
      date.setMonth(date.getMonth() + 1);
      break;
    case "YEARLY":
      date.setFullYear(date.getFullYear() + 1);
      break;
  }

  return date;
}