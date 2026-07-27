import React from "react";
import { Button } from "@/components/ui/button";
import HeroSection from "@/components/hero";
import Link from "next/link";
import AISimulator from "@/components/ai-simulator";
import {
  Wallet,
  PiggyBank,
  Sparkles,
  Target,
  ShieldCheck,
  Lock,
  Zap,
  CheckCircle2,
} from "lucide-react";

// ─── Features ───────────────────────────────────────────────
const features = [
  {
    icon: <Wallet className="h-6 w-6 text-violet-700" />,
    title: "Expense Tracking",
    description: "Add transactions manually or scan receipts. See where every rupee goes.",
    color: "bg-violet-50",
    border: "border-violet-100",
  },
  {
    icon: <PiggyBank className="h-6 w-6 text-cyan-700" />,
    title: "Budget Planning",
    description: "Set monthly limits per category and get real-time burn-rate feedback.",
    color: "bg-cyan-50",
    border: "border-cyan-100",
  },
  {
    icon: <Sparkles className="h-6 w-6 text-amber-600" />,
    title: "AI Insights",
    description: "Gemini-powered answers based on your actual spending — not generic advice.",
    color: "bg-amber-50",
    border: "border-amber-100",
  },
  {
    icon: <Target className="h-6 w-6 text-emerald-700" />,
    title: "Goal Tracking",
    description: "Track savings milestones with progress bars and automated nudges.",
    color: "bg-emerald-50",
    border: "border-emerald-100",
  },
];

// ─── Trust Badges ────────────────────────────────────────────
const trustBadges = [
  { icon: <Lock className="h-4 w-4 text-emerald-600" />, label: "256-bit Encryption" },
  { icon: <ShieldCheck className="h-4 w-4 text-emerald-600" />, label: "Read-only Access" },
  { icon: <Zap className="h-4 w-4 text-emerald-600" />, label: "No Card Required" },
];

// ─── Pricing ─────────────────────────────────────────────────
const pricingTiers = [
  {
    name: "Free",
    price: "₹0",
    period: "forever",
    badge: "Current Tier",
    badgeColor: "bg-emerald-100 text-emerald-700",
    description: "Everything you need to get started — no credit card, no trial.",
    features: [
      "Unlimited transactions",
      "Up to 3 accounts",
      "AI Finance Assistant (Gemini)",
      "Budget alerts & email reports",
      "Receipt scanning",
      "Recurring transaction tracking",
    ],
    cta: "Get Started Free",
    ctaHref: "/dashboard",
    ctaStyle:
      "bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-700 hover:to-cyan-600 text-white shadow-lg shadow-violet-200",
    highlight: true,
  },
  {
    name: "Pro",
    price: "Coming Soon",
    period: "",
    badge: "In Development",
    badgeColor: "bg-slate-100 text-slate-500",
    description: "Advanced automation, unlimited sync, and custom workflows.",
    features: [
      "Everything in Free",
      "Unlimited accounts",
      "Custom AI automation rules",
      "Priority support",
      "CSV/Excel export",
      "Team collaboration",
    ],
    cta: "Join Waitlist",
    ctaHref: "#",
    ctaStyle: "border border-slate-300 text-slate-700 hover:bg-slate-50",
    highlight: false,
  },
];

// ─── FAQs ────────────────────────────────────────────────────
const faqs = [
  {
    q: "Is my bank data safe?",
    a: "Yes. FinSight uses read-only API access — we can never move, withdraw, or alter your funds. All data is encrypted at rest and in transit using AES-256.",
  },
  {
    q: "Does it connect to my real bank account?",
    a: "FinSight currently supports manual transaction entry and receipt scanning. Full Plaid bank-sync is on the Pro roadmap.",
  },
  {
    q: "How does the AI assistant work?",
    a: "Your transactions are summarised into a context window and passed to Google Gemini. The model returns personalised, jargon-free advice. Your raw data never leaves our servers.",
  },
  {
    q: "Can I delete my data?",
    a: "Absolutely. Navigate to Settings → Account → Delete Account and all your transactions, budgets, and goals are permanently erased within 24 hours.",
  },
  {
    q: "Is FinSight really free?",
    a: "Yes — the core product is free indefinitely. We are building a Pro tier for power users, but the Free tier will never be paywalled.",
  },
];

