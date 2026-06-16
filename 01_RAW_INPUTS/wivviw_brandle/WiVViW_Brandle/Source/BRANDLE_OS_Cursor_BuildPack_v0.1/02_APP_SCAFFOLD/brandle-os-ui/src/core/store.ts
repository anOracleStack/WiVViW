import { create } from 'zustand'
import type { Project, BrandGenome, ReceiptEvent, EvidenceItem, Claim } from './brandGenome'

type State = {
  projects: Project[]
  activeProjectId?: string
  genomes: Record<string, BrandGenome>
  receipts: ReceiptEvent[]
  evidence: EvidenceItem[]
  claims: Claim[]
  setActiveProject: (id: string) => void
  upsertProject: (p: Project) => void
  upsertGenome: (g: BrandGenome) => void
  addReceipt: (r: ReceiptEvent) => void
  addEvidence: (e: EvidenceItem) => void
  addClaim: (c: Claim) => void
  linkEvidenceToClaim: (claimId: string, evidenceId: string) => void
}

const LS_KEY = 'brandle_os_v01'

function load(): Partial<State> {
  try {
    const raw = localStorage.getItem(LS_KEY)
    if (!raw) return {}
    return JSON.parse(raw)
  } catch {
    return {}
  }
}

function save(state: Partial<State>) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(state))
  } catch {}
}

export const useStore = create<State>((set, get) => {
  const initial = load()
  const state: State = {
    projects: initial.projects ?? [],
    activeProjectId: initial.activeProjectId,
    genomes: initial.genomes ?? {},
    receipts: initial.receipts ?? [],
    evidence: initial.evidence ?? [],
    claims: initial.claims ?? [],
    setActiveProject: (id) => {
      set({ activeProjectId: id })
      save({ ...get(), activeProjectId: id })
    },
    upsertProject: (p) => {
      const projects = [...get().projects]
      const idx = projects.findIndex(x => x.id === p.id)
      if (idx >= 0) projects[idx] = p
      else projects.unshift(p)
      set({ projects })
      save({ ...get(), projects })
    },
    upsertGenome: (g) => {
      const genomes = { ...get().genomes, [g.projectId]: g }
      set({ genomes })
      save({ ...get(), genomes })
    },
    addReceipt: (r) => {
      const receipts = [r, ...get().receipts].slice(0, 300)
      set({ receipts })
      save({ ...get(), receipts })
    },
    addEvidence: (e) => {
      const evidence = [e, ...get().evidence].slice(0, 300)
      set({ evidence })
      save({ ...get(), evidence })
    },
    addClaim: (c) => {
      const claims = [c, ...get().claims].slice(0, 500)
      set({ claims })
      save({ ...get(), claims })
    },
    linkEvidenceToClaim: (claimId, evidenceId) => {
      const claims = get().claims.map(c => {
        if (c.id !== claimId) return c
        const evidenceIds = Array.from(new Set([...c.evidenceIds, evidenceId]))
        const confidence = evidenceIds.length > 0 ? 'verified' : c.confidence
        return { ...c, evidenceIds, confidence }
      })
      set({ claims })
      save({ ...get(), claims })
    }
  }
  return state
})
