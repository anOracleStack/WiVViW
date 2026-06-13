import Link from "next/link";
import { SupabaseStatus } from "@/components/SupabaseStatus";
import { supabaseAdmin } from "@/lib/supabase/admin";

type ProviderHealth = {
  provider_key: string;
  status: string;
  latency_ms: number | null;
  error_rate: number | null;
  last_checked_at: string | null;
};

type ModelRow = {
  id: string;
  provider_key: string;
  model_key: string;
  model_string: string;
  tier: string;
  is_active: boolean;
  cost_input_per_1m: number | null;
  cost_output_per_1m: number | null;
  cost_cached_per_1m: number | null;
  context_window: number | null;
};

async function getData(): Promise<{
  providers: ProviderHealth[];
  models: ModelRow[];
  error?: string;
}> {
  if (!supabaseAdmin) {
    return { providers: [], models: [], error: "Supabase not configured. Add URL and service role key in .env.local." };
  }
  try {
    const [{ data: providers }, { data: models }] = await Promise.all([
      supabaseAdmin.from("provider_health").select("*").order("provider_key", { ascending: true }),
      supabaseAdmin
        .from("model_registry")
        .select("*")
        .order("provider_key", { ascending: true })
        .order("model_key", { ascending: true }),
    ]);
    return {
      providers: (providers ?? []) as ProviderHealth[],
      models: (models ?? []) as ModelRow[],
    };
  } catch (e) {
    return {
      providers: [],
      models: [],
      error: e instanceof Error ? e.message : "Database not configured or unreachable",
    };
  }
}

export default async function ProviderOpsPage() {
  const { providers, models, error } = await getData();

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-2xl font-semibold tracking-tight">Provider & Model Health</h1>
        <p className="mt-1 text-sm text-zinc-400">
          Live view of provider status and configured model costs. This is an internal ops surface;
          users never see it.{" "}
          <Link href="/dashboard/ops/truth" className="text-indigo-400 hover:text-indigo-300">
            Truth receipts →
          </Link>
        </p>
        {error && (
          <p className="mt-2 rounded-lg border border-[hsl(var(--primary-amber)/0.3)] bg-[hsl(var(--primary-amber)/0.1)] px-3 py-2 text-sm text-[hsl(var(--primary-amber))]">
            {error}
          </p>
        )}
        <SupabaseStatus />
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-medium">Providers</h2>
        <div className="overflow-x-auto rounded-lg border border-zinc-800 bg-zinc-950">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-zinc-800 bg-zinc-900/60 text-xs uppercase text-zinc-400">
              <tr>
                <th className="px-4 py-2 font-medium">Provider</th>
                <th className="px-4 py-2 font-medium">Status</th>
                <th className="px-4 py-2 font-medium">Latency (ms)</th>
                <th className="px-4 py-2 font-medium">Error rate</th>
                <th className="px-4 py-2 font-medium">Last checked</th>
              </tr>
            </thead>
            <tbody>
              {providers.length === 0 ? (
                <tr>
                  <td
                    className="px-4 py-3 text-sm text-zinc-500"
                    colSpan={5}
                  >
                    No provider health data yet.
                  </td>
                </tr>
              ) : (
                providers.map((p) => (
                  <tr
                    key={p.provider_key}
                    className="border-t border-zinc-900/80 hover:bg-zinc-900/40"
                  >
                    <td className="px-4 py-2 font-mono text-xs text-zinc-200">
                      {p.provider_key}
                    </td>
                    <td className="px-4 py-2">
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                          p.status === "healthy"
                            ? "bg-emerald-500/10 text-emerald-400"
                            : p.status === "degraded"
                            ? "bg-amber-500/10 text-amber-400"
                            : "bg-rose-500/10 text-rose-400"
                        }`}
                      >
                        <span className="mr-1 h-1.5 w-1.5 rounded-full bg-current" />
                        {p.status}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-xs text-zinc-300">
                      {p.latency_ms ?? "—"}
                    </td>
                    <td className="px-4 py-2 text-xs text-zinc-300">
                      {p.error_rate != null ? `${(p.error_rate * 100).toFixed(1)}%` : "—"}
                    </td>
                    <td className="px-4 py-2 text-xs text-zinc-500">
                      {p.last_checked_at ? new Date(p.last_checked_at).toLocaleString() : "—"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-medium">Models</h2>
        <div className="overflow-x-auto rounded-lg border border-zinc-800 bg-zinc-950">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-zinc-800 bg-zinc-900/60 text-xs uppercase text-zinc-400">
              <tr>
                <th className="px-4 py-2 font-medium">Provider</th>
                <th className="px-4 py-2 font-medium">Key</th>
                <th className="px-4 py-2 font-medium">Model</th>
                <th className="px-4 py-2 font-medium">Tier</th>
                <th className="px-4 py-2 font-medium">Active</th>
                <th className="px-4 py-2 font-medium">Input $/1M</th>
                <th className="px-4 py-2 font-medium">Output $/1M</th>
                <th className="px-4 py-2 font-medium">Cached $/1M</th>
                <th className="px-4 py-2 font-medium">Context</th>
              </tr>
            </thead>
            <tbody>
              {models.length === 0 ? (
                <tr>
                  <td
                    className="px-4 py-3 text-sm text-zinc-500"
                    colSpan={9}
                  >
                    No models configured yet.
                  </td>
                </tr>
              ) : (
                models.map((m) => (
                  <tr
                    key={m.id}
                    className="border-t border-zinc-900/80 hover:bg-zinc-900/40"
                  >
                    <td className="px-4 py-2 font-mono text-xs text-zinc-200">
                      {m.provider_key}
                    </td>
                    <td className="px-4 py-2 font-mono text-xs text-zinc-300">
                      {m.model_key}
                    </td>
                    <td className="px-4 py-2 font-mono text-xs text-zinc-300">
                      {m.model_string}
                    </td>
                    <td className="px-4 py-2 text-xs text-zinc-300">{m.tier}</td>
                    <td className="px-4 py-2 text-xs">
                      {m.is_active ? (
                        <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-400">
                          active
                        </span>
                      ) : (
                        <span className="rounded-full bg-zinc-700/40 px-2 py-0.5 text-xs font-medium text-zinc-400">
                          disabled
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-2 text-xs text-zinc-300">
                      {m.cost_input_per_1m ?? "—"}
                    </td>
                    <td className="px-4 py-2 text-xs text-zinc-300">
                      {m.cost_output_per_1m ?? "—"}
                    </td>
                    <td className="px-4 py-2 text-xs text-zinc-300">
                      {m.cost_cached_per_1m ?? "—"}
                    </td>
                    <td className="px-4 py-2 text-xs text-zinc-300">
                      {m.context_window ? `${m.context_window.toLocaleString()} tokens` : "—"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

