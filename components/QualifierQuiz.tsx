'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Question {
  q: string
  options: { label: string; weight: number }[]
}

const questions: Question[] = [
  {
    q: 'Where are you in your YouTube journey?',
    options: [
      { label: "I haven't started yet", weight: 1 },
      { label: 'A few videos, no consistent traction', weight: 2 },
      { label: '1,000+ subs and some leads', weight: 3 },
      { label: '10,000+ subs and revenue from YouTube', weight: 4 },
    ],
  },
  {
    q: 'How much time per week can you give YouTube?',
    options: [
      { label: '0–2 hours', weight: 4 },
      { label: '2–5 hours', weight: 3 },
      { label: '5–10 hours', weight: 2 },
      { label: '10+ hours', weight: 1 },
    ],
  },
  {
    q: "What's your monthly business revenue?",
    options: [
      { label: 'Pre-revenue', weight: 1 },
      { label: '$5K–$25K', weight: 2 },
      { label: '$25K–$100K', weight: 3 },
      { label: '$100K+', weight: 4 },
    ],
  },
]

const recommendations = {
  community: {
    name: 'Community',
    why: 'You\'re early. Get the system, get the peer group, and start filming. Once you have momentum, we can talk about leveling up.',
    cta: 'Join the Community',
    href: '/community',
  },
  grow: {
    name: 'GROW Coaching',
    why: 'You have time and traction. What you need now is a coach to optimize the system you\'re already running.',
    cta: 'Book a Discovery Call',
    href: '#book-call',
  },
  scale: {
    name: 'SCALE Done-With-You',
    why: 'You have revenue but limited time. We help with execution while you stay focused on the business.',
    cta: 'Book a Discovery Call',
    href: '#book-call',
  },
  management: {
    name: 'YouTube Management',
    why: 'You have the business and the capital. You need the channel run for you so you can stay on what you do best.',
    cta: 'Book a Discovery Call',
    href: '#book-call',
  },
}

function recommend(score: number, totalAnswered: number): keyof typeof recommendations {
  const avg = score / totalAnswered
  if (avg <= 1.5) return 'community'
  if (avg <= 2.5) return 'grow'
  if (avg <= 3.5) return 'scale'
  return 'management'
}

export default function QualifierQuiz() {
  const [answers, setAnswers] = useState<number[]>([])
  const [currentQ, setCurrentQ] = useState(0)
  const [showResult, setShowResult] = useState(false)

  function selectAnswer(weight: number) {
    const next = [...answers, weight]
    setAnswers(next)
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1)
    } else {
      setShowResult(true)
    }
  }

  function reset() {
    setAnswers([])
    setCurrentQ(0)
    setShowResult(false)
  }

  if (showResult) {
    const score = answers.reduce((a, b) => a + b, 0)
    const rec = recommendations[recommend(score, answers.length)]
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-7 sm:p-9 rounded-2xl bg-brand-charcoal border border-brand-red/20"
      >
        <div className="font-body text-xs tracking-[0.2em] uppercase text-brand-red font-bold">
          Your Recommended Path
        </div>
        <h3 className="mt-3 font-display text-2xl sm:text-3xl font-normal uppercase text-brand-cream">
          {rec.name}
        </h3>
        <p className="mt-4 font-body text-brand-cream/70 leading-relaxed">
          {rec.why}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={rec.href}
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand-red text-white font-body font-bold rounded-xl hover:bg-brand-red-light transition-colors"
          >
            {rec.cta}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <button
            onClick={reset}
            className="px-7 py-3.5 border border-white/10 text-brand-cream/60 font-body font-medium rounded-xl hover:border-brand-red/30 hover:text-brand-cream transition-colors"
          >
            Retake the quiz
          </button>
        </div>
      </motion.div>
    )
  }

  const q = questions[currentQ]
  return (
    <div className="p-7 sm:p-9 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
      <div className="flex items-center gap-3 mb-5">
        <div className="font-body text-xs tracking-[0.2em] uppercase text-brand-red font-bold">
          Question {currentQ + 1} of {questions.length}
        </div>
        <div className="flex-1 h-px bg-white/[0.08]" />
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQ}
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -8 }}
          transition={{ duration: 0.25 }}
        >
          <h3 className="font-display text-xl sm:text-2xl font-normal uppercase text-brand-cream mb-5">
            {q.q}
          </h3>
          <div className="space-y-2">
            {q.options.map((opt) => (
              <button
                key={opt.label}
                onClick={() => selectAnswer(opt.weight)}
                className="w-full text-left px-5 py-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-brand-red/[0.08] hover:border-brand-red/30 transition-colors font-body text-brand-cream/80 hover:text-brand-cream"
              >
                {opt.label}
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
