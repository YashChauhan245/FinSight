"use client";

import { useState, useEffect } from "react";
import { Pencil, Check, X, Mail, Loader2, AlertTriangle } from "lucide-react";
import useFetch from "@/hooks/use-fetch";
import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateBudget } from "@/actions/budget";
import { sendBudgetAlertEmail } from "@/actions/budget-email";

export function BudgetProgress({ initialBudget, currentExpenses }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newBudget, setNewBudget] = useState(
    initialBudget?.amount?.toString() || ""
  );
  const [sendingEmail, setSendingEmail] = useState(false);

  const {
    loading: isLoading,
    fn: updateBudgetFn,
    data: updatedBudget,
    error,
  } = useFetch(updateBudget);

  const percentUsed = initialBudget
    ? (currentExpenses / initialBudget.amount) * 100
    : 0;

  const handleUpdateBudget = async () => {
    const amount = parseFloat(newBudget);
    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    await updateBudgetFn(amount);
  };

  const handleCancel = () => {
    setNewBudget(initialBudget?.amount?.toString() || "");
    setIsEditing(false);
  };

  const handleResendAlert = async () => {
    setSendingEmail(true);
    try {
      const result = await sendBudgetAlertEmail();
      if (result.success) {
        toast.success("Budget alert email sent successfully!");
      } else {
        toast.error(result.error || "Failed to send email");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setSendingEmail(false);
    }
  };

  useEffect(() => {
    if (updatedBudget?.success) {
      setIsEditing(false);
      toast.success("Budget updated successfully");
    }
  }, [updatedBudget]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to update budget");
    }
  }, [error]);

  const progressColor =
    percentUsed >= 90
      ? "bg-rose-500"
      : percentUsed >= 75
      ? "bg-amber-500"
      : "bg-emerald-500";

  return (
    <Card className="border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow text-left">
      <CardHeader className="flex flex-row items-start justify-between pb-3 gap-4">
        <div className="flex-1 space-y-2">
          <CardTitle className="text-base font-bold text-slate-900 font-manrope">
            Monthly Budget
            <span className="ml-2 text-xs font-normal text-slate-400">(Default Account)</span>
          </CardTitle>

          {isEditing ? (
            <div className="flex items-center gap-2">
              <Input
                type="number"
                value={newBudget}
                onChange={(e) => setNewBudget(e.target.value)}
                className="w-36 text-xs h-8 border-slate-300 focus-visible:ring-slate-400"
                placeholder="Enter budget limit"
                autoFocus
                disabled={isLoading}
              />
              <Button
                variant="outline"
                size="icon"
                onClick={handleUpdateBudget}
                disabled={isLoading}
                className="h-8 w-8 text-emerald-600 border-emerald-300 hover:bg-emerald-50"
              >
                {isLoading ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Check className="h-3.5 w-3.5" />
                )}
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleCancel}
                disabled={isLoading}
                className="h-8 w-8 text-rose-600 border-rose-300 hover:bg-rose-50"
              >
                <X className="h-3.5 w-3.5" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-medium">
                {initialBudget
                  ? `Rs ${currentExpenses.toLocaleString("en-IN", { minimumFractionDigits: 0 })} of Rs ${initialBudget.amount.toLocaleString("en-IN", { minimumFractionDigits: 0 })} spent`
                  : "No budget set — click to add one"}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsEditing(true)}
                className="h-6 w-6 text-slate-400 hover:text-slate-900"
              >
                <Pencil className="h-3 w-3" />
              </Button>
            </div>
          )}
        </div>

        {/* Resend Email Button */}
        {initialBudget && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleResendAlert}
            disabled={sendingEmail}
            className="shrink-0 text-xs h-8 border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 gap-1.5"
          >
            {sendingEmail ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Mail className="h-3.5 w-3.5" />
            )}
            {sendingEmail ? "Sending..." : "Send Alert Email"}
          </Button>
        )}
      </CardHeader>

      {initialBudget && (
        <CardContent className="pt-0 space-y-3">
          {/* Progress Bar */}
          <div className="space-y-1.5">
            <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${progressColor}`}
                style={{ width: `${Math.min(100, percentUsed)}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] font-medium">
              <span className="text-slate-400">0%</span>
              <span
                className={`font-bold ${
                  percentUsed >= 90
                    ? "text-rose-600"
                    : percentUsed >= 75
                    ? "text-amber-600"
                    : "text-emerald-600"
                }`}
              >
                {percentUsed.toFixed(1)}% Used
              </span>
              <span className="text-slate-400">100%</span>
            </div>
          </div>

          {/* Warning Banner */}
          {percentUsed >= 80 && (
            <div
              className={`flex items-center gap-2 p-3 rounded-xl text-xs font-medium ${
                percentUsed >= 100
                  ? "bg-rose-50 border border-rose-200 text-rose-700"
                  : "bg-amber-50 border border-amber-200 text-amber-700"
              }`}
            >
              <AlertTriangle className="h-4 w-4 shrink-0" />
              {percentUsed >= 100
                ? "You have exceeded your monthly budget!"
                : `You've used ${percentUsed.toFixed(1)}% of your budget. Consider cutting back.`}
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
}