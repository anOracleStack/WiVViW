/** Fallback while RSC payloads stream (marketing routes, etc.). */
export default function RootLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div
        className="h-9 w-9 animate-spin rounded-full border-2 border-zinc-700 border-t-zinc-200"
        aria-label="Loading"
      />
    </div>
  );
}
