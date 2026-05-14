"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, User, ArrowRight } from "lucide-react";
import { AsciiBackground } from "@/components/ui/AsciiBackground";
import Link from "next/link";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTIONS = [
  "I need an AI agent for my business",
  "Tell me about Prospecting OS",
  "What are your pricing plans?",
  "I want to book a demo call",
];

export default function ContactPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hey! 👋 I'm the FlowForges contact agent. I can answer your questions, walk you through our services, and get you booked for a demo — all right here.\n\nWhat brings you to FlowForges today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [visitorName, setVisitorName] = useState<string | null>(null);
  const [showQualified, setShowQualified] = useState(false);
  const [conversationStarted, setConversationStarted] = useState(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (conversationStarted) inputRef.current?.focus();
  }, [conversationStarted]);

  // Detect when visitor shares their name
  useEffect(() => {
    if (visitorName) return;
    const userMessages = messages.filter((m) => m.role === "user");
    for (const m of userMessages) {
      const nameMatch = m.content.match(
        /(?:I(?:'|')?m|I am|my name is|this is)\s+([A-Z][a-z]+(?:\s[A-Z][a-z]+)?)/i
      );
      if (nameMatch) {
        setVisitorName(nameMatch[1]);
        break;
      }
    }
    if (
      userMessages.length >= 3 &&
      messages.length >= 6 &&
      !showQualified
    ) {
      const allText = userMessages.map((m) => m.content.toLowerCase()).join(" ");
      if (
        allText.includes("business") ||
        allText.includes("need") ||
        allText.includes("automate") ||
        allText.includes("ai") ||
        allText.includes("lead") ||
        allText.includes("agent") ||
        allText.includes("demo") ||
        allText.includes("startup") ||
        allText.includes("company")
      ) {
        setShowQualified(true);
      }
    }
  }, [messages, visitorName, showQualified]);

  async function send(msg: string) {
    if (!conversationStarted) setConversationStarted(true);
    const userMsg: Message = { role: "user", content: msg };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          context: "contact",
          messages: [...messages, userMsg].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply || "I'm here to help!" },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I'm having a brief hiccup. You can reach us directly at hello@flowforges.com or +91 9630798404 — we typically respond within a few hours.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || loading) return;
    send(input.trim());
  }

  return (
    <div className="pt-24 pb-16 px-6">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.04)] bg-[rgba(255,255,255,0.01)] p-8 md:p-12 mb-10">
        <AsciiBackground mode="contact" className="absolute inset-0 w-full h-full opacity-40" />
        <div className="relative z-10 text-center">
          <h1 className="text-3xl font-bold text-white">Let&apos;s talk</h1>
          <p className="text-sm text-[#71717a] mt-2 max-w-md mx-auto">
            Chat with our AI agent. Get answers, explore services, and book a
            demo — no forms, no waiting.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl">
        {/* Chat container */}
        <div className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.01)] overflow-hidden">
          {/* Chat header */}
          <div className="flex items-center gap-3 px-5 py-3.5 border-b border-[rgba(255,255,255,0.04)]">
            <div className="w-8 h-8 rounded-xl bg-[rgba(0,212,255,0.1)] border border-[rgba(0,212,255,0.15)] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#00d4ff]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">FlowForges AI</p>
              <p className="text-xs text-[#52525b]">Online — replies instantly</p>
            </div>
          </div>

          {/* Messages */}
          <div className="h-[500px] overflow-y-auto px-5 py-4 space-y-4">
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <div className="w-7 h-7 rounded-lg bg-[rgba(0,212,255,0.08)] border border-[rgba(0,212,255,0.1)] flex items-center justify-center flex-shrink-0 mr-2.5 mt-0.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#00d4ff]" />
                  </div>
                )}
                <div
                  className={`max-w-[75%] text-sm leading-relaxed rounded-2xl px-4 py-2.5 whitespace-pre-line ${
                    msg.role === "user"
                      ? "bg-[#00d4ff] text-[#04040a] rounded-br-md"
                      : "bg-[rgba(255,255,255,0.03)] text-[#a1a1aa] border border-[rgba(255,255,255,0.05)] rounded-bl-md"
                  }`}
                >
                  {msg.content}
                </div>
                {msg.role === "user" && (
                  <div className="w-7 h-7 rounded-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.06)] flex items-center justify-center flex-shrink-0 ml-2.5 mt-0.5">
                    <User className="w-3.5 h-3.5 text-[#71717a]" />
                  </div>
                )}
              </motion.div>
            ))}

            {loading && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="w-7 h-7 rounded-lg bg-[rgba(0,212,255,0.08)] border border-[rgba(0,212,255,0.1)] flex items-center justify-center flex-shrink-0 mr-2.5 mt-0.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#00d4ff]" />
                </div>
                <div className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] rounded-2xl rounded-bl-md px-4 py-2.5">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#00d4ff] animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 rounded-full bg-[#00d4ff] animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 rounded-full bg-[#00d4ff] animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Qualified lead nudge */}
          <AnimatePresence>
            {showQualified && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="border-t border-[rgba(0,212,255,0.1)]"
              >
                <div className="px-5 py-3 flex items-center justify-between gap-4">
                  <p className="text-sm text-[#a1a1aa]">
                    Ready to talk to our team directly?
                  </p>
                  <Link
                    href="/home/book-demo"
                    className="flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#00d4ff] text-[#04040a] text-sm font-semibold hover:bg-[#00d4ff]/90 transition-all hover:shadow-[0_0_20px_rgba(0,212,255,0.2)]"
                  >
                    Book a Demo
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Suggestions */}
          {!conversationStarted && (
            <div className="px-5 pb-3 flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="text-xs text-[#71717a] border border-[rgba(255,255,255,0.06)] rounded-full px-3.5 py-1.5 hover:text-white hover:border-[rgba(255,255,255,0.14)] hover:bg-[rgba(255,255,255,0.03)] transition-all"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-3 px-5 py-3.5 border-t border-[rgba(255,255,255,0.04)]"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                visitorName
                  ? `Go ahead, ${visitorName}...`
                  : "Tell me about your project..."
              }
              className="flex-1 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-xl px-4 py-2.5 text-sm text-white placeholder-[#52525b] focus:outline-none focus:border-[rgba(0,212,255,0.2)] transition-colors"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="p-2.5 rounded-xl bg-[#00d4ff] text-[#04040a] hover:bg-[#00d4ff]/90 transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:shadow-[0_0_16px_rgba(0,212,255,0.15)] flex-shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Contact info below chat */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-[#52525b]">
          <a href="mailto:hello@flowforges.com" className="hover:text-white transition-colors">
            hello@flowforges.com
          </a>
          <a href="tel:+919630798404" className="hover:text-white transition-colors">
            +91 9630798404
          </a>
          <span>Raipur, Chhattisgarh, India</span>
        </div>
      </div>
    </div>
  );
}
