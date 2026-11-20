import Link from "next/link";
import { CalendarDays, List, Wallet } from "lucide-react";
import HeroSection from "@/components/hero";
import AISimulator from "@/components/ai-simulator";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: Wallet,
    title: "Bring your accounts together",
    description: "See checking and savings balances side by side, with transactions for each account.",
  },
  {
    icon: List,
    title: "Keep a record of spending",
    description: "Add transactions manually or scan a receipt to fill in the details.",
  },
  {
    icon: CalendarDays,
    title: "Plan for what’s next",
    description: "Track your monthly budget, follow your savings goals, and see which bills are coming up.",
  },
];

const steps = [
  ["Add an account", "Start with a checking or savings account and enter its opening balance."],
  ["Record a transaction", "Enter the details yourself or scan a receipt to fill them in."],
  ["Review the month", "Compare income and spending, check your budget, and look ahead to upcoming bills."],
];

const questions = [
  ["How do I add transactions?", "Enter them manually or scan an image of your receipt to fill in the transaction form."],
  ["Can I link my bank account?", "FinSight currently supports manually tracked accounts and receipt scanning. Bank sync is on the roadmap."],
  ["What can I ask the assistant?", "Ask about category spending, budget usage, savings goals, or how your income compares with expenses."],
  ["Is the core app free?", "You can use the current tracking, planning, and assistant features on the free plan."],
];

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <section id="features" className="scroll-mt-16 border-y bg-card">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <h2 className="mb-6 font-serif text-4xl font-normal tracking-tight">Know where you stand.</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {features.map(({ icon: Icon, title, description }) => (
              <article key={title} className="border-t pt-4">
                <span className="grid size-9 place-items-center rounded-md bg-secondary text-secondary-foreground"><Icon className="size-4" aria-hidden="true" /></span>
                <h3 className="mt-3 font-semibold">{title}</h3>
                <p className="mt-1 max-w-xs leading-relaxed text-muted-foreground">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl divide-y px-4 sm:px-6">
        <section id="how-it-works" className="scroll-mt-16 py-12 sm:py-16">
          <h2 className="mb-6 font-serif text-4xl font-normal tracking-tight">From receipt to monthly review.</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {steps.map(([title, description]) => (
              <article key={title} className="border-t pt-4">
                <h3 className="font-semibold">{title}</h3>
                <p className="mt-1 max-w-xs leading-relaxed text-muted-foreground">{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="ai-demo" className="scroll-mt-16 py-12 sm:py-16">
          <h2 className="mb-2 font-serif text-4xl font-normal tracking-tight">Ask about your spending.</h2>
          <p className="mb-5 max-w-lg text-muted-foreground">Try the assistant with sample data to see how it presents a budget or spending summary.</p>
          <div className="max-w-2xl"><AISimulator /></div>
        </section>

        <section id="pricing" className="scroll-mt-16 py-12 sm:py-16">
          <h2 className="mb-5 font-serif text-4xl font-normal tracking-tight">Plans</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Card className="space-y-3 p-5">
              <h3 className="font-semibold">Free</h3>
              <p className="font-serif text-3xl">₹0</p>
              <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                <li>Transactions and account tracking</li>
                <li>Receipt scanning and recurring entries</li>
                <li>Budget alerts and the finance assistant</li>
              </ul>
              <Button asChild><Link href="/sign-up">Get started</Link></Button>
            </Card>
            <Card className="space-y-3 p-5">
              <h3 className="font-semibold">Pro</h3>
              <p className="font-serif text-3xl">Coming soon</p>
              <p className="text-sm text-muted-foreground">Planned features include exports and more automation.</p>
            </Card>
          </div>
        </section>

        <section id="faq" className="scroll-mt-16 py-12 sm:py-16">
          <h2 className="mb-5 font-serif text-4xl font-normal tracking-tight">Frequently asked questions</h2>
          {questions.map(([question, answer]) => (
            <details key={question} className="border-b py-3">
              <summary className="w-fit cursor-pointer rounded-sm font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring">{question}</summary>
              <p className="mt-2 max-w-xl text-muted-foreground">{answer}</p>
            </details>
          ))}
        </section>
      </div>
    </>
  );
}
