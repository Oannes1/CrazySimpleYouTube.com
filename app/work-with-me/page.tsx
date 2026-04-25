import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import QualifierQuiz from '@/components/QualifierQuiz'
import DiscoveryCallForm from '@/components/DiscoveryCallForm'

export const metadata: Metadata = {
  title: 'Work With Aaron Cuha | Coaching & YouTube Management',
  description:
    'Three ways to work with Aaron, depending on how much of YouTube you want off your plate. From coaching to full done-for-you channel management.',
}

const tiers = [
  {
    name: 'Community',
    tag: 'DIY + Peer Support',
    description:
      'For business owners who want the system, the templates, and a peer group to build alongside. Monthly Q&A with Aaron, plug-and-play frameworks, accountability pods.',
    bestFor: 'Just starting, or building consistency',
    bullets: [
      'Monthly live Q&A with Aaron',
      'Plug-and-play templates',
      'Peer accountability pods',
      'Workshops and behind-the-scenes',
      '12 organized topic channels',
    ],
    cta: 'Join the Community',
    href: '/community',
  },
  {
    name: 'GROW',
    tag: 'Coaching + Strategy',
    description:
      'For channels generating leads who want a coach to optimize the system they\'re already running. Twice-monthly 1:1 strategy calls, channel reviews, direct access between calls.',
    bestFor: 'Channels with traction, ready to optimize',
    bullets: [
      '2x/month 1:1 strategy calls',
      'Monthly channel audits',
      'Direct access via Voxer',
      'Templates + content calendars',
      'Everything in Community',
    ],
    cta: 'Book a Call',
    href: '#book-call',
  },
  {
    name: 'SCALE',
    tag: 'Done With You',
    description:
      'For channels with revenue who need execution help. Weekly strategy, custom thumbnails, basic editing support, content repurposing. You still film and own the brand.',
    bestFor: 'Revenue-generating channels, limited time',
    bullets: [
      'Weekly 1:1 strategy calls',
      'Custom thumbnails (2x/mo)',
      'Title and description writing',
      'Content repurposing (Shorts, social)',
      'Basic editing support',
    ],
    cta: 'Book a Call',
    href: '#book-call',
    featured: true,
  },
  {
    name: 'YouTube Management',
    tag: 'Done For You',
    description:
      'For established businesses ready to scale YouTube as a primary lead channel. Aaron\'s team runs the channel: editing, thumbnails, SEO, scheduling, analytics. You just film.',
    bestFor: 'Established businesses scaling YouTube',
    bullets: [
      '4–12+ pro videos monthly',
      'Full editing & optimization',
      'Lead gen + funnel buildout',
      'Multi-platform distribution',
      'Optional: paid amplification',
    ],
    cta: 'Book a Call',
    href: '#book-call',
  },
]

const caseStudies = [
  {
    metric: '$87K in 90 days',
    detail: '12 years and 200 subscribers, then $87K in commissions in the next 90 days. By year-end, $300K+.',
    name: 'Scott',
    role: 'Real Estate Agent',
  },
  {
    metric: '$93,500 in 90 days',
    detail: 'From 4 leads in 8 months to 60+ leads per quarter after installing the lead generation system.',
    name: 'Sandra',
    role: 'Coach',
  },
  {
    metric: '160K subs in 18 months',
    detail: '1,000 to 160,000 subscribers using exactly the system in the book. Lead generation chapter alone paid for itself 10x.',
    name: 'Rachel',
    role: 'Real Estate Agent',
  },
  {
    metric: '5x client inquiries',
    detail: 'Views from 500 to 2,100. Inquiries from 1–2/month to 8–10. Analytics chapter showed which metrics actually move the needle.',
    name: 'Kevin',
    role: 'Financial Advisor',
  },
]

const faqs = [
  {
    q: 'Do you only work with real estate agents?',
    a: 'No. The frameworks work for any service business that needs leads. We work with real estate agents, mortgage brokers, financial advisors, attorneys, coaches, consultants, and contractors.',
  },
  {
    q: "What's the minimum commitment?",
    a: 'Community is month-to-month, cancel anytime. Coaching tiers (GROW, SCALE) typically start with a 90-day commitment then go month-to-month. YouTube Management has a 6-month minimum because that\'s how long it takes to see real compounding results.',
  },
  {
    q: 'Do you guarantee results?',
    a: 'No coach who tells you the truth gives a results guarantee, because results depend on your execution. What we guarantee is the system. If you do the work, you\'ll see the same kinds of results other clients have seen.',
  },
  {
    q: "What if I haven't started a channel yet?",
    a: 'Start with the book and the community. Once you have 5–10 published videos, you\'ll have something to optimize. That\'s when GROW or SCALE makes sense.',
  },
  {
    q: 'Can you guarantee my video will go viral?',
    a: 'No, and run from anyone who says yes. The strategy isn\'t viral hits. It\'s a content library that compounds into a lead-generation asset over months and years.',
  },
  {
    q: 'How does pricing work?',
    a: 'Each tier has a fixed monthly investment that we share on the discovery call once we know you\'re a fit. We don\'t list pricing publicly because the right tier depends on your stage and goals — and we don\'t want anyone signing up for a tier that\'s wrong for them.',
  },
  {
    q: 'Can you do a custom deal?',
    a: 'Yes. For special situations (other coaches, mastermind partners, equity arrangements, etc.), we build custom packages. Mention that on your discovery call.',
  },
]

