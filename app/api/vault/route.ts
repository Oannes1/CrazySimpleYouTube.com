import { NextRequest, NextResponse } from 'next/server'

/**
 * Viral Video Vault combined form handler.
 *
 * Accepts a multipart/form-data POST with:
 *   firstName    (required)
 *   phone        (required)
 *   email        (required)
 *   bookPurchased ("true" | "false")
 *   amazonOrder  (optional text)
 *   receipt      (optional File — PDF/JPG/PNG, max 5MB)
 *
 * Behavior:
 *   - Creates/updates a Brevo contact
 *   - Always adds to VAULT_OPT_2026 (list 31) + master Companion list (21)
 *   - If bookPurchased: also adds to BOOK_BUYER_2026 (list 32) + tags
 *   - Uploads the receipt to Supabase Storage if configured
 *   - Fires the Vault Delivery email (template 106) for everyone
 *   - Fires the Bonus Call Confirmation email (template 107) for book buyers
 */

const BREVO_API_KEY = process.env.BREVO_API_KEY
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SECRET = process.env.SUPABASE_SECRET_KEY

const LISTS = {
  NEWSLETTER: 4, // AC — Systems Over Hustle Newsletter (weekly)
  COMPANION_KIT: 21,
  VAULT_OPT: 31,
  BOOK_BUYER: 32,
}

const TEMPLATES = {
  VAULT_DELIVERY: 106, // CSY · Viral Video Vault Delivery
  BONUS_CALL: 107, // CSY · Bonus Call Confirmation
}

const SITE = 'https://crazysimpleyoutube.com'
const VAULT_PDF_URL = `${SITE}/pdfs/top-25-viral-blueprints.pdf`

const MAX_FILE_BYTES = 5 * 1024 * 1024
const ALLOWED_TYPES = ['application/pdf', 'image/jpeg', 'image/png']

async function uploadReceipt(
  file: File,
  firstName: string
): Promise<string | null> {
  if (!SUPABASE_URL || !SUPABASE_SECRET) return null
  try {
    const ext = file.name.split('.').pop() || 'bin'
    const safeName = firstName.toLowerCase().replace(/[^a-z0-9]/g, '')
    const path = `receipts/${safeName}-${Date.now()}.${ext}`
    const buf = Buffer.from(await file.arrayBuffer())

    const res = await fetch(
      `${SUPABASE_URL}/storage/v1/object/vault-receipts/${path}`,
      {
        method: 'POST',
        headers: {
          apikey: SUPABASE_SECRET,
          Authorization: `Bearer ${SUPABASE_SECRET}`,
          'content-type': file.type || 'application/octet-stream',
        },
        body: buf,
      }
    )
    if (!res.ok) {
      console.error('Supabase receipt upload failed:', res.status)
      return null
    }
    return `${SUPABASE_URL}/storage/v1/object/public/vault-receipts/${path}`
  } catch (e) {
    console.error('Receipt upload error:', e)
    return null
  }
}

