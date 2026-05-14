"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, Calendar, X, MessageCircle, CheckCircle2 } from "lucide-react";
import { getNextStep, type BookingData } from "@/lib/booking-chat";

interface ChatMsg {
  text: string;
  type: "bot" | "user";
  quickReplies?: string[];
  isSuccess?: boolean;
}

export function BookingChat({ embedded }: { embedded?: boolean }) {
  const [open, setOpen] = useState(embedded ?? false);
  const [messages, setMessages] = useState<ChatMsg[]>([
    {
      text: "Hey! I'm the FlowForges booking assistant. I can get you booked for a demo in under 2 minutes, or answer any questions you have.",
      type: "bot",
      quickReplies: ["Book a Demo", "Pricing", "How it works"],
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bookingRef = useRef<BookingData>({ step: "idle" });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const send = useCallback(async (msg: string) => {
    const userMsg: ChatMsg = { text: msg, type: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setTyping(true);

    // Process through state machine
    await new Promise((r) => setTimeout(r, 500 + Math.random() * 400));

    const result = getNextStep(bookingRef.current, msg);
    bookingRef.current = result.data;

    const botMsg: ChatMsg = { text: result.reply, type: "bot" };

    // If done, try to book via API
    if (result.done && result.data.email && result.data.date && result.data.time) {
      try {
        await fetch("/api/appointments", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: result.data.name,
            email: result.data.email,
            company: result.data.company,
            date: result.data.date,
            time: result.data.time,
          }),
        });
        botMsg.isSuccess = true;
      } catch {
        // Booking by API failed, but conversation is complete
      }
    }

    setMessages((prev) => [...prev, botMsg]);
    setTyping(false);
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || typing) return;
    const msg = input.trim();
    setInput("");
    send(msg);
  }

  function formatMsg(text: string) {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>')
      .replace(/\n/g, "<br/>");
  }

  const chatContent = (
    <div className="flex flex-col h-full rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(6,6,8,0.95)] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[rgba(255,255,255,0.04)]">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[rgba(0,212,255,0.1)] border border-[rgba(0,212,255,0.15)] flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 text-[#00d4ff]" />
          </div>
          <div>
            <p className="text-xs font-semibold text-white">Booking Bot</p>
            <p className="text-[10px] text-[#52525b]">Online — books in seconds</p>
          </div>
        </div>
        {!embedded && (
          <button
            onClick={() => setOpen(false)}
            className="p-1 rounded text-[#52525b] hover:text-white transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] text-xs leading-relaxed rounded-2xl px-3 py-2 ${
                msg.type === "user"
                  ? "bg-[#00d4ff] text-[#04040a] rounded-br-sm"
                  : "bg-[rgba(255,255,255,0.03)] text-[#a1a1aa] border border-[rgba(255,255,255,0.04)] rounded-bl-sm"
              }`}
              dangerouslySetInnerHTML={{ __html: formatMsg(msg.text) }}
            />

            {msg.isSuccess && (
              <div className="ml-2 flex-shrink-0 mt-1">
                <CheckCircle2 className="w-4 h-4 text-[#00ff88]" />
              </div>
            )}
          </div>
        ))}

        {typing && (
          <div className="flex justify-start">
            <div className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.04)] rounded-2xl rounded-bl-sm px-3 py-2.5">
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] animate-bounce" style={{ animationDelay: "100ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] animate-bounce" style={{ animationDelay: "200ms" }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Replies */}
      {messages.length <= 1 && (
        <div className="px-4 pb-2 flex flex-wrap gap-1.5">
          {messages[0]?.quickReplies?.map((qr) => (
            <button
              key={qr}
              onClick={() => send(qr)}
              className="text-[10px] text-[#71717a] border border-[rgba(255,255,255,0.06)] rounded-full px-2.5 py-1 hover:text-white hover:border-[rgba(255,255,255,0.14)] transition-all flex items-center gap-1"
            >
              {qr === "Book a Demo" && <Calendar className="w-3 h-3" />}
              {qr === "How it works" && <Sparkles className="w-3 h-3" />}
              {qr}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 px-4 py-3 border-t border-[rgba(255,255,255,0.04)]"
      >
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-lg px-3 py-2 text-xs text-white placeholder-[#52525b] focus:outline-none focus:border-[rgba(0,212,255,0.2)]"
          disabled={typing}
        />
        <button
          type="submit"
          disabled={!input.trim() || typing}
          className="p-2 rounded-lg bg-[#00d4ff] text-[#04040a] hover:bg-[#00d4ff]/90 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );

  if (embedded) return chatContent;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-[#00d4ff] text-[#04040a] shadow-lg shadow-[rgba(0,212,255,0.2)] hover:bg-[#00d4ff]/90 transition-all flex items-center justify-center"
        style={{ display: open ? "none" : "flex" }}
      >
        <MessageCircle className="w-5 h-5" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[360px] h-[500px] max-w-[calc(100vw-2rem)] max-h-[calc(100vh-6rem)]"
          >
            {chatContent}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
