"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import { isSupabaseAuthConfigured } from "@/lib/supabase/configured";

const POLL_ACTIVE_MS = 1500;
const POLL_BACKGROUND_MS = 8000;
const POLL_POST_STEP3_MS = 2500;
const POLL_POST_STEP3_BACKGROUND_MS = 6000;
const POLL_ERROR_MS = 4000;
const POLL_ERROR_BACKGROUND_MS = 12000;
const MAX_POST_COMPLETE_POLLS = 10;
const SAFETY_SNAPSHOT_MS = 12000;

export interface DranbSessionSnapshot {
  session: { id: string; state: Record<string, unknown> } | null;
  events: Array<{
    id?: string;
    event_type: string;
    payload: Record<string, unknown>;
    created_at: string;
  }>;
  packages: Array<{
    id?: string;
    step_number: number;
    provider: string;
    package_type: string;
    content: unknown;
    tokens_used?: number | null;
    cost_estimate?: number | null;
    latency_ms?: number | null;
  }>;
}

function isPipelineTerminal(d: DranbSessionSnapshot | null): boolean {
  if (!d?.events?.length) return false;
  const completed = new Set(
    d.events
      .filter((e) => e.event_type === "moirai.step.completed")
      .map((e) => (e.payload?.step as number) ?? 0)
  );
  if (!completed.has(3)) return false;
  const pkg = d.packages.find((p) => p.step_number === 3 && p.package_type === "deliverable");
  const finals = (pkg?.content as { finalists?: unknown[] } | undefined)?.finalists;
  return Array.isArray(finals) && finals.length > 0;
}

