'use client'

import { motion } from 'framer-motion'

const AMAZON_LINK = process.env.NEXT_PUBLIC_AMAZON_LINK || 'https://www.amazon.com/dp/B0GWYK8TX6'

const steps = [
  {
    level: 1,
    name: 'The Book',
    price: '$19.99',
    description: 'The complete YouTube growth system in 24 chapters.',
    cta: 'Get Your Copy',
    href: AMAZON_LINK,
    external: true,
    featured: true,
  },
  {
    level: 2,
    name: 'Free Chapter Kit',
    price: 'Free',
    description:
      'Checklists, AI prompts, and bonus resources for every chapter.',
    cta: 'Get Free Access',
    href: '/bonus',
    external: false,
    featured: false,
  },
  {
    level: 3,
    name: 'Systems Over Hustle',
    price: '$47/mo',
    description: 'Weekly coaching calls, templates, and accountability. Launching May 2026.',
    cta: 'Pre-Sign Up',
    href: 'https://aaroncuha.com/community',
    external: true,
    featured: false,
  },
  {
    level: 4,
    name: 'GROW Coaching',
    price: '$997–$5K/mo',
    description:
      'Personalized coaching, video production, and done-with-you growth.',
    cta: 'Learn More',
    href: 'https://aaroncuha.com',
    external: true,
    featured: false,
  },
  {
    level: 5,
    name: 'YouTube Management',
    price: 'Custom',
    description:
      'Full done-for-you YouTube channel management and production.',
    cta: 'Learn More',
    href: 'https://aaroncuha.com',
    external: true,
    featured: false,
  },
]

export default function ValueLadder() {
  return (
    <section className="relative bg-brand-cream py-24 lg:py-32 overflow-hidden">
      {/* Dot bg */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, #0a0a0a 1px, transparent 0)',
          backgroundSize: '36px 36px',
        }}
      />

      <div className="relative max-w-6xl mx-auto px-5 sm:px-8">
        <motion.div
          className="text-center mb-14 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="font-body text-xs sm:text-sm tracking-[0.25em] uppercase text-brand-red-dark font-medium">
            Your Growth Path
          </span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-normal uppercase text-brand-charcoal">
            Choose Your
            <br />
            Starting Point
          </h2>
        </motion.div>

        {/* Desktop: horizontal ladder */}
        <div className="hidden lg:block">
          {/* Connecting line */}
          <div className="relative mx-8 mb-8">
            <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-brand-red/30 via-brand-red/20 to-brand-red/10" />
            <div className="flex justify-between relative">
              {steps.map((step, i) => (
                <div key={step.name} className="flex flex-col items-center">
                  <div
                    className={`w-3 h-3 rounded-full border-2 ${
                      step.featured
                        ? 'bg-brand-red border-brand-red'
                        : 'bg-brand-cream border-brand-red/30'
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-5 gap-4">
            {steps.map((step, i) => (
              <motion.div
                key={step.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <div
                  className={`relative p-6 rounded-2xl border transition-all duration-300 hover:shadow-lg group ${
                    step.featured
                      ? 'bg-brand-charcoal text-brand-cream border-brand-red/30 shadow-lg shadow-brand-red/5'
                      : 'bg-white border-brand-charcoal/[0.06] hover:border-brand-red/15'
                  }`}
                  style={{ marginTop: `${i * 12}px` }}
                >
                  {step.featured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-brand-red text-white text-[0.65rem] font-body font-bold tracking-wider uppercase rounded-full whitespace-nowrap">
                      Start Here
                    </div>
                  )}

                  <div
                    className={`inline-flex px-2.5 py-1 rounded-md text-[0.65rem] font-body font-bold tracking-wider uppercase mb-3 ${
                      step.featured
                        ? 'bg-brand-red/15 text-brand-red'
                        : 'bg-brand-charcoal/[0.04] text-brand-charcoal/40'
                    }`}
                  >
                    Step {step.level}
                  </div>

                  <h3
                    className={`font-display text-lg font-bold ${
                      step.featured ? 'text-brand-cream' : 'text-brand-charcoal'
                    }`}
                  >
                    {step.name}
                  </h3>
                  <div
                    className={`font-display text-2xl font-black mt-1 ${
                      step.featured ? 'text-brand-red' : 'text-brand-red-dark'
                    }`}
                  >
                    {step.price}
                  </div>
                  <p
                    className={`mt-3 font-body text-sm leading-relaxed ${
                      step.featured
                        ? 'text-brand-cream/50'
                        : 'text-brand-charcoal/50'
                    }`}
                  >
                    {step.description}
                  </p>

                  <a
                    href={step.href}
                    target={step.external ? '_blank' : undefined}
                    rel={step.external ? 'noopener noreferrer' : undefined}
                    className={`mt-4 inline-flex items-center gap-1.5 font-body font-semibold text-sm transition-colors ${
                      step.featured
                        ? 'text-brand-red hover:text-brand-red-light'
                        : 'text-brand-red-dark hover:text-brand-red'
                    }`}
                  >
                    {step.cta}
                    <svg
                      className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical stack */}
        <div className="lg:hidden space-y-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.name}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="relative flex gap-4"
            >
              {/* Vertical line + dot */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div
                  className={`w-3 h-3 rounded-full border-2 mt-6 ${
                    step.featured
                      ? 'bg-brand-red border-brand-red'
                      : 'bg-brand-cream border-brand-red/25'
                  }`}
                />
                {i < steps.length - 1 && (
                  <div className="w-px flex-1 bg-brand-red/15 mt-1" />
                )}
              </div>

              {/* Card */}
              <div
                className={`flex-1 p-5 rounded-xl border ${
                  step.featured
                    ? 'bg-brand-charcoal text-brand-cream border-brand-red/25'
                    : 'bg-white border-brand-charcoal/[0.06]'
                }`}
              >
                <div className="flex items-baseline justify-between gap-2">
                  <h3
                    className={`font-display text-lg font-bold ${
                      step.featured ? 'text-brand-cream' : 'text-brand-charcoal'
                    }`}
                  >
                    {step.name}
                  </h3>
                  <span
                    className={`font-display font-black text-lg ${
                      step.featured ? 'text-brand-red' : 'text-brand-red-dark'
                    }`}
                  >
                    {step.price}
                  </span>
                </div>
                <p
                  className={`mt-1.5 font-body text-sm ${
                    step.featured
                      ? 'text-brand-cream/50'
                      : 'text-brand-charcoal/50'
                  }`}
                >
                  {step.description}
                </p>
                <a
                  href={step.href}
                  target={step.external ? '_blank' : undefined}
                  rel={step.external ? 'noopener noreferrer' : undefined}
                  className={`mt-3 inline-flex items-center gap-1 font-body font-semibold text-sm ${
                    step.featured
                      ? 'text-brand-red'
                      : 'text-brand-red-dark'
                  }`}
                >
                  {step.cta}
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
