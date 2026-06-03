import { NextRequest, NextResponse } from "next/server";
import { getDodoClient } from "@/lib/dodo";

export async function POST(req: NextRequest) {
  try {
    const { productId, customerEmail, customerName } = await req.json();

    if (!productId) {
      return NextResponse.json({ error: "productId required" }, { status: 400 });
    }

    const payment = await getDodoClient().payments.create({
      billing: {
        city: "N/A",
        country: "US",
        state: "N/A",
        street: "N/A",
        zipcode: "00000",
      },
      customer: {
        email: customerEmail || "",
        name: customerName || "Customer",
      },
      product_cart: [{ product_id: productId, quantity: 1 }],
      payment_link: true,
      return_url: "https://www.flow-forges.com/thank-you",
    });

    return NextResponse.json({ url: (payment as any).payment_link });
  } catch (error: any) {
    console.error("Dodo checkout error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
