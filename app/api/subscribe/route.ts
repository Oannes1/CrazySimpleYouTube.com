import { NextRequest, NextResponse } from 'next/server'
import { checkBotId } from 'botid/server'
import { z } from 'zod'
import { worksheets } from '@/lib/worksheets-data'
import { prompts } from '@/lib/prompts-data'
import { kits } from '@/lib/kits-data'

const BREVO_API_KEY = process.env.BREVO_API_KEY

/**
 * Brevo list IDs (lifecycle stages, mutually exclusive).
 * Add new list IDs after creating them in Brevo.
 */
const LISTS = {
  COMPANION_KIT: 21,           // master list — all free downloaders
  COMMUNITY_WAITLIST: 25,      // Systems Over Hustle pre-launch
  SET_IN_STONE_WAITLIST: 26,   // Book 2 launch list
  BOOK_OWNER_VERIFIED: 27,     // confirmed book buyers
  // Was 28, which DOES NOT EXIST in Brevo. Every id 1 to 60 was checked; 28
  // is absent, and Brevo rejects a contact create with an invalid list id.
  // 7 is AC YouTube Leads, where the rest of the site's leads land.
  DISCOVERY_CALL: 7,           // /work-with-me leads
  WORKSHEETS_BUNDLE: 29,       // /worksheets downloaders
  PROMPTS_BUNDLE: 30,          // /prompts downloaders
} as const

const TEMPLATES = {
  ASSET_DELIVERY: 102, // CSY · Asset Delivery (Day 0) — sends a PDF
  COMMUNITY_WELCOME: 103, // CSY · Community Waitlist Welcome (Day 0)
  SET_IN_STONE_WELCOME: 104, // CSY · Set in Stone Waitlist Welcome (Day 0)
  DISCOVERY_CALL: 105, // CSY · Discovery Call Confirmation (Day 0)
} as const

const SITE = 'https://crazysimpleyoutube.com'

/**
 * Look at the tags being applied and decide what asset (if any) we
 * should email out immediately. Returns null if no transactional send
 * is needed (e.g. waitlist signup with no document).
 */
function pickAssetForDelivery(tags: string[]): {
  assetName: string
  assetType: string
  pdfUrl: string
} | null {
  if (tags.includes('dl_worksheets_bundle')) {
    return {
      assetName: 'Worksheets Bundle (all 24)',
      assetType: 'worksheets',
      pdfUrl: `${SITE}/pdfs/csy-worksheets-bundle.pdf`,
    }
  }
  if (tags.includes('dl_prompts_bundle')) {
    return {
      assetName: 'AI Prompts Bundle (all 24)',
      assetType: 'prompts',
      pdfUrl: `${SITE}/pdfs/csy-prompts-bundle.pdf`,
    }
  }
  if (tags.includes('dl_companion_kit')) {
    return {
      assetName: 'Chapter Companion Kit',
      assetType: 'companion kit',
      pdfUrl: `${SITE}/pdfs/csy-worksheets-bundle.pdf`,
    }
  }
  // Per-asset downloads: dl_worksheet_<slug> or dl_prompt_<slug>
  const wsTag = tags.find((t) => t.startsWith('dl_worksheet_'))
  if (wsTag) {
    const slug = wsTag.replace('dl_worksheet_', '')
    return {
      assetName: humanize(slug.replace(/^\d+-/, '')),
      assetType: 'worksheet',
      pdfUrl: `${SITE}/pdfs/worksheets/${slug}.pdf`,
    }
  }
  const ptTag = tags.find((t) => t.startsWith('dl_prompt_'))
  if (ptTag) {
    const slug = ptTag.replace('dl_prompt_', '')
    return {
      assetName: humanize(slug),
      assetType: 'prompt',
      pdfUrl: `${SITE}/pdfs/prompts/${slug}.pdf`,
    }
  }
  // Kits are the one asset with no PDF, because the useful version of a gear
  // kit is the live page: it carries current prices and the one-click cart.
  // So the link we send is that page. Nothing is promised that does not exist.
  const kitTag = tags.find((t) => t.startsWith('dl_kit_'))
  if (kitTag) {
    const slug = kitTag.replace('dl_kit_', '')
    return {
      assetName: `${humanize(slug)} kit`,
      assetType: 'gear kit',
      pdfUrl: `${SITE}/kits/${slug}`,
    }
  }
  return null
}

