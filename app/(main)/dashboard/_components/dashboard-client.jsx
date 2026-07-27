"use client";

import { useState } from "react";
import { CreateAccountDrawer } from "@/components/create-account-drawer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Wallet, LayoutGrid, Sparkles, Activity } from "lucide-react";
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
    <div className="px-4 sm:px-6 pt-2 pb-12 max-w-7xl mx-auto space-y-6 min-h-screen font-jakarta">
      {/* ── Dashboard Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white/70 backdrop-blur-md p-6 rounded-2xl border border-slate-200/80 shadow-[0_1px_3px_0_rgba(15,23,42,0.03)]">
        <div className="space-y-1 text-left">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-violet-50 border border-violet-100 text-[11px] font-bold text-violet-700 tracking-wide">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-600"></span>
            </span>
            <span>Real-time Financial Analytics</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 font-jakarta">
            Financial Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Monitor cashflow, track monthly budgets, and review automated AI insights.
          </p>
        </div>

        <CreateAccountDrawer>
          <Button className="bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-600 hover:opacity-95 text-white font-bold text-sm gap-2 shadow-md shadow-violet-500/20 hover:shadow-lg hover:shadow-violet-500/30 transition-all rounded-xl h-11 px-5 shrink-0">
            <Plus className="h-4 w-4" />
            <span>Add Account</span>
          </Button>
        </CreateAccountDrawer>
      </div>

      {/* ── Budget Progress ── */}
      <BudgetProgress
        initialBudget={budgetData?.budget}
        currentExpenses={budgetData?.currentExpenses || 0}
      />

      {/* ── Dashboard Overview (Recent Transactions + Pie Chart) ── */}
      <DashboardOverview
        accounts={accounts}
        transactions={transactions || []}
      />

      {/* ── Connected Accounts ── */}
      <div className="space-y-4 text-left">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold tracking-tight text-slate-900 font-jakarta">
              Connected Accounts
            </h2>
            <span className="text-xs font-semibold text-slate-500 bg-slate-100 border border-slate-200/80 px-2.5 py-0.5 rounded-full tabular-nums">
              {accounts.length} {accounts.length === 1 ? "Active" : "Active"}
            </span>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <CreateAccountDrawer>
            <Card className="hover:shadow-md transition-all duration-200 cursor-pointer border-dashed border-2 border-slate-200 hover:border-violet-400 hover:bg-violet-50/20 bg-white/70 min-h-[140px] flex items-center justify-center group rounded-2xl">
              <CardContent className="flex flex-col items-center justify-center text-slate-400 group-hover:text-violet-600 transition-colors py-6">
                <div className="p-3 rounded-xl bg-slate-100 group-hover:bg-violet-100 mb-2.5 transition-colors">
                  <Plus className="h-5 w-5" />
                </div>
                <p className="text-sm font-bold text-slate-800 font-jakarta group-hover:text-violet-700">Add New Account</p>
                <p className="text-xs text-slate-400 font-medium mt-0.5">
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
          <div className="mt-2 p-6 md:p-8 bg-gradient-to-br from-violet-600/10 via-cyan-500/8 to-transparent border border-violet-200/80 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="space-y-2 text-left">
              <div className="flex items-center gap-2 text-violet-700 font-bold text-xs uppercase tracking-wider">
                <Wallet className="h-4 w-4" />
                <span>Get Started with FinSight</span>
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 font-jakarta">
                Connect Your First Account
              </h3>
              <p className="text-sm text-slate-600 max-w-xl leading-relaxed">
                Add a checking, savings, or wallet account to view AI cashflow analytics, category budget tracking, and automated bill alerts.
              </p>
            </div>
            <CreateAccountDrawer>
              <Button
                size="lg"
                className="bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-bold px-6 py-5 rounded-xl shadow-md hover:shadow-lg transition-all shrink-0"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Account Now
              </Button>
            </CreateAccountDrawer>
          </div>
        )}
      </div>

      {/* ── Widget Visibility Controls ── */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-white/80 border border-slate-200/80 rounded-2xl backdrop-blur-md">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-600 px-1">
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
              className={`text-xs font-semibold px-3 py-1.5 rounded-xl border transition-all duration-200 ${
                visibleWidgets[key]
                  ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                  : "bg-slate-100/80 text-slate-600 border-slate-200 hover:bg-slate-200/70"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Goals & Bills ── */}
      <GoalsAndBills
        showGoals={visibleWidgets.goals}
        showBills={visibleWidgets.bills}
      />

      {/* ── Smart Alerts ── */}
      <SmartAlertsWidget
        show={visibleWidgets.alerts}
        transactions={transactions || []}
      />

      {/* ── AI Assistant ── */}
      <AIAssistantBox show={visibleWidgets.ai} />
    </div>
  );
}
