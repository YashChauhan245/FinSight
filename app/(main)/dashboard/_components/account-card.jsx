"use client";

import {
  ArrowUpRight,
  ArrowDownRight,
  CreditCard,
  Landmark,
  Wallet2,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useEffect } from "react";
import useFetch from "@/hooks/use-fetch";
import {
  Card,
  CardContent,
  CardFooter,
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
    <Card
      className={`hover:shadow-lg transition-all duration-300 border bg-white rounded-2xl group relative overflow-hidden ${
        isDefault ? "border-violet-200 shadow-sm shadow-violet-100" : "border-slate-200"
      }`}
    >
      {/* Hover gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/0 to-cyan-500/0 group-hover:from-violet-500/5 group-hover:to-cyan-500/5 transition-all duration-300 rounded-2xl pointer-events-none" />

      <Link href={`/account/${id}`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 p-5 pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-slate-100 text-slate-600 group-hover:bg-violet-100 group-hover:text-violet-700 transition-all duration-200">
              <AccountIcon className="h-4 w-4" />
            </div>
            <div>
              <CardTitle className="text-sm font-bold tracking-tight text-slate-900 capitalize font-manrope">
                {name}
              </CardTitle>
              <span className="text-[11px] text-slate-400 font-inter">
                {type.charAt(0) + type.slice(1).toLowerCase()} Account
              </span>
            </div>
          </div>

          <div
            className="flex items-center gap-2"
            onClick={(e) => e.stopPropagation()}
          >
            {isDefault && (
              <Badge
                variant="outline"
                className="text-[10px] bg-violet-50 text-violet-700 border-violet-200 font-bold"
              >
                Default
              </Badge>
            )}
            <Switch
              checked={isDefault}
              onClick={handleDefaultChange}
              disabled={updateDefaultLoading}
              className="data-[state=checked]:bg-violet-600 scale-90"
            />
          </div>
        </CardHeader>

        <CardContent className="px-5 pb-3">
          <div className="text-2xl font-extrabold text-slate-900 font-inter tracking-tight">
            Rs{" "}
            {parseFloat(balance).toLocaleString("en-IN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
          <p className="text-xs text-slate-400 mt-0.5 font-inter">
            {account._count?.transactions || 0} transactions
          </p>
        </CardContent>

        <CardFooter className="flex justify-between items-center text-xs px-5 pb-5 pt-3 border-t border-slate-100 font-inter">
          <div className="flex items-center text-emerald-600 font-semibold gap-1">
            <ArrowUpRight className="h-3.5 w-3.5" />
            Income Tracked
          </div>
          <div className="flex items-center text-rose-500 font-semibold gap-1">
            <ArrowDownRight className="h-3.5 w-3.5" />
            Expenses Tracked
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
}