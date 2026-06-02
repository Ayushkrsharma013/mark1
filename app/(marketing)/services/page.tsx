import type { Metadata } from "next";
import { ServicesContent } from "@/components/services/ServicesContent";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Custom AI agents, workflow automation, and AI strategy. Done-for-you, start to finish. From $3,000.",
};

export default function ServicesPage() {
  return <ServicesContent />;
}
