"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
  const { canRun, requestSignup } = useDashboardAuth();
  const [values, setValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canRun) {
      requestSignup("run", engine.friendlyLabel);
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
        <h1
          className="font-display text-3xl font-semibold"
          style={{ color: `hsl(${engine.colorHsl})` }}
        >
          {engine.friendlyLabel}
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm text-[hsl(var(--text-muted))]">{description}</p>
      </div>

      <div className="mt-8">
        <EngineStepper current={phase} accentHsl={engine.colorHsl} />
      </div>

      <form onSubmit={handleSubmit} className="glass-panel mt-8 space-y-4 rounded-2xl p-6">
        {fields.map((f) => (
          <label key={f.key} className="block text-left">
            <span className="text-xs tracking-wide text-[hsl(var(--text-muted))]">{f.label}</span>
            {f.type === "textarea" ? (
              <textarea
                className="input-field mt-1"
                rows={4}
                value={values[f.key] ?? ""}
                onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
              />
            ) : (
              <input
                className="input-field mt-1"
                value={values[f.key] ?? ""}
                onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
              />
            )}
          </label>
        ))}
        {error && <p className="text-sm text-red-400">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full py-3 disabled:opacity-40"
        >
          {loading ? "Running…" : `Run ${engine.friendlyLabel}`}
        </button>
      </form>
    </div>
  );
}
