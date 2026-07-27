"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center font-jakarta">
      <h1 className="text-6xl font-extrabold text-violet-600 font-jakarta">404</h1>
      <h2 className="mt-3 text-2xl font-bold text-slate-900 font-jakarta">
        Page Not Found
      </h2>
      <p className="mt-2 text-sm text-slate-500 max-w-sm">
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <Link href="/" className="mt-6">
        <Button className="bg-violet-600 hover:bg-violet-700 text-white font-bold px-8 py-5 rounded-xl shadow-md">
          Return to Home
        </Button>
      </Link>
    </div>
  );
}
