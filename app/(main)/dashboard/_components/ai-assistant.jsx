"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sparkles, Send, Loader2, Bot } from "lucide-react";
import { getAIFinanceInsight } from "@/actions/ai";

const PRESET_QUERIES = [
  { label: "Spending Breakdown", query: "Where did I spend the most money this month?" },
  { label: "Budget Status", query: "Am I on track with my monthly budget? How much do I have left?" },
  { label: "Saving Tips", query: "Give me 3 personalized tips to save more money based on my spending." },
  { label: "Income vs Expenses", query: "How does my income compare to my expenses over the last 90 days?" },
];

export function AIAssistantBox({ show = true }) {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentQuery, setCurrentQuery] = useState("");

  if (!show) return null;

  const handleSend = async (textToSend) => {
    const activeText = (textToSend || query).trim();
    if (!activeText) return;

    setCurrentQuery(activeText);
    setResponse(null);
    setLoading(true);
    if (!textToSend) setQuery("");

    const result = await getAIFinanceInsight(activeText);
    setResponse(result.answer);
    setLoading(false);
  };

  return (
    <Card className="border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-4 text-left border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="p-1.5 rounded-xl bg-slate-100/90 border border-slate-200/80 flex items-center justify-center">
            <Image
              src="/icon.png"
              alt="FinSight Icon"
              width={32}
              height={32}
              className="h-7 w-7 object-contain"
            />
          </div>
          <div>
            <CardTitle className="text-lg font-bold text-slate-900 font-manrope">
              AI Finance Assistant
            </CardTitle>
            <p className="text-xs text-slate-500 mt-0.5">
              Powered by Gemini — answers based on your real transaction data
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 pt-4">
        {/* Preset Prompt Buttons */}
        <div className="flex flex-wrap gap-2">
          {PRESET_QUERIES.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              suppressHydrationWarning
              onClick={() => handleSend(preset.query)}
              disabled={loading}
              className="text-xs bg-slate-100 hover:bg-violet-50 hover:text-violet-700 hover:border-violet-200 text-slate-700 font-semibold px-3 py-1.5 rounded-lg border border-slate-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {preset.label}
            </button>
          ))}
        </div>

        {/* Response Area */}
        <div className="rounded-xl bg-slate-50 border border-slate-100 min-h-[100px] p-4 flex items-start text-left">
          {loading ? (
            <div className="flex items-center gap-3 text-slate-500">
              <Loader2 className="h-4 w-4 animate-spin shrink-0 text-violet-600" />
              <p className="text-sm italic">FinSight AI is analyzing your finances...</p>
            </div>
          ) : response ? (
            <div className="space-y-2.5 w-full">
              <div className="flex items-center gap-2">
                <Bot className="h-4 w-4 text-violet-600 shrink-0" />
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  {currentQuery}
                </p>
              </div>
              <p className="text-sm text-slate-800 leading-relaxed font-medium whitespace-pre-wrap">
                {response}
              </p>
            </div>
          ) : (
            <div className="flex items-center gap-3 text-slate-400 w-full">
              <Bot className="h-5 w-5 shrink-0" />
              <span className="text-sm">
                Ask a question or click a preset above to get AI-powered insights from your real financial data.
              </span>
            </div>
          )}
        </div>

        {/* Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask anything about your finances..."
            disabled={loading}
            className="flex-1 text-sm border-slate-200 focus-visible:ring-violet-400 font-inter"
          />
          <Button
            type="submit"
            disabled={loading || !query.trim()}
            className="bg-violet-600 hover:bg-violet-700 text-white font-bold px-4 h-9 shrink-0 gap-2"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
