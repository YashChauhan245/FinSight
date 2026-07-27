import { getUserAccounts } from "@/actions/dashboard";
import { defaultCategories } from "@/data/categories";
import { AddTransactionForm } from "../_components/transaction-form";
import { getTransaction } from "@/actions/transaction";

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
    <div className="max-w-3xl mx-auto px-5 pb-16 font-inter text-left">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 font-inter">
          {editId ? "Edit Transaction" : "Add Transaction"}
        </h1>
        <p className="text-xs text-gray-500 mt-1 font-medium">
          {editId
            ? "Update the details of your transaction below."
            : "Record a new income or expense to keep your finances up to date."}
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