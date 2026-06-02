/** @type {import('next').NextConfig} */
const nextConfig = {
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
    ]
  },
}

export default nextConfig
