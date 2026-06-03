import type { Metadata } from "next";
import { AsciiBackground } from "@/components/ui/AsciiBackground";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Payment Disclosure",
  description: "Payment methods, Dodo Payments as Merchant of Record, taxes, billing security, and recurring billing authorisation for FlowForges.",
};

export default function PaymentDisclosurePage() {
  return (
    <div className="pt-24 pb-16 px-6">
      <div className="relative overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.04)] bg-[rgba(255,255,255,0.01)] p-8 md:p-12 mb-10">
        <AsciiBackground mode="legal" className="absolute inset-0 w-full h-full opacity-40" />
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-white">Payment Disclosure</h1>
          <p className="text-sm text-[#71717a] mt-2">Last updated: 2026-06-03 &nbsp;·&nbsp; Effective: 2026-06-03</p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl">
        <div className="mt-10 space-y-10 text-[#a1a1aa] leading-relaxed">

          <p>
            This Payment Disclosure explains how payments are processed for FlowForges products and services,
            who acts as the Merchant of Record, how taxes are handled, and what recurring billing authorisation
            means. Please read this alongside our <a href="/legal/terms" className="text-[#00d4ff] hover:underline">Terms of Service</a> and{" "}
            <a href="/legal/refund" className="text-[#00d4ff] hover:underline">Refund Policy</a>.
          </p>

          {/* 1 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Merchant of Record — Dodo Payments</h2>
            <p className="mb-3">
              All payments for FlowForges products and subscriptions are processed by{" "}
              <strong className="text-white">Dodo Payments Inc.</strong> (&ldquo;Dodo Payments&rdquo;),
              acting as our <strong className="text-white">Merchant of Record</strong>.
            </p>
            <p className="mb-3">
              As Merchant of Record, Dodo Payments is the legally responsible seller for your purchase. This means:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Dodo Payments&apos; name appears on your bank or card statement as <strong className="text-white">&ldquo;DODO* FLOWFORGES&rdquo;</strong>.</li>
              <li>Dodo Payments handles all payment processing, tax collection, and regulatory compliance on a global basis.</li>
              <li>Dodo Payments issues your receipt and VAT/GST invoice where applicable.</li>
              <li>Disputes with Dodo Payments regarding payment processing can be directed to <a href="https://dodopayments.com" className="text-[#00d4ff] hover:underline" target="_blank" rel="noopener noreferrer">dodopayments.com</a>.</li>
            </ul>
            <p className="mt-3">
              Dodo Payments&apos; terms of service and privacy policy apply to the payment transaction itself.
              FlowForges&apos;s Terms of Service govern your use of our software and services.
            </p>
          </section>

          {/* 2 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Accepted Payment Methods</h2>
            <p className="mb-3">Via Dodo Payments, we accept the following:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong className="text-white">Credit / Debit Cards:</strong> Visa, Mastercard, American Express, and other major cards.</li>
              <li><strong className="text-white">PayPal</strong></li>
              <li><strong className="text-white">Apple Pay</strong> (on supported devices and browsers)</li>
              <li><strong className="text-white">Google Pay</strong> (on supported devices and browsers)</li>
            </ul>
            <p className="mt-3">
              Payment method availability may vary by country. Dodo Payments will display the available options
              at checkout based on your location.
            </p>
          </section>

          {/* 3 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. Currency</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                All prices are listed and charged in <strong className="text-white">USD</strong>.
              </li>
              <li>
                If your card or account is in a different currency, your bank or payment provider applies
                the conversion at their standard exchange rate. FlowForges does not add a currency conversion surcharge.
              </li>
            </ul>
          </section>

          {/* 4 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Taxes &amp; VAT / GST</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-white">EU customers:</strong> VAT is collected by Dodo Payments at the
                applicable rate for your country.
              </li>
              <li>
                <strong className="text-white">UK customers:</strong> UK VAT (20%) is collected by Dodo Payments
                where applicable.
              </li>
              <li>
                <strong className="text-white">Australian customers:</strong> GST (10%) is collected by
                Dodo Payments where applicable.
              </li>
              <li>
                <strong className="text-white">US customers:</strong> Sales tax is collected where required
                by state law, calculated by Dodo Payments automatically.
              </li>
              <li>
                <strong className="text-white">Indian customers:</strong> 18% GST is applicable on SaaS
                services. Our GSTIN is <strong className="text-white">22MGSPS6643B1ZY</strong>.
                Tax invoices are issued by Dodo Payments on our behalf.
              </li>
            </ul>
            <p className="mt-3">
              Tax amounts are always disclosed at checkout before you complete your purchase.
              If you require a tax invoice with your business GSTIN or VAT number, contact{" "}
              <a href="mailto:support@flow-forges.com" className="text-[#00d4ff] hover:underline">support@flow-forges.com</a>{" "}
              and we will arrange the appropriate documentation within 48 hours.
            </p>
          </section>

          {/* 5 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. Recurring Billing Authorisation</h2>
            <p>
              By subscribing to a FlowForges plan and completing checkout, you authorise Dodo Payments (as our
              Merchant of Record) to charge your selected payment method on a recurring monthly basis at
              the price displayed at checkout, until you cancel your subscription. Key terms:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>Charges occur at the start of each billing period (monthly).</li>
              <li>You will receive a receipt email from Dodo Payments for each successful charge.</li>
              <li>If a payment fails, Dodo Payments will retry before suspending access.</li>
              <li>You may cancel recurring billing at any time — see our <a href="/legal/cancellation" className="text-[#00d4ff] hover:underline">Cancellation Policy</a>.</li>
              <li>Price changes will be communicated with at least 30 days&apos; notice before taking effect on your subscription.</li>
            </ul>
          </section>

          {/* 6 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">6. Payment Security</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Dodo Payments is PCI-DSS compliant, meeting the highest levels of payment card industry
                security standards.
              </li>
              <li>
                FlowForges does <strong className="text-white">not</strong> store, process, or transmit your
                card number, CVV, or full payment credentials on our servers.
              </li>
              <li>
                All checkout pages are served over TLS 1.3 (HTTPS). Payment data is tokenised by Dodo Payments
                before any interaction with our systems.
              </li>
              <li>
                3D Secure authentication (3DS2) is used where required by your card issuer or applicable regulation (including PSD2 in Europe).
              </li>
            </ul>
          </section>

          {/* 7 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">7. Wire Transfer (Custom Projects)</h2>
            <p>
              Custom development projects and bespoke engagements are invoiced directly via wire transfer.
              You will receive a detailed invoice by email with wire transfer instructions to our
              JPMorgan Chase USD account. Payment reference, amount, and due date will be specified in each invoice.
            </p>
            <p className="mt-3">
              For wire transfer enquiries, contact{" "}
              <a href="mailto:support@flow-forges.com" className="text-[#00d4ff] hover:underline">support@flow-forges.com</a>.
            </p>
          </section>

          {/* 8 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">8. Chargebacks &amp; Disputes</h2>
            <p>
              If you do not recognise a charge from <strong className="text-white">DODO* FLOWFORGES</strong> on
              your statement, or believe a charge is incorrect, please contact us first:
            </p>
            <p className="mt-3">
              Email: <a href="mailto:support@flow-forges.com" className="text-[#00d4ff] hover:underline">support@flow-forges.com</a>{" "}
              — we respond within 1 business day and can resolve most issues quickly.
            </p>
            <p className="mt-3">
              Filing a chargeback without contacting us first may delay resolution and result in temporary
              account suspension while the dispute is investigated. We maintain complete and timestamped
              transaction records and will cooperate fully with your card issuer.
            </p>
          </section>

          {/* 9 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">9. Contact</h2>
            <p>
              <strong className="text-white">FlowForges</strong> (operated by AKS Forge Lab)<br />
              Bhilai, Chhattisgarh 490023, India<br />
              GSTIN: 22MGSPS6643B1ZY<br /><br />
              Billing support:{" "}
              <a href="mailto:support@flow-forges.com" className="text-[#00d4ff] hover:underline">support@flow-forges.com</a><br />
              Phone:{" "}
              <a href="tel:+919630755104" className="text-[#00d4ff] hover:underline">+91 9630755104</a>
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
