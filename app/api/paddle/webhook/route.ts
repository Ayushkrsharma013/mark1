import { NextRequest, NextResponse } from "next/server";
import { paddle } from "@/lib/paddle";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  const signature = req.headers.get("paddle-signature");
  const rawBody = await req.text();

  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 401 });
  }

  try {
    const event = paddle.webhooks.unmarshal(
      rawBody,
      process.env.PADDLE_WEBHOOK_SECRET!,
      signature
    );

    switch (event.eventType) {
      case "subscription.created": {
        const sub = event.data as any;
        await supabaseAdmin.from("paddle_subscriptions").upsert({
          paddle_subscription_id: sub.id,
          paddle_customer_id: sub.customerId,
          status: sub.status,
          product_id: sub.items?.[0]?.price?.productId ?? null,
          price_id: sub.items?.[0]?.price?.id ?? null,
          current_period_start: sub.currentBillingPeriod?.startsAt ?? null,
          current_period_end: sub.currentBillingPeriod?.endsAt ?? null,
          customer_email: sub.customData?.email ?? null,
          custom_data: sub.customData ?? {},
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });
        break;
      }

      case "subscription.updated": {
        const sub = event.data as any;
        await supabaseAdmin
          .from("paddle_subscriptions")
          .update({
            status: sub.status,
            current_period_start: sub.currentBillingPeriod?.startsAt ?? null,
            current_period_end: sub.currentBillingPeriod?.endsAt ?? null,
            updated_at: new Date().toISOString(),
          })
          .eq("paddle_subscription_id", sub.id);
        break;
      }

      case "subscription.canceled": {
        const sub = event.data as any;
        await supabaseAdmin
          .from("paddle_subscriptions")
          .update({ status: "canceled", updated_at: new Date().toISOString() })
          .eq("paddle_subscription_id", sub.id);
        break;
      }

      case "transaction.completed": {
        const txn = event.data as any;
        await supabaseAdmin.from("paddle_transactions").upsert({
          paddle_transaction_id: txn.id,
          paddle_customer_id: txn.customerId,
          status: txn.status,
          amount: txn.details?.totals?.total ?? null,
          currency: txn.currencyCode,
          product_id: txn.items?.[0]?.price?.productId ?? null,
          customer_email: txn.customData?.email ?? null,
          custom_data: txn.customData ?? {},
          created_at: new Date().toISOString(),
        });
        break;
      }

      default:
        console.log("Unhandled Paddle event:", event.eventType);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error("Paddle webhook error:", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
