import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import GearCard from '@/components/GearCard'
import { gear, type GearTier } from '@/lib/gear-data'

export const metadata: Metadata = {
  title: 'YouTube Equipment Guide | Aaron Cuha',
  description:
    'The cameras, mics, lights, and tools Aaron Cuha actually uses across @VanLife (120K) and @GotCoach (50K). Updated for 2026. Real recommendations, real affiliate links.',
}

const tierOrder: GearTier[] = ['starter', 'growth', 'pro']

const tierMeta: Record<GearTier, { name: string; range: string; subtitle: string }> = {
  starter: {
    name: 'Starter Tier',
    range: '$0 to $500',
    subtitle: 'Anyone starting out with no budget pressure.',
  },
  growth: {
    name: 'Growth Tier',
    range: '$500 to $2,000',
    subtitle: 'Channels generating leads, ready to upgrade.',
  },
  pro: {
    name: 'Pro Tier',
    range: '$2,000 to $5,000+',
    subtitle: 'Channels with revenue, ready to scale production quality.',
  },
}

const aaronSetup = gear.filter((g) => g.aaronUses)
const hardwareCategories = [
  'camera',
  'lens',
  'lavalier-mic',
  'usb-mic',
  'dynamic-mic',
  'shotgun-mic',
  'lighting',
  'teleprompter',
  'tripod',
  'gimbal',
  'drone',
  'storage',
  'streamdeck',
  'accessory',
] as const

const softwareCategories = [
  'software-editing',
  'software-ai',
  'software-growth',
  'software-leadgen',
  'software-repurpose',
] as const

const isHardware = (cat: string) =>
  (hardwareCategories as readonly string[]).includes(cat)
const isSoftware = (cat: string) =>
  (softwareCategories as readonly string[]).includes(cat)