function humanize(slug: string): string {
  return slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

async function sendDeliveryEmail(
  email: string,
  firstName: string | undefined,
  asset: { assetName: string; assetType: string; pdfUrl: string }
) {
  if (!BREVO_API_KEY) return
  try {
    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': BREVO_API_KEY,
        'content-type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify({
        templateId: TEMPLATES.ASSET_DELIVERY,
        to: [{ email, name: firstName || undefined }],
        params: {
          FIRSTNAME: firstName || 'there',
          ASSET_NAME: asset.assetName,
          ASSET_TYPE: asset.assetType,
          PDF_URL: asset.pdfUrl,
        },
      }),
    })
    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      console.error('Brevo transactional email failed:', err)
    }
  } catch (e) {
    console.error('Brevo transactional email error:', e)
  }
}

/**
 * Pick a welcome email template based on which list flow this opt-in
 * came from. Returns null if no welcome flow matches (e.g. just a
 * generic homepage signup that gets the asset delivery instead).
 */
function pickWelcomeTemplate(tags: string[]): number | null {
  if (tags.includes('community_waitlist')) return TEMPLATES.COMMUNITY_WELCOME
  if (tags.includes('set_in_stone_waitlist')) return TEMPLATES.SET_IN_STONE_WELCOME
  if (tags.includes('discovery_call_request')) return TEMPLATES.DISCOVERY_CALL
  return null
}

async function sendWelcomeEmail(
  email: string,
  firstName: string | undefined,
  templateId: number
) {
  if (!BREVO_API_KEY) return
  try {
    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': BREVO_API_KEY,
        'content-type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify({
        templateId,
        to: [{ email, name: firstName || undefined }],
        params: {
          FIRSTNAME: firstName || 'there',
        },
      }),
    })
    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      console.error('Brevo welcome email failed:', err)
    }
  } catch (e) {
    console.error('Brevo welcome email error:', e)
  }
}

/**
 * Every form on the site, keyed by name. The server decides which lists and
 * tags each form gets. The browser only says which form it is, so nobody can
 * post their own list IDs or attributes and drop an address onto any list.
 * COMPANION_KIT (21) is always added on top as the master pool.
 */
type AssetKind = 'worksheet' | 'prompt' | 'kit'

const FORMS: Record<
  string,
  { lists: number[]; tags: string[]; asset?: AssetKind }
> = {
  homepage: { lists: [], tags: ['src_homepage', 'dl_companion_kit'] },
  bonus: { lists: [], tags: ['src_bonus', 'dl_companion_kit'] },
  // 7 is AC YouTube Leads, 4 is the Systems Over Hustle newsletter.
  discovery_call: {
    lists: [LISTS.DISCOVERY_CALL, 4],
    tags: ['src_workwithme', 'discovery_call_request'],
  },
  worksheets_bundle: {
    lists: [LISTS.WORKSHEETS_BUNDLE],
    tags: ['src_worksheets', 'dl_worksheets_bundle'],
  },
  worksheet: {
    lists: [LISTS.WORKSHEETS_BUNDLE],
    tags: ['src_worksheets'],
    asset: 'worksheet',
  },
  prompts_bundle: {
    lists: [LISTS.PROMPTS_BUNDLE],
    tags: ['src_prompts', 'dl_prompts_bundle'],
  },
  prompt: {
    lists: [LISTS.PROMPTS_BUNDLE],
    tags: ['src_prompts'],
    asset: 'prompt',
  },
  kit: { lists: [LISTS.WORKSHEETS_BUNDLE], tags: ['src_kits'], asset: 'kit' },
  community_waitlist: {
    lists: [LISTS.COMMUNITY_WAITLIST],
    tags: ['src_community', 'community_waitlist'],
  },
  community_waitlist_book_owner: {
    lists: [LISTS.COMMUNITY_WAITLIST],
    tags: ['src_community', 'community_waitlist', 'book_owner_unverified'],
  },
  book2_waitlist: {
    lists: [LISTS.SET_IN_STONE_WAITLIST],
    tags: ['src_book2', 'set_in_stone_waitlist'],
  },
  unlock: { lists: [], tags: ['src_unlock'] },
}

