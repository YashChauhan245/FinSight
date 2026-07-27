"use client";

import {
  ArrowUpRight,
  ArrowDownRight,
  CreditCard,
  Landmark,
  Wallet2,
  CheckCircle2,
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

const ACCOUNT_STYLES = {
  SAVINGS: "from-emerald-500/10 via-teal-500/5 to-transparent border-emerald-200/60 text-emerald-700",
  CURRENT: "from-blue-500/10 via-indigo-500/5 to-transparent border-blue-200/60 text-blue-700",
  CREDIT: "from-violet-500/10 via-purple-500/5 to-transparent border-violet-200/60 text-violet-700",
  WALLET: "from-amber-500/10 via-orange-500/5 to-transparent border-amber-200/60 text-amber-700",
};

export function AccountCard({ account }) {
  const { name, type, balance, id, isDefault } = account;

  const AccountIcon = ACCOUNT_ICONS[type] || CreditCard;
  const badgeStyle = ACCOUNT_STYLES[type] || ACCOUNT_STYLES.SAVINGS;

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
      className={`hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 border bg-white/90 backdrop-blur-md rounded-2xl group relative overflow-hidden font-jakarta ${
        isDefault
          ? "border-violet-300 shadow-md shadow-violet-500/10 ring-1 ring-violet-500/20"
          : "border-slate-200/90 shadow-sm"
      }`}
    >
      {/* Ambient background card gradient glow */}
      <div className={`absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl ${badgeStyle} opacity-60 rounded-bl-full pointer-events-none transition-opacity group-hover:opacity-90`} />

      <Link href={`/account/${id}`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 p-5 pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-slate-100/90 border border-slate-200/80 text-slate-700 group-hover:bg-violet-600 group-hover:text-white group-hover:border-violet-600 transition-all duration-200 shadow-sm">
              <AccountIcon className="h-4 w-4" />
            </div>
            <div className="text-left">
              <CardTitle className="text-sm font-bold tracking-tight text-slate-900 capitalize font-jakarta">
                {name}
              </CardTitle>
              <span className="text-[11px] font-medium text-slate-400">
                {type.charAt(0) + type.slice(1).toLowerCase()} Account
              </span>
            </div>
          </div>

          <div
            className="flex items-center gap-2 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {isDefault && (
              <Badge
                variant="outline"
                className="text-[10px] bg-violet-100/80 text-violet-700 border-violet-200/80 font-bold px-2 py-0.5"
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

        <CardContent className="px-5 pb-3 text-left">
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-jakarta tracking-tight tabular-nums mt-1">
            ₹
            {parseFloat(balance).toLocaleString("en-IN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
          <p className="text-xs font-semibold text-slate-400 mt-1 flex items-center gap-1">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>{account._count?.transactions || 0} Total Transactions</span>
          </p>
        </CardContent>

        <CardFooter className="flex justify-between items-center text-xs px-5 pb-4 pt-3 border-t border-slate-100/90 font-jakarta">
          <div className="flex items-center text-emerald-600 font-semibold gap-1 text-[11px]">
            <ArrowUpRight className="h-3.5 w-3.5" />
            Income Tracked
          </div>
          <div className="flex items-center text-rose-500 font-semibold gap-1 text-[11px]">
            <ArrowDownRight className="h-3.5 w-3.5" />
            Expenses Tracked
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
}