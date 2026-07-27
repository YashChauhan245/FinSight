import { currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";
import { seedTransactionsForUser } from "@/actions/seed";

export const checkUser = async () => {
  try {
    const user = await currentUser();

    if (!user) {
      return null;
    }

    let loggedInUser = await db.user.findUnique({
      where: {
        clerkUserId: user.id,
      },
      include: {
        _count: { select: { accounts: true } },
      },
    });

    if (!loggedInUser) {
      const name = `${user.firstName || ''} ${user.lastName || ''}`.trim() || "User";

      loggedInUser = await db.user.create({
        data: {
          clerkUserId: user.id,
          name,
          imageUrl: user.imageUrl,
          email: user.emailAddresses[0]?.emailAddress || "",
        },
        include: {
          _count: { select: { accounts: true } },
        },
      });
    }

    // Auto-seed account, budget, and transactions if user has no accounts yet
    if (loggedInUser && loggedInUser._count.accounts === 0) {
      await seedTransactionsForUser(loggedInUser.id).catch((err) =>
        console.error("Auto-seed error in checkUser:", err)
      );
    }

    return loggedInUser;
  } catch (error) {
    if (error?.digest === "DYNAMIC_SERVER_USAGE" || error?.message?.includes("Dynamic server usage")) {
      throw error;
    }
    // Return null cleanly if Clerk auth context is not active for static/internal asset requests
    return null;
  }
};