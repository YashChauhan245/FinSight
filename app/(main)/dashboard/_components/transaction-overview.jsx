"use client";

import { useState, useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { format, startOfMonth, subMonths } from "date-fns";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const PIE_COLORS = [
  "#8b5cf6", // Violet
  "#06b6d4", // Cyan
  "#10b981", // Emerald
  "#f59e0b", // Amber
  "#f43f5e", // Rose
  "#3b82f6", // Blue
  "#64748b", // Slate
  "#ec4899", // Pink
];

const PIE_DATE_RANGES = [
  { value: "this-month", label: "This Month" },
  { value: "last-3-months", label: "Last 3 Months" },
  { value: "last-6-months", label: "Last 6 Months" },
  { value: "all-time", label: "All Time" },
];

function getPieStartDate(range) {
  const now = new Date();
  switch (range) {
    case "this-month":
      return startOfMonth(now);
    case "last-3-months":
      return subMonths(now, 3);
    case "last-6-months":
      return subMonths(now, 6);
    case "all-time":
      return new Date(0);
    default:
      return startOfMonth(now);
  }
}

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { name, value } = payload[0];
    return (
      <div className="bg-white border border-slate-200 rounded-xl shadow-lg px-4 py-2.5 text-left font-jakarta">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-0.5 capitalize">
          {name}
        </p>
        <p className="text-base font-extrabold text-slate-900 tabular-nums">
          ₹{value.toLocaleString("en-IN", { minimumFractionDigits: 0 })}
        </p>
      </div>
    );
  }
  return null;
};

const renderCustomLegend = (props) => {
  const { payload } = props;
  return (
    <div className="flex flex-wrap justify-center gap-x-4 gap-y-1.5 mt-2 px-2 font-jakarta">
      {payload.map((entry, index) => (
        <div key={index} className="flex items-center gap-1.5 text-xs text-slate-600">
          <span
            className="inline-block w-2.5 h-2.5 rounded-full shrink-0"
            style={{ backgroundColor: entry.color }}
          />
          <span className="capitalize font-medium">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

export function DashboardOverview({ accounts, transactions }) {
  const [selectedAccountId, setSelectedAccountId] = useState("all");
  const [pieRange, setPieRange] = useState("this-month");

  // Filter transactions for selected account (or all)
  const accountTransactions = useMemo(() => {
    if (!transactions) return [];
    if (selectedAccountId === "all") return transactions;
    return transactions.filter((t) => t.accountId === selectedAccountId);
  }, [transactions, selectedAccountId]);

  // Recent transactions (last 7)
  const recentTransactions = useMemo(
    () =>
      [...accountTransactions]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 7),
    [accountTransactions]
  );

  // Pie chart data based on selected time range
  const pieChartData = useMemo(() => {
    const startDate = getPieStartDate(pieRange);
    const now = new Date();

    const filteredExpenses = accountTransactions.filter((t) => {
      if (t.type !== "EXPENSE") return false;
      const d = new Date(t.date);
      return d >= startDate && d <= now;
    });

    const byCategory = filteredExpenses.reduce((acc, t) => {
      const amt = typeof t.amount === "number" ? t.amount : Number(t.amount) || 0;
      acc[t.category] = (acc[t.category] || 0) + amt;
      return acc;
    }, {});

    return Object.entries(byCategory)
      .sort((a, b) => b[1] - a[1])
      .map(([name, value]) => ({ name, value }));
  }, [accountTransactions, pieRange]);

  const totalPieExpenses = pieChartData.reduce((s, d) => s + d.value, 0);

  return (
    <div className="grid gap-4 md:grid-cols-2 text-left font-jakarta">
      {/* Recent Transactions Card */}
      <Card className="border border-slate-200/90 bg-white/90 backdrop-blur-md shadow-sm hover:shadow-md transition-shadow rounded-2xl">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="text-base font-bold text-slate-900 font-jakarta">
            Recent Transactions
          </CardTitle>

          {accounts?.length > 0 && (
            <Select value={selectedAccountId} onValueChange={setSelectedAccountId}>
              <SelectTrigger className="w-[140px] text-xs h-8 border-slate-200/90 font-medium">
                <SelectValue placeholder="Select account" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="text-xs font-semibold">
                  All Accounts
                </SelectItem>
                {accounts.map((account) => (
                  <SelectItem key={account.id} value={account.id} className="text-xs">
                    {account.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </CardHeader>

        <CardContent>
          <div className="space-y-2">
            {recentTransactions.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <p className="text-sm font-semibold text-slate-400">No transactions found</p>
                <p className="text-xs text-slate-400 mt-1">
                  {selectedAccountId === "all"
                    ? "Add your first transaction to see it here"
                    : "No transactions recorded for this account"}
                </p>
              </div>
            ) : (
              recentTransactions.map((transaction) => {
                const amountVal = typeof transaction.amount === "number"
                  ? transaction.amount
                  : Number(transaction.amount) || 0;

                const displayTitle = transaction.description || transaction.merchantName || "Transaction";

                return (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-slate-100/80 transition-colors group"
                  >
                    <div className="space-y-0.5 min-w-0 flex-1 pr-3">
                      <p className="text-sm font-semibold text-slate-900 font-jakarta truncate">
                        {displayTitle}
                      </p>
                      <div className="flex items-center gap-1.5">
                        <p className="text-[11px] text-slate-400 font-medium">
                          {format(new Date(transaction.date), "MMM d, yyyy")}
                        </p>
                        <span className="text-slate-300">·</span>
                        <span className="text-[11px] font-semibold text-slate-600 capitalize bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200/60">
                          {transaction.category}
                        </span>
                      </div>
                    </div>

                    <div
                      className={cn(
                        "flex items-center font-extrabold text-sm font-jakarta shrink-0 tabular-nums",
                        transaction.type === "EXPENSE"
                          ? "text-rose-600"
                          : "text-emerald-600"
                      )}
                    >
                      {transaction.type === "EXPENSE" ? (
                        <ArrowDownRight className="mr-0.5 h-4 w-4 shrink-0" />
                      ) : (
                        <ArrowUpRight className="mr-0.5 h-4 w-4 shrink-0" />
                      )}
                      ₹
                      {amountVal.toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </CardContent>
      </Card>

      {/* Expense Breakdown Card */}
      <Card className="border border-slate-200/90 bg-white/90 backdrop-blur-md shadow-sm hover:shadow-md transition-shadow flex flex-col rounded-2xl">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="text-base font-bold text-slate-900 font-jakarta">
            Expense Breakdown
          </CardTitle>
          <Select value={pieRange} onValueChange={setPieRange}>
            <SelectTrigger className="w-[140px] text-xs h-8 border-slate-200/90 font-medium">
              <SelectValue placeholder="Period" />
            </SelectTrigger>
            <SelectContent>
              {PIE_DATE_RANGES.map((r) => (
                <SelectItem key={r.value} value={r.value} className="text-xs">
                  {r.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col justify-center pt-0">
          {pieChartData.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-sm font-semibold text-slate-400">No expenses found</p>
              <p className="text-xs text-slate-400 mt-1">
                Try changing the time period or adding an expense
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="text-center">
                <p className="text-xs text-slate-400 font-medium">Total Expenses</p>
                <p className="text-xl font-extrabold text-slate-900 tabular-nums">
                  ₹
                  {totalPieExpenses.toLocaleString("en-IN", {
                    minimumFractionDigits: 0,
                  })}
                </p>
              </div>
              <div className="h-[240px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={PIE_COLORS[index % PIE_COLORS.length]}
                          stroke="none"
                        />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend content={renderCustomLegend} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}