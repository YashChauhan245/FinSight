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
import { format, subDays, startOfMonth, subMonths } from "date-fns";
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
      <div className="bg-white border border-slate-200 rounded-xl shadow-lg px-4 py-2.5 text-left">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-0.5 capitalize">
          {name}
        </p>
        <p className="text-base font-extrabold text-slate-900">
          Rs {value.toLocaleString("en-IN", { minimumFractionDigits: 0 })}
        </p>
      </div>
    );
  }
  return null;
};

const renderCustomLegend = (props) => {
  const { payload } = props;
  return (
    <div className="flex flex-wrap justify-center gap-x-4 gap-y-1.5 mt-2 px-2">
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
  const [selectedAccountId, setSelectedAccountId] = useState(
    accounts?.find((a) => a.isDefault)?.id || accounts?.[0]?.id || ""
  );
  const [pieRange, setPieRange] = useState("this-month");

  // Filter transactions for selected account
  const accountTransactions = useMemo(
    () => transactions?.filter((t) => t.accountId === selectedAccountId) || [],
    [transactions, selectedAccountId]
  );

  // Recent transactions (last 5)
  const recentTransactions = useMemo(
    () =>
      [...accountTransactions]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5),
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
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

    return Object.entries(byCategory)
      .sort((a, b) => b[1] - a[1])
      .map(([name, value]) => ({ name, value }));
  }, [accountTransactions, pieRange]);

  const totalPieExpenses = pieChartData.reduce((s, d) => s + d.value, 0);

  return (
    <div className="grid gap-4 md:grid-cols-2 text-left">
      {/* Recent Transactions Card */}
      <Card className="border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="text-base font-bold text-slate-900 font-manrope">
            Recent Transactions
          </CardTitle>

          {accounts?.length > 0 && (
            <Select value={selectedAccountId} onValueChange={setSelectedAccountId}>
              <SelectTrigger className="w-[140px] text-xs h-8 border-slate-200">
                <SelectValue placeholder="Select account" />
              </SelectTrigger>
              <SelectContent>
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
          <div className="space-y-2.5">
            {recentTransactions.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <p className="text-sm font-semibold text-slate-400">No transactions yet</p>
                <p className="text-xs text-slate-300 mt-1">
                  Add your first transaction to see it here
                </p>
              </div>
            ) : (
              recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-100/70 transition-colors group"
                >
                  <div className="space-y-0.5 min-w-0 flex-1 pr-3">
                    <p className="text-sm font-semibold text-slate-900 font-manrope truncate">
                      {transaction.description || "Untitled Transaction"}
                    </p>
                    <div className="flex items-center gap-1.5">
                      <p className="text-[11px] text-slate-400 font-inter">
                        {format(new Date(transaction.date), "MMM d, yyyy")}
                      </p>
                      <span className="text-slate-300">·</span>
                      <span className="text-[11px] font-semibold text-slate-500 capitalize bg-slate-100 px-1.5 py-0.5 rounded">
                        {transaction.category}
                      </span>
                    </div>
                  </div>

                  <div
                    className={cn(
                      "flex items-center font-extrabold text-sm font-inter shrink-0",
                      transaction.type === "EXPENSE"
                        ? "text-rose-600"
                        : "text-emerald-600"
                    )}
                  >
                    {transaction.type === "EXPENSE" ? (
                      <ArrowDownRight className="mr-1 h-4 w-4 shrink-0" />
                    ) : (
                      <ArrowUpRight className="mr-1 h-4 w-4 shrink-0" />
                    )}
                    Rs{" "}
                    {transaction.amount.toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Expense Breakdown Card */}
      <Card className="border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="text-base font-bold text-slate-900 font-manrope">
            Expense Breakdown
          </CardTitle>
          <Select value={pieRange} onValueChange={setPieRange}>
            <SelectTrigger className="w-[140px] text-xs h-8 border-slate-200">
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
              <p className="text-xs text-slate-300 mt-1">
                Try changing the time period
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="text-center">
                <p className="text-xs text-slate-400 font-medium">Total Expenses</p>
                <p className="text-xl font-extrabold text-slate-900">
                  Rs{" "}
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