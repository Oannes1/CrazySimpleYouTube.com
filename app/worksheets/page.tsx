import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import LeadCaptureForm from '@/components/LeadCaptureForm'
import {
  worksheets,
  type WorksheetPart,
  WORKSHEET_BUNDLE_URL,
  worksheetPdfUrl,
} from '@/lib/worksheets-data'

export const metadata: Metadata = {
  title: '24 Action Worksheets | Crazy Simple YouTube',
  description:
    'Free printable worksheets from Crazy Simple YouTube. One Crazy Simple Action per chapter. Built for execution, not theory.',
}

const partOrder: WorksheetPart[] = [
  'Foundation',
  'Content Creation',
  'Business of YouTube',
  'Scale and Sustainability',
]

const partColors: Record<WorksheetPart, string> = {
  Foundation: 'bg-brand-red/[0.08] text-brand-red border-brand-red/20',
  'Content Creation': 'bg-blue-500/[0.08] text-blue-400 border-blue-500/20',
  'Business of YouTube':
    'bg-orange-500/[0.08] text-orange-400 border-orange-500/20',
  'Scale and Sustainability':
    'bg-purple-500/[0.08] text-purple-400 border-purple-500/20',
}

export default function WorksheetsPage() {
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
              24 Worksheets
              <br />
              <span className="text-brand-red">To Run the Plays</span>
            </h1>
            <p className="mt-6 font-body text-brand-cream/65 text-lg leading-relaxed max-w-2xl mx-auto">
              Every Crazy Simple Action from the book.{' '}
              <strong className="text-brand-cream font-semibold">
                Printable. Fillable. Built for execution.
              </strong>{' '}
              Not theory.
            </p>
          </div>
        </section>

        {/* Bundle CTA */}
        <section className="relative max-w-2xl mx-auto px-5 sm:px-8 mb-16">
          <div className="rounded-2xl bg-gradient-to-br from-brand-red/[0.1] to-brand-red/[0.02] border border-brand-red/20 p-7 sm:p-9">
            <div className="text-center">
              <span className="font-body text-xs tracking-[0.2em] uppercase text-brand-red font-bold">
                Get the Whole Bundle
              </span>
              <h2 className="mt-3 font-display text-2xl sm:text-3xl font-normal uppercase text-brand-cream">
                All 24 Worksheets, One PDF
              </h2>
              <p className="mt-3 font-body text-brand-cream/65 leading-relaxed">
                Drop your email. We send the complete bundle plus a welcome
                sequence with one tactical idea per week. Free.
              </p>
            </div>
            <div className="mt-6">
              <LeadCaptureForm
                tags={['src_worksheets', 'dl_worksheets_bundle']}
                listIds={[29]}
                ctaLabel="Send Me the Bundle"
                successHeading="Bundle ready."
                successText="Click below to grab the PDF. We also emailed it to you."
                redirectUrl={WORKSHEET_BUNDLE_URL}
                redirectDelay={1500}
              />
            </div>
            <p className="mt-3 font-body text-xs text-brand-cream/30 text-center">
              No spam. We email occasionally with one useful thing at a time.
            </p>
          </div>
        </section>

        {/* Worksheets by part */}
        <section className="relative max-w-5xl mx-auto px-5 sm:px-8 mb-16">
          {partOrder.map((part) => {
            const items = worksheets.filter((w) => w.part === part)
            if (items.length === 0) return null
            return (
              <div key={part} className="mb-12 last:mb-0">
                <div className="flex items-baseline gap-3 mb-5">
                  <h2 className="font-display text-2xl sm:text-3xl font-normal uppercase text-brand-cream">
                    {part}
                  </h2>
                  <span className="font-body text-sm text-brand-cream/30">
                    {items.length} {items.length === 1 ? 'worksheet' : 'worksheets'}
                  </span>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {items.map((w) => (
                    <div
                      key={w.slug}
                      className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-brand-red/20 transition-colors flex flex-col"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <span
                          className={`inline-flex px-2 py-1 rounded-md border text-[0.55rem] font-body font-bold tracking-wider uppercase ${partColors[w.part]}`}
                        >
                          Ch {w.chapter}
                        </span>
                        <span className="font-body text-[0.65rem] text-brand-cream/35">
                          {w.timeMinutes} min
                        </span>
                      </div>
                      <h3 className="font-display text-base sm:text-lg font-normal uppercase text-brand-cream leading-tight">
                        {w.title}
                      </h3>
                      <p className="mt-2 font-body text-xs text-brand-cream/50 leading-relaxed flex-1">
                        {w.shortDesc}
                      </p>
                      {w.caseStudyPerson && (
                        <p className="mt-2 font-body text-[0.65rem] text-brand-cream/30">
                          Case study: {w.caseStudyPerson}
                        </p>
                      )}
                      <a
                        href={worksheetPdfUrl(w)}
                        target="_blank"
                        rel="noopener"
                        className="mt-4 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-brand-red/30 text-brand-red hover:bg-brand-red/[0.06] hover:border-brand-red/50 font-body font-semibold text-xs transition-colors"
                      >
                        Download PDF
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </section>

        {/* Why these work */}
        <section className="relative max-w-3xl mx-auto px-5 sm:px-8 mb-16">
          <div className="rounded-2xl bg-white/[0.02] border border-white/[0.05] p-7 sm:p-9">
            <h2 className="font-display text-2xl sm:text-3xl font-normal uppercase text-brand-cream mb-5">
              Why These Worksheets Work
            </h2>
            <ul className="space-y-3 font-body text-brand-cream/65 leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-brand-red flex-shrink-0" />
                Built for one sitting. Each worksheet takes 5 to 90 minutes
                depending on the chapter.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-brand-red flex-shrink-0" />
                Fillable PDF form fields so you can complete digitally without
                printing.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-brand-red flex-shrink-0" />
                Print-friendly black and white version included.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-brand-red flex-shrink-0" />
                Each worksheet pairs with the corresponding chapter. Read,
                then execute.
              </li>
            </ul>
          </div>
        </section>

        {/* Cross-promo */}
        <section className="relative max-w-3xl mx-auto px-5 sm:px-8 grid sm:grid-cols-2 gap-4">
          <a
            href="/prompts"
            className="group p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-brand-red/15 transition-colors"
          >
            <div className="font-body text-xs tracking-[0.2em] uppercase text-brand-red font-bold">
              Want the AI Prompts Too?
            </div>
            <h3 className="mt-2 font-display text-xl font-normal uppercase text-brand-cream">
              Prompts Library &rarr;
            </h3>
            <p className="mt-2 font-body text-sm text-brand-cream/55">
              24 AI prompts to use with ChatGPT, Claude, and Gemini.
            </p>
          </a>
          <a
            href="/community"
            className="group p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-brand-red/15 transition-colors"
          >
            <div className="font-body text-xs tracking-[0.2em] uppercase text-brand-red font-bold">
              Want Help Executing?
            </div>
            <h3 className="mt-2 font-display text-xl font-normal uppercase text-brand-cream">
              Join the Community &rarr;
            </h3>
            <p className="mt-2 font-body text-sm text-brand-cream/55">
              Get feedback as you fill these out.
            </p>
          </a>
        </section>
      </main>
      <Footer />
    </>
  )
}
