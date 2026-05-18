import { Navbar } from "@/components/shell/Navbar";
import { Footer } from "@/components/shell/Footer";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { SmoothScrollProvider } from "@/components/home-cinematic/SmoothScrollProvider";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <SmoothScrollProvider>
        <main className="flex-1">{children}</main>
      </SmoothScrollProvider>
      <Footer />
      <ChatWidget />
    </>
  );
}
