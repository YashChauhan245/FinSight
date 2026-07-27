"use client";

import { useState } from "react";
import { Sparkles, Palette, Wallet, Plus, ArrowRight } from "lucide-react";
import { CreateAccountDrawer } from "@/components/create-account-drawer";
import { Button } from "@/components/ui/button";

export function DashboardHeaderTheme({ accountCount }) {
  const [activeTheme, setActiveTheme] = useState("core");

  const themes = [
    { id: "core", name: "Brand Gradient", color: "from-violet-500 to-cyan-500" },
    { id: "ocean", name: "Ocean Blue", color: "from-blue-600 to-blue-400" },
    { id: "emerald", name: "Emerald Green", color: "from-emerald-600 to-teal-400" },
    { id: "sunset", name: "Sunset Coral", color: "from-orange-500 to-amber-400" },
  ];

  return (
    <div className="space-y-6">
      {/* Top Header Row with Title & Theme Accent Selector */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200">
            <Sparkles className="h-3.5 w-3.5 text-violet-600" />
            <span>Light Mode Dashboard</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight gradient-title font-manrope">
            Dashboard Overview
          </h1>
          <p className="text-sm md:text-base text-slate-600 font-inter">
            Monitor accounts, budgets, AI insights, and recurring bills in real time.
          </p>
        </div>

        {/* Dynamic Color Theme Accent Switcher */}
        <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm self-start md:self-auto">
          <Palette className="h-4 w-4 text-slate-500 ml-1.5 shrink-0" />
          <span className="text-xs font-semibold text-slate-600 mr-1 hidden sm:inline">Accent:</span>
          <div className="flex items-center gap-1.5">
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => setActiveTheme(theme.id)}
                title={theme.name}
                className={`h-6 w-6 rounded-full bg-gradient-to-r ${theme.color} transition-all duration-200 ${
                  activeTheme === theme.id
                    ? "ring-2 ring-slate-900 ring-offset-2 scale-110"
                    : "opacity-70 hover:opacity-100"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Onboarding / Welcoming Banner (if accountCount is 0 or low) */}
      {accountCount === 0 && (
        <div className="section-shell p-6 md:p-8 bg-gradient-to-r from-violet-500/10 via-cyan-500/10 to-transparent border border-violet-200/80 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-left">
            <div className="flex items-center gap-2 text-violet-700 font-bold text-sm">
              <Wallet className="h-5 w-5" />
              <span>Welcome to FinSight AI!</span>
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 font-manrope">
              Connect Your First Account to Get Started
            </h3>
            <p className="text-xs md:text-sm text-slate-600 max-w-xl leading-relaxed">
              Create a checking, savings, or investment account to unlock AI cashflow analytics, budget progress tracking, and automated recurring bill alerts.
            </p>
          </div>

          <CreateAccountDrawer>
            <Button size="lg" className="bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-bold px-6 py-5 rounded-xl shadow-md hover:shadow-lg transition-all shrink-0">
              <Plus className="mr-2 h-4 w-4" />
              Add Account Now
            </Button>
          </CreateAccountDrawer>
        </div>
      )}
    </div>
  );
}
