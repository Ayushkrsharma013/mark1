import type { Metadata } from "next";
import { AsciiBackground } from "@/components/ui/AsciiBackground";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How FlowForges collects, uses, and protects your data.",
};

export default function PrivacyPage() {
  return (
    <div className="pt-24 pb-16 px-6">
      <div className="relative overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.04)] bg-[rgba(255,255,255,0.01)] p-8 md:p-12 mb-10">
        <AsciiBackground mode="legal" className="absolute inset-0 w-full h-full opacity-40" />
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-white">Privacy Policy</h1>
          <p className="text-sm text-[#71717a] mt-2">Last updated: May 2026</p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl">

        <div className="mt-10 space-y-10 text-[#a1a1aa] leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Information We Collect</h2>
            <p>
              We collect information you provide directly: name, email address,
              company name, and message content when you submit our contact form.
              We also collect standard server logs (IP address, browser type,
              timestamps) for security and debugging purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. How We Use Information</h2>
            <p>
              We use your information solely to respond to inquiries, provide our
              services, and improve our website. We never sell, rent, or share
              your personal data with third parties for their marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. Data Storage</h2>
            <p>
              Contact form submissions are processed through Resend (email
              delivery) and stored only in our email inbox. We do not maintain a
              separate database of visitor information. Server logs are retained
              for a maximum of 30 days.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Cookies</h2>
            <p>
              This website does not use tracking cookies or third-party analytics.
              Any cookies set are essential for site functionality (e.g., theme
              preference) and contain no personal information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. Your Rights</h2>
            <p>
              You may request access to, correction of, or deletion of your
              personal data by contacting us at hello@flowforges.com. We will
              respond within 30 days.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">6. Contact</h2>
            <p>
              For privacy-related questions, email us at hello@flowforges.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
