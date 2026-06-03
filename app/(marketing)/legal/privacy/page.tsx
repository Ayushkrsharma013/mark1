import type { Metadata } from "next";
import { AsciiBackground } from "@/components/ui/AsciiBackground";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How FlowForges collects, uses, stores, and protects your personal data — GDPR, CCPA, and India DPDP compliant.",
};

export default function PrivacyPage() {
  return (
    <div className="pt-24 pb-16 px-6">
      <div className="relative overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.04)] bg-[rgba(255,255,255,0.01)] p-8 md:p-12 mb-10">
        <AsciiBackground mode="legal" className="absolute inset-0 w-full h-full opacity-40" />
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-white">Privacy Policy</h1>
          <p className="text-sm text-[#71717a] mt-2">Last updated: 2026-06-03 &nbsp;·&nbsp; Effective: 2026-06-03</p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl">
        <div className="mt-10 space-y-10 text-[#a1a1aa] leading-relaxed">

          <p>
            This Privacy Policy describes how <strong className="text-white">FlowForges</strong> (operated by
            AKS Forge Lab, &ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) collects, uses, stores,
            and shares personal data when you visit <em>flow-forges.com</em> or use our Services. We are
            committed to protecting your privacy in compliance with India&apos;s Digital Personal Data
            Protection Act 2023 (&ldquo;DPDP Act&rdquo;), the EU General Data Protection Regulation
            (&ldquo;GDPR&rdquo;), the UK GDPR, and the California Consumer Privacy Act (&ldquo;CCPA&rdquo;),
            where applicable.
          </p>

          {/* 1 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Data We Collect</h2>

            <h3 className="text-base font-semibold text-white mb-2">1A. Information You Provide</h3>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li><strong className="text-white">Account Data:</strong> name, email address, phone number, company name, job title, and billing address when you register or purchase a plan.</li>
              <li><strong className="text-white">Communication Data:</strong> messages sent through our contact form, chatbot, support email, or booking system.</li>
              <li><strong className="text-white">Configuration Data:</strong> ICP (Ideal Customer Profile) settings, keyword targets, Slack/Telegram credentials, and other setup information you provide to configure our AI agents.</li>
            </ul>

            <h3 className="text-base font-semibold text-white mb-2">1B. Information Collected Automatically</h3>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li><strong className="text-white">Usage Data:</strong> pages visited, features used, session duration, click patterns, timestamps, and feature interactions.</li>
              <li><strong className="text-white">Technical Data:</strong> IP address, browser type and version, operating system, device type, screen resolution, and referring URL.</li>
              <li><strong className="text-white">Log Data:</strong> server access logs, error logs, API call logs, and performance metrics.</li>
            </ul>

            <h3 className="text-base font-semibold text-white mb-2">1C. Payment Data</h3>
            <p className="mb-4">
              All payment processing is handled exclusively by <strong className="text-white">Paddle</strong>,
              our PCI-DSS Level 1 certified Merchant of Record. FlowForges does not store, process, or transmit
              your card number, CVV, or full payment details. Paddle shares with us only transaction ID,
              subscription status, and billing email.
            </p>

            <h3 className="text-base font-semibold text-white mb-2">1D. Third-Party Integration Data</h3>
            <p>
              If you connect Slack, Telegram, CRM platforms, or calendar services, we receive access tokens
              and the metadata required to deliver the integration. These tokens are encrypted at rest.
            </p>
          </section>

          {/* 2 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Cookies &amp; Tracking</h2>
            <p className="mb-3">We use the following types of cookies and similar technologies:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong className="text-white">Strictly Necessary:</strong> Session management, authentication tokens, and CSRF protection. Required for the Services to function. Cannot be disabled.</li>
              <li><strong className="text-white">Functional:</strong> Remember your preferences (theme, language, dashboard layout). Disabled by default for EU/UK visitors; consent required.</li>
              <li><strong className="text-white">Analytics:</strong> Aggregate, anonymised usage data to improve the Services. No individual profiling. We do not use Google Analytics; we use privacy-preserving analytics only.</li>
            </ul>
            <p className="mt-3">
              You may manage cookie preferences through your browser settings. Disabling strictly necessary
              cookies will impair the functionality of the Services.
            </p>
          </section>

          {/* 3 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. Legal Bases for Processing (GDPR / UK GDPR)</h2>
            <p className="mb-3">Where GDPR or UK GDPR applies, we process your data under the following legal bases:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong className="text-white">Contract:</strong> Processing necessary to provide the Services you have purchased (account management, feature delivery, billing).</li>
              <li><strong className="text-white">Legitimate Interests:</strong> Fraud prevention, security monitoring, service improvement, and business communications. We balance these interests against your rights.</li>
              <li><strong className="text-white">Legal Obligation:</strong> Tax records, compliance with court orders, and regulatory requirements.</li>
              <li><strong className="text-white">Consent:</strong> Marketing emails and optional cookies. You may withdraw consent at any time without affecting prior processing.</li>
            </ul>
          </section>

          {/* 4 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. How We Use Your Data</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Provide, operate, maintain, and improve the Services.</li>
              <li>Process transactions, issue invoices, and manage your subscription.</li>
              <li>Send transactional emails (receipts, onboarding, feature updates, service alerts).</li>
              <li>Send marketing communications — only with your explicit consent, with an unsubscribe link in every email.</li>
              <li>Detect, prevent, and respond to fraud, abuse, or security incidents.</li>
              <li>Comply with legal obligations (tax, accounting, law enforcement).</li>
              <li>Aggregate and anonymise data for product analytics and improvement.</li>
            </ul>
            <p className="mt-3">
              We do <strong className="text-white">not</strong> sell your personal data to third parties.
              We do not use your data for automated decision-making that produces significant legal effects
              on you without human review.
            </p>
          </section>

          {/* 5 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. Data Sharing &amp; Processors</h2>
            <p className="mb-3">We share data only with trusted processors under contractual data-protection obligations:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong className="text-white">Paddle</strong> (Dublin, Ireland) — payment processing and tax compliance as Merchant of Record.</li>
              <li><strong className="text-white">Supabase</strong> (AWS ap-south-1, India) — database and authentication hosting.</li>
              <li><strong className="text-white">Vercel</strong> (US) — web application hosting and edge delivery.</li>
              <li><strong className="text-white">Resend</strong> (US) — transactional email delivery.</li>
              <li><strong className="text-white">Apify</strong> (Czech Republic) — public web data sourcing for Prospecting OS.</li>
              <li><strong className="text-white">Twilio</strong> (US) — SMS communications for Remi.</li>
              <li><strong className="text-white">Google</strong> (US) — AI model API (Gemini) for chat features.</li>
              <li><strong className="text-white">Anthropic</strong> (US) — AI model API (Claude) for message generation features.</li>
            </ul>
            <p className="mt-3">
              We may also disclose data if required by law, court order, or to protect the rights, property,
              or safety of FlowForges, our users, or the public.
            </p>
          </section>

          {/* 6 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">6. International Data Transfers</h2>
            <p>
              FlowForges is based in India. Some processors are located in the US, EU, or other jurisdictions.
              For transfers from the EEA/UK to third countries, we rely on Standard Contractual Clauses (SCCs)
              or the processor&apos;s adequacy certification. For transfers from India, we comply with the DPDP
              Act&apos;s cross-border transfer requirements. By using our Services, you acknowledge that your
              data may be processed in these jurisdictions.
            </p>
          </section>

          {/* 7 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">7. Data Retention</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong className="text-white">Account Data:</strong> retained for the duration of your subscription plus 3 years for legal and tax purposes.</li>
              <li><strong className="text-white">Transaction Records:</strong> retained for 7 years per Indian tax law (GST Act requirements).</li>
              <li><strong className="text-white">Lead Data (Prospecting OS):</strong> retained for the duration of your subscription. Exported data is your responsibility.</li>
              <li><strong className="text-white">SMS Conversation Logs (Remi):</strong> retained for 90 days, then automatically purged unless you request longer retention.</li>
              <li><strong className="text-white">Support Communications:</strong> retained for 2 years.</li>
              <li><strong className="text-white">Server Logs:</strong> retained for 90 days.</li>
            </ul>
          </section>

          {/* 8 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">8. Your Rights</h2>
            <p className="mb-3">Depending on your jurisdiction, you have the following rights:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong className="text-white">Access:</strong> Request a copy of personal data we hold about you.</li>
              <li><strong className="text-white">Correction:</strong> Request correction of inaccurate or incomplete data.</li>
              <li><strong className="text-white">Deletion:</strong> Request deletion of your personal data, subject to legal retention requirements.</li>
              <li><strong className="text-white">Portability:</strong> Receive your data in a structured, machine-readable format (GDPR/UK GDPR).</li>
              <li><strong className="text-white">Objection:</strong> Object to processing based on legitimate interests.</li>
              <li><strong className="text-white">Restriction:</strong> Request that we limit how we process your data in certain circumstances.</li>
              <li><strong className="text-white">Opt-out of Marketing:</strong> Unsubscribe from marketing emails at any time via the unsubscribe link or by emailing us.</li>
              <li><strong className="text-white">CCPA (California):</strong> Right to know, delete, and opt out of sale (we do not sell data). Verified requests will be honoured within 45 days.</li>
              <li><strong className="text-white">DPDP Act (India):</strong> Right to information, correction, erasure, and grievance redressal per the Digital Personal Data Protection Act 2023.</li>
            </ul>
            <p className="mt-3">
              To exercise any right, email <a href="mailto:privacy@flow-forges.com" className="text-[#00d4ff] hover:underline">privacy@flow-forges.com</a>.
              We will respond within <strong className="text-white">30 days</strong> (GDPR) or
              <strong className="text-white"> 45 days</strong> (CCPA). We may request identity verification before processing sensitive requests.
            </p>
          </section>

          {/* 9 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">9. Security</h2>
            <p>
              We implement industry-standard technical and organisational measures including:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>TLS 1.3 encryption in transit on all endpoints.</li>
              <li>AES-256 encryption at rest for sensitive data fields.</li>
              <li>Row-Level Security (RLS) policies on our Supabase database.</li>
              <li>Access controls and role-based permissions for staff.</li>
              <li>Regular security reviews and dependency audits.</li>
            </ul>
            <p className="mt-3">
              No method of transmission or storage is 100% secure. We cannot guarantee absolute security but
              will notify you without undue delay (and in any event within 72 hours for GDPR-covered
              breaches) if we become aware of a breach that materially affects your personal data.
            </p>
          </section>

          {/* 10 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">10. Children&apos;s Privacy</h2>
            <p>
              Our Services are not directed to or intended for use by individuals under 18. We do not
              knowingly collect personal data from children. If we discover we have collected data from
              a person under 18 without parental consent, we will delete it promptly.
            </p>
          </section>

          {/* 11 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">11. Changes to This Policy</h2>
            <p>
              We will notify you of material changes via email and/or a prominent notice on our website at
              least 14 days before the changes take effect. The &ldquo;Last updated&rdquo; date at the top
              of this page reflects the most recent revision.
            </p>
          </section>

          {/* 12 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">12. Contact &amp; Grievance Officer</h2>
            <p>
              <strong className="text-white">FlowForges</strong> (operated by AKS Forge Lab)<br />
              Bhilai, Chhattisgarh 490023, India<br />
              GSTIN: 22MGSPS6643B1ZY<br /><br />
              Privacy enquiries:{" "}
              <a href="mailto:privacy@flow-forges.com" className="text-[#00d4ff] hover:underline">privacy@flow-forges.com</a><br />
              General support:{" "}
              <a href="mailto:support@flow-forges.com" className="text-[#00d4ff] hover:underline">support@flow-forges.com</a><br />
              Phone:{" "}
              <a href="tel:+919630755104" className="text-[#00d4ff] hover:underline">+91 9630755104</a><br /><br />
              <em>EU/UK residents:</em> If you are not satisfied with our response, you have the right to
              lodge a complaint with your local data protection authority (e.g., ICO in the UK,
              your national DPA in the EU).
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
