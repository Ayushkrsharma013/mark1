import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Chat with our AI agent or reach us directly. Book a demo, ask about pricing, or explore how AI can transform your business.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
