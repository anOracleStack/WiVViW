"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ConfidenceBadge from "./ConfidenceBadge";
import ReceiptsDrawer from "./ReceiptsDrawer";
import type { EngineMeta } from "@/lib/engines/engine-contract";
import type { ConfidenceLevel } from "@/lib/engines/engine-contract";

export default function SessionResult({
  engine,
  sessionId,
  apiPath,
}: {
  engine: EngineMeta;
  sessionId: string;
  apiPath: string;
}) {
  const [state, setState] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const poll = async () => {
      const res = await fetch(`${apiPath}/${sessionId}`, { credentials: "same-origin" });
      const data = await res.json();
      if (cancelled) return;

      const sessionState = data.state ?? data.session?.state ?? data;
      setState(sessionState as Record<string, unknown>);

      const running =
        data.status === "running" ||
        (sessionState as { status?: string })?.status === "running";

      if (running) {
        timer = setTimeout(poll, 2000);
      } else {
        setLoading(false);
      }
    };

    poll();
    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, [sessionId, apiPath]);

  const gate = state?.gate as { passed?: boolean; message?: string } | undefined;
  const output = (state?.output ?? state?.scored ?? state) as Record<string, unknown>;

  return (
    <div className="mx-auto max-w-2xl text-center">
      <h1 className="text-2xl font-semibold" style={{ color: `hsl(${engine.colorHsl})` }}>
        {engine.friendlyLabel}
      </h1>
      <p className="mt-2 text-xs text-white/40">{sessionId}</p>

      {loading && <p className="mt-8 text-sm text-white/50">Processing…</p>}

      {!loading && gate && (
        <div className="mt-6 rounded-lg border border-white/10 p-4">
          <ConfidenceBadge
            value={(gate.passed ? "verified" : "estimate") as ConfidenceLevel}
          />
          <p className="mt-2 text-sm text-white/70">{gate.message}</p>
        </div>
      )}

      {!loading && (
        <pre className="mt-6 max-h-96 overflow-auto rounded-lg border border-white/10 bg-black/50 p-4 text-left text-xs text-white/80">
          {JSON.stringify(output, null, 2)}
        </pre>
      )}

      <div className="mt-6 flex justify-center gap-3">
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          className="rounded-lg border border-white/20 px-4 py-2 text-sm text-white"
        >
          Receipts
        </button>
        <Link href={engine.route} className="rounded-lg bg-white px-4 py-2 text-sm text-black">
          New run
        </Link>
      </div>

      <ReceiptsDrawer sessionId={sessionId} open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
}
