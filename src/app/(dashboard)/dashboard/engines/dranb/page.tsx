"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const defaultBrief = {
  business_description: "",
  target_audience: "",
  industry: "",
  tone_keywords: [] as string[],
  avoid_keywords: [] as string[],
  competitive_context: "",
  notes: "",
};

export default function DranbPage() {
  const router = useRouter();
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
    <div className="max-w-2xl space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">dRANb</h1>
        <p className="mt-1 text-sm text-zinc-400">
          Submit a brand brief. Clotho → Lachesis → Eunoia will run and produce scored finalists.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6" aria-busy={loading}>
        {error && (
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-zinc-300">Business description</label>
          <textarea
            required
            value={brief.business_description}
            onChange={(e) => setBrief((b) => ({ ...b, business_description: e.target.value }))}
            className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white placeholder-zinc-500 focus:border-zinc-600 focus:outline-none"
            rows={3}
            placeholder="What does the business do? Who is it for?"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-300">Target audience</label>
          <input
            type="text"
            required
            value={brief.target_audience}
            onChange={(e) => setBrief((b) => ({ ...b, target_audience: e.target.value }))}
            className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white placeholder-zinc-500 focus:border-zinc-600 focus:outline-none"
            placeholder="e.g. B2B SaaS buyers, Gen Z consumers"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-300">Industry</label>
          <input
            type="text"
            required
            value={brief.industry}
            onChange={(e) => setBrief((b) => ({ ...b, industry: e.target.value }))}
            className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white placeholder-zinc-500 focus:border-zinc-600 focus:outline-none"
            placeholder="e.g. Fintech, Health, DTC"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-300">Tone keywords</label>
          <div className="mt-1 flex flex-wrap gap-2">
            {brief.tone_keywords.map((k, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 rounded-full border border-zinc-700 bg-zinc-800 px-2.5 py-0.5 text-sm"
              >
                {k}
                <button
                  type="button"
                  onClick={() => removeKeyword("tone_keywords", i)}
                  className="text-zinc-400 hover:text-white"
                >
                  ×
                </button>
              </span>
            ))}
            <input
              type="text"
              value={toneInput}
              onChange={(e) => setToneInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addKeyword("tone_keywords", toneInput))}
              className="w-32 rounded border border-zinc-700 bg-zinc-900 px-2 py-1 text-sm focus:border-zinc-600 focus:outline-none"
              placeholder="Add…"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-300">Avoid keywords</label>
          <div className="mt-1 flex flex-wrap gap-2">
            {brief.avoid_keywords.map((k, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 rounded-full border border-zinc-700 bg-zinc-800 px-2.5 py-0.5 text-sm"
              >
                {k}
                <button
                  type="button"
                  onClick={() => removeKeyword("avoid_keywords", i)}
                  className="text-zinc-400 hover:text-white"
                >
                  ×
                </button>
              </span>
            ))}
            <input
              type="text"
              value={avoidInput}
              onChange={(e) => setAvoidInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addKeyword("avoid_keywords", avoidInput))}
              className="w-32 rounded border border-zinc-700 bg-zinc-900 px-2 py-1 text-sm focus:border-zinc-600 focus:outline-none"
              placeholder="Add…"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-300">Competitive context (optional)</label>
          <textarea
            value={brief.competitive_context}
            onChange={(e) => setBrief((b) => ({ ...b, competitive_context: e.target.value }))}
            className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white placeholder-zinc-500 focus:border-zinc-600 focus:outline-none"
            rows={2}
            placeholder="Names or brands to differentiate from"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-300">Notes (optional)</label>
          <textarea
            value={brief.notes}
            onChange={(e) => setBrief((b) => ({ ...b, notes: e.target.value }))}
            className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white placeholder-zinc-500 focus:border-zinc-600 focus:outline-none"
            rows={2}
            placeholder="Any other constraints or directions"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-black transition hover:bg-zinc-200 disabled:opacity-50"
        >
          {loading ? "Starting…" : "Run dRANb"}
        </button>
      </form>
    </div>
  );
}
