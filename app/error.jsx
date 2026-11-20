"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("Global app error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="space-y-4 max-w-md">
        <h1 className="font-serif text-4xl tracking-tight">Something went wrong</h1>
        <p className="text-sm text-muted-foreground">
          Try loading the page again or return to your dashboard.
        </p>
        <div className="flex items-center justify-center gap-3 pt-2">
          <Button onClick={reset}>Try again</Button>
          <Button asChild variant="outline"><Link href="/dashboard">Back to overview</Link></Button>
        </div>
      </div>
    </div>
  );
}
