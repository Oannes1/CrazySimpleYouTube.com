import { NextRequest, NextResponse } from 'next/server'

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
  DISCOVERY_CALL: 28,          // /work-with-me leads
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
 * Subscribe a contact to Brevo with cumulative tags + attributes.
 *
 * Body shape:
 *   email      (required)
 *   firstName  (optional)
 *   lastName   (optional)
 *   tags       (optional) array of strings, e.g.
 *              ["src_homepage", "dl_companion_kit"]
 *   listIds    (optional) additional Brevo list IDs to add to.
 *              COMPANION_KIT (21) is always included as the master pool.
 *   attributes (optional) extra attributes, e.g.
 *              { INDUSTRY: "real-estate", AMAZON_ORDER_ID: "111-..." }
 *
 * Behavior:
 *   Dedupes by email (Brevo upsert).
 *   Tags ACCUMULATE on the contact (existing tags merged with new ones).
 *   Existing attributes are not overwritten unless explicitly passed.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      email,
      firstName,
      lastName,
      tags = [],
      listIds = [],
      attributes = {},
    } = body

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      )
    }

    if (!BREVO_API_KEY) {
      console.error('BREVO_API_KEY not configured')
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    const allListIds = Array.from(
      new Set([LISTS.COMPANION_KIT, ...listIds])
    )

    // Fetch existing contact to merge tags rather than overwrite
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
      const existing = await fetchResponse.json()
      const currentTagsAttr = existing?.attributes?.TAGS
      if (typeof currentTagsAttr === 'string' && currentTagsAttr.length > 0) {
        existingTags = currentTagsAttr.split(',').map((t: string) => t.trim())
      } else if (Array.isArray(currentTagsAttr)) {
        existingTags = currentTagsAttr
      }
    }

    const mergedTags = Array.from(new Set([...existingTags, ...tags]))

    const finalAttributes: Record<string, unknown> = { ...attributes }
    if (firstName) finalAttributes.FIRSTNAME = firstName
    if (lastName) finalAttributes.LASTNAME = lastName
    if (mergedTags.length > 0) {
      finalAttributes.TAGS = mergedTags.join(',')
    }

    const upsertResponse = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'api-key': BREVO_API_KEY,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        email,
        attributes: finalAttributes,
        listIds: allListIds,
        updateEnabled: true,
      }),
    })

    if (!upsertResponse.ok) {
      const errorData = await upsertResponse.json().catch(() => ({}))
      if (errorData.code === 'duplicate_parameter') {
        for (const listId of allListIds) {
          await fetch(
            `https://api.brevo.com/v3/contacts/lists/${listId}/contacts/add`,
            {
              method: 'POST',
              headers: {
                'api-key': BREVO_API_KEY,
                'Content-Type': 'application/json',
                Accept: 'application/json',
              },
              body: JSON.stringify({ emails: [email] }),
            }
          )
        }
      } else {
        console.error('Brevo upsert error:', errorData)
        return NextResponse.json(
          { error: 'Failed to subscribe', detail: errorData?.message },
          { status: 500 }
        )
      }
    }

    // Decide which Brevo template to fire based on the tag pattern
    const asset = pickAssetForDelivery(mergedTags)
    let emailFired = false
    if (asset) {
      sendDeliveryEmail(email, firstName, asset).catch((e) =>
        console.error('Email delivery error:', e)
      )
      emailFired = true
    } else {
      // No PDF asset, but we may still have a welcome flow to trigger
      const welcomeTemplate = pickWelcomeTemplate(mergedTags)
      if (welcomeTemplate) {
        sendWelcomeEmail(email, firstName, welcomeTemplate).catch((e) =>
          console.error('Welcome email error:', e)
        )
        emailFired = true
      }
    }

    // Set the unlock cookie on every successful opt-in.
    // This means any form submission anywhere on the site grants
    // the user direct access to PDFs gated by middleware.
    const response = NextResponse.json({
      success: true,
      tags: mergedTags,
      lists: allListIds,
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
