"use client";

import { useState } from "react";
import { usePaddle } from "@/components/providers/PaddleProvider";

interface CheckoutButtonProps {
  priceId: string;
  label?: string;
  className?: string;
  customerEmail?: string;
}

export function CheckoutButton({
  priceId,
  label = "Get Started",
  className,
  customerEmail,
}: CheckoutButtonProps) {
  const paddle = usePaddle();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (!paddle || !priceId) return;
    setLoading(true);

    try {
      paddle.Checkout.open({
        items: [{ priceId, quantity: 1 }],
        customer: customerEmail ? { email: customerEmail } : undefined,
        settings: {
          displayMode: "overlay",
          theme: "dark",
          locale: "en",
        },
      });
    } catch (error) {
      console.error("Checkout error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading || !paddle || !priceId}
      className={
        className ||
        `px-8 py-3.5 rounded-full bg-[#e8420a] text-white font-semibold text-sm hover:bg-[#cc3a08] transition-colors disabled:opacity-50 disabled:cursor-not-allowed`
      }
    >
      {loading ? "Loading..." : label}
    </button>
  );
}
