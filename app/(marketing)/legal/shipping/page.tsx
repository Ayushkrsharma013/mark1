import type { Metadata } from "next";
import { AsciiBackground } from "@/components/ui/AsciiBackground";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Delivery Policy",
  description: "How FlowForges delivers its digital AI services — instant access, setup timelines, onboarding, and custom project delivery.",
};

export default function ShippingPage() {
  return (
    <div className="pt-24 pb-16 px-6">
      <div className="relative overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.04)] bg-[rgba(255,255,255,0.01)] p-8 md:p-12 mb-10">
        <AsciiBackground mode="legal" className="absolute inset-0 w-full h-full opacity-40" />
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-white">Delivery Policy</h1>
          <p className="text-sm text-[#71717a] mt-2">Last updated: 2026-06-03 &nbsp;·&nbsp; Effective: 2026-06-03</p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl">
        <div className="mt-10 space-y-10 text-[#a1a1aa] leading-relaxed">

          <p>
            FlowForges provides software-as-a-service (SaaS) and AI-powered digital products and services
            exclusively. <strong className="text-white">No physical goods are sold, shipped, or delivered.</strong>{" "}
            There are no shipping charges, courier services, or physical tracking numbers associated with
            any FlowForges purchase. This policy describes how we deliver our digital services.
          </p>

          {/* 1 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Digital Delivery — General</h2>
            <p>
              All FlowForges products and services are delivered electronically. Upon completing
              a purchase, you will receive an order confirmation from Paddle (our payment processor) to
              your registered email address. Access and onboarding instructions from FlowForges will
              follow separately as described below.
            </p>
          </section>

          {/* 2 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Productized AI Agents</h2>

            <h3 className="text-base font-semibold text-white mb-2 mt-3">Prospecting OS</h3>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li><strong className="text-white">Platform access:</strong> Granted within 2 hours of payment confirmation. You will receive login credentials or an invite to <em>app.flow-forges.com</em>.</li>
              <li><strong className="text-white">Setup / onboarding:</strong> Our team will contact you within 1 business day to schedule your ICP configuration session. Full setup (including Slack/Telegram integration and first lead run) is completed within <strong className="text-white">3–5 business days</strong> of your setup session.</li>
              <li><strong className="text-white">First results:</strong> First automated lead batch delivered to your configured destination within 24 hours of setup completion.</li>
            </ul>

            <h3 className="text-base font-semibold text-white mb-2">Remi — Missed Call Recovery</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong className="text-white">Phone number provisioning:</strong> A dedicated US phone number is provisioned within 1 business day of payment. You will receive the number via email.</li>
              <li><strong className="text-white">Full configuration:</strong> Twilio integration, call forwarding setup, SMS response scripts, and Cal.com booking link configuration are completed within <strong className="text-white">3–5 business days</strong>.</li>
              <li><strong className="text-white">Go-live confirmation:</strong> We conduct a live test with you before marking setup complete. You will receive written confirmation when Remi is live.</li>
            </ul>
          </section>

          {/* 3 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. Custom AI Development &amp; Consulting</h2>
            <p className="mb-3">
              For bespoke AI agents, workflow automation builds, and consulting engagements, delivery
              timelines are agreed upon in writing (email or Statement of Work) before project commencement.
              Typical timelines:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong className="text-white">AI Strategy &amp; Consulting:</strong> Deliverable report within 2–3 weeks of kickoff call.</li>
              <li><strong className="text-white">AI Agent / Chatbot:</strong> 3–4 weeks from requirements sign-off.</li>
              <li><strong className="text-white">Workflow Automation:</strong> 4–6 weeks from requirements sign-off.</li>
              <li><strong className="text-white">Custom AI Development:</strong> 6–8 weeks; phased delivery with milestone sign-offs.</li>
              <li><strong className="text-white">AI Analytics Dashboard:</strong> 3–5 weeks from data access grant.</li>
            </ul>
            <p className="mt-3">
              All timelines are subject to timely provision of required access, credentials, and feedback
              by the client. Delays caused by the client will extend delivery timelines proportionally and
              are not grounds for a refund.
            </p>
          </section>

          {/* 4 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Delivery Communications</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>All delivery communications are sent to the email address registered at checkout. Ensure this address is accurate and monitored.</li>
              <li>Check your spam/junk folder if you do not receive our onboarding email within 24 hours of purchase.</li>
              <li>For Prospecting OS, lead reports and agent logs are also accessible in real time via your dashboard at <em>app.flow-forges.com/prospecting-os</em>.</li>
              <li>You can request a status update on your setup at any time by emailing <a href="mailto:support@flow-forges.com" className="text-[#00d4ff] hover:underline">support@flow-forges.com</a>.</li>
            </ul>
          </section>

          {/* 5 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. Delays &amp; Failed Delivery</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                If we fail to begin onboarding within <strong className="text-white">3 business days</strong> of
                payment (unless otherwise agreed), please contact us immediately at the details below.
              </li>
              <li>
                If setup cannot be completed within twice the stated timeline through no fault of yours,
                you are entitled to a full setup fee refund.
              </li>
              <li>
                Delays caused by third-party services (Twilio number provisioning, Cal.com API, etc.)
                beyond our control will be communicated to you promptly, with revised estimates.
              </li>
            </ul>
          </section>

          {/* 6 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">6. Post-Launch Support</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>All productized agents (Prospecting OS, Remi) include ongoing support as part of your monthly subscription.</li>
              <li>All custom development engagements include <strong className="text-white">30 days of post-launch support</strong> covering bug fixes, minor adjustments, and troubleshooting.</li>
              <li>Ongoing retainers (from $2,000/month) are available for continued development and optimization after the support period.</li>
            </ul>
          </section>

          {/* 7 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">7. Contact</h2>
            <p>
              For delivery enquiries, onboarding questions, or access issues:<br />
              Email:{" "}
              <a href="mailto:support@flow-forges.com" className="text-[#00d4ff] hover:underline">
                support@flow-forges.com
              </a><br />
              Phone:{" "}
              <a href="tel:+919630755104" className="text-[#00d4ff] hover:underline">
                +91 9630755104
              </a><br />
              Response time: within 1 business day (Mon–Fri, IST).
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
