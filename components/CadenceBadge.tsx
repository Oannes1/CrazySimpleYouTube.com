import { TOOL_DROP } from '@/lib/cadence'

/**
 * Says out loud that the library is still growing.
 *
 * The archive here is larger than any competitor's, and it read as finished:
 * nothing on any of the three library pages told a visitor that anything new
 * was coming. An archive nobody promises to add to is a reference; an archive
 * with a stated cadence is a reason to come back and a reason to subscribe.
 *
 * Two weeks, not one. It is the interval Aaron will actually hold, and a
 * cadence that slips is worse than none, which this network has already
 * proved once.
 */
export default function CadenceBadge({ className = '' }: { className?: string }) {
  return (
    <div
      className={`inline-flex items-center gap-2.5 rounded-full border border-brand-red/25 bg-brand-red/[0.06] pl-3 pr-4 py-1.5 ${className}`}
    >
      <span className="relative flex h-2 w-2" aria-hidden="true">
        <span className="absolute inline-flex h-full w-full rounded-full bg-brand-red opacity-60 motion-safe:animate-ping" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-red" />
      </span>
      <span className="font-body text-xs font-semibold text-brand-cream/75">
        {TOOL_DROP.short}
      </span>
    </div>
  )
}
