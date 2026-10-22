import { NextRequest, NextResponse } from 'next/server'
import { checkBotId } from 'botid/server'
import { z } from 'zod'
import { gear } from '@/lib/gear-data'

/**
 * Affiliate click tracker.
 *
 * POST body:
 *   { slug: string, brand: string, source: string, url: string }
 *
 * Records to Supabase if NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SECRET_KEY
 * are set; otherwise just logs server-side and returns success so the
 * caller can proceed with the redirect.
 *
 * Bots are turned away by Vercel BotID, the slug must be a real product,
 * and every field has a length cap, so nobody can fill the table with junk.
 */
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SECRET = process.env.SUPABASE_SECRET_KEY

const GEAR_SLUGS = new Set(gear.map((g) => g.slug))

const ClickSchema = z.object({
  slug: z.string().max(100).refine((s) => GEAR_SLUGS.has(s)),
  brand: z.string().max(100).optional(),
  source: z.string().max(200).optional(), // e.g. '/gear', '/kits/youtube-starter'
  url: z.url({ protocol: /^https$/ }).max(2000).optional(),
})

const cap = (v: string | null, n: number) => (v ? v.slice(0, n) : null)

export async function POST(request: NextRequest) {
  try {
    const verdict = await checkBotId()
    if (verdict.isBot) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 })
    }

    const parsed = ClickSchema.safeParse(await request.json().catch(() => null))
    if (!parsed.success) {
      return NextResponse.json({ error: 'invalid click' }, { status: 400 })
    }
    const { slug, brand, source, url } = parsed.data

    // Best-effort identification: read csy_unlocked cookie + Brevo lookup
    // would be ideal, but for now we just record what we have.
    const clickRecord = {
      slug,
      brand: brand || null,
      source: source || null,
      url: url || null,
      ip: cap(request.headers.get('x-forwarded-for')?.split(',')[0] ?? null, 64),
      user_agent: cap(request.headers.get('user-agent'), 500),
      referrer: cap(request.headers.get('referer'), 500),
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
