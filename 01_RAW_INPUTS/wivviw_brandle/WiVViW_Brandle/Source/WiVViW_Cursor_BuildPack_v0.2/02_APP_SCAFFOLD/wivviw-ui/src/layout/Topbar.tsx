import ReceiptsDrawer from '../components/ReceiptsDrawer'
import { useStore } from '../core/store'

export default function Topbar() {
  const projects = useStore(s => s.projects)
  const activeProjectId = useStore(s => s.activeProjectId)
  const setActiveProject = useStore(s => s.setActiveProject)

  return (
    <header className="flex items-center justify-between p-4">
      <div className="flex items-center gap-3">
        <select
          className="glass rounded-lg px-3 py-2 text-sm border border-white/10 bg-transparent text-white/90"
          value={activeProjectId ?? ''}
          onChange={(e) => setActiveProject(e.target.value)}
        >
          <option value="" className="bg-black">All projects</option>
          {projects.map(p => (
            <option key={p.id} value={p.id} className="bg-black">{p.name}</option>
          ))}
        </select>

        <div className="text-xs text-white/50">Confidence · Receipts · Evidence · Versioning</div>
      </div>

      <div className="flex items-center gap-2">
        <ReceiptsDrawer />
      </div>
    </header>
  )
}
