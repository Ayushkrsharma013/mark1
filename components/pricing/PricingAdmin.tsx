"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Plus,
  Trash2,
  GripVertical,
  Check,
  X,
  Loader2,
  Sparkles,
  Eye,
  EyeOff,
  ArrowUpDown,
} from "lucide-react";

interface Tier {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted: boolean;
  cta: string;
  href: string;
  sort_order: number;
  active: boolean;
}

const EMPTY_TIER: Omit<Tier, "id"> = {
  name: "",
  price: "",
  period: "",
  description: "",
  features: [""],
  highlighted: false,
  cta: "Book a Call",
  href: "/home/book-demo",
  sort_order: 0,
  active: true,
};

export function PricingAdmin() {
  const [tiers, setTiers] = useState<Tier[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState<Tier | null>(null);
  const [form, setForm] = useState<Omit<Tier, "id">>(EMPTY_TIER);

  const fetchTiers = useCallback(async () => {
    try {
      const res = await fetch("/api/pricing/tiers");
      const data = await res.json();
      if (data.tiers) {
        setTiers(data.tiers);
      }
    } catch {
      setError("Failed to load tiers");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTiers();
  }, [fetchTiers]);

  async function save() {
    if (!form.name || !form.price) {
      setError("Name and price are required");
      return;
    }

    setSaving(true);
    setError("");

    try {
      const method = editing ? "PUT" : "POST";
      const body = editing ? { id: editing.id, ...form } : form;

      const res = await fetch("/api/pricing/tiers", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Failed to save");

      setEditing(null);
      setForm(EMPTY_TIER);
      await fetchTiers();
    } catch {
      setError("Failed to save tier");
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: string) {
    // Soft delete — set active to false
    try {
      const res = await fetch("/api/pricing/tiers", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, active: false }),
      });

      if (!res.ok) throw new Error("Failed to remove");
      await fetchTiers();
    } catch {
      setError("Failed to remove tier");
    }
  }

  async function toggleActive(tier: Tier) {
    try {
      const res = await fetch("/api/pricing/tiers", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: tier.id, active: !tier.active }),
      });

      if (!res.ok) throw new Error("Failed to toggle");
      await fetchTiers();
    } catch {
      setError("Failed to toggle tier");
    }
  }

  function startEdit(tier: Tier) {
    setEditing(tier);
    setForm({
      name: tier.name,
      price: tier.price,
      period: tier.period,
      description: tier.description,
      features: tier.features,
      highlighted: tier.highlighted,
      cta: tier.cta,
      href: tier.href,
      sort_order: tier.sort_order,
      active: tier.active,
    });
  }

  function cancelEdit() {
    setEditing(null);
    setForm(EMPTY_TIER);
    setError("");
  }

  function updateFeature(index: number, value: string) {
    const newFeatures = [...form.features];
    newFeatures[index] = value;
    setForm({ ...form, features: newFeatures });
  }

  function addFeature() {
    setForm({ ...form, features: [...form.features, ""] });
  }

  function removeFeature(index: number) {
    setForm({
      ...form,
      features: form.features.filter((_, i) => i !== index),
    });
  }

  if (loading) {
    return (
      <div className="px-6 py-6 lg:px-8 lg:py-8 flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-6 h-6 text-[#00d4ff] animate-spin" />
      </div>
    );
  }

  return (
    <div className="px-6 py-6 lg:px-8 lg:py-8 max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Pricing Tiers</h1>
          <p className="text-sm text-[#94A3B8] mt-1">
            Manage what visitors see on /pricing. Changes appear instantly.
          </p>
        </div>
        <button
          onClick={() => {
            setEditing(null);
            setForm(EMPTY_TIER);
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#00d4ff] text-[#04040a] text-sm font-semibold hover:bg-[#00d4ff]/90 transition-all"
        >
          <Plus className="w-4 h-4" />
          Add Tier
        </button>
      </div>

      {/* Tier list */}
      <div className="space-y-3">
        {tiers
          .sort((a, b) => a.sort_order - b.sort_order)
          .map((tier) => (
            <div
              key={tier.id}
              className={`rounded-xl border p-5 transition-all ${
                tier.active
                  ? "border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)]"
                  : "border-[rgba(255,255,255,0.04)] bg-[rgba(255,255,255,0.01)] opacity-60"
              }`}
            >
              <div className="flex items-start gap-4">
                <GripVertical className="w-4 h-4 text-[#52525b] mt-1" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-base font-semibold text-white">
                      {tier.name}
                    </h3>
                    {tier.highlighted && (
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[rgba(0,212,255,0.1)] text-[#00d4ff] border border-[rgba(0,212,255,0.15)]">
                        HIGHLIGHTED
                      </span>
                    )}
                    {!tier.active && (
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[rgba(255,255,255,0.05)] text-[#52525b]">
                        HIDDEN
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-[#00d4ff] font-semibold">
                    {tier.price}
                  </p>
                  <p className="text-xs text-[#52525b]">{tier.period}</p>
                  <p className="text-sm text-[#71717a] mt-2">
                    {tier.description}
                  </p>
                  <ul className="mt-2 space-y-0.5">
                    {tier.features?.map((f, i) => (
                      <li key={i} className="text-xs text-[#52525b] flex items-center gap-1.5">
                        <Check className="w-3 h-3 text-[#00ff88]" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center gap-1 flex-shrink-0">
                  <button
                    onClick={() => toggleActive(tier)}
                    className="p-2 rounded-lg text-[#52525b] hover:text-white hover:bg-[rgba(255,255,255,0.05)] transition-all"
                    title={tier.active ? "Hide" : "Show"}
                  >
                    {tier.active ? (
                      <Eye className="w-4 h-4" />
                    ) : (
                      <EyeOff className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={() => startEdit(tier)}
                    className="p-2 rounded-lg text-[#52525b] hover:text-[#00d4ff] hover:bg-[rgba(0,212,255,0.05)] transition-all"
                  >
                    <ArrowUpDown className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => remove(tier.id)}
                    className="p-2 rounded-lg text-[#52525b] hover:text-red-400 hover:bg-[rgba(255,0,0,0.05)] transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Edit form */}
      {(editing || form.name !== "" || form.price !== "") && (
        <div className="rounded-xl border border-[rgba(0,212,255,0.15)] bg-[rgba(255,255,255,0.02)] p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">
              {editing ? `Edit "${editing.name}"` : "New Tier"}
            </h2>
            <button
              onClick={cancelEdit}
              className="p-1.5 rounded-lg text-[#52525b] hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-[#71717a] mb-1">Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-lg border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] px-3 py-2 text-sm text-white placeholder-[#52525b] focus:outline-none focus:border-[rgba(0,212,255,0.2)]"
                placeholder="Starter"
              />
            </div>
            <div>
              <label className="block text-xs text-[#71717a] mb-1">Price</label>
              <input
                type="text"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="w-full rounded-lg border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] px-3 py-2 text-sm text-white placeholder-[#52525b] focus:outline-none focus:border-[rgba(0,212,255,0.2)]"
                placeholder="From ₹50,000"
              />
            </div>
            <div>
              <label className="block text-xs text-[#71717a] mb-1">
                Period
              </label>
              <input
                type="text"
                value={form.period}
                onChange={(e) => setForm({ ...form, period: e.target.value })}
                className="w-full rounded-lg border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] px-3 py-2 text-sm text-white placeholder-[#52525b] focus:outline-none focus:border-[rgba(0,212,255,0.2)]"
                placeholder="per engagement"
              />
            </div>
            <div>
              <label className="block text-xs text-[#71717a] mb-1">CTA</label>
              <input
                type="text"
                value={form.cta}
                onChange={(e) => setForm({ ...form, cta: e.target.value })}
                className="w-full rounded-lg border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] px-3 py-2 text-sm text-white placeholder-[#52525b] focus:outline-none focus:border-[rgba(0,212,255,0.2)]"
                placeholder="Book a Demo"
              />
            </div>
            <div>
              <label className="block text-xs text-[#71717a] mb-1">
                Link
              </label>
              <input
                type="text"
                value={form.href}
                onChange={(e) => setForm({ ...form, href: e.target.value })}
                className="w-full rounded-lg border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] px-3 py-2 text-sm text-white placeholder-[#52525b] focus:outline-none focus:border-[rgba(0,212,255,0.2)]"
                placeholder="/home/book-demo"
              />
            </div>
            <div>
              <label className="block text-xs text-[#71717a] mb-1">
                Sort Order
              </label>
              <input
                type="number"
                value={form.sort_order}
                onChange={(e) =>
                  setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })
                }
                className="w-full rounded-lg border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] px-3 py-2 text-sm text-white placeholder-[#52525b] focus:outline-none focus:border-[rgba(0,212,255,0.2)]"
              />
            </div>
            <div className="flex items-end pb-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.highlighted}
                  onChange={(e) =>
                    setForm({ ...form, highlighted: e.target.checked })
                  }
                  className="w-4 h-4 rounded border-[rgba(255,255,255,0.15)] bg-transparent accent-[#00d4ff]"
                />
                <span className="text-sm text-[#a1a1aa]">Highlighted (Most Popular)</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-xs text-[#71717a] mb-1">
              Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              rows={2}
              className="w-full rounded-lg border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] px-3 py-2 text-sm text-white placeholder-[#52525b] focus:outline-none focus:border-[rgba(0,212,255,0.2)] resize-none"
            />
          </div>

          <div>
            <label className="block text-xs text-[#71717a] mb-1">
              Features
            </label>
            <div className="space-y-2">
              {form.features.map((f, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    type="text"
                    value={f}
                    onChange={(e) => updateFeature(i, e.target.value)}
                    className="flex-1 rounded-lg border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] px-3 py-2 text-sm text-white placeholder-[#52525b] focus:outline-none focus:border-[rgba(0,212,255,0.2)]"
                    placeholder={`Feature ${i + 1}`}
                  />
                  <button
                    onClick={() => removeFeature(i)}
                    className="p-2 rounded-lg text-[#52525b] hover:text-red-400 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={addFeature}
              className="mt-2 text-xs text-[#00d4ff] hover:text-white transition-colors"
            >
              + Add feature
            </button>
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={cancelEdit}
              className="px-4 py-2 rounded-full text-sm text-[#71717a] hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={save}
              disabled={saving}
              className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#00d4ff] text-[#04040a] text-sm font-semibold hover:bg-[#00d4ff]/90 transition-all disabled:opacity-50"
            >
              {saving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4" />
              )}
              {editing ? "Save Changes" : "Create Tier"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
