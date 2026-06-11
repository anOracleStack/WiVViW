"use client";

import { useState } from "react";
import { useDashboardAuth } from "@/components/DashboardAuth";

export default function EvidenceVaultPage() {
  const { canRun } = useDashboardAuth();
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [projectId, setProjectId] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canRun || !projectId || !title) return;
    const res = await fetch("/api/os/evidence", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ project_id: projectId, title, url, type: "link" }),
      credentials: "same-origin",
    });
    const data = await res.json();
    setMessage(res.ok ? "Evidence saved." : data.error ?? "Failed");
  };

  return (
    <div className="mx-auto max-w-lg text-center">
      <h1 className="text-2xl font-semibold text-white">Evidence Vault</h1>
      <p className="mt-2 text-sm text-white/60">
        Upload proof and link it to claims in your Brand Genome.
      </p>
      {canRun ? (
        <form onSubmit={submit} className="mt-8 space-y-3 text-left">
          <input
            className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm"
            placeholder="Project ID"
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
          />
          <input
            className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm"
            placeholder="URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button type="submit" className="w-full rounded-lg bg-white py-2 text-sm text-black">
            Add evidence
          </button>
          {message && <p className="text-sm text-white/60">{message}</p>}
        </form>
      ) : (
        <p className="mt-8 text-sm text-white/50">Sign in to manage evidence.</p>
      )}
    </div>
  );
}
