import type { Metadata } from "next";
import { AsciiBackground } from "@/components/ui/AsciiBackground";

export const metadata: Metadata = {
  title: "Cancellation Policy",
  description:
    "How to cancel your Flow-Forges subscription, data retention, and reactivation.",
};

export default function CancellationPage() {
  return (
    <div className="pt-24 pb-16 px-6">
      <div className="relative overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.04)] bg-[rgba(255,255,255,0.01)] p-8 md:p-12 mb-10">
        <AsciiBackground
          mode="legal"
          className="absolute inset-0 w-full h-full opacity-40"
        />
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-white">
            Cancellation Policy
          </h1>
          <p className="text-sm text-[#71717a] mt-2">
            Last updated: 2025-08-15
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl">
        <div className="mt-10 space-y-10 text-[#a1a1aa] leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              1. How to Cancel
            </h2>
            <p>
              You may cancel your subscription at any time through your account
              settings page. Navigate to Dashboard &rarr; Settings &rarr;
              Billing, and select &ldquo;Cancel Subscription.&rdquo; You will
              receive an email confirmation once the cancellation is processed.
              Alternatively, you may request cancellation by contacting{" "}
              <a
                href="mailto:support@flow-forges.com"
                className="text-[#00d4ff] hover:underline"
              >
                support@flow-forges.com
              </a>
              . Cancellation takes effect at the end of the current billing
              period. No further charges will be applied after the cancellation
              date.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              2. Access After Cancellation
            </h2>
            <p>
              Your access to paid features continues uninterrupted until the end
              of the current billing period. After the cancellation takes
              effect, your account will revert to a limited or free tier (if
              available), and you will lose access to paid-only features, data
              storage beyond free-tier limits, and premium support.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              3. Data Retention
            </h2>
            <p>
              Upon cancellation, we may retain limited account and transactional
              information as required by applicable law or for legitimate
              business purposes (e.g., tax records, fraud prevention). You may
              request a full export or deletion of your personal data in
              accordance with our Privacy Policy. Data that is not subject to a
              legal retention obligation will be deleted within 90 days of
              cancellation.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              4. Reactivation
            </h2>
            <p>
              You may reactivate your subscription at any time by selecting a
              plan and re-subscribing through your account dashboard. Previously
              stored data within the retention window will be restored to your
              account upon reactivation. If your data has been purged per the
              retention schedule above, it cannot be recovered.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              5. Refunds on Cancellation
            </h2>
            <p>
              Cancellation prevents future charges but does not trigger a refund
              for the current billing period. Please refer to our{" "}
              <a
                href="/legal/refund"
                className="text-[#00d4ff] hover:underline"
              >
                Refund Policy
              </a>{" "}
              for details on when refunds may be issued.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
