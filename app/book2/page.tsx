import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import LeadCaptureForm from '@/components/LeadCaptureForm'

export const metadata: Metadata = {
  title: 'What\'s Next | Aaron Cuha\'s Next Book',
  description:
    'Get notified when Aaron\'s next book drops. Set in Stone is coming. Drop your email for early access pricing and bonus materials.',
}

export default function Book2Page() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-brand-charcoal pt-28 sm:pt-32 pb-16 noise-overlay">
        {/* Hero */}
        <section className="relative max-w-4xl mx-auto px-5 sm:px-8 mb-16 sm:mb-20">
          <div className="text-center">
            <span className="font-body text-xs sm:text-sm tracking-[0.25em] uppercase text-brand-red font-medium">
              What&apos;s Next
            </span>
            <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-normal uppercase text-brand-cream leading-[0.95]">
              <span className="text-brand-red">Set in Stone</span>
              <br />
              Is Coming.
            </h1>
            <p className="mt-6 font-body text-brand-cream/60 text-lg leading-relaxed max-w-2xl mx-auto">
              Aaron&apos;s next book picks up where mindset meets execution. The
              architecture for{' '}
              <strong className="text-brand-cream font-semibold">
                building businesses that don&apos;t crumble
              </strong>
              {' '}when the market shifts, the algorithm changes, or you have a
              bad month.
            </p>
          </div>
        </section>

        {/* Email capture */}
        <section className="relative max-w-xl mx-auto px-5 sm:px-8 mb-16 sm:mb-24">
          <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] p-7 sm:p-10">
            <h2 className="font-display text-2xl sm:text-3xl font-normal uppercase text-brand-cream text-center">
              Get the First Chapter Free
            </h2>
            <p className="mt-4 font-body text-brand-cream/60 text-center leading-relaxed">
              Drop your email. You&apos;ll be the first to know when{' '}
              <em>Set in Stone</em> drops, plus you&apos;ll get the first
              chapter delivered the moment it&apos;s ready.
            </p>
            <div className="mt-7">
              <LeadCaptureForm
                tags={['src_book2', 'set_in_stone_waitlist']}
                ctaLabel="Send Me the First Chapter"
                successHeading="You're on the list."
                successText="When the first chapter is ready, it lands in your inbox first."
              />
            </div>
            <p className="mt-4 font-body text-xs text-brand-cream/30 text-center">
              No spam. Unsubscribe anytime. We send updates roughly monthly.
            </p>
          </div>
        </section>

        {/* What you get on the launch list */}
        <section className="relative max-w-3xl mx-auto px-5 sm:px-8 mb-16 sm:mb-24">
          <h2 className="font-display text-2xl sm:text-3xl font-normal uppercase text-brand-cream mb-6">
            Launch List Perks
          </h2>
          <div className="space-y-3">
            {[
              {
                title: 'Free first chapter',
                desc: 'Delivered to your inbox the moment the first chapter is finalized. Read it before anyone else.',
              },
              {
                title: 'Pre-order pricing',
                desc: 'Locked in before public launch. Lower than the retail price.',
              },
              {
                title: 'Bonus materials',
                desc: 'Worksheets, prompts, and templates that won\'t be available with the regular release.',
              },
              {
                title: 'First access to companion resources',
                desc: 'When the worksheets and prompt library for Set in Stone go live, launch list members get them first.',
              },
              {
                title: 'Optional live Q&A',
                desc: 'Invitation to a small live call with Aaron before launch to ask anything about the book.',
              },
            ].map((p) => (
              <div
                key={p.title}
                className="flex items-start gap-4 p-5 rounded-xl bg-white/[0.02] border border-white/[0.05]"
              >
                <svg
                  className="w-5 h-5 text-brand-red flex-shrink-0 mt-1"
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
                <div>
                  <h3 className="font-body font-bold text-brand-cream text-base">
                    {p.title}
                  </h3>
                  <p className="mt-1 font-body text-sm text-brand-cream/50 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Author note */}
        <section className="relative max-w-2xl mx-auto px-5 sm:px-8 text-center">
          <p className="font-accent text-2xl sm:text-3xl text-brand-cream/40 italic mb-4">
            Keep it crazy simple.
          </p>
          <p className="font-body text-brand-cream/60">
            Aaron Cuha
          </p>
        </section>
      </main>
      <Footer />
    </>
  )
}
