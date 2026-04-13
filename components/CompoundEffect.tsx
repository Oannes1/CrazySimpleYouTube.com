'use client'

import { motion } from 'framer-motion'

const AMAZON_LINK = process.env.NEXT_PUBLIC_AMAZON_LINK || 'https://www.amazon.com/dp/B0GWYK8TX6'

const timeline = [
  { label: 'Month 1', desc: 'Your videos start picking up search views. The algorithm is testing.', active: false },
  { label: 'Month 3', desc: 'Retention builds. YouTube starts suggesting you to wider audiences.', active: false },
  { label: 'Month 6', desc: 'You rank for terms you never targeted. Leads start flowing.', active: true },
  { label: 'Year 1', desc: 'Dozens of leads, multiple clients, thousands in revenue — from videos you published months ago.', active: true },
  { label: 'Year 3+', desc: 'Hundreds of leads. A pipeline that works harder than any salesperson. Compounding.', active: true },
]

const flywheel = [
  { step: 'Content', desc: 'leads to trust' },
  { step: 'Trust', desc: 'leads to leads' },
  { step: 'Leads', desc: 'become clients' },
  { step: 'Clients', desc: 'give you more stories' },
  { step: 'Stories', desc: 'become more content' },
]

export default function CompoundEffect() {
  return (
    <section className="relative bg-brand-charcoal py-24 lg:py-32 overflow-hidden noise-overlay">
      <div
        className="absolute inset-0 opacity-[0.018]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(220,38,38,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(220,38,38,.6) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="font-body text-xs sm:text-sm tracking-[0.25em] uppercase text-brand-red font-medium">
            The Compound Effect
          </span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-black text-brand-cream text-balance">
            Every Video Is a Brick in a Building
            <br className="hidden sm:block" />
            <span className="text-brand-cream/30">That Gets More Valuable Over Time</span>
          </h2>
          <p className="mt-5 text-brand-cream/45 font-body text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            On Instagram, your content dies in 48 hours. On YouTube, it compounds for years.
            The growth isn&apos;t linear — it&apos;s exponential.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-brand-cream mb-8">
              How One Video Builds Over Time
            </h3>
            <div className="space-y-1">
              {timeline.map((t, i) => (
                <motion.div
                  key={t.label}
                  className="flex gap-4"
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  {/* Vertical line + dot */}
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className={`w-3 h-3 rounded-full mt-1.5 ${t.active ? 'bg-brand-red' : 'bg-brand-cream/20'}`} />
                    {i < timeline.length - 1 && (
                      <div className={`w-px flex-1 my-1 ${t.active ? 'bg-brand-red/30' : 'bg-white/[0.06]'}`} />
                    )}
                  </div>
                  <div className="pb-6">
                    <div className={`font-display font-bold text-sm ${t.active ? 'text-brand-red' : 'text-brand-cream/40'}`}>
                      {t.label}
                    </div>
                    <p className="mt-1 font-body text-sm text-brand-cream/50 leading-relaxed">
                      {t.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Growth stats */}
            <motion.div
              className="mt-4 p-5 rounded-xl bg-brand-red/[0.06] border border-brand-red/15"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <div className="font-body text-[0.65rem] tracking-[0.25em] uppercase text-brand-red font-semibold mb-3">
                The Exponential Curve
              </div>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div>
                  <div className="font-display text-xl sm:text-2xl font-black text-brand-cream">30</div>
                  <div className="font-body text-[0.65rem] text-brand-cream/35 mt-0.5">Leads from<br />videos 1–10</div>
                </div>
                <div>
                  <div className="font-display text-xl sm:text-2xl font-black text-brand-cream">80</div>
                  <div className="font-body text-[0.65rem] text-brand-cream/35 mt-0.5">Leads from<br />videos 11–20</div>
                </div>
                <div>
                  <div className="font-display text-xl sm:text-2xl font-black text-brand-red">200+</div>
                  <div className="font-body text-[0.65rem] text-brand-cream/35 mt-0.5">Leads from<br />videos 21–30</div>
                </div>
              </div>
              <p className="mt-3 font-body text-xs text-brand-cream/35 text-center">
                Same effort per video. Wildly different output.
              </p>
            </motion.div>
          </div>

          {/* Authority Flywheel */}
          <div>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-brand-cream mb-3">
              The Authority Flywheel
            </h3>
            <p className="font-body text-sm text-brand-cream/45 leading-relaxed mb-8">
              When prospects watch your videos before they ever call, something
              shifts. They already trust you. By the time they reach out, you&apos;re
              not a stranger — you&apos;re the expert they&apos;ve already chosen.
            </p>

            <div className="space-y-3">
              {flywheel.map((f, i) => (
                <motion.div
                  key={f.step}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-brand-red/15 transition-colors"
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <div className="w-8 h-8 rounded-lg bg-brand-red/10 flex items-center justify-center flex-shrink-0">
                    <span className="font-display text-sm font-black text-brand-red">{i + 1}</span>
                  </div>
                  <div>
                    <span className="font-display font-bold text-brand-cream text-sm">{f.step}</span>
                    <span className="font-body text-brand-cream/40 text-sm"> {f.desc}</span>
                  </div>
                  {i < flywheel.length - 1 && (
                    <svg className="w-4 h-4 text-brand-red/30 ml-auto flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  )}
                  {i === flywheel.length - 1 && (
                    <svg className="w-4 h-4 text-brand-red ml-auto flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Pull quote */}
            <motion.div
              className="mt-8 p-6 rounded-xl bg-white/[0.03] border-l-4 border-brand-red"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <p className="font-body text-brand-cream/60 text-sm italic leading-relaxed">
                &ldquo;I used to chase clients. Now they chase me.&rdquo;
              </p>
              <p className="mt-2 font-body text-brand-cream/30 text-xs">
                — Coaching client, after 6 months on YouTube
              </p>
            </motion.div>
          </div>
        </div>

        {/* CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <a
            href={AMAZON_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-brand-red text-white font-body font-bold text-lg rounded-xl hover:bg-brand-red-light transition-colors hover:shadow-[0_0_40px_rgba(220,38,38,0.2)]"
          >
            Get the System — $19.99
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
