'use client'

import { motion } from 'framer-motion'

const results = [
  {
    industry: 'Real Estate',
    name: 'Rachel Smith',
    before: '1,000 subscribers',
    after: '160,000 subscribers in 18 months',
    highlight: '1K to 160K in 18 months',
    color: 'brand-red',
  },
  {
    industry: 'Coaching',
    name: 'Sandra',
    before: '4 leads in 8 months',
    after: '60+ leads per quarter',
    highlight: '$93,500 in 90 days',
    color: 'brand-red',
  },
  {
    industry: 'Real Estate',
    name: 'Scott Himelstein',
    before: '200 subscribers after 12 years',
    after: '2,000 subs + $300K+ revenue in year one',
    highlight: '$87K in first 90 days',
    color: 'brand-red',
  },
  {
    industry: 'Financial Planning',
    name: 'Kevin',
    before: '500 views, 1–2 inquiries/month',
    after: '2,100 views, 8–10 inquiries/month',
    highlight: '5x client inquiries',
    color: 'brand-red',
  },
  {
    industry: 'Real Estate',
    name: 'Leah Courage',
    before: 'Just getting started on YouTube',
    after: '20,000 subscribers in 8 weeks',
    highlight: '20K subs in 8 weeks',
    color: 'brand-red',
  },
  {
    industry: 'Business Attorney',
    name: 'David',
    before: '3–4 leads per month',
    after: '12–15 leads per month via repurposing',
    highlight: 'Leads tripled, same content',
    color: 'brand-red',
  },
]

export default function Results() {
  return (
    <section className="relative bg-brand-cream py-24 lg:py-32 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, #0a0a0a 1px, transparent 0)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="relative max-w-6xl mx-auto px-5 sm:px-8">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="font-body text-xs sm:text-sm tracking-[0.25em] uppercase text-brand-red-dark font-medium">
            The Proof
          </span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-normal uppercase text-brand-charcoal">
            Six Industries. One System.
            <br className="hidden sm:block" /> Same Result.
          </h2>
          <p className="mt-5 text-brand-charcoal/60 font-body text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            These aren&apos;t influencers. They&apos;re{' '}
            <strong className="text-brand-charcoal font-semibold">business owners like you</strong>{' '}
            who installed the system and watched it compound.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {results.map((r, i) => (
            <motion.div
              key={r.name}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-brand-charcoal/[0.04] hover:border-brand-red/15 hover:shadow-lg transition-all duration-300"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              {/* Industry tag */}
              <div className="inline-flex px-2.5 py-1 rounded-md bg-brand-red/[0.06] text-brand-red-dark text-[0.65rem] font-body font-bold tracking-wider uppercase mb-4">
                {r.industry}
              </div>

              {/* Name */}
              <h3 className="font-display text-lg font-bold text-brand-charcoal">
                {r.name}
              </h3>

              {/* Before/After */}
              <div className="mt-4 space-y-2.5">
                <div className="flex gap-3">
                  <span className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-brand-charcoal/[0.06] flex items-center justify-center">
                    <svg className="w-3 h-3 text-brand-charcoal/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </span>
                  <p className="font-body text-sm text-brand-charcoal/40 leading-relaxed line-through decoration-brand-red/40">
                    {r.before}
                  </p>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-brand-red/10 flex items-center justify-center">
                    <svg className="w-3 h-3 text-brand-red" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <p className="font-body text-sm text-brand-charcoal/70 leading-relaxed font-medium">
                    {r.after}
                  </p>
                </div>
              </div>

              {/* Highlight stat */}
              <div className="mt-5 pt-4 border-t border-brand-charcoal/[0.06]">
                <div className="font-display text-xl sm:text-2xl font-normal uppercase text-brand-red">
                  {r.highlight}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