// Asset slugs must be real ones, since the slug ends up in the emailed link.
const ASSET_SLUGS: Record<AssetKind, Set<string>> = {
  worksheet: new Set(worksheets.map((w) => w.slug)),
  prompt: new Set(prompts.map((p) => p.slug)),
  kit: new Set(kits.map((k) => k.slug)),
}

// Same values as the dropdowns on /work-with-me.
const INDUSTRIES = [
  'real-estate',
  'mortgage',
  'coaching',
  'consulting',
  'financial-advisor',
  'attorney',
  'contractor',
  'other',
] as const
const YOUTUBE_STAGES = ['not-started', 'early', 'growing', 'established'] as const

const name = z.string().trim().max(60).optional()

const SubscribeSchema = z.object({
  form: z.enum(Object.keys(FORMS) as [string, ...string[]]),
  asset: z.string().max(100).optional(),
  email: z.string().trim().toLowerCase().max(254).pipe(z.email()),
  firstName: name,
  lastName: name,
  industry: z.enum(INDUSTRIES).optional(),
  youtubeStage: z.enum(YOUTUBE_STAGES).optional(),
})

/**
 * Subscribe a contact to Brevo.
 *
 * Body shape:
 *   form         (required) one of the FORMS keys above
 *   asset        (required for worksheet, prompt, kit) the asset slug
 *   email        (required)
 *   firstName    (optional)
 *   lastName     (optional)
 *   industry     (discovery_call only)
 *   youtubeStage (discovery_call only)
 *
 * Behavior:
 *   Bots are turned away by Vercel BotID before anything else happens.
 *   Lists and tags come from FORMS, never from the request.
 *   Tags ACCUMULATE on the contact (existing tags merged with new ones).
 *   For a contact that already exists, only empty attributes get filled in.
 *   An anonymous form post never overwrites a name or anything else on file.
 */