export default function GearPage() {
  const hardware = gear.filter((g) => isHardware(g.category))
  const software = gear.filter((g) => isSoftware(g.category))

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-brand-charcoal pt-28 sm:pt-32 pb-16 noise-overlay">
        {/* Hero */}
        <section className="relative max-w-5xl mx-auto px-5 sm:px-8 mb-10">
          <div className="text-center">
            <span className="font-body text-xs sm:text-sm tracking-[0.25em] uppercase text-brand-red font-medium">
              Updated for 2026
            </span>
            <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-normal uppercase text-brand-cream leading-[0.95]">
              The Gear I
              <br />
              <span className="text-brand-red">Actually Use</span>
            </h1>
            <p className="mt-6 font-body text-brand-cream/65 text-lg leading-relaxed max-w-2xl mx-auto">
              No sponsored picks. No theoretical lists. This is what runs across{' '}
              <strong className="text-brand-cream font-semibold">
                @VanLife (120K subs)
              </strong>{' '}
              and{' '}
              <strong className="text-brand-cream font-semibold">
                @GotCoach (50K subs)
              </strong>{' '}
              right now.
            </p>
          </div>

          {/* FTC disclosure */}
          <div className="mt-8 max-w-2xl mx-auto p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] text-center">
            <p className="font-body text-xs text-brand-cream/40 leading-relaxed">
              Some links on this page are affiliate links. If you buy through
              them, Aaron earns a small commission at no extra cost to you.{' '}
              <strong className="text-brand-cream/70 font-semibold">
                Only gear personally tested or used by clients is featured here.
              </strong>
            </p>
          </div>
        </section>

        {/* Curated Kits — Aaron's complete pre-built shopping lists */}
        <section className="relative max-w-6xl mx-auto px-5 sm:px-8 mb-20">
          <div className="text-center mb-10">
            <span className="font-accent text-2xl text-brand-red/90">just buy the whole kit</span>
            <h2 className="mt-1 font-display text-3xl sm:text-4xl lg:text-5xl font-normal uppercase text-brand-cream">
              Aaron&apos;s Curated <span className="text-brand-red">Shopping Lists</span>
            </h2>
            <p className="mt-4 font-body text-brand-cream/55 max-w-2xl mx-auto leading-relaxed">
              Done deciding? Aaron&apos;s built two complete shopping lists on
              his Amazon storefront. Every product hand-picked, tested, and
              ready to buy in one click.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {/* YouTube Starter Kit */}
            <a
              href="https://www.amazon.com/shop/earth.magazine/list/34BYBXHTOLXZ2"
              target="_blank"
              rel="sponsored noopener noreferrer"
              className="group relative rounded-2xl bg-gradient-to-br from-brand-red/[0.18] to-brand-red/[0.04] border border-brand-red/20 hover:border-brand-red/45 p-7 sm:p-8 transition-all overflow-hidden"
            >
              {/* Big watermark numeral */}
              <div
                aria-hidden="true"
                className="absolute -top-6 -right-6 font-display text-[10rem] leading-none text-brand-red/[0.08] select-none pointer-events-none"
              >
                01
              </div>

              <div className="relative">
                <div className="font-body text-[0.7rem] tracking-[0.25em] uppercase text-brand-red font-bold">
                  Kit 01 · Most Popular
                </div>
                <h3 className="mt-3 font-display text-2xl sm:text-3xl font-normal uppercase text-brand-cream leading-[0.95]">
                  YouTube Starter Kit
                </h3>
                <p className="mt-4 font-body text-sm text-brand-cream/65 leading-relaxed">
                  Camera, microphone, lighting, tripod, accessories. Everything
                  you need to film your first 30 videos at a quality level your
                  audience will respect.
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {['Camera', 'Mic', 'Lighting', 'Tripod', 'SD Storage'].map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.06] font-body text-[0.65rem] text-brand-cream/55"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-brand-red text-white font-body font-bold text-sm group-hover:bg-brand-red-light transition-colors shadow-lg shadow-brand-red/20">
                  Shop the Kit on Amazon
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </a>

            {/* Podcast Kit */}
            <a
              href="https://www.amazon.com/shop/earth.magazine/list/14QTZEVL6Y4BP"
              target="_blank"
              rel="sponsored noopener noreferrer"
              className="group relative rounded-2xl bg-white/[0.025] border border-white/[0.08] hover:border-brand-red/30 p-7 sm:p-8 transition-all overflow-hidden"
            >
              <div
                aria-hidden="true"
                className="absolute -top-6 -right-6 font-display text-[10rem] leading-none text-brand-cream/[0.04] select-none pointer-events-none"
              >
                02
              </div>

              <div className="relative">
                <div className="font-body text-[0.7rem] tracking-[0.25em] uppercase text-brand-red font-bold">
                  Kit 02 · For Audio Creators
                </div>
                <h3 className="mt-3 font-display text-2xl sm:text-3xl font-normal uppercase text-brand-cream leading-[0.95]">
                  Podcast Kit
                </h3>
                <p className="mt-4 font-body text-sm text-brand-cream/65 leading-relaxed">
                  Studio-quality audio without the studio price tag.
                  Microphones, interfaces, headphones, and acoustic treatment
                  Aaron has tested for podcasts and remote recording.
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {['XLR Mic', 'Interface', 'Headphones', 'Stand', 'Treatment'].map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.06] font-body text-[0.65rem] text-brand-cream/55"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-brand-red/40 text-brand-red font-body font-bold text-sm hover:bg-brand-red/10 transition-colors">
                  Shop the Kit on Amazon
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </a>
          </div>

          <p className="mt-6 text-center font-body text-xs text-brand-cream/35">
            Both kits link to Aaron&apos;s Amazon Influencer storefront. Every
            click and purchase supports the free resources on this site.
          </p>
        </section>

        {/* Aaron's Setup featured */}
        {aaronSetup.length > 0 && (
          <section className="relative max-w-7xl mx-auto px-5 sm:px-8 mb-16">
            <div className="text-center mb-8">
              <span className="font-body text-xs tracking-[0.25em] uppercase text-brand-red font-medium">
                The Setup
              </span>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl font-normal uppercase text-brand-cream">
                Aaron&apos;s Personal Setup
              </h2>
              <p className="mt-3 font-body text-brand-cream/50">
                What&apos;s actually filming the videos right now.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {aaronSetup.map((p) => (
                <GearCard key={p.slug} product={p} />
              ))}
            </div>
          </section>
        )}

        {/* Hardware by tier */}
        <section className="relative max-w-7xl mx-auto px-5 sm:px-8 mb-16">
          <div className="mb-8">
            <span className="font-body text-xs tracking-[0.25em] uppercase text-brand-red font-medium">
              Hardware
            </span>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-normal uppercase text-brand-cream">
              By Tier and Use Case
            </h2>
          </div>

          {tierOrder.map((tier) => {
            const items = hardware.filter((g) => g.tier === tier)
            if (items.length === 0) return null
            const meta = tierMeta[tier]
            return (
              <div key={tier} className="mb-12 last:mb-0">
                <div className="mb-5">
                  <h3 className="font-display text-2xl font-normal uppercase text-brand-cream">
                    {meta.name}{' '}
                    <span className="text-brand-cream/40">{meta.range}</span>
                  </h3>
                  <p className="mt-1 font-body text-sm text-brand-cream/40">
                    {meta.subtitle}
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {items.map((p) => (
                    <GearCard key={p.slug} product={p} />
                  ))}
                </div>
              </div>
            )
          })}
        </section>

        {/* Software stack */}
        {software.length > 0 && (
          <section className="relative max-w-7xl mx-auto px-5 sm:px-8 mb-16">
            <div className="mb-8">
              <span className="font-body text-xs tracking-[0.25em] uppercase text-brand-red font-medium">
                Software Stack
              </span>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl font-normal uppercase text-brand-cream">
                The Tools That Run It All
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {software.map((p) => (
                <GearCard key={p.slug} product={p} />
              ))}
            </div>
          </section>
        )}

        {/* The principle */}
        <section className="relative max-w-3xl mx-auto px-5 sm:px-8 mb-16">
          <div className="rounded-2xl bg-gradient-to-br from-brand-red/[0.08] to-brand-red/[0.02] border border-brand-red/15 p-7 sm:p-9">
            <h2 className="font-display text-2xl sm:text-3xl font-normal uppercase text-brand-cream">
              The Principle
            </h2>
            <p className="mt-4 font-body text-brand-cream/70 leading-relaxed">
              Tools don&apos;t build channels.{' '}
              <strong className="text-brand-cream font-semibold">You do.</strong>{' '}
              The creator with a smartphone and a $50 mic who publishes twice a
              week will outperform the creator with $10,000 in gear who publishes
              twice a month. Every single time.
            </p>
            <p className="mt-3 font-body text-brand-cream/70 leading-relaxed">
              Start with what you have. Upgrade when it&apos;s the bottleneck,
              not when it&apos;s the excuse.
            </p>
          </div>
        </section>

        {/* Cross-promo */}
        <section className="relative max-w-3xl mx-auto px-5 sm:px-8 grid sm:grid-cols-2 gap-4">
          <a
            href="/prompts/youtube-equipment-advisor"
            className="group p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-brand-red/15 transition-colors"
          >
            <div className="font-body text-xs tracking-[0.2em] uppercase text-brand-red font-bold">
              Stuck Choosing?
            </div>
            <h3 className="mt-2 font-display text-xl font-normal uppercase text-brand-cream">
              Run the AI Advisor &rarr;
            </h3>
            <p className="mt-2 font-body text-sm text-brand-cream/55">
              Paste your situation into ChatGPT or Claude and get a custom pick.
            </p>
          </a>
          <a
            href="/work-with-me"
            className="group p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-brand-red/15 transition-colors"
          >
            <div className="font-body text-xs tracking-[0.2em] uppercase text-brand-red font-bold">
              Want It Done For You?
            </div>
            <h3 className="mt-2 font-display text-xl font-normal uppercase text-brand-cream">
              Work With Aaron &rarr;
            </h3>
            <p className="mt-2 font-body text-sm text-brand-cream/55">
              From coaching to full done-for-you channel management.
            </p>
          </a>
        </section>

        {/* FTC footer disclosure */}
        <div className="max-w-3xl mx-auto px-5 sm:px-8 mt-12">
          <p className="font-body text-xs text-brand-cream/30 text-center">
            <strong className="text-brand-cream/50 font-semibold">
              Affiliate disclosure:
            </strong>{' '}
            Some links on this page are affiliate links. Aaron earns a small
            commission at no cost to you when you purchase through them. This
            keeps the site, worksheets, and prompt library free.
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
