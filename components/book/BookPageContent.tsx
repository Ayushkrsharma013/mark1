"use client";

import { AsciiBackground } from "@/components/ui/AsciiBackground";
import { BookingFlow } from "@/components/book/BookingFlow";
import { BookingChat } from "@/components/book/BookingChat";

export function BookPageContent() {
  return (
    <div className="pt-24 pb-16 px-6 min-h-screen">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.04)] bg-[rgba(255,255,255,0.01)] p-8 md:p-12 mb-10">
        <AsciiBackground mode="contact" className="absolute inset-0 w-full h-full opacity-40" />
        <div className="relative z-10 text-center">
          <h1 className="text-3xl font-bold text-white">Book a Demo</h1>
          <p className="text-sm text-[#71717a] mt-2 max-w-md mx-auto">
            Pick a date, choose a time, and get confirmed instantly.
            30-minute demo with one of our AI experts.
          </p>
        </div>
      </div>

      {/* Booking + Chat layout */}
      <div className="mx-auto max-w-5xl flex flex-col lg:flex-row gap-8">
        {/* Booking form */}
        <div className="flex-1">
          <BookingFlow />
        </div>

        {/* Chat sidebar */}
        <div className="hidden lg:flex w-80 flex-shrink-0">
          <div className="h-[600px] sticky top-24 w-full">
            <BookingChat embedded />
          </div>
        </div>
      </div>
    </div>
  );
}
