"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

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
      .reduce((sum, t) => sum + t.amount.toNumber(), 0);

    const totalExpense = transactions
      .filter((t) => t.type === "EXPENSE")
      .reduce((sum, t) => sum + t.amount.toNumber(), 0);

    const byCategory = transactions
      .filter((t) => t.type === "EXPENSE")
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount.toNumber();
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
      .reduce((sum, t) => sum + t.amount.toNumber(), 0);

    const budgetAmount = budget ? budget.amount.toNumber() : null;
    const budgetUsed = budgetAmount
      ? ((currentMonthExpenses / budgetAmount) * 100).toFixed(1)
      : null;

    const recentTxSummary = transactions
      .slice(0, 10)
      .map(
        (t) =>
          `${t.type === "EXPENSE" ? "-" : "+"}Rs ${t.amount.toNumber().toFixed(0)} (${t.category}) on ${new Date(t.date).toLocaleDateString("en-IN")}: ${t.description || "no description"}`
      )
      .join("\n");

    const systemPrompt = `You are FinSight, a smart AI financial assistant built into a personal finance app.
You have access to the user's real financial data. Analyze it and give actionable, concise advice.

USER FINANCIAL SUMMARY (Last 90 days):
- Total Income: Rs ${totalIncome.toFixed(0)}
- Total Expenses: Rs ${totalExpense.toFixed(0)}
- Net Savings: Rs ${(totalIncome - totalExpense).toFixed(0)}
- Top Expense Categories: ${topCategories || "No expenses yet"}
- Current Month Expenses: Rs ${currentMonthExpenses.toFixed(0)}
${budgetAmount ? `- Monthly Budget: Rs ${budgetAmount.toFixed(0)} (${budgetUsed}% used)` : "- No monthly budget set"}

RECENT TRANSACTIONS:
${recentTxSummary || "No recent transactions"}

IMPORTANT RULES:
- Be concise (2-4 sentences max)
- Use Rs currency (Indian Rupees)
- Give specific, actionable advice based on the actual data above
- If data is empty, acknowledge it and suggest getting started
- Be friendly and conversational, not robotic
- Never make up numbers not present in the data above`;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent([
      { role: "user", parts: [{ text: systemPrompt + "\n\nUser question: " + query }] },
    ]);

    const response = await result.response;
    return { success: true, answer: response.text() };
  } catch (error) {
    console.error("AI insight error:", error);
    return {
      success: false,
      answer:
        "Sorry, I couldn't analyze your finances right now. Please try again in a moment.",
    };
  }
}
