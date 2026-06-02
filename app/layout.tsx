import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { Toaster } from "sonner";
import StarField from "@/components/StarField";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.flow-forges.com"),
  title: {
    default: "FlowForges — AI Automation Agency",
    template: "%s | FlowForges",
  },
  description:
    "Done-for-you AI agents for digital agencies and e-commerce brands. Prospecting, outreach, and support — fully automated. Live in 2 weeks.",
  keywords: [
    "AI automation",
    "AI agents",
    "done for you AI",
    "lead generation AI",
    "digital agency automation",
    "e-commerce AI",
    "prospecting automation",
  ],
  authors: [{ name: "FlowForges" }],
  creator: "FlowForges",
  icons: {
    icon: [
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon.ico", sizes: "48x48" },
    ],
    apple: { url: "/apple-touch-icon.png", type: "image/png" },
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.flow-forges.com",
    siteName: "FlowForges",
    title: "FlowForges — Done-For-You AI Agents",
    description:
      "We build AI agents that run your business. Prospecting, outreach, support — automated.",
    images: [{ url: "/Logo.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "FlowForges — Done-For-You AI Agents",
    description: "We build AI agents that run your business.",
    images: ["/Logo.png"],
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
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "FlowForges",
              url: "https://flow-forges.com",
              logo: "https://flowforges.com/Logo.png",
              description:
                "FlowForges is an AI automation agency that builds productized AI agents and workflow automation systems for digital and creative agencies.",
              foundingDate: "2024",
              serviceType: [
                "AI Automation",
                "Workflow Automation",
                "AI Agents",
                "Lead Generation",
              ],
              areaServed: ["US", "GB", "AU"],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "sales",
                url: "https://flow-forges.com/book",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "FlowForges",
              url: "https://flow-forges.com",
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[var(--bg-void)] text-[var(--text-primary)]">
        <StarField />
        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          {children}
        </div>
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#161D30",
              border: "1px solid rgba(255,255,255,0.06)",
              color: "#F1F5F9",
            },
          }}
        />
      </body>
    </html>
  );
}
