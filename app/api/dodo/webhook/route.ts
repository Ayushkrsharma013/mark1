import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    const { type, data } = payload;

    switch (type) {
      case "payment.succeeded": {
        await supabase.from("dodo_payments").upsert({
          dodo_payment_id: data.payment_id,
          customer_email: data.customer?.email,
          customer_name: data.customer?.name,
          amount: data.total_amount,
          currency: data.currency,
          status: "succeeded",
          product_id: data.product_cart?.[0]?.product_id,
          created_at: new Date().toISOString(),
        });
        break;
      }
      case "payment.failed": {
        await supabase.from("dodo_payments").upsert({
          dodo_payment_id: data.payment_id,
          customer_email: data.customer?.email,
          status: "failed",
          created_at: new Date().toISOString(),
        });
        break;
      }
      case "subscription.active":
      case "subscription.created": {
        await supabase.from("dodo_subscriptions").upsert({
          dodo_subscription_id: data.subscription_id,
          customer_email: data.customer?.email,
          status: data.status,
          product_id: data.product_id,
          next_billing_date: data.next_billing_date,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });
        break;
      }
      case "subscription.renewed": {
        await supabase
          .from("dodo_subscriptions")
          .update({ status: "active", next_billing_date: data.next_billing_date, updated_at: new Date().toISOString() })
          .eq("dodo_subscription_id", data.subscription_id);
        break;
      }
      case "subscription.cancelled":
      case "subscription.expired": {
        await supabase
          .from("dodo_subscriptions")
          .update({ status: "cancelled", updated_at: new Date().toISOString() })
          .eq("dodo_subscription_id", data.subscription_id);
        break;
      }
      default:
        console.log("Unhandled Dodo event:", type);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
