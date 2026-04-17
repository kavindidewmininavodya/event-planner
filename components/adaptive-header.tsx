"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { UserButton } from "@neondatabase/auth/react";
import { Menu, X, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function AdaptiveHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header className={cn(
      "sticky top-0 z-50 transition-all duration-200 border-b",
      scrolled ? "bg-background/95 backdrop-blur-md py-2 shadow-sm" : "bg-background py-3"
    )}>
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="size-8 rounded bg-primary flex items-center justify-center text-primary-foreground font-black text-xs">
            E
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground">
            Event Planner
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/dashboard"
            className={cn(
              "text-xs font-bold transition-colors hover:text-primary",
              pathname === "/dashboard" ? "text-primary underline underline-offset-4" : "text-muted-foreground"
            )}
          >
            Dashboard
          </Link>
          <Link
            href="/about"
            className={cn(
              "text-xs font-bold transition-colors hover:text-primary",
              pathname === "/about" ? "text-primary underline underline-offset-4" : "text-muted-foreground"
            )}
          >
            About
          </Link>
          <Link
            href="/dashboard/settings"
            className={cn(
              "text-xs font-bold transition-colors hover:text-primary",
              pathname === "/dashboard/settings" ? "text-primary underline underline-offset-4" : "text-muted-foreground"
            )}
          >
            Settings
          </Link>
          <UserButton size="sm" disableDefaultLinks />
        </nav>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-3 md:hidden">
          <UserButton size="sm" disableDefaultLinks />
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 text-foreground"
          >
            {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={cn(
        "fixed inset-0 top-[53px] z-40 bg-background transition-all duration-300 md:hidden",
        isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      )}>
        <nav className="flex flex-col p-4 space-y-2">
          <Link
            href="/dashboard"
            className="flex items-center justify-between border-b border-white/10 py-4 px-2 text-sm font-bold"
          >
            Dashboard
            <ChevronRight className="size-4" />
          </Link>
          <Link
            href="/about"
            className="flex items-center justify-between border-b border-white/10 py-4 px-2 text-sm font-bold"
          >
            About
            <ChevronRight className="size-4" />
          </Link>
          <Link
            href="/dashboard/settings"
            className="flex items-center justify-between border-b border-white/10 py-4 px-2 text-sm font-bold"
          >
            Settings
            <ChevronRight className="size-4" />
          </Link>
        </nav>
      </div>
    </header>
  );
}
