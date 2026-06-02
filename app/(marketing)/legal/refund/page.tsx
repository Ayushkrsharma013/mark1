import type { Metadata } from "next";
import { AsciiBackground } from "@/components/ui/AsciiBackground";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Refund Policy",
  description:
    "Flow-Forges refund and cancellation policy for subscriptions and one-time purchases.",
};

export default function RefundPage() {
  return (
    <div className="pt-24 pb-16 px-6">
      <div className="relative overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.04)] bg-[rgba(255,255,255,0.01)] p-8 md:p-12 mb-10">
        <AsciiBackground
          mode="legal"
          className="absolute inset-0 w-full h-full opacity-40"
        />
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-white">Refund Policy</h1>
          <p className="text-sm text-[#71717a] mt-2">
            Last updated: 2025-08-15
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl">
        <div className="mt-10 space-y-10 text-[#a1a1aa] leading-relaxed">
          <p>
            We aim to be fair and transparent. This Refund Policy applies to
            subscriptions, credit packs, and one‑time purchases made on
            https://flow-forges.com and its subdomains.
          </p>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              1. Subscriptions
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Subscription charges are billed in advance and renew
                automatically at the end of each billing period.
              </li>
              <li>
                You may cancel your subscription at any time. Access continues
                until the end of the current billing period.
              </li>
              <li>
                We do not generally offer refunds for partial billing periods
                already charged. Your cancellation prevents future charges only.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              2. Credit Packs &amp; One‑Time Purchases
            </h2>
            <p>
              Credit packs and one‑time purchases are delivered immediately upon
              successful payment. They are non‑refundable once used or after
              seven (7) days from the date of purchase, whichever is earlier,
              except where a longer refund period is required by applicable law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              3. Exceptional Refunds
            </h2>
            <p>
              If you believe a charge is in error or you are entitled to a
              refund outside the scope of this policy, contact us within seven
              (7) days of the charge at{" "}
              <a
                href="mailto:support@flow-forges.com"
                className="text-[#00d4ff] hover:underline"
              >
                support@flow-forges.com
              </a>
              . We may request logs, account details, or other supporting
              information to investigate. Approved refunds are returned to the
              original payment method within 7–14 business days.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              4. Trials &amp; Promotions
            </h2>
            <p>
              Free trial periods and promotional credits are offered at our
              discretion. We reserve the right to revoke trial access or promo
              credits if we detect misuse, abuse, or fraudulent activity. At the
              end of a trial period, your account will automatically convert to
              a paid plan unless you cancel before the trial expires.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              5. Contact
            </h2>
            <p>
              For billing assistance or refund inquiries, reach us at:
              <br />
              Email:{" "}
              <a
                href="mailto:support@flow-forges.com"
                className="text-[#00d4ff] hover:underline"
              >
                support@flow-forges.com
              </a>
              <br />
              Phone:{" "}
              <a
                href="tel:+919630755104"
                className="text-[#00d4ff] hover:underline"
              >
                +91 9630755104
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
