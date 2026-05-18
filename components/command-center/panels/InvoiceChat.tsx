'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2 } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface InvoiceData {
  client_name: string;
  client_email: string | null;
  items: { description: string; quantity: number; rate: number; amount: number }[];
  subtotal: number;
  tax_rate: number;
  tax_amount: number;
  total: number;
  notes: string;
}

interface InvoiceChatProps {
  onInvoiceUpdate: (data: InvoiceData) => void;
  invoiceData: InvoiceData | null;
}

export function InvoiceChat({ onInvoiceUpdate, invoiceData }: InvoiceChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "I'm your invoice agent. Describe what you need — client, services, hours, rates, taxes — and I'll build it. Example: \"Invoice for Acme Corp — built custom CRM, 60 hours at $125/hr, 18% GST\"",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg: Message = { role: 'user', content: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const allMessages = [...messages, userMsg].filter(
        (m, i, arr) => !(m.role === 'assistant' && i === 0)
      );
      const res = await fetch('/api/invoices/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: allMessages.slice(-8) }),
      });
      const json = await res.json();

      if (json.success && json.data) {
        onInvoiceUpdate(json.data);
        const summary = `Got it. Invoice for **${json.data.client_name}**: ${json.data.items.length} line item(s), subtotal $${json.data.subtotal.toLocaleString()}, tax $${json.data.tax_amount.toLocaleString()} (${json.data.tax_rate}%), **total $${json.data.total.toLocaleString()}**. Type "save" to store this invoice, or describe changes.`;
        setMessages((prev) => [...prev, { role: 'assistant', content: summary }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: 'Sorry, I had trouble parsing that. Try being more specific — client name, service, hours, rate, and tax rate.' },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Something went wrong. Please try again.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!invoiceData) return;
    const res = await fetch('/api/invoices', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(invoiceData),
    });
    const json = await res.json();
    if (json.invoice) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Invoice saved successfully. You can download the PDF now.' },
      ]);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--cc-border)]">
        <h3 className="text-base font-semibold text-white">Invoice Agent</h3>
        <span className="text-[10px] font-mono text-[var(--cc-text-muted)] uppercase tracking-wider">
          Gemini 2.5 Flash
        </span>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[90%] rounded-xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-white text-black'
                  : 'bg-[#111111] border border-[var(--cc-border)] text-white'
              }`}
            >
              {msg.content}
            </div>
          </motion.div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-[#111111] border border-[var(--cc-border)] rounded-xl px-4 py-3">
              <Loader2 className="h-4 w-4 text-white/50 animate-spin" />
            </div>
          </div>
        )}
      </div>

      <div className="px-6 py-4 border-t border-[var(--cc-border)]">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Describe the invoice..."
            className="flex-1 bg-[#0A0A0A] border border-[var(--cc-border)] rounded-lg px-4 py-2.5 text-sm text-white placeholder-[var(--cc-text-muted)] outline-none focus:border-white/30 transition-colors"
          />
          {invoiceData && (
            <button
              onClick={handleSave}
              className="px-4 py-2.5 rounded-lg border border-white/20 text-white/80 text-sm hover:bg-white hover:text-black transition-all duration-300 whitespace-nowrap"
            >
              Save
            </button>
          )}
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="px-4 py-2.5 rounded-lg bg-white text-black text-sm font-medium hover:bg-white/90 disabled:opacity-30 transition-all duration-300"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
