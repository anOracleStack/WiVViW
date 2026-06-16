import { useMemo, useState } from 'react'
import { useStore } from '../core/store'
import { nanoid } from '../utils/nanoid'

export default function Projects() {
  const projects = useStore(s => s.projects)
  const upsertProject = useStore(s => s.upsertProject)
  const setActiveProject = useStore(s => s.setActiveProject)

  const [name, setName] = useState('TechFlow Rebrand')
  const [industry, setIndustry] = useState('B2B SaaS')

  const sorted = useMemo(() => [...projects].sort((a,b)=> (b.updatedAt.localeCompare(a.updatedAt))), [projects])

  function create() {
    const now = new Date().toISOString()
    const p = { id: nanoid(), name, industry, createdAt: now, updatedAt: now }
    upsertProject(p)
    setActiveProject(p.id)
  }

  return (
    <div className="p-4">
      <div className="glass rounded-2xl p-5 border border-white/10">
        <div className="text-lg text-white/90">Projects</div>
        <div className="text-sm text-white/55 mt-1">Create a project to generate receipts, evidence, and versioned decisions.</div>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <input className="glass rounded-lg px-3 py-2 border border-white/10 bg-transparent" value={name} onChange={e=>setName(e.target.value)} placeholder="Project name" />
          <input className="glass rounded-lg px-3 py-2 border border-white/10 bg-transparent" value={industry} onChange={e=>setIndustry(e.target.value)} placeholder="Industry" />
          <button onClick={create} className="rounded-lg px-3 py-2 bg-white/10 hover:bg-white/15 border border-white/10">New Project</button>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {sorted.map(p => (
            <button key={p.id} onClick={()=>setActiveProject(p.id)} className="text-left rounded-xl border border-white/10 bg-white/5 hover:bg-white/8 p-4">
              <div className="text-white/90">{p.name}</div>
              <div className="text-xs text-white/50 mt-1">{p.industry ?? '—'} · updated {new Date(p.updatedAt).toLocaleString()}</div>
            </button>
          ))}
          {sorted.length === 0 && (
            <div className="text-white/50 text-sm p-4">No projects yet.</div>
          )}
        </div>
      </div>
    </div>
  )
}
