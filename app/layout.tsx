import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "FlowForges — AI Automation Agency for Digital & Creative Agencies",
    template: "%s | FlowForges",
  },
  description:
    "FlowForges builds AI agents and automation systems for digital agencies. From lead generation to workflow automation, we ship productized services in 14 days.",
  metadataBase: new URL("https://mark1-eta.vercel.app"),
  openGraph: {
    title: "FlowForges — AI Automation Agency",
    description:
      "FlowForges builds AI agents and automation systems for digital agencies. From lead generation to workflow automation, we ship productized services in 14 days.",
    url: "https://mark1-eta.vercel.app",
    siteName: "FlowForges",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FlowForges — AI Automation Agency",
    description:
      "FlowForges builds AI agents and automation systems for digital agencies.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)]">
        {children}
      </body>
    </html>
  );
}
