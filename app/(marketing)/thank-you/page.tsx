import type { Metadata } from "next";
import Link from "next/link";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Payment Successful",
  description: "Thank you for your purchase.",
};

export default function ThankYouPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md mx-auto text-center">
        <div className="w-16 h-16 rounded-full bg-[#0a2a0a] border border-[#1a3a1a] flex items-center justify-center mx-auto mb-8 text-2xl text-[#4ade80]">
          ✓
        </div>
        <h1 className="text-3xl font-bold text-white mb-4">Payment Successful</h1>
        <p className="text-[#71717a] leading-relaxed mb-8">
          Welcome to FlowForges. We&apos;ll be in touch within 4 hours to get you set up.
          Check your email for confirmation and next steps.
        </p>
        <div className="space-y-3">
          <Link
            href="/book"
            className="block w-full py-3.5 rounded-full bg-[#e8420a] text-white font-semibold text-sm text-center hover:bg-[#cc3a08] transition-colors"
          >
            Schedule Onboarding Call
          </Link>
          <Link
            href="/"
            className="block w-full py-3.5 rounded-full border border-[#1a1a1a] text-[#71717a] font-semibold text-sm text-center hover:text-white hover:border-zinc-600 transition-colors"
          >
            Back to Home
          </Link>
        </div>
        <p className="text-xs text-[#71717a] mt-6">
          Questions? Email us at{" "}
          <a href="mailto:support@flow-forges.com" className="text-white hover:text-[#e8420a] transition-colors">
            support@flow-forges.com
          </a>
        </p>
      </div>
    </div>
  );
}
