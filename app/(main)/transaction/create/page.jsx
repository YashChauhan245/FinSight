import { getUserAccounts } from "@/actions/dashboard";
import { defaultCategories } from "@/data/categories";
import { AddTransactionForm } from "../_components/transaction-form";
import { getTransaction } from "@/actions/transaction";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AddTransactionPage({ searchParams }) {
  const accounts = await getUserAccounts();
  const { edit } = await searchParams;
  const editId = edit;

  let initialData = null;
  if (editId) {
    const transaction = await getTransaction(editId);
    initialData = transaction;
  }

  return (
    <div className="mx-auto max-w-4xl space-y-5">
      <div>
        <Link href="/dashboard#transactions" className="text-sm font-medium text-primary hover:underline">Back to transactions</Link>
        <h1 className="mt-3 font-serif text-4xl font-normal tracking-tight sm:text-5xl">
          {editId ? "Edit transaction" : "Add transaction"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {editId
            ? "Update the details of a recorded transaction."
            : "Record an expense or income in your workspace."}
        </p>
      </div>
      <AddTransactionForm
        accounts={accounts}
        categories={defaultCategories}
        editMode={!!editId}
        initialData={initialData}
      />
    </div>
  );
}
