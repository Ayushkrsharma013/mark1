export const DODO_PRODUCTS = {
  PROSPECTING_OS_SETUP: process.env.NEXT_PUBLIC_DODO_PROS_SETUP_ID || "",
  PROSPECTING_OS_MONTHLY: process.env.NEXT_PUBLIC_DODO_PROS_MONTHLY_ID || "",
  REMI_SETUP: process.env.NEXT_PUBLIC_DODO_REMI_SETUP_ID || "",
  REMI_MONTHLY: process.env.NEXT_PUBLIC_DODO_REMI_MONTHLY_ID || "",
} as const;

export const DODO_PRODUCT_NAMES: Record<string, string> = {
  [DODO_PRODUCTS.PROSPECTING_OS_SETUP]: "Prospecting OS — Setup",
  [DODO_PRODUCTS.PROSPECTING_OS_MONTHLY]: "Prospecting OS — Monthly",
  [DODO_PRODUCTS.REMI_SETUP]: "Remi — Setup",
  [DODO_PRODUCTS.REMI_MONTHLY]: "Remi — Monthly",
};
