import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Resources — Crazy Simple YouTube',
  description:
    'Tools, links, and resources mentioned throughout Crazy Simple YouTube by Aaron Cuha.',
}

const AMAZON_LINK = process.env.NEXT_PUBLIC_AMAZON_LINK || 'https://www.amazon.com/dp/B0GWYK8TX6'

/* TODO: Populate with actual resources from the book */
const resourceGroups = [
  {
    part: 'Part 1 — Foundation',
    chapters: '(Chapters 1–5)',
    items: [
      { name: 'YouTube Studio', desc: 'Your channel dashboard and analytics' },
      { name: 'Canva', desc: 'Channel art, thumbnails, and branding' },
      { name: 'Free Channel Setup Checklist', desc: 'From the Chapter Companion Kit', link: '/bonus' },
    ],
  },
  {
    part: 'Part 2 — Content Strategy',
    chapters: '(Chapters 6–10)',
    items: [
      { name: 'TubeBuddy', desc: 'Keyword research and SEO optimization' },
      { name: 'VidIQ', desc: 'Video analytics and competitor research' },
      { name: 'Google Trends', desc: 'Trending topic and keyword validation' },
      { name: 'AI Prompt Library', desc: 'Content ideation prompts from the Companion Kit', link: '/bonus' },
    ],
  },
  {
    part: 'Part 3 — Production',
    chapters: '(Chapters 11–14)',
    items: [
      { name: 'Descript', desc: 'AI-powered video editing' },
      { name: 'CapCut', desc: 'Free mobile and desktop video editing' },
      { name: 'Thumbnail Templates', desc: 'From the Chapter Companion Kit', link: '/bonus' },
    ],
  },
  {
    part: 'Part 4 — Growth & Leads',
    chapters: '(Chapters 15–19)',
    items: [
      { name: 'Lead Magnet Templates', desc: 'From the Chapter Companion Kit', link: '/bonus' },
      { name: 'CRM Setup Guide', desc: 'Connecting YouTube to your follow-up system' },
      { name: 'Aaron\'s YouTube Channel', desc: 'See the system in action', link: 'https://youtube.com/@aaroncuha' },
    ],
  },
  {
    part: 'Part 5 — Scale & Systems',
    chapters: '(Chapters 20–24)',
    items: [
      { name: 'Systems Over Hustle Community', desc: 'Weekly coaching and accountability ($47/mo)', link: 'https://aaroncuha.com/skool' },
      { name: 'GROW Coaching Program', desc: 'Personalized YouTube growth coaching', link: 'https://aaroncuha.com' },
      { name: 'Repurposing Workflow Template', desc: 'From the Chapter Companion Kit', link: '/bonus' },
    ],
  },
]

export default function ResourcesPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-brand-charcoal pt-28 sm:pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-5 sm:px-8">
          <div className="text-center mb-14">
            <span className="font-body text-xs sm:text-sm tracking-[0.25em] uppercase text-brand-red font-medium">
              Book Resources
            </span>
            <h1 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-black text-brand-cream text-balance">
              Tools &amp; Resources
            </h1>
            <p className="mt-4 text-brand-cream/40 font-body max-w-lg mx-auto">
              Everything mentioned in the book, organized by chapter. Bookmark
              this page for quick reference.
            </p>
            <p className="mt-2 text-brand-cream/25 font-body text-sm">
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

          <div className="space-y-8">
            {resourceGroups.map((group) => (
              <section
                key={group.part}
                className="border border-white/[0.05] rounded-xl overflow-hidden"
              >
                <div className="px-6 py-4 bg-white/[0.02] border-b border-white/[0.04]">
                  <h2 className="font-display text-lg font-bold text-brand-cream">
                    {group.part}
                  </h2>
                  <p className="font-body text-xs text-brand-cream/30 mt-0.5">
                    {group.chapters}
                  </p>
                </div>
                <div className="divide-y divide-white/[0.03]">
                  {group.items.map((item) => (
                    <div
                      key={item.name}
                      className="px-6 py-4 flex items-center justify-between gap-4 hover:bg-white/[0.01] transition-colors"
                    >
                      <div>
                        <div className="font-body font-semibold text-brand-cream text-sm">
                          {item.name}
                        </div>
                        <div className="font-body text-brand-cream/35 text-xs mt-0.5">
                          {item.desc}
                        </div>
                      </div>
                      {item.link && (
                        <a
                          href={item.link}
                          target={item.link.startsWith('http') ? '_blank' : undefined}
                          rel={
                            item.link.startsWith('http')
                              ? 'noopener noreferrer'
                              : undefined
                          }
                          className="flex-shrink-0 px-3.5 py-1.5 text-xs font-body font-semibold text-brand-red border border-brand-red/20 rounded-lg hover:bg-brand-red/5 transition-colors"
                        >
                          {item.link === '/bonus' ? 'Get Free' : 'Visit'}
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
