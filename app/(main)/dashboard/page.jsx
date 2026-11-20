import { getUserAccounts, getDashboardData } from "@/actions/dashboard";
import { getCurrentBudget } from "@/actions/budget";
import { DashboardClient } from "./_components/dashboard-client";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [accounts, transactions] = await Promise.all([
    getUserAccounts(),
    getDashboardData(),
  ]);
  const defaultAccount = accounts.find((account) => account.isDefault) || accounts[0];
  const budgetData = defaultAccount ? await getCurrentBudget(defaultAccount.id) : null;

  return (
    <DashboardClient
      accounts={accounts}
      transactions={transactions}
      budgetData={budgetData}
    />
  );
}
