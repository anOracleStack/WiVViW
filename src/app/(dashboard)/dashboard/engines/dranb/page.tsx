"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useDashboardAuth } from "@/components/DashboardAuth";
import GlassPanel from "@/components/ui/GlassPanel";
import SectionTitle from "@/components/ui/SectionTitle";
import BalancedText from "@/components/ui/BalancedText";
import EngineStepper from "@/components/os/EngineStepper";
import { ENGINE_REGISTRY } from "@/lib/engines/engine-contract";

const defaultBrief = {
  business_description: "",
  target_audience: "",
  industry: "",
  tone_keywords: [] as string[],
  avoid_keywords: [] as string[],
  competitive_context: "",
  notes: "",
};

const engine = ENGINE_REGISTRY.dranb;

export default function DranbPage() {
  const router = useRouter();
  const { canRun } = useDashboardAuth();
  const [brief, setBrief] = useState(defaultBrief);
  const [toneInput, setToneInput] = useState("");
  const [avoidInput, setAvoidInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addKeyword = (field: "tone_keywords" | "avoid_keywords", value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    setBrief((b) => ({
      ...b,
      [field]: [...b[field], trimmed],
    }));
    if (field === "tone_keywords") setToneInput("");
    else setAvoidInput("");
  };

  const removeKeyword = (field: "tone_keywords" | "avoid_keywords", index: number) => {
    setBrief((b) => ({
      ...b,
      [field]: b[field].filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canRun) {
      setError("Sign up or sign in to run dRANb and get naming results.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/engines/dranb", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(brief),
        credentials: "same-origin",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to start");
      router.push(`/dashboard/engines/dranb/${data.session_id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl text-center">
      <SectionTitle eyebrow={engine.sub} title={engine.label} />
      <BalancedText className="mt-4 text-sm text-[hsl(var(--text-muted))]">
        Submit a brand brief — Clotho, Lachesis,
        <br />
        and Eunoia produce scored finalists.
      </BalancedText>

      <div className="mt-8">
        <EngineStepper current="intake" accentHsl={engine.colorHsl} />
      </div>

      <GlassPanel className="mt-8 text-left" glow="teal">
        <form onSubmit={handleSubmit} className="space-y-5" aria-busy={loading}>
          {error && (
            <div className="rounded-lg border border-[hsl(var(--primary-amber)/0.35)] bg-[hsl(var(--primary-amber)/0.1)] px-4 py-3 text-sm text-[hsl(var(--text-primary))]">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-[hsl(var(--text-primary))]">
              Business description
            </label>
            <textarea
              required
              value={brief.business_description}
              onChange={(e) => setBrief((b) => ({ ...b, business_description: e.target.value }))}
              className="input-field mt-1"
              rows={3}
              placeholder="What does the business do? Who is it for?"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[hsl(var(--text-primary))]">
              Target audience
            </label>
            <input
              type="text"
              required
              value={brief.target_audience}
              onChange={(e) => setBrief((b) => ({ ...b, target_audience: e.target.value }))}
              className="input-field mt-1"
              placeholder="e.g. B2B SaaS buyers, Gen Z consumers"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[hsl(var(--text-primary))]">
              Industry
            </label>
            <input
              type="text"
              required
              value={brief.industry}
              onChange={(e) => setBrief((b) => ({ ...b, industry: e.target.value }))}
              className="input-field mt-1"
              placeholder="e.g. Fintech, Health, DTC"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[hsl(var(--text-primary))]">
              Tone keywords
            </label>
            <div className="mt-1 flex flex-wrap gap-2">
              {brief.tone_keywords.map((k, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 rounded-full border border-[hsl(var(--accent-teal)/0.35)] bg-[hsl(var(--accent-teal)/0.08)] px-2.5 py-0.5 text-sm"
                >
                  {k}
                  <button
                    type="button"
                    onClick={() => removeKeyword("tone_keywords", i)}
                    className="text-[hsl(var(--text-muted))] hover:text-[hsl(var(--text-primary))]"
                  >
                    ×
                  </button>
                </span>
              ))}
              <input
                type="text"
                value={toneInput}
                onChange={(e) => setToneInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addKeyword("tone_keywords", toneInput))
                }
                className="input-field w-32 py-1"
                placeholder="Add…"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[hsl(var(--text-primary))]">
              Avoid keywords
            </label>
            <div className="mt-1 flex flex-wrap gap-2">
              {brief.avoid_keywords.map((k, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 rounded-full border border-[hsl(var(--glass-border))] bg-white/[0.04] px-2.5 py-0.5 text-sm"
                >
                  {k}
                  <button
                    type="button"
                    onClick={() => removeKeyword("avoid_keywords", i)}
                    className="text-[hsl(var(--text-muted))] hover:text-[hsl(var(--text-primary))]"
                  >
                    ×
                  </button>
                </span>
              ))}
              <input
                type="text"
                value={avoidInput}
                onChange={(e) => setAvoidInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addKeyword("avoid_keywords", avoidInput))
                }
                className="input-field w-32 py-1"
                placeholder="Add…"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[hsl(var(--text-primary))]">
              Competitive context (optional)
            </label>
            <textarea
              value={brief.competitive_context}
              onChange={(e) => setBrief((b) => ({ ...b, competitive_context: e.target.value }))}
              className="input-field mt-1"
              rows={2}
              placeholder="Names or brands to differentiate from"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[hsl(var(--text-primary))]">
              Notes (optional)
            </label>
            <textarea
              value={brief.notes}
              onChange={(e) => setBrief((b) => ({ ...b, notes: e.target.value }))}
              className="input-field mt-1"
              rows={2}
              placeholder="Any other constraints or directions"
            />
          </div>

          <div className="pt-2 text-center">
            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? "Starting…" : canRun ? "Run dRANb" : "Sign in to run"}
            </button>
            {!canRun && (
              <p className="mt-3 text-xs text-[hsl(var(--text-muted))]">
                <Link href="/signup" className="text-[hsl(var(--primary-amber))] hover:underline">
                  Create an account
                </Link>{" "}
                to submit briefs and receive output.
              </p>
            )}
          </div>
        </form>
      </GlassPanel>
    </div>
  );
}
