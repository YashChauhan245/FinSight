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
    <Card className="border border-gray-200 bg-white shadow-sm hover:border-gray-300 transition-all font-inter rounded-xl overflow-hidden">
      <CardHeader className="pb-4 p-5 sm:p-6 text-left border-b border-gray-100 bg-white">
        <div className="flex items-center gap-3">
          <div className="p-1.5 rounded-lg bg-gray-50 border border-gray-200 shadow-sm flex items-center justify-center">
            <Image
              src="/icon.png"
              alt="FinSight Icon"
              width={32}
              height={32}
              className="h-6 w-6 object-contain"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <CardTitle className="text-base font-bold text-gray-900 font-inter">
                AI Finance Assistant
              </CardTitle>
            </div>
            <p className="text-xs text-gray-500 mt-0.5 font-medium">
              Context-aware financial analysis trained on your real transaction data
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 p-5 sm:p-6 pt-4 sm:pt-5">
        {/* Preset Prompt Filter Chips */}
        <div className="flex flex-wrap gap-2">
          {PRESET_QUERIES.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              suppressHydrationWarning
              onClick={() => handleSend(preset.query)}
              disabled={loading}
              className="text-xs bg-gray-50 hover:bg-violet-50 hover:text-violet-700 hover:border-violet-200 text-gray-700 font-medium px-3 py-1.5 rounded-lg border border-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {preset.label}
            </button>
          ))}
        </div>

        {/* Response Container */}
        <div className="rounded-xl bg-gray-50 border border-gray-200/80 min-h-[95px] p-4 flex items-start text-left">
          {loading ? (
            <div className="flex items-center gap-3 text-gray-600 my-auto">
              <Loader2 className="h-4 w-4 animate-spin shrink-0 text-violet-600" />
              <p className="text-xs font-medium text-gray-600">FinSight AI is analyzing your financial records...</p>
            </div>
          ) : response ? (
            <div className="space-y-2 w-full">
              <div className="flex items-center gap-2">
                <div className="p-1 rounded-md bg-violet-100 text-violet-700">
                  <Bot className="h-3.5 w-3.5 shrink-0" />
                </div>
                <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                  {currentQuery}
                </p>
              </div>
              <div className="text-xs text-gray-800 leading-relaxed font-medium whitespace-pre-wrap pl-6">
                {response}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3 text-gray-400 my-auto w-full">
              <Bot className="h-4 w-4 shrink-0 text-gray-400" />
              <span className="text-xs font-medium text-gray-500">
                Click any preset topic above or type a custom question to generate AI financial recommendations.
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
            placeholder="Ask anything about your income, expenses, or savings..."
            disabled={loading}
            className="flex-1 text-xs border-gray-200 focus-visible:ring-violet-500 font-inter rounded-xl h-10 px-3.5"
          />
          <Button
            type="submit"
            disabled={loading || !query.trim()}
            className="bg-violet-600 hover:bg-violet-700 text-white font-medium px-4 h-10 shrink-0 gap-2 rounded-xl shadow-sm transition-all text-xs"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <Send className="h-3.5 w-3.5" />
                <span className="hidden sm:inline font-medium">Send</span>
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
