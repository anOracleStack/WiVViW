import Link from "next/link";
export default function Home() {
  return (
    <main className="min-h-screen bg-genesis flex items-center justify-center">
      <div className="max-w-xl w-full px-6 text-center">
        <div className="text-xs tracking-[0.25em] text-black/50">BRAND INTELLIGENCE ENGINE</div>
        <h1 className="mt-3 text-4xl font-semibold text-black/80">Engine Workspace</h1>
        <p className="mt-4 text-black/60">
          Voice-first workshop with rolling transcript strips, live chapter report, quotes, trends, identity preview, and autonomy mode.
        </p>
        <Link href="/engine" className="inline-flex items-center justify-center mt-8 rounded-full px-7 py-3 bg-black/90 text-white hover:bg-black transition">
          Enter Engine
        </Link>
      </div>
    </main>
  );
}
