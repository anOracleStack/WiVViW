import Link from "next/link";
import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import {
  DashboardAuthProvider,
  GuestBrowseBanner,
} from "@/components/DashboardAuth";
import Sidebar from "@/components/os/Sidebar";
import Topbar from "@/components/os/Topbar";
import { isEmailAllowed } from "@/lib/auth/allowlist";
import { getOptionalAuthUser } from "@/lib/auth/session";
import { isSupabaseAuthConfigured } from "@/lib/supabase/configured";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  let canRun = !isSupabaseAuthConfigured();
  let email: string | null = null;

  if (isSupabaseAuthConfigured()) {
    const user = await getOptionalAuthUser();
    if (user && !isEmailAllowed(user.email)) {
      redirect("/login?error=access_denied");
    }
    if (user) {
      canRun = true;
      email = user.email ?? null;
    }
  }

  return (
    <DashboardAuthProvider canRun={canRun} email={email}>
      <div className="min-h-screen bg-[#030308] text-zinc-100">
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex min-h-screen flex-1 flex-col">
            <Topbar />
            <main className="flex-1 px-6 py-8">
              <GuestBrowseBanner />
              {children}
            </main>
            <footer className="border-t border-white/5 px-6 py-3 text-center text-xs text-white/30">
              {canRun ? (
                <form action="/auth/sign-out" method="post" className="inline">
                  <button type="submit" className="hover:text-white/60">
                    Sign out{email ? ` (${email})` : ""}
                  </button>
                </form>
              ) : (
                <span>
                  <Link href="/login" className="hover:text-white/60">
                    Sign in
                  </Link>
                  {" · "}
                  <Link href="/signup" className="hover:text-white/60">
                    Sign up
                  </Link>
                </span>
              )}
            </footer>
          </div>
        </div>
      </div>
    </DashboardAuthProvider>
  );
}
