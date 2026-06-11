export type Confidence = 'estimate' | 'likely' | 'verified'

export type Project = {
  id: string
  name: string
  industry?: string
  createdAt: string
  updatedAt: string
}

export type BrandGenome = {
  projectId: string
  toneKeywords: string[]
  competitors: string[]
  constraints: string[]
  values: string[]
  riskTolerance: 'low' | 'medium' | 'high'
  copyTone: 'approachable' | 'neutral' | 'severe'
}

export type Claim = {
  id: string
  projectId: string
  label: string
  confidence: Confidence
  rationale: string
  assumptions: string[]
  evidenceIds: string[]
  createdAt: string
}

export type EvidenceItem = {
  id: string
  projectId: string
  type: 'screenshot' | 'pdf' | 'link' | 'other'
  title: string
  url?: string
  fileName?: string
  createdAt: string
}

export type ReceiptEvent = {
  id: string
  projectId: string
  engine: string
  step: string
  inputs: Record<string, unknown>
  transforms: string[]
  outputs: Record<string, unknown>
  createdAt: string
}
