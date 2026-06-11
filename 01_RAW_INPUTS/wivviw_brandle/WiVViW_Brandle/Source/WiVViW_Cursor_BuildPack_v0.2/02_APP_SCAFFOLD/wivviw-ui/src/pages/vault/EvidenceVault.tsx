import { useMemo, useState } from 'react'
import { useStore } from '../../core/store'
import { nanoid } from '../../utils/nanoid'

export default function EvidenceVault() {
  const projectId = useStore(s => s.activeProjectId) || 'global'
  const evidence = useStore(s => s.evidence)
  const addEvidence = useStore(s => s.addEvidence)

  const [title, setTitle] = useState('Domain availability screenshot')
  const [type, setType] = useState<'screenshot'|'pdf'|'link'|'other'>('screenshot')
  const [url, setUrl] = useState('')

  const items = useMemo(() => evidence.filter(e => e.projectId === projectId), [evidence, projectId])

  function addLink() {
    if (!url.trim()) return
    addEvidence({
      id: nanoid(),
      projectId,
      type: 'link',
      title: title || 'Evidence link',
      url,
      createdAt: new Date().toISOString()
    })
    setUrl('')
  }

  function addFile(ev: React.ChangeEvent<HTMLInputElement>) {
    const f = ev.target.files?.[0]
    if (!f) return
    addEvidence({
      id: nanoid(),
      projectId,
      type,
      title: title || f.name,
      fileName: f.name,
      createdAt: new Date().toISOString()
    })
    ev.target.value = ''
  }

  return (
    <div className="p-4">
      <div className="glass rounded-2xl p-5 border border-white/10">
        <div className="text-lg text-white/90">Evidence Vault</div>
        <div className="text-sm text-white/55 mt-1">Upload proof to upgrade claims to VERIFIED.</div>

        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <input className="glass rounded-lg px-3 py-2 border border-white/10 bg-transparent" value={title} onChange={e=>setTitle(e.target.value)} placeholder="Evidence title" />
          <select className="glass rounded-lg px-3 py-2 border border-white/10 bg-transparent" value={type} onChange={(e)=>setType(e.target.value as any)}>
            <option className="bg-black" value="screenshot">screenshot</option>
            <option className="bg-black" value="pdf">pdf</option>
            <option className="bg-black" value="other">other</option>
          </select>
          <input type="file" onChange={addFile} className="block w-full text-sm text-white/60" />
        </div>

        <div className="mt-3 flex gap-2">
          <input className="glass flex-1 rounded-lg px-3 py-2 border border-white/10 bg-transparent" value={url} onChange={e=>setUrl(e.target.value)} placeholder="https://..." />
          <button onClick={addLink} className="rounded-lg px-3 py-2 bg-white/10 hover:bg-white/15 border border-white/10">Add Link</button>
        </div>

        <div className="mt-6 space-y-3">
          {items.map(i => (
            <div key={i.id} className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="text-white/90">{i.title}</div>
              <div className="text-xs text-white/50 mt-1">{i.type} · {new Date(i.createdAt).toLocaleString()}</div>
              {i.url && <div className="text-xs text-sky-200 mt-2 break-all">{i.url}</div>}
              {i.fileName && <div className="text-xs text-white/60 mt-2">{i.fileName}</div>}
            </div>
          ))}
          {items.length === 0 && <div className="text-white/50 text-sm">No evidence items yet.</div>}
        </div>
      </div>
    </div>
  )
}
