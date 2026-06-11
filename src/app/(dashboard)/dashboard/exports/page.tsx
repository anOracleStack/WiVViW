"use client";

import { useState } from "react";
import { useDashboardAuth } from "@/components/DashboardAuth";

export default function ExportsPage() {
  const { canRun } = useDashboardAuth();
  const [projectId, setProjectId] = useState("");
  const [content, setContent] = useState<string | null>(null);

  const exportProject = async () => {
    if (!canRun || !projectId) return;
    const res = await fetch("/api/os/exports", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ project_id: projectId, format: "json" }),
      credentials: "same-origin",
    });
    const data = await res.json();
    setContent(data.content ?? data.error ?? "Export failed");
  };

  return (
    <div className="mx-auto max-w-2xl text-center">
      <h1 className="text-2xl font-semibold text-white">Export Chamber</h1>
      <p className="mt-2 text-sm text-white/60">
        Bundle Brand Genome and engine artifacts — watermarked on Twin tier.
      </p>
      <div className="mx-auto mt-8 flex max-w-md gap-2">
        <input
          className="flex-1 rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm"
          placeholder="Project ID"
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
        />
        <button
          type="button"
          onClick={exportProject}
          disabled={!canRun}
          className="rounded-lg bg-white px-4 py-2 text-sm text-black disabled:opacity-40"
        >
          Export
        </button>
      </div>
      {content && (
        <pre className="mt-6 max-h-96 overflow-auto rounded-lg border border-white/10 bg-black/50 p-4 text-left text-xs text-white/80">
          {content}
        </pre>
      )}
    </div>
  );
}
