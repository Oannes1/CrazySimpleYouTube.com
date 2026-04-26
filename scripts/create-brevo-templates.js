/**
 * Create Brevo transactional email templates for instant asset delivery.
 *
 * Run: node scripts/create-brevo-templates.js
 *
 * Templates created:
 *   - CSY · Asset Delivery (Day 0) — sends the requested PDF immediately
 *
 * Uses Brevo's params system for personalization:
 *   {{ params.FIRSTNAME }}
 *   {{ params.ASSET_NAME }}
 *   {{ params.ASSET_TYPE }}    e.g. "worksheet", "prompt", "bundle"
 *   {{ params.PDF_URL }}       direct download link
 *   {{ params.IS_BUNDLE }}     boolean string "true"/"false" for conditional copy
 */

const API = process.env.BREVO_API_KEY
if (!API) {
  console.error('BREVO_API_KEY environment variable is required')
  console.error('Run: BREVO_API_KEY=$(grep BREVO_API_KEY .env | cut -d= -f2) node scripts/create-brevo-templates.js')
  process.exit(1)
}

const SENDER = {
  email: 'ac@aaroncuha.com',
  name: 'Aaron Cuha',
}

// Brand-aligned email HTML (Anton, Inter, red, dark)
function html() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{{ params.ASSET_NAME }}</title>
<style>
  body { margin: 0; padding: 0; background: #1A1A2E; font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Helvetica, Arial, sans-serif; color: #FAF7EE; }
  table { border-collapse: collapse; }
  .container { max-width: 600px; margin: 0 auto; background: #1A1A2E; }
  .h-stripe { height: 6px; background: linear-gradient(90deg, #C41230 0%, #EF4444 50%, #C41230 100%); }
  .pad { padding: 32px 28px; }
  .eyebrow { font-size: 11px; letter-spacing: 0.25em; text-transform: uppercase; color: #C41230; font-weight: 700; }
  .h1 { font-family: 'Anton', 'Impact', Helvetica, Arial, sans-serif; font-size: 38px; line-height: 0.95; text-transform: uppercase; color: #FAF7EE; letter-spacing: -0.5px; margin: 8px 0 0; font-weight: 400; }
  .h1 .red { color: #C41230; }
  .lead { font-size: 16px; line-height: 1.6; color: rgba(250, 247, 238, 0.75); margin: 18px 0 0; }
  .lead strong { color: #FAF7EE; font-weight: 600; }
  .cta-wrap { padding: 28px 0 8px; }
  .cta { display: inline-block; padding: 16px 28px; background: #C41230; color: #FFFFFF !important; text-decoration: none; font-weight: 700; font-size: 16px; border-radius: 12px; box-shadow: 0 8px 24px rgba(196, 18, 48, 0.25); }
  .small { font-size: 13px; line-height: 1.6; color: rgba(250, 247, 238, 0.5); margin: 18px 0 0; }
  .divider { border: 0; border-top: 1px solid rgba(255,255,255,0.06); margin: 28px 0; }
  .ps-block { padding: 22px; border-radius: 12px; background: rgba(196, 18, 48, 0.08); border-left: 3px solid #C41230; }
  .ps-eyebrow { font-family: 'Caveat', cursive; font-size: 22px; color: rgba(196, 18, 48, 0.85); margin-bottom: 6px; }
  .ps-head { font-family: 'Anton', 'Impact', Helvetica, Arial, sans-serif; font-size: 20px; text-transform: uppercase; color: #FAF7EE; letter-spacing: -0.3px; font-weight: 400; }
  .ps-body { font-size: 14px; color: rgba(250, 247, 238, 0.7); margin: 8px 0 12px; line-height: 1.5; }
  .ps-link { color: #C41230; text-decoration: none; font-weight: 700; font-size: 14px; }
  .footer { padding: 28px; text-align: center; font-size: 11px; color: rgba(250, 247, 238, 0.35); }
  .footer a { color: rgba(250, 247, 238, 0.5); }
  .signature { font-family: 'Caveat', cursive; font-size: 22px; color: rgba(250, 247, 238, 0.55); }
</style>
</head>
<body>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center">
        <table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0">

          <!-- Top brand stripe -->
          <tr><td><div class="h-stripe"></div></td></tr>

          <!-- Header -->
          <tr><td class="pad" style="padding-bottom: 0;">
            <div class="eyebrow">CRAZY SIMPLE YOUTUBE  ·  COMPANION DELIVERY</div>
            <h1 class="h1">Your <span class="red">{{ params.ASSET_TYPE }}</span><br>is ready.</h1>
          </td></tr>

          <!-- Body -->
          <tr><td class="pad" style="padding-top: 16px; padding-bottom: 0;">
            <p class="lead">Hey {{ params.FIRSTNAME | default: "there" }},</p>
            <p class="lead">As promised, here's <strong>{{ params.ASSET_NAME }}</strong>. One click, one download. No spam to wade through, no upsell to dodge.</p>

            <div class="cta-wrap">
              <a class="cta" href="{{ params.PDF_URL }}">
                Download Now &rarr;
              </a>
            </div>

            <p class="small">If the button does not work, paste this link into your browser: <br>{{ params.PDF_URL }}</p>
          </td></tr>

          <tr><td class="pad" style="padding-top: 0; padding-bottom: 0;">
            <hr class="divider">
          </td></tr>

          <!-- P.S. block: cross-promo -->
          <tr><td class="pad" style="padding-top: 0;">
            <div class="ps-block">
              <div class="ps-eyebrow">p.s.</div>
              <div class="ps-head">EVERY DOWNLOAD IS NOW UNLOCKED.</div>
              <p class="ps-body">You filled out one form. From now on, every prompt, worksheet, and resource on the site downloads instantly. No more email gates.</p>
              <a class="ps-link" href="https://crazysimpleyoutube.com/resources">Browse the full library &rarr;</a>
            </div>
          </td></tr>

          <!-- Signature -->
          <tr><td class="pad" style="padding-top: 12px;">
            <p class="lead" style="margin-top: 0;">Implement, post, repeat.</p>
            <p class="signature">Keep it crazy simple.</p>
            <p class="lead" style="margin-top: 0;">Aaron Cuha</p>
          </td></tr>

          <!-- Footer -->
          <tr><td class="footer">
            <a href="https://crazysimpleyoutube.com">crazysimpleyoutube.com</a>  ·  <a href="https://crazysimpleyoutube.com/community">Community</a>  ·  <a href="https://crazysimpleyoutube.com/work-with-me">Work With Me</a>
            <br><br>
            &copy; 2026 Haymaker LLC. You are getting this because you opted in to a Crazy Simple YouTube resource.
            <br>
            <a href="{{ unsubscribe }}">Unsubscribe</a>
          </td></tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

async function main() {
  const payload = {
    sender: SENDER,
    templateName: 'CSY · Asset Delivery (Day 0)',
    subject: 'Your {{ params.ASSET_NAME }} is ready',
    htmlContent: html(),
    isActive: true,
    tag: 'csy-asset-delivery',
    replyTo: 'ac@aaroncuha.com',
  }

  const res = await fetch('https://api.brevo.com/v3/smtp/templates', {
    method: 'POST',
    headers: {
      'api-key': API,
      'content-type': 'application/json',
      accept: 'application/json',
    },
    body: JSON.stringify(payload),
  })
  const json = await res.json()
  if (!res.ok) {
    console.error('Failed:', json)
    process.exit(1)
  }
  console.log(`✓ Template created: id=${json.id}, name="${payload.templateName}"`)
  console.log(`  Use this id in /api/subscribe to send transactional emails`)
}

main()
