import { withBotId } from 'botid/next/config'

const isDev = process.env.NODE_ENV !== 'production'

/**
 * Content Security Policy. Allows our own files, Google Analytics, YouTube
 * embeds, and the Vercel preview toolbar. 'unsafe-inline' for scripts is
 * needed for the Next.js bootstrap, the GA snippet and the JSON-LD block.
 * BotID loads through our own domain, so 'self' covers it.
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''} https://www.googletagmanager.com https://vercel.live`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://vercel.live wss://ws-us3.pusher.com",
  'frame-src https://www.youtube.com https://www.youtube-nocookie.com https://vercel.live',
  "media-src 'self' https:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  'upgrade-insecure-requests',
].join('; ')

const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains',
  },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'DENY' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()',
  },
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }]
  },
  images: {
    formats: ['image/webp', 'image/avif'],
  },
  // Permanently redirect legacy .docx asset URLs to the PDF versions.
  // These .docx links are baked into Brevo automation emails (templates
  // 51 and 52) that are part of an active automation Brevo will not
  // let us edit via API. Redirecting at the edge means every existing
  // email link in every inbox opens a working in-browser PDF, and any
  // future automation send "just works" without touching the template.
  async redirects() {
    return [
      {
        source: '/CSY-AI-Prompt-Library.docx',
        destination: '/CSY-AI-Prompt-Library.pdf',
        permanent: true,
      },
      {
        source: '/CSY-Chapter-Checklists.docx',
        destination: '/CSY-Chapter-Checklists.pdf',
        permanent: true,
      },
      { source: '/viral', destination: '/vault', permanent: true },
      { source: '/viral-vault', destination: '/vault', permanent: true },
      { source: '/viralvault', destination: '/vault', permanent: true },
      { source: '/viral-video-vault', destination: '/vault', permanent: true },
    ]
  },
}

export default withBotId(nextConfig)