export async function POST(request: NextRequest) {
  try {
    const verdict = await checkBotId()
    if (verdict.isBot) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 })
    }

    const parsed = SubscribeSchema.safeParse(
      await request.json().catch(() => null)
    )
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      )
    }
    const { form, asset, email, firstName, lastName, industry, youtubeStage } =
      parsed.data
    const config = FORMS[form]

    const tags = [...config.tags]
    if (config.asset) {
      if (!asset || !ASSET_SLUGS[config.asset].has(asset)) {
        return NextResponse.json({ error: 'Unknown download' }, { status: 400 })
      }
      tags.push(`dl_${config.asset}_${asset}`)
    }
    if (form === 'discovery_call') {
      if (!industry || !youtubeStage) {
        return NextResponse.json(
          { error: 'Pick a business type and YouTube stage' },
          { status: 400 }
        )
      }
      tags.push(`industry_${industry}`, `stage_${youtubeStage}`)
    }

    if (!BREVO_API_KEY) {
      console.error('BREVO_API_KEY not configured')
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    const allListIds = Array.from(
      new Set<number>([LISTS.COMPANION_KIT, ...config.lists])
    )

    // Look up the contact so we can merge tags and leave existing data alone
    let existing: { attributes?: Record<string, unknown> } | null = null
    let existingTags: string[] = []
    const fetchResponse = await fetch(
      `https://api.brevo.com/v3/contacts/${encodeURIComponent(email)}`,
      {
        method: 'GET',
        headers: {
          'api-key': BREVO_API_KEY,
          Accept: 'application/json',
        },
      }
    )

    if (fetchResponse.ok) {
      existing = await fetchResponse.json()
      const currentTagsAttr = existing?.attributes?.TAGS
      if (typeof currentTagsAttr === 'string' && currentTagsAttr.length > 0) {
        existingTags = currentTagsAttr.split(',').map((t: string) => t.trim())
      } else if (Array.isArray(currentTagsAttr)) {
        existingTags = currentTagsAttr
      }
    }

    const mergedTags = Array.from(new Set([...existingTags, ...tags]))

    const offered: Record<string, string | undefined> = {
      FIRSTNAME: firstName || undefined,
      LASTNAME: lastName || undefined,
      INDUSTRY: industry,
      YOUTUBE_STAGE: youtubeStage,
    }
    const finalAttributes: Record<string, unknown> = {
      TAGS: mergedTags.join(','),
    }
    for (const [key, value] of Object.entries(offered)) {
      const current = existing?.attributes?.[key]
      if (value && (current === undefined || current === null || current === '')) {
        finalAttributes[key] = value
      }
    }

    const brevoHeaders = {
      'api-key': BREVO_API_KEY,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }

    const saveResponse = existing
      ? await fetch(
          `https://api.brevo.com/v3/contacts/${encodeURIComponent(email)}`,
          {
            method: 'PUT',
            headers: brevoHeaders,
            body: JSON.stringify({
              attributes: finalAttributes,
              listIds: allListIds,
            }),
          }
        )
      : await fetch('https://api.brevo.com/v3/contacts', {
          method: 'POST',
          headers: brevoHeaders,
          body: JSON.stringify({
            email,
            attributes: finalAttributes,
            listIds: allListIds,
            updateEnabled: false,
          }),
        })

    if (!saveResponse.ok) {
      const errorData = await saveResponse.json().catch(() => ({}))
      if (errorData.code === 'duplicate_parameter') {
        // Contact appeared between our lookup and the create. Just add
        // them to the lists and leave their attributes as they are.
        for (const listId of allListIds) {
          await fetch(
            `https://api.brevo.com/v3/contacts/lists/${listId}/contacts/add`,
            {
              method: 'POST',
              headers: brevoHeaders,
              body: JSON.stringify({ emails: [email] }),
            }
          )
        }
      } else {
        console.error('Brevo save error:', errorData)
        return NextResponse.json(
          { error: 'Failed to subscribe' },
          { status: 500 }
        )
      }
    }

    // Decide which Brevo template to fire based on the tag pattern.
    // AWAIT the send — Vercel serverless can kill background promises
    // after the response, causing silent email drops. ~200ms latency
    // is worth it for guaranteed delivery.
    // Only this submission's tags count here, so an old tag on the contact
    // cannot pick which email goes out.
    const delivery = pickAssetForDelivery(tags)
    let emailFired = false
    if (delivery) {
      try {
        await sendDeliveryEmail(email, firstName, delivery)
        emailFired = true
      } catch (e) {
        console.error('Email delivery error for', email, e)
      }
    } else {
      const welcomeTemplate = pickWelcomeTemplate(tags)
      if (welcomeTemplate) {
        try {
          await sendWelcomeEmail(email, firstName, welcomeTemplate)
          emailFired = true
        } catch (e) {
          console.error('Welcome email error for', email, e)
        }
      }
    }

    // Set the unlock cookie on every successful opt-in.
    // This means any form submission anywhere on the site grants
    // the user direct access to PDFs gated by middleware.
    // Do not echo tags or lists back: they would reveal what is on file
    // for any email address someone types in.
    const response = NextResponse.json({
      success: true,
      emailSent: emailFired,
    })
    response.cookies.set('csy_unlocked', 'true', {
      maxAge: 60 * 60 * 24 * 365, // 1 year
      httpOnly: false, // EmailGate component reads this client-side
      secure: true,
      sameSite: 'lax',
      path: '/',
    })
    return response
  } catch (error) {
    console.error('Subscribe error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
