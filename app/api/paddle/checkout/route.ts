import { NextRequest, NextResponse } from "next/server";
import { paddle } from "@/lib/paddle";

export async function POST(req: NextRequest) {
  try {
    const { priceId, customerEmail, customData } = await req.json();

    if (!priceId) {
      return NextResponse.json({ error: "priceId required" }, { status: 400 });
    }

    const transaction = await paddle.transactions.create({
      items: [{ priceId, quantity: 1 }],
      ...(customerEmail && { customer: { email: customerEmail } }),
      customData,
    });

    return NextResponse.json({
      transactionId: transaction.id,
      checkoutUrl: (transaction as any).checkoutUrl ?? null,
    });
  } catch (error: any) {
    console.error("Paddle checkout error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
