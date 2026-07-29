"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  PenBox,
  LayoutDashboard,
  Sparkles,
  Menu,
  X,
  ChevronRight,
  LogOut,
  User,
} from "lucide-react";

export default function NavbarClient() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isSignedIn = mounted && status === "authenticated";
  const user = session?.user;

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

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-200 bg-white border-b border-gray-200/80 ${
        scrolled ? "shadow-sm py-2.5" : "py-3"
      }`}
      suppressHydrationWarning
    >
      <nav className="container mx-auto px-4 md:px-6 flex items-center justify-between" suppressHydrationWarning>
        {/* Brand Logo */}
        <div className="flex items-center gap-6">
          <Link href={isSignedIn ? "/dashboard" : "/"} className="flex items-center group">
            <Image
              src="/logoo.png"
              alt="FinSight Logo"
              width={185}
              height={52}
              priority
              className="h-11 md:h-12 w-auto object-contain transition-transform duration-200 group-hover:opacity-90"
            />
          </Link>
        </div>

        {/* Desktop Navigation Links for SignedOut */}
        {!isSignedIn && (
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-600">
            {navLinksSignedOut.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-gray-600 hover:text-gray-900 transition-colors py-1 font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}

        {/* Action Buttons & Profile */}
        <div className="flex items-center gap-3" suppressHydrationWarning>
          {isSignedIn ? (
            <>
              <Link href="/dashboard" className="hidden sm:inline-block">
                <Button
                  variant="outline"
                  className="border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900 font-medium text-sm flex items-center gap-2 rounded-xl h-9 px-3.5 shadow-sm transition-all"
                >
                  <LayoutDashboard size={15} className="text-violet-600" />
                  <span>Dashboard</span>
                </Button>
              </Link>

              <Link href="/transaction/create">
                <Button className="bg-violet-600 hover:bg-violet-700 text-white font-medium text-sm flex items-center gap-2 shadow-sm transition-all rounded-xl h-9 px-4">
                  <PenBox size={15} />
                  <span className="hidden sm:inline">Add Transaction</span>
                </Button>
              </Link>

              {/* User Dropdown */}
              <div className="pl-1">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      className="w-9 h-9 rounded-full border border-gray-200 shadow-sm hover:border-violet-400 focus:outline-none transition-all flex items-center justify-center overflow-hidden bg-violet-100 text-violet-700 font-semibold text-xs"
                      aria-label="User menu"
                    >
                      {user?.image ? (
                        <Image
                          src={user.image}
                          alt={user.name || "User Avatar"}
                          width={36}
                          height={36}
                          className="w-full h-full object-cover rounded-full"
                        />
                      ) : (
                        <span>{getInitials(user?.name)}</span>
                      )}
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 p-2 rounded-xl shadow-lg border-gray-200">
                    <DropdownMenuLabel className="font-normal p-2">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-semibold text-gray-900 leading-none">
                          {user?.name || "User"}
                        </p>
                        <p className="text-xs leading-none text-gray-500 truncate">
                          {user?.email || ""}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-gray-100 my-1" />
                    <DropdownMenuItem asChild>
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-2 cursor-pointer rounded-lg px-2.5 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <LayoutDashboard size={15} className="text-violet-600" />
                        <span>Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href="/transaction/create"
                        className="flex items-center gap-2 cursor-pointer rounded-lg px-2.5 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <PenBox size={15} className="text-violet-600" />
                        <span>Add Transaction</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-gray-100 my-1" />
                    <DropdownMenuItem
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="flex items-center gap-2 cursor-pointer rounded-lg px-2.5 py-2 text-sm text-red-600 hover:bg-red-50 focus:bg-red-50 focus:text-red-600"
                    >
                      <LogOut size={15} />
                      <span>Sign Out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </>
          ) : (
            <>
              <Link href="/sign-in">
                <Button
                  variant="outline"
                  className="border-gray-200 text-gray-700 hover:bg-gray-50 font-medium rounded-xl h-9 px-3.5 shadow-sm transition-all"
                >
                  Login
                </Button>
              </Link>

              <Link href="/sign-in">
                <Button className="bg-violet-600 hover:bg-violet-700 text-white shadow-sm font-medium text-sm rounded-xl h-9 px-4 transition-all">
                  <span>Get Started</span>
                </Button>
              </Link>
            </>
          )}

          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center justify-center p-2 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors border border-gray-200 ml-1"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-gray-200 bg-white px-4 pt-3 pb-5 space-y-3 shadow-lg animate-in slide-in-from-top-2 duration-200">
          {!isSignedIn ? (
            <div className="flex flex-col space-y-1.5 pt-1">
              {navLinksSignedOut.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                >
                  <span>{link.label}</span>
                  <ChevronRight size={16} className="text-gray-400" />
                </a>
              ))}
            </div>
          ) : (
            <div className="flex flex-col space-y-1.5 pt-1">
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                  pathname === "/dashboard"
                    ? "bg-violet-50 text-violet-700 font-semibold"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <LayoutDashboard size={17} className="text-violet-600" />
                <span>Dashboard</span>
              </Link>

              <Link
                href="/transaction/create"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                  pathname === "/transaction/create"
                    ? "bg-violet-50 text-violet-700 font-semibold"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <PenBox size={17} className="text-violet-600" />
                <span>Add Transaction</span>
              </Link>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  signOut({ callbackUrl: "/" });
                }}
                className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors w-full text-left"
              >
                <LogOut size={17} />
                <span>Sign Out</span>
              </button>
            </div>
          )}

          <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 px-3">
            <span className="flex items-center gap-1.5 font-medium">
              <Sparkles size={14} className="text-violet-500" />
              FinSight AI Personal Finance
            </span>
          </div>
        </div>
      )}
    </header>
  );
}
