import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Email-gate protector. All routes under /pdfs/* require the
 * `csy_unlocked` cookie set by EmailGate after a successful Brevo opt-in.
 *
 * If the cookie is absent, we redirect the visitor to /unlock with the
 * intended PDF URL preserved in the `next` search param so we can send
 * them straight to the document after they fill out the form.
 */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Only guard PDF assets
  if (!pathname.startsWith('/pdfs/')) {
    return NextResponse.next()
  }

  const unlocked = req.cookies.get('csy_unlocked')?.value === 'true'
  if (unlocked) {
    return NextResponse.next()
  }

  const url = req.nextUrl.clone()
  url.pathname = '/unlock'
  url.searchParams.set('next', pathname)
  return NextResponse.redirect(url)
}

export const config = {
  matcher: '/pdfs/:path*',
}
