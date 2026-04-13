'use client'

import { motion } from 'framer-motion'

/* TODO: Replace placeholder quotes with real testimonials */
const testimonials = [
  {
    name: 'Daniel Kotula',
    result: 'Consistent leads from every video',
    quote:
      "Aaron's system transformed how I approach YouTube for my business. Within 3 months, I was generating consistent leads from every video I published.",
    initials: 'DK',
  },
  {
    name: 'Rachel Smith',
    result: '10K subscribers in 6 months',
    quote:
      "I went from zero to 10,000 subscribers in 6 months using exactly what's in this book. The lead generation chapter alone was worth 10x the price.",
    initials: 'RS',
  },
  {
    name: 'Leah Courage',
    result: 'First video ranking in a weekend',
    quote:
      'As a real estate agent, I was skeptical about YouTube. This book broke it down so simply that I had my first video up and ranking in a weekend.',
    initials: 'LC',
  },
  {
    name: 'Natalia Echeverri',
    result: 'Videos ranking on page one',
    quote:
      'The keyword research system in Chapter 8 changed everything. My videos started ranking on page one immediately and the leads followed.',
    initials: 'NE',
  },
  {
    name: "Patrick O'Connor",
    result: 'Business results, not vanity metrics',
    quote:
      "I've bought every YouTube course out there. This is the only resource that focuses on actual business results, not vanity metrics. Worth every penny.",
    initials: 'PO',
  },
]

function StarIcon() {
  return (
    <svg className="w-4 h-4 fill-brand-red" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  )
}

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative bg-brand-cream py-24 lg:py-32 overflow-hidden"
    >
      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, #0a0a0a 1px, transparent 0)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div
          className="text-center mb-14 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="font-body text-xs sm:text-sm tracking-[0.25em] uppercase text-brand-red-dark font-medium">
            What Readers Say
          </span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-black text-brand-charcoal text-balance">
            Real Results from Real
            <br className="hidden sm:block" /> Business Owners
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              className={`group bg-white rounded-2xl p-7 sm:p-8 shadow-sm border border-brand-charcoal/[0.04] hover:shadow-md hover:border-brand-red/10 transition-all duration-300 ${
                i === 3 ? 'lg:col-span-1' : ''
              } ${i === 4 ? 'md:col-span-2 lg:col-span-1' : ''}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <div className="flex gap-0.5 mb-5">
                {[...Array(5)].map((_, j) => (
                  <StarIcon key={j} />
                ))}
              </div>

              <p className="font-body text-brand-charcoal/75 leading-relaxed text-[0.95rem]">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="flex items-center gap-3.5 mt-6 pt-5 border-t border-brand-charcoal/[0.06]">
                <div className="w-10 h-10 rounded-full bg-brand-charcoal flex items-center justify-center flex-shrink-0">
                  <span className="font-body font-bold text-brand-cream text-xs tracking-wide">
                    {t.initials}
                  </span>
                </div>
                <div>
                  <div className="font-body font-semibold text-brand-charcoal text-sm">
                    {t.name}
                  </div>
                  <div className="font-body text-brand-red-dark text-xs mt-0.5">
                    {t.result}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
