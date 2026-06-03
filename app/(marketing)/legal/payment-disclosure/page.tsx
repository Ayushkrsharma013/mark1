import type { Metadata } from "next";
import { AsciiBackground } from "@/components/ui/AsciiBackground";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Payment Disclosure",
  description: "Payment methods, Paddle as Merchant of Record, taxes, billing security, and recurring billing authorisation for FlowForges.",
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
            <h2 className="text-xl font-semibold text-white mb-3">1. Merchant of Record — Paddle</h2>
            <p className="mb-3">
              All payments for FlowForges products and subscriptions are processed by{" "}
              <strong className="text-white">Paddle.com Market Limited</strong> (&ldquo;Paddle&rdquo;),
              a company registered in Ireland (Company No. 645396), acting as our
              <strong className="text-white"> Merchant of Record</strong>.
            </p>
            <p className="mb-3">
              As Merchant of Record, Paddle is the legally responsible seller for your purchase. This means:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Paddle&apos;s name appears on your bank or card statement as <strong className="text-white">&ldquo;PADDLE.NET* FLOWFORGES&rdquo;</strong>.</li>
              <li>Paddle handles all payment processing, tax collection, and regulatory compliance on a global basis.</li>
              <li>Paddle issues your receipt and VAT/GST invoice where applicable.</li>
              <li>Disputes with Paddle regarding payment processing can be directed to <a href="https://www.paddle.com" className="text-[#00d4ff] hover:underline" target="_blank" rel="noopener noreferrer">paddle.com</a>.</li>
            </ul>
            <p className="mt-3">
              Paddle&apos;s terms of service and privacy policy apply to the payment transaction itself.
              FlowForges&apos;s Terms of Service govern your use of our software and services.
            </p>
          </section>

          {/* 2 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Accepted Payment Methods</h2>
            <p className="mb-3">Via Paddle, we accept the following for international customers:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong className="text-white">Credit / Debit Cards:</strong> Visa, Mastercard, American Express, Discover, Maestro.</li>
              <li><strong className="text-white">PayPal</strong></li>
              <li><strong className="text-white">Apple Pay</strong> (on supported devices and browsers)</li>
              <li><strong className="text-white">Google Pay</strong> (on supported devices and browsers)</li>
            </ul>
            <p className="mt-3 mb-3">For Indian customers, additional methods are available:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong className="text-white">UPI</strong> (Unified Payments Interface)</li>
              <li><strong className="text-white">Net Banking</strong></li>
            </ul>
            <p className="mt-3">
              Payment method availability may vary by country. Paddle will display the available options
              at checkout based on your location.
            </p>
          </section>

          {/* 3 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. Currency</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-white">International customers</strong> (US, UK, EU, AU, and others):
                All prices are listed and charged in <strong className="text-white">USD</strong>.
              </li>
              <li>
                <strong className="text-white">Indian customers:</strong> Prices may be displayed and charged
                in INR. Paddle handles the conversion and ensures compliance with the Foreign Exchange
                Management Act (FEMA) and RBI guidelines.
              </li>
              <li>
                Currency conversion is handled by Paddle. The exchange rate applied is Paddle&apos;s rate
                at the time of transaction. FlowForges does not add a currency conversion surcharge.
              </li>
            </ul>
          </section>

          {/* 4 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Taxes &amp; VAT / GST</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-white">EU customers:</strong> VAT is collected by Paddle at the
                applicable rate for your country. Paddle is registered for VAT across the EU.
              </li>
              <li>
                <strong className="text-white">UK customers:</strong> UK VAT (20%) is collected by Paddle
                where applicable. Paddle is registered with HMRC.
              </li>
              <li>
                <strong className="text-white">Australian customers:</strong> GST (10%) is collected by
                Paddle where applicable.
              </li>
              <li>
                <strong className="text-white">US customers:</strong> Sales tax is collected where required
                by state law, calculated by Paddle automatically.
              </li>
              <li>
                <strong className="text-white">Indian customers:</strong> 18% GST is applicable on SaaS
                services. Our GSTIN is <strong className="text-white">22MGSPS6643B1ZY</strong>.
                Tax invoices are issued by Paddle on our behalf.
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
              By subscribing to a FlowForges plan and completing checkout, you authorise Paddle (as our
              Merchant of Record) to charge your selected payment method on a recurring monthly basis at
              the price displayed at checkout, until you cancel your subscription. Key terms:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>Charges occur at the start of each billing period (monthly).</li>
              <li>You will receive a receipt email from Paddle for each successful charge.</li>
              <li>If a payment fails, Paddle will retry up to three times over seven days before suspending access.</li>
              <li>You may cancel recurring billing at any time — see our <a href="/legal/cancellation" className="text-[#00d4ff] hover:underline">Cancellation Policy</a>.</li>
              <li>Price changes will be communicated with at least 30 days&apos; notice before taking effect on your subscription.</li>
            </ul>
          </section>

          {/* 6 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">6. Payment Security</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Paddle is certified as <strong className="text-white">PCI-DSS Level 1</strong> compliant —
                the highest level of payment card industry security standard.
              </li>
              <li>
                FlowForges does <strong className="text-white">not</strong> store, process, or transmit your
                card number, CVV, or full payment credentials on our servers.
              </li>
              <li>
                All checkout pages are served over TLS 1.3 (HTTPS). Payment data is tokenised by Paddle
                before any interaction with our systems.
              </li>
              <li>
                3D Secure authentication (3DS2) is used where required by your card issuer or applicable regulation (including PSD2 in Europe).
              </li>
            </ul>
          </section>

          {/* 7 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">7. Chargebacks &amp; Disputes</h2>
            <p>
              If you do not recognise a charge from <strong className="text-white">PADDLE.NET* FLOWFORGES</strong> on
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

          {/* 8 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">8. Contact</h2>
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
