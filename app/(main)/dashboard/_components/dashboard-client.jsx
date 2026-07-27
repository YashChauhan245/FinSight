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
    <div className="px-5 pt-1 pb-8 max-w-7xl mx-auto space-y-5 min-h-screen">
      {/* ── Dashboard Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div className="text-left">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-violet-600 to-cyan-500 bg-clip-text text-transparent font-manrope">
            Dashboard
          </h1>
        </div>
        <CreateAccountDrawer>
          <Button className="bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-700 hover:to-cyan-600 text-white font-bold gap-2 shadow-md">
            <Plus className="h-4 w-4" />
            Add Account
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
          <h2 className="text-xl font-bold tracking-tight text-slate-900 font-manrope">
            Connected Accounts
          </h2>
          <span className="text-xs text-slate-400 font-inter bg-slate-100 px-2.5 py-1 rounded-full font-medium">
            {accounts.length}{" "}
            {accounts.length === 1 ? "Account" : "Accounts"} Active
          </span>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <CreateAccountDrawer>
            <Card className="hover:shadow-md transition-all duration-200 cursor-pointer border-dashed border-2 border-slate-200 hover:border-violet-400 hover:bg-violet-50/30 bg-white min-h-[140px] flex items-center justify-center group">
              <CardContent className="flex flex-col items-center justify-center text-slate-400 group-hover:text-violet-600 transition-colors py-6">
                <div className="p-3 rounded-full bg-slate-100 group-hover:bg-violet-100 mb-2.5 transition-colors">
                  <Plus className="h-6 w-6" />
                </div>
                <p className="text-sm font-semibold font-manrope">Add New Account</p>
                <p className="text-xs text-slate-400 font-inter mt-0.5">
                  Bank, Credit Card or Wallet
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
          <div className="mt-2 p-6 md:p-8 bg-gradient-to-br from-violet-500/10 via-cyan-500/8 to-transparent border border-violet-200/60 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-left">
              <div className="flex items-center gap-2 text-violet-700 font-bold text-sm">
                <Wallet className="h-5 w-5" />
                <span>Welcome to FinSight AI!</span>
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 font-manrope">
                Connect Your First Account to Get Started
              </h3>
              <p className="text-sm text-slate-600 max-w-xl leading-relaxed">
                Create a checking, savings, or investment account to unlock AI
                cashflow analytics, budget progress tracking, and automated
                recurring bill alerts.
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
      <div className="flex flex-wrap items-center gap-2 py-2 border-t border-b border-slate-100">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 mr-2">
          <LayoutGrid className="h-3.5 w-3.5" />
          Widgets:
        </div>
        {WIDGETS.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            suppressHydrationWarning
            onClick={() => toggleWidget(key)}
            className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-all ${
              visibleWidgets[key]
                ? "bg-violet-600 text-white border-violet-600 shadow-sm"
                : "bg-white text-slate-500 border-slate-200 hover:border-slate-300"
            }`}
          >
            {label}
          </button>
        ))}
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
