import React from "react";
import { Button } from "./ui/button";
import { PenBox, LayoutDashboard, Sun, Sparkles } from "lucide-react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { checkUser } from "@/lib/checkUser";

const Header = async () => {
  await checkUser();

  return (
    <header className="fixed top-0 w-full bg-white/85 backdrop-blur-md z-50 border-b border-slate-200/80 shadow-sm" suppressHydrationWarning>
      <nav className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between" suppressHydrationWarning>
        {/* Brand Logo */}
        <SignedIn>
          <Link href="/dashboard" className="flex items-center group">
            <Image
              src="/logoo.png"
              alt="FinSight Logo"
              width={160}
              height={44}
              priority
              className="h-11 md:h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
            />
          </Link>
        </SignedIn>
        <SignedOut>
          <Link href="/" className="flex items-center group">
            <Image
              src="/logoo.png"
              alt="FinSight Logo"
              width={160}
              height={44}
              priority
              className="h-11 md:h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
            />
          </Link>
        </SignedOut>

        {/* Navigation Links */}
        <SignedOut>
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-600">
            <a href="#features" className="hover:text-slate-900 transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="hover:text-slate-900 transition-colors">
              How It Works
            </a>
            <a href="#ai-demo" className="hover:text-slate-900 transition-colors">
              AI Demo
            </a>
          </div>
        </SignedOut>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3" suppressHydrationWarning>

          <SignedIn>
            <Link href="/dashboard">
              <Button variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-100 font-medium text-sm flex items-center gap-2">
                <LayoutDashboard size={16} />
                <span className="hidden md:inline">Dashboard</span>
              </Button>
            </Link>
            <a href="/transaction/create">
              <Button className="bg-gradient-to-r from-violet-600 to-cyan-600 text-white hover:opacity-90 font-medium text-sm flex items-center gap-2 shadow-md hover:shadow-lg transition-all">
                <PenBox size={16} />
                <span className="hidden md:inline">Add Transaction</span>
              </Button>
            </a>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-9 h-9 border border-slate-200 shadow-sm",
                },
              }}
            />
          </SignedIn>

          <SignedOut>
            <SignInButton forceRedirectUrl="/dashboard">
              <Button variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-100">
                Login
              </Button>
            </SignInButton>

            <Link href="/dashboard">
              <Button className="bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-700 hover:to-cyan-600 text-white shadow-md hover:shadow-lg transition-all font-semibold text-sm">
                <span>Get Started</span>
              </Button>
            </Link>
          </SignedOut>
        </div>
      </nav>
    </header>
  );
};

export default Header;