import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'You are in | The Viral Video Vault',
  description: 'Your Viral Video Vault is on its way.',
  robots: { index: false, follow: false },
}

const AMAZON_LINK =
  process.env.NEXT_PUBLIC_AMAZON_LINK ||
  'https://www.amazon.com/dp/B0GWYK8TX6'

export default function VaultThankYouPage({
  searchParams,
}: {
  searchParams: { book?: string }
}) {
  const bookPurchased = searchParams.book === 'true'

  return (
    <main className="min-h-screen bg-vault-dark text-white antialiased flex items-center">
      <div className="max-w-xl mx-auto px-5 sm:px-8 py-16 w-full">
        {/* Success header */}
        <div className="text-center">
          <div
            className="mx-auto w-16 h-16 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'rgba(34,197,94,0.15)' }}
          >
            <svg
              className="w-8 h-8"
              style={{ color: '#22C55E' }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="mt-6 font-sans font-extrabold text-3xl sm:text-4xl leading-tight">
            You are in. Vault is on its way.
          </h1>
          <p className="mt-4 font-sans text-base text-white/65 leading-relaxed">
            Check your email in the next 2 minutes. Subject line:{' '}
            <strong className="text-white">
              Your Viral Video Vault is here.
            </strong>{' '}
            If you do not see it, check spam or promotions.
          </p>
        </div>

        {/* Conditional block */}
        {bookPurchased ? (
          <div
            className="mt-8 rounded-2xl p-7"
            style={{
              background: 'rgba(184,134,11,0.10)',
              border: '2px solid rgba(184,134,11,0.45)',
            }}
          >
            <div
              className="font-sans text-xs font-bold tracking-[0.18em] uppercase"
              style={{ color: '#B8860B' }}
            >
              Plus
            </div>
            <h2 className="mt-2 font-sans font-extrabold text-xl sm:text-2xl">
              You are on the bonus call list.
            </h2>
            <p className="mt-3 font-sans text-sm text-white/75 leading-relaxed">
              Because you confirmed you bought the book, you are also locked in
              for the 2-hour live Zoom with me in late June 2026.
            </p>
            <p className="mt-2 font-sans text-sm text-white/75 leading-relaxed">
              Watch for a separate email with the call details. Once I lock the
              exact date, you will get the Zoom link, a calendar invite, and
              reminders.
            </p>
          </div>
        ) : (
          <div
            className="mt-8 rounded-2xl p-7"
            style={{
              background: 'rgba(196,18,48,0.08)',
              border: '2px solid rgba(196,18,48,0.40)',
            }}
          >
            <h2 className="font-sans font-extrabold text-xl sm:text-2xl">
              Did not get the book yet?
            </h2>
            <p className="mt-3 font-sans text-sm text-white/75 leading-relaxed">
              Book buyers get a 2-hour live Zoom call with me in late June. It
              is the highest ROI 2 hours you can spend on your channel this
              year.
            </p>
            <p className="mt-2 font-sans text-sm text-white/75 leading-relaxed">
              $9.99 Kindle. $20 paperback. Once you grab it, reply to my next
              email and I will add you to the call list.
            </p>
            <a
              href={AMAZON_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-sans font-bold text-vault-dark transition-transform hover:scale-[1.03]"
              style={{ backgroundColor: '#B8860B' }}
            >
              Get the Book on Amazon
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        )}

        {/* Soft management upsell */}
        <div className="mt-6 rounded-2xl p-7 bg-white/[0.04] border border-white/[0.08]">
          <h2 className="font-sans font-extrabold text-lg sm:text-xl">
            Ready to skip the learning curve?
          </h2>
          <p className="mt-2 font-sans text-sm text-white/65 leading-relaxed">
            The Vault shows you the pattern. Applying it to YOUR market, every
            week, is what YouTube Management does. Filming guidance, editing,
            packaging, SEO, analytics. Done for you.
          </p>
          <a
            href="https://crazysimpleyoutube.com/work-with-me"
            className="mt-4 inline-flex items-center gap-2 px-6 py-3 rounded-xl font-sans font-bold text-white transition-transform hover:scale-[1.03]"
            style={{ backgroundColor: '#457B9D' }}
          >
            Apply for YouTube Management
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

        {/* Phone text-back */}
        <div className="mt-6 text-center">
          <h2 className="font-sans font-bold text-base text-white/80">
            Or text me directly
          </h2>
          <p className="mt-1.5 font-sans text-sm text-white/55 leading-relaxed">
            Text me at{' '}
            <strong className="text-white">[AARON_BUSINESS_CELL]</strong>. Tell
            me you got the Vault. I text back personally.
          </p>
        </div>

        {/* Footer */}
        <p className="mt-12 text-center font-sans text-xs text-white/30">
          &copy; 2026 Haymaker LLC | Crazy Simple YouTube | Aaron Cuha
        </p>
      </div>
    </main>
  )
}
