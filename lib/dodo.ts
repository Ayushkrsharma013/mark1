import DodoPayments from "dodopayments";

export const dodo = new DodoPayments({
  bearerToken: process.env.DODO_API_KEY!,
  environment: (process.env.DODO_ENV as "live_mode" | "test_mode") ?? "test_mode",
});