// ─── Bento Live Transactions ──────────────────────────────────
const liveFeed = [
  { emoji: "🍕", label: "Domino's Pizza", cat: "Food", sign: "-", amt: "₹649", color: "text-rose-600" },
  { emoji: "🚌", label: "BMTC Bus Pass", cat: "Transport", sign: "-", amt: "₹300", color: "text-rose-600" },
  { emoji: "💼", label: "Freelance Payment", cat: "Income", sign: "+", amt: "₹15,000", color: "text-emerald-600" },
  { emoji: "📚", label: "Udemy Course", cat: "Education", sign: "-", amt: "₹449", color: "text-rose-600" },
  { emoji: "☕", label: "Third Wave Coffee", cat: "Dining", sign: "-", amt: "₹280", color: "text-rose-600" },
];

// ─────────────────────────────────────────────────────────────

const LandingPage = () => {
  return (
    <div className="min-h-screen text-slate-900 pb-12">
      {/* ── Hero ── */}
      <HeroSection />

      {/* ── Features ── */}
      <section id="features" className="py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-violet-600">
            Features
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-slate-900 font-manrope">
            Features That Actually Help
          </h2>
          <p className="text-slate-500 text-sm md:text-base">
            Built by students who needed real tools — not another flashy dashboard.
          </p>
        </div>

        {/* Bento Grid Top Row */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-16">
          {features.map((f, i) => (
            <div
              key={i}
              className={`rounded-2xl border ${f.border} ${f.color} p-6 flex flex-col gap-4 hover:-translate-y-1 hover:shadow-lg transition-all duration-300`}
            >
              <div className="w-10 h-10 rounded-xl bg-white/80 flex items-center justify-center shadow-sm border border-white">
                {f.icon}
              </div>
              <h3 className="text-base font-bold text-slate-900 font-manrope">{f.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>

        {/* Bento — Live Feed + Budget Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Live Transaction Feed */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Live Transaction Feed
              </span>
              <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Syncing
              </span>
            </div>
            <div className="space-y-2.5">
              {liveFeed.map((tx, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{tx.emoji}</span>
                    <div>
                      <p className="text-xs font-semibold text-slate-800">{tx.label}</p>
                      <p className="text-[10px] text-slate-400">{tx.cat}</p>
                    </div>
                  </div>
                  <span className={`text-sm font-extrabold ${tx.color}`}>
                    {tx.sign}{tx.amt}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Budget Snapshot */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Budget Snapshot — July
            </span>

            {[
              { cat: "Dining Out", spent: 3600, total: 5000, color: "bg-amber-500" },
              { cat: "Subscriptions", spent: 1150, total: 2000, color: "bg-violet-500" },
              { cat: "Groceries", spent: 4200, total: 6000, color: "bg-emerald-500" },
              { cat: "Transport", spent: 900, total: 1500, color: "bg-cyan-500" },
            ].map((b) => {
              const pct = Math.round((b.spent / b.total) * 100);
              return (
                <div key={b.cat} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold text-slate-700">
                    <span>{b.cat}</span>
                    <span className="text-slate-400">
                      ₹{b.spent.toLocaleString("en-IN")} / ₹{b.total.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className={`${b.color} h-full rounded-full transition-all duration-700`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-slate-400">{pct}% used</p>
                </div>
              );
            })}

            {/* Savings Milestone */}
            <div className="mt-2 rounded-xl border border-violet-100 bg-violet-50 p-4 space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-800">
                <span>🎯 MacBook Pro Goal</span>
                <span className="text-violet-600">₹68,000 / ₹1,40,000</span>
              </div>
              <div className="w-full bg-white rounded-full h-2 border border-violet-100 overflow-hidden">
                <div className="bg-gradient-to-r from-violet-500 to-cyan-400 h-full rounded-full" style={{ width: "48%" }} />
              </div>
              <p className="text-[10px] text-violet-500 font-semibold">48% — on track ✓</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how-it-works" className="py-24 px-4 max-w-7xl mx-auto">
        <div className="text-left mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-violet-600">Process</span>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-slate-900 font-manrope mt-2">
            How It Works
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {[
            { step: "01", color: "bg-violet-100 text-violet-700", title: "Add transactions", body: "Manual entry or snap a receipt photo — FinSight auto-fills the category and amount." },
            { step: "02", color: "bg-blue-100 text-blue-700", title: "Get AI insights", body: "Ask Gemini natural language questions. Get answers grounded in your real data." },
            { step: "03", color: "bg-cyan-100 text-cyan-700", title: "Improve spending", body: "Act on budget nudges, recurring alerts, and month-over-month anomaly reports." },
          ].map((s) => (
            <div
              key={s.step}
              className="bg-white border border-slate-200 p-7 rounded-2xl space-y-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className={`inline-flex items-center px-3 py-1 rounded-full ${s.color} text-xs font-extrabold tracking-widest`}>
                STEP {s.step}
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-manrope">{s.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Interactive AI Chat Simulator ── */}
      <section id="ai-demo" className="py-24 px-4 max-w-7xl mx-auto">
        <div className="grid gap-10 lg:grid-cols-2 items-center">
          <div className="space-y-5 text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-violet-600">
              AI Demo
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-slate-900 font-manrope">
              Ask anything about your finances
            </h2>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed max-w-md">
              FinSight&apos;s AI assistant is powered by Gemini and trained on your real transaction history — not generic templates.
            </p>
            <ul className="space-y-2">
              {[
                "Analyses 90 days of real spending data",
                "Detects month-over-month anomalies",
                "Gives actionable, rupee-specific advice",
              ].map((pt, i) => (
                <li key={i} className="flex items-center gap-2.5 text-sm text-slate-700 font-medium">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  {pt}
                </li>
              ))}
            </ul>
          </div>
          <AISimulator />
        </div>
      </section>

      {/* ── Pricing ── */}
      <section className="py-24 px-4 max-w-5xl mx-auto">
        <div className="text-center mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-violet-600">Pricing</span>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-slate-900 font-manrope">
            Simple, honest pricing
          </h2>
          <p className="text-slate-500 text-sm md:text-base">
            No hidden fees. No trial periods. Start for free today.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {pricingTiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-2xl border p-8 space-y-6 flex flex-col ${
                tier.highlight
                  ? "border-violet-200 bg-white shadow-xl shadow-violet-100/60"
                  : "border-slate-200 bg-slate-50/50"
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-extrabold text-slate-900 font-manrope">{tier.name}</h3>
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${tier.badgeColor}`}>
                    {tier.badge}
                  </span>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-4xl font-extrabold text-slate-900">{tier.price}</span>
                  {tier.period && (
                    <span className="text-slate-400 text-sm font-medium">/ {tier.period}</span>
                  )}
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{tier.description}</p>
              </div>

              <ul className="space-y-2.5 flex-1">
                {tier.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-sm text-slate-700">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <Link href={tier.ctaHref}>
                <Button
                  className={`w-full font-bold py-5 rounded-xl text-sm transition-all ${tier.ctaStyle}`}
                  variant={tier.highlight ? "default" : "outline"}
                >
                  {tier.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── Social Proof ── */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 space-y-3 shadow-sm md:col-span-2">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-500">Social Proof</span>
            <h3 className="text-2xl font-extrabold text-slate-900 font-manrope">
              Trusted by 1,000+ students & professionals
            </h3>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              From IIT hostels to first salaries — FinSight helps real people stay on budget without opening 5 different apps.
            </p>
          </div>
          <div className="rounded-2xl border border-violet-100 bg-violet-50 p-8 flex flex-col justify-center gap-3 shadow-sm">
            <div className="text-4xl font-extrabold text-violet-700">₹2.4Cr+</div>
            <p className="text-sm font-semibold text-violet-800">in transactions tracked</p>
            <div className="h-px bg-violet-200 my-1" />
            <div className="text-3xl font-extrabold text-violet-700">12,000+</div>
            <p className="text-sm font-semibold text-violet-800">AI insights generated</p>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 px-4 max-w-3xl mx-auto">
        <div className="text-center mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-violet-600">FAQ</span>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-slate-900 font-manrope">
            Frequently asked questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <details
              key={i}
              className="group border border-slate-200 rounded-2xl bg-white overflow-hidden"
            >
              <summary className="flex items-center justify-between px-6 py-5 cursor-pointer font-semibold text-slate-900 text-sm select-none list-none hover:bg-slate-50 transition-colors">
                {faq.q}
                <span className="ml-4 shrink-0 text-slate-400 group-open:rotate-45 transition-transform duration-200 text-xl leading-none">
                  +
                </span>
              </summary>
              <div className="px-6 pb-5 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-4 max-w-4xl mx-auto">
        <div className="rounded-3xl bg-gradient-to-br from-violet-600 to-cyan-500 p-10 md:p-16 text-center space-y-6 shadow-2xl shadow-violet-300/40 relative overflow-hidden">
          {/* Glow blobs */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/4 pointer-events-none" />

          <h2 className="text-3xl md:text-4xl font-extrabold text-white font-manrope relative">
            Start managing your money today
          </h2>
          <p className="text-white/80 text-sm md:text-base max-w-xl mx-auto relative">
            Free forever. No credit card. Real AI insights in under 2 minutes.
          </p>
          <div className="relative">
            <Link href="/dashboard">
              <Button
                size="lg"
                className="bg-white text-violet-700 hover:bg-slate-50 font-extrabold px-10 py-6 rounded-xl shadow-lg text-base transition-all duration-200 hover:scale-105"
              >
                Get Started — It&apos;s Free
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;