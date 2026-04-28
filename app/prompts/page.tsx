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

        {/* PROMINENT Bundle CTA — above the fold */}
        <section className="relative max-w-2xl mx-auto px-5 sm:px-8 mb-16">
          <div className="rounded-2xl bg-gradient-to-br from-brand-red/[0.14] to-brand-red/[0.03] border border-brand-red/30 shadow-[0_24px_80px_rgba(196,18,48,0.10)] p-7 sm:p-9">
            <div className="text-center">
              <span className="font-accent text-2xl text-brand-red/90">
                free, instant, in your inbox
              </span>
              <h2 className="mt-1 font-display text-2xl sm:text-3xl lg:text-4xl font-normal uppercase text-brand-cream leading-[0.95]">
                Get All {prompts.length} Prompts
                <br />
                <span className="text-brand-red">As One PDF</span>
              </h2>
              <p className="mt-4 font-body text-brand-cream/70 leading-relaxed">
                Drop your name and email. We email you the complete prompt
                library as a single printable PDF.{' '}
                <strong className="text-brand-cream font-semibold">
                  Free.
                </strong>{' '}
                Plus you unlock every other resource on the site instantly.
              </p>
            </div>
            <div className="mt-7">
              <LeadCaptureForm
                tags={['src_prompts', 'dl_prompts_bundle']}
                listIds={[30]}
                ctaLabel={`Send Me All ${prompts.length} Prompts`}
                successHeading="Bundle ready."
                successText="Click below to grab the PDF. We also emailed it to you."
                redirectUrl="/pdfs/csy-prompts-bundle.pdf"
                redirectDelay={1500}
              />
            </div>
            <p className="mt-4 font-body text-xs text-brand-cream/35 text-center">
              No spam. Unsubscribe anytime. Or scroll down to copy individual
              prompts (each one still requires an email to download as a PDF).
            </p>
          </div>
        </section>

        {/* How to use */}
        <section className="relative max-w-3xl mx-auto px-5 sm:px-8 mb-12">
          <div className="rounded-2xl bg-white/[0.02] border border-white/[0.06] p-6 sm:p-7">
            <h2 className="font-display text-lg font-normal uppercase text-brand-cream mb-3">
              How to Use These
            </h2>
            <ol className="space-y-2 font-body text-sm text-brand-cream/65 list-decimal list-inside">
              <li>Open ChatGPT, Claude, or Gemini.</li>
              <li>Find the prompt for your situation below.</li>
              <li>
                Click <strong className="text-brand-cream font-semibold">Copy</strong> to grab the full prompt.
              </li>
              <li>
                Replace the bracketed placeholders (
                <code className="px-1.5 py-0.5 rounded bg-white/[0.06] text-brand-cream/80 text-xs">
                  [YOUR PROFESSION]
                </code>
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

        {/* Prompts grid (24 cards) */}
        <section className="relative max-w-7xl mx-auto px-5 sm:px-8 mb-16">
          <div className="text-center mb-8">
            <span className="font-body text-xs tracking-[0.25em] uppercase text-brand-red font-medium">
              Prefer to Browse?
            </span>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl font-normal uppercase text-brand-cream">
              All {prompts.length} Prompts. Categorized.
            </h2>
            <p className="mt-3 font-body text-brand-cream/45 text-sm max-w-xl mx-auto">
              Filter by chapter group, search by keyword, or grab them one at a
              time. Each individual download requires a name + email.
            </p>
          </div>
          <PromptsGrid prompts={prompts} />
        </section>

        {/* Repeat the email capture below the grid for late scrollers */}
        <section className="relative max-w-2xl mx-auto px-5 sm:px-8 mb-16">
          <div className="rounded-2xl bg-brand-charcoal-light border border-white/[0.08] p-7 sm:p-9">
            <div className="text-center">
              <span className="font-accent text-xl text-brand-red/85">
                still here? grab them all.
              </span>
              <h2 className="mt-1 font-display text-xl sm:text-2xl font-normal uppercase text-brand-cream">
                Bundle of All {prompts.length}, One PDF
              </h2>
            </div>
            <div className="mt-5">
              <LeadCaptureForm
                tags={['src_prompts', 'dl_prompts_bundle']}
                listIds={[30]}
                ctaLabel="Send Me the Bundle"
                successHeading="Bundle ready."
                successText="Check your inbox. PDF opens in a new tab now."
                redirectUrl="/pdfs/csy-prompts-bundle.pdf"
                redirectDelay={1500}
              />
            </div>
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
