export default function DashboardLoading() {
  return (
    <div className="animate-pulse space-y-8 px-6 py-8">
      <div className="h-8 w-48 rounded bg-zinc-800" />
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="h-32 rounded-lg border border-zinc-800 bg-zinc-900/40" />
        <div className="h-32 rounded-lg border border-zinc-800 bg-zinc-900/40" />
      </div>
      <div className="h-24 max-w-2xl rounded-lg border border-zinc-800 bg-zinc-900/40" />
    </div>
  );
}
