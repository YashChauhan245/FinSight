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
    icon: <Wallet className="h-5 w-5 text-violet-600" />,
    title: "Expense Tracking",
    description: "Add transactions manually or scan receipts. See where every rupee goes.",
  },
  {
    icon: <PiggyBank className="h-5 w-5 text-blue-600" />,
    title: "Budget Planning",
    description: "Set monthly limits per category and get real-time burn-rate feedback.",
  },
  {
    icon: <Sparkles className="h-5 w-5 text-amber-600" />,
    title: "AI Insights",
    description: "Gemini-powered answers based on your actual spending — not generic advice.",
  },
  {
    icon: <Target className="h-5 w-5 text-emerald-600" />,
    title: "Goal Tracking",
    description: "Track savings milestones with progress bars and automated nudges.",
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
    badgeColor: "bg-emerald-50 text-emerald-700 border border-emerald-100",
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
      "bg-violet-600 hover:bg-violet-700 text-white shadow-sm font-medium",
    highlight: true,
  },
  {
    name: "Pro",
    price: "Coming Soon",
    period: "",
    badge: "In Development",
    badgeColor: "bg-gray-100 text-gray-600 border border-gray-200",
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
    ctaStyle: "border border-gray-200 text-gray-700 bg-white hover:bg-gray-50 font-medium shadow-sm",
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
    <div className="min-h-screen bg-white text-gray-900 pb-12 font-inter">
      {/* ── Hero ── */}
      <HeroSection />

      {/* ── Features ── */}
      <section id="features" className="py-16 md:py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-gray-900 font-inter">
            Features That Actually Help
          </h2>
          <p className="text-gray-500 text-sm md:text-base">
            Built by students who needed real tools — not another flashy dashboard.
          </p>
        </div>

        {/* Bento Grid Top Row */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4 mb-12">
          {features.map((f, i) => (
            <div
              key={i}
              className="rounded-xl border border-gray-200 bg-white p-6 flex flex-col gap-3.5 text-left shadow-sm hover:border-gray-300 transition-all duration-200"
            >
              <div className="w-9 h-9 rounded-lg bg-gray-50 border border-gray-200/80 flex items-center justify-center">
                {f.icon}
              </div>
              <h3 className="text-base font-bold text-gray-900 font-inter">{f.title}</h3>
              <p className="text-xs text-gray-600 leading-relaxed font-medium">{f.description}</p>
            </div>
          ))}
        </div>

        {/* Bento — Live Feed + Budget Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Live Transaction Feed */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-4 text-left">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Live Transaction Feed
              </span>
              <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Syncing
              </span>
            </div>
            <div className="space-y-2">
              {liveFeed.map((tx, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{tx.emoji}</span>
                    <div>
                      <p className="text-xs font-semibold text-gray-900 font-inter">{tx.label}</p>
                      <p className="text-[10px] text-gray-400 font-medium">{tx.cat}</p>
                    </div>
                  </div>
                  <span className={`text-xs font-bold tabular-nums ${tx.color}`}>
                    {tx.sign}{tx.amt}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Budget Snapshot */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-4 text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Budget Snapshot — July
            </span>

            {[
              { cat: "Dining Out", spent: 3600, total: 5000, color: "bg-amber-500" },
              { cat: "Subscriptions", spent: 1150, total: 2000, color: "bg-violet-500" },
              { cat: "Groceries", spent: 4200, total: 6000, color: "bg-emerald-500" },
              { cat: "Transport", spent: 900, total: 1500, color: "bg-blue-500" },
            ].map((b) => {
              const pct = Math.round((b.spent / b.total) * 100);
              return (
                <div key={b.cat} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold text-gray-700">
                    <span>{b.cat}</span>
                    <span className="text-gray-400 tabular-nums">
                      ₹{b.spent.toLocaleString("en-IN")} / ₹{b.total.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden border border-gray-200/50">
                    <div
                      className={`${b.color} h-full rounded-full transition-all duration-500`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-gray-400 font-medium">{pct}% used</p>
                </div>
              );
            })}

            {/* Savings Milestone */}
            <div className="mt-2 rounded-xl border border-violet-100 bg-violet-50/60 p-3.5 space-y-2">
              <div className="flex justify-between text-xs font-bold text-gray-900">
                <span>🎯 MacBook Pro Goal</span>
                <span className="text-violet-700 tabular-nums">₹68,000 / ₹1,40,000</span>
              </div>
              <div className="w-full bg-white rounded-full h-2 border border-violet-100 overflow-hidden">
                <div className="bg-violet-600 h-full rounded-full" style={{ width: "48%" }} />
              </div>
              <p className="text-[10px] text-violet-600 font-semibold">48% — on track ✓</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how-it-works" className="py-16 md:py-20 px-4 max-w-7xl mx-auto">
        <div className="text-left mb-8">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-gray-900 font-inter">
            How It Works
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3 text-left">
          {[
            { step: "01", color: "bg-violet-50 text-violet-700 border-violet-100", title: "Add transactions", body: "Manual entry or snap a receipt photo — FinSight auto-fills the category and amount." },
            { step: "02", color: "bg-blue-50 text-blue-700 border-blue-100", title: "Get AI insights", body: "Ask Gemini natural language questions. Get answers grounded in your real data." },
            { step: "03", color: "bg-emerald-50 text-emerald-700 border-emerald-100", title: "Improve spending", body: "Act on budget nudges, recurring alerts, and month-over-month anomaly reports." },
          ].map((s) => (
            <div
              key={s.step}
              className="bg-white border border-gray-200 p-6 rounded-xl space-y-3.5 shadow-sm hover:border-gray-300 transition-all duration-200"
            >
              <div className={`inline-flex items-center px-2.5 py-0.5 rounded-md border ${s.color} text-[11px] font-bold tracking-wider`}>
                STEP {s.step}
              </div>
              <h3 className="text-base font-bold text-gray-900 font-inter">{s.title}</h3>
              <p className="text-xs text-gray-600 leading-relaxed font-medium">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Interactive AI Chat Simulator ── */}
      <section id="ai-demo" className="py-16 md:py-20 px-4 max-w-7xl mx-auto">
        <div className="grid gap-8 lg:grid-cols-2 items-center">
          <div className="space-y-4 text-left">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-gray-900 font-inter">
              Ask anything about your finances
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed max-w-md">
              FinSight&apos;s AI assistant is powered by Gemini and trained on your real transaction history — not generic templates.
            </p>
            <ul className="space-y-2 pt-1">
              {[
                "Analyses 90 days of real spending data",
                "Detects month-over-month anomalies",
                "Gives actionable, rupee-specific advice",
              ].map((pt, i) => (
                <li key={i} className="flex items-center gap-2.5 text-xs font-medium text-gray-700">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  {pt}
                </li>
              ))}
            </ul>
          </div>
          <AISimulator />
        </div>
      </section>

      {/* ── Pricing ── */}
      <section className="py-16 md:py-20 px-4 max-w-5xl mx-auto">
        <div className="text-center mb-12 space-y-2">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-gray-900 font-inter">
            Simple, honest pricing
          </h2>
          <p className="text-gray-500 text-sm md:text-base">
            No hidden fees. No trial periods. Start for free today.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 text-left">
          {pricingTiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-xl border p-7 space-y-5 flex flex-col ${
                tier.highlight
                  ? "border-violet-200 bg-white shadow-sm ring-1 ring-violet-200"
                  : "border-gray-200 bg-gray-50/50 shadow-sm"
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-900 font-inter">{tier.name}</h3>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${tier.badgeColor}`}>
                    {tier.badge}
                  </span>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-extrabold text-gray-900 tabular-nums">{tier.price}</span>
                  {tier.period && (
                    <span className="text-gray-400 text-xs font-medium">/ {tier.period}</span>
                  )}
                </div>
                <p className="text-xs text-gray-600 leading-relaxed font-medium">{tier.description}</p>
              </div>

              <ul className="space-y-2 flex-1">
                {tier.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-xs text-gray-700 font-medium">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <Link href={tier.ctaHref}>
                <Button
                  className={`w-full font-medium py-2.5 h-10 rounded-xl text-xs transition-all ${tier.ctaStyle}`}
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
      <section className="py-16 md:py-20 px-4 max-w-7xl mx-auto">
        <div className="grid gap-6 md:grid-cols-3 text-left">
          <div className="rounded-xl border border-gray-200 bg-white p-7 space-y-3 shadow-sm md:col-span-2">
            <h3 className="text-xl font-bold text-gray-900 font-inter">
              Trusted by 1,000+ students & professionals
            </h3>
            <p className="text-gray-600 text-xs md:text-sm leading-relaxed font-medium">
              From IIT hostels to first salaries — FinSight helps real people stay on budget without opening 5 different apps.
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-7 flex flex-col justify-center gap-3 shadow-sm">
            <div className="text-3xl font-extrabold text-violet-700 tabular-nums">₹2.4Cr+</div>
            <p className="text-xs font-semibold text-gray-700">in transactions tracked</p>
            <div className="h-px bg-gray-200 my-0.5" />
            <div className="text-2xl font-extrabold text-violet-700 tabular-nums">12,000+</div>
            <p className="text-xs font-semibold text-gray-700">AI insights generated</p>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 md:py-20 px-4 max-w-3xl mx-auto">
        <div className="text-center mb-10 space-y-2">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-gray-900 font-inter">
            Frequently asked questions
          </h2>
        </div>

        <div className="space-y-2.5 text-left">
          {faqs.map((faq, i) => (
            <details
              key={i}
              className="group border border-gray-200 rounded-xl bg-white overflow-hidden shadow-sm"
            >
              <summary className="flex items-center justify-between px-5 py-4 cursor-pointer font-semibold text-gray-900 text-sm select-none list-none hover:bg-gray-50 transition-colors">
                {faq.q}
                <span className="ml-4 shrink-0 text-gray-400 group-open:rotate-45 transition-transform duration-200 text-lg leading-none">
                  +
                </span>
              </summary>
              <div className="px-5 pb-4 pt-1 text-xs text-gray-600 leading-relaxed border-t border-gray-100 font-medium">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 md:py-20 px-4 max-w-4xl mx-auto">
        <div className="rounded-2xl bg-violet-600 p-8 md:p-12 text-center space-y-5 shadow-sm text-white relative overflow-hidden">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white font-inter">
            Start managing your money today
          </h2>
          <p className="text-violet-100 text-xs md:text-sm max-w-xl mx-auto font-medium">
            Free forever. No credit card required. Real AI insights in under 2 minutes.
          </p>
          <div className="pt-1">
            <Link href="/dashboard">
              <Button
                size="lg"
                className="bg-white text-violet-700 hover:bg-gray-50 font-bold px-8 py-3 rounded-xl shadow-sm text-sm transition-all"
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