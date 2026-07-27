"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";

const parseAmt = (val) => {
  if (val == null) return 0;
  if (typeof val === "number") return val;
  if (typeof val?.toNumber === "function") return val.toNumber();
  return Number(val) || 0;
};

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

export async function getAIFinanceInsight(query) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");

    // Fetch last 90 days of transactions for context
    const since = new Date();
    since.setDate(since.getDate() - 90);

    const transactions = await db.transaction.findMany({
      where: {
        userId: user.id,
        date: { gte: since },
      },
      orderBy: { date: "desc" },
      take: 100,
    });

    // Fetch budget
    const budget = await db.budget.findFirst({
      where: { userId: user.id },
    });

    // Build financial summary
    const totalIncome = transactions
      .filter((t) => t.type === "INCOME")
      .reduce((sum, t) => sum + parseAmt(t.amount), 0);

    const totalExpense = transactions
      .filter((t) => t.type === "EXPENSE")
      .reduce((sum, t) => sum + parseAmt(t.amount), 0);

    const byCategory = transactions
      .filter((t) => t.type === "EXPENSE")
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + parseAmt(t.amount);
        return acc;
      }, {});

    const topCategories = Object.entries(byCategory)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([cat, amt]) => `${cat}: Rs ${amt.toFixed(0)}`)
      .join(", ");

    const currentMonthExpenses = transactions
      .filter((t) => {
        const d = new Date(t.date);
        const now = new Date();
        return (
          t.type === "EXPENSE" &&
          d.getMonth() === now.getMonth() &&
          d.getFullYear() === now.getFullYear()
        );
      })
      .reduce((sum, t) => sum + parseAmt(t.amount), 0);

    const budgetAmount = budget ? parseAmt(budget.amount) : null;
    const budgetUsed = budgetAmount && budgetAmount > 0
      ? ((currentMonthExpenses / budgetAmount) * 100).toFixed(1)
      : null;

    const recentTxSummary = transactions
      .slice(0, 10)
      .map(
        (t) =>
          `${t.type === "EXPENSE" ? "-" : "+"}Rs ${parseAmt(t.amount).toFixed(0)} (${t.category}) on ${new Date(t.date).toLocaleDateString("en-IN")}: ${t.description || "no description"}`
      )
      .join("\n");

    const systemPrompt = `You are FinSight, a smart AI financial assistant built into a personal finance app.
You have access to the user's real financial data. Analyze it and give actionable, concise advice.

USER FINANCIAL SUMMARY (Last 90 days):
- Total Income: Rs ${totalIncome.toFixed(0)}
- Total Expenses: Rs ${totalExpense.toFixed(0)}
- Net Savings: Rs ${(totalIncome - totalExpense).toFixed(0)}
- Top Expense Categories: ${topCategories || "No expenses recorded"}
- Current Month Expenses: Rs ${currentMonthExpenses.toFixed(0)}
${budgetAmount ? `- Monthly Budget: Rs ${budgetAmount.toFixed(0)} (${budgetUsed}% used)` : "- No monthly budget set"}

RECENT TRANSACTIONS:
${recentTxSummary || "No recent transactions"}

IMPORTANT RULES:
- Be concise (2-4 sentences max)
- Use Rs currency (Indian Rupees)
- Give specific, actionable advice based on the actual data above
- If data is empty, acknowledge it and suggest getting started by adding transactions or accounts
- Be friendly and conversational, not robotic
- Never make up numbers not present in the data above`;

    const fullPrompt = `${systemPrompt}\n\nUser Question: ${query}`;

    // Read the fresh API key dynamically
    const apiKey = getGeminiApiKey();
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined in .env file.");
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    const modelsToTry = [
      "gemini-2.5-flash",
      "gemini-2.0-flash",
      "gemini-2.0-flash-lite",
      "gemini-1.5-flash-8b",
      "gemini-2.5-pro",
    ];

    let responseText = null;
    let lastErr = "";

    for (const modelName of modelsToTry) {
      try {
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent(fullPrompt);
        const res = await result.response;
        responseText = res.text();
        if (responseText) break;
      } catch (err) {
        lastErr = err?.message || String(err);
        console.warn(`Model ${modelName} failed:`, lastErr);
        if (lastErr.includes("API_KEY_INVALID") || lastErr.includes("API key not valid")) {
          throw err;
        }
      }
    }

    if (!responseText) {
      throw new Error(lastErr || "Failed to generate content from Gemini models.");
    }

    return { success: true, answer: responseText };
  } catch (error) {
    console.error("AI insight error details:", error);
    const msg = error?.message || String(error);

    if (msg.includes("API_KEY_INVALID") || msg.includes("API key not valid")) {
      return {
        success: false,
        answer: "Your GEMINI_API_KEY in .env is invalid or expired. Please create a new key at https://aistudio.google.com/app/apikey and save your .env file.",
      };
    }

    return {
      success: false,
      answer: `Gemini API Error: ${msg}`,
    };
  }
}
