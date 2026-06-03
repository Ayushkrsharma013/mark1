import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { generateInvoiceEmailHTML, XflowInvoiceData } from "@/lib/xflow";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const data: XflowInvoiceData = await req.json();
    const { clientEmail, amount, projectName, invoiceNumber } = data;

    if (!clientEmail || !amount || !projectName) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const html = generateInvoiceEmailHTML(data);

    await resend.emails.send({
      from: "FlowForges <support@flow-forges.com>",
      to: clientEmail,
      subject: `Invoice #${invoiceNumber} — FlowForges ($${amount.toLocaleString()} USD)`,
      html,
    });

    await resend.emails.send({
      from: "FlowForges <support@flow-forges.com>",
      to: "support@flow-forges.com",
      subject: `[COPY] Invoice #${invoiceNumber} sent to ${clientEmail} — $${amount.toLocaleString()}`,
      html,
    });

    return NextResponse.json({ success: true, invoiceNumber, sentTo: clientEmail });
  } catch (error: any) {
    console.error("Invoice send error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
