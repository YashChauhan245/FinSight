import { getUserAccounts, getDashboardData } from "@/actions/dashboard";
import { getCurrentBudget } from "@/actions/budget";
import { checkUser } from "@/lib/checkUser";
import { DashboardClient } from "./_components/dashboard-client";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  // Ensure user exists in DB (moved here from Header for performance)
  await checkUser().catch(() => null);

  const [accountsRes, transactionsRes] = await Promise.all([
    getUserAccounts().catch(() => []),
    getDashboardData().catch(() => []),
  ]);

  const accounts = accountsRes || [];
  const transactions = transactionsRes || [];

  const defaultAccount = accounts?.find((account) => account.isDefault) || accounts?.[0];

  let budgetData = null;
  if (defaultAccount) {
    budgetData = await getCurrentBudget(defaultAccount.id).catch(() => null);
  }

  return (
    <DashboardClient
      accounts={accounts}
      transactions={transactions || []}
      budgetData={budgetData}
    />
  );
}