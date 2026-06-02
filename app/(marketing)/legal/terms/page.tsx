import type { Metadata } from "next";
import { AsciiBackground } from "@/components/ui/AsciiBackground";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms and conditions governing the use of Flow-Forges services and website.",
};

export default function TermsPage() {
  return (
    <div className="pt-24 pb-16 px-6">
      <div className="relative overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.04)] bg-[rgba(255,255,255,0.01)] p-8 md:p-12 mb-10">
        <AsciiBackground
          mode="legal"
          className="absolute inset-0 w-full h-full opacity-40"
        />
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-white">Terms of Service</h1>
          <p className="text-sm text-[#71717a] mt-2">
            Last updated: 2025-08-15
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl">
        <div className="mt-10 space-y-10 text-[#a1a1aa] leading-relaxed">
          <p>
            These Terms of Service (&ldquo;Terms&rdquo;) govern your access to
            and use of the website, applications, and services (collectively,
            the &ldquo;Services&rdquo;) provided by FlowForges (operated by AKS Forge Lab)
            (&ldquo;FlowForges&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;). By
            accessing or using the Services, you agree to be bound by these
            Terms. If you do not agree, do not use the Services.
          </p>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              1. Accounts
            </h2>
            <p>
              You are responsible for maintaining the confidentiality of your
              account credentials and for all activity that occurs under your
              account. You must provide accurate, current, and complete
              information when creating an account. Notify us immediately of any
              unauthorized use or security breach.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              2. Acceptable Use
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                No unlawful, infringing, harmful, fraudulent, or abusive
                activities.
              </li>
              <li>
                No attempts to access, probe, scan, or interfere with systems,
                accounts, or networks you do not own or control.
              </li>
              <li>
                No reverse engineering, scraping beyond rate limits, or
                circumventing security or access controls.
              </li>
              <li>
                No uploading or transmitting content that violates the rights of
                others or applicable law.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              3. Subscriptions &amp; Billing
            </h2>
            <p>
              Paid plans automatically renew at the end of each billing period
              unless cancelled. Fees are charged in Indian Rupees (INR).
              Applicable taxes (including GST) may be added to the stated price.
              By subscribing, you authorize our payment processor (e.g., Stripe
              or Paddle) to charge your designated payment method for all
              amounts due.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              4. Credits &amp; Usage Quotas
            </h2>
            <p>
              Certain features may operate on a credit or usage-quota basis.
              Unused credits may expire after the period stated at the time of
              purchase. Credits are not legal tender, hold no cash value outside
              the Services, and are non-refundable except as required by
              applicable law or as stated in our Refund Policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              5. Intellectual Property
            </h2>
            <p>
              We own all rights, title, and interest in and to the Services,
              including all software, algorithms, designs, branding, and
              documentation. You retain ownership of content you submit or
              generate through the Services (&ldquo;User Content&rdquo;). Where
              AI models are used, you are solely responsible for reviewing
              outputs and ensuring they meet your legal, regulatory, and
              business compliance requirements.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              6. Feedback
            </h2>
            <p>
              Any feedback, suggestions, or ideas you provide about the Services
              are voluntary. We may use them for any purpose without obligation,
              compensation, or restriction.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              7. Third-Party Services
            </h2>
            <p>
              The Services may integrate with or link to third-party platforms
              (e.g., payment processors, cloud providers, APIs). We do not
              control and are not responsible for the availability, content, or
              practices of third-party services. Use of such services is at your
              own risk and governed by their respective terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              8. Disclaimers
            </h2>
            <p>
              The Services are provided on an &ldquo;as is&rdquo; and &ldquo;as
              available&rdquo; basis. We do not warrant that the Services will
              be uninterrupted, error-free, or secure. AI-generated outputs are
              probabilistic and may require human review before use in
              consequential contexts.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              9. Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted by applicable law, FlowForges (operated by AKS Forge Lab)
              shall not be liable for any indirect, incidental, special,
              consequential, or punitive damages, or any loss of profits,
              revenue, or data, whether in contract, tort (including
              negligence), or otherwise. Our aggregate liability for all claims
              arising out of or relating to these Terms or the Services shall
              not exceed the amounts paid by you to FlowForges (operated by AKS Forge Lab) during the three
              (3) months immediately preceding the event giving rise to the
              claim.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              10. Termination
            </h2>
            <p>
              We may suspend or terminate your account and access to the
              Services at any time for violation of these Terms, with or without
              prior notice. You may cancel your account at any time through your
              account settings. Upon termination, your right to access the
              Services ceases immediately.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              11. Governing Law &amp; Jurisdiction
            </h2>
            <p>
              These Terms shall be governed by and construed in accordance with
              the laws of India. Any disputes arising out of or relating to
              these Terms shall be subject to the exclusive jurisdiction of the
              courts in Raipur, Chhattisgarh 490023, India, unless mandatory
              provisions of your local law provide otherwise.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              12. Changes to These Terms
            </h2>
            <p>
              We may update these Terms from time to time. Material changes will
              be communicated via email or through a notice within the Services.
              Continued use of the Services after the effective date constitutes
              acceptance of the revised Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              13. Contact
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
