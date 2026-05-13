import { Navbar } from "@/components/shell/Navbar";
import { Footer } from "@/components/shell/Footer";
import { ChatWidget } from "@/components/chat/ChatWidget";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <ChatWidget />
    </>
  );
}
