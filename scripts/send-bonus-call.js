/**
 * Send the Bonus Call Details email to every book-buyer (Brevo list 32)
 * once the late-June date is locked.
 *
 * Usage:
 *   BREVO_API_KEY=$(grep BREVO_API_KEY .env | cut -d= -f2) \
 *   node scripts/send-bonus-call.js \
 *     --date "June 24, 2026" \
 *     --time "2:00 PM Mountain" \
 *     --zoom "https://zoom.us/j/XXXXXXXXX" \
 *     --calendar "https://calendar.google.com/..." \
 *     [--dry-run]
 *
 * --dry-run prints who would be emailed without sending.
 */
const API = process.env.BREVO_API_KEY
if (!API) {
  console.error('BREVO_API_KEY env var required')
  process.exit(1)
}

const BOOK_BUYER_LIST = 32
const TEMPLATE = 109 // CSY · Bonus Call Details (Date Locked)

// Parse --flag value args
function arg(name) {
  const i = process.argv.indexOf(`--${name}`)
  return i !== -1 ? process.argv[i + 1] : ''
}
const dryRun = process.argv.includes('--dry-run')

const CALL_DATE = arg('date')
const CALL_TIME = arg('time')
const ZOOM_URL = arg('zoom')
const CALENDAR_URL = arg('calendar') || ZOOM_URL

if (!CALL_DATE || !CALL_TIME || !ZOOM_URL) {
  console.error('Required: --date, --time, --zoom')
  console.error(
    'Example: node scripts/send-bonus-call.js --date "June 24, 2026" --time "2:00 PM Mountain" --zoom "https://zoom.us/j/123"'
  )
  process.exit(1)
}

// Internal test addresses to skip
const TEST_PATTERNS = [/acsyngp\+/i, /@syngp\.com$/i]
const isTest = (e) => TEST_PATTERNS.some((re) => re.test(e))

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
  console.log('Bonus Call send')
  console.log(`  Date:     ${CALL_DATE}`)
  console.log(`  Time:     ${CALL_TIME}`)
  console.log(`  Zoom:     ${ZOOM_URL}`)
  console.log(`  Calendar: ${CALENDAR_URL}`)
  console.log(`  Mode:     ${dryRun ? 'DRY RUN (nothing sent)' : 'LIVE SEND'}\n`)

  const contacts = await getAllListContacts(BOOK_BUYER_LIST)
  console.log(`Found ${contacts.length} contacts on Book Buyer list (32).\n`)

  let sent = 0
  let skipped = 0
  for (const c of contacts) {
    const email = c.email
    if (isTest(email)) {
      skipped++
      continue
    }
    if (dryRun) {
      console.log(`  would send -> ${email}`)
      sent++
      continue
    }
    const r = await brevo('/smtp/email', 'POST', {
      templateId: TEMPLATE,
      to: [{ email, name: c.attributes?.FIRSTNAME || undefined }],
      params: {
        FIRSTNAME: c.attributes?.FIRSTNAME || 'there',
        CALL_DATE,
        CALL_TIME,
        ZOOM_URL,
        CALENDAR_URL,
      },
    })
    if (r.ok) sent++
    else console.error(`  send failed for ${email}:`, r.json)
  }

  console.log('\nDone.')
  console.log(`  ${dryRun ? 'would send' : 'sent'}: ${sent}`)
  console.log(`  test addresses skipped: ${skipped}`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
