import { useStore } from '../../core/store'
import { nanoid } from '../../utils/nanoid'
import ConfidenceBadge from '../../components/ConfidenceBadge'

export default function TRESS4() {
  const projectId = useStore(s => s.activeProjectId) || 'global'
  const addReceipt = useStore(s => s.addReceipt)
  const addClaim = useStore(s => s.addClaim)

  function demoRun() {
    const now = new Date().toISOString()
    addReceipt({
      id: nanoid(),
      projectId,
      engine: 'TRESS4',
      step: 'Generate',
      inputs: { prompt: 'demo' },
      transforms: ['scored candidates', 'filtered generic outputs'],
      outputs: { topCandidates: ['Veloxity', 'FlowState'] },
      createdAt: now
    })

    addClaim({
      id: nanoid(),
      projectId,
      label: 'TRESS4 demo claim',
      confidence: 'estimate',
      rationale: 'Placeholder claim to demonstrate confidence labeling + receipts.',
      assumptions: ['No live availability checks performed'],
      evidenceIds: [],
      createdAt: now
    })
  }

  return (
    <div className="p-4">
      <div className="glass rounded-2xl p-5 border border-white/10">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-lg text-white/90">4TRESS Protection Assistant</div>
            <div className="text-sm text-white/55 mt-1">Non-legal trademark readiness & risk framing.</div>
          </div>
          <button onClick={demoRun} className="rounded-lg px-3 py-2 bg-white/10 hover:bg-white/15 border border-white/10">
            Run demo (creates receipt + claim)
          </button>
        </div>

        <div className="mt-5 rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="text-sm text-white/80">Design doctrine</div>
          <div className="text-xs text-white/55 mt-2">
            Calm procedural flow. Glass Box outputs. Confidence badges. Exportable receipts.
          </div>
          <div className="mt-3"><ConfidenceBadge value="estimate" /></div>
        </div>
      </div>
    </div>
  )
}

const title = '4TRESS Protection Assistant'
const subtitle = 'Non-legal trademark readiness & risk framing.'
