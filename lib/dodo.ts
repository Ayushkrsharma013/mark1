import DodoPayments from "dodopayments";

let _dodo: DodoPayments | null = null;

export function getDodoClient(): DodoPayments {
  if (!_dodo) {
    const key = process.env.DODO_API_KEY;
    if (!key) throw new Error("DODO_API_KEY is not set");
    _dodo = new DodoPayments({
      bearerToken: key,
      environment: (process.env.DODO_ENV as "live_mode" | "test_mode") ?? "test_mode",
    });
  }
  return _dodo;
}
