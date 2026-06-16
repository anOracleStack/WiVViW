import { useEffect, useMemo, useState } from 'react'
import { useStore } from '../core/store'

const BACKDROPS = [
  { id: 'noir', poster: 'radial-gradient(900px 500px at 20% 20%, rgba(255,255,255,0.06), transparent 55%), radial-gradient(1200px 700px at 80% 70%, rgba(94,234,212,0.06), transparent 60%)' },
  { id: 'ember', poster: 'radial-gradient(900px 500px at 30% 10%, rgba(250,204,21,0.06), transparent 55%), radial-gradient(1200px 700px at 70% 80%, rgba(248,113,113,0.05), transparent 60%)' },
  { id: 'ice', poster: 'radial-gradient(900px 500px at 25% 20%, rgba(56,189,248,0.06), transparent 55%), radial-gradient(1200px 700px at 80% 75%, rgba(255,255,255,0.04), transparent 60%)' },
]

function hash(s: string) {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return Math.abs(h)
}

export default function Backdrop() {
  const activeProjectId = useStore(s => s.activeProjectId) || 'global'
  const [visit, setVisit] = useState(0)

  useEffect(() => {
    const key = `wivviw_backdrop_visit_${activeProjectId}`
    const v = Number(localStorage.getItem(key) || '0') + 1
    localStorage.setItem(key, String(v))
    setVisit(v)
  }, [activeProjectId])

  const pick = useMemo(() => {
    const idx = hash(activeProjectId + ':' + visit) % BACKDROPS.length
    return BACKDROPS[idx]
  }, [activeProjectId, visit])

  return (
    <div className="fixed inset-0 -z-10 grain">
      <div className="absolute inset-0" style={{ background: pick.poster }} />
      <div className="absolute inset-0 bg-black/60" />
    </div>
  )
}
