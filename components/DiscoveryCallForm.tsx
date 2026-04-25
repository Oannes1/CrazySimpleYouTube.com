'use client'

import { useState } from 'react'

/**
 * Placeholder Brevo Meetings booking URL.
 * Replace with the real URL once Aaron sets up his meeting type in Brevo:
 *   https://meet.brevo.com/aaron-cuha/discovery
 */
const BREVO_MEETINGS_URL =
  process.env.NEXT_PUBLIC_BREVO_MEETINGS_URL ||
  'https://aaroncuha.com/services/youtube-services'

export default function DiscoveryCallForm() {
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    const form = e.currentTarget
    const fd = new FormData(form)
    const firstName = fd.get('firstName') as string
    const email = fd.get('email') as string
    const businessType = fd.get('businessType') as string
    const youtubeStage = fd.get('youtubeStage') as string

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          firstName,
          tags: [
            'src_workwithme',
            'discovery_call_request',
            `industry_${businessType.toLowerCase().replace(/\s+/g, '_')}`,
            `stage_${youtubeStage.toLowerCase().replace(/\s+/g, '_')}`,
          ],
          attributes: {
            INDUSTRY: businessType,
            YOUTUBE_STAGE: youtubeStage,
          },
        }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Something went wrong')
      }

      setStatus('success')
      // Redirect to Brevo Meetings booking page
      setTimeout(() => {
        window.location.href = BREVO_MEETINGS_URL
      }, 1800)
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong')
    }
  }

  if (status === 'success') {
    return (
      <div className="p-7 rounded-2xl bg-brand-red/[0.08] border border-brand-red/20 text-center">
        <div className="w-12 h-12 rounded-full bg-brand-red/15 mx-auto flex items-center justify-center mb-4">
          <svg
            className="w-6 h-6 text-brand-red"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="font-display text-xl font-normal uppercase text-brand-cream">
          Got It.
        </h3>
        <p className="mt-2 font-body text-brand-cream/60 text-sm">
          Sending you to the calendar to pick a time...
        </p>
        <a
          href={BREVO_MEETINGS_URL}
          className="mt-4 inline-block font-body font-semibold text-brand-red hover:text-brand-red-light underline text-sm"
        >
          Or click here if it doesn&apos;t auto-redirect
        </a>
      </div>
    )
  }

  const inputCls =
    'w-full px-5 py-3.5 rounded-xl bg-white/[0.06] border border-white/[0.08] font-body text-brand-cream placeholder:text-brand-cream/25 focus:outline-none focus:ring-2 focus:ring-brand-red/30 focus:border-brand-red/30'

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid sm:grid-cols-2 gap-3">
        <input
          type="text"
          name="firstName"
          placeholder="First name"
          required
          disabled={status === 'loading'}
          className={inputCls}
        />
        <input
          type="email"
          name="email"
          placeholder="Email address"
          required
          disabled={status === 'loading'}
          className={inputCls}
        />
      </div>
      <select
        name="businessType"
        required
        disabled={status === 'loading'}
        className={inputCls}
        defaultValue=""
      >
        <option value="" disabled>
          What kind of business?
        </option>
        <option value="real-estate">Real Estate</option>
        <option value="mortgage">Mortgage / Lending</option>
        <option value="coaching">Coaching</option>
        <option value="consulting">Consulting</option>
        <option value="financial-advisor">Financial Advisor</option>
        <option value="attorney">Attorney</option>
        <option value="contractor">Home Services / Contractor</option>
        <option value="other">Other</option>
      </select>
      <select
        name="youtubeStage"
        required
        disabled={status === 'loading'}
        className={inputCls}
        defaultValue=""
      >
        <option value="" disabled>
          Where are you on YouTube?
        </option>
        <option value="not-started">Not started yet</option>
        <option value="early">A few videos, no traction yet</option>
        <option value="growing">1K+ subs, some leads</option>
        <option value="established">10K+ subs, real revenue</option>
      </select>
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full py-4 bg-brand-red text-white font-body font-bold text-lg rounded-xl hover:bg-brand-red-light transition-colors shadow-lg shadow-brand-red/20 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? 'One sec...' : 'Book a Discovery Call'}
      </button>
      {status === 'error' && (
        <p className="text-brand-red-light font-body text-sm text-center">
          {errorMsg}
        </p>
      )}
      <p className="font-body text-xs text-brand-cream/30 text-center pt-1">
        30-minute call. No high-pressure pitch. If we&apos;re not a fit,
        Aaron will tell you.
      </p>
    </form>
  )
}
