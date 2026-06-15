import Link from "next/link";
import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import {
  DashboardAuthProvider,
  GuestBrowseBanner,
} from "@/components/DashboardAuth";
import Sidebar from "@/components/os/Sidebar";
import Topbar from "@/components/os/Topbar";
import SiteFooter from "@/components/ui/SiteFooter";
import VoidBackdrop from "@/components/ui/VoidBackdrop";
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
      <div data-shell="workspace" className="relative min-h-screen bg-[hsl(var(--shell-bg))]">
        <VoidBackdrop />
        <div className="relative z-10 flex min-h-screen">
          <Sidebar />
          <div className="flex min-h-screen flex-1 flex-col">
            <Topbar />
            <main className="flex-1 px-8 py-8">
              <GuestBrowseBanner />
              {children}
            </main>
            <footer className="border-t border-[hsl(var(--glass-border))] px-8 py-4">
              <SiteFooter />
              <div className="mt-2 text-center text-xs text-[hsl(var(--text-muted))]">
                {canRun ? (
                  <form action="/auth/sign-out" method="post" className="inline">
                    <button type="submit" className="hover:text-[hsl(var(--primary-amber))]">
                      Sign out{email ? ` (${email})` : ""}
                    </button>
                  </form>
                ) : (
                  <span>
                    <Link href="/login" className="hover:text-[hsl(var(--primary-amber))]">
                      Sign in
                    </Link>
                    {" · "}
                    <Link href="/signup" className="hover:text-[hsl(var(--primary-amber))]">
                      Sign up
                    </Link>
                  </span>
                )}
              </div>
            </footer>
          </div>
        </div>
      </div>
    </DashboardAuthProvider>
  );
}
