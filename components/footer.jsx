"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ShieldCheck,
  Sparkles,
  ArrowUp,
  Heart,
  Github,
  Twitter,
  Linkedin,
  Mail,
  CheckCircle2,
  Lock,
  Cpu,
  Layers
} from "lucide-react";

export default function Footer() {
  const pathname = usePathname();

  // Hide footer on dashboard, account, transaction, or non-landing routes
  if (pathname !== "/") {
    return null;
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative mt-auto border-t border-slate-800/80 bg-slate-950 text-slate-300 overflow-hidden font-sans">
      {/* Background Decorative Gradient Blobs */}
      <div className="absolute -top-24 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

      <div className="relative container mx-auto px-6 pt-14 pb-8">
        {/* Main Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4 pr-0 lg:pr-6">
            <Link href="/" className="inline-flex items-center gap-2 group">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 to-cyan-500 p-0.5 shadow-lg shadow-violet-500/20 group-hover:scale-105 transition-transform duration-300">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
                </div>
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-white font-manrope">
                Fin<span className="bg-gradient-to-r from-violet-400 via-cyan-400 to-teal-300 bg-clip-text text-transparent">Sight</span>
              </span>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Next-generation AI financial intelligence platform. Track expenses, forecast budgets, and receive smart automated advice designed for students, freelancers, and ambitious professionals.
            </p>

            {/* Live Status Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs font-medium text-slate-300 shadow-sm backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>FinSight AI Core: <span className="text-emerald-400 font-semibold">Operational</span></span>
            </div>

            {/* Creator Credit */}
            <p className="text-xs text-slate-500 flex items-center gap-1.5 pt-1">
              Crafted with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> by <span className="text-slate-300 font-medium">Yash Chauhan</span>
            </p>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-violet-400" />
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { name: "Dashboard", href: "/dashboard" },
                { name: "Add Transaction", href: "/transaction/create" },
                { name: "Accounts & Cards", href: "/dashboard" },
                { name: "AI Insights", href: "/dashboard" },
                { name: "Budget Planning", href: "/dashboard" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-slate-400 hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform Features / Resources */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              Features & AI
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { name: "AI Expense Categorizer", href: "/#features" },
                { name: "Monthly Insights Engine", href: "/#features" },
                { name: "Multi-Account Sync", href: "/#how-it-works" },
                { name: "Receipt Scanner (OCR)", href: "/#ai-demo" },
                { name: "Security Architecture", href: "/#features" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-slate-400 hover:text-cyan-300 hover:translate-x-1 inline-flex items-center gap-1.5 transition-all duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Trust & Security Badge Block */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Trust & Safety
            </h3>
            <div className="space-y-2 bg-slate-900/60 rounded-xl p-3.5 border border-slate-800/90 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                <Lock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>256-bit AES Encryption</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Read-Only Financial Data</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>GDPR & Privacy Compliant</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 leading-normal">
              Your credentials are never stored. FinSight uses bank-level OAuth security standards.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} FinSight AI Inc. All rights reserved.</p>

          {/* Social Icons & Back to Top */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 hover:bg-slate-850 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-slate-700 hover:bg-slate-850 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-blue-400 hover:border-slate-700 hover:bg-slate-850 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="mailto:support@finsight.ai"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-violet-400 hover:border-slate-700 hover:bg-slate-850 transition-colors"
                aria-label="Email Support"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

            <button
              onClick={scrollToTop}
              className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-all text-xs font-medium"
            >
              <span>Top</span>
              <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
