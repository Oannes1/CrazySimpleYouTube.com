/**
 * Vault backfill + corrective send.
 *
 * For everyone already on list 31 (Vault Opt):
 *   1. Add the `viral` tag (merges into existing TAGS attribute)
 *   2. Add them to the weekly Newsletter list (4)
 *   3. Send the corrective email so they have the RIGHT document
 *      (some early signups got the Chapter Checklist by mistake)
 *
 * Skips obvious internal test addresses.
 *
 * Run: BREVO_API_KEY=$(grep BREVO_API_KEY .env | cut -d= -f2) node scripts/vault-backfill.js
 */
const API = process.env.BREVO_API_KEY
if (!API) {
  console.error('BREVO_API_KEY env var required')
  process.exit(1)
}

const VAULT_LIST = 31
const NEWSLETTER_LIST = 4
const CORRECTIVE_TEMPLATE = 108 // CSY · Vault Correction
const VAULT_URL = 'https://crazysimpleyoutube.com/pdfs/top-25-viral-blueprints.pdf'

// Internal test addresses to skip on the corrective send
const TEST_PATTERNS = [/acsyngp\+/i, /@syngp\.com$/i]

function isTest(email) {
  return TEST_PATTERNS.some((re) => re.test(email))
}

async function brevo(path, method = 'GET', body) {
  const res = await fetch(`https://api.brevo.com/v3${path}`, {
    method,
    headers: {
      'api-key': API,
      'content-type': 'application/json',
      accept: 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  })
  const text = await res.text()
  let json = {}
  try { json = text ? JSON.parse(text) : {} } catch {}
  return { ok: res.ok, status: res.status, json }
}

async function getAllListContacts(listId) {
  const all = []
  let offset = 0
  while (true) {
    const { json } = await brevo(
      `/contacts/lists/${listId}/contacts?limit=500&offset=${offset}`
    )
    const batch = json.contacts || []
    all.push(...batch)
    if (batch.length < 500) break
    offset += 500
  }
  return all
}

async function main() {
  console.log('Fetching list 31 (Vault Opt) contacts...')
  const contacts = await getAllListContacts(VAULT_LIST)
  console.log(`Found ${contacts.length} contacts.\n`)

  let tagged = 0
  let newslettered = 0
  let emailed = 0
  let skipped = 0

  for (const c of contacts) {
    const email = c.email
    const attrs = c.attributes || {}

    // 1. Merge `viral` into the TAGS attribute
    const existingTags = (attrs.TAGS || '')
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)
    if (!existingTags.includes('viral')) {
      const merged = Array.from(new Set([...existingTags, 'viral']))
      const r = await brevo(`/contacts/${encodeURIComponent(email)}`, 'PUT', {
        attributes: { TAGS: merged.join(',') },
      })
      if (r.ok) tagged++
    }

    // 2. Add to the weekly newsletter list
    const addRes = await brevo(
      `/contacts/lists/${NEWSLETTER_LIST}/contacts/add`,
      'POST',
      { emails: [email] }
    )
    if (addRes.ok) newslettered++

    // 3. Corrective send (skip internal test addresses)
    if (isTest(email)) {
      skipped++
      continue
    }
    const sendRes = await brevo('/smtp/email', 'POST', {
      templateId: CORRECTIVE_TEMPLATE,
      to: [{ email, name: attrs.FIRSTNAME || undefined }],
      params: {
        FIRSTNAME: attrs.FIRSTNAME || 'there',
        VAULT_URL,
      },
    })
    if (sendRes.ok) emailed++
    else console.error(`  send failed for ${email}:`, sendRes.json)
  }

  console.log('\nDone.')
  console.log(`  viral tag added:        ${tagged}`)
  console.log(`  added to newsletter:    ${newslettered}`)
  console.log(`  corrective email sent:  ${emailed}`)
  console.log(`  test addresses skipped: ${skipped}`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