export default function WorkWithMePage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-brand-charcoal pt-28 sm:pt-32 pb-16 noise-overlay">
        {/* Hero */}
        <section className="relative max-w-5xl mx-auto px-5 sm:px-8 mb-16 sm:mb-24">
          <div className="text-center">
            <span className="font-body text-xs sm:text-sm tracking-[0.25em] uppercase text-brand-red font-medium">
              Work With Aaron
            </span>
            <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-normal uppercase text-brand-cream leading-[0.95]">
              Stop Doing It <span className="text-brand-red">Alone.</span>
            </h1>
            <p className="mt-6 font-body text-brand-cream/70 text-lg max-w-2xl mx-auto leading-relaxed">
              Four ways to work together, depending on how much of YouTube you
              want off your plate. Pick the level that matches where you are.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="#book-call"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-red text-white font-body font-bold text-base rounded-xl hover:bg-brand-red-light transition-colors shadow-lg shadow-brand-red/20"
              >
                Book a Discovery Call
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="#quiz"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/15 text-brand-cream/80 font-body font-medium text-base rounded-xl hover:border-brand-red/40 hover:text-brand-red transition-colors"
              >
                Not sure? Take the 30-second quiz
              </a>
            </div>
          </div>
        </section>

        {/* Tiers */}
        <section className="relative max-w-7xl mx-auto px-5 sm:px-8 mb-16 sm:mb-24">
          <div className="text-center mb-10">
            <span className="font-body text-xs tracking-[0.25em] uppercase text-brand-red font-medium">
              The Four Paths
            </span>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-normal uppercase text-brand-cream">
              Pick Your Level
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative rounded-2xl p-6 border flex flex-col transition-all duration-300 ${
                  tier.featured
                    ? 'bg-brand-red/[0.08] border-brand-red/25 shadow-lg shadow-brand-red/5'
                    : 'bg-white/[0.02] border-white/[0.06] hover:border-brand-red/15'
                }`}
              >
                {tier.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-brand-red text-white text-[0.6rem] font-body font-bold tracking-wider uppercase rounded-full whitespace-nowrap">
                    Most Popular
                  </div>
                )}
                <div className="font-body text-[0.6rem] tracking-[0.2em] uppercase text-brand-cream/30 font-medium">
                  {tier.tag}
                </div>
                <div className="mt-2 font-display text-xl font-normal uppercase text-brand-cream">
                  {tier.name}
                </div>
                <p className="mt-3 font-body text-xs text-brand-cream/50 leading-relaxed">
                  {tier.description}
                </p>
                <ul className="mt-4 space-y-2 flex-1">
                  {tier.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-2 text-brand-cream/60 font-body text-xs"
                    >
                      <svg
                        className="w-3.5 h-3.5 text-brand-red flex-shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 pt-4 border-t border-white/[0.06]">
                  <div className="font-body text-xs text-brand-cream/40 mb-3">
                    Best for: {tier.bestFor}
                  </div>
                  <a
                    href={tier.href}
                    className={`block text-center py-3 rounded-lg font-body font-bold text-sm transition-colors ${
                      tier.featured
                        ? 'bg-brand-red text-white hover:bg-brand-red-light'
                        : 'border border-brand-red/30 text-brand-red hover:bg-brand-red/[0.06]'
                    }`}
                  >
                    {tier.cta}
                  </a>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center font-body text-xs text-brand-cream/40">
            Pricing shared on the discovery call. Each tier&apos;s investment
            depends on your stage and goals.
          </p>
        </section>

        {/* Qualifier quiz */}
        <section
          id="quiz"
          className="relative max-w-2xl mx-auto px-5 sm:px-8 mb-16 sm:mb-24 scroll-mt-24"
        >
          <div className="text-center mb-8">
            <span className="font-body text-xs tracking-[0.25em] uppercase text-brand-red font-medium">
              Not Sure Which Tier?
            </span>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-normal uppercase text-brand-cream">
              30-Second Quiz
            </h2>
            <p className="mt-3 font-body text-brand-cream/50">
              Three questions. We&apos;ll point you at the right path.
            </p>
          </div>
          <QualifierQuiz />
        </section>

        {/* About Aaron */}
        <section className="relative max-w-3xl mx-auto px-5 sm:px-8 mb-16 sm:mb-24">
          <span className="font-body text-xs tracking-[0.25em] uppercase text-brand-red font-medium">
            Who You&apos;re Working With
          </span>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-normal uppercase text-brand-cream">
            Aaron Cuha
          </h2>
          <div className="mt-6 space-y-4 font-body text-brand-cream/65 leading-relaxed text-[0.95rem]">
            <p className="text-brand-cream/85 font-medium text-base">
              Master Certified Business and Real Estate Coach. 15,000+ hours of
              one-on-one coaching.
            </p>
            <p>
              Aaron runs two YouTube channels that serve as personal testing
              grounds: <strong className="text-brand-cream font-semibold">@VanLife (120K+)</strong> and{' '}
              <strong className="text-brand-cream font-semibold">@GotCoach (50K+)</strong>.
              Between them, every strategy he teaches has been tested on his
              own channels before being put in front of a client.
            </p>
            <p>
              Over the years, he&apos;s guided hundreds of professionals (real
              estate agents, mortgage brokers, financial advisors, attorneys,
              coaches, consultants) to build client acquisition systems
              powered by YouTube. His frameworks have helped clients go from
              200 subscribers to 15,000+ while generating six figures in
              YouTube-attributed revenue.
            </p>
            <p>
              Aaron is a licensed real estate broker in twelve states, a
              speaker within the Tom Ferry ecosystem, and the founder of
              DirectLender.com (280 offices, 3,000 employees).
            </p>
          </div>
        </section>

        {/* Client results */}
        <section className="relative max-w-5xl mx-auto px-5 sm:px-8 mb-16 sm:mb-24">
          <div className="text-center mb-10">
            <span className="font-body text-xs tracking-[0.25em] uppercase text-brand-red font-medium">
              Real Results
            </span>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-normal uppercase text-brand-cream">
              Clients Doing the Work
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {caseStudies.map((cs) => (
              <div
                key={cs.metric + cs.name}
                className="p-6 sm:p-7 rounded-2xl bg-white/[0.02] border border-white/[0.06]"
              >
                <div className="font-display text-2xl sm:text-3xl font-normal uppercase text-brand-red">
                  {cs.metric}
                </div>
                <p className="mt-3 font-body text-sm text-brand-cream/65 leading-relaxed">
                  {cs.detail}
                </p>
                <div className="mt-4 pt-4 border-t border-white/[0.06] font-body text-xs text-brand-cream/40">
                  <strong className="text-brand-cream/70 font-semibold">
                    {cs.name}
                  </strong>{' '}
                  · {cs.role}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Discovery call */}
        <section
          id="book-call"
          className="relative max-w-2xl mx-auto px-5 sm:px-8 mb-16 sm:mb-24 scroll-mt-24"
        >
          <div className="text-center mb-8">
            <span className="font-body text-xs tracking-[0.25em] uppercase text-brand-red font-medium">
              Ready to Talk?
            </span>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-normal uppercase text-brand-cream">
              Book a Discovery Call
            </h2>
            <p className="mt-4 font-body text-brand-cream/65 leading-relaxed">
              30-minute call. We walk through your channel (or your plan to
              start one), identify the bottleneck, and decide together if
              working together makes sense. No high-pressure pitch.{' '}
              <strong className="text-brand-cream font-semibold">
                If we&apos;re not a fit, Aaron will tell you.
              </strong>
            </p>
          </div>
          <DiscoveryCallForm />
        </section>

        {/* FAQ */}
        <section className="relative max-w-3xl mx-auto px-5 sm:px-8 mb-16 sm:mb-24">
          <h2 className="font-display text-3xl sm:text-4xl font-normal uppercase text-brand-cream mb-8">
            Common Questions
          </h2>
          <div className="space-y-3">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-xl bg-white/[0.02] border border-white/[0.06] overflow-hidden"
              >
                <summary className="cursor-pointer list-none px-5 sm:px-7 py-5 font-body font-semibold text-brand-cream/80 hover:text-brand-cream transition-colors flex items-center justify-between gap-4">
                  <span>{f.q}</span>
                  <svg
                    className="w-5 h-5 text-brand-cream/30 transition-transform group-open:rotate-180 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>
                <div className="px-5 sm:px-7 pb-6 font-body text-sm text-brand-cream/55 leading-relaxed">
                  {f.a}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative max-w-3xl mx-auto px-5 sm:px-8 text-center">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal uppercase text-brand-cream">
            The Next 90 Days Pass Either Way.
          </h2>
          <p className="mt-5 font-body text-brand-cream/60 leading-relaxed">
            The creators who win aren&apos;t smarter or more talented. They
            decided to start and refused to stop. If that&apos;s you, let&apos;s talk.
          </p>
          <a
            href="#book-call"
            className="mt-7 inline-flex items-center gap-2 px-8 py-4 bg-brand-red text-white font-body font-bold text-lg rounded-xl hover:bg-brand-red-light transition-colors shadow-lg shadow-brand-red/20"
          >
            Book Your Call
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </section>
      </main>
      <Footer />
    </>
  )
}
