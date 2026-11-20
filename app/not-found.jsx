"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="font-serif text-4xl tracking-tight">Page not found</h1>
      <p className="mt-3 max-w-sm text-sm text-muted-foreground">
        The page may have moved or the link may be out of date.
      </p>
      <Button asChild className="mt-6"><Link href="/">Go home</Link></Button>
    </div>
  );
}
