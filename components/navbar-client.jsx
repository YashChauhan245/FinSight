"use client";

import { startTransition, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3, CalendarDays, LayoutDashboard, List, LogOut, Menu, Moon,
  PenSquare, Sun, Wallet, X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { endSession } from "@/actions/auth";
import { Button } from "./ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const publicLinks = [
  { label: "Features", href: "/#features" },
  { label: "Assistant demo", href: "/#ai-demo" },
  { label: "Pricing", href: "/#pricing" },
];

const workspaceLinks = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Transactions", href: "/dashboard#transactions", icon: List },
  { label: "Accounts", href: "/dashboard#accounts", icon: Wallet },
  { label: "Planning", href: "/dashboard#planning", icon: CalendarDays },
  { label: "Insights", href: "/dashboard#insights", icon: BarChart3 },
];

export function Brand({ href = "/", onClick }) {
  return (
    <Link href={href} onClick={onClick} className="inline-flex w-fit shrink-0 items-center gap-2 text-lg font-bold tracking-tight">
      <span className="grid size-9 place-items-center rounded-md bg-secondary dark:bg-primary">
        <Image src="/icon.png?v=forest" alt="" width={28} height={28} className="size-7 object-contain" unoptimized />
      </span>
      FinSight
    </Link>
  );
}

function ThemeButton() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const prefersDark = localStorage.getItem("finsight-theme") === "dark";
    document.documentElement.classList.toggle("dark", prefersDark);
    setDark(prefersDark);
  }, []);

  function toggleTheme() {
    const nextTheme = !dark;
    document.documentElement.classList.toggle("dark", nextTheme);
    localStorage.setItem("finsight-theme", nextTheme ? "dark" : "light");
    setDark(nextTheme);
  }

  const label = dark ? "Switch to light theme" : "Switch to dark theme";
  return (
    <Button type="button" size="icon" variant="outline" onClick={toggleTheme} aria-label={label} title={label}>
      {dark ? <Sun /> : <Moon />}
    </Button>
  );
}

