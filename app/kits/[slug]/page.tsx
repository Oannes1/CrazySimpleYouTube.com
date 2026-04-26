import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import KitBulkButton from '@/components/KitBulkButton'
import { kits } from '@/lib/kits-data'
import { gear } from '@/lib/gear-data'
import { amazonLink } from '@/lib/amazon'

interface PageProps {
  params: { slug: string }
}

export function generateStaticParams() {
  return kits.map((k) => ({ slug: k.slug }))
}

export function generateMetadata({ params }: PageProps): Metadata {
  const kit = kits.find((k) => k.slug === params.slug)
  if (!kit) return { title: 'Kit not found' }
  return {
    title: `${kit.name} | Crazy Simple YouTube Gear Kits`,
    description: `${kit.tagline} ${kit.promise.slice(0, 110)}`,
  }
}

const accentClasses: Record<string, { wash: string; numeral: string; rule: string; pill: string }> = {
  red: {
    wash: 'bg-brand-red',
    numeral: 'text-brand-red/[0.13]',
    rule: 'bg-brand-red',
    pill: 'bg-brand-red/15 text-brand-red border-brand-red/25',
  },
  amber: {
    wash: 'bg-amber-600',
    numeral: 'text-amber-500/[0.13]',
    rule: 'bg-amber-500',
    pill: 'bg-amber-500/15 text-amber-400 border-amber-500/25',
  },
  teal: {
    wash: 'bg-teal-600',
    numeral: 'text-teal-500/[0.13]',
    rule: 'bg-teal-500',
    pill: 'bg-teal-500/15 text-teal-400 border-teal-500/25',
  },
  purple: {
    wash: 'bg-purple-600',
    numeral: 'text-purple-500/[0.13]',
    rule: 'bg-purple-500',
    pill: 'bg-purple-500/15 text-purple-400 border-purple-500/25',
  },
}

