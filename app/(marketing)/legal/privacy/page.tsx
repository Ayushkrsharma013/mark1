import type { Metadata } from "next";
import { AsciiBackground } from "@/components/ui/AsciiBackground";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Flow-Forges collects, uses, discloses, and protects your personal data.",
};

export default function PrivacyPage() {
  return (
    <div className="pt-24 pb-16 px-6">
      <div className="relative overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.04)] bg-[rgba(255,255,255,0.01)] p-8 md:p-12 mb-10">
        <AsciiBackground
          mode="legal"
          className="absolute inset-0 w-full h-full opacity-40"
        />
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-white">Privacy Policy</h1>
          <p className="text-sm text-[#71717a] mt-2">
            Last updated: 2025-08-15
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl">
        <div className="mt-10 space-y-10 text-[#a1a1aa] leading-relaxed">
          <p>
            This Privacy Policy explains how FlowForges (operated by AKS Forge Lab)
            (&ldquo;FlowForges&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;)
            collects, uses, discloses, and protects personal information when
            you use our website https://flow-forges.com, applications, and
            services (collectively, the &ldquo;Services&rdquo;).
          </p>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              1. Information We Collect
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-white">
                  Account &amp; Contact Data:
                </strong>{" "}
                name, email, phone number, company name, profile information,
                and billing address.
              </li>
              <li>
                <strong className="text-white">Usage Data:</strong> log files,
                device identifiers, IP address, browser type and version,
                operating system, pages viewed, timestamps, and referring URLs.
              </li>
              <li>
                <strong className="text-white">Payment Data:</strong> handled
                exclusively by our PCI-DSS compliant payment processors (e.g.,
                Stripe, Razorpay). We store limited metadata (last four digits
                of card, card brand, expiry date) but never full card numbers.
              </li>
              <li>
                <strong className="text-white">Integrations:</strong> if you
                connect third-party services (e.g., Notion, Google, CRM
                platforms), we store the access tokens and metadata necessary to
                operate those features.
              </li>
              <li>
                <strong className="text-white">User Content:</strong> inputs,
                files, prompts, messages, and outputs you submit to or generate
                through the Services.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              2. How We Use Information
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Provide, secure, maintain, and improve the Services.</li>
              <li>
                Authenticate users, prevent fraud, enforce our terms, and comply
                with applicable law.
              </li>
              <li>
                Process transactions, subscriptions, invoices, and customer
                support requests.
              </li>
              <li>
                Personalize features, recommendations, and communications.
              </li>
              <li>
                Analyze usage patterns to develop new features and improve
                performance.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              3. Sharing &amp; Disclosure
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-white">Vendors / Processors:</strong> we
                engage third-party providers for hosting, cloud storage,
                analytics, customer support, payment processing, and email
                delivery. These providers are contractually bound to process
                data only on our instructions.
              </li>
              <li>
                <strong className="text-white">Legal:</strong> we may disclose
                information to comply with applicable law, lawful requests from
                public authorities, or to protect and defend our rights.
              </li>
              <li>
                <strong className="text-white">Business Transfers:</strong> in
                the event of a merger, acquisition, financing, or sale of
                assets, personal data may be transferred as part of the
                transaction. Users will be notified before their data becomes
                subject to a different privacy policy.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              4. International Data Transfers
            </h2>
            <p>
              We may process data in locations outside your country of
              residence. Where required by law, we implement appropriate
              safeguards such as standard contractual clauses to ensure your
              data remains protected.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              5. Data Retention
            </h2>
            <p>
              We retain personal data only for as long as necessary to fulfill
              the purposes described in this policy or as required by applicable
              law. You may request deletion of your data at any time, subject to
              legal or contractual obligations that require us to retain certain
              information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              6. Your Rights
            </h2>
            <p>
              Depending on your jurisdiction, you may have the right to access,
              correct, delete, or port your personal data, and to object to or
              restrict certain processing activities. To exercise any of these
              rights, contact us at{" "}
              <a
                href="mailto:privacy@flow-forges.com"
                className="text-[#00d4ff] hover:underline"
              >
                privacy@flow-forges.com
              </a>
              . We will respond within 30 days.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              7. Children&apos;s Privacy
            </h2>
            <p>
              The Services are not directed to children under the age of 16, and
              we do not knowingly collect personal information from children. If
              we become aware that a child under 16 has provided us with
              personal data, we will take steps to delete it.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              8. Security
            </h2>
            <p>
              We implement administrative, technical, and physical safeguards to
              protect your data. However, no method of electronic transmission
              or storage is 100% secure, and we cannot guarantee absolute
              security.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              9. Contact
            </h2>
            <p>
              FlowForges (operated by AKS Forge Lab)
              <br />
              Raipur, Chhattisgarh, India
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
                href="tel:+919630798404"
                className="text-[#00d4ff] hover:underline"
              >
                +91 9630798404
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
