import { useStore } from '../core/store'

export default function Receipts() {
  const receipts = useStore(s => s.receipts)
  const projectId = useStore(s => s.activeProjectId)

  const list = receipts.filter(r => !projectId || r.projectId === projectId)

  return (
    <div className="p-4">
      <div className="glass rounded-2xl p-5 border border-white/10">
        <div className="text-lg text-white/90">Receipts</div>
        <div className="text-sm text-white/55 mt-1">Global ledger (inputs → transforms → outputs).</div>

        <div className="mt-6 space-y-3">
          {list.map(r => (
            <div key={r.id} className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-white/85">{r.engine} · {r.step}</div>
                <div className="text-xs text-white/50">{new Date(r.createdAt).toLocaleString()}</div>
              </div>
              <pre className="mt-3 text-xs text-white/75 whitespace-pre-wrap">{JSON.stringify(r, null, 2)}</pre>
            </div>
          ))}
          {list.length === 0 && <div className="text-white/50 text-sm">No receipts yet.</div>}
        </div>
      </div>
    </div>
  )
}
