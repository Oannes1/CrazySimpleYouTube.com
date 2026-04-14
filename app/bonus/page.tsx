import type { Metadata } from 'next'
import BonusForm from '@/components/BonusForm'

export const metadata: Metadata = {
  title: 'Free Chapter Companion Kit — Crazy Simple YouTube',
  description:
    'Get free checklists, AI prompt libraries, and video tutorials for every chapter of Crazy Simple YouTube.',
}

export default function BonusPage() {
  return (
    <main className="min-h-screen bg-brand-charcoal flex items-center justify-center noise-overlay relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(220,38,38,0.06),transparent)]" />
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(220,38,38,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(220,38,38,.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-xl mx-auto px-5 sm:px-8 py-20 text-center">
        <a
          href="/"
          className="inline-block font-display text-xl font-bold text-brand-cream tracking-tight mb-12"
        >
          Crazy Simple <span className="text-brand-red">YouTube</span>
        </a>

        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-brand-cream text-balance leading-tight">
          Get the Free
          <br />
          <span className="text-brand-red">Chapter Companion Kit</span>
        </h1>

        <p className="mt-5 text-brand-cream/50 font-body text-base sm:text-lg leading-relaxed max-w-md mx-auto">
          Everything you need to put each chapter into action — delivered
          straight to your inbox.
        </p>

        <div className="mt-8 grid gap-3 text-left max-w-sm mx-auto">
          {[
            {
              title: '24 Chapter Checklists',
              desc: 'Step-by-step action items for every chapter',
            },
            {
              title: 'AI Prompt Library',
              desc: 'Ready-to-use prompts for content, SEO, and lead gen',
            },
            {
              title: 'Video Tutorials',
              desc: 'Watch Aaron walk through key strategies',
            },
            {
              title: 'Community Pre-Access',
              desc: 'First in line when the community launches May 2026',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="flex gap-3.5 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]"
            >
              <svg
                className="w-5 h-5 text-brand-red mt-0.5 flex-shrink-0"
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
                <div className="font-body font-semibold text-brand-cream text-sm">
                  {item.title}
                </div>
                <div className="font-body text-brand-cream/40 text-xs mt-0.5">
                  {item.desc}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Form — integrate with GHL/Brevo */}
        <BonusForm />

        <p className="mt-4 text-brand-cream/20 font-body text-xs">
          No spam. Unsubscribe anytime. We respect your privacy.
        </p>

        <div className="mt-12 pt-8 border-t border-white/[0.04]">
          <p className="text-brand-cream/15 font-body text-xs">
            &copy; {new Date().getFullYear()} Dominion Partners LLC &middot;{' '}
            <a
              href="https://aaroncuha.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-cream/30 transition-colors"
            >
              AaronCuha.com
            </a>
          </p>
        </div>
      </div>
    </main>
  )
}
