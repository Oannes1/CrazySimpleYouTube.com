const AMAZON_LINK = process.env.NEXT_PUBLIC_AMAZON_LINK || 'https://www.amazon.com/dp/B0GWYK8TX6'

const socials = [
  { name: 'YouTube', href: 'https://youtube.com/@aaroncuha' },
  { name: 'Instagram', href: 'https://instagram.com/aaroncuha' },
  { name: 'LinkedIn', href: 'https://linkedin.com/in/aaroncuha' },
  { name: 'X', href: 'https://x.com/AaronCuha' },
  { name: 'Facebook', href: 'https://facebook.com/aaroncuha' },
  { name: 'TikTok', href: 'https://tiktok.com/@aaroncuha' },
]

/* Aaron's other properties. The only link off this site used to be
   "AaronCuha.com" set at 15% opacity next to Privacy and Terms, which is a
   link a reader will never see and a crawler will barely weigh. A book site
   that cannot hand a reader to the coach, the community or the assessment is
   a dead end wearing a domain name. */
const network = [
  {
    name: 'AaronCuha.com',
    href: 'https://www.aaroncuha.com',
    blurb: 'Coaching, keynotes, and the rest of the books',
  },
  {
    name: 'Systems Over Hustle',
    href: 'https://community.aaroncuha.com',
    blurb: 'The community, the course library, and live group calls',
  },
  {
    name: 'The Proof Test',
    href: 'https://theprooftest.com',
    blurb: 'Two minutes to see if your channel is built or bluffing',
  },
]

export default function Footer() {
  return (
    <footer className="bg-brand-charcoal border-t border-white/[0.04]">
      {/* Final CTA */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-20 text-center">
        <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-normal uppercase text-brand-cream">
          The Next 90 Days Pass Either Way.
        </h3>
        <p className="mt-3 text-brand-cream/35 font-body max-w-md mx-auto">
          Join thousands of business owners who are building their YouTube
          presence the simple way.
        </p>
        <a
          href={AMAZON_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-7 inline-flex items-center gap-2.5 px-8 py-4 bg-brand-red text-white font-body font-bold text-lg rounded-xl hover:bg-brand-red-light transition-colors hover:shadow-[0_0_40px_rgba(220,38,38,0.2)]"
        >
          Get Your Copy on Amazon
        </a>
      </div>

      {/* Network */}
      <div className="border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-10">
          <p className="font-body text-[0.6rem] tracking-[0.2em] uppercase text-brand-cream/30 font-medium mb-5">
            More from Aaron
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {network.map((n) => (
              <a
                key={n.href}
                href={n.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-xl border border-white/[0.06] px-5 py-4 hover:border-brand-red/25 hover:bg-white/[0.02] transition-colors"
              >
                <span className="block font-body font-bold text-sm text-brand-cream/80 group-hover:text-brand-cream">
                  {n.name}
                  <span aria-hidden="true" className="ml-1.5 text-brand-red">
                    &rarr;
                  </span>
                </span>
                <span className="mt-1 block font-body text-xs text-brand-cream/35 leading-relaxed">
                  {n.blurb}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <a
              href="/"
              className="font-display text-lg font-normal uppercase text-brand-cream tracking-wide"
            >
              Crazy Simple <span className="text-brand-red">YouTube</span>
            </a>

            <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-6">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-cream/25 hover:text-brand-red transition-colors font-body text-sm"
                >
                  {s.name}
                </a>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4 text-brand-cream/15 font-body text-xs">
            <p>&copy; {new Date().getFullYear()} Haymaker LLC. All rights reserved.</p>
            <div className="flex gap-6">
              <a
                href="https://aaroncuha.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand-cream/30 transition-colors"
              >
                AaronCuha.com
              </a>
              <a href="/privacy" className="hover:text-brand-cream/30 transition-colors">
                Privacy
              </a>
              <a href="/terms" className="hover:text-brand-cream/30 transition-colors">
                Terms
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer for mobile sticky CTA */}
      <div className="h-16 md:hidden" />
    </footer>
  )
}
