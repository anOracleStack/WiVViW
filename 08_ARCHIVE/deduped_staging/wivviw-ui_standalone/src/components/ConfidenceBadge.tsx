import clsx from 'clsx'
import type { Confidence } from '../core/brandGenome'

export default function ConfidenceBadge({ value }: { value: Confidence }) {
  const label = value.toUpperCase()
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2.5 py-1 text-[11px] tracking-wide border border-white/10',
        value === 'verified' && 'bg-emerald-500/15 text-emerald-200',
        value === 'likely' && 'bg-sky-500/15 text-sky-200',
        value === 'estimate' && 'bg-amber-500/15 text-amber-200',
      )}
      title="Confidence level"
    >
      {label}
    </span>
  )
}
