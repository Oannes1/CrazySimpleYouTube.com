'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const AMAZON_LINK =
  process.env.NEXT_PUBLIC_AMAZON_LINK ||
  'https://www.amazon.com/dp/B0GWYK8TX6'

export default function VaultForm() {
  const router = useRouter()
  const [bookChecked, setBookChecked] = useState(false)
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [fileName, setFileName] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    const form = e.currentTarget
    const fd = new FormData(form)
    // Normalize checkbox to explicit string
    fd.set('bookPurchased', bookChecked ? 'true' : 'false')

    try {
      const res = await fetch('/api/vault', { method: 'POST', body: fd })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Something went wrong. Try again.')
      }
      const data = await res.json()
      router.push(`/vault/thank-you?book=${data.bookPurchased ? 'true' : 'false'}`)
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong')
    }
  }

  const inputCls =
    'w-full px-5 py-4 rounded-xl bg-white border border-vault-dark/15 font-body text-vault-dark placeholder:text-vault-dark/40 focus:outline-none focus:ring-2 focus:ring-vault-red/40 focus:border-vault-red/40 text-base'

  return (
    <form onSubmit={handleSubmit} className="space-y-3.5">
      {/* Required fields */}
      <input
        type="text"
        name="firstName"
        placeholder="First name"
        required
        autoComplete="given-name"
        disabled={status === 'loading'}
        className={inputCls}
      />
      <input
        type="tel"
        name="phone"
        placeholder="Phone number"
        required
        autoComplete="tel"
        disabled={status === 'loading'}
        className={inputCls}
      />
      <input
        type="email"
        name="email"
        placeholder="Email address"
        required
        autoComplete="email"
        disabled={status === 'loading'}
        className={inputCls}
      />

      {/* Divider */}
      <div className="flex items-center gap-3 py-1">
        <div className="flex-1 h-px bg-vault-dark/10" />
        <span className="font-body text-[0.7rem] tracking-[0.18em] uppercase text-vault-dark/35">
          Got the book?
        </span>
        <div className="flex-1 h-px bg-vault-dark/10" />
      </div>

      {/* Book purchased checkbox */}
      <label className="flex items-start gap-3 cursor-pointer select-none p-4 rounded-xl bg-vault-gold/[0.07] border border-vault-gold/25 hover:border-vault-gold/45 transition-colors">
        <input
          type="checkbox"
          checked={bookChecked}
          onChange={(e) => setBookChecked(e.target.checked)}
          disabled={status === 'loading'}
          className="mt-0.5 w-5 h-5 accent-vault-red flex-shrink-0"
        />
        <span className="font-body text-sm text-vault-dark leading-snug">
          <strong className="font-bold">
            I bought Crazy Simple YouTube on Amazon.
          </strong>
          <span className="block text-vault-dark/55 mt-0.5">
            Check this to also get the 2-hour live Zoom bonus call.
          </span>
        </span>
      </label>

      {/* Conditional fields — only when book checked */}
      {bookChecked && (
        <div className="space-y-3.5 pl-1">
          <div>
            <input
              type="text"
              name="amazonOrder"
              placeholder="Amazon order number"
              disabled={status === 'loading'}
              className={inputCls}
            />
            <p className="mt-1.5 font-body text-xs text-vault-dark/45">
              Optional. Not verified. Just helpful for our records.
            </p>
          </div>

          <div>
            <label className="block">
              <span className="sr-only">Upload Amazon receipt</span>
              <div className="flex items-center gap-3 px-5 py-4 rounded-xl bg-white border border-dashed border-vault-dark/25 hover:border-vault-red/40 transition-colors cursor-pointer">
                <svg
                  className="w-5 h-5 text-vault-dark/40 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>
                <span className="font-body text-sm text-vault-dark/55 truncate">
                  {fileName || 'Upload Amazon receipt (optional)'}
                </span>
                <input
                  type="file"
                  name="receipt"
                  accept=".pdf,.jpg,.jpeg,.png"
                  disabled={status === 'loading'}
                  onChange={(e) =>
                    setFileName(e.target.files?.[0]?.name || '')
                  }
                  className="hidden"
                />
              </div>
            </label>
            <p className="mt-1.5 font-body text-xs text-vault-dark/45">
              Optional. Skip if you would rather not. Honor system. We do not
              verify.
            </p>
          </div>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full min-h-[54px] py-4 bg-vault-red text-white font-body font-bold text-lg rounded-xl hover:bg-vault-red/90 transition-colors shadow-lg shadow-vault-red/25 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? 'Sending...' : 'SEND ME THE VAULT'}
      </button>

      {status === 'error' && (
        <p className="text-vault-red font-body text-sm text-center font-semibold">
          {errorMsg}
        </p>
      )}

      <p className="font-body text-xs text-vault-dark/40 text-center">
        We respect your inbox. Unsubscribe anytime.
      </p>

      {/* Hidden helper: get-the-book link surfaces if not checked */}
      {!bookChecked && (
        <p className="font-body text-xs text-vault-dark/50 text-center">
          Have not bought it yet?{' '}
          <a
            href={AMAZON_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="text-vault-red font-semibold underline underline-offset-2"
          >
            Grab it on Amazon
          </a>{' '}
          then check the box.
        </p>
      )}
    </form>
  )
}
