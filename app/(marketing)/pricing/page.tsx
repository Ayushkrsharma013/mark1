import type { Metadata } from "next";
import { PricingContent } from "@/components/pricing/PricingContent";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Transparent pricing for AI automation. AI agents from $299/month or custom builds from $3,000. All prices in USD. No hidden fees.",
};

export default function PricingPage() {
  return <PricingContent />;
}
