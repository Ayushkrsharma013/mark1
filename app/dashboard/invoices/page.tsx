'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { InvoiceChat } from '@/components/command-center/panels/InvoiceChat';
import { InvoicePreview } from '@/components/command-center/panels/InvoicePreview';

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

export const dynamic = 'force-dynamic';

export default function InvoicesPage() {
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-[calc(100vh-64px)] flex"
    >
      {/* Left panel — Chat */}
      <div className="w-full lg:w-[40%] border-r border-[var(--cc-border)]">
        <InvoiceChat onInvoiceUpdate={setInvoiceData} invoiceData={invoiceData} />
      </div>

      {/* Right panel — Preview */}
      <div className="hidden lg:flex flex-1 flex-col">
        <InvoicePreview data={invoiceData} />
      </div>
    </motion.div>
  );
}
