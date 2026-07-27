"use client";

import React, { useEffect, useRef } from "react";
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
    <section className="pt-20 md:pt-28 pb-14 px-4 md:px-8 max-w-7xl mx-auto overflow-hidden font-inter">
      {/* Top Grid: Hero Content + Right Mock App UI Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-12">
        
        {/* Left Column: Heading, Subtitle & Buttons */}
        <div className="lg:col-span-7 space-y-5 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet-100 bg-violet-50 text-violet-700 text-xs font-semibold tracking-wide">
            <Sparkles className="h-3.5 w-3.5 text-violet-600" />
            <span>Automated Personal Finance</span>
          </div>

          <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl text-gray-900 font-inter">
            Financial clarity,{" "}
            <span className="text-violet-600">
              engineered for what&apos;s next.
            </span>
          </h1>

          <p className="text-sm leading-relaxed text-gray-600 md:text-base max-w-xl">
            FinSight automates cash flow tracking, budget simulations, and savings milestones. No spreadsheets. No cognitive load.
          </p>

          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            <Link href="/dashboard">
              <Button size="lg" className="bg-violet-600 hover:bg-violet-700 text-white font-medium shadow-sm px-6 py-5 rounded-xl transition-all">
                <span>Connect Account</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>

            <a href="#features">
              <Button size="lg" variant="outline" className="bg-white border-gray-200 hover:bg-gray-50 text-gray-700 font-medium px-6 py-5 rounded-xl shadow-sm transition-all">
                Explore Features
              </Button>
            </a>
          </div>

          {/* Micro badges */}
          <div className="flex items-center gap-6 pt-3 text-xs font-medium text-gray-500">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>Read-only access</span>
            </div>
            <div className="flex items-center gap-1.5">
              <TrendingUp className="h-4 w-4 text-blue-600" />
              <span>Predictive Analytics</span>
            </div>
          </div>
        </div>

        {/* Right Column: Mock App UI Preview card */}
        <div className="lg:col-span-5">
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-4 text-left">
            {/* Header row */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-400" />
                <div className="h-3 w-3 rounded-full bg-amber-400" />
                <div className="h-3 w-3 rounded-full bg-emerald-400" />
                <span className="ml-2 text-xs font-bold text-gray-900 font-inter">
                  FinSight Dashboard
                </span>
              </div>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-violet-50 text-violet-700 border border-violet-100">
                ACTIVE CHECKING
              </span>
            </div>

            {/* Metric Row (3 columns) */}
            <div className="grid grid-cols-3 gap-2">
              <div className="rounded-lg bg-gray-50 p-2.5 text-left border border-gray-100">
                <p className="text-[10px] font-medium text-gray-500">Income</p>
                <p className="text-xs md:text-sm font-bold text-gray-900 mt-0.5 tabular-nums">
                  ₹54,000
                </p>
              </div>

              <div className="rounded-lg bg-gray-50 p-2.5 text-left border border-gray-100">
                <p className="text-[10px] font-medium text-gray-500">Expenses</p>
                <p className="text-xs md:text-sm font-bold text-gray-900 mt-0.5 tabular-nums">
                  ₹31,200
                </p>
              </div>

              <div className="rounded-lg bg-gray-50 p-2.5 text-left border border-gray-100">
                <p className="text-[10px] font-medium text-gray-500">Net Savings</p>
                <p className="text-xs md:text-sm font-bold text-emerald-600 mt-0.5 tabular-nums">
                  ₹22,800
                </p>
              </div>
            </div>

            {/* Custom SVG Sparkline Area Chart */}
            <div className="h-28 w-full border border-gray-100 rounded-lg p-2.5 bg-gray-50/60">
              <div className="flex justify-between text-[10px] font-semibold text-gray-500 pb-1.5 text-left">
                <span>30-DAY CASHFLOW TREND</span>
                <span className="text-violet-600 font-bold">+12.4% THIS WEEK</span>
              </div>
              <div className="h-18 w-full">
                <svg viewBox="0 0 100 30" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="heroChartGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgb(124, 58, 237)" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="rgb(124, 58, 237)" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <line x1="0" y1="10" x2="100" y2="10" stroke="#e5e7eb" strokeWidth="0.25" strokeDasharray="1" />
                  <line x1="0" y1="20" x2="100" y2="20" stroke="#e5e7eb" strokeWidth="0.25" strokeDasharray="1" />
                  <line x1="0" y1="30" x2="100" y2="30" stroke="#e5e7eb" strokeWidth="0.5" />
                  <path
                    d="M 0 30 L 0 22 C 10 18, 20 28, 30 20 C 40 12, 50 15, 60 8 C 70 1, 80 18, 90 12 L 100 10 L 100 30 Z"
                    fill="url(#heroChartGradient)"
                  />
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
            <div className="space-y-2 pt-1 text-left">
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-semibold text-gray-700">
                  <span>Dining Out</span>
                  <span>₹1,400 left of ₹5,000</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: "72%" }} />
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-semibold text-gray-700">
                  <span>Subscriptions</span>
                  <span>₹850 left of ₹2,000</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
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