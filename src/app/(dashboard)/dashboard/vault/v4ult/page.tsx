"use client";

import { useEffect, useState } from "react";
import { useDashboardAuth } from "@/components/DashboardAuth";

export default function V4ultPage() {
  const { canRun } = useDashboardAuth();
  const [projectId, setProjectId] = useState("");
  const [entries, setEntries] = useState<unknown[]>([]);

  useEffect(() => {
    if (!canRun || !projectId) return;
    fetch(`/api/os/v4ult?project_id=${projectId}`, { credentials: "same-origin" })
      .then((r) => r.json())
      .then((d) => setEntries(d.timeline ?? []))
      .catch(() => setEntries([]));
  }, [canRun, projectId]);

  return (
    <div className="mx-auto max-w-2xl text-center">
      <h1 className="text-2xl font-semibold" style={{ color: "hsl(220 70% 55%)" }}>
        V4ULT Timeline
      </h1>
      <p className="mt-2 text-sm text-white/60">
        Branching decision timeline — every engine run leaves a trail.
      </p>
      <input
        className="mx-auto mt-6 block w-full max-w-md rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm"
        placeholder="Project ID"
        value={projectId}
        onChange={(e) => setProjectId(e.target.value)}
      />
      <ul className="mt-6 space-y-2 text-left text-sm text-white/70">
        {entries.length === 0 && <li className="text-white/40">No runs yet.</li>}
        {entries.map((e, i) => (
          <li key={i} className="rounded border border-white/10 p-3 font-mono text-xs">
            {JSON.stringify(e)}
          </li>
        ))}
      </ul>
    </div>
  );
}
