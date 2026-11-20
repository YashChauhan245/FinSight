"use client";

import {
  CreditCard,
  Landmark,
  Wallet2,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useEffect } from "react";
import useFetch from "@/hooks/use-fetch";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { updateDefaultAccount } from "@/actions/account";
import { toast } from "sonner";

const ACCOUNT_ICONS = {
  SAVINGS: Landmark,
  CURRENT: CreditCard,
  CREDIT: CreditCard,
  WALLET: Wallet2,
};

export function AccountCard({ account }) {
  const { name, type, balance, id, isDefault } = account;

  const AccountIcon = ACCOUNT_ICONS[type] || CreditCard;

  const {
    loading: updateDefaultLoading,
    fn: updateDefaultFn,
    data: updatedAccount,
    error,
  } = useFetch(updateDefaultAccount);

  const handleDefaultChange = async (event) => {
    event.preventDefault();
    if (isDefault) {
      toast.warning("You need at least 1 default account");
      return;
    }
    await updateDefaultFn(id);
  };

  useEffect(() => {
    if (updatedAccount?.success) {
      toast.success("Default account updated successfully");
    }
  }, [updatedAccount]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to update default account");
    }
  }, [error]);

  return (
    <Card className="overflow-hidden">
      <Link href={"/account/" + id} className="block rounded-t-lg hover:bg-muted focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring">
        <CardHeader className="flex flex-row items-center gap-3 space-y-0 pb-3">
          <span className="grid size-9 shrink-0 place-items-center rounded-md bg-secondary text-secondary-foreground">
            <AccountIcon className="size-4" />
          </span>
          <div className="min-w-0">
            <CardTitle className="break-words">{name}</CardTitle>
            <p className="text-xs capitalize text-muted-foreground">{type.toLowerCase()} account</p>
          </div>
        </CardHeader>
        <CardContent className="pb-4">
          <p className="break-words font-serif text-2xl tracking-tight tabular-nums">
            ₹{Number(balance).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">{account._count?.transactions || 0} transactions</p>
        </CardContent>
      </Link>
      <div className="flex items-center justify-between gap-2 border-t px-5 py-3 sm:px-6">
        <span className="text-sm text-muted-foreground">Default account</span>
        <Switch
          aria-label={"Use " + name + " as the default account"}
          checked={isDefault}
          onClick={handleDefaultChange}
          disabled={updateDefaultLoading}
        />
      </div>
    </Card>
  );
}
