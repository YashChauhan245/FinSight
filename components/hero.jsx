"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Sparkles, TrendingUp, ShieldCheck } from "lucide-react";

const HeroSection = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    const imageElement = imageRef.current;
    if (!imageElement) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 80;

      if (scrollPosition > scrollThreshold) {
        imageElement.classList.add("scrolled");
      } else {
        imageElement.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="pt-24 md:pt-32 pb-16 px-4 md:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Top Grid: Hero Content + Right Mock App UI Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
        
        {/* Left Column: Heading, Subtitle & Buttons */}
        <div className="lg:col-span-7 space-y-6 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet-200 bg-violet-50/80 text-violet-700 text-xs font-semibold tracking-wide">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Automated Personal Finance</span>
          </div>

          <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6.5xl text-slate-900 font-manrope">
            Financial clarity,{" "}
            <span className="bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent">
              engineered for what&apos;s next.
            </span>
          </h1>

          <p className="text-sm leading-relaxed text-slate-650 md:text-[17px] max-w-xl">
            FinSight automates cash flow tracking, budget simulations, and savings milestones. No spreadsheets. No cognitive load.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link href="/dashboard">
              <Button size="lg" className="bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-700 hover:to-cyan-600 text-white font-semibold shadow-lg shadow-violet-500/20 px-7 py-6 rounded-xl transition-all duration-200 hover:-translate-y-0.5">
                <span>Connect Account</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>

            <a href="#features">
              <Button size="lg" variant="outline" className="bg-white border-slate-300 hover:bg-slate-100 text-slate-800 font-medium px-7 py-6 rounded-xl transition-all duration-200">
                Explore Features
              </Button>
            </a>
          </div>

          {/* Micro badges */}
          <div className="flex items-center gap-6 pt-4 text-xs font-medium text-slate-500">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              <span>Read-only access (Plaid)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <TrendingUp className="h-4 w-4 text-cyan-500" />
              <span>Predictive Analytics</span>
            </div>
          </div>
        </div>

        {/* Right Column: Mock App UI Preview card */}
        <div className="lg:col-span-5">
          <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xl shadow-slate-300/40 space-y-4 hover:shadow-cyan-500/10 transition-shadow duration-300">
            {/* Header row */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-400" />
                <div className="h-3 w-3 rounded-full bg-amber-400" />
                <div className="h-3 w-3 rounded-full bg-emerald-400" />
                <span className="ml-2 text-xs font-bold text-slate-800 font-inter">
                  FinSight Dashboard
                </span>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-violet-50 text-violet-700 border border-violet-100">
                ACTIVE CHECKING
              </span>
            </div>

            {/* Metric Row (3 columns) */}
            <div className="grid grid-cols-3 gap-2">
              <div className="rounded-xl bg-slate-50 p-2.5 text-left border border-slate-100">
                <p className="text-[10px] font-semibold text-slate-400">Income</p>
                <p className="text-xs md:text-sm font-extrabold text-slate-900 mt-0.5">
                  Rs 54,000
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-2.5 text-left border border-slate-100">
                <p className="text-[10px] font-semibold text-slate-400">Expenses</p>
                <p className="text-xs md:text-sm font-extrabold text-slate-900 mt-0.5">
                  Rs 31,200
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-2.5 text-left border border-slate-100">
                <p className="text-[10px] font-semibold text-slate-400">Net Savings</p>
                <p className="text-xs md:text-sm font-extrabold text-emerald-600 mt-0.5">
                  Rs 22,800
                </p>
              </div>
            </div>

            {/* Custom SVG Sparkline Area Chart */}
            <div className="h-28 w-full border border-slate-100 rounded-xl p-2 bg-slate-50/50">
              <div className="flex justify-between text-[10px] font-bold text-slate-400 pb-1.5 text-left">
                <span>30-DAY CASHFLOW TREND</span>
                <span className="text-violet-600">+12.4% THIS WEEK</span>
              </div>
              <div className="h-20 w-full">
                <svg viewBox="0 0 100 30" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgb(124, 58, 237)" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="rgb(124, 58, 237)" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  {/* Grid Lines */}
                  <line x1="0" y1="10" x2="100" y2="10" stroke="#e2e8f0" strokeWidth="0.25" strokeDasharray="1" />
                  <line x1="0" y1="20" x2="100" y2="20" stroke="#e2e8f0" strokeWidth="0.25" strokeDasharray="1" />
                  <line x1="0" y1="30" x2="100" y2="30" stroke="#cbd5e1" strokeWidth="0.5" />
                  {/* Area path */}
                  <path
                    d="M 0 30 L 0 22 C 10 18, 20 28, 30 20 C 40 12, 50 15, 60 8 C 70 1, 80 18, 90 12 L 100 10 L 100 30 Z"
                    fill="url(#chartGradient)"
                  />
                  {/* Stroke path */}
                  <path
                    d="M 0 22 C 10 18, 20 28, 30 20 C 40 12, 50 15, 60 8 C 70 1, 80 18, 90 12 L 100 10"
                    fill="none"
                    stroke="rgb(124, 58, 237)"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            {/* Category Budgets */}
            <div className="space-y-2.5 pt-1.5 text-left">
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-semibold text-slate-700">
                  <span>Dining Out</span>
                  <span>Rs 1,400 left of Rs 5,000</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: "72%" }} />
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-semibold text-slate-700">
                  <span>Subscriptions</span>
                  <span>Rs 850 left of Rs 2,000</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: "57%" }} />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;