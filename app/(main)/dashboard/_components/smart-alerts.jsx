"use client";

import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Bell,
  TrendingUp,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
} from "lucide-react";
import { format, addDays, addMonths, addWeeks, addYears } from "date-fns";

const INTERVAL_LABELS = {
  DAILY: "Daily",
  WEEKLY: "Weekly",
  MONTHLY: "Monthly",
  YEARLY: "Yearly",
};

function getNextDate(transaction) {
  if (transaction.nextRecurringDate) {
    return new Date(transaction.nextRecurringDate);
  }
  const base = new Date(transaction.date);
  switch (transaction.recurringInterval) {
    case "DAILY":
      return addDays(base, 1);
    case "WEEKLY":
      return addWeeks(base, 1);
    case "MONTHLY":
      return addMonths(base, 1);
    case "YEARLY":
      return addYears(base, 1);
    default:
      return null;
  }
}

export function SmartAlertsWidget({ show = true, transactions = [] }) {
  const today = new Date();
  const in7Days = addDays(today, 7);

  // ── Recurring Reminders ── (always computed — hooks must not be conditional)
  const recurringTransactions = useMemo(() => {
    return transactions
      .filter((t) => t.isRecurring && t.recurringInterval)
      .slice(0, 5);
  }, [transactions]);

  // ── Anomaly Detection ── compare this month vs last month by category
  const anomalies = useMemo(() => {
    const now = new Date();
    const lastMonthDate = addMonths(now, -1);
    const thisMonthYear = now.getFullYear();
    const thisMonthMonth = now.getMonth();
    const lastMonthYear = lastMonthDate.getFullYear();
    const lastMonthMonth = lastMonthDate.getMonth();

    const expenses = transactions.filter((t) => t.type === "EXPENSE");

    const thisMonthByCategory = expenses.reduce((acc, t) => {
      const d = new Date(t.date);
      if (d.getFullYear() === thisMonthYear && d.getMonth() === thisMonthMonth) {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
      }
      return acc;
    }, {});

    const lastMonthByCategory = expenses.reduce((acc, t) => {
      const d = new Date(t.date);
      if (d.getFullYear() === lastMonthYear && d.getMonth() === lastMonthMonth) {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
      }
      return acc;
    }, {});

    const flags = [];
    for (const [category, thisAmt] of Object.entries(thisMonthByCategory)) {
      const lastAmt = lastMonthByCategory[category] || 0;
      if (lastAmt > 0) {
        const pctIncrease = ((thisAmt - lastAmt) / lastAmt) * 100;
        if (pctIncrease >= 30) {
          flags.push({ category, thisAmt, lastAmt, pctIncrease });
        }
      }
    }
    return flags.sort((a, b) => b.pctIncrease - a.pctIncrease).slice(0, 4);
  }, [transactions]);

  // Conditional render must come AFTER all hooks
  if (!show) return null;

  return (
    <Card className="border border-gray-200 bg-white shadow-sm hover:border-gray-300 transition-all rounded-xl font-inter">
      <CardHeader className="pb-4 p-5 sm:p-6 text-left border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-amber-50 border border-amber-100 text-amber-700">
            <Bell className="h-5 w-5" />
          </div>
          <div>
            <CardTitle className="text-base font-bold text-gray-900 font-inter">
              Smart Alerts
            </CardTitle>
            <p className="text-xs text-gray-500 mt-0.5">
              Recurring reminders and unusual spending detection
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-5 sm:p-6 pt-4 sm:pt-5">
        <div className="grid gap-6 md:grid-cols-2 text-left">
          {/* ── Recurring Reminders ── */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-gray-800 uppercase tracking-wider">
              <RefreshCw className="h-3.5 w-3.5 text-violet-600" />
              Recurring Reminders
            </div>
            {recurringTransactions.length === 0 ? (
              <div className="rounded-lg border border-gray-200/80 bg-gray-50/70 p-3.5 flex items-center gap-3 text-gray-500">
                <CheckCircle2 className="h-4 w-4 text-gray-300 shrink-0" />
                <p className="text-xs font-medium">
                  No recurring transactions yet. Mark transactions as recurring when adding them.
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {recurringTransactions.map((t) => {
                  const nextDate = getNextDate(t);
                  const isDueSoon =
                    nextDate && nextDate <= in7Days && nextDate >= today;
                  return (
                    <div
                      key={t.id}
                      className={`flex items-center justify-between p-3 rounded-lg border text-xs transition-colors ${
                        isDueSoon
                          ? "border-amber-200 bg-amber-50/70"
                          : "border-gray-200/80 bg-gray-50/50"
                      }`}
                    >
                      <div className="space-y-0.5">
                        <p className="font-semibold text-gray-900">
                          {t.description || t.category}
                        </p>
                        <div className="flex items-center gap-1.5 text-gray-500">
                          <Calendar className="h-3 w-3" />
                          <span>
                            {INTERVAL_LABELS[t.recurringInterval] ||
                              t.recurringInterval}
                            {nextDate
                              ? ` · Due ${format(nextDate, "MMM d")}`
                              : ""}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p
                          className={`font-bold tabular-nums ${
                            t.type === "EXPENSE"
                              ? "text-rose-600"
                              : "text-emerald-600"
                          }`}
                        >
                          {t.type === "EXPENSE" ? "-" : "+"}₹{" "}
                          {t.amount.toFixed(0)}
                        </p>
                        {isDueSoon && (
                          <span className="text-amber-700 font-bold text-[10px]">
                            Due soon
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* ── Anomaly Detection ── */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-gray-800 uppercase tracking-wider">
              <TrendingUp className="h-3.5 w-3.5 text-rose-500" />
              Anomaly Detection
            </div>
            {anomalies.length === 0 ? (
              <div className="rounded-lg border border-gray-200/80 bg-gray-50/70 p-3.5 flex items-center gap-3 text-gray-500">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <p className="text-xs font-medium">
                  No unusual spending detected this month. Your spending looks
                  consistent!
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {anomalies.map((a) => (
                  <div
                    key={a.category}
                    className="flex items-center justify-between p-3 rounded-lg border border-rose-200/80 bg-rose-50/50 text-xs"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5">
                        <AlertTriangle className="h-3.5 w-3.5 text-rose-500" />
                        <p className="font-semibold text-gray-900 capitalize">
                          {a.category}
                        </p>
                      </div>
                      <p className="text-gray-500 pl-5">
                        Up {a.pctIncrease.toFixed(0)}% vs last month
                      </p>
                    </div>
                    <div className="text-right space-y-0.5">
                      <p className="font-bold text-rose-600 tabular-nums">
                        ₹{a.thisAmt.toFixed(0)}
                      </p>
                      <p className="text-gray-400 tabular-nums">was ₹{a.lastAmt.toFixed(0)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
