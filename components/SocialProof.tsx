'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

function Counter({
  target,
  suffix = '',
}: {
  target: number
  suffix?: string
}) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })

  useEffect(() => {
    if (!isInView) return
    const duration = 2000
    const steps = 60
    const increment = target / steps
    let current = 0
    const interval = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(interval)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(interval)
  }, [isInView, target])

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

const stats = [
  { value: 200, suffix: 'K+', label: 'YouTube Subscribers' },
  { value: 15, suffix: 'K+', label: 'Coaching Hours' },
  { value: 2, suffix: 'M+', label: 'Client Revenue Generated' },
  { value: 1, suffix: 'M+', label: 'Client Channel Subs Built' },
]

export default function SocialProof() {
  return (
    <section className="relative bg-brand-charcoal-light border-y border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14 sm:py-16">
        <p className="text-center font-body text-sm text-brand-cream/40 mb-8 max-w-xl mx-auto">
          Built by a coach who actually uses YouTube to run a business — not teach YouTube.
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <div className="font-display text-4xl sm:text-5xl font-normal uppercase text-brand-red">
                <Counter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="mt-2 text-brand-cream/35 font-body text-xs sm:text-sm tracking-[0.15em] uppercase">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
