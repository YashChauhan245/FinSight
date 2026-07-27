import { getUserAccounts, getDashboardData } from "@/actions/dashboard";
import { getCurrentBudget } from "@/actions/budget";
import { DashboardClient } from "./_components/dashboard-client";

export default async function DashboardPage() {
  const accounts = (await getUserAccounts()) || [];
  const transactions = (await getDashboardData()) || [];

  const defaultAccount = accounts?.find((account) => account.isDefault);

  // Get budget for default account
  let budgetData = null;
  if (defaultAccount) {
    budgetData = await getCurrentBudget(defaultAccount.id);
  }

  return (
    <DashboardClient
      accounts={accounts}
      transactions={transactions || []}
      budgetData={budgetData}
    />
  );
}