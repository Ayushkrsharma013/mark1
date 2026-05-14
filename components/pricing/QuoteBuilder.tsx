"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Bot,
  Workflow,
  Code2,
  BarChart3,
  Shield,
  GlobeIcon,
  Users,
  Clock,
  Mail,
  User,
  Building2,
  Sparkles,
  Loader2,
} from "lucide-react";
import { type CurrencyCode, CURRENCIES, convertINR, formatCurrency } from "@/lib/currency";

const STEPS = ["Services", "Scale", "Timeline", "Estimate"];

const SERVICE_BASE_INR: Record<string, number> = {
  "ai-agent": 50000,
  "workflow-automation": 80000,
  "custom-ai": 150000,
  analytics: 60000,
  strategy: 3000,
  "productized-service": 0, // Special case — subscription
};

function getServices(currency: CurrencyCode) {
  const fmt = currency === "INR"
    ? (n: number) => `From ₹${n.toLocaleString("en-IN")}`
    : (n: number) => `From ${formatCurrency(convertINR(n, currency), currency)}`;

  return [
    {
      id: "ai-agent",
      icon: Bot,
      label: "AI Agent / Chatbot",
      desc: "Custom conversational AI for support, sales, or scheduling",
      price: fmt(50000),
    },
    {
      id: "workflow-automation",
      icon: Workflow,
      label: "Workflow Automation",
      desc: "End-to-end process automation across your stack",
      price: fmt(80000),
    },
    {
      id: "custom-ai",
      icon: Code2,
      label: "Custom AI Development",
      desc: "Bespoke ML models, custom pipelines, deployment",
      price: fmt(150000),
    },
    {
      id: "analytics",
      icon: BarChart3,
      label: "AI Analytics",
      desc: "Predictive dashboards, churn forecasting, revenue modeling",
      price: fmt(60000),
    },
    {
      id: "strategy",
      icon: Shield,
      label: "AI Strategy & Consulting",
      desc: "Operations audit, opportunity sizing, phased roadmap",
      price: fmt(3000),
    },
    {
      id: "productized-service",
      icon: GlobeIcon,
      label: "Productized Service",
      desc: "Prospecting OS — subscription-based lead generation",
      price: "Subscription",
    },
  ];
}

const TEAM_SIZES = [
  { id: "1-10", label: "1–10", desc: "Solo / micro team" },
  { id: "11-50", label: "11–50", desc: "Growing startup" },
  { id: "51-200", label: "51–200", desc: "Scale-up" },
  { id: "200+", label: "200+", desc: "Enterprise" },
];

const TIMELINES = [
  { id: "4-weeks", label: "Fast", desc: "4 weeks — rush delivery", multiplier: "+50%" },
  { id: "8-weeks", label: "Standard", desc: "8 weeks — balanced pace", multiplier: "+15%" },
  { id: "12-weeks", label: "Relaxed", desc: "12 weeks — normal delivery", multiplier: "" },
  { id: "flexible", label: "Flexible", desc: "No hard deadline", multiplier: "" },
];

interface QuoteData {
  services: string[];
  teamSize: string;
  timeline: string;
  name: string;
  email: string;
  company: string;
}

