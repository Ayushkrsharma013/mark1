"use client";
import { useState } from "react";

interface InvoiceForm {
  clientName: string;
  clientEmail: string;
  projectName: string;
  amount: string;
  description: string;
  dueDate: string;
}

const empty: InvoiceForm = {
  clientName: "",
  clientEmail: "",
  projectName: "",
  amount: "",
  description: "",
  dueDate: "",
};

export function InvoiceSender() {
  const [form, setForm] = useState<InvoiceForm>(empty);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const generateInvoiceNumber = () => {
    const d = new Date();
    const yy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const rand = Math.floor(Math.random() * 900 + 100);
    return `FF-${yy}${mm}-${rand}`;
  };

  const handleSubmit = async () => {
    if (!form.clientEmail || !form.amount || !form.projectName) {
      setError("Please fill all required fields");
      return;
    }
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const invoiceNumber = generateInvoiceNumber();
      const res = await fetch("/api/xflow/invoice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          amount: parseFloat(form.amount),
          currency: "USD",
          invoiceNumber,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(`Invoice ${data.invoiceNumber} sent to ${data.sentTo}`);
        setForm(empty);
      } else {
        setError(data.error || "Failed to send");
      }
    } catch {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const inp =
    "w-full px-4 py-3 rounded-lg bg-[#0d0d0d] border border-[#1a1a1a] text-white text-sm focus:outline-none focus:border-[#e8420a] transition-colors placeholder:text-[#71717a]";

  return (
    <div className="max-w-lg space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-[#71717a] mb-1 block">Client Name *</label>
          <input className={inp} placeholder="John Smith" value={form.clientName} onChange={(e) => setForm({ ...form, clientName: e.target.value })} />
        </div>
        <div>
          <label className="text-xs text-[#71717a] mb-1 block">Client Email *</label>
          <input type="email" className={inp} placeholder="john@company.com" value={form.clientEmail} onChange={(e) => setForm({ ...form, clientEmail: e.target.value })} />
        </div>
      </div>
      <div>
        <label className="text-xs text-[#71717a] mb-1 block">Project Name *</label>
        <input className={inp} placeholder="Custom AI Agent Build" value={form.projectName} onChange={(e) => setForm({ ...form, projectName: e.target.value })} />
      </div>
      <div>
        <label className="text-xs text-[#71717a] mb-1 block">Description</label>
        <input className={inp} placeholder="Custom AI lead generation agent for..." value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-[#71717a] mb-1 block">Amount (USD) *</label>
          <input type="number" className={inp} placeholder="5000" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />
        </div>
        <div>
          <label className="text-xs text-[#71717a] mb-1 block">Due Date</label>
          <input type="date" className={inp} value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} />
        </div>
      </div>
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full py-3.5 rounded-full bg-[#e8420a] text-white font-semibold text-sm hover:bg-[#cc3a08] transition-colors disabled:opacity-50"
      >
        {loading ? "Sending Invoice..." : "Send Invoice via Email"}
      </button>
      {success && (
        <div className="p-4 rounded-lg bg-[#0a2a0a] border border-[#1a3a1a] text-[#4ade80] text-sm">
          ✓ {success}
        </div>
      )}
      {error && (
        <div className="p-4 rounded-lg bg-[#2a0a0a] border border-[#3a1a1a] text-red-400 text-sm">
          {error}
        </div>
      )}
    </div>
  );
}
