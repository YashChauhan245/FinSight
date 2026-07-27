"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { sendEmail } from "@/actions/send-email";
import EmailTemplate from "@/emails/template";

export async function sendBudgetAlertEmail() {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
      include: {
        accounts: { where: { isDefault: true } },
      },
    });

    if (!user) throw new Error("User not found");

    const budget = await db.budget.findFirst({
      where: { userId: user.id },
    });

    if (!budget) {
      return { success: false, error: "No budget set. Please set a monthly budget first." };
    }

    const defaultAccount = user.accounts[0];
    if (!defaultAccount) {
      return { success: false, error: "No default account found." };
    }

    // Calculate current month's expenses for default account
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const expenses = await db.transaction.aggregate({
      where: {
        userId: user.id,
        accountId: defaultAccount.id,
        type: "EXPENSE",
        date: { gte: startOfMonth },
      },
      _sum: { amount: true },
    });

    const totalExpenses = expenses._sum.amount?.toNumber() || 0;
    const budgetAmount = budget.amount.toNumber();
    const percentageUsed = (totalExpenses / budgetAmount) * 100;

    if (percentageUsed < 50) {
      return {
        success: false,
        error: `Budget is only ${percentageUsed.toFixed(1)}% used. Alert emails are sent when usage is above 50%.`,
      };
    }

    const result = await sendEmail({
      to: user.email,
      subject: `Budget Alert — ${percentageUsed.toFixed(1)}% Used This Month`,
      react: EmailTemplate({
        userName: user.name,
        type: "budget-alert",
        data: {
          percentageUsed,
          budgetAmount: budgetAmount.toFixed(1),
          totalExpenses: totalExpenses.toFixed(1),
          accountName: defaultAccount.name,
        },
      }),
    });

    if (!result.success) {
      return { success: false, error: "Failed to send email. Check your Resend API key." };
    }

    return { success: true };
  } catch (error) {
    console.error("Send budget alert error:", error);
    return { success: false, error: error.message };
  }
}
