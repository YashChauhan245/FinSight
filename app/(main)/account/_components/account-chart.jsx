"use client";

import { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format, subDays, startOfDay, endOfDay } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

const DATE_RANGES = {
  "7D": { label: "Last 7 Days", days: 7 },
  "1M": { label: "Last Month", days: 30 },
  "3M": { label: "Last 3 Months", days: 90 },
  "6M": { label: "Last 6 Months", days: 180 },
  ALL: { label: "All Time", days: null },
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm px-4 py-3 text-left min-w-[160px] font-inter">
        <p className="text-xs font-bold text-gray-500 mb-2">{label}</p>
        {payload.map((p) => (
          <div key={p.dataKey} className="flex items-center justify-between gap-6 text-xs">
            <div className="flex items-center gap-1.5">
              <span
                className="inline-block w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: p.fill }}
              />
              <span className="text-gray-600 font-medium capitalize">{p.name}</span>
            </div>
            <span className="font-bold text-gray-900 tabular-nums">
              ₹{p.value.toLocaleString("en-IN")}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function AccountChart({ transactions }) {
  const [dateRange, setDateRange] = useState("1M");

  const filteredData = useMemo(() => {
    const range = DATE_RANGES[dateRange];
    const now = new Date();
    const startDate = range.days
      ? startOfDay(subDays(now, range.days))
      : startOfDay(new Date(0));

    const filtered = transactions.filter(
      (t) => new Date(t.date) >= startDate && new Date(t.date) <= endOfDay(now)
    );

    const grouped = filtered.reduce((acc, transaction) => {
      const date = format(new Date(transaction.date), "MMM dd");
      if (!acc[date]) {
        acc[date] = { date, income: 0, expense: 0 };
      }
      if (transaction.type === "INCOME") {
        acc[date].income += transaction.amount;
      } else {
        acc[date].expense += transaction.amount;
      }
      return acc;
    }, {});

    return Object.values(grouped).sort(
      (a, b) => new Date("2024 " + a.date) - new Date("2024 " + b.date)
    );
  }, [transactions, dateRange]);

  const totals = useMemo(() => {
    return filteredData.reduce(
      (acc, day) => ({
        income: acc.income + day.income,
        expense: acc.expense + day.expense,
      }),
      { income: 0, expense: 0 }
    );
  }, [filteredData]);

  const net = totals.income - totals.expense;

  return (
    <Card className="border border-gray-200 bg-white shadow-sm rounded-xl font-inter">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 p-5 sm:p-6">
        <CardTitle className="text-base font-bold text-gray-900 font-inter">
          Transaction Overview
        </CardTitle>
        <Select defaultValue={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="w-[140px] text-xs h-8 border-gray-200 bg-white font-medium rounded-lg">
            <SelectValue placeholder="Select range" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(DATE_RANGES).map(([key, { label }]) => (
              <SelectItem key={key} value={key} className="text-xs font-medium">
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent className="space-y-6 p-5 sm:p-6 pt-0 sm:pt-0">
        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 text-left">
            <div className="flex items-center gap-1.5 mb-1">
              <TrendingUp className="h-3.5 w-3.5 text-emerald-600" />
              <p className="text-xs text-emerald-700 font-semibold">Income</p>
            </div>
            <p className="text-base font-bold text-emerald-700 tabular-nums">
              ₹{totals.income.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
            </p>
          </div>
          <div className="bg-rose-50 border border-rose-100 rounded-xl p-3 text-left">
            <div className="flex items-center gap-1.5 mb-1">
              <TrendingDown className="h-3.5 w-3.5 text-rose-600" />
              <p className="text-xs text-rose-700 font-semibold">Expenses</p>
            </div>
            <p className="text-base font-bold text-rose-700 tabular-nums">
              ₹{totals.expense.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
            </p>
          </div>
          <div
            className={`${
              net >= 0
                ? "bg-violet-50 border-violet-100"
                : "bg-gray-50 border-gray-200"
            } border rounded-xl p-3 text-left`}
          >
            <div className="flex items-center gap-1.5 mb-1">
              <Minus className="h-3.5 w-3.5 text-gray-600" />
              <p className="text-xs text-gray-700 font-semibold">Net</p>
            </div>
            <p
              className={`text-base font-bold tabular-nums ${
                net >= 0 ? "text-violet-700" : "text-gray-700"
              }`}
            >
              {net < 0 ? "-" : "+"} ₹
              {Math.abs(net).toLocaleString("en-IN", { maximumFractionDigits: 0 })}
            </p>
          </div>
        </div>

        {/* Bar Chart */}
        {filteredData.length === 0 ? (
          <div className="h-[250px] flex items-center justify-center text-center">
            <div>
              <p className="text-sm font-semibold text-gray-400">No data for this period</p>
              <p className="text-xs text-gray-400 mt-1">Try selecting a wider date range</p>
            </div>
          </div>
        ) : (
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={filteredData}
                margin={{ top: 4, right: 4, left: -10, bottom: 0 }}
                barCategoryGap="35%"
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e5e7eb"
                />
                <XAxis
                  dataKey="date"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#9ca3af" }}
                />
                <YAxis
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#9ca3af" }}
                  tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f9fafb" }} />
                <Bar
                  dataKey="income"
                  name="Income"
                  fill="#10b981"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="expense"
                  name="Expense"
                  fill="#f43f5e"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}