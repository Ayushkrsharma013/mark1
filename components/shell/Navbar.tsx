"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { navLinks } from "@/lib/nav";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 w-full px-2">
        {/* Floating pill container */}
        <div
          className={cn(
            "mx-auto flex items-center gap-8 transition-all duration-500 ease-out",
            scrolled
              ? "mt-2 max-w-5xl h-14 rounded-2xl border border-white/[0.06] bg-[#04040a]/80 backdrop-blur-2xl shadow-[0_1px_40px_rgba(0,0,0,0.4)] px-6"
              : "mt-0 max-w-7xl h-20 rounded-none border-transparent bg-transparent backdrop-blur-0 px-6"
          )}
        >
          {/* Top edge glow line — only visible on scroll */}
          <div
            className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#00d4ff]/15 to-transparent transition-opacity duration-500"
            style={{ opacity: scrolled ? 1 : 0 }}
          />

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
            <img
              src="/logo-icon.png"
              alt="Flow-Forges"
              className="w-7 h-7 rounded-lg"
            />
            <span className="text-[15px] font-semibold tracking-tight">
              <span className="text-[#00d4ff]">Flow</span>
              <span className="text-white">Forges</span>
            </span>
          </Link>

          {/* Desktop nav — absolutely centered */}
          <nav className="hidden md:flex items-center gap-0.5 absolute left-1/2 -translate-x-1/2">
            {navLinks.map(({ href, name }) => {
              const active =
                pathname === href ||
                pathname.startsWith(href + "/");
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-200",
                    active
                      ? "text-white"
                      : "text-[#888899] hover:text-white hover:bg-white/[0.04]"
                  )}
                >
                  {active && (
                    <span className="absolute inset-0 rounded-full bg-white/[0.07] ring-1 ring-inset ring-white/[0.05]" />
                  )}
                  <span className="relative">{name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-2 ml-auto flex-shrink-0">
            <Link
              href="/login"
              className="text-sm font-medium text-[#888899] hover:text-white transition-colors duration-200 px-3 py-2"
            >
              Sign in
            </Link>
            <Link
              href="/contact"
              className="text-sm font-semibold px-5 py-2 rounded-full bg-white text-[#06060a] hover:bg-white/90 transition-all duration-200 hover:shadow-[0_0_24px_rgba(255,255,255,0.12)]"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden relative ml-auto w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white/[0.05] transition-colors"
            aria-label="Toggle navigation"
          >
            <span
              className={cn(
                "absolute text-white transition-all duration-200",
                open ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-90 scale-75"
              )}
            >
              <X size={18} />
            </span>
            <span
              className={cn(
                "absolute text-white transition-all duration-200",
                open ? "opacity-0 -rotate-90 scale-75" : "opacity-100 rotate-0 scale-100"
              )}
            >
              <Menu size={18} />
            </span>
          </button>

        </div>
      </header>

      {/* Mobile fullscreen overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 md:hidden flex flex-col transition-opacity duration-300",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <div
          className="absolute inset-0 bg-[#04040a]/97 backdrop-blur-2xl"
          onClick={() => setOpen(false)}
        />

        <div
          className={cn(
            "relative flex-1 flex flex-col items-center justify-center transition-transform duration-300",
            open ? "translate-y-0" : "-translate-y-6"
          )}
        >
          <div className="flex flex-col items-center gap-0.5 w-full">
            {navLinks.map(({ href, name }, i) => {
              const active =
                pathname === href ||
                pathname.startsWith(href + "/");
              return (
                <div
                  key={href}
                  style={{ transitionDelay: open ? `${80 + i * 55}ms` : "0ms" }}
                  className={cn(
                    "transition-all duration-300",
                    open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  )}
                >
                  <Link
                    href={href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block px-8 py-2 text-[2.5rem] font-bold tracking-tight transition-colors duration-200",
                      active
                        ? "text-white"
                        : "text-[#2e2e3e] hover:text-[#888899]"
                    )}
                  >
                    {name}
                  </Link>
                </div>
              );
            })}
          </div>

          <div
            style={{
              transitionDelay: open ? `${80 + navLinks.length * 55 + 40}ms` : "0ms",
            }}
            className={cn(
              "mt-12 flex flex-col items-center gap-3 px-8 w-full transition-all duration-300",
              open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="w-full max-w-xs text-center py-3.5 rounded-2xl bg-white text-[#06060a] font-semibold text-[15px] hover:bg-white/90 transition-all"
            >
              Get Started
            </Link>
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="text-sm text-[#555566] hover:text-white transition-colors duration-200"
            >
              Already a member? Sign in
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
