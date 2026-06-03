"use client";
import { useState } from "react";

interface Props {
  productId: string;
  label?: string;
  className?: string;
  customerEmail?: string;
}

export function CheckoutButton({ productId, label = "Get Started", className, customerEmail }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCheckout = async () => {
    if (!productId) {
      setError("Product not configured yet");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/dodo/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, customerEmail }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError("Checkout failed. Please try again.");
      }
    } catch {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleCheckout}
        disabled={loading || !productId}
        className={
          className ||
          "px-8 py-3.5 rounded-full bg-[#e8420a] text-white font-semibold text-sm hover:bg-[#cc3a08] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        }
      >
        {loading ? "Redirecting..." : label}
      </button>
      {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
    </div>
  );
}
