"use client";

import { useState } from "react";
import { Bot, Send, Loader2 } from "lucide-react";

const PRESETS = [
  {
    label: "Find saving opportunities",
    answer:
      "📊 Based on your last 3 months, your Dining Out spend is 28% above average. Cutting 2 restaurant meals per week saves ~₹1,200/month — that's ₹14,400 per year toward your MacBook goal.",
  },
  {
    label: "Goal progress",
    answer:
      "🎯 Your MacBook Pro goal is 48% complete (₹68,000 of ₹1,40,000). At your current savings rate of ₹14,000/month, you'll hit the target in ~5.1 months — December 2025.",
  },
  {
    label: "Budget status",
    answer:
      "✅ You're on track this month! Groceries and Transport are within limits. ⚠️ Dining Out is at 72% with 12 days remaining — consider cooking at home 3x this week.",
  },
  {
    label: "Spending anomalies",
    answer:
      "🚨 Detected: Subscriptions are up 34% vs last month (₹1,150 vs ₹858). This may be a new auto-renewal. Check Netflix, Spotify, or any annual plans that renewed this month.",
  },
];

export default function AISimulator() {
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activePreset, setActivePreset] = useState(null);
  const [customQuery, setCustomQuery] = useState("");
  const [displayedText, setDisplayedText] = useState("");

  const simulateTyping = (text, onDone) => {
    let i = 0;
    setDisplayedText("");
    const interval = setInterval(() => {
      i++;
      setDisplayedText(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        if (onDone) onDone();
      }
    }, 18);
  };

  const handlePreset = (preset) => {
    setActivePreset(preset.label);
    setOutput(null);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      simulateTyping(preset.answer);
      setOutput(preset.answer);
    }, 900);
  };

  const handleCustom = (e) => {
    e.preventDefault();
    if (!customQuery.trim()) return;
    setActivePreset(customQuery);
    setOutput(null);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const reply =
        "💡 Great question! In the full app, Gemini analyses your real transaction history to answer this with personalised numbers. Sign up for free to try it with your own data.";
      simulateTyping(reply);
      setOutput(reply);
    }, 1100);
    setCustomQuery("");
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-6 space-y-4 font-inter text-left">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-violet-50 text-violet-700">
          <Bot className="h-4 w-4 text-violet-700" />
        </div>
        <div>
          <p className="text-sm font-bold text-gray-900 font-inter">FinSight AI</p>
          <p className="text-xs text-gray-500 font-medium">Demo — powered by Gemini</p>
        </div>
        <span className="ml-auto flex items-center gap-1.5 text-xs font-medium text-emerald-600">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Online
        </span>
      </div>

      {/* Preset chips */}
      <div className="flex flex-wrap gap-2">
        {PRESETS.map((p) => (
          <button
            suppressHydrationWarning
            key={p.label}
            onClick={() => handlePreset(p)}
            disabled={loading}
            className={`text-xs font-medium px-3 py-1.5 rounded-lg border transition-all disabled:opacity-50 ${
              activePreset === p.label
                ? "bg-violet-600 text-white border-violet-600 shadow-sm"
                : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-violet-50 hover:text-violet-700 hover:border-violet-200"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Output */}
      <div className="min-h-[95px] rounded-xl bg-gray-50 border border-gray-200/80 p-4 text-xs font-medium text-left">
        {loading ? (
          <div className="flex items-center gap-2 text-gray-500">
            <Loader2 className="h-4 w-4 animate-spin text-violet-600" />
            <span className="text-xs italic">FinSight AI is thinking...</span>
          </div>
        ) : displayedText ? (
          <p className="text-gray-800 leading-relaxed whitespace-pre-wrap font-medium">
            {displayedText}
            <span className="animate-pulse text-violet-500">|</span>
          </p>
        ) : (
          <p className="text-gray-400 text-xs font-medium">
            Click a question above or type your own to see a demo response.
          </p>
        )}
      </div>

      {/* Custom input */}
      <form onSubmit={handleCustom} className="flex gap-2">
        <input
          suppressHydrationWarning
          value={customQuery}
          onChange={(e) => setCustomQuery(e.target.value)}
          placeholder="Ask your own question..."
          disabled={loading}
          className="flex-1 text-xs border border-gray-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-violet-500 bg-white font-inter text-gray-900 disabled:opacity-50"
        />
        <button
          suppressHydrationWarning
          type="submit"
          disabled={loading || !customQuery.trim()}
          className="p-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white disabled:opacity-40 transition-colors shadow-sm"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </button>
      </form>

      <p className="text-[11px] text-gray-400 text-center font-inter">
        Demo responses only. Real app uses your actual transaction data.
      </p>
    </div>
  );
}
