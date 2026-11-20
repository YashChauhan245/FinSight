"use client";

import { usePathname } from "next/navigation";
import { Brand } from "./navbar-client";

export default function Footer() {
  const pathname = usePathname();
  if (pathname !== "/") return null;

  return (
    <footer className="border-t bg-card">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-6 sm:px-6">
        <Brand />
        <p className="text-sm text-muted-foreground">Built by Yash Chauhan</p>
        <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
          <a href="#how-it-works" className="hover:text-foreground">How it works</a>
          <a href="#faq" className="hover:text-foreground">FAQ</a>
          <a href="https://github.com/YashChauhan245/FinSight" className="hover:text-foreground">GitHub</a>
        </nav>
      </div>
    </footer>
  );
}
