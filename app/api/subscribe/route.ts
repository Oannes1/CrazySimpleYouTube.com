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

    return NextResponse.json({
      success: true,
      tags: mergedTags,
      lists: allListIds,
    })
  } catch (error) {
    console.error('Subscribe error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
