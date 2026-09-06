import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import QualifierQuiz from '@/components/QualifierQuiz'

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
    // The paid entry point. This site had no audit tier at all, which left a
    // gap between a $99 community and a $749 retainer, and left the "no free
    // audits" rule with nothing to point people at instead.
    name: 'CHANNEL AUDIT AND PLAN',
    tag: '$497 one time',
    description:
      'The full diagnosis and a real plan before you commit to anything monthly. Written audit first, then an hour walking you through every finding.',
    bestFor: 'You want the diagnosis before the commitment',
    bullets: [
      'A complete written audit, delivered before we speak',
      '60 minutes one to one walking through every finding',
      'A 90-day plan: what to publish, in what order, and why',
      'Yours to keep and hand to your team either way',
      'Credits in full toward your first month of any tier',
    ],
    cta: 'Book the Audit',
    href: 'https://www.aaroncuha.com/youtube-strategy-session',
  },
  {
    name: 'TRACTION',
    tag: '$749/mo',
    description:
      'For owners who need a rhythm and someone holding the standard. Private time on your numbers every month, plus a small group that keeps you honest.',
    bestFor: 'Publishing already, ready for a rhythm',
    bullets: [
      'One 30-minute private call a month',
      'Monthly small group, capped at eight owners',
      'A written plan within 24 hours of every call',
      'Everything in Systems Over Hustle',
    ],
    cta: 'Book a Call',
    href: '#book-call',
  },
  {
    name: 'MOMENTUM',
    tag: '$1,599/mo',
    description:
      'For owners already publishing who want to move faster. More contact, and review between the calls rather than only on them.',
    bestFor: 'Publishing consistently, want to move faster',
    bullets: [
      'Two calls every other week, or one 60-minute a month',
      'Email and async review between calls, not just on them',
      'A written plan within 24 hours of every call',
      'Everything in Traction',
    ],
    cta: 'Book a Call',
    href: '#book-call',
    featured: true,
  },
  {
    // Replaces the old 'YouTube Management' done-for-you tier, which promised
    // editing, thumbnails and scheduling that Aaron no longer sells. It was
    // retired from aaroncuha.com months ago and left standing here, so this
    // site was taking calls for a product that does not exist. AUTHORITY is
    // what actually sits at the top of the ladder now.
    name: 'AUTHORITY',
    tag: '$3,999/mo',
    description:
      'For owners ready to own the search results in their market. The semantic work gets done with you: what to make, what it ranks for, and what to fix once the retention data lands.',
    bestFor: 'Ready to own your market in search',
    bullets: [
      'Four 30-minute calls or two 60-minute calls a month',
      'Four videos a month planned with you before you film',
      'Keywords, titles, descriptions and tags built for each one',
      'Semantic topic mapping so a video ranks for a subject, not a phrase',
      'Everything in Momentum, community and group calls included',
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
    a: 'Systems Over Hustle is month-to-month, cancel anytime. Coaching tiers typically start with a 90-day commitment then go month-to-month, because that is roughly how long it takes to see compounding results.',
  },
  {
    q: 'Do you guarantee results?',
    a: 'No coach who tells you the truth gives a results guarantee, because results depend on your execution. What we guarantee is the system. If you do the work, you\'ll see the same kinds of results other clients have seen.',
  },
  {
    q: "What if I haven't started a channel yet?",
    a: 'Start with the book and the community. Once you have 5–10 published videos, you\'ll have something to optimize. That\'s when Traction or Momentum makes sense.',
  },
  {
    q: 'Can you guarantee my video will go viral?',
    a: 'No, and run from anyone who says yes. The strategy isn\'t viral hits. It\'s a content library that compounds into a lead-generation asset over months and years.',
  },
  {
    q: 'How does pricing work?',
    a: 'Each tier has a fixed monthly investment that we share on the discovery call once we know you\'re a fit. We don\'t list pricing publicly because the right tier depends on your stage and goals. We don\'t want anyone signing up for a tier that\'s wrong for them.',
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
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
              Tom Ferry Mastery Coach. 20,000+ hours of
              one-on-one coaching.
            </p>
            <p>
              Aaron runs two YouTube channels that serve as personal testing
              grounds: <strong className="text-brand-cream font-semibold">@VanLife (138K)</strong> and{' '}
              <strong className="text-brand-cream font-semibold">@aaroncuha (101K)</strong>.
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

        {/* Book a call — paid 1-on-1 */}
        <section
          id="book-call"
          className="relative max-w-3xl mx-auto px-5 sm:px-8 mb-16 sm:mb-24 scroll-mt-24"
        >
          <div className="rounded-2xl bg-gradient-to-br from-brand-red/[0.14] to-brand-red/[0.03] border border-brand-red/30 p-7 sm:p-10 text-center">
            <span className="font-accent text-2xl text-brand-red/90">
              one-on-one with aaron
            </span>
            <h2 className="mt-1 font-display text-3xl sm:text-4xl lg:text-5xl font-normal uppercase text-brand-cream leading-[0.95]">
              Channel Audit and Plan
            </h2>

            {/* Price block */}
            <div className="mt-6 flex items-baseline justify-center gap-3">
              <span className="font-display text-5xl sm:text-6xl font-normal uppercase text-brand-cream leading-none">
                $497
              </span>
              <span className="font-body text-brand-cream/50 text-base">
                / full audit + 60 minute call
              </span>
            </div>

            <p className="mt-6 font-body text-brand-cream/70 leading-relaxed max-w-xl mx-auto">
              Aaron audits your channel in full before you meet, then walks
              you through the whole thing on a 60 minute call: what is working,
              what is costing you, and the plan for your next 90 days.{' '}
              <strong className="text-brand-cream font-semibold">
                You&apos;ll leave with a clear plan, not a sales pitch.
              </strong>
            </p>

            <p className="mt-4 font-body text-sm text-brand-cream/55 leading-relaxed max-w-xl mx-auto">
              The $497 is credited in full toward any coaching tier if you
              decide to go further. You keep the written audit either way.
            </p>

            <a
              href="https://www.aaroncuha.com/book-a-call"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 px-8 py-4 bg-brand-red text-white font-body font-bold text-lg rounded-xl hover:bg-brand-red-light transition-colors shadow-lg shadow-brand-red/25 group"
            >
              Book the Call
              <svg
                className="w-5 h-5 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>

            <p className="mt-5 font-body text-xs text-brand-cream/35">
              Booking and payment handled at aaroncuha.com/book-a-call
            </p>
          </div>

          {/* Free path for those not ready to pay */}
          <div className="mt-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] p-6 text-center">
            <p className="font-body text-sm text-brand-cream/65">
              Not ready for the call?{' '}
              <a
                href="/community"
                className="text-brand-red hover:text-brand-red-light underline underline-offset-2 font-semibold"
              >
                Start with the community
              </a>{' '}
              ($99/mo) or{' '}
              <a
                href="/bonus"
                className="text-brand-red hover:text-brand-red-light underline underline-offset-2 font-semibold"
              >
                grab the free Chapter Companion Kit
              </a>
              .
            </p>
          </div>
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
