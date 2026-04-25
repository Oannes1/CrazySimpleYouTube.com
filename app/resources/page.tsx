import type { Metadata } from 'next'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Book Companion Hub | Crazy Simple YouTube Resources',
  description:
    'Every resource, tool, prompt, worksheet, and link mentioned in the book Crazy Simple YouTube by Aaron Cuha. Bookmark this page.',
}

const AMAZON_LINK =
  process.env.NEXT_PUBLIC_AMAZON_LINK ||
  'https://www.amazon.com/dp/B0GWYK8TX6'

const bookCompanion = [
  {
    href: '/prompts',
    title: 'AI Prompts',
    desc: '24 AI prompts from the book. Built for ChatGPT, Claude, and Gemini. Copy, paste, customize.',
    badge: '24 prompts',
  },
  {
    href: '/worksheets',
    title: 'Action Worksheets',
    desc: 'One Crazy Simple Action worksheet per chapter. Fillable PDFs you can complete in one sitting.',
    badge: '24 worksheets',
  },
  {
    href: '/gear',
    title: 'Gear Recommendations',
    desc: 'The cameras, mics, lights, and tools Aaron actually uses across @VanLife and @GotCoach. Updated for 2026.',
    badge: 'Updated 2026',
  },
  {
    href: '/community',
    title: 'Systems Over Hustle',
    desc: 'The community where book readers turn the strategies into real results. Founding pricing locked for life.',
    badge: '$47/mo',
  },
  {
    href: '/work-with-me',
    title: 'Work With Aaron',
    desc: 'From coaching to full done-for-you channel management. Pick the path that matches where you are.',
    badge: '4 tiers',
  },
  {
    href: '/book2',
    title: "What's Next",
    desc: 'Get the first chapter of the next book free, plus pre-launch pricing when it drops.',
    badge: 'Coming soon',
  },
]

const toolStack = [
  {
    part: 'Foundation (Chapters 1–6)',
    items: [
      { name: 'YouTube Studio', desc: 'Your channel dashboard and analytics' },
      { name: 'Canva', desc: 'Channel art, thumbnails, and branding' },
    ],
  },
  {
    part: 'Content Creation (Chapters 7–12)',
    items: [
      { name: 'TubeBuddy', desc: 'Keyword research and SEO optimization' },
      { name: 'VidIQ', desc: 'Video analytics and competitor research' },
      { name: 'Google Trends', desc: 'Trending topic and keyword validation' },
      { name: 'ChatGPT', desc: 'Quick brainstorms and content ideation' },
      { name: 'Claude', desc: 'Long-form strategy and copy' },
      { name: 'Gemini', desc: 'Research-heavy queries' },
    ],
  },
  {
    part: 'Production (Chapters 11–14)',
    items: [
      { name: 'Descript', desc: 'AI-powered video editing and transcription' },
      { name: 'CapCut', desc: 'Free mobile and desktop video editing' },
      { name: 'OpusClip', desc: 'Auto-generate Shorts from long-form videos' },
      { name: 'ElevenLabs', desc: 'AI voice for narration or voiceovers' },
    ],
  },
  {
    part: 'Growth and Leads (Chapters 15–19)',
    items: [
      { name: 'Brevo', desc: 'Email capture, lead nurture, and CRM' },
      { name: 'Stripe', desc: 'Payment processing for coaching and digital products' },
    ],
  },
  {
    part: 'Scale and Systems (Chapters 20–24)',
    items: [
      { name: 'Riverside', desc: 'Studio-quality remote interview recording' },
      { name: 'N8N', desc: 'Automation across your stack' },
    ],
  },
]

export default function ResourcesPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-brand-charcoal pt-28 sm:pt-32 pb-16 noise-overlay">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          {/* Hero */}
          <div className="text-center mb-12 sm:mb-16">
            <span className="font-body text-xs sm:text-sm tracking-[0.25em] uppercase text-brand-red font-medium">
              The Book Companion Hub
            </span>
            <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-normal uppercase text-brand-cream leading-[0.95]">
              Everything the Book Promised.
              <br />
              <span className="text-brand-red">All Right Here.</span>
            </h1>
            <p className="mt-5 font-body text-brand-cream/60 max-w-2xl mx-auto leading-relaxed">
              Every URL printed in the book. Every prompt, worksheet, and tool.
              Bookmark this page and come back as you work through the
              chapters.
            </p>
            <p className="mt-3 font-body text-brand-cream/30 text-sm">
              Don&apos;t have the book yet?{' '}
              <a
                href={AMAZON_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-red hover:text-brand-red-light underline underline-offset-2"
              >
                Get your copy on Amazon
              </a>
            </p>
          </div>

          {/* Book Companion Section */}
          <section className="mb-16">
            <h2 className="font-display text-2xl sm:text-3xl font-normal uppercase text-brand-cream mb-6">
              Book Companion Resources
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {bookCompanion.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-brand-red/25 hover:bg-white/[0.03] transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="inline-flex px-2.5 py-1 rounded-md bg-brand-red/[0.08] text-brand-red text-[0.6rem] font-body font-bold tracking-wider uppercase border border-brand-red/15">
                      {item.badge}
                    </span>
                    <svg
                      className="w-5 h-5 text-brand-cream/30 group-hover:text-brand-red transition-colors"
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
                  </div>
                  <h3 className="font-display text-lg font-normal uppercase text-brand-cream group-hover:text-brand-red transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-2 font-body text-sm text-brand-cream/50 leading-relaxed">
                    {item.desc}
                  </p>
                </Link>
              ))}
            </div>
          </section>

          {/* Tool Stack Section */}
          <section className="mb-16">
            <h2 className="font-display text-2xl sm:text-3xl font-normal uppercase text-brand-cream mb-2">
              The Full Tool Stack
            </h2>
            <p className="font-body text-brand-cream/40 mb-6 text-sm">
              Every tool mentioned in the book, organized by chapter group.
            </p>
            <div className="space-y-4">
              {toolStack.map((group) => (
                <details
                  key={group.part}
                  className="group rounded-2xl bg-white/[0.02] border border-white/[0.05] overflow-hidden"
                >
                  <summary className="cursor-pointer list-none px-6 py-5 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
                    <h3 className="font-display text-base font-normal uppercase text-brand-cream">
                      {group.part}
                    </h3>
                    <svg
                      className="w-5 h-5 text-brand-cream/30 transition-transform group-open:rotate-180"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </summary>
                  <div className="px-6 pb-5 divide-y divide-white/[0.03]">
                    {group.items.map((item) => (
                      <div
                        key={item.name}
                        className="py-3 flex justify-between gap-4"
                      >
                        <div>
                          <div className="font-body font-semibold text-brand-cream text-sm">
                            {item.name}
                          </div>
                          <div className="font-body text-xs text-brand-cream/40 mt-0.5">
                            {item.desc}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </details>
              ))}
            </div>
          </section>

          {/* Final note */}
          <div className="text-center mt-12 mb-8">
            <p className="font-accent text-2xl text-brand-cream/40 italic">
              Keep it crazy simple.
            </p>
            <p className="mt-2 font-body text-brand-cream/30 text-sm">
              Aaron Cuha
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
