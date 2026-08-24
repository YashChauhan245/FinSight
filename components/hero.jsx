"use client";

import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, TrendingUp, ShieldCheck, Zap } from "lucide-react";

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
    <section className="relative pt-20 md:pt-28 pb-16 px-4 md:px-8 max-w-7xl mx-auto overflow-hidden font-inter">

      {/* ── Decorative background blobs ── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 right-0 w-[520px] h-[520px] rounded-full bg-blue-50 opacity-80 blur-3xl" />
        <div className="absolute top-1/2 -left-20 w-[340px] h-[340px] rounded-full bg-slate-100 opacity-60 blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-[260px] h-[260px] rounded-full bg-blue-50/50 opacity-50 blur-2xl" />
      </div>

      {/* ── Top Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-12">

        {/* Left Column */}
        <div className="lg:col-span-7 space-y-6 text-left">

          <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl text-gray-900 font-inter">
            Financial clarity,{" "}
            <span className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 bg-clip-text text-transparent">
              engineered for what&apos;s next.
            </span>
          </h1>

          <p className="text-sm leading-relaxed text-gray-500 md:text-base max-w-xl">
            FinSight automates cash flow tracking, budget simulations, and savings milestones.{" "}
            <span className="text-gray-700 font-medium">No spreadsheets. No cognitive load.</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Link href="/dashboard">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-800 to-blue-700 hover:from-blue-900 hover:to-blue-800 text-white font-semibold shadow-md shadow-blue-900/20 px-7 py-5 rounded-xl transition-all duration-200 gap-2"
              >
                Connect Account
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>

            <a href="#features">
              <Button
                size="lg"
                variant="outline"
                className="bg-white/80 border-gray-200 hover:bg-gray-50 text-gray-700 font-medium px-6 py-5 rounded-xl shadow-sm transition-all backdrop-blur-sm"
              >
                Explore Features
              </Button>
            </a>
          </div>

          {/* Trust pills */}
          <div className="flex flex-wrap items-center gap-2.5 pt-1">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-full px-3 py-1.5 shadow-sm">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
              Read-only access
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-full px-3 py-1.5 shadow-sm">
              <TrendingUp className="h-3.5 w-3.5 text-blue-600" />
              Predictive Analytics
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-full px-3 py-1.5 shadow-sm">
              <Zap className="h-3.5 w-3.5 text-amber-500" />
              AI-Powered
            </span>
          </div>
        </div>

        {/* Right Column: Premium Dashboard Card */}
        <div className="lg:col-span-5" ref={imageRef}>
          <div className="relative rounded-2xl border border-gray-200/80 bg-white shadow-xl ring-1 ring-gray-900/5 overflow-hidden">

            {/* Gradient accent top strip */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-800 via-blue-500 to-blue-300" />

            <div className="p-5 space-y-4">
              {/* Header row */}
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
                  <div className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  <span className="ml-2 text-xs font-bold text-gray-900 font-inter">
                    FinSight Dashboard
                  </span>
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                  ● LIVE
                </span>
              </div>

              {/* Metric Row */}
              <div className="grid grid-cols-3 gap-2">
                <div className="rounded-xl bg-gradient-to-br from-gray-50 to-gray-100/50 p-2.5 text-left border border-gray-100 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-0.5 h-full bg-blue-400 rounded-l-xl" />
                  <p className="text-[10px] font-medium text-gray-400 pl-1">Income</p>
                  <p className="text-xs md:text-sm font-bold text-gray-900 mt-0.5 tabular-nums pl-1">
                    ₹54,000
                  </p>
                </div>
                <div className="rounded-xl bg-gradient-to-br from-gray-50 to-gray-100/50 p-2.5 text-left border border-gray-100 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-0.5 h-full bg-rose-400 rounded-l-xl" />
                  <p className="text-[10px] font-medium text-gray-400 pl-1">Expenses</p>
                  <p className="text-xs md:text-sm font-bold text-gray-900 mt-0.5 tabular-nums pl-1">
                    ₹31,200
                  </p>
                </div>
                <div className="rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100/30 p-2.5 text-left border border-emerald-100 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-0.5 h-full bg-emerald-500 rounded-l-xl" />
                  <p className="text-[10px] font-medium text-emerald-600/80 pl-1">Savings</p>
                  <p className="text-xs md:text-sm font-bold text-emerald-600 mt-0.5 tabular-nums pl-1">
                    ₹22,800
                  </p>
                </div>
              </div>

              {/* SVG Sparkline Chart */}
              <div className="h-28 w-full border border-gray-100 rounded-xl p-2.5 bg-gradient-to-b from-gray-50/80 to-white">
                <div className="flex justify-between text-[10px] font-semibold text-gray-400 pb-1.5">
                  <span className="tracking-wide uppercase">30-Day Cashflow</span>
                  <span className="text-blue-700 font-bold">+12.4% ↑</span>
                </div>
                <div className="h-16 w-full">
                  <svg viewBox="0 0 100 30" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="heroChartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="rgb(30, 64, 175)" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="rgb(30, 64, 175)" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <line x1="0" y1="10" x2="100" y2="10" stroke="#f3f4f6" strokeWidth="0.3" strokeDasharray="2" />
                    <line x1="0" y1="20" x2="100" y2="20" stroke="#f3f4f6" strokeWidth="0.3" strokeDasharray="2" />
                    <line x1="0" y1="30" x2="100" y2="30" stroke="#e5e7eb" strokeWidth="0.4" />
                    <path
                      d="M 0 30 L 0 22 C 10 18, 20 28, 30 20 C 40 12, 50 15, 60 8 C 70 1, 80 18, 90 12 L 100 10 L 100 30 Z"
                      fill="url(#heroChartGradient)"
                    />
                    <path
                      d="M 0 22 C 10 18, 20 28, 30 20 C 40 12, 50 15, 60 8 C 70 1, 80 18, 90 12 L 100 10"
                      fill="none"
                      stroke="rgb(30, 64, 175)"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* End dot */}
                    <circle cx="100" cy="10" r="1.8" fill="rgb(30, 64, 175)" />
                  </svg>
                </div>
              </div>

              {/* Category Budgets */}
              <div className="space-y-2.5 pt-0.5">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] font-semibold text-gray-600">
                    <span>Dining Out</span>
                    <span className="text-gray-400 font-medium">₹1,400 left</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-gradient-to-r from-amber-400 to-amber-500 h-full rounded-full" style={{ width: "72%" }} />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] font-semibold text-gray-600">
                    <span>Subscriptions</span>
                    <span className="text-gray-400 font-medium">₹850 left</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-gradient-to-r from-emerald-400 to-emerald-500 h-full rounded-full" style={{ width: "57%" }} />
                  </div>
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