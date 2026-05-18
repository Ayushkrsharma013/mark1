'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Download, FileText } from 'lucide-react';

interface InvoiceItem {
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

interface InvoiceData {
  client_name: string;
  client_email: string | null;
  items: InvoiceItem[];
  subtotal: number;
  tax_rate: number;
  tax_amount: number;
  total: number;
  notes: string;
}

interface InvoicePreviewProps {
  data: InvoiceData | null;
}

function EmptyPreview() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-6">
      <div className="h-16 w-16 rounded-2xl bg-[rgba(255,255,255,0.04)] flex items-center justify-center mb-4">
        <FileText className="h-7 w-7 text-[var(--cc-text-muted)]" />
      </div>
      <h3 className="text-sm font-semibold text-[var(--cc-text-secondary)] mb-1">No Invoice Yet</h3>
      <p className="text-xs text-[var(--cc-text-muted)] max-w-[240px]">
        Describe your invoice in the chat panel and it will appear here in real-time.
      </p>
    </div>
  );
}

export function InvoicePreview({ data }: InvoicePreviewProps) {
  const printRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    if (!printRef.current) return;
    const html = printRef.current.innerHTML;
    const styles = document.querySelector('style')?.outerHTML || '';
    const blob = new Blob(
      [`<!DOCTYPE html><html><head><meta charset="utf-8"><title>Invoice</title><style>body{background:#000;color:#fff;font-family:system-ui,-apple-system,sans-serif;padding:40px;max-width:700px;margin:0 auto}${styles}</style></head><body><div style="border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:32px">${html}</div></body></html>`],
      { type: 'text/html' }
    );
    window.open(URL.createObjectURL(blob), '_blank');
  };

  if (!data) return <EmptyPreview />;

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--cc-border)]">
        <h3 className="text-base font-semibold text-white">Invoice Preview</h3>
        <button
          onClick={handleDownload}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-white/70 hover:text-white transition-colors"
        >
          <Download className="h-3.5 w-3.5" />
          Download
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6">
        <motion.div
          key={JSON.stringify(data)}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-black border border-[var(--cc-border)] rounded-xl p-6 space-y-5"
        >
          <div ref={printRef}>
            {/* Header */}
            <div className="flex items-start justify-between mb-5">
              <div>
                <h4 className="text-lg font-bold text-white font-display">FlowForges</h4>
                <p className="text-[11px] text-[var(--cc-text-muted)] mt-0.5">AI Automation Agency</p>
                <p className="text-[11px] text-[var(--cc-text-muted)]">hello@flowforges.com</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-mono uppercase tracking-wider text-[var(--cc-text-muted)]">Invoice</p>
                <p className="text-xs text-[var(--cc-text-muted)] mt-0.5">
                  {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
            </div>

            <div className="h-px bg-[var(--cc-border)] mb-5" />

            {/* Bill To */}
            <div className="mb-5">
              <p className="text-[10px] font-mono uppercase tracking-wider text-[var(--cc-text-muted)] mb-1">Bill To</p>
              <p className="text-sm font-semibold text-white">{data.client_name}</p>
              {data.client_email && (
                <p className="text-xs text-[var(--cc-text-secondary)] mt-0.5">{data.client_email}</p>
              )}
            </div>

            {/* Items table */}
            <div className="mb-5">
              <div className="grid grid-cols-12 gap-2 text-[10px] font-mono uppercase tracking-wider text-[var(--cc-text-muted)] pb-2 border-b border-[var(--cc-border)] mb-2">
                <span className="col-span-5">Description</span>
                <span className="col-span-2 text-center">Qty</span>
                <span className="col-span-2 text-right">Rate</span>
                <span className="col-span-3 text-right">Amount</span>
              </div>
              {data.items.map((item, i) => (
                <div key={i} className="grid grid-cols-12 gap-2 py-1.5 text-sm">
                  <span className="col-span-5 text-white">{item.description}</span>
                  <span className="col-span-2 text-center text-[var(--cc-text-secondary)]">{item.quantity}</span>
                  <span className="col-span-2 text-right text-[var(--cc-text-secondary)]">${item.rate.toLocaleString()}</span>
                  <span className="col-span-3 text-right text-white font-mono">${item.amount.toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="h-px bg-[var(--cc-border)] mb-5" />

            {/* Totals */}
            <div className="space-y-1.5 mb-5">
              <div className="flex justify-between text-sm">
                <span className="text-[var(--cc-text-secondary)]">Subtotal</span>
                <span className="text-white font-mono">${data.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[var(--cc-text-secondary)]">Tax ({data.tax_rate}%)</span>
                <span className="text-white font-mono">${data.tax_amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-base font-semibold pt-2 border-t border-[var(--cc-border)]">
                <span className="text-white">Total</span>
                <span className="text-white font-mono">${data.total.toLocaleString()}</span>
              </div>
            </div>

            {data.notes && (
              <>
                <div className="h-px bg-[var(--cc-border)] mb-4" />
                <div className="mb-5">
                  <p className="text-[10px] font-mono uppercase tracking-wider text-[var(--cc-text-muted)] mb-1">Notes</p>
                  <p className="text-xs text-[var(--cc-text-secondary)]">{data.notes}</p>
                </div>
              </>
            )}

            <div className="h-px bg-[var(--cc-border)] mb-4" />
            <div className="text-center">
              <p className="text-[10px] text-[var(--cc-text-muted)]">Thank you for your business.</p>
              <p className="text-[10px] text-[var(--cc-text-muted)] mt-0.5">Payment due within 30 days.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