function mergeEventRow(
  prev: DranbSessionSnapshot | null,
  row: Record<string, unknown>,
  sessionId: string
): DranbSessionSnapshot | null {
  if (!prev) return prev;
  if (String(row.session_id ?? "") !== sessionId) return prev;
  const id = row.id != null ? String(row.id) : undefined;
  const event_type = String(row.event_type ?? "");
  const payload =
    typeof row.payload === "object" && row.payload !== null && !Array.isArray(row.payload)
      ? (row.payload as Record<string, unknown>)
      : {};
  const created_at = String(row.created_at ?? new Date().toISOString());
  if (id && prev.events.some((e) => e.id === id)) return prev;
  const events = [...prev.events, { id, event_type, payload, created_at }].sort(
    (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  );
  return { ...prev, events };
}

function mergePackageRow(
  prev: DranbSessionSnapshot | null,
  row: Record<string, unknown>,
  sessionId: string
): DranbSessionSnapshot | null {
  if (!prev) return prev;
  if (String(row.session_id ?? "") !== sessionId) return prev;
  const id = row.id != null ? String(row.id) : undefined;
  const step_number = Number(row.step_number);
  const provider = String(row.provider ?? "");
  const package_type = String(row.package_type ?? "");
  const pkg = {
    id,
    step_number,
    provider,
    package_type,
    content: row.content,
    tokens_used: row.tokens_used != null ? Number(row.tokens_used) : null,
    cost_estimate: row.cost_estimate != null ? Number(row.cost_estimate) : null,
    latency_ms: row.latency_ms != null ? Number(row.latency_ms) : null,
  };
  const without = id
    ? prev.packages.filter((p) => p.id !== id)
    : prev.packages.filter(
        (p) => !(p.step_number === step_number && p.package_type === package_type)
      );
  const packages = [...without, pkg].sort((a, b) => {
    if (a.step_number !== b.step_number) return a.step_number - b.step_number;
    return String(a.package_type).localeCompare(String(b.package_type));
  });
  return { ...prev, packages };
}

export function useDranbSessionLive(sessionId: string | undefined) {
  const [data, setData] = useState<DranbSessionSnapshot | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [live, setLive] = useState(false);
  const dataRef = useRef<DranbSessionSnapshot | null>(null);
  const supabaseRef = useRef<ReturnType<typeof createBrowserSupabaseClient> | null>(null);

  useEffect(() => {
    dataRef.current = data;
  }, [data]);

  const fetchSnapshot = useCallback(
    async (signal?: AbortSignal) => {
      if (!sessionId) return;
      const r = await fetch(`/api/engines/dranb/${sessionId}`, {
        signal,
        cache: "no-store",
        credentials: "same-origin",
      });
      let parsed: DranbSessionSnapshot & { error?: string };
      try {
        parsed = (await r.json()) as DranbSessionSnapshot & { error?: string };
      } catch {
        setError("Invalid response from server");
        return;
      }
      if (!r.ok) {
        const msg = parsed.error ?? `Request failed (${r.status})`;
        setError(msg);
        if (r.status === 401 || r.status === 403) setData(null);
        return;
      }
      setData(parsed);
      setError(parsed.error ?? null);
    },
    [sessionId]
  );

  useEffect(() => {
    if (!sessionId) return;

    if (!isSupabaseAuthConfigured()) {
      const ac = new AbortController();
      let timeout: ReturnType<typeof setTimeout> | undefined;
      let postCompletePolls = 0;

      const schedule = (ms: number) => {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
          void poll();
        }, ms);
      };

      const poll = async () => {
        try {
          const r = await fetch(`/api/engines/dranb/${sessionId}`, {
            signal: ac.signal,
            cache: "no-store",
            credentials: "same-origin",
          });
          let d: DranbSessionSnapshot & { error?: string };
          try {
            d = (await r.json()) as DranbSessionSnapshot & { error?: string };
          } catch {
            if (ac.signal.aborted) return;
            setError("Invalid response from server");
            schedule(document.hidden ? POLL_ERROR_BACKGROUND_MS : POLL_ERROR_MS);
            return;
          }
          if (ac.signal.aborted) return;
          if (!r.ok) {
            const msg = d.error ?? `Request failed (${r.status})`;
            setError(msg);
            if (r.status === 401 || r.status === 403) setData(null);
            schedule(document.hidden ? POLL_ERROR_BACKGROUND_MS : POLL_ERROR_MS);
            return;
          }
          setData(d);
          setError(d.error ?? null);

          const completed = new Set(
            (d.events ?? [])
              .filter((e) => e.event_type === "moirai.step.completed")
              .map((e) => (e.payload?.step as number) ?? 0)
          );
          const step3Done = completed.has(3);
          const pkg = d.packages?.find(
            (p) => p.step_number === 3 && p.package_type === "deliverable"
          );
          const content = pkg?.content as { finalists?: unknown[] } | undefined;
          const hasFinalists = (content?.finalists?.length ?? 0) > 0;

          if (step3Done && hasFinalists) return;

          if (step3Done && !hasFinalists) {
            postCompletePolls += 1;
            if (postCompletePolls >= MAX_POST_COMPLETE_POLLS) return;
            schedule(document.hidden ? POLL_POST_STEP3_BACKGROUND_MS : POLL_POST_STEP3_MS);
            return;
          }

          schedule(document.hidden ? POLL_BACKGROUND_MS : POLL_ACTIVE_MS);
        } catch (e) {
          if (e instanceof Error && e.name === "AbortError") return;
          setError(e instanceof Error ? e.message : "Failed to load");
          schedule(document.hidden ? POLL_ERROR_BACKGROUND_MS : POLL_ERROR_MS);
        }
      };

      queueMicrotask(() => {
        void poll();
      });
      const onVis = () => {
        if (timeout) clearTimeout(timeout);
        queueMicrotask(() => {
          void poll();
        });
      };
      document.addEventListener("visibilitychange", onVis);
      return () => {
        ac.abort();
        document.removeEventListener("visibilitychange", onVis);
        if (timeout) clearTimeout(timeout);
      };
    }

    const ac = new AbortController();
    queueMicrotask(() => {
      void fetchSnapshot(ac.signal);
    });

    if (!supabaseRef.current) {
      supabaseRef.current = createBrowserSupabaseClient();
    }
    const supabase = supabaseRef.current;
    const filter = `session_id=eq.${sessionId}`;

    const channel = supabase
      .channel(`dranb:${sessionId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "event_log",
          filter,
        },
        (payload) => {
          if (!dataRef.current) {
            void fetchSnapshot();
            return;
          }
          setData((prev) => mergeEventRow(prev, payload.new as Record<string, unknown>, sessionId));
        }
      )
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "moirai_packages",
          filter,
        },
        (payload) => {
          if (!dataRef.current) {
            void fetchSnapshot();
            return;
          }
          setData((prev) =>
            mergePackageRow(prev, payload.new as Record<string, unknown>, sessionId)
          );
        }
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "moirai_packages",
          filter,
        },
        (payload) => {
          if (!dataRef.current) {
            void fetchSnapshot();
            return;
          }
          setData((prev) =>
            mergePackageRow(prev, payload.new as Record<string, unknown>, sessionId)
          );
        }
      )
      .subscribe((status) => {
        if (status === "SUBSCRIBED") setLive(true);
        if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") setLive(false);
      });

    const safety = window.setInterval(() => {
      if (ac.signal.aborted) return;
      if (isPipelineTerminal(dataRef.current)) {
        window.clearInterval(safety);
        return;
      }
      void fetchSnapshot();
    }, SAFETY_SNAPSHOT_MS);

    return () => {
      ac.abort();
      window.clearInterval(safety);
      setLive(false);
      void supabase.removeChannel(channel);
    };
  }, [sessionId, fetchSnapshot]);

  return { data, error, live };
}
