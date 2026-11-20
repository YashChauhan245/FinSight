"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Wallet } from "lucide-react";
import { format, getDaysInMonth, isSameMonth } from "date-fns";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { CreateAccountDrawer } from "@/components/create-account-drawer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AccountCard } from "./account-card";
import { BudgetProgress } from "./budget-progress";
import { DashboardOverview } from "./transaction-overview";
import { GoalsAndBills } from "./goals-bills";
import { SmartAlertsWidget } from "./smart-alerts";
import { AIAssistantBox } from "./ai-assistant";

const widgets = [
  { key: "goals", label: "Savings goals" },
  { key: "bills", label: "Bill calendar" },
  { key: "alerts", label: "Smart alerts" },
  { key: "ai", label: "Finance assistant" },
];

const currency = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 2,
  minimumFractionDigits: 0,
});

export function DashboardClient({ accounts, transactions = [], budgetData }) {
  const [visibleWidgets, setVisibleWidgets] = useState({
    goals: true,
    bills: true,
    alerts: true,
    ai: true,
  });

  const month = new Date();
  const monthLabel = format(month, "MMMM yyyy");
  const weeks = ["1–7", "8–14", "15–21", `22–${getDaysInMonth(month)}`].map((week) => ({
    week, income: 0, spending: 0,
  }));

  for (const transaction of transactions) {
    const date = new Date(transaction.date);
    if (!isSameMonth(date, month) || date > month) continue;
    const index = Math.min(Math.floor((date.getDate() - 1) / 7), weeks.length - 1);
    const amount = Number(transaction.amount) || 0;
    if (transaction.type === "INCOME") weeks[index].income += amount;
    if (transaction.type === "EXPENSE") weeks[index].spending += amount;
  }

  const balance = accounts.reduce((total, account) => total + (Number(account.balance) || 0), 0);
  const income = weeks.reduce((total, week) => total + week.income, 0);
  const spending = weeks.reduce((total, week) => total + week.spending, 0);

  return (
    <div className="space-y-5">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-4xl font-normal tracking-tight sm:text-5xl">Overview</h1>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">Balances, cash flow, and budget at a glance.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <CreateAccountDrawer><Button variant="outline">Add account</Button></CreateAccountDrawer>
          <Button asChild><Link href="/transaction/create"><Plus /> Add transaction</Link></Button>
        </div>
      </header>

      <dl className="grid grid-cols-2 gap-y-4 rounded-lg bg-ledger p-5 text-ledger-foreground sm:grid-cols-3 sm:p-6">
        <div className="col-span-2 border-b border-ledger-muted/30 pb-3 sm:col-span-1 sm:border-b-0 sm:pb-0 sm:pr-4">
          <dt className="text-sm text-ledger-muted">Total balance</dt>
          <dd className="mt-1 font-serif text-[clamp(1.9rem,4vw,3rem)] leading-tight tracking-tight tabular-nums">{currency.format(balance)}</dd>
          <dd className="mt-1 text-xs text-ledger-muted">Across {accounts.length} {accounts.length === 1 ? "account" : "accounts"}</dd>
        </div>
        <div className="pr-2 sm:border-l sm:border-ledger-muted/30 sm:px-5">
          <dt className="text-sm text-ledger-muted">Income</dt>
          <dd className="mt-1 break-words text-lg font-medium tracking-tight tabular-nums sm:text-2xl">{currency.format(income)}</dd>
          <dd className="mt-1 text-xs text-ledger-muted">{monthLabel}</dd>
        </div>
        <div className="border-l border-ledger-muted/30 pl-3 sm:pl-5">
          <dt className="text-sm text-ledger-muted">Spending</dt>
          <dd className="mt-1 break-words text-lg font-medium tracking-tight tabular-nums sm:text-2xl">{currency.format(spending)}</dd>
          <dd className="mt-1 text-xs text-ledger-muted">{monthLabel}</dd>
        </div>
      </dl>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)]">
        <Card>
          <CardHeader className="flex flex-row flex-wrap items-start justify-between gap-3 space-y-0 pb-3">
            <div>
              <CardTitle>Cash flow</CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">{monthLabel}</p>
            </div>
            <div className="flex gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><span className="size-2 rounded-sm bg-chart-1" />Income</span>
              <span className="flex items-center gap-1.5"><span className="size-2 rounded-sm bg-chart-2" />Spending</span>
            </div>
          </CardHeader>
          <CardContent>
            {income || spending ? (
              <div className="h-48 min-w-0" role="img" aria-label={`Income and spending by week of ${monthLabel}`}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeks} margin={{ top: 7, right: 6, bottom: 0, left: 0 }}>
                    <CartesianGrid vertical={false} stroke="hsl(var(--border))" />
                    <XAxis dataKey="week" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                    <YAxis width={54} tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} tickFormatter={(value) => value >= 1000 ? `₹${value / 1000}k` : `₹${value}`} />
                    <Tooltip
                      formatter={(value) => currency.format(value)}
                      contentStyle={{ background: "hsl(var(--card))", borderColor: "hsl(var(--border))", color: "hsl(var(--foreground))", borderRadius: 8 }}
                      itemStyle={{ color: "hsl(var(--foreground))" }}
                      cursor={{ fill: "hsl(var(--muted))" }}
                    />
                    <Bar name="Income" dataKey="income" fill="hsl(var(--chart-1))" maxBarSize={22} radius={[3, 3, 0, 0]} />
                    <Bar name="Spending" dataKey="spending" fill="hsl(var(--chart-2))" maxBarSize={22} radius={[3, 3, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <p className="grid min-h-48 place-items-center rounded-md bg-muted px-4 text-center text-sm text-muted-foreground">No cash flow recorded for this month yet.</p>
            )}
          </CardContent>
        </Card>
        <div id="budget" className="min-w-0 scroll-mt-32 lg:scroll-mt-20">
          <BudgetProgress
            initialBudget={budgetData?.budget}
            currentExpenses={budgetData?.currentExpenses || 0}
          />
        </div>
      </div>

      <DashboardOverview accounts={accounts} transactions={transactions} />

      <section id="accounts" className="space-y-3 scroll-mt-32 lg:scroll-mt-20">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-semibold tracking-tight">Accounts</h2>
          {accounts.length > 0 && <CreateAccountDrawer><Button variant="outline" size="sm"><Plus /> Add account</Button></CreateAccountDrawer>}
        </div>
        {accounts.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {accounts.map((account) => <AccountCard key={account.id} account={account} />)}
          </div>
        ) : (
          <Card className="flex flex-wrap items-center justify-between gap-4 p-5">
            <div>
              <h3 className="flex items-center gap-2 font-semibold"><Wallet className="size-4 text-primary" /> Add your first account</h3>
              <p className="mt-1 text-sm text-muted-foreground">Start with a checking or savings account to track your balance.</p>
            </div>
            <CreateAccountDrawer><Button>Add account</Button></CreateAccountDrawer>
          </Card>
        )}
      </section>

      <section id="planning" className="space-y-3 scroll-mt-32 lg:scroll-mt-20">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-semibold tracking-tight">Planning</h2>
          <Button asChild variant="link" size="sm"><a href="#budget">Monthly budget</a></Button>
        </div>
        <GoalsAndBills showGoals={visibleWidgets.goals} showBills={visibleWidgets.bills} />
      </section>

      <section id="insights" className="space-y-3 scroll-mt-32 lg:scroll-mt-20">
        <h2 className="text-lg font-semibold tracking-tight">Insights</h2>
        <SmartAlertsWidget show={visibleWidgets.alerts} transactions={transactions} />
        <AIAssistantBox show={visibleWidgets.ai} />
      </section>

      <details className="rounded-lg border bg-card px-4 py-3">
        <summary className="w-fit cursor-pointer text-sm font-medium">Customize dashboard</summary>
        <div className="mt-3 flex flex-wrap gap-x-6 gap-y-3">
          {widgets.map(({ key, label }) => (
            <label key={key} className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground">
              <input
                type="checkbox"
                className="size-4 accent-primary"
                checked={visibleWidgets[key]}
                onChange={(event) => {
                  const checked = event.target.checked;
                  setVisibleWidgets((previous) => ({ ...previous, [key]: checked }));
                }}
              />
              {label}
            </label>
          ))}
        </div>
      </details>
    </div>
  );
}
