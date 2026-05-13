import type { Metadata } from "next";
import { AsciiBackground } from "@/components/ui/AsciiBackground";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms and conditions for using FlowForges services and website.",
};

export default function TermsPage() {
  return (
    <div className="pt-24 pb-16 px-6">
      <div className="relative overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.04)] bg-[rgba(255,255,255,0.01)] p-8 md:p-12 mb-10">
        <AsciiBackground mode="legal" className="absolute inset-0 w-full h-full opacity-40" />
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-white">Terms of Service</h1>
          <p className="text-sm text-[#71717a] mt-2">Last updated: May 2026</p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl">

        <div className="mt-10 space-y-10 text-[#a1a1aa] leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the FlowForges website and services, you agree
              to be bound by these Terms of Service. If you do not agree, do not
              use our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Services</h2>
            <p>
              FlowForges provides AI automation consulting, custom development,
              and productized software services. The scope, deliverables, and
              pricing for each engagement are defined in a separate Statement of
              Work (SOW) agreed upon by both parties.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. Intellectual Property</h2>
            <p>
              Unless otherwise specified in the SOW, FlowForges retains ownership
              of all code, models, and methodologies developed during the
              engagement. The client receives a perpetual, worldwide license to
              use the deliverables for their business purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Payment Terms</h2>
            <p>
              Payment terms are defined in the SOW. Standard terms are 50%
              upfront, 50% on delivery. Late payments accrue interest at 1.5% per
              month. All fees are non-refundable unless otherwise stated.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. Limitation of Liability</h2>
            <p>
              FlowForges provides services on an &ldquo;as is&rdquo; basis. We are
              not liable for indirect, incidental, or consequential damages. Our
              total liability is limited to the fees paid for the specific service
              giving rise to the claim.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">6. Termination</h2>
            <p>
              Either party may terminate an engagement with 30 days written
              notice. Upon termination, the client pays for all work completed up
              to the termination date.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">7. Governing Law</h2>
            <p>
              These terms are governed by the laws of India. Any disputes shall be
              resolved through binding arbitration in accordance with Indian law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">8. Contact</h2>
            <p>
              Questions about these terms? Contact us at hello@flowforges.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
