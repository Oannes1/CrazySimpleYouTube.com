'use client'

import { motion } from 'framer-motion'

const AMAZON_LINK = process.env.NEXT_PUBLIC_AMAZON_LINK || 'https://www.amazon.com/dp/B0GWYK8TX6'

export default function Urgency() {
  return (
    <section className="relative bg-brand-charcoal py-24 lg:py-32 overflow-hidden noise-overlay">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-red/[0.05] rounded-full blur-[180px]" />

      <div className="relative z-10 max-w-3xl mx-auto px-5 sm:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="font-body text-xs sm:text-sm tracking-[0.25em] uppercase text-brand-red font-medium">
            The 2026 Window
          </span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-black text-brand-cream text-balance">
            Your Competitors Still
            <br className="hidden sm:block" />
            Aren&apos;t on YouTube
          </h2>
          <p className="mt-6 text-brand-cream/50 font-body text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            In most industries — real estate, coaching, consulting, financial
            services, legal, home services — your direct competitors are either
            completely absent from YouTube or doing it so poorly it barely counts.
          </p>
          <p className="mt-4 text-brand-cream/50 font-body text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            The business owners who figure this out right now will own their markets
            for the next decade. That&apos;s not hype.{' '}
            <span className="text-brand-cream/80 font-medium">That&apos;s math.</span>
          </p>

          {/* Stats row */}
          <div className="mt-10 grid grid-cols-3 gap-6 max-w-lg mx-auto">
            <div>
              <div className="font-display text-2xl sm:text-3xl font-black text-brand-red">2.5B</div>
              <div className="mt-1 font-body text-[0.65rem] sm:text-xs text-brand-cream/30 uppercase tracking-wider">Monthly Users</div>
            </div>
            <div>
              <div className="font-display text-2xl sm:text-3xl font-black text-brand-red">40+</div>
              <div className="mt-1 font-body text-[0.65rem] sm:text-xs text-brand-cream/30 uppercase tracking-wider">Min Avg Session</div>
            </div>
            <div>
              <div className="font-display text-2xl sm:text-3xl font-black text-brand-red">#2</div>
              <div className="mt-1 font-body text-[0.65rem] sm:text-xs text-brand-cream/30 uppercase tracking-wider">Search Engine</div>
            </div>
          </div>

          <p className="mt-10 font-body text-brand-cream/35 text-sm max-w-lg mx-auto leading-relaxed">
            The next 90 days pass whether you build your channel or not.
            You have everything you need. Not most of it.{' '}
            <span className="text-brand-cream/60 font-medium">All of it.</span>
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={AMAZON_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-brand-red text-white font-body font-bold text-lg rounded-xl overflow-hidden transition-all hover:shadow-[0_0_50px_rgba(220,38,38,0.3)] hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="relative z-10">Get Your Copy — $19.99</span>
              <svg className="relative z-10 w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              <div className="absolute inset-0 bg-brand-red-light scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
            </a>
            <a
              href="/bonus"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-brand-cream/15 text-brand-cream/80 font-body font-medium text-lg rounded-xl transition-all hover:border-brand-red/40 hover:text-brand-red hover:bg-brand-red/[0.04]"
            >
              Get the Free Chapter Kit
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
