"use client";

import { useEffect, useState } from "react";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";

const showDiagnostics =
  process.env.NEXT_PUBLIC_APP_ENV === "local" ||
  process.env.NODE_ENV === "development";

export function SupabaseStatus() {
  const [status, setStatus] = useState<"checking" | "connected" | "error">("checking");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    if (!showDiagnostics) return;

    async function check() {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      if (!url || !key || key === "YOUR_ANON_KEY_HERE") {
        setStatus("error");
        setMessage("Add SUPABASE URL and ANON KEY in .env.local");
        return;
      }
      try {
        const supabase = createBrowserSupabaseClient();
        const { error } = await supabase.auth.getSession();
        if (error) {
          setStatus("error");
          setMessage(error.message);
          return;
        }
        setStatus("connected");
        setMessage("Auth API reachable");
      } catch (e) {
        setStatus("error");
        setMessage(e instanceof Error ? e.message : "Connection failed");
      }
    }
    check();
  }, []);

  if (!showDiagnostics) return null;

  return (
    <div className="mx-auto mt-4 max-w-md text-xs text-zinc-500">
      Supabase:{" "}
      {status === "checking" && "checking…"}
      {status === "connected" && (
        <span className="text-emerald-500/90">{message}</span>
      )}
      {status === "error" && (
        <span className="text-amber-500/90">error — {message}</span>
      )}
    </div>
  );
}