function ProfileMenu({ user, showName = false }) {
  const name = user?.name || "My workspace";
  const initials = name.trim().split(/\s+/).slice(0, 2).map((word) => word[0]).join("").toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          aria-label="User menu"
          className={showName ? "h-auto w-full justify-start gap-3 px-2 py-2 text-left" : "size-10 p-0"}
        >
          <span className="grid size-8 shrink-0 place-items-center overflow-hidden rounded-full bg-secondary text-xs font-semibold text-secondary-foreground">
            {user?.image ? (
              <Image src={user.image} alt="" width={32} height={32} className="size-8 object-cover" />
            ) : initials}
          </span>
          {showName && <span className="truncate">{name}</span>}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={showName ? "start" : "end"} className="w-56">
        <DropdownMenuLabel>
          <span className="block truncate">{name}</span>
          {user?.email && <span className="block truncate text-xs font-normal text-muted-foreground">{user.email}</span>}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard"><LayoutDashboard className="size-4" /> Dashboard</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/transaction/create"><PenSquare className="size-4" /> Add transaction</Link>
        </DropdownMenuItem>
        {user && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => startTransition(endSession)} className="text-destructive">
              <LogOut className="size-4" /> Sign out
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function WorkspaceLinks({ current, onNavigate, className, onDashboard }) {
  const NavigationLink = onDashboard ? "a" : Link;

  return (
    <nav aria-label="Workspace" className={className}>
      {workspaceLinks.map(({ label, href, icon: Icon }) => (
        <NavigationLink
          key={href}
          href={onDashboard ? href.slice("/dashboard".length) || "#" : href}
          onClick={() => onNavigate(href)}
          aria-current={current === href ? (href.includes("#") ? "location" : "page") : undefined}
          className={cn(
            "flex flex-col items-center justify-center gap-1 rounded-md px-1 py-2 text-xs font-medium text-muted-foreground hover:bg-muted lg:flex-row lg:justify-start lg:gap-3 lg:px-3 lg:py-2.5 lg:text-sm",
            current === href && "bg-secondary text-secondary-foreground"
          )}
        >
          <Icon aria-hidden="true" className="size-4 shrink-0" />
          {label}
        </NavigationLink>
      ))}
    </nav>
  );
}

export default function NavbarClient({ workspace = false, user }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dashboardSection, setDashboardSection] = useState("/dashboard");

  const isDashboard = pathname === "/dashboard";
  const isAccount = pathname.startsWith("/account/");
  const isTransaction = pathname.startsWith("/transaction/");
  const inWorkspace = isDashboard || isAccount || isTransaction;

  useEffect(() => {
    if (!workspace) {
      setMobileMenuOpen(false);
      return;
    }
    function syncSection() {
      setDashboardSection("/dashboard" + window.location.hash);
    }
    syncSection();
    window.addEventListener("hashchange", syncSection);
    return () => window.removeEventListener("hashchange", syncSection);
  }, [pathname, workspace]);

  if (workspace) {
    const current = isAccount ? "/dashboard#accounts" : isTransaction ? "/dashboard#transactions" : dashboardSection;
    const goToOverview = () => setDashboardSection("/dashboard");
    return (
      <>
        <aside className="fixed inset-y-0 left-0 z-30 hidden w-52 flex-col border-r bg-card p-4 lg:flex">
          <div className="px-2 pb-7 pt-2"><Brand href="/dashboard" onClick={goToOverview} /></div>
          <WorkspaceLinks current={current} onNavigate={setDashboardSection} onDashboard={isDashboard} className="grid gap-1" />
          <div className="mt-auto border-t pt-3"><ProfileMenu user={user} showName /></div>
        </aside>
        <header className="fixed inset-x-0 top-0 z-30 border-b bg-card lg:left-52">
          <div className="flex h-16 items-center justify-between gap-2 px-4 sm:px-7">
            <div className="lg:hidden"><Brand href="/dashboard" onClick={goToOverview} /></div>
            <span className="hidden text-sm font-medium text-muted-foreground lg:block">Personal workspace</span>
            <div className="flex items-center gap-2">
              {!isDashboard && (
                <Button asChild className="hidden sm:inline-flex">
                  <Link href="/transaction/create"><PenSquare /> Add transaction</Link>
                </Button>
              )}
              <ThemeButton />
              <div className="lg:hidden"><ProfileMenu user={user} /></div>
            </div>
          </div>
          <WorkspaceLinks current={current} onNavigate={setDashboardSection} onDashboard={isDashboard} className="grid h-[52px] grid-cols-5 gap-1 border-t px-2 py-1 lg:hidden" />
        </header>
      </>
    );
  }

  if (inWorkspace) return null;

  return (
    <header className="fixed inset-x-0 top-0 z-30 border-b bg-card">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-2 px-4 sm:px-6">
        <Brand />
        <nav aria-label="Main navigation" className="hidden items-center gap-7 text-sm font-medium text-muted-foreground md:flex">
          {publicLinks.map(({ href, label }) => <Link key={href} href={href} className="hover:text-foreground">{label}</Link>)}
        </nav>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <ThemeButton />
          <Button asChild variant="ghost" className="px-2 md:px-4"><Link href="/sign-in">Sign in</Link></Button>
          <Button asChild className="hidden sm:inline-flex"><Link href="/sign-up">Get started</Link></Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
      {mobileMenuOpen && (
        <nav id="mobile-navigation" aria-label="Mobile navigation" className="grid gap-1 border-t bg-card p-3 text-sm md:hidden">
          {publicLinks.map(({ href, label }) => (
            <Link key={href} href={href} onClick={() => setMobileMenuOpen(false)} className="rounded-md px-3 py-2 hover:bg-muted">{label}</Link>
          ))}
          <Link href="/sign-up" onClick={() => setMobileMenuOpen(false)} className="rounded-md px-3 py-2 font-medium text-primary hover:bg-muted sm:hidden">Get started</Link>
        </nav>
      )}
    </header>
  );
}
