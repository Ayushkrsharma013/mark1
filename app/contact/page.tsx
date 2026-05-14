"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Sparkles,
  User,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
} from "lucide-react";
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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

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
    // Check if conversations seems qualified (long enough + has business keywords)
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
            "I'm having a brief hiccup. You can also reach us directly at hello@flowforges.com or +91 9630798404 — we typically respond within a few hours.",
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
    <div className="min-h-screen flex flex-col">
      {/* Top bar */}
      <header className="border-b border-[rgba(255,255,255,0.06)] bg-[#060608]/95 backdrop-blur-md">
        <div className="mx-auto max-w-5xl px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <img
              src="/logo-icon.png"
              alt="Flow-Forges"
              className="w-6 h-6 rounded"
            />
            <span className="text-sm font-semibold">
              <span className="text-[#00d4ff]">Flow</span>
              <span className="text-white">Forges</span>
            </span>
          </Link>
          <div className="hidden sm:flex items-center gap-4 text-xs text-[#71717a]">
            <a
              href="mailto:hello@flowforges.com"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              hello@flowforges.com
            </a>
            <a
              href="tel:+919630798404"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              +91 9630798404
            </a>
          </div>
        </div>
      </header>

      {/* Chat area */}
      <div className="flex-1 flex flex-col mx-auto w-full max-w-3xl px-4 sm:px-6">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto py-6 space-y-5">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "assistant" && (
                <div className="w-8 h-8 rounded-lg bg-[rgba(0,212,255,0.1)] border border-[rgba(0,212,255,0.15)] flex items-center justify-center flex-shrink-0 mr-3 mt-0.5">
                  <Sparkles className="w-4 h-4 text-[#00d4ff]" />
                </div>
              )}
              <div
                className={`max-w-[75%] text-sm leading-relaxed rounded-2xl px-4 py-3 whitespace-pre-line ${
                  msg.role === "user"
                    ? "bg-[#00d4ff] text-[#04040a] rounded-br-md"
                    : "bg-[rgba(255,255,255,0.03)] text-[#c0c0cc] border border-[rgba(255,255,255,0.05)] rounded-bl-md"
                }`}
              >
                {msg.content}
              </div>
              {msg.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-[rgba(255,255,255,0.06)] flex items-center justify-center flex-shrink-0 ml-3 mt-0.5">
                  <User className="w-4 h-4 text-[#71717a]" />
                </div>
              )}
            </motion.div>
          ))}

          {loading && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="w-8 h-8 rounded-lg bg-[rgba(0,212,255,0.1)] border border-[rgba(0,212,255,0.15)] flex items-center justify-center flex-shrink-0 mr-3 mt-0.5">
                <Sparkles className="w-4 h-4 text-[#00d4ff]" />
              </div>
              <div className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] rounded-2xl rounded-bl-md px-4 py-3">
                <div className="flex items-center gap-1.5">
                  <span
                    className="w-2 h-2 rounded-full bg-[#00d4ff] animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  />
                  <span
                    className="w-2 h-2 rounded-full bg-[#00d4ff] animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />
                  <span
                    className="w-2 h-2 rounded-full bg-[#00d4ff] animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Qualified lead nudges */}
        <AnimatePresence>
          {showQualified && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="pb-3"
            >
              <div className="rounded-xl border border-[rgba(0,212,255,0.15)] bg-[rgba(0,212,255,0.03)] p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#00d4ff]/10 flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-4 h-4 text-[#00d4ff]" />
                  </div>
                  <p className="text-sm text-[#a1a1aa]">
                    Ready to skip the chat and talk to our team directly?
                  </p>
                </div>
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
        {messages.length <= 1 && (
          <div className="pb-3 flex flex-wrap gap-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="text-xs text-[#a1a1aa] bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] rounded-full px-3.5 py-2 hover:text-white hover:border-[rgba(255,255,255,0.14)] hover:bg-[rgba(255,255,255,0.05)] transition-all"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-3 pb-6 pt-4 border-t border-[rgba(255,255,255,0.06)]"
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
            className="flex-1 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-xl px-4 py-3 text-sm text-white placeholder-[#52525b] focus:outline-none focus:border-[rgba(0,212,255,0.25)] transition-colors"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="p-3 rounded-xl bg-[#00d4ff] text-[#04040a] hover:bg-[#00d4ff]/90 transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:shadow-[0_0_16px_rgba(0,212,255,0.15)] flex-shrink-0"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>

      {/* Footer strip */}
      <div className="border-t border-[rgba(255,255,255,0.04)] py-3 px-6">
        <div className="mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#52525b]">
          <span>
            Prefer email?{" "}
            <a
              href="mailto:hello@flowforges.com"
              className="text-[#71717a] hover:text-white transition-colors"
            >
              hello@flowforges.com
            </a>
          </span>
          <span>Flow-Forges, Inc. — Raipur, Chhattisgarh, India</span>
        </div>
      </div>
    </div>
  );
}
