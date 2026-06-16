import LegalPageShell from "@/components/layout/LegalPageShell";

export default function PrivacyPage() {
  return (
    <LegalPageShell title="Privacy">
      <p className="text-[10px] uppercase tracking-widest text-[hsl(var(--text-muted))]">
        Draft — counsel review required
      </p>
      <p className="mt-4">
        WiVViW collects account information, engine inputs, and session receipts to operate the
        Brand Intelligence OS. Data is processed using Supabase and Vercel infrastructure.
      </p>
      <p className="mt-4">
        Guest sessions may store drafts locally in your browser until you sign in. Authenticated
        data is retained per your project settings.
      </p>
      <p className="mt-4">
        Contact:{" "}
        <a href="mailto:privacy@wivviw.com" className="text-[hsl(var(--text-primary))] underline">
          privacy@wivviw.com
        </a>
      </p>
      <p className="mt-6 text-xs">Last updated: June 14, 2026</p>
    </LegalPageShell>
  );
}
