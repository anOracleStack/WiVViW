import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="mt-1 text-sm text-zinc-400">
          Run engines and view sessions. Browse freely — sign in to run and save work.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/dashboard/engines/dranb"
          className="group rounded-lg border border-zinc-800 bg-zinc-900/50 p-6 transition hover:border-indigo-500/35 hover:bg-zinc-900"
        >
          <h2 className="font-medium text-white group-hover:text-indigo-100">dRANb</h2>
          <p className="mt-1 text-sm text-zinc-400">
            Brand naming engine. Submit a brief, get MOIRAI-generated candidates with scores.
          </p>
        </Link>
        <Link
          href="/dashboard/ops/providers"
          className="group rounded-lg border border-zinc-800 bg-zinc-900/50 p-6 transition hover:border-emerald-500/30 hover:bg-zinc-900"
        >
          <h2 className="font-medium text-white group-hover:text-emerald-100">Ops</h2>
          <p className="mt-1 text-sm text-zinc-400">
            Provider health and configuration checks for local development.
          </p>
        </Link>
        <Link
          href="/dashboard/ops/truth"
          className="group rounded-lg border border-zinc-800 bg-zinc-900/50 p-6 transition hover:border-amber-500/30 hover:bg-zinc-900 sm:col-span-2"
        >
          <h2 className="font-medium text-white group-hover:text-amber-100">Truth kernel</h2>
          <p className="mt-1 text-sm text-zinc-400">
            Receipts ledger: attach evidence to sessions with content-hash deduplication.
          </p>
        </Link>
      </div>
    </div>
  );
}
