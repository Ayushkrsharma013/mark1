import type { Metadata } from "next";
import { AsciiBackground } from "@/components/ui/AsciiBackground";

export const metadata: Metadata = {
  title: "Shipping Policy",
  description:
    "Flow-Forges digital delivery policy — instant access, timelines, and support.",
};


export const revalidate = 0;

export default function ShippingPage() {
  return (
    <div className="pt-24 pb-16 px-6">
      <div className="relative overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.04)] bg-[rgba(255,255,255,0.01)] p-8 md:p-12 mb-10">
        <AsciiBackground
          mode="legal"
          className="absolute inset-0 w-full h-full opacity-40"
        />
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-white">Shipping Policy</h1>
          <p className="text-sm text-[#71717a] mt-2">
            Last updated: 2025-08-15
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl">
        <div className="mt-10 space-y-10 text-[#a1a1aa] leading-relaxed">
          <p>
            Flow‑Forges provides software‑as‑a‑service (SaaS) and digital
            products exclusively. No physical goods are shipped, and no physical
            delivery takes place.
          </p>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              1. Delivery Timelines
            </h2>
            <p>
              Access to the Services is provisioned instantly upon successful
              payment and account verification. You will receive immediate
              access to the purchased features, dashboards, or digital
              resources. In rare cases where additional fraud checks or manual
              review is required, provisioning may take up to 24 hours. If you
              have not received access within 24 hours, please contact support.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              2. Order Communication
            </h2>
            <p>
              Upon completing a purchase, you will receive an order confirmation
              and onboarding instructions at the email address registered to
              your account. It is your responsibility to ensure that your email
              address is accurate and that our messages are not filtered to
              spam. You can also access all billing history and receipts from
              your account dashboard.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              3. Digital Nature of Products
            </h2>
            <p>
              All products and services offered by Flow‑Forges are intangible
              digital goods delivered via web-based access. There is no physical
              shipment tracking, no courier involved, and no shipping charges
              applied to any purchase.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              4. Support
            </h2>
            <p>
              If you experience any issue accessing purchased services, contact
              us immediately:
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
                href="tel:+919630755104"
                className="text-[#00d4ff] hover:underline"
              >
                +91 9630755104
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
