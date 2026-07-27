import { Suspense } from "react";
import { getAccountWithTransactions } from "@/actions/account";
import { BarLoader } from "react-spinners";
import { TransactionTable } from "../_components/transaction-table";
import { notFound } from "next/navigation";
import { AccountChart } from "../_components/account-chart";

export default async function AccountPage({ params }) {
  const { id } = await params;
  const accountData = await getAccountWithTransactions(id);

  if (!accountData) {
    notFound();
  }

  const { transactions, ...account } = accountData;

  return (
    <div className="space-y-8 px-5 font-inter">
      <div className="flex gap-4 items-end justify-between text-left">
        <div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 capitalize font-inter">
            {account.name}
          </h1>
          <p className="text-sm text-gray-500 font-medium mt-1">
            {account.type.charAt(0) + account.type.slice(1).toLowerCase()}{" "}
            Account
          </p>
        </div>

        <div className="text-right pb-1">
          <div className="text-xl sm:text-2xl font-bold text-gray-900 tabular-nums">
            ₹{parseFloat(account.balance).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
          </div>
          <p className="text-xs text-gray-500 font-medium mt-0.5">
            {account._count.transactions} Transactions
          </p>
        </div>
      </div>

      {/* Chart Section */}
      <Suspense
        fallback={<BarLoader className="mt-4" width={"100%"} color="#6366f1" />}
      >
        <AccountChart transactions={transactions} />
      </Suspense>

      {/* Transactions Table */}
      <Suspense
        fallback={<BarLoader className="mt-4" width={"100%"} color="#6366f1" />}
      >
        <TransactionTable transactions={transactions} />
      </Suspense>
    </div>
  );
}