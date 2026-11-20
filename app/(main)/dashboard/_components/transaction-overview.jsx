"use client";

import { useMemo, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { format, startOfMonth, subMonths } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const chartColors = ["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"];
const dateRanges = [
  { value: "this-month", label: "This month" },
  { value: "last-3-months", label: "Last 3 months" },
  { value: "last-6-months", label: "Last 6 months" },
  { value: "all-time", label: "All time" },
];
const money = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" });

function startDateFor(range, now) {
  if (range === "last-3-months") return subMonths(now, 3);
  if (range === "last-6-months") return subMonths(now, 6);
  if (range === "all-time") return new Date(0);
  return startOfMonth(now);
}

export function DashboardOverview({ accounts, transactions }) {
  const [accountId, setAccountId] = useState("all");
  const [range, setRange] = useState("this-month");

  const accountTransactions = useMemo(
    () => accountId === "all" ? transactions : transactions.filter((transaction) => transaction.accountId === accountId),
    [accountId, transactions]
  );
  const recentTransactions = useMemo(
    () => [...accountTransactions].sort((first, second) => new Date(second.date) - new Date(first.date)).slice(0, 7),
    [accountTransactions]
  );

  const categories = useMemo(() => {
    const now = new Date();
    const start = startDateFor(range, now);
    const totals = new Map();

    for (const transaction of accountTransactions) {
      const date = new Date(transaction.date);
      if (transaction.type !== "EXPENSE" || !(date >= start && date <= now)) continue;
      const amount = Number(transaction.amount) || 0;
      const name = transaction.category || "Uncategorized";
      totals.set(name, (totals.get(name) || 0) + amount);
    }

    return Array.from(totals, ([name, value]) => ({ name, value }))
      .sort((first, second) => second.value - first.value)
      .map((category, index) => ({ ...category, color: `hsl(var(--${chartColors[index % chartColors.length]}))` }));
  }, [accountTransactions, range]);

  const totalExpenses = categories.reduce((total, category) => total + category.value, 0);

  return (
    <div className="space-y-5">
      <Card id="transactions" className="scroll-mt-32 lg:scroll-mt-20">
        <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-2 space-y-0 pb-3">
          <CardTitle>Recent transactions</CardTitle>
          {accounts.length > 0 && (
            <Select value={accountId} onValueChange={setAccountId}>
              <SelectTrigger aria-label="Filter transactions by account" className="w-40">
                <SelectValue placeholder="Select account" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All accounts</SelectItem>
                {accounts.map((account) => <SelectItem key={account.id} value={account.id}>{account.name}</SelectItem>)}
              </SelectContent>
            </Select>
          )}
        </CardHeader>
        {recentTransactions.length ? (
          <Table>
            <TableHeader className="bg-muted/60">
              <TableRow>
                <TableHead className="pl-4 sm:pl-6">Description</TableHead>
                <TableHead className="hidden sm:table-cell">Category</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="pr-4 text-right sm:pr-6">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentTransactions.map((transaction) => {
                const title = transaction.description || transaction.merchantName || "Transaction";
                const isExpense = transaction.type === "EXPENSE";
                const amount = Math.abs(Number(transaction.amount) || 0);
                return (
                  <TableRow key={transaction.id}>
                    <TableCell className="max-w-40 truncate pl-4 font-medium sm:max-w-64 sm:pl-6" title={title}>{title}</TableCell>
                    <TableCell className="hidden capitalize text-muted-foreground sm:table-cell">{transaction.category}</TableCell>
                    <TableCell className="whitespace-nowrap text-muted-foreground">{format(new Date(transaction.date), "d MMM")}</TableCell>
                    <TableCell className={`whitespace-nowrap pr-4 text-right font-medium tabular-nums sm:pr-6 ${isExpense ? "" : "text-primary"}`}>
                      {isExpense ? "−" : "+"}{money.format(amount)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        ) : (
          <CardContent className="py-8 text-center text-sm text-muted-foreground">
            {accountId === "all" ? "Add your first transaction to see it here." : "No transactions recorded for this account."}
          </CardContent>
        )}
      </Card>

      <Card>
        <CardHeader className="flex flex-row flex-wrap items-start justify-between gap-2 space-y-0 pb-3">
          <div>
            <CardTitle>Spending by category</CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">{money.format(totalExpenses)} total spending</p>
          </div>
          <Select value={range} onValueChange={setRange}>
            <SelectTrigger aria-label="Spending period" className="w-40"><SelectValue /></SelectTrigger>
            <SelectContent>
              {dateRanges.map((option) => <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>)}
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          {totalExpenses > 0 ? (
            <div className="grid items-center gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
              <div className="h-44 min-w-0" aria-hidden="true">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={categories} dataKey="value" innerRadius={49} outerRadius={75} paddingAngle={2} stroke="none">
                      {categories.map(({ name, color }) => <Cell key={name} fill={color} />)}
                    </Pie>
                    <Tooltip
                      formatter={(amount) => money.format(amount)}
                      contentStyle={{ background: "hsl(var(--card))", borderColor: "hsl(var(--border))", color: "hsl(var(--foreground))", borderRadius: 8 }}
                      itemStyle={{ color: "hsl(var(--foreground))" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <dl className="grid gap-x-6 gap-y-2 md:grid-cols-2">
                {categories.map(({ name, value, color }) => (
                  <div key={name} className="flex min-w-0 items-center justify-between gap-2 border-b pb-1.5 text-sm">
                    <dt className="flex min-w-0 items-center gap-2 capitalize text-muted-foreground">
                      <span className="size-2 shrink-0 rounded-sm" style={{ backgroundColor: color }} />
                      <span className="truncate" title={name}>{name}</span>
                    </dt>
                    <dd className="font-medium tabular-nums">{money.format(value)}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ) : (
            <p className="py-5 text-center text-sm text-muted-foreground">No expenses recorded in this period.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
