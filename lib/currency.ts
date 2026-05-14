// Country → currency mapping for western markets + India fallback
// Detection priority: Vercel geo header → Accept-Language → INR fallback

export type CurrencyCode = "USD" | "EUR" | "GBP" | "CAD" | "AUD" | "INR";

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  locale: string;
  rate: number; // 1 INR → this currency
  name: string;
}

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  USD: {
    code: "USD",
    symbol: "$",
    locale: "en-US",
    rate: 0.012,
    name: "US Dollar",
  },
  EUR: {
    code: "EUR",
    symbol: "€",
    locale: "de-DE",
    rate: 0.011,
    name: "Euro",
  },
  GBP: {
    code: "GBP",
    symbol: "£",
    locale: "en-GB",
    rate: 0.0096,
    name: "British Pound",
  },
  CAD: {
    code: "CAD",
    symbol: "CA$",
    locale: "en-CA",
    rate: 0.017,
    name: "Canadian Dollar",
  },
  AUD: {
    code: "AUD",
    symbol: "A$",
    locale: "en-AU",
    rate: 0.018,
    name: "Australian Dollar",
  },
  INR: {
    code: "INR",
    symbol: "₹",
    locale: "en-IN",
    rate: 1,
    name: "Indian Rupee",
  },
};

// Map Vercel country codes to currency
// Vercel provides ISO 3166-1 alpha-2 country codes
const COUNTRY_TO_CURRENCY: Record<string, CurrencyCode> = {
  US: "USD", // United States
  CA: "CAD", // Canada
  GB: "GBP", // United Kingdom
  // Eurozone countries
  AT: "EUR", BE: "EUR", CY: "EUR", EE: "EUR", FI: "EUR",
  FR: "EUR", DE: "EUR", GR: "EUR", IE: "EUR", IT: "EUR",
  LV: "EUR", LT: "EUR", LU: "EUR", MT: "EUR", NL: "EUR",
  PT: "EUR", SK: "EUR", SI: "EUR", ES: "EUR", HR: "EUR",
  // Other EUR users
  AD: "EUR", MC: "EUR", SM: "EUR", VA: "EUR", AX: "EUR",
  ME: "EUR", XK: "EUR",
  AU: "AUD", // Australia
  NZ: "AUD", // New Zealand → show in AUD
  IN: "INR", // India
  // Default western-friendly fallbacks
  CH: "EUR", // Switzerland → EUR
  NO: "EUR", // Norway → EUR
  SE: "EUR", // Sweden → EUR
  DK: "EUR", // Denmark → EUR
  PL: "EUR", // Poland → EUR
  CZ: "EUR", // Czechia → EUR
  HU: "EUR", // Hungary → EUR
  RO: "EUR", // Romania → EUR
  BG: "EUR", // Bulgaria → EUR
  AE: "USD", // UAE → USD
  SA: "USD", // Saudi Arabia → USD
  SG: "USD", // Singapore → USD
  HK: "USD", // Hong Kong → USD
  JP: "USD", // Japan → USD
  KR: "USD", // South Korea → USD
  MX: "USD", // Mexico → USD
  BR: "USD", // Brazil → USD
};

export function getCurrencyFromCountry(
  country?: string | null
): CurrencyCode {
  if (country && country in COUNTRY_TO_CURRENCY) {
    return COUNTRY_TO_CURRENCY[country];
  }
  return "USD"; // Default to USD for western-first strategy
}

export function getCurrencyConfig(country?: string | null): CurrencyConfig {
  const code = getCurrencyFromCountry(country);
  return CURRENCIES[code];
}

export function convertINR(amountINR: number, to: CurrencyCode): number {
  const rate = CURRENCIES[to]?.rate ?? 0.012;
  return Math.round(amountINR * rate);
}

export function convertPriceString(
  inrString: string,
  to: CurrencyCode
): string {
  if (to === "INR") return inrString;

  const config = CURRENCIES[to];

  // Handle "From ₹X,XXX" format
  const match = inrString.match(/^From\s+₹([\d,]+)/);
  if (match) {
    const inrAmount = parseInt(match[1].replace(/,/g, ""), 10);
    const converted = convertINR(inrAmount, to);
    return `From ${formatCurrency(converted, to)}`;
  }

  // Handle "Subscription" or other non-numeric strings
  if (!inrString.includes("₹")) return inrString;

  // Handle plain "₹X,XXX" format
  const plainMatch = inrString.match(/₹([\d,]+)/);
  if (plainMatch) {
    const inrAmount = parseInt(plainMatch[1].replace(/,/g, ""), 10);
    const converted = convertINR(inrAmount, to);
    return formatCurrency(converted, to);
  }

  return inrString;
}

export function formatCurrency(
  amount: number,
  currency: CurrencyCode
): string {
  const config = CURRENCIES[currency];
  return new Intl.NumberFormat(config.locale, {
    style: "currency",
    currency: config.code,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatEstimateRange(
  min: number,
  max: number,
  currency: CurrencyCode
): { min: string; max: string } {
  return {
    min: formatCurrency(min, currency),
    max: formatCurrency(max, currency),
  };
}
