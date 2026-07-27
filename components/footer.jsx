"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  ShieldCheck,
  ArrowUp,
  Heart,
  Github,
  Twitter,
  Linkedin,
  Mail,
  CheckCircle2,
  Lock,
} from "lucide-react";

export default function Footer() {
  const pathname = usePathname();

  // Hide footer on non-landing routes
  if (pathname !== "/") {
    return null;
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative mt-auto border-t border-gray-200 bg-white text-gray-600 font-inter">
      <div className="container mx-auto px-6 pt-14 pb-10">
        {/* Main Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-gray-200/80">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4 pr-0 lg:pr-8 text-left">
            <Link href="/" className="inline-block">
              <Image
                src="/logoo.png"
                alt="FinSight Logo"
                width={185}
                height={52}
                priority
                className="h-10 w-auto object-contain"
              />
            </Link>

            <p className="text-xs text-gray-500 leading-relaxed max-w-sm font-medium">
              Next-generation AI financial intelligence platform. Track expenses, forecast budgets, and receive smart automated advice designed for students, freelancers, and ambitious professionals.
            </p>

            {/* Creator Credit */}
            <p className="text-xs text-gray-400 flex items-center gap-1.5 pt-0.5 font-medium">
              Crafted with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> by <span className="text-gray-700 font-semibold">Yash Chauhan</span>
            </p>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3.5 text-left">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 font-inter">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-xs font-medium">
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
                    className="text-gray-500 hover:text-violet-600 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform Features / Resources */}
          <div className="space-y-3.5 text-left">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 font-inter">
              Features & AI
            </h3>
            <ul className="space-y-2.5 text-xs font-medium">
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
                    className="text-gray-500 hover:text-violet-600 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Trust & Security Badge Block */}
          <div className="space-y-3.5 text-left">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 font-inter flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Trust & Safety
            </h3>
            <div className="space-y-2 bg-gray-50 rounded-xl p-3.5 border border-gray-200/80 shadow-sm">
              <div className="flex items-center gap-2 text-xs text-gray-700 font-medium">
                <Lock className="w-3.5 h-3.5 text-violet-600 shrink-0" />
                <span>256-bit AES Encryption</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-700 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Read-Only Financial Data</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-700 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>GDPR & Privacy Compliant</span>
              </div>
            </div>
            <p className="text-[11px] text-gray-400 leading-normal font-medium">
              Your credentials are never stored. FinSight uses bank-level OAuth security standards.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-400 font-medium">
          <p>© {new Date().getFullYear()} FinSight AI Inc. All rights reserved.</p>

          {/* Social Icons & Back to Top */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:border-gray-300 transition-colors shadow-sm"
                aria-label="GitHub"
              >
                <Github className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-500 hover:text-violet-600 hover:border-gray-300 transition-colors shadow-sm"
                aria-label="Twitter"
              >
                <Twitter className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-500 hover:text-violet-600 hover:border-gray-300 transition-colors shadow-sm"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
              <a
                href="mailto:support@finsight.ai"
                className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-500 hover:text-violet-600 hover:border-gray-300 transition-colors shadow-sm"
                aria-label="Email Support"
              >
                <Mail className="w-3.5 h-3.5" />
              </a>
            </div>

            <button
              onClick={scrollToTop}
              className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-600 hover:text-gray-900 transition-all text-xs font-medium shadow-sm"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
