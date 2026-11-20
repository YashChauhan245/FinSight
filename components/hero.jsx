import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const exampleWeeks = [
  { label: "1–7", income: 97, spending: 39 },
  { label: "8–14", income: 30, spending: 14 },
  { label: "15–21", income: 21, spending: 16 },
  { label: "22–31", income: 36, spending: 9 },
];

export default function HeroSection() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 md:gap-12 md:py-24 lg:gap-16">
      <div>
        <h1 className="max-w-xl font-serif text-5xl font-normal leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
          A clearer view of your money.
        </h1>
        <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
          Track what comes in, see where it goes, and set a budget you can keep. FinSight brings your accounts and everyday spending into one place.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <Button asChild size="lg"><Link href="/sign-in">Explore the dashboard</Link></Button>
          <Button asChild size="lg" variant="outline"><a href="#features">See features</a></Button>
        </div>
      </div>

      <div className="rounded-xl bg-secondary p-3 sm:p-6 lg:p-8">
        <Card className="p-4 sm:p-5">
          <div className="mb-3 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
            <h2 className="font-semibold tracking-tight">Financial overview</h2>
            <span className="text-xs text-muted-foreground">Sample data</span>
          </div>
          <dl className="rounded-lg bg-ledger px-4 py-4 text-ledger-foreground">
            <dt className="text-sm text-ledger-muted">Total balance</dt>
            <dd className="my-1 font-serif text-3xl tracking-tight tabular-nums sm:text-4xl">₹2,55,621</dd>
            <dd className="text-xs text-ledger-muted">Across 3 accounts</dd>
          </dl>
          <div className="mt-5 flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="text-sm font-semibold">Cash flow</h3>
            <div className="flex gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><span className="size-2 rounded-sm bg-chart-1" />Income</span>
              <span className="flex items-center gap-1.5"><span className="size-2 rounded-sm bg-chart-2" />Spending</span>
            </div>
          </div>
          <div role="img" aria-label="Example cash flow in October. Income exceeds spending in each week." className="mt-4 grid grid-cols-4 gap-1">
            {exampleWeeks.map((week) => (
              <div key={week.label} className="text-center" aria-hidden="true">
                <div className="flex h-24 items-end justify-center gap-1 border-b border-t bg-muted/40">
                  <span className="w-3 rounded-t-sm bg-chart-1 sm:w-5" style={{ height: `${week.income}%` }} />
                  <span className="w-3 rounded-t-sm bg-chart-2 sm:w-5" style={{ height: `${week.spending}%` }} />
                </div>
                <p className="mt-1.5 text-xs tabular-nums text-muted-foreground">{week.label}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}
