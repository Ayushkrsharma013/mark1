import type { Metadata } from "next";
import { AsciiBackground } from "@/components/ui/AsciiBackground";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "FlowForges refund and cancellation policy.",
};

export default function RefundPage() {
  return (
    <div className="pt-24 pb-16 px-6">
      <div className="relative overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.04)] bg-[rgba(255,255,255,0.01)] p-8 md:p-12 mb-10">
        <AsciiBackground mode="legal" className="absolute inset-0 w-full h-full opacity-40" />
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-white">Refund Policy</h1>
          <p className="text-sm text-[#71717a] mt-2">Last updated: May 2026</p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl">

        <div className="mt-10 space-y-10 text-[#a1a1aa] leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Custom Development Services</h2>
            <p>
              Due to the custom nature of our work, all fees for consulting and
              custom development services are non-refundable. If you are
              unsatisfied with our work, we will make reasonable efforts to
              address your concerns within the scope of the original agreement.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Productized Services</h2>
            <p>
              For subscription-based products (e.g., Prospecting OS), you may
              cancel at any time. Your access continues until the end of the
              current billing period. We do not provide partial-month refunds.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. Cancellation</h2>
            <p>
              To cancel a subscription or ongoing engagement, email
              hello@flowforges.com with your request. We process cancellations
              within 3 business days and confirm via email.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Disputes</h2>
            <p>
              If you believe you are entitled to a refund outside of this policy,
              contact us at hello@flowforges.com. We review disputes on a
              case-by-case basis and aim to resolve them fairly within 14 days.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