export function QuoteBuilder({ currency }: { currency: CurrencyCode }) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<QuoteData>({
    services: [],
    teamSize: "",
    timeline: "",
    name: "",
    email: "",
    company: "",
  });
  const [loading, setLoading] = useState(false);
  const [estimate, setEstimate] = useState<{
    min: number;
    max: number;
  } | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const SERVICES = useMemo(() => getServices(currency), [currency]);

  function toggleService(id: string) {
    setData((prev) => ({
      ...prev,
      services: prev.services.includes(id)
        ? prev.services.filter((s) => s !== id)
        : [...prev.services, id],
    }));
  }

  function canContinue() {
    if (step === 0) return data.services.length > 0;
    if (step === 1) return data.teamSize !== "";
    if (step === 2) return data.timeline !== "";
    if (step === 3) return data.email !== "" && data.name !== "";
    return true;
  }

  async function handleSubmit() {
    if (!canContinue()) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/pricing/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Something went wrong");

      setEstimate(result.estimate);
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit");
    } finally {
      setLoading(false);
    }
  }

  function formatRange(min: number, max: number) {
    return `${formatCurrency(min, currency)} – ${formatCurrency(max, currency)}`;
  }

  return (
    <div className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] overflow-hidden">
      {/* Step indicators */}
      <div className="flex border-b border-[rgba(255,255,255,0.06)]">
        {STEPS.map((label, i) => (
          <div
            key={label}
            className={`flex-1 text-center py-3 text-xs font-medium transition-colors ${
              i <= step
                ? "text-white border-b-2 border-[#00d4ff]"
                : "text-[#52525b] border-b-2 border-transparent"
            }`}
          >
            {i < step ? (
              <span className="inline-flex items-center gap-1">
                <Check className="w-3 h-3 text-[#00ff88]" />
                {label}
              </span>
            ) : (
              label
            )}
          </div>
        ))}
      </div>

      <div className="p-6 md:p-8">
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="done"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-8"
            >
              <div className="w-16 h-16 rounded-2xl bg-[rgba(0,255,136,0.08)] border border-[rgba(0,255,136,0.15)] flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-7 h-7 text-[#00ff88]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Your estimate is ready
              </h3>
              <div className="inline-flex items-baseline gap-2 mt-3">
                <span className="text-4xl font-bold text-white">
                  {estimate ? formatCurrency(estimate.min, currency) : "..."}
                </span>
                <span className="text-[#52525b]">–</span>
                <span className="text-4xl font-bold text-white">
                  {estimate ? formatCurrency(estimate.max, currency) : "..."}
                </span>
              </div>
              <p className="mt-3 text-sm text-[#a1a1aa]">
                We&apos;ll email you a detailed breakdown within 24 hours.
              </p>
              <p className="mt-2 text-xs text-[#52525b]">
                This is an automated estimate based on your selections.
                Final pricing depends on scope.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
            >
              {/* Step 0: Services */}
              {step === 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">
                    What do you need?
                  </h3>
                  <p className="text-sm text-[#71717a] mb-6">
                    Select all that apply. You can combine services.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {SERVICES.map((svc) => {
                      const selected = data.services.includes(svc.id);
                      const Icon = svc.icon;
                      return (
                        <button
                          key={svc.id}
                          onClick={() => toggleService(svc.id)}
                          className={`text-left p-4 rounded-xl border transition-all duration-200 ${
                            selected
                              ? "border-[rgba(0,212,255,0.3)] bg-[rgba(0,212,255,0.05)] ring-1 ring-[rgba(0,212,255,0.1)]"
                              : "border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] hover:border-[rgba(255,255,255,0.12)]"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                                selected
                                  ? "bg-[rgba(0,212,255,0.12)]"
                                  : "bg-[rgba(255,255,255,0.04)]"
                              }`}
                            >
                              <Icon
                                className={`w-4.5 h-4.5 ${
                                  selected ? "text-[#00d4ff]" : "text-[#52525b]"
                                }`}
                              />
                            </div>
                            <div className="min-w-0">
                              <p
                                className={`text-sm font-medium ${
                                  selected ? "text-white" : "text-[#a1a1aa]"
                                }`}
                              >
                                {svc.label}
                              </p>
                              <p className="text-xs text-[#71717a] mt-0.5">
                                {svc.desc}
                              </p>
                              <p className="text-xs text-[#52525b] mt-1">
                                {svc.price}
                              </p>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 1: Team size */}
              {step === 1 && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">
                    How big is your team?
                  </h3>
                  <p className="text-sm text-[#71717a] mb-6">
                    This helps us estimate integration complexity.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {TEAM_SIZES.map((ts) => {
                      const selected = data.teamSize === ts.id;
                      return (
                        <button
                          key={ts.id}
                          onClick={() =>
                            setData((prev) => ({ ...prev, teamSize: ts.id }))
                          }
                          className={`p-4 rounded-xl border text-center transition-all duration-200 ${
                            selected
                              ? "border-[rgba(0,212,255,0.3)] bg-[rgba(0,212,255,0.05)] ring-1 ring-[rgba(0,212,255,0.1)]"
                              : "border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] hover:border-[rgba(255,255,255,0.12)]"
                          }`}
                        >
                          <Users
                            className={`w-5 h-5 mx-auto mb-2 ${
                              selected ? "text-[#00d4ff]" : "text-[#52525b]"
                            }`}
                          />
                          <p
                            className={`text-base font-semibold ${
                              selected ? "text-white" : "text-[#a1a1aa]"
                            }`}
                          >
                            {ts.label}
                          </p>
                          <p className="text-xs text-[#52525b] mt-0.5">
                            {ts.desc}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 2: Timeline */}
              {step === 2 && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">
                    When do you need it?
                  </h3>
                  <p className="text-sm text-[#71717a] mb-6">
                    Faster delivery typically requires a larger team.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {TIMELINES.map((tl) => {
                      const selected = data.timeline === tl.id;
                      return (
                        <button
                          key={tl.id}
                          onClick={() =>
                            setData((prev) => ({ ...prev, timeline: tl.id }))
                          }
                          className={`flex items-center gap-4 p-4 rounded-xl border text-left transition-all duration-200 ${
                            selected
                              ? "border-[rgba(0,212,255,0.3)] bg-[rgba(0,212,255,0.05)] ring-1 ring-[rgba(0,212,255,0.1)]"
                              : "border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] hover:border-[rgba(255,255,255,0.12)]"
                          }`}
                        >
                          <Clock
                            className={`w-5 h-5 flex-shrink-0 ${
                              selected ? "text-[#00d4ff]" : "text-[#52525b]"
                            }`}
                          />
                          <div>
                            <p
                              className={`text-sm font-semibold ${
                                selected ? "text-white" : "text-[#a1a1aa]"
                              }`}
                            >
                              {tl.label}{" "}
                              {tl.multiplier && (
                                <span
                                  className={`text-xs ${
                                    selected
                                      ? "text-[#00d4ff]/70"
                                      : "text-[#52525b]"
                                  }`}
                                >
                                  ({tl.multiplier})
                                </span>
                              )}
                            </p>
                            <p className="text-xs text-[#52525b] mt-0.5">
                              {tl.desc}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 3: Contact + Submit */}
              {step === 3 && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">
                    Get your estimate
                  </h3>
                  <p className="text-sm text-[#71717a] mb-6">
                    We&apos;ll calculate your range and email you the breakdown.
                  </p>

                  {/* Summary cards */}
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="rounded-lg border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-3 text-center">
                      <p className="text-xs text-[#52525b] mb-1">Services</p>
                      <p className="text-sm font-semibold text-white">
                        {data.services.length}
                      </p>
                    </div>
                    <div className="rounded-lg border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-3 text-center">
                      <p className="text-xs text-[#52525b] mb-1">Team</p>
                      <p className="text-sm font-semibold text-white">
                        {data.teamSize}
                      </p>
                    </div>
                    <div className="rounded-lg border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-3 text-center">
                      <p className="text-xs text-[#52525b] mb-1">Timeline</p>
                      <p className="text-sm font-semibold text-white capitalize">
                        {data.timeline.replace("-", " ")}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="relative">
                      <User className="absolute left-3.5 top-3.5 w-4 h-4 text-[#52525b]" />
                      <input
                        type="text"
                        placeholder="Your name"
                        value={data.name}
                        onChange={(e) =>
                          setData((prev) => ({ ...prev, name: e.target.value }))
                        }
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] text-sm text-white placeholder-[#52525b] focus:outline-none focus:border-[rgba(0,212,255,0.25)] transition-colors"
                      />
                    </div>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-[#52525b]" />
                      <input
                        type="email"
                        placeholder="Your email"
                        required
                        value={data.email}
                        onChange={(e) =>
                          setData((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] text-sm text-white placeholder-[#52525b] focus:outline-none focus:border-[rgba(0,212,255,0.25)] transition-colors"
                      />
                    </div>
                    <div className="relative">
                      <Building2 className="absolute left-3.5 top-3.5 w-4 h-4 text-[#52525b]" />
                      <input
                        type="text"
                        placeholder="Company (optional)"
                        value={data.company}
                        onChange={(e) =>
                          setData((prev) => ({
                            ...prev,
                            company: e.target.value,
                          }))
                        }
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] text-sm text-white placeholder-[#52525b] focus:outline-none focus:border-[rgba(0,212,255,0.25)] transition-colors"
                      />
                    </div>
                  </div>

                  {error && (
                    <p className="mt-4 text-sm text-red-400">{error}</p>
                  )}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        {!submitted && (
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-[rgba(255,255,255,0.06)]">
            <button
              onClick={() => setStep((s) => s - 1)}
              disabled={step === 0}
              className="flex items-center gap-1.5 text-sm text-[#71717a] hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            <div className="flex items-center gap-2">
              <span className="text-xs text-[#52525b]">
                {step + 1} / {STEPS.length}
              </span>
            </div>

            {step < STEPS.length - 1 ? (
              <button
                onClick={() => setStep((s) => s + 1)}
                disabled={!canContinue()}
                className="flex items-center gap-1.5 text-sm font-semibold text-[#00d4ff] hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!canContinue() || loading}
                className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#00d4ff] text-[#04040a] text-sm font-semibold hover:bg-[#00d4ff]/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Calculating...
                  </>
                ) : (
                  <>
                    Get Estimate
                    <Sparkles className="w-4 h-4" />
                  </>
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
