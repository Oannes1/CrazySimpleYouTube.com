'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

/**
 * Targeted callout for real estate agents — sits after Results
 * (which is real-estate-heavy) and points at the dedicated kit page.
 */
export default function RealEstateCallout() {
  return (
    <section className="relative bg-brand-charcoal py-16 lg:py-20 overflow-hidden noise-overlay">
      {/* subtle red glow */}
      <div className="absolute top-1/2 right-[15%] -translate-y-1/2 w-[420px] h-[420px] bg-brand-red/[0.06] rounded-full blur-[140px]" />

      <div className="relative max-w-5xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <Link
            href="/kits/real-estate-agent"
            className="group relative block rounded-2xl bg-gradient-to-br from-brand-red/[0.14] to-brand-red/[0.02] border border-brand-red/25 hover:border-brand-red/50 p-7 sm:p-10 transition-all overflow-hidden"
          >
            {/* Watermark numeral */}
            <div
              aria-hidden="true"
              className="absolute -top-12 -right-8 font-display text-[16rem] leading-none text-brand-red/[0.07] select-none pointer-events-none"
            >
              06
            </div>

            <div className="relative grid lg:grid-cols-[1fr_auto] gap-8 items-center">
              <div>
                <span className="font-accent text-2xl text-brand-red/85">
                  for the agents reading this
                </span>
                <h2 className="mt-1 font-display text-3xl sm:text-4xl lg:text-5xl font-normal uppercase text-brand-cream leading-[0.95]">
                  We Built You
                  <br />
                  <span className="text-brand-red">Your Own Kit.</span>
                </h2>

                <p className="mt-5 font-body text-brand-cream/70 text-base sm:text-lg leading-relaxed max-w-2xl">
                  Property tours that close deals. Aerial reveals from the
                  drone. Walk-and-talk gimbal cinematography. Lavalier audio
                  that sounds clean indoors and out.{' '}
                  <strong className="text-brand-cream font-semibold">
                    The exact kit Aaron equips coaching clients with on day one.
                  </strong>
                </p>

                {/* Quick stats */}
                <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
                  <div>
                    <div className="font-body text-[0.65rem] tracking-[0.2em] uppercase text-brand-cream/35">
                      Kit Total
                    </div>
                    <div className="mt-1 font-display text-xl uppercase text-brand-cream">
                      $800–1,800
                    </div>
                  </div>
                  <div>
                    <div className="font-body text-[0.65rem] tracking-[0.2em] uppercase text-brand-cream/35">
                      Items
                    </div>
                    <div className="mt-1 font-display text-xl uppercase text-brand-cream">
                      6 picks
                    </div>
                  </div>
                  <div>
                    <div className="font-body text-[0.65rem] tracking-[0.2em] uppercase text-brand-cream/35">
                      Used by
                    </div>
                    <div className="mt-1 font-display text-xl uppercase text-brand-cream">
                      Rachel · Scott · Leah · Patrick · Natalia
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:flex-shrink-0">
                <div className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-brand-red text-white font-body font-bold text-base group-hover:bg-brand-red-light transition-colors shadow-lg shadow-brand-red/25 whitespace-nowrap">
                  See the Kit
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
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
