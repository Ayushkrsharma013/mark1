"use client";

import { useEffect, useState } from "react";
import { initializePaddle, type Paddle } from "@paddle/paddle-js";

let paddleInstance: Paddle | null = null;

export function usePaddle() {
  const [paddle, setPaddle] = useState<Paddle | null>(paddleInstance);

  useEffect(() => {
    if (paddleInstance) {
      setPaddle(paddleInstance);
      return;
    }

    const token = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;
    const env = process.env.NEXT_PUBLIC_PADDLE_ENV;

    if (!token) return;

    initializePaddle({
      environment: (env as "sandbox" | "production") || "sandbox",
      token,
    }).then((p) => {
      if (p) {
        paddleInstance = p;
        setPaddle(p);
      }
    });
  }, []);

  return paddle;
}
