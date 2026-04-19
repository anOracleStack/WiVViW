"use client";

import { useEffect, useState } from "react";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";

export function SupabaseStatus() {
  const [status, setStatus] = useState<"checking" | "connected" | "error">("checking");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    async function check() {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      if (!url || !key || key === "YOUR_ANON_KEY_HERE") {
        setStatus("error");
        setMessage("Add full SUPABASE URL and ANON KEY in .env.local (from Supabase Dashboard → Project Settings → API)");
        return;
      }
      try {
        const supabase = createBrowserSupabaseClient();
        const { error } = await supabase.from("wivviw_users").select("id").limit(1);
        if (error) {
          setStatus("error");
          setMessage(error.message);
          return;
        }
        setStatus("connected");
        setMessage("Remote DB reachable");
      } catch (e) {
        setStatus("error");
        setMessage(e instanceof Error ? e.message : "Connection failed");
      }
    }
    check();
  }, []);

  return (
    <div className="mt-4 text-xs text-zinc-500 max-w-md mx-auto">
      Supabase:{" "}
      {status === "checking" && "checking…"}
      {status === "connected" && (
        <span className="text-emerald-500/90">{message}</span>
      )}
      {status === "error" && (
        <span className="text-amber-500/90">
          error — {message}
        </span>
      )}
    </div>
  );
}
