import type { Metadata } from "next";
import { BookPageContent } from "@/components/book/BookPageContent";

export const metadata: Metadata = {
  title: "Book a Demo",
  description:
    "Schedule a 30-minute demo with our AI experts. Pick a date, choose a time, and get confirmed instantly.",
};

export default function BookPage() {
  return <BookPageContent />;
}
