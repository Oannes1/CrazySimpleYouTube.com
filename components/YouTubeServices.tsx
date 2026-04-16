'use client'

import { motion } from 'framer-motion'

const tiers = [
  {
    name: 'GROW',
    price: '$997',
    tag: 'DIY + Coaching',
    desc: 'Weekly group coaching, channel audits, content calendars, and done-with-you systems. For self-motivated business owners who want expert guidance.',
    highlights: ['Weekly strategy calls', 'Monthly channel audits', 'Templates & SEO tools'],
  },
  {
    name: 'SCALE',
    price: '$1,500',
    tag: 'Coaching + Editing',
    desc: 'Everything in GROW plus 1-on-1 strategy calls, custom thumbnails, basic editing support, and content repurposing into Shorts and social clips.',
    highlights: ['1-on-1 strategy calls', '2 videos edited monthly', 'Content repurposing'],
  },
  {
    name: 'ACCELERATE',
    price: '$2,500',
    tag: 'Done-With-You',
    desc: 'Four professional videos monthly, fully edited and optimized. Weekly strategy, keyword research per video, and monthly performance reports.',
    highlights: ['4 pro videos/month', 'Full editing & optimization', 'ROI tracking & reports'],
    featured: true,
  },
  {
    name: 'ELEVATE',
    price: '$3,750',
    tag: 'Full Funnel',
    desc: 'Eight videos monthly plus lead generation systems, multi-platform distribution, and paid advertising across YouTube, Instagram, LinkedIn, and TikTok.',
    highlights: ['8 pro videos/month', 'Lead magnets & CRM setup', 'Multi-platform distribution'],
  },
  {
    name: 'DOMINATE',
    price: '$5,000',
    tag: 'Market Ownership',
    desc: '12+ videos monthly with quarterly shoots, full funnel buildout, community management, and a dedicated account manager. 30-50+ leads/month expected.',
    highlights: ['12+ videos/month', 'Full funnel & automation', 'Dedicated account manager'],
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
          <a
            href="https://www.aaroncuha.com/services/youtube-services"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-brand-red text-white font-body font-bold text-lg rounded-xl hover:bg-brand-red-light transition-colors hover:shadow-[0_0_40px_rgba(220,38,38,0.2)]"
          >
            View All Services & Book a Call
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <p className="mt-4 text-brand-cream/25 font-body text-xs">
            All tiers include a 30-day trial period. Upgrade or downgrade anytime.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
