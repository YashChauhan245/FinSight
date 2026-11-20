import { Suspense } from "react";

function DashboardLoading() {
  return (
    <div className="space-y-5" role="status">
      <span className="sr-only">Loading dashboard</span>
      <div className="space-y-5 motion-safe:animate-pulse" aria-hidden="true">
        <div className="h-11 w-40 rounded-md bg-muted" />
        <div className="h-36 rounded-lg bg-ledger" />
        <div className="grid gap-5 xl:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)]">
          <div className="h-60 rounded-lg border bg-card" />
          <div className="h-60 rounded-lg border bg-card" />
        </div>
      </div>
    </div>
  );
}

export default function Layout({ children }) {
  return (
    <Suspense fallback={<DashboardLoading />}>
      {children}
    </Suspense>
  );
}
