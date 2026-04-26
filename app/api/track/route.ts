import { NextRequest, NextResponse } from 'next/server'

/**
 * Affiliate click tracker.
 *
 * POST body:
 *   { slug: string, brand: string, source: string, url: string }
 *
 * Records to Supabase if NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SECRET_KEY
 * are set; otherwise just logs server-side and returns success so the
 * caller can proceed with the redirect.
 */
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SECRET = process.env.SUPABASE_SECRET_KEY

interface ClickPayload {
  slug: string
  brand?: string
  source?: string  // e.g. 'gear', 'kits/youtube-starter'
  url?: string
  email?: string   // if known (returning user with cookie)
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ClickPayload
    const { slug, brand, source, url } = body

    if (!slug) {
      return NextResponse.json({ error: 'slug required' }, { status: 400 })
    }

    // Best-effort identification: read csy_unlocked cookie + Brevo lookup
    // would be ideal, but for now we just record what we have.
    const clickRecord = {
      slug,
      brand: brand || null,
      source: source || null,
      url: url || null,
      ip: request.headers.get('x-forwarded-for')?.split(',')[0] || null,
      user_agent: request.headers.get('user-agent') || null,
      referrer: request.headers.get('referer') || null,
      created_at: new Date().toISOString(),
    }

    if (SUPABASE_URL && SUPABASE_SECRET) {
      // Insert into Supabase
      const res = await fetch(`${SUPABASE_URL}/rest/v1/affiliate_clicks`, {
        method: 'POST',
        headers: {
          apikey: SUPABASE_SECRET,
          Authorization: `Bearer ${SUPABASE_SECRET}`,
          'content-type': 'application/json',
          Prefer: 'return=minimal',
        },
        body: JSON.stringify(clickRecord),
      })
      if (!res.ok) {
        const txt = await res.text().catch(() => '')
        console.error('Supabase insert failed:', res.status, txt)
      }
    } else {
      // Log to server logs for now (Vercel logs)
      console.log('[track]', JSON.stringify(clickRecord))
    }

    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('Track error:', e)
    return NextResponse.json({ error: 'internal error' }, { status: 500 })
  }
}
