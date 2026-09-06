/**
 * Shown only on narrow screens.
 *
 * A printable worksheet or a gear kit is close to useless on a phone, so the
 * highest-intent person on the page arrives in the worst possible context and
 * leaves. This says the obvious thing out loud instead: email it to yourself
 * and come back at a desk. It costs nothing and it turns a guaranteed bounce
 * into someone on the list.
 *
 * No JavaScript and no viewport check: `sm:hidden` means the markup ships to
 * everyone and only phones ever see it, so it cannot flash on desktop or
 * disagree with itself between server and client.
 */
export default function MobileHandoff({
  assetLabel = 'file',
}: {
  /** What the person is here to get, e.g. "worksheet", "kit". */
  assetLabel?: string
}) {
  return (
    <div className="sm:hidden mt-6 rounded-xl border border-white/[0.08] bg-white/[0.02] p-5">
      <p className="font-body text-sm font-bold text-brand-cream/80">
        On your phone right now?
      </p>
      <p className="mt-1.5 font-body text-sm text-brand-cream/50 leading-relaxed">
        Use the form above to email the {assetLabel} to yourself, then pick it up at
        your desk. It will be sitting in your inbox when you sit down.
      </p>
    </div>
  )
}
