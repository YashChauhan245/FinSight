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
    <Card className="border border-gray-200 bg-white shadow-sm hover:border-gray-300 transition-all text-left rounded-xl font-inter overflow-hidden">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 p-5 sm:p-6 gap-4">
        <div className="flex-1 space-y-1.5">
          <div className="flex items-center gap-2">
            <CardTitle className="text-base font-bold text-gray-900 font-inter">
              Monthly Budget Progress
            </CardTitle>
            <span className="text-[11px] font-medium text-gray-600 bg-gray-100 border border-gray-200 px-2 py-0.5 rounded-md">
              Default Account
            </span>
          </div>

          {isEditing ? (
            <div className="flex items-center gap-2 pt-1">
              <span className="text-sm font-semibold text-gray-700">₹</span>
              <Input
                type="number"
                value={newBudget}
                onChange={(e) => setNewBudget(e.target.value)}
                className="w-40 text-xs h-8 border-gray-200 focus-visible:ring-violet-500 font-medium rounded-lg"
                placeholder="Enter budget limit"
                autoFocus
                disabled={isLoading}
              />
              <Button
                variant="outline"
                size="sm"
                onClick={handleUpdateBudget}
                disabled={isLoading}
                className="h-8 px-3 text-white bg-violet-600 hover:bg-violet-700 border-none font-medium text-xs rounded-lg shadow-sm"
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
                className="h-8 px-3 text-gray-600 border-gray-200 hover:bg-gray-50 font-medium text-xs rounded-lg shadow-sm"
              >
                <X className="h-3.5 w-3.5" />
                <span>Cancel</span>
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-600 font-medium tabular-nums">
                {initialBudget
                  ? `₹${currentExpenses.toLocaleString("en-IN", { minimumFractionDigits: 0 })} spent of ₹${initialBudget.amount.toLocaleString("en-IN", { minimumFractionDigits: 0 })} limit`
                  : "No monthly budget set — click edit to add your spending limit"}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsEditing(true)}
                className="h-6 w-6 text-gray-400 hover:text-violet-600 hover:bg-violet-50 transition-colors rounded-md"
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
            className="shrink-0 text-xs h-9 border-gray-200 text-gray-700 bg-white hover:bg-gray-50 gap-2 rounded-lg font-medium px-3.5 shadow-sm transition-all"
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
        <CardContent className="p-5 sm:p-6 pt-0 sm:pt-0 space-y-3">
          {/* Progress Bar */}
          <div className="space-y-1.5">
            <div className="w-full bg-gray-100 rounded-full h-2.5 p-0.5 border border-gray-200/60 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${progressColor}`}
                style={{ width: `${Math.min(100, percentUsed)}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] font-semibold tabular-nums">
              <span className="text-gray-400">0%</span>
              <span
                className={`font-semibold px-2 py-0.5 rounded-md ${
                  percentUsed >= 90
                    ? "bg-rose-50 text-rose-700 border border-rose-200"
                    : percentUsed >= 75
                    ? "bg-amber-50 text-amber-700 border border-amber-200"
                    : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                }`}
              >
                {percentUsed.toFixed(1)}% Used
              </span>
              <span className="text-gray-400">100% Target</span>
            </div>
          </div>

          {/* Warning Banner */}
          {percentUsed >= 80 && (
            <div
              className={`flex items-center gap-2 p-3 rounded-lg text-xs font-medium ${
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