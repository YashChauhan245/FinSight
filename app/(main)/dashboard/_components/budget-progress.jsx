"use client";

import { useState, useEffect } from "react";
import { Pencil, Check, X, Mail, Loader2, AlertTriangle, TrendingUp, Sparkles } from "lucide-react";
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
      ? "bg-gradient-to-r from-rose-500 to-red-600 shadow-sm shadow-rose-200"
      : percentUsed >= 75
      ? "bg-gradient-to-r from-amber-500 to-orange-500 shadow-sm shadow-amber-200"
      : "bg-gradient-to-r from-emerald-500 to-teal-500 shadow-sm shadow-emerald-200";

  return (
    <Card className="border border-slate-200/90 bg-white/90 backdrop-blur-md shadow-sm hover:shadow-md transition-shadow text-left rounded-2xl font-jakarta overflow-hidden">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 gap-4">
        <div className="flex-1 space-y-1.5">
          <div className="flex items-center gap-2">
            <CardTitle className="text-base font-bold text-slate-900 font-jakarta">
              Monthly Budget Progress
            </CardTitle>
            <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-md">
              Default Account
            </span>
          </div>

          {isEditing ? (
            <div className="flex items-center gap-2 pt-1">
              <span className="text-sm font-bold text-slate-700">₹</span>
              <Input
                type="number"
                value={newBudget}
                onChange={(e) => setNewBudget(e.target.value)}
                className="w-40 text-xs h-9 border-slate-300 focus-visible:ring-violet-400 font-medium"
                placeholder="Enter budget limit"
                autoFocus
                disabled={isLoading}
              />
              <Button
                variant="outline"
                size="sm"
                onClick={handleUpdateBudget}
                disabled={isLoading}
                className="h-9 px-3 text-emerald-700 bg-emerald-50 border-emerald-300 hover:bg-emerald-100 font-bold"
              >
                {isLoading ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Check className="h-3.5 w-3.5" />
                )}
                <span>Save</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCancel}
                disabled={isLoading}
                className="h-9 px-3 text-slate-600 border-slate-300 hover:bg-slate-100 font-medium"
              >
                <X className="h-3.5 w-3.5" />
                <span>Cancel</span>
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-600 font-medium tabular-nums">
                {initialBudget
                  ? `₹${currentExpenses.toLocaleString("en-IN", { minimumFractionDigits: 0 })} spent of ₹${initialBudget.amount.toLocaleString("en-IN", { minimumFractionDigits: 0 })} limit`
                  : "No monthly budget set — click edit to add your spending limit"}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsEditing(true)}
                className="h-6 w-6 text-slate-400 hover:text-violet-600 hover:bg-violet-50 transition-colors"
                title="Edit Budget"
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
            className="shrink-0 text-xs h-9 border-slate-200/90 text-slate-700 hover:bg-slate-100 hover:text-slate-900 gap-2 rounded-xl font-semibold px-3.5"
          >
            {sendingEmail ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin text-violet-600" />
            ) : (
              <Mail className="h-3.5 w-3.5 text-violet-600" />
            )}
            {sendingEmail ? "Sending Alert..." : "Send Alert Email"}
          </Button>
        )}
      </CardHeader>

      {initialBudget && (
        <CardContent className="pt-0 space-y-3">
          {/* Progress Bar */}
          <div className="space-y-1.5">
            <div className="w-full bg-slate-100/90 rounded-full h-3 p-0.5 border border-slate-200/60 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${progressColor}`}
                style={{ width: `${Math.min(100, percentUsed)}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] font-semibold tabular-nums">
              <span className="text-slate-400">0%</span>
              <span
                className={`font-bold px-2 py-0.5 rounded-md ${
                  percentUsed >= 90
                    ? "bg-rose-50 text-rose-700 border border-rose-200"
                    : percentUsed >= 75
                    ? "bg-amber-50 text-amber-700 border border-amber-200"
                    : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                }`}
              >
                {percentUsed.toFixed(1)}% Used
              </span>
              <span className="text-slate-400">100% Target</span>
            </div>
          </div>

          {/* Warning Banner */}
          {percentUsed >= 80 && (
            <div
              className={`flex items-center gap-2 p-3 rounded-xl text-xs font-semibold ${
                percentUsed >= 100
                  ? "bg-rose-50 border border-rose-200 text-rose-700"
                  : "bg-amber-50 border border-amber-200 text-amber-700"
              }`}
            >
              <AlertTriangle className="h-4 w-4 shrink-0" />
              {percentUsed >= 100
                ? "You have exceeded your monthly budget limit!"
                : `You've used ${percentUsed.toFixed(1)}% of your monthly budget. Consider reviewing your top category expenses.`}
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
}