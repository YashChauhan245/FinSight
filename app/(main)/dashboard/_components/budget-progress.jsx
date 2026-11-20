"use client";

import { useState, useEffect } from "react";
import { Mail, Loader2, AlertTriangle } from "lucide-react";
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

  const progressColor = percentUsed >= 90 ? "bg-destructive" : percentUsed >= 75 ? "bg-warning" : "bg-chart-1";
  const remaining = initialBudget ? initialBudget.amount - currentExpenses : 0;
  const currency = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2, minimumFractionDigits: 0 });

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row flex-wrap items-start justify-between gap-2 space-y-0 pb-3">
        <div>
          <CardTitle>Monthly budget</CardTitle>
          <p className="mt-1 text-sm text-muted-foreground">Default account</p>
        </div>
        {!isEditing && (
          <Button type="button" variant="outline" size="sm" onClick={() => setIsEditing(true)}>
            {initialBudget ? "Edit budget" : "Set budget"}
          </Button>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        {isEditing ? (
          <form className="space-y-2" onSubmit={(event) => {
            event.preventDefault();
            handleUpdateBudget();
          }}>
            <label htmlFor="monthly-budget" className="text-sm font-medium">Monthly limit (₹)</label>
            <Input id="monthly-budget" type="number" min="0.01" step="0.01" value={newBudget}
              onChange={(event) => setNewBudget(event.target.value)} autoFocus disabled={isLoading} />
            <div className="flex gap-2">
              <Button type="submit" size="sm" disabled={isLoading}>{isLoading ? "Saving…" : "Save"}</Button>
              <Button type="button" variant="outline" size="sm" onClick={handleCancel} disabled={isLoading}>Cancel</Button>
            </div>
          </form>
        ) : initialBudget ? (
          <div className="space-y-2">
            <div className="flex flex-wrap items-baseline gap-x-1.5 tabular-nums">
              <strong className="text-2xl font-semibold tracking-tight">{currency.format(currentExpenses)}</strong>
              <span className="text-sm text-muted-foreground">of {currency.format(initialBudget.amount)}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted" role="progressbar" aria-label="Monthly budget used" aria-valuenow={Math.min(100, Math.round(percentUsed))}>
              <div className={"h-full rounded-full " + progressColor} style={{ width: Math.min(100, percentUsed) + "%" }} />
            </div>
            <div className="flex flex-wrap justify-between gap-x-2 text-xs tabular-nums">
              <span className={remaining >= 0 ? "font-medium text-primary" : "font-medium text-destructive"}>
                {currency.format(Math.abs(remaining))} {remaining >= 0 ? "left" : "over budget"}
              </span>
              <span className="text-muted-foreground">{Math.round(percentUsed)}% used</span>
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">Set a spending limit to track your monthly budget.</p>
        )}

        {initialBudget && percentUsed >= 80 && (
          <p className="flex items-center gap-2 rounded-md bg-warning/10 p-3 text-sm text-warning">
            <AlertTriangle className="size-4 shrink-0" />
            {percentUsed >= 100 ? "You’ve reached your monthly budget." : "You’re close to your monthly budget."}
          </p>
        )}

        {initialBudget && (
          <div className="border-t pt-3">
            <Button type="button" size="sm" variant="outline" onClick={handleResendAlert} disabled={sendingEmail}>
              {sendingEmail ? <Loader2 className="animate-spin" /> : <Mail />}
              {sendingEmail ? "Sending…" : "Send alert email"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
