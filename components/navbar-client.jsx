"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import {
  PenBox,
  LayoutDashboard,
  Sparkles,
  Menu,
  X,
  ChevronRight
} from "lucide-react";

export default function NavbarClient() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinksSignedOut = [
    { label: "Features", href: "/#features" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "AI Demo", href: "/#ai-demo" },
  ];

  const navLinksSignedIn = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "New Transaction", href: "/transaction/create", icon: PenBox },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl border-b border-slate-200/90 shadow-[0_8px_30px_rgb(0,0,0,0.06)] py-2.5"
          : "bg-white/80 backdrop-blur-md border-b border-slate-200/70 py-3"
      }`}
      suppressHydrationWarning
    >
      <nav className="container mx-auto px-4 md:px-6 flex items-center justify-between" suppressHydrationWarning>
        {/* Brand Logo */}
        <div className="flex items-center gap-6">
          <SignedIn>
            <Link href="/dashboard" className="flex items-center group">
              <Image
                src="/logoo.png"
                alt="FinSight Logo"
                width={185}
                height={52}
                priority
                className="h-12 md:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
          </SignedIn>

          <SignedOut>
            <Link href="/" className="flex items-center group">
              <Image
                src="/logoo.png"
                alt="FinSight Logo"
                width={185}
                height={52}
                priority
                className="h-12 md:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
          </SignedOut>
        </div>

        {/* Desktop Navigation Links for SignedOut */}
        <SignedOut>
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-600">
            {navLinksSignedOut.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative text-slate-600 hover:text-slate-900 transition-colors py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-violet-600 after:to-cyan-500 hover:after:w-full after:transition-all after:duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>
        </SignedOut>

        {/* Action Buttons & Profile */}
        <div className="flex items-center gap-3" suppressHydrationWarning>
          <SignedIn>
            <Link href="/dashboard" className="hidden sm:inline-block">
              <Button
                variant="outline"
                className="border-slate-200 text-slate-700 hover:bg-slate-100/80 hover:text-slate-900 font-medium text-sm flex items-center gap-2 rounded-xl h-10 px-4 transition-all"
              >
                <LayoutDashboard size={16} className="text-violet-600" />
                <span>Dashboard</span>
              </Button>
            </Link>

            <Link href="/transaction/create">
              <Button className="bg-gradient-to-r from-violet-600 via-purple-600 to-cyan-500 hover:opacity-95 text-white font-medium text-sm flex items-center gap-2 shadow-md shadow-violet-500/20 hover:shadow-lg hover:shadow-violet-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all rounded-xl h-10 px-4">
                <PenBox size={16} />
                <span className="hidden sm:inline">Add Transaction</span>
              </Button>
            </Link>

            <div className="pl-1">
              <UserButton
                appearance={{
                  elements: {
                    avatarBox:
                      "w-9 h-9 border-2 border-slate-200/90 shadow-sm hover:border-violet-400 transition-all rounded-full",
                  },
                }}
              />
            </div>
          </SignedIn>

          <SignedOut>
            <SignInButton forceRedirectUrl="/dashboard">
              <Button
                variant="outline"
                className="border-slate-200 text-slate-700 hover:bg-slate-100 font-medium rounded-xl h-10 px-4 transition-all"
              >
                Login
              </Button>
            </SignInButton>

            <Link href="/dashboard">
              <Button className="bg-gradient-to-r from-violet-600 via-purple-600 to-cyan-500 hover:from-violet-700 hover:to-cyan-600 text-white shadow-md shadow-violet-500/20 hover:shadow-lg transition-all font-semibold text-sm rounded-xl h-10 px-4">
                <span>Get Started</span>
              </Button>
            </Link>
          </SignedOut>

          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center justify-center p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors border border-slate-200/80 ml-1"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white/95 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-4 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <SignedOut>
            <div className="flex flex-col space-y-2 pt-2">
              {navLinksSignedOut.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-violet-50 hover:text-violet-700 transition-colors"
                >
                  <span>{link.label}</span>
                  <ChevronRight size={16} className="text-slate-400" />
                </a>
              ))}
            </div>
          </SignedOut>

          <SignedIn>
            <div className="flex flex-col space-y-2 pt-2">
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  pathname === "/dashboard"
                    ? "bg-violet-50 text-violet-700 font-semibold"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <LayoutDashboard size={18} className="text-violet-600" />
                <span>Dashboard</span>
              </Link>

              <Link
                href="/transaction/create"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  pathname === "/transaction/create"
                    ? "bg-violet-50 text-violet-700 font-semibold"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <PenBox size={18} className="text-cyan-600" />
                <span>Add Transaction</span>
              </Link>
            </div>
          </SignedIn>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 px-3">
            <span className="flex items-center gap-1.5">
              <Sparkles size={14} className="text-violet-500" />
              FinSight AI Personal Finance
            </span>
          </div>
        </div>
      )}
    </header>
  );
}
