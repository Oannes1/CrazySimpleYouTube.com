import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import PromptsGrid from '@/components/PromptsGrid'
import LeadCaptureForm from '@/components/LeadCaptureForm'
import { prompts } from '@/lib/prompts-data'

export const metadata: Metadata = {
  title: 'AI Prompt Library | Crazy Simple YouTube',
  description:
    'Every AI prompt from the book Crazy Simple YouTube. 24 prompts for ChatGPT, Claude, and Gemini. Copy, paste, customize.',
  openGraph: {
    title: 'AI Prompt Library | Crazy Simple YouTube',
    description:
      '24 AI prompts from the book. Built for ChatGPT, Claude, and Gemini.',
    type: 'website',
  },
}

export default function PromptsPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-brand-charcoal pt-28 sm:pt-32 pb-16 noise-overlay">
        {/* Hero */}
        <section className="relative max-w-5xl mx-auto px-5 sm:px-8 mb-12">
          <div className="text-center">
            <span className="font-body text-xs sm:text-sm tracking-[0.25em] uppercase text-brand-red font-medium">
              The Companion Library
            </span>
            <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-normal uppercase text-brand-cream leading-[0.95]">
              Every AI Prompt
              <br />
              <span className="text-brand-red">From the Book</span>
            </h1>
            <p className="mt-6 font-body text-brand-cream/65 text-lg leading-relaxed max-w-2xl mx-auto">
              {prompts.length} prompts, organized by chapter. Built for{' '}
              <strong className="text-brand-cream font-semibold">
                ChatGPT, Claude, and Gemini
              </strong>
              . Copy, paste, customize.
            </p>
          </div>
        </section>

        {/* How to use */}
        <section className="relative max-w-3xl mx-auto px-5 sm:px-8 mb-16">
          <div className="rounded-2xl bg-white/[0.02] border border-white/[0.06] p-6 sm:p-7">
            <h2 className="font-display text-lg font-normal uppercase text-brand-cream mb-3">
              How to Use These
            </h2>
            <ol className="space-y-2 font-body text-sm text-brand-cream/65 list-decimal list-inside">
              <li>Open ChatGPT, Claude, or Gemini.</li>
              <li>Find the prompt for your situation below.</li>
              <li>Click <strong className="text-brand-cream font-semibold">Copy</strong> to grab the full prompt.</li>
              <li>
                Replace the bracketed placeholders (
                <code className="px-1.5 py-0.5 rounded bg-white/[0.06] text-brand-cream/80 text-xs">[YOUR PROFESSION]</code>
                , etc.) with your real info.
              </li>
              <li>Paste into the AI tool. Read the output. Adjust as needed.</li>
            </ol>
            <p className="mt-4 font-body text-xs text-brand-cream/40">
              Aaron&apos;s preference: Claude for long-form strategy, ChatGPT
              for quick brainstorms, Gemini for research-heavy queries.
            </p>
          </div>
        </section>

        {/* Prompts grid */}
        <section className="relative max-w-7xl mx-auto px-5 sm:px-8 mb-16">
          <PromptsGrid prompts={prompts} />
        </section>

        {/* Bundle CTA */}
        <section className="relative max-w-2xl mx-auto px-5 sm:px-8 mb-16">
          <div className="rounded-2xl bg-gradient-to-br from-brand-red/[0.1] to-brand-red/[0.02] border border-brand-red/20 p-7 sm:p-9">
            <div className="text-center">
              <span className="font-body text-xs tracking-[0.2em] uppercase text-brand-red font-bold">
                Free Bundle
              </span>
              <h2 className="mt-3 font-display text-2xl sm:text-3xl font-normal uppercase text-brand-cream">
                Get All {prompts.length} As a PDF
              </h2>
              <p className="mt-3 font-body text-brand-cream/65 leading-relaxed">
                Drop your email. We&apos;ll send the complete prompt library as
                one printable PDF, plus the first chapter of the next book when
                it drops.
              </p>
            </div>
            <div className="mt-6">
              <LeadCaptureForm
                tags={['src_prompts', 'dl_prompts_bundle']}
                ctaLabel="Send Me the Bundle"
                successHeading="Bundle on the way."
                successText="Check your inbox in the next 5 minutes."
              />
            </div>
            <p className="mt-3 font-body text-xs text-brand-cream/30 text-center">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </section>

        {/* Cross promo */}
        <section className="relative max-w-3xl mx-auto px-5 sm:px-8 grid sm:grid-cols-2 gap-4">
          <a
            href="/worksheets"
            className="group p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-brand-red/15 transition-colors"
          >
            <div className="font-body text-xs tracking-[0.2em] uppercase text-brand-red font-bold">
              Want the Action Steps?
            </div>
            <h3 className="mt-2 font-display text-xl font-normal uppercase text-brand-cream">
              Worksheets &rarr;
            </h3>
            <p className="mt-2 font-body text-sm text-brand-cream/55">
              24 fillable PDFs, one per chapter. Built for execution.
            </p>
          </a>
          <a
            href="/community"
            className="group p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-brand-red/15 transition-colors"
          >
            <div className="font-body text-xs tracking-[0.2em] uppercase text-brand-red font-bold">
              Want Feedback?
            </div>
            <h3 className="mt-2 font-display text-xl font-normal uppercase text-brand-cream">
              Community &rarr;
            </h3>
            <p className="mt-2 font-body text-sm text-brand-cream/55">
              Join the community where these prompts get real critique.
            </p>
          </a>
        </section>
      </main>
      <Footer />
    </>
  )
}
