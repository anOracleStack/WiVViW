"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useDashboardAuth } from "@/components/DashboardAuth";
import EngineStepper from "./EngineStepper";
import type { EngineMeta } from "@/lib/engines/engine-contract";
import type { EnginePhase } from "@/lib/engines/engine-contract";

export default function EngineWorkbench({
  engine,
  phase = "intake",
  description,
  fields,
  apiPath,
}: {
  engine: EngineMeta;
  phase?: EnginePhase;
  description: string;
  fields: { key: string; label: string; type?: "text" | "textarea" }[];
  apiPath: string;
}) {
  const router = useRouter();
  const { canRun } = useDashboardAuth();
  const [values, setValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canRun) {
      setError("Sign in to run this engine.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(apiPath, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
        credentials: "same-origin",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Run failed");
      router.push(`${engine.route}/${data.session_id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Run failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <div className="text-center">
        <p className="text-xs tracking-[0.3em] text-white/40">{engine.sub.toUpperCase()}</p>
        <h1
          className="mt-2 text-3xl font-semibold"
          style={{ color: `hsl(${engine.colorHsl})` }}
        >
          {engine.label}
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm text-white/60">{description}</p>
      </div>

      <div className="mt-8">
        <EngineStepper current={phase} accentHsl={engine.colorHsl} />
      </div>

      {!canRun && (
        <p className="mt-6 text-center text-sm text-amber-200/90">
          Browse mode —{" "}
          <Link href="/signup" className="underline">
            sign up
          </Link>{" "}
          to run {engine.label}.
        </p>
      )}

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        {fields.map((f) => (
          <label key={f.key} className="block">
            <span className="text-xs tracking-wide text-white/50">{f.label}</span>
            {f.type === "textarea" ? (
              <textarea
                className="mt-1 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white"
                rows={4}
                value={values[f.key] ?? ""}
                onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
              />
            ) : (
              <input
                className="mt-1 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white"
                value={values[f.key] ?? ""}
                onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
              />
            )}
          </label>
        ))}
        {error && <p className="text-sm text-red-400">{error}</p>}
        <button
          type="submit"
          disabled={loading || !canRun}
          className="w-full rounded-lg py-3 text-sm font-medium text-black disabled:opacity-40"
          style={{ backgroundColor: `hsl(${engine.colorHsl})` }}
        >
          {loading ? "Running…" : `Run ${engine.label}`}
        </button>
      </form>
    </div>
  );
}
