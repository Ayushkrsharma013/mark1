"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { navLinks } from "@/lib/nav";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          "border-b border-[rgba(255,255,255,0.04)]",
          scrolled
            ? "bg-[rgba(8,12,20,0.95)] backdrop-blur-xl"
            : "bg-transparent backdrop-blur-md"
        )}
      >
        <nav className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-xl font-semibold tracking-tight font-mono">
              <span className="text-white">FlowForges</span>
            </span>
            <span className="w-2 h-2 rounded-full bg-[#6366F1] animate-pulse" />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm transition-colors duration-200",
                  pathname === link.href || pathname.startsWith(link.href + "/")
                    ? "text-white"
                    : "text-[#94A3B8] hover:text-white"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/contact"
              className="text-sm px-5 py-2 rounded-full border border-[#F59E0B] text-[#F59E0B] font-medium hover:bg-[#F59E0B] hover:text-black transition-all duration-200"
            >
              Book a Call
            </Link>
          </div>

          <button
            className="md:hidden p-2 text-white"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[#080C14] md:hidden"
          >
            <div className="flex flex-col h-full px-6 py-4">
              <div className="flex justify-between items-center">
                <span className="text-xl font-semibold font-mono text-white">FlowForges</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                  className="p-2 text-white"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <nav className="flex flex-col gap-6 mt-12">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        "text-2xl font-medium",
                        pathname === link.href
                          ? "text-white"
                          : "text-[#94A3B8]"
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-auto pb-8">
                <Link
                  href="/contact"
                  className="block w-full text-center text-base px-6 py-3 rounded-full bg-[#F59E0B] text-black font-medium"
                >
                  Book a Call
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
