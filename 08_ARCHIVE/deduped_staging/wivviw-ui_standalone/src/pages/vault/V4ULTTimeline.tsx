import { useMemo } from 'react'
import { useStore } from '../../core/store'

export default function V4ULTTimeline() {
  const projectId = useStore(s => s.activeProjectId) || 'global'
  const receipts = useStore(s => s.receipts)
  const claims = useStore(s => s.claims)

  const events = useMemo(() => {
    const r = receipts.filter(x => x.projectId === projectId).map(x => ({ type: 'receipt' as const, at: x.createdAt, payload: x }))
    const c = claims.filter(x => x.projectId === projectId).map(x => ({ type: 'claim' as const, at: x.createdAt, payload: x }))
    return [...r, ...c].sort((a,b)=> b.at.localeCompare(a.at))
  }, [receipts, claims, projectId])

  return (
    <div className="p-4">
      <div className="glass rounded-2xl p-5 border border-white/10">
        <div className="text-lg text-white/90">V4ULT Timeline</div>
        <div className="text-sm text-white/55 mt-1">Versioned trail (MVP): receipts + claims in time order.</div>

        <div className="mt-6 space-y-3">
          {events.map((e, idx) => (
            <div key={idx} className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs text-white/55">{new Date(e.at).toLocaleString()} · {e.type.toUpperCase()}</div>
              <pre className="mt-2 text-xs text-white/75 whitespace-pre-wrap">{JSON.stringify(e.payload, null, 2)}</pre>
            </div>
          ))}
          {events.length === 0 && <div className="text-white/50 text-sm">No timeline events yet.</div>}
        </div>
      </div>
    </div>
  )
}
