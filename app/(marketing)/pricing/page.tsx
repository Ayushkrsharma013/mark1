import type { Metadata } from "next";
import { PricingContent } from "@/components/pricing/PricingContent";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Transparent pricing for AI automation services — custom-built solutions starting at ₹3,000. Use our interactive quote builder for a personalized estimate.",
};

export default function PricingPage() {
  return <PricingContent />;
}
