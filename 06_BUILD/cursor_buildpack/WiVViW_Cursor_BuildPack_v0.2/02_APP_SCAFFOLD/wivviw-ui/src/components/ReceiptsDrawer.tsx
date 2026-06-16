import { useMemo, useState } from 'react'
import { useStore } from '../core/store'

export default function ReceiptsDrawer() {
  const [open, setOpen] = useState(false)
  const receipts = useStore(s => s.receipts)
  const activeProjectId = useStore(s => s.activeProjectId)

  const filtered = useMemo(
    () => receipts.filter(r => !activeProjectId || r.projectId === activeProjectId),
    [receipts, activeProjectId]
  )

  return (
    <>
      <button
        onClick={() => setOpen(o => !o)}
        className="glass rounded-lg px-3 py-2 text-sm text-white/90 hover:text-white border border-white/10"
      >
        Receipts
      </button>

      {open && (
        <div className="fixed right-4 top-16 bottom-4 w-[420px] max-w-[92vw] glass rounded-2xl border border-white/10 overflow-hidden z-50">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
            <div className="text-sm tracking-wide text-white/90">Receipts Drawer</div>
            <button onClick={() => setOpen(false)} className="text-white/60 hover:text-white">✕</button>
          </div>

          <div className="p-3 space-y-3 overflow-auto h-full">
            {filtered.length === 0 && (
              <div className="text-white/60 text-sm p-3">No receipts yet.</div>
            )}
            {filtered.map(r => (
              <div key={r.id} className="rounded-xl border border-white/10 p-3 bg-white/5">
                <div className="flex items-center justify-between">
                  <div className="text-xs text-white/70">{r.engine} · {r.step}</div>
                  <div className="text-[11px] text-white/50">{new Date(r.createdAt).toLocaleString()}</div>
                </div>
                <div className="mt-2 text-xs text-white/80">
                  <div className="text-white/60">Inputs</div>
                  <pre className="whitespace-pre-wrap">{JSON.stringify(r.inputs, null, 2)}</pre>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
