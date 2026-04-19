import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-black px-6 text-center">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">404</p>
      <h1 className="text-2xl font-semibold text-white">Not found</h1>
      <p className="max-w-md text-sm text-zinc-400">
        That route does not exist or was moved. Head back and keep building.
      </p>
      <Link
        href="/"
        className="rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:bg-zinc-200"
      >
        Home
      </Link>
    </main>
  );
}
