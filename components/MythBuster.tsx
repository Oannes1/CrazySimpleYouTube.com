'use client'

import { motion } from 'framer-motion'

const myths = [
  {
    myth: '"You need to post every day"',
    truth: 'One great video per week beats five forgettable ones. YouTube rewards watch time, not upload frequency. Aaron tested this on his own channels — 2 videos/week outperformed 5/week in every metric.',
  },
  {
    myth: '"You need expensive equipment"',
    truth: 'Your phone shoots 4K. One creator built 200K+ subscribers and 7 figures using an iPhone 8 and free earbuds. Start with what you have. Upgrade when the channel demands it.',
  },
  {
    myth: '"Short videos are better"',
    truth: '18-minute videos generated 5,000+ new subscribers/month. 3-minute videos? 300–400. That\'s a 10x difference. Longer content wins when every minute delivers value.',
  },
  {
    myth: '"You need to go viral"',
    truth: 'Small audiences that convert beat massive audiences that don\'t. Every single time. 500 views from your ideal client beats 500,000 from teenagers who\'ll never buy.',
  },
  {
    myth: '"Subscribers are everything"',
    truth: 'Subscribers are a vanity metric. A channel with 500 subs and 50% watch-through will generate more leads than one with 50,000 subs and 15% watch-through.',
  },
  {
    myth: '"The algorithm hates small channels"',
    truth: 'The algorithm has one job: keep people watching. If your content does that, the algorithm is your biggest ally. It rewards exactly the kind of content business owners should be making.',
  },
]

export default function MythBuster() {
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

      <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="font-body text-xs sm:text-sm tracking-[0.25em] uppercase text-brand-red font-medium">
            Chapter 2 Preview
          </span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-black text-brand-cream text-balance">
            Everything You&apos;ve Heard About
            <br className="hidden sm:block" />
            <span className="text-brand-red">YouTube Is Wrong</span>
          </h2>
          <p className="mt-5 text-brand-cream/45 font-body text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            The gurus who teach YouTube have never generated a single
            client from a video. Their advice sounds smart — and quietly
            destroys your chances of building a channel that makes money.
          </p>
        </motion.div>

        <div className="space-y-4">
          {myths.map((m, i) => (
            <motion.div
              key={i}
              className="p-5 sm:p-7 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-brand-red/15 transition-colors"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-0.5 w-7 h-7 rounded-full bg-brand-red/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-brand-red" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-display text-base sm:text-lg font-bold text-brand-cream/70">
                    {m.myth}
                  </h3>
                  <p className="mt-2 font-body text-sm text-brand-cream/45 leading-relaxed">
                    {m.truth}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
