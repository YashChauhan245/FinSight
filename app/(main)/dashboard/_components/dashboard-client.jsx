"use client";

import { useState } from "react";
import { CreateAccountDrawer } from "@/components/create-account-drawer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Wallet, LayoutGrid } from "lucide-react";
import { AccountCard } from "./account-card";
import { BudgetProgress } from "./budget-progress";
import { DashboardOverview } from "./transaction-overview";
import { GoalsAndBills } from "./goals-bills";
import { SmartAlertsWidget } from "./smart-alerts";
import { AIAssistantBox } from "./ai-assistant";

const WIDGETS = [
  { key: "goals", label: "Goals" },
  { key: "bills", label: "Bills" },
  { key: "alerts", label: "Alerts" },
  { key: "ai", label: "AI Assistant" },
];

export function DashboardClient({ accounts, transactions, budgetData }) {
  const [visibleWidgets, setVisibleWidgets] = useState({
    goals: true,
    bills: true,
    alerts: true,
    ai: true,
  });

  const toggleWidget = (key) =>
    setVisibleWidgets((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="px-4 sm:px-6 pt-2 pb-12 max-w-7xl mx-auto space-y-6 min-h-screen font-inter">
      {/* ── 1. Dashboard Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div className="space-y-1.5 text-left">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-md bg-violet-50 border border-violet-100 text-[11px] font-semibold text-violet-700 tracking-wide">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-600"></span>
            </span>
            <span>Real-time Financial Analytics</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 font-inter">
            Financial Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-medium">
            Monitor cashflow, track monthly budgets, and review automated AI insights.
          </p>
        </div>

        <CreateAccountDrawer>
          <Button className="bg-violet-600 hover:bg-violet-700 text-white font-medium text-sm gap-2 shadow-sm transition-all rounded-xl h-10 px-4 shrink-0">
            <Plus className="h-4 w-4" />
            <span>Add Account</span>
          </Button>
        </CreateAccountDrawer>
      </div>

      {/* ── 2. Budget Progress ── */}
      <BudgetProgress
        initialBudget={budgetData?.budget}
        currentExpenses={budgetData?.currentExpenses || 0}
      />

      {/* ── 3 & 4. Dashboard Overview (Expense Breakdown + Recent Transactions) ── */}
      <DashboardOverview
        accounts={accounts}
        transactions={transactions || []}
      />

      {/* ── 5. Connected Accounts ── */}
      <div className="space-y-3.5 text-left">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <h2 className="text-lg font-bold tracking-tight text-gray-900 font-inter">
              Connected Accounts
            </h2>
            <span className="text-xs font-semibold text-gray-600 bg-gray-100 border border-gray-200 px-2.5 py-0.5 rounded-full tabular-nums">
              {accounts.length} Active
            </span>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <CreateAccountDrawer>
            <Card className="hover:border-violet-300 hover:bg-violet-50/10 transition-all duration-200 cursor-pointer border-dashed border-2 border-gray-200 bg-white min-h-[135px] flex items-center justify-center group rounded-xl shadow-sm">
              <CardContent className="flex flex-col items-center justify-center text-gray-400 group-hover:text-violet-600 transition-colors py-6">
                <div className="p-2.5 rounded-lg bg-gray-100 group-hover:bg-violet-100 mb-2 transition-colors">
                  <Plus className="h-4 w-4" />
                </div>
                <p className="text-sm font-semibold text-gray-800 font-inter group-hover:text-violet-700">Add New Account</p>
                <p className="text-xs text-gray-400 font-medium mt-0.5">
                  Checking, Savings or Credit Card
                </p>
              </CardContent>
            </Card>
          </CreateAccountDrawer>

          {accounts.length > 0 &&
            accounts.map((account) => (
              <AccountCard key={account.id} account={account} />
            ))}
        </div>

        {/* Onboarding Welcome Banner */}
        {accounts.length === 0 && (
          <div className="mt-2 p-6 md:p-7 bg-gray-50 border border-gray-200 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="space-y-1.5 text-left">
              <div className="flex items-center gap-2 text-violet-700 font-semibold text-xs uppercase tracking-wider">
                <Wallet className="h-4 w-4" />
                <span>Get Started with FinSight</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 font-inter">
                Connect Your First Account
              </h3>
              <p className="text-sm text-gray-600 max-w-xl leading-relaxed">
                Add a checking, savings, or wallet account to view AI cashflow analytics, category budget tracking, and automated bill alerts.
              </p>
            </div>
            <CreateAccountDrawer>
              <Button
                size="lg"
                className="bg-violet-600 hover:bg-violet-700 text-white font-medium px-5 py-2.5 rounded-xl shadow-sm transition-all shrink-0"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Account Now
              </Button>
            </CreateAccountDrawer>
          </div>
        )}
      </div>

      {/* ── Widget Visibility Controls ── */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-white border border-gray-200 rounded-xl shadow-sm">
        <div className="flex items-center gap-2 text-xs font-semibold text-gray-700 px-1">
          <LayoutGrid className="h-4 w-4 text-violet-600" />
          <span>Dashboard View Toggles:</span>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          {WIDGETS.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              suppressHydrationWarning
              onClick={() => toggleWidget(key)}
              className={`text-xs font-medium px-3 py-1.5 rounded-lg border transition-all duration-150 ${
                visibleWidgets[key]
                  ? "bg-gray-900 text-white border-gray-900 shadow-sm"
                  : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ── 6 & 7. Goals & Bills ── */}
      <GoalsAndBills
        showGoals={visibleWidgets.goals}
        showBills={visibleWidgets.bills}
      />

      {/* ── Smart Alerts ── */}
      <SmartAlertsWidget
        show={visibleWidgets.alerts}
        transactions={transactions || []}
      />

      {/* ── 8. AI Assistant ── */}
      <AIAssistantBox show={visibleWidgets.ai} />
    </div>
  );
}
