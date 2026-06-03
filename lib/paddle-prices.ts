// Fill these after Paddle approval + products created
// Get from: vendors.paddle.com > Catalog > Prices

export const PADDLE_PRICES = {
  PROSPECTING_OS_SETUP: process.env.NEXT_PUBLIC_PADDLE_PRICE_PROS_SETUP || "",
  PROSPECTING_OS_MONTHLY:
    process.env.NEXT_PUBLIC_PADDLE_PRICE_PROS_MONTHLY || "",
  REMI_SETUP: process.env.NEXT_PUBLIC_PADDLE_PRICE_REMI_SETUP || "",
  REMI_MONTHLY: process.env.NEXT_PUBLIC_PADDLE_PRICE_REMI_MONTHLY || "",
} as const;
