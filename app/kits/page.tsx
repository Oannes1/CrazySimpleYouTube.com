import type { Metadata } from 'next'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { kits } from '@/lib/kits-data'
import { gear } from '@/lib/gear-data'

export const metadata: Metadata = {
  title: 'Curated YouTube Gear Kits | Crazy Simple YouTube',
  description:
    'Pre-built gear kits for YouTube creators. Phone-first starter kit, growth kit, pro studio kit, mobile creator kit, podcast kit. Hand-picked by Aaron Cuha. Tested across 170K subscribers.',
}

const accentClasses: Record<string, { bg: string; numeral: string; border: string }> = {
  red: {
    bg: 'bg-gradient-to-br from-brand-red/[0.16] to-brand-red/[0.03]',
    numeral: 'text-brand-red/[0.10]',
    border: 'border-brand-red/25 hover:border-brand-red/50',
  },
  amber: {
    bg: 'bg-gradient-to-br from-amber-500/[0.10] to-orange-500/[0.02]',
    numeral: 'text-amber-500/[0.10]',
    border: 'border-amber-500/20 hover:border-amber-500/45',
  },
  teal: {
    bg: 'bg-gradient-to-br from-teal-500/[0.10] to-cyan-500/[0.02]',
    numeral: 'text-teal-500/[0.10]',
    border: 'border-teal-500/20 hover:border-teal-500/45',
  },
  purple: {
    bg: 'bg-gradient-to-br from-purple-500/[0.10] to-violet-500/[0.02]',
    numeral: 'text-purple-500/[0.10]',
    border: 'border-purple-500/20 hover:border-purple-500/45',
  },
}

export default function KitsPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-brand-charcoal pt-28 sm:pt-32 pb-16 noise-overlay">
        {/* Hero */}
        <section className="relative max-w-5xl mx-auto px-5 sm:px-8 mb-16">
          <div className="text-center">
            <span className="font-accent text-2xl text-brand-red/90">just buy the kit</span>
            <h1 className="mt-2 font-display text-4xl sm:text-5xl lg:text-6xl font-normal uppercase text-brand-cream leading-[0.95]">
              Done Deciding?
              <br />
              <span className="text-brand-red">Buy The Kit.</span>
            </h1>
            <p className="mt-6 font-body text-brand-cream/65 text-lg leading-relaxed max-w-2xl mx-auto">
              Five kits. Five use cases. Every product hand-picked by Aaron and
              tested across @VanLife (120K) and @GotCoach (50K). Stop reading
              comparison reviews.{' '}
              <strong className="text-brand-cream font-semibold">
                Pick the kit that matches your stage. Start filming.
              </strong>
            </p>
          </div>
        </section>

        {/* Kit grid */}
        <section className="relative max-w-7xl mx-auto px-5 sm:px-8 mb-16">
          <div className="grid lg:grid-cols-2 gap-5">
            {kits.map((kit, i) => {
              const cls = accentClasses[kit.accent]
              const itemCount = kit.items.length
              const productPreview = kit.items
                .slice(0, 3)
                .map((it) => gear.find((g) => g.slug === it.slug)?.name || it.slug)
                .filter(Boolean)
              return (
                <Link
                  key={kit.slug}
                  href={`/kits/${kit.slug}`}
                  className={`group relative rounded-2xl ${cls.bg} border ${cls.border} p-7 sm:p-9 transition-all overflow-hidden flex flex-col`}
                >
                  {/* Watermark numeral */}
                  <div
                    aria-hidden="true"
                    className={`absolute -top-8 -right-4 font-display text-[12rem] leading-none ${cls.numeral} select-none pointer-events-none`}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </div>

                  <div className="relative flex-1 flex flex-col">
                    {kit.featured && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-red text-white text-[0.6rem] font-body font-bold tracking-wider uppercase self-start">
                        Most Popular
                      </span>
                    )}

                    <div className="mt-4 font-body text-[0.7rem] tracking-[0.25em] uppercase text-brand-red font-bold">
                      Kit {String(i + 1).padStart(2, '0')}  ·  {kit.priceRange}
                    </div>

                    <h2 className="mt-2 font-display text-2xl sm:text-3xl font-normal uppercase text-brand-cream leading-[0.95]">
                      {kit.name}
                    </h2>

                    <p className="mt-2 font-accent text-xl text-brand-cream/60">
                      {kit.tagline}
                    </p>

                    <p className="mt-5 font-body text-sm text-brand-cream/60 leading-relaxed flex-1">
                      {kit.audience}
                    </p>

                    {/* Quick item preview */}
                    <div className="mt-5 pt-5 border-t border-white/[0.06]">
                      <div className="font-body text-[0.65rem] tracking-[0.2em] uppercase text-brand-cream/35 mb-2">
                        Includes {itemCount} items
                      </div>
                      <ul className="space-y-1.5">
                        {productPreview.map((name) => (
                          <li
                            key={name}
                            className="flex items-start gap-2 font-body text-xs text-brand-cream/55"
                          >
                            <svg className="w-3 h-3 text-brand-red mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                            {name}
                          </li>
                        ))}
                        {itemCount > 3 && (
                          <li className="font-body text-[0.7rem] text-brand-cream/35 pl-5">
                            + {itemCount - 3} more
                          </li>
                        )}
                      </ul>
                    </div>

                    <div className="mt-6 inline-flex items-center gap-2 font-body font-bold text-brand-red group-hover:text-brand-red-light transition-colors">
                      See the full kit
                      <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>

        {/* FTC + cross-promo */}
        <section className="relative max-w-4xl mx-auto px-5 sm:px-8 grid sm:grid-cols-2 gap-4">
          <a
            href="/gear"
            className="group p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-brand-red/15 transition-colors"
          >
            <div className="font-body text-xs tracking-[0.2em] uppercase text-brand-red font-bold">
              Want to Browse?
            </div>
            <h3 className="mt-2 font-display text-xl font-normal uppercase text-brand-cream">
              The Full Gear Page &rarr;
            </h3>
            <p className="mt-2 font-body text-sm text-brand-cream/55">
              All 65 products, organized by tier. Pick and choose.
            </p>
          </a>
          <a
            href="/prompts/youtube-equipment-advisor"
            className="group p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-brand-red/15 transition-colors"
          >
            <div className="font-body text-xs tracking-[0.2em] uppercase text-brand-red font-bold">
              Stuck Choosing?
            </div>
            <h3 className="mt-2 font-display text-xl font-normal uppercase text-brand-cream">
              AI Equipment Advisor &rarr;
            </h3>
            <p className="mt-2 font-body text-sm text-brand-cream/55">
              Drop your situation into ChatGPT, get a custom pick.
            </p>
          </a>
        </section>

        <p className="mt-12 max-w-3xl mx-auto px-5 sm:px-8 font-body text-xs text-brand-cream/30 text-center">
          <strong className="text-brand-cream/50 font-semibold">
            Affiliate disclosure:
          </strong>{' '}
          Every product link uses Aaron&apos;s Amazon Associates tag. He earns a small
          commission at no extra cost to you. This is the only way the worksheets,
          prompts, and resources on this site stay free.
        </p>
      </main>
      <Footer />
    </>
  )
}
