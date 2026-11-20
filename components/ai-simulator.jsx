"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const PRESETS = [
  {
    label: "Find saving opportunities",
    answer:
      "Dining out is 28% above the sample three-month average. Reducing that category by ₹1,200 a month would free up ₹14,400 a year.",
  },
  {
    label: "Goal progress",
    answer:
      "The laptop goal has ₹68,000 saved toward ₹1,40,000. At ₹14,000 per month, the remaining ₹72,000 would take about five months.",
  },
  {
    label: "Budget status",
    answer:
      "Groceries and transport are within their sample limits. Dining out has used 72% of its budget with 12 days left in the month.",
  },
  {
    label: "Spending anomalies",
    answer:
      "Sample subscription spending rose 34% from ₹858 to ₹1,150. Review the recurring entries to see which charge changed.",
  },
];

export default function AISimulator() {
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
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      simulateTyping(preset.answer);
    }, 900);
  };

  const handleCustom = (e) => {
    e.preventDefault();
    if (!customQuery.trim()) return;
    setActivePreset(customQuery);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const reply =
        "Try a sample question above. In the full app, the assistant can answer using your recorded transactions.";
      simulateTyping(reply);
    }, 1100);
    setCustomQuery("");
  };

  return (
    <Card className="space-y-4 p-4 text-left sm:p-5">
      <div>
        <h3 className="font-semibold">Finance assistant</h3>
        <p className="mt-1 text-sm text-muted-foreground">Responses use sample data.</p>
      </div>

      {/* Preset chips */}
      <div className="flex flex-wrap gap-2">
        {PRESETS.map((p) => (
          <Button
            key={p.label}
            type="button"
            variant={activePreset === p.label ? "secondary" : "outline"}
            size="sm"
            onClick={() => handlePreset(p)}
            disabled={loading}
          >
            {p.label}
          </Button>
        ))}
      </div>

      {/* Output */}
      <div className="min-h-20 rounded-md bg-muted p-3 text-sm" aria-label="Sample response">
        {loading ? (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="size-4 animate-spin text-primary" />
            <span>Preparing a sample response…</span>
          </div>
        ) : displayedText ? (
          <p className="leading-relaxed">
            {displayedText}
          </p>
        ) : (
          <p className="text-muted-foreground">
            Choose a sample question or type your own.
          </p>
        )}
      </div>

      {/* Custom input */}
      <form onSubmit={handleCustom} className="flex gap-2">
        <Input
          aria-label="Ask a question"
          value={customQuery}
          onChange={(e) => setCustomQuery(e.target.value)}
          placeholder="Ask about your budget"
          disabled={loading}
          className="h-10 min-w-0 flex-1"
        />
        <Button type="submit" disabled={loading || !customQuery.trim()}>Ask</Button>
      </form>

    </Card>
  );
}
