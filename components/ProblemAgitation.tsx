'use client'

import { motion } from 'framer-motion'

const problems = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
    title: 'Cold calls that go nowhere',
    description: '50 dials for one lukewarm appointment. Your time is worth more than that.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Ad spend that vanishes',
    description: 'Paying for cold leads who don\'t know you, don\'t trust you, and ghost after the first call.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
      </svg>
    ),
    title: 'The content treadmill',
    description: 'Instagram posts that die in 48 hours. Starting from zero every single day. Never building anything.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Networking events that waste weekends',
    description: 'Open houses, conferences, happy hours — hoping someone walks in. That\'s not a strategy.',
  },
]

export default function ProblemAgitation() {
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

      <div className="relative max-w-5xl mx-auto px-5 sm:px-8">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="font-body text-xs sm:text-sm tracking-[0.25em] uppercase text-brand-red-dark font-medium">
            Sound Familiar?
          </span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-black text-brand-charcoal text-balance">
            You&apos;re Great at What You Do.
            <br className="hidden sm:block" />
            <span className="text-brand-charcoal/30">Your Marketing Doesn&apos;t Show It.</span>
          </h2>
          <p className="mt-5 text-brand-charcoal/50 font-body text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            You&apos;re a coach, consultant, agent, attorney, contractor, or service
            provider. You&apos;re excellent at your craft — but your lead generation
            feels like a full-time job that never compounds.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-5">
          {problems.map((p, i) => (
            <motion.div
              key={p.title}
              className="p-6 sm:p-7 rounded-2xl bg-white border border-brand-charcoal/[0.04] hover:border-brand-red/15 transition-all group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="w-11 h-11 rounded-xl bg-brand-red/[0.06] flex items-center justify-center text-brand-red mb-4 group-hover:bg-brand-red/10 transition-colors">
                {p.icon}
              </div>
              <h3 className="font-display text-lg font-bold text-brand-charcoal">
                {p.title}
              </h3>
              <p className="mt-2 font-body text-sm text-brand-charcoal/50 leading-relaxed">
                {p.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-14 text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="max-w-2xl mx-auto p-7 sm:p-9 rounded-2xl bg-brand-charcoal text-center">
            <h3 className="font-display text-xl sm:text-2xl font-black text-brand-cream">
              What If Your Marketing Worked{' '}
              <span className="text-brand-red">While You Slept?</span>
            </h3>
            <p className="mt-4 font-body text-brand-cream/50 text-sm sm:text-base leading-relaxed max-w-lg mx-auto">
              YouTube is the only platform where a single video can generate
              leads for years. Not days. Not weeks.{' '}
              <span className="text-brand-cream/70 font-medium">Years.</span>{' '}
              Every video you create is a brick in a building that gets more valuable
              over time — while your competitors start from zero every single day.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