export default function KitPage({ params }: PageProps) {
  const kit = kits.find((k) => k.slug === params.slug)
  if (!kit) notFound()

  const cls = accentClasses[kit.accent]
  const idx = kits.findIndex((k) => k.slug === params.slug)
  const prev = idx > 0 ? kits[idx - 1] : null
  const next = idx < kits.length - 1 ? kits[idx + 1] : null

  // Resolve each item against the gear database
  const resolvedItems = kit.items
    .map((it) => {
      const product = gear.find((g) => g.slug === it.slug)
      if (!product) return null
      return { ...it, product }
    })
    .filter((it): it is NonNullable<typeof it> => it !== null)

  // Total price range from items (rough)
  const totalLow = resolvedItems.reduce((sum, it) => sum + it.product.priceLow, 0)
  const totalHigh = resolvedItems.reduce((sum, it) => sum + it.product.priceHigh, 0)

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-brand-charcoal pb-16 noise-overlay">
        {/* Cover hero — editorial design that mirrors the PDF aesthetic */}
        <section className="relative pt-28 sm:pt-32 pb-16 overflow-hidden">
          {/* Watermark numeral */}
          <div
            aria-hidden="true"
            className={`absolute top-20 -left-8 font-display text-[26rem] leading-none ${cls.numeral} select-none pointer-events-none`}
          >
            {String(idx + 1).padStart(2, '0')}
          </div>

          <div className="relative max-w-4xl mx-auto px-5 sm:px-8">
            {/* Breadcrumb */}
            <Link
              href="/kits"
              className="inline-flex items-center gap-1.5 font-body text-xs text-brand-cream/40 hover:text-brand-cream/70 transition-colors mb-8"
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              All kits
            </Link>

            <span className="font-body text-xs sm:text-sm tracking-[0.25em] uppercase text-brand-red font-medium">
              KIT {String(idx + 1).padStart(2, '0')}  ·  {kit.priceRange}
            </span>
            <h1 className="mt-3 font-display text-4xl sm:text-5xl lg:text-6xl font-normal uppercase text-brand-cream leading-[0.95]">
              {kit.name.replace('The ', '').toUpperCase()}
            </h1>
            <p className="mt-5 font-accent text-2xl sm:text-3xl text-brand-red/85">
              {kit.tagline}
            </p>

            {/* Red accent bar */}
            <div className={`mt-6 h-1 w-16 ${cls.rule}`} />

            <p className="mt-7 font-body text-brand-cream/75 text-lg leading-relaxed max-w-2xl">
              {kit.promise}
            </p>

            <div className="mt-7 flex flex-wrap gap-x-8 gap-y-3">
              <div>
                <div className="font-body text-[0.65rem] tracking-[0.2em] uppercase text-brand-cream/35">
                  Built for
                </div>
                <div className="mt-1 font-body text-sm text-brand-cream/80">
                  {kit.audience}
                </div>
              </div>
              <div>
                <div className="font-body text-[0.65rem] tracking-[0.2em] uppercase text-brand-cream/35">
                  Items in kit
                </div>
                <div className="mt-1 font-body text-sm text-brand-cream/80">
                  {resolvedItems.length}
                </div>
              </div>
              <div>
                <div className="font-body text-[0.65rem] tracking-[0.2em] uppercase text-brand-cream/35">
                  Estimated total
                </div>
                <div className="mt-1 font-display text-lg uppercase text-brand-cream">
                  ${totalLow}–${totalHigh}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Description */}
        <section className="relative max-w-3xl mx-auto px-5 sm:px-8 mb-12">
          <div className="rounded-2xl bg-white/[0.02] border border-white/[0.05] p-7 sm:p-9">
            <span className="font-body text-xs tracking-[0.25em] uppercase text-brand-red font-medium">
              Why this kit
            </span>
            <p className="mt-3 font-body text-brand-cream/75 leading-relaxed">
              {kit.description}
            </p>
          </div>
        </section>

        {/* Items list */}
        <section className="relative max-w-4xl mx-auto px-5 sm:px-8 mb-16">
          <div className="mb-8">
            <span className="font-body text-xs tracking-[0.25em] uppercase text-brand-red font-medium">
              The Stack
            </span>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-normal uppercase text-brand-cream">
              What&apos;s in the kit
            </h2>
          </div>

          <div className="space-y-4">
            {resolvedItems.map((it, i) => {
              const buyUrl = amazonLink({
                amazonUrl: it.product.amazonUrl,
                brand: it.product.brand,
                name: it.product.name,
              })
              return (
                <div
                  key={it.slug}
                  className="rounded-2xl bg-white/[0.02] border border-white/[0.06] p-6 sm:p-7 grid sm:grid-cols-[80px_1fr_auto] gap-5 items-start"
                >
                  {/* Big numeral */}
                  <div className={`font-display text-5xl ${cls.numeral.replace('/[0.13]', '')} leading-none`}
                    style={{ color: kit.accent === 'red' ? '#C41230' : kit.accent === 'amber' ? '#E65100' : kit.accent === 'teal' ? '#0d9488' : '#7B1FA2' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </div>

                  {/* Body */}
                  <div className="min-w-0">
                    {it.categoryLabel && (
                      <span className={`inline-flex px-2 py-0.5 rounded-md border text-[0.6rem] font-body font-bold tracking-wider uppercase ${cls.pill}`}>
                        {it.categoryLabel}
                      </span>
                    )}
                    <h3 className="mt-2 font-display text-lg sm:text-xl font-normal uppercase text-brand-cream leading-tight">
                      {it.product.name}
                    </h3>
                    <p className="mt-1 font-body text-xs text-brand-cream/40">
                      {it.product.brand}
                      {it.product.priceLow > 0 && (
                        <>
                          {'  ·  '}
                          <strong className="text-brand-cream/70 font-semibold">
                            {it.product.priceLow === it.product.priceHigh
                              ? `$${it.product.priceLow}`
                              : `$${it.product.priceLow}–${it.product.priceHigh}`}
                          </strong>
                        </>
                      )}
                    </p>
                    <p className="mt-3 font-body text-sm text-brand-cream/65 leading-relaxed">
                      {it.reason}
                    </p>
                  </div>

                  {/* Buy button */}
                  <a
                    href={buyUrl}
                    target="_blank"
                    rel="sponsored noopener noreferrer"
                    className="self-start inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-brand-red text-white font-body font-bold text-sm hover:bg-brand-red-light transition-colors whitespace-nowrap"
                  >
                    View
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              )
            })}
          </div>
        </section>

        {/* Bulk action — get whole kit */}
        <section className="relative max-w-3xl mx-auto px-5 sm:px-8 mb-16">
          <div className="rounded-2xl bg-brand-charcoal-light border border-white/[0.08] overflow-hidden">
            <div className={`h-1.5 ${cls.wash}`} />
            <div className="p-7 sm:p-9 text-center">
              <span className="font-accent text-xl text-brand-red/85">
                save the decision fatigue
              </span>
              <h2 className="mt-2 font-display text-2xl sm:text-3xl font-normal uppercase text-brand-cream leading-[0.95]">
                Buy The Whole Kit
              </h2>
              <p className="mt-3 font-body text-brand-cream/65 leading-relaxed max-w-md mx-auto">
                Click each item above to add to your Amazon cart. Or hit the
                button below to open every item in new tabs at once.
              </p>
              <div className="mt-6 flex flex-col items-center gap-3">
                {/* JS-only multi-tab opener — see component */}
                <KitBulkButton items={resolvedItems.map((it) => amazonLink({
                  amazonUrl: it.product.amazonUrl,
                  brand: it.product.brand,
                  name: it.product.name,
                }))} />
                <p className="font-body text-xs text-brand-cream/30">
                  Affiliate links via{' '}
                  <strong className="text-brand-cream/50 font-semibold">travelnomad-20</strong>.
                  Aaron earns a small commission at no extra cost to you.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Prev/Next */}
        <section className="relative max-w-4xl mx-auto px-5 sm:px-8 mb-12">
          <div className="grid sm:grid-cols-2 gap-3">
            {prev ? (
              <Link
                href={`/kits/${prev.slug}`}
                className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-brand-red/15 transition-colors"
              >
                <div className="font-body text-[0.65rem] tracking-[0.2em] uppercase text-brand-cream/40">
                  ← Previous Kit
                </div>
                <div className="mt-1 font-display uppercase text-brand-cream">
                  {prev.name}
                </div>
              </Link>
            ) : <div />}
            {next ? (
              <Link
                href={`/kits/${next.slug}`}
                className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-brand-red/15 transition-colors text-right"
              >
                <div className="font-body text-[0.65rem] tracking-[0.2em] uppercase text-brand-cream/40">
                  Next Kit →
                </div>
                <div className="mt-1 font-display uppercase text-brand-cream">
                  {next.name}
                </div>
              </Link>
            ) : <div />}
          </div>
        </section>

        {/* Back to all kits */}
        <div className="text-center">
          <Link
            href="/kits"
            className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/10 text-brand-cream/70 hover:border-brand-red/30 hover:text-brand-cream font-body font-semibold rounded-xl transition-colors"
          >
            ← All Kits
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}

