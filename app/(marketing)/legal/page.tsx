import type { Metadata } from "next";
import Link from "next/link";
import { AsciiBackground } from "@/components/ui/AsciiBackground";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Legal",
  description:
    "Flow-Forges legal center — privacy policy, terms, refunds, shipping, cancellation, and payment disclosure.",
};

const legalPages = [
  {
    number: 1,
    title: "Privacy Policy",
    description: "How we collect, use, and protect your data",
    href: "/legal/privacy",
  },
  {
    number: 2,
    title: "Terms of Service",
    description: "Rules and guidelines for using our services",
    href: "/legal/terms",
  },
  {
    number: 3,
    title: "Refund Policy",
    description: "Our policies on refunds and cancellations",
    href: "/legal/refund",
  },
  {
    number: 4,
    title: "Shipping Policy",
    description: "Digital delivery information and timelines",
    href: "/legal/shipping",
  },
  {
    number: 5,
    title: "Cancellation Policy",
    description: "How to cancel services and data retention",
    href: "/legal/cancellation",
  },
  {
    number: 6,
    title: "Payment Disclosure",
    description: "Payment methods, processors, and security",
    href: "/legal/payment-disclosure",
  },
] as const;

export default function LegalPage() {
  return (
    <div className="pt-24 pb-16 px-6">
      <div className="relative overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.04)] bg-[rgba(255,255,255,0.01)] p-8 md:p-12 mb-10">
        <AsciiBackground
          mode="legal"
          className="absolute inset-0 w-full h-full opacity-40"
        />
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-white">Legal Center</h1>
          <p className="text-sm text-[#71717a] mt-2">
            Policies and terms for using Flow‑Forges. Last updated 2025-08-15.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl">
        <div className="mt-10 space-y-4">
          {legalPages.map((page) => (
            <Link
              key={page.href}
              href={page.href}
              className="group flex items-center gap-5 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-5 hover:bg-[rgba(255,255,255,0.04)] hover:border-[rgba(255,255,255,0.1)] transition-colors"
            >
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[rgba(0,212,255,0.1)] border border-[rgba(0,212,255,0.2)] flex items-center justify-center text-sm font-semibold text-[#00d4ff]">
                {page.number}
              </span>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-semibold text-white group-hover:text-[#00d4ff] transition-colors">
                  {page.title}
                </h3>
                <p className="text-sm text-[#71717a] mt-0.5">
                  {page.description}
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-[#52525b] group-hover:text-[#00d4ff] transition-colors flex-shrink-0" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
