import { auth } from "@/auth";
import { db } from "./prisma";
import { seedTransactionsForUser } from "@/actions/seed";

export const checkUser = async () => {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return null;
    }

    let loggedInUser = await db.user.findUnique({
      where: {
        email: session.user.email,
      },
      include: {
        _count: { select: { accounts: true } },
      },
    });

    if (!loggedInUser) {
      const name = session.user.name || "User";

      loggedInUser = await db.user.create({
        data: {
          email: session.user.email,
          name,
          imageUrl: session.user.image || "",
        },
        include: {
          _count: { select: { accounts: true } },
        },
      });
    }

    // Fire auto-seeding asynchronously in the background so sign in responds instantly
    if (loggedInUser && loggedInUser._count.accounts === 0) {
      seedTransactionsForUser(loggedInUser.id).catch((err) =>
        console.error("Auto-seed background error in checkUser:", err)
      );
    }

    return loggedInUser;
  } catch (error) {
    if (error?.digest === "DYNAMIC_SERVER_USAGE" || error?.message?.includes("Dynamic server usage")) {
      throw error;
    }
    console.error("Error in checkUser:", error);
    return null;
  }
};