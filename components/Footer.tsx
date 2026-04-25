const AMAZON_LINK = process.env.NEXT_PUBLIC_AMAZON_LINK || 'https://www.amazon.com/dp/B0GWYK8TX6'

const socials = [
  { name: 'YouTube', href: 'https://youtube.com/@aaroncuha' },
  { name: 'Instagram', href: 'https://instagram.com/aaroncuha' },
  { name: 'LinkedIn', href: 'https://linkedin.com/in/aaroncuha' },
  { name: 'X', href: 'https://x.com/AaronCuha' },
  { name: 'Facebook', href: 'https://facebook.com/aaroncuha' },
  { name: 'TikTok', href: 'https://tiktok.com/@aaroncuha' },
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
              <a href="https://aaroncuha.com/privacy" target="_blank" rel="noopener noreferrer" className="hover:text-brand-cream/30 transition-colors">
                Privacy
              </a>
              <a href="https://aaroncuha.com/terms" target="_blank" rel="noopener noreferrer" className="hover:text-brand-cream/30 transition-colors">
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
