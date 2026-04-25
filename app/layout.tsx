import type { Metadata } from 'next'
import { Anton, Inter, Caveat } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-anton',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-caveat',
  display: 'swap',
})

const AMAZON_LINK = process.env.NEXT_PUBLIC_AMAZON_LINK || 'https://www.amazon.com/dp/B0GWYK8TX6'
const GA_ID = process.env.NEXT_PUBLIC_GA_ID

export const metadata: Metadata = {
  title: 'Crazy Simple YouTube — The YouTube Growth System for Business Owners',
  description:
    '24 chapters. Zero fluff. The exact YouTube growth system behind 200,000+ subscribers and millions in client revenue. Turn views into clients. By Aaron Cuha.',
  openGraph: {
    title: 'Crazy Simple YouTube — Turn Views Into Clients',
    description:
      '24 chapters. Zero fluff. The exact system behind 200,000+ subscribers and millions in client revenue.',
    type: 'website',
    url: 'https://crazysimpleyoutube.com',
    images: [
      {
        url: '/book-cover.jpg',
        width: 800,
        height: 1200,
        alt: 'Crazy Simple YouTube book cover — A Success Guide by Aaron Cuha',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crazy Simple YouTube — Turn Views Into Clients',
    description:
      'The YouTube growth system built for business owners. Not influencers.',
    images: ['/book-cover.jpg'],
  },
  metadataBase: new URL('https://crazysimpleyoutube.com'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${anton.variable} ${inter.variable} ${caveat.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Book',
              name: 'Crazy Simple YouTube',
              subtitle: 'A Success Guide',
              author: {
                '@type': 'Person',
                name: 'Aaron Cuha',
                url: 'https://aaroncuha.com',
              },
              description:
                'The YouTube growth system built for business owners. 24 chapters covering keyword research, content strategy, lead generation, and converting viewers to clients.',
              bookFormat: 'https://schema.org/Paperback',
              offers: {
                '@type': 'Offer',
                price: '19.99',
                priceCurrency: 'USD',
                availability: 'https://schema.org/InStock',
                url: AMAZON_LINK,
              },
              publisher: {
                '@type': 'Organization',
                name: 'Haymaker Publishing',
              },
              genre: 'Business',
              inLanguage: 'en',
            }),
          }}
        />
      </head>
      <body className="overflow-x-hidden">
        {children}

        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  )
}
