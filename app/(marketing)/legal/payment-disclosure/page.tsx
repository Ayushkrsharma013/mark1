import type { Metadata } from "next";
import { AsciiBackground } from "@/components/ui/AsciiBackground";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Payment Disclosure",
  description:
    "Payment methods, processors, tax information, and billing security at Flow-Forges.",
};

export default function PaymentDisclosurePage() {
  return (
    <div className="pt-24 pb-16 px-6">
      <div className="relative overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.04)] bg-[rgba(255,255,255,0.01)] p-8 md:p-12 mb-10">
        <AsciiBackground
          mode="legal"
          className="absolute inset-0 w-full h-full opacity-40"
        />
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-white">
            Payment Disclosure
          </h1>
          <p className="text-sm text-[#71717a] mt-2">
            Last updated: 2026-06-02
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl">
        <div className="mt-10 space-y-10 text-[#a1a1aa] leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              1. Payment Methods
            </h2>
            <p>
              We accept major international credit and debit cards (Visa, Mastercard, American Express) and PayPal through our payment processor, Paddle. Paddle acts as the Merchant of Record for all transactions. All charges will appear on your statement as &ldquo;PADDLE.NET* FLOWFORGES&rdquo;. Transactions for international customers are processed in USD.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              2. Payment Processors &amp; Security
            </h2>
            <p>
              Payments are securely processed by Paddle.com, a PCI-DSS Level 1 compliant Merchant of Record. FlowForges does not store, process, or transmit any card information.
            </p>
            <p className="mt-3">
              All payment pages are served over TLS (HTTPS) with HSTS enabled,
              and payment information is tokenized by the processor before it
              reaches our servers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              3. Taxes &amp; Invoices
            </h2>
            <p>
              Prices displayed on the website may be exclusive of applicable
              taxes. Goods and Services Tax (GST) and any other applicable taxes
              are calculated and added at checkout based on your billing
              location and the nature of the service. Tax amounts are clearly
              itemized on your invoice.
            </p>
            <p className="mt-3">
              GSTIN: 22MGSPS6643B1ZY
              <br />
              If you require a tax invoice with your business GSTIN or
              company information, contact{" "}
              <a
                href="mailto:support@flow-forges.com"
                className="text-[#00d4ff] hover:underline"
              >
                support@flow-forges.com
              </a>{" "}
              with your GSTIN and we will issue a compliant tax invoice within
              48 hours.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              4. Chargebacks &amp; Disputes
            </h2>
            <p>
              If you do not recognize a charge or believe a charge is in error,
              please contact us at{" "}
              <a
                href="mailto:support@flow-forges.com"
                className="text-[#00d4ff] hover:underline"
              >
                support@flow-forges.com
              </a>{" "}
              before filing a chargeback with your bank or card issuer. Filing a
              chargeback without contacting us first may delay resolution. We
              maintain detailed transaction logs and will cooperate fully with
              any legitimate dispute investigation.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              5. Recurring Billing Authorization
            </h2>
            <p>
              By subscribing to a paid plan, you authorize Flow‑Forges and its
              payment processors to charge your payment method on a recurring
              basis at the interval you selected (monthly or annually) until you
              cancel. You may cancel recurring billing at any time as described
              in our{" "}
              <a
                href="/legal/cancellation"
                className="text-[#00d4ff] hover:underline"
              >
                Cancellation Policy
              </a>
              . Changes to plan pricing will be communicated at least 30 days in
              advance via email.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              6. Currency &amp; Exchange
            </h2>
            <p>
              Prices for international customers are listed and charged in USD via Paddle. Paddle handles all currency conversion and tax compliance for international transactions. Indian customers may be quoted prices in INR where applicable.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
