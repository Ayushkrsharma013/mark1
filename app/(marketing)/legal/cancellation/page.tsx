import type { Metadata } from "next";
import { AsciiBackground } from "@/components/ui/AsciiBackground";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Cancellation Policy",
  description: "How to cancel your FlowForges subscription — step-by-step process, access, data retention, and reactivation.",
};

export default function CancellationPage() {
  return (
    <div className="pt-24 pb-16 px-6">
      <div className="relative overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.04)] bg-[rgba(255,255,255,0.01)] p-8 md:p-12 mb-10">
        <AsciiBackground mode="legal" className="absolute inset-0 w-full h-full opacity-40" />
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-white">Cancellation Policy</h1>
          <p className="text-sm text-[#71717a] mt-2">Last updated: 2026-06-03 &nbsp;·&nbsp; Effective: 2026-06-03</p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl">
        <div className="mt-10 space-y-10 text-[#a1a1aa] leading-relaxed">

          <p>
            You may cancel your FlowForges subscription at any time. There are no long-term contracts,
            no cancellation fees, and no penalties. This policy explains how cancellation works and what
            happens to your account and data afterwards.
          </p>

          {/* 1 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. How to Cancel</h2>
            <p className="mb-3">You have three ways to cancel:</p>
            <ol className="list-decimal pl-5 space-y-3">
              <li>
                <strong className="text-white">Self-service (recommended):</strong> Log in to your
                account → Dashboard → Settings → Billing → click &ldquo;Cancel Subscription&rdquo;.
                You will receive an email confirmation immediately.
              </li>
              <li>
                <strong className="text-white">Email:</strong> Send a cancellation request to{" "}
                <a href="mailto:support@flow-forges.com" className="text-[#00d4ff] hover:underline">support@flow-forges.com</a>{" "}
                with your account email and subscription name. We will process it within 1 business day
                and confirm via email.
              </li>
              <li>
                <strong className="text-white">Via Paddle:</strong> Access your subscription management
                link (included in every Paddle receipt email) to cancel directly through Paddle&apos;s portal.
              </li>
            </ol>
            <p className="mt-3">
              Cancellation takes effect at the end of your current billing period. No further charges
              will be applied after confirmation of cancellation.
            </p>
          </section>

          {/* 2 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Access After Cancellation</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Your access to all paid features continues <strong className="text-white">uninterrupted</strong> until
                the end of the billing period you have already paid for.
              </li>
              <li>
                After the billing period ends:
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li><strong className="text-white">Prospecting OS:</strong> Your dashboard becomes read-only. New lead scraping stops. You retain access to view existing lead data for 14 days, then data is archived.</li>
                  <li><strong className="text-white">Remi:</strong> The AI agent stops responding to missed calls immediately upon subscription expiry. The provisioned phone number is held for 14 days before deprovisioning.</li>
                </ul>
              </li>
              <li>You will lose access to premium support, active agent operations, and new feature updates.</li>
            </ul>
          </section>

          {/* 3 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. Data After Cancellation</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-white">Data Export:</strong> Before cancellation takes effect,
                you may export your lead data, conversation logs, and reports from your dashboard.
                We strongly recommend doing this before your billing period ends.
              </li>
              <li>
                <strong className="text-white">Retention Period:</strong> After your subscription ends,
                we retain your account data for <strong className="text-white">90 days</strong> before
                permanent deletion, to enable easy reactivation.
              </li>
              <li>
                <strong className="text-white">Transaction Records:</strong> Billing records are retained
                for 7 years as required by Indian tax law (GST Act), regardless of account status.
              </li>
              <li>
                <strong className="text-white">Deletion Request:</strong> You may request immediate
                deletion of all personal data (subject to legal retention obligations) by emailing{" "}
                <a href="mailto:privacy@flow-forges.com" className="text-[#00d4ff] hover:underline">privacy@flow-forges.com</a>.
              </li>
            </ul>
          </section>

          {/* 4 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Refunds on Cancellation</h2>
            <p>
              Cancellation stops future charges but does not trigger a refund for the current billing
              period. We do not offer pro-rata refunds for unused days within a billing period, except in
              the specific circumstances outlined in our{" "}
              <a href="/legal/refund" className="text-[#00d4ff] hover:underline">Refund Policy</a>.
            </p>
          </section>

          {/* 5 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. Reactivation</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                You may reactivate your subscription at any time within the 90-day retention window.
                Log in to your account and select a plan. Your historical data (leads, settings) will
                be restored automatically.
              </li>
              <li>
                Reactivation after the 90-day window requires a new setup fee as all data will have
                been deleted and the agent will need to be reconfigured.
              </li>
              <li>
                For Remi, if the phone number has been deprovisioned, a new number will be assigned
                (subject to availability) and a new setup fee applies.
              </li>
            </ul>
          </section>

          {/* 6 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">6. Price Changes &amp; Plan Changes</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                If we increase subscription pricing, we will give at least <strong className="text-white">30 days&apos; written notice</strong> via
                email before the new price applies to your account.
              </li>
              <li>
                You may downgrade, upgrade, or switch plans at any time. Upgrades take effect immediately;
                the new pricing applies from the next billing cycle.
              </li>
              <li>
                If you cancel within 30 days of a material price increase, you may be eligible for a
                pro-rata refund of the remaining subscription period — see our Refund Policy.
              </li>
            </ul>
          </section>

          {/* 7 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">7. FlowForges-Initiated Termination</h2>
            <p>
              In cases of Terms of Service violation, non-payment (after retry attempts), illegal activity,
              or serious misuse, FlowForges may terminate your account without advance notice. In such cases,
              we will provide written explanation via email. You may appeal the decision within 14 days by
              emailing <a href="mailto:support@flow-forges.com" className="text-[#00d4ff] hover:underline">support@flow-forges.com</a>.
            </p>
          </section>

          {/* 8 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">8. Contact</h2>
            <p>
              Cancellation enquiries or assistance:<br />
              Email:{" "}
              <a href="mailto:support@flow-forges.com" className="text-[#00d4ff] hover:underline">
                support@flow-forges.com
              </a><br />
              Phone:{" "}
              <a href="tel:+919630755104" className="text-[#00d4ff] hover:underline">
                +91 9630755104
              </a><br />
              Response within 1 business day.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
