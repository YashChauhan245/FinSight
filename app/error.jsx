"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("Global app error:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center font-inter">
      <div className="space-y-4 max-w-md">
        <h2 className="text-2xl font-extrabold text-gray-900 font-inter">
          Something went wrong!
        </h2>
        <p className="text-xs text-gray-500 font-medium">
          {error?.message || "An unexpected application error occurred."}
        </p>
        <div className="flex items-center justify-center gap-3 pt-2">
          <Button
            onClick={() => reset()}
            className="bg-violet-600 hover:bg-violet-700 text-white font-medium shadow-sm"
          >
            Try Again
          </Button>
          <Link href="/dashboard">
            <Button variant="outline">Go to Dashboard</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
