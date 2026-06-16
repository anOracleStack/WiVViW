"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useDashboardAuth } from "@/components/DashboardAuth";
import GlassPanel from "@/components/ui/GlassPanel";
import SectionTitle from "@/components/ui/SectionTitle";
import BalancedText from "@/components/ui/BalancedText";

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
      <SectionTitle eyebrow="Project hub" title="Your brand workspace" />
      <BalancedText className="mt-4 text-sm text-[hsl(var(--text-muted))]">
        Each project holds your Brand Genome,
        <br />
        engine runs, and export bundles.
      </BalancedText>

      {canRun && (
        <form onSubmit={createProject} className="mx-auto mt-8 flex max-w-md gap-2">
          <input
            className="input-field flex-1"
            placeholder="Project name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" disabled={loading} className="btn-primary shrink-0">
            Create
          </button>
        </form>
      )}

      <ul className="mt-8 space-y-3 text-left">
        {projects.map((p) => (
          <li key={p.id}>
            <GlassPanel className="p-4">
              <div className="font-display font-bold text-[hsl(var(--text-primary))]">{p.name}</div>
              <div className="mt-1 text-xs text-[hsl(var(--text-muted))]">{p.industry ?? "General"}</div>
              <div className="mt-3 flex flex-wrap justify-center gap-3 sm:justify-start">
                <Link
                  href="/dashboard/engines/dranb"
                  className="text-xs text-[hsl(var(--primary-amber))] hover:underline"
                >
                  Open dRANb
                </Link>
                <Link
                  href="/dashboard/galaxy"
                  className="text-xs text-[hsl(var(--text-muted))] hover:underline"
                >
                  Galaxy
                </Link>
              </div>
            </GlassPanel>
          </li>
        ))}
      </ul>

      {!canRun && (
        <BalancedText className="mt-8 text-sm text-[hsl(var(--text-muted))]">
          Sign in to create projects and run dRANb.
        </BalancedText>
      )}
    </div>
  );
}
