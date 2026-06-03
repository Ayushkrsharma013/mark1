export const XFLOW_ACCOUNT = {
  accountName: "AKS Forge Lab",
  bankName: "JPMorgan Chase Bank, N.A.",
  accountNumber: "20000045886271",
  routingACH: "028000024",
  routingFedwire: "021000021",
  swiftBIC: "CHASUS33XXX",
  bankAddress: "383 Madison Ave, New York, NY 10179, USA",
  reference: "FlowForges — Invoice",
} as const;

export interface XflowInvoiceData {
  clientName: string;
  clientEmail: string;
  projectName: string;
  amount: number;
  currency: string;
  invoiceNumber: string;
  dueDate: string;
  description: string;
}

export function generateInvoiceEmailHTML(data: XflowInvoiceData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, sans-serif; background: #0a0a0a; color: #ffffff; margin: 0; padding: 40px 20px; }
    .container { max-width: 600px; margin: 0 auto; background: #111111; border: 1px solid #1a1a1a; border-radius: 12px; overflow: hidden; }
    .header { padding: 32px; border-bottom: 1px solid #1a1a1a; }
    .logo { font-size: 20px; font-weight: 700; color: #ffffff; }
    .logo span { color: #e8420a; }
    .invoice-badge { display: inline-block; margin-top: 8px; padding: 4px 12px; background: #1a0a00; border: 1px solid #2a1500; border-radius: 9999px; color: #e8420a; font-size: 12px; font-weight: 500; }
    .body { padding: 32px; }
    .greeting { color: #a1a1aa; margin-bottom: 24px; line-height: 1.6; }
    .amount-box { background: #0d0d0d; border: 1px solid #1a1a1a; border-radius: 8px; padding: 24px; margin: 24px 0; text-align: center; }
    .amount-label { color: #71717a; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 8px; }
    .amount-value { font-size: 36px; font-weight: 700; color: #ffffff; }
    .amount-currency { color: #71717a; font-size: 14px; margin-top: 4px; }
    .section-title { color: #71717a; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 12px; margin-top: 24px; }
    .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #1a1a1a; font-size: 14px; }
    .detail-label { color: #71717a; }
    .detail-value { color: #ffffff; font-weight: 500; }
    .bank-box { background: #0d0d0d; border: 1px solid #1a1a1a; border-radius: 8px; padding: 20px; margin: 16px 0; font-family: monospace; font-size: 13px; }
    .bank-row { display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid #1a1a1a; }
    .bank-row:last-child { border-bottom: none; }
    .bank-key { color: #71717a; }
    .bank-val { color: #4ade80; font-weight: 600; }
    .note { background: #0a1a0a; border: 1px solid #1a2a1a; border-radius: 8px; padding: 16px; margin-top: 24px; font-size: 13px; color: #a1a1aa; line-height: 1.6; }
    .footer { padding: 24px 32px; border-top: 1px solid #1a1a1a; text-align: center; color: #71717a; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">Flow<span>Forges</span></div>
      <div class="invoice-badge">INVOICE #${data.invoiceNumber}</div>
    </div>
    <div class="body">
      <p class="greeting">
        Hi ${data.clientName},<br><br>
        Thank you for choosing FlowForges. Please find your invoice details below and complete the wire transfer at your earliest convenience.
      </p>
      <div class="amount-box">
        <div class="amount-label">Amount Due</div>
        <div class="amount-value">$${data.amount.toLocaleString()}</div>
        <div class="amount-currency">USD — Due by ${data.dueDate}</div>
      </div>
      <div class="section-title">Invoice Details</div>
      <div class="detail-row"><span class="detail-label">Invoice #</span><span class="detail-value">${data.invoiceNumber}</span></div>
      <div class="detail-row"><span class="detail-label">Project</span><span class="detail-value">${data.projectName}</span></div>
      <div class="detail-row"><span class="detail-label">Description</span><span class="detail-value">${data.description}</span></div>
      <div class="detail-row"><span class="detail-label">Amount</span><span class="detail-value">$${data.amount.toLocaleString()} USD</span></div>
      <div class="detail-row"><span class="detail-label">Due Date</span><span class="detail-value">${data.dueDate}</span></div>
      <div class="section-title">Wire Transfer Instructions</div>
      <div class="bank-box">
        <div class="bank-row"><span class="bank-key">Bank</span><span class="bank-val">JPMorgan Chase Bank, N.A.</span></div>
        <div class="bank-row"><span class="bank-key">Account Name</span><span class="bank-val">AKS Forge Lab</span></div>
        <div class="bank-row"><span class="bank-key">Account Number</span><span class="bank-val">20000045886271</span></div>
        <div class="bank-row"><span class="bank-key">ACH Routing</span><span class="bank-val">028000024</span></div>
        <div class="bank-row"><span class="bank-key">Fedwire Routing</span><span class="bank-val">021000021</span></div>
        <div class="bank-row"><span class="bank-key">SWIFT/BIC</span><span class="bank-val">CHASUS33XXX</span></div>
        <div class="bank-row"><span class="bank-key">Reference</span><span class="bank-val">INV-${data.invoiceNumber}</span></div>
      </div>
      <div class="note">
        ✓ Please use invoice number <strong>INV-${data.invoiceNumber}</strong> as the payment reference.<br>
        ✓ Work begins within 24 hours of payment confirmation.<br>
        ✓ Questions? Reply to this email or contact support@flow-forges.com
      </div>
    </div>
    <div class="footer">
      FlowForges (operated by AKS Forge Lab)<br>
      Bhilai, Chhattisgarh, India<br>
      support@flow-forges.com · flow-forges.com
    </div>
  </div>
</body>
</html>
  `;
}