async function sendTemplate(
  templateId: number,
  email: string,
  firstName: string,
  params: Record<string, string>
) {
  if (!BREVO_API_KEY) return
  try {
    await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': BREVO_API_KEY,
        'content-type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify({
        templateId,
        to: [{ email, name: firstName || undefined }],
        params: { FIRSTNAME: firstName || 'there', ...params },
      }),
    })
  } catch (e) {
    console.error('Template send error:', e)
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!BREVO_API_KEY) {
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    const form = await request.formData()
    const firstName = (form.get('firstName') as string)?.trim()
    const phone = (form.get('phone') as string)?.trim()
    const email = (form.get('email') as string)?.trim().toLowerCase()
    const bookPurchased = form.get('bookPurchased') === 'true'
    const amazonOrder = (form.get('amazonOrder') as string)?.trim() || ''
    const receipt = form.get('receipt') as File | null

    // Validation
    if (!firstName || !phone || !email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'First name, phone, and a valid email are required' },
        { status: 400 }
      )
    }

    // Receipt upload (optional, honor system — never blocks)
    let receiptUrl = ''
    if (receipt && receipt.size > 0) {
      if (receipt.size > MAX_FILE_BYTES) {
        return NextResponse.json(
          { error: 'Receipt file must be under 5MB' },
          { status: 400 }
        )
      }
      if (!ALLOWED_TYPES.includes(receipt.type)) {
        return NextResponse.json(
          { error: 'Receipt must be a PDF, JPG, or PNG' },
          { status: 400 }
        )
      }
      receiptUrl = (await uploadReceipt(receipt, firstName)) || ''
    }

    // Build Brevo contact.
    // NOTE: deliberately NOT adding to COMPANION_KIT (list 21). That list
    // has an existing Brevo automation that auto-sends the Chapter
    // Checklist. Vault signups go to the Vault list (31) + the weekly
    // Newsletter (4), plus the Book Buyer list (32) if they checked the box.
    const listIds = [LISTS.VAULT_OPT, LISTS.NEWSLETTER]
    const tags = ['viral', 'vault-opt', 'cohort-2026']
    if (bookPurchased) {
      listIds.push(LISTS.BOOK_BUYER)
      tags.push('book-buyer', 'bonus-call-2026')
    }

    // Phone goes in a custom text attribute (not Brevo's strict SMS field,
    // which rejects any non-E.164 number and would fail honor-system submits)
    const attributes: Record<string, unknown> = {
      FIRSTNAME: firstName,
      CONTACT_PHONE: phone,
      BOOK_PURCHASED: bookPurchased,
      VAULT_SOURCE: 'session-6-2026',
      TAGS: tags.join(','),
    }
    if (amazonOrder) attributes.AMAZON_ORDER = amazonOrder
    if (receiptUrl) attributes.RECEIPT_URL = receiptUrl

    // Upsert contact
    const upsert = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'api-key': BREVO_API_KEY,
        'content-type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify({
        email,
        attributes,
        listIds,
        updateEnabled: true,
      }),
    })

    if (!upsert.ok) {
      const err = await upsert.json().catch(() => ({}))
      if (err.code === 'duplicate_parameter') {
        // Existing contact — add to lists explicitly
        for (const listId of listIds) {
          await fetch(
            `https://api.brevo.com/v3/contacts/lists/${listId}/contacts/add`,
            {
              method: 'POST',
              headers: {
                'api-key': BREVO_API_KEY,
                'content-type': 'application/json',
                accept: 'application/json',
              },
              body: JSON.stringify({ emails: [email] }),
            }
          )
        }
        // Update attributes on the existing contact
        await fetch(
          `https://api.brevo.com/v3/contacts/${encodeURIComponent(email)}`,
          {
            method: 'PUT',
            headers: {
              'api-key': BREVO_API_KEY,
              'content-type': 'application/json',
            },
            body: JSON.stringify({ attributes }),
          }
        )
      } else {
        console.error('Brevo vault upsert error:', err)
        return NextResponse.json(
          { error: 'Could not save your info. Try again.' },
          { status: 500 }
        )
      }
    }

    // Fire delivery emails — AWAIT them so Vercel does not kill the
    // serverless function before Brevo confirms the send. Earlier
    // 'fire and forget' caused silent drops (see Rob Hannaford incident).
    // Brevo transactional sends typically respond in 100-300ms.
    try {
      await sendTemplate(TEMPLATES.VAULT_DELIVERY, email, firstName, {
        VAULT_URL: VAULT_PDF_URL,
      })
    } catch (e) {
      console.error('Vault delivery email failed for', email, e)
    }
    if (bookPurchased) {
      try {
        await sendTemplate(TEMPLATES.BONUS_CALL, email, firstName, {})
      } catch (e) {
        console.error('Bonus call email failed for', email, e)
      }
    }

    return NextResponse.json({ success: true, bookPurchased })
  } catch (e) {
    console.error('Vault submit error:', e)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
