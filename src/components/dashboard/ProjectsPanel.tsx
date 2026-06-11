"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useDashboardAuth } from "@/components/DashboardAuth";

interface ProjectRow {
  id: string;
  name: string;
  industry?: string;
  updatedAt: string;
}

export default function ProjectsPanel() {
  const { canRun } = useDashboardAuth();
  const [projects, setProjects] = useState<ProjectRow[]>([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!canRun) return;
    fetch("/api/os/projects", { credentials: "same-origin" })
      .then((r) => r.json())
      .then((d) => setProjects(d.projects ?? []))
      .catch(() => setProjects([]));
  }, [canRun]);

  const createProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/os/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim() }),
        credentials: "same-origin",
      });
      const data = await res.json();
      if (data.project) {
        setProjects((p) => [data.project, ...p]);
        setName("");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-xs tracking-[0.3em] text-white/40">PROJECT HUB</p>
      <h1 className="mt-2 text-3xl font-semibold text-white">Your brand workspace</h1>
      <p className="mx-auto mt-3 max-w-md text-sm text-white/60">
        Each project holds your Brand Genome,
        <br />
        engine runs, and export bundles.
      </p>

      {canRun && (
        <form onSubmit={createProject} className="mx-auto mt-8 flex max-w-md gap-2">
          <input
            className="flex-1 rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm"
            placeholder="Project name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-[#E8B923] px-4 py-2 text-sm font-medium text-black"
          >
            Create
          </button>
        </form>
      )}

      <ul className="mt-8 space-y-3 text-left">
        {projects.map((p) => (
          <li
            key={p.id}
            className="rounded-xl border border-white/10 bg-white/5 p-4"
          >
            <div className="font-medium text-white">{p.name}</div>
            <div className="mt-1 text-xs text-white/40">{p.industry ?? "General"}</div>
            <div className="mt-3 flex flex-wrap gap-2">
              <Link
                href="/dashboard/engines/dranb"
                className="text-xs text-[#E8B923] hover:underline"
              >
                Start dRANb
              </Link>
              <Link href="/dashboard/galaxy" className="text-xs text-white/50 hover:underline">
                Constellation
              </Link>
            </div>
          </li>
        ))}
      </ul>

      {!canRun && (
        <p className="mt-8 text-sm text-white/50">
          Sign in to create projects and run engines.
        </p>
      )}
    </div>
  );
}
