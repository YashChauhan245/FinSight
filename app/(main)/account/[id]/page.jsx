import { Suspense } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
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
    <div className="space-y-5">
      <Link href="/dashboard#accounts" className="inline-block text-sm font-medium text-primary hover:underline">All accounts</Link>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="break-words font-serif text-4xl font-normal tracking-tight sm:text-5xl">
            {account.name}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {account.type.charAt(0) + account.type.slice(1).toLowerCase()}{" "}
            Account
          </p>
        </div>

        <Button asChild><Link href="/transaction/create"><Plus /> Add transaction</Link></Button>
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)]">
        <Suspense fallback={<BarLoader className="mt-4" width="100%" color="hsl(var(--primary))" />}>
          <AccountChart transactions={transactions} />
        </Suspense>
        <dl className="self-start rounded-lg bg-ledger p-5 text-ledger-foreground sm:p-6">
          <dt className="text-sm text-ledger-muted">Account balance</dt>
          <dd className="mt-1 break-words font-serif text-3xl tracking-tight tabular-nums sm:text-4xl">
            ₹{Number(account.balance).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
          </dd>
          <dd className="mt-1 text-sm text-ledger-muted">
            {account._count.transactions} {account._count.transactions === 1 ? "transaction" : "transactions"}
          </dd>
        </dl>
      </div>

      {/* Transactions Table */}
      <Suspense
        fallback={<BarLoader className="mt-4" width="100%" color="hsl(var(--primary))" />}
      >
        <section className="min-w-0 rounded-lg border bg-card p-4 sm:p-5">
          <h2 className="mb-3 font-semibold tracking-tight">Account activity</h2>
          <TransactionTable transactions={transactions} />
        </section>
      </Suspense>
    </div>
  );
}
