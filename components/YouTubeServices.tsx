'use client'

import { motion } from 'framer-motion'

// Mirrors src/data/services.ts on aaroncuha.com, which is the single source of
// truth for the offer ladder. This file previously carried the RETIRED
// production tiers (GROW $997, SCALE $1,500, ACCELERATE $2,500, ELEVATE
// $3,750, DOMINATE $5,000) which sold done-for-you video editing and promised
// "30-50+ leads/month". That whole ladder was replaced and editing was dropped
// entirely, but this site kept selling it. If the ladder changes again, change
// it in services.ts first and mirror it here.
const tiers = [
  {
    name: 'CHANNEL AUDIT AND PLAN',
    price: '$497',
    tag: 'One time',
    desc: 'A complete written audit of your channel, delivered before we speak. Then 60 minutes going through every finding, one to one. Credited in full toward any tier below if you go further.',
    highlights: ['Full written audit first', '60 minutes, one to one', 'A 90-day plan and your first ten topics'],
  },
  {
    name: 'TRACTION',
    price: '$749',
    tag: 'Coaching',
    desc: 'For owners who need a rhythm and someone holding the standard. Private time on your numbers every month, plus a small group that keeps you honest.',
    highlights: ['One 30-minute private call a month', 'Monthly small group, capped at eight', 'A written plan within 24 hours of every call'],
  },
  {
    name: 'MOMENTUM',
    price: '$1,599',
    tag: 'Coaching',
    desc: 'For owners already publishing who want to move faster. More contact, and review between the calls rather than only on them.',
    highlights: ['Two calls every other week, or one 60-minute', 'Email and async review between calls', 'A written plan within 24 hours of every call'],
    featured: true,
  },
  {
    name: 'AUTHORITY',
    price: '$3,999',
    tag: 'Coaching',
    desc: 'The most contact available. Weekly calls, and your videos planned with you before you film rather than fixed afterwards.',
    highlights: ['Four calls a month, a week apart', 'Four videos planned with you before filming', 'Titles, descriptions, chapters and captions built for each'],
  },
]

export default function YouTubeServices() {
  return (
    <section
      id="services"
      className="relative bg-brand-charcoal py-24 lg:py-32 overflow-hidden noise-overlay"
    >
      <div
        className="absolute inset-0 opacity-[0.018]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(220,38,38,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(220,38,38,.6) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8">
        <motion.div
          className="text-center mb-14 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="font-body text-xs sm:text-sm tracking-[0.25em] uppercase text-brand-red font-medium">
            Want It Done For You?
          </span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-normal uppercase text-brand-cream">
            YouTube Growth Services
          </h2>
          <p className="mt-4 text-brand-cream/50 font-body text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Not everyone wants to do it themselves. From coaching to full
            done-for-you production,{' '}
            <strong className="text-brand-cream/70 font-semibold">
              500+ channels optimized
            </strong>{' '}
            with the same system that&apos;s in the book.
          </p>
        </motion.div>

        {/* Tiers grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              className={`relative rounded-2xl p-6 border transition-all duration-300 ${
                tier.featured
                  ? 'bg-brand-red/[0.08] border-brand-red/25 shadow-lg shadow-brand-red/5'
                  : 'bg-white/[0.02] border-white/[0.05] hover:border-brand-red/15'
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
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
              <div className="mt-1 font-body text-brand-red font-bold text-lg">
                {tier.price}
                <span className="text-brand-cream/30 font-normal text-sm">/mo</span>
              </div>

              <p className="mt-3 font-body text-xs text-brand-cream/40 leading-relaxed">
                {tier.desc}
              </p>

              <ul className="mt-4 space-y-2">
                {tier.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2 text-brand-cream/60 font-body text-xs">
                    <svg className="w-3.5 h-3.5 text-brand-red flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {h}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://www.aaroncuha.com/book-a-call"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-brand-red text-white font-body font-bold text-lg rounded-xl hover:bg-brand-red-light transition-colors hover:shadow-[0_0_40px_rgba(220,38,38,0.2)]"
            >
              Channel Audit and Plan ($497)
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="/work-with-me"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 border border-brand-cream/15 text-brand-cream/80 font-body font-medium text-base rounded-xl hover:border-brand-red/40 hover:text-brand-red transition-colors"
            >
              See all coaching tiers
            </a>
          </div>
          <p className="mt-4 text-brand-cream/25 font-body text-xs">
            All tiers include a 30-day trial period. Upgrade or downgrade anytime.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
