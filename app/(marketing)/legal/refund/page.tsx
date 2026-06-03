import type { Metadata } from "next";
import { AsciiBackground } from "@/components/ui/AsciiBackground";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "FlowForges refund terms for subscriptions, setup fees, and one-time purchases — clear, fair, and transparent.",
};

export default function RefundPage() {
  return (
    <div className="pt-24 pb-16 px-6">
      <div className="relative overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.04)] bg-[rgba(255,255,255,0.01)] p-8 md:p-12 mb-10">
        <AsciiBackground mode="legal" className="absolute inset-0 w-full h-full opacity-40" />
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-white">Refund Policy</h1>
          <p className="text-sm text-[#71717a] mt-2">Last updated: 2026-06-03 &nbsp;·&nbsp; Effective: 2026-06-03</p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl">
        <div className="mt-10 space-y-10 text-[#a1a1aa] leading-relaxed">

          <p>
            FlowForges aims to be fair and transparent with its billing practices. This Refund Policy
            applies to all purchases made through our website at <em>flow-forges.com</em>, processed via
            Dodo Payments as our Merchant of Record. By purchasing, you accept this policy.
          </p>

          {/* 1 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Setup Fees (One-Time Charges)</h2>
            <p className="mb-3">
              Setup fees cover the human labour, infrastructure provisioning, phone number acquisition,
              third-party integration costs, and configuration work performed by our team.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-white">Before onboarding commences:</strong> If you request a refund
                within <strong className="text-white">48 hours</strong> of purchase and before any setup work has
                started, we will issue a full refund of the setup fee.
              </li>
              <li>
                <strong className="text-white">After onboarding commences:</strong> Once setup work has begun
                (we will notify you when this happens), setup fees are non-refundable. You will receive the
                configured product as agreed.
              </li>
              <li>
                <strong className="text-white">If we fail to deliver:</strong> If FlowForges is unable to
                complete the agreed setup within a reasonable timeframe through no fault of yours, you are
                entitled to a full setup fee refund.
              </li>
            </ul>
          </section>

          {/* 2 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Monthly Subscriptions</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Subscription fees are charged at the start of each billing period and cover access to the
                Services for that period.
              </li>
              <li>
                You may cancel your subscription at any time. Cancellation takes effect at the end of the
                current paid billing period — you will not be charged again after cancellation.
              </li>
              <li>
                We do <strong className="text-white">not</strong> issue refunds or credits for partial billing
                periods already charged, except in the circumstances described in Section 4 below.
              </li>
              <li>
                There are no long-term commitments. Subscriptions are month-to-month and can be cancelled
                at any time without penalty.
              </li>
            </ul>
          </section>

          {/* 3 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. EU / UK Consumer Right of Withdrawal</h2>
            <p>
              If you are a consumer in the European Union or United Kingdom, you have a statutory right
              to withdraw from a digital service contract within <strong className="text-white">14 calendar days</strong> of
              purchase (the &ldquo;cooling-off period&rdquo;) under the EU Consumer Rights Directive and
              UK Consumer Contracts Regulations.
            </p>
            <p className="mt-3">
              <strong className="text-white">Important:</strong> By requesting that FlowForges commence
              service delivery (setup work, phone number provisioning, or granting platform access) before
              the 14-day cooling-off period expires, you expressly consent to early provision of the service
              and acknowledge that your right of withdrawal is lost upon such commencement. This consent is
              confirmed in your order confirmation email.
            </p>
            <p className="mt-3">
              If you do not consent to early commencement, please contact us within 14 days and we will
              delay setup accordingly. You may then exercise your right of withdrawal within the 14-day period.
            </p>
          </section>

          {/* 4 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Grounds for Exceptional Refunds</h2>
            <p className="mb-3">
              We may issue a refund or service credit at our discretion in the following circumstances:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-white">Service Failure:</strong> Extended service unavailability
                (&gt;48 consecutive hours) caused by FlowForges infrastructure failure (not third-party
                outages). Credit issued: 1 day&apos;s subscription per 24 hours of downtime beyond the first 48 hours.
              </li>
              <li>
                <strong className="text-white">Billing Error:</strong> Duplicate charge, incorrect amount,
                or charge after confirmed cancellation. Full refund of the erroneous charge.
              </li>
              <li>
                <strong className="text-white">Failed Delivery:</strong> We are unable to configure or
                deliver the agreed product features. Full setup fee refund.
              </li>
              <li>
                <strong className="text-white">Material Change:</strong> If we materially change the core
                features of a product you are subscribed to in a way that significantly reduces its value,
                and you cancel within 30 days of the change notice, we will issue a pro-rata refund of the
                remaining subscription period.
              </li>
            </ul>
          </section>

          {/* 5 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. How to Request a Refund</h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                Email <a href="mailto:support@flow-forges.com" className="text-[#00d4ff] hover:underline">support@flow-forges.com</a> with
                subject: &ldquo;Refund Request — [your email / order ID]&rdquo;.
              </li>
              <li>Include your order ID (found in your Dodo Payments receipt email), the reason for the request, and any supporting information.</li>
              <li>We will acknowledge your request within <strong className="text-white">1 business day</strong> and
                resolve it within <strong className="text-white">5 business days</strong>.</li>
              <li>Approved refunds are processed back to the original payment method by Dodo Payments within
                <strong className="text-white"> 5–10 business days</strong>, depending on your bank or card issuer.</li>
            </ol>
          </section>

          {/* 6 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">6. Chargebacks</h2>
            <p>
              We strongly encourage you to contact us before initiating a chargeback or payment dispute
              with your card issuer. We will work quickly to resolve any genuine billing issue directly.
              Chargebacks filed without prior contact may result in immediate account suspension while the
              dispute is investigated. We maintain complete transaction records and will cooperate fully
              with your card issuer in any legitimate dispute.
            </p>
          </section>

          {/* 7 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">7. Custom Service Engagements</h2>
            <p>
              For bespoke AI development projects, workflow automation, and consulting engagements,
              refund terms are governed by the specific Statement of Work or project agreement signed
              between FlowForges and the client. In the absence of a written agreement, this Refund
              Policy applies. Milestone-based projects: completed milestones are non-refundable;
              uncompleted milestones will be refunded.
            </p>
          </section>

          {/* 8 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">8. Contact</h2>
            <p>
              For billing assistance or refund enquiries:<br />
              Email:{" "}
              <a href="mailto:support@flow-forges.com" className="text-[#00d4ff] hover:underline">
                support@flow-forges.com
              </a><br />
              Phone:{" "}
              <a href="tel:+919630755104" className="text-[#00d4ff] hover:underline">
                +91 9630755104
              </a><br />
              Response time: within 1 business day. Refund decisions within 5 business days.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
