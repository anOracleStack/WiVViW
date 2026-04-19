"use client";

import { useEffect } from "react";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[dashboard]", error);
  }, [error]);

  return (
    <div className="mx-auto max-w-lg space-y-6 px-6 py-16 text-center">
      <h1 className="text-xl font-semibold text-white">Something broke</h1>
      <p className="text-sm text-zinc-400">
        {error.message || "An unexpected error occurred in the dashboard."}
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-zinc-200"
        >
          Try again
        </button>
        <a
          href="/dashboard"
          className="rounded-lg border border-zinc-600 px-4 py-2 text-sm text-zinc-200 transition hover:border-zinc-500"
        >
          Dashboard home
        </a>
      </div>
    </div>
  );
}
