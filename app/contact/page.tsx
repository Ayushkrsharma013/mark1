"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Send, Mail, MapPin, CheckCircle } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlowOrb } from "@/components/ui/GlowOrb";
import { AsciiBackground } from "@/components/ui/AsciiBackground";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to send message");
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <div className="pt-24">
      <section className="relative py-24 px-6 overflow-hidden">
        <AsciiBackground mode="contact" className="absolute inset-0 w-full h-full" />
        <GlowOrb color="blue" size="sm" className="top-1/3 left-1/2 -translate-x-1/2 opacity-50" />
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SectionHeading
              label="Contact"
              title="Let's build something"
              description="Tell us about your project. We'll get back to you within 24 hours."
            />
          </motion.div>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="mx-auto max-w-4xl grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold text-white mb-6">
              Or reach us directly
            </h3>
            <div className="space-y-4">
              <a
                href="mailto:hello@flowforges.com"
                className="flex items-center gap-3 text-[#a1a1aa] hover:text-white transition-colors"
              >
                <Mail className="h-5 w-5 text-[#00d4ff]" />
                hello@flowforges.com
              </a>
              <div className="flex items-center gap-3 text-[#a1a1aa]">
                <MapPin className="h-5 w-5 text-[#00d4ff]" />
                India — serving clients worldwide
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {status === "sent" ? (
              <div className="rounded-2xl border border-[rgba(0,255,136,0.15)] bg-[rgba(0,255,136,0.04)] p-8 text-center">
                <CheckCircle className="h-10 w-10 text-[#00ff88] mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white">Message sent</h3>
                <p className="mt-2 text-[#a1a1aa] text-sm">
                  We&apos;ll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm text-[#a1a1aa] mb-1.5">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="w-full rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] px-4 py-3 text-white placeholder-[#52525b] focus:outline-none focus:border-[rgba(0,212,255,0.25)] transition-colors text-sm"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm text-[#a1a1aa] mb-1.5">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] px-4 py-3 text-white placeholder-[#52525b] focus:outline-none focus:border-[rgba(0,212,255,0.25)] transition-colors text-sm"
                    placeholder="you@company.com"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm text-[#a1a1aa] mb-1.5">
                    Company
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    className="w-full rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] px-4 py-3 text-white placeholder-[#52525b] focus:outline-none focus:border-[rgba(0,212,255,0.25)] transition-colors text-sm"
                    placeholder="Your company (optional)"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm text-[#a1a1aa] mb-1.5">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className="w-full rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] px-4 py-3 text-white placeholder-[#52525b] focus:outline-none focus:border-[rgba(0,212,255,0.25)] transition-colors text-sm resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>

                {status === "error" && (
                  <p className="text-sm text-red-400">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-white text-black font-medium px-6 py-3 hover:bg-[#e4e4e7] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "sending" ? (
                    <>Sending...</>
                  ) : (
                    <>
                      Send Message
                      <Send className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
