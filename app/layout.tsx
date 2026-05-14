import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
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
    default: "FlowForges — AI Automation Agency",
    template: "%s | FlowForges",
  },
  description:
    "We build AI-powered products that transform how businesses operate. From lead generation to workflow automation, we ship intelligence.",
  metadataBase: new URL("https://flowforges.com"),
  openGraph: {
    title: "FlowForges — AI Automation Agency",
    description:
      "We build AI-powered products that transform how businesses operate.",
    siteName: "FlowForges",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FlowForges — AI Automation Agency",
    description:
      "We build AI-powered products that transform how businesses operate.",
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
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#161D30',
              border: '1px solid rgba(255,255,255,0.06)',
              color: '#F1F5F9',
            },
          }}
        />
      </body>
    </html>
  );
}
