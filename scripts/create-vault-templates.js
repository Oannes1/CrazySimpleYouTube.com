/**
 * Create the two immediate-delivery Brevo templates for the Vault funnel:
 *   106 — CSY · Viral Video Vault Delivery   (everyone, on submit)
 *   107 — CSY · Bonus Call Confirmation       (book buyers, on submit)
 *
 * Run: BREVO_API_KEY=$(grep BREVO_API_KEY .env | cut -d= -f2) node scripts/create-vault-templates.js
 */
const API = process.env.BREVO_API_KEY
if (!API) {
  console.error('BREVO_API_KEY env var required')
  process.exit(1)
}
const SENDER = { email: 'ac@aaroncuha.com', name: 'Aaron Cuha' }

const CSS = `
  body { margin:0; padding:0; background:#1A1A2E; font-family:-apple-system,BlinkMacSystemFont,Arial,'Segoe UI',Helvetica,sans-serif; color:#FAF7EE; }
  table { border-collapse:collapse; }
  .container { max-width:600px; margin:0 auto; background:#1A1A2E; }
  .h-stripe { height:6px; background:linear-gradient(90deg,#C41230 0%,#B8860B 50%,#C41230 100%); }
  .pad { padding:32px 28px; }
  .eyebrow { font-size:11px; letter-spacing:0.22em; text-transform:uppercase; color:#B8860B; font-weight:700; }
  .h1 { font-family:Arial,Helvetica,sans-serif; font-size:30px; line-height:1.1; font-weight:800; color:#FAF7EE; margin:8px 0 0; }
  .h1 .red { color:#C41230; }
  .lead { font-size:16px; line-height:1.6; color:rgba(250,247,238,0.8); margin:16px 0 0; }
  .lead strong { color:#FAF7EE; font-weight:700; }
  .cta-wrap { padding:26px 0 6px; }
  .cta { display:inline-block; padding:16px 30px; background:#C41230; color:#FFFFFF !important; text-decoration:none; font-weight:800; font-size:16px; border-radius:10px; }
  .cta-gold { background:#B8860B; }
  .small { font-size:13px; line-height:1.6; color:rgba(250,247,238,0.5); margin:16px 0 0; }
  .divider { border:0; border-top:1px solid rgba(255,255,255,0.08); margin:26px 0; }
  .checklist { margin:14px 0; padding:0; }
  .checkitem { font-size:15px; line-height:1.5; color:rgba(250,247,238,0.8); margin:8px 0; }
  .footer { padding:26px; text-align:center; font-size:11px; color:rgba(250,247,238,0.35); }
  .footer a { color:rgba(250,247,238,0.5); }
  .signature { font-size:16px; color:rgba(250,247,238,0.8); margin-top:18px; }
`

function vaultDeliveryHtml() {
  return `<!DOCTYPE html><html><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<style>${CSS}</style></head><body>
<table role="presentation" width="100%"><tr><td align="center">
<table role="presentation" class="container" width="600">
  <tr><td><div class="h-stripe"></div></td></tr>
  <tr><td class="pad" style="padding-bottom:0;">
    <div class="eyebrow">LISTING VELOCITY COHORT</div>
    <h1 class="h1">Your <span class="red">Viral Video Vault</span> is here.</h1>
  </td></tr>
  <tr><td class="pad" style="padding-top:14px;padding-bottom:0;">
    <p class="lead">Hey {{ contact.FIRSTNAME | default: "there" }},</p>
    <p class="lead">As promised. The Viral Video Vault is yours.</p>
    <p class="lead"><strong>5 pages. The viral formats that work in real estate, reverse-engineered.</strong> The exact hooks, titles, thumbnails, and first-30-second patterns that made them blow up.</p>
    <div class="cta-wrap">
      <a class="cta cta-gold" href="{{ params.VAULT_URL }}">Download the Vault</a>
    </div>
    <p class="lead">Here is what to do with it:</p>
    <div class="checklist">
      <div class="checkitem">1. Read it once tonight.</div>
      <div class="checkitem">2. Pick ONE format you want to model.</div>
      <div class="checkitem">3. Film it this Sunday.</div>
    </div>
    <p class="lead">Have questions? Hit reply. I read everything.</p>
    <p class="signature">Aaron</p>
  </td></tr>
  <tr><td class="pad" style="padding-top:0;"><hr class="divider">
    <p class="small"><strong style="color:rgba(250,247,238,0.7);">P.S.</strong> If you confirmed you bought the book, watch your inbox. I am sending the bonus call details separately.</p>
  </td></tr>
  <tr><td class="footer">
    <a href="https://crazysimpleyoutube.com">crazysimpleyoutube.com</a>
    <br><br>&copy; 2026 Haymaker LLC | Crazy Simple YouTube | Aaron Cuha<br>
    <a href="{{ unsubscribe }}">Unsubscribe</a>
  </td></tr>
</table></td></tr></table></body></html>`
}

function bonusCallHtml() {
  return `<!DOCTYPE html><html><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<style>${CSS}</style></head><body>
<table role="presentation" width="100%"><tr><td align="center">
<table role="presentation" class="container" width="600">
  <tr><td><div class="h-stripe"></div></td></tr>
  <tr><td class="pad" style="padding-bottom:0;">
    <div class="eyebrow">BOOK BUYER BONUS</div>
    <h1 class="h1">You are on the <span class="red">bonus call list.</span></h1>
  </td></tr>
  <tr><td class="pad" style="padding-top:14px;padding-bottom:0;">
    <p class="lead">Hey {{ contact.FIRSTNAME | default: "there" }},</p>
    <p class="lead">Got you. You are locked in for the bonus call.</p>
    <p class="lead"><strong>2-hour live Zoom. Late June 2026.</strong> Bring your channel. I review titles, thumbnails, and descriptions live.</p>
    <p class="lead">Once I lock the exact date, you will get:</p>
    <div class="checklist">
      <div class="checkitem">The Zoom link</div>
      <div class="checkitem">A calendar invite</div>
      <div class="checkitem">A reminder 24 hours before</div>
      <div class="checkitem">A 1-hour reminder</div>
    </div>
    <p class="lead">Between now and then: read the book. Take notes. Bring your toughest questions to the call. I will answer them live.</p>
    <p class="signature">Aaron</p>
  </td></tr>
  <tr><td class="pad" style="padding-top:0;"><hr class="divider">
    <p class="small"><strong style="color:rgba(250,247,238,0.7);">P.S.</strong> The Viral Video Vault is in a separate email. Check your inbox.</p>
  </td></tr>
  <tr><td class="footer">
    <a href="https://crazysimpleyoutube.com">crazysimpleyoutube.com</a>
    <br><br>&copy; 2026 Haymaker LLC | Crazy Simple YouTube | Aaron Cuha<br>
    <a href="{{ unsubscribe }}">Unsubscribe</a>
  </td></tr>
</table></td></tr></table></body></html>`
}

async function createTemplate(t) {
  const res = await fetch('https://api.brevo.com/v3/smtp/templates', {
    method: 'POST',
    headers: { 'api-key': API, 'content-type': 'application/json', accept: 'application/json' },
    body: JSON.stringify({ sender: SENDER, isActive: true, replyTo: 'ac@aaroncuha.com', ...t }),
  })
  const j = await res.json()
  if (!res.ok) { console.error(`Failed "${t.templateName}":`, j); return null }
  return j.id
}

async function main() {
  const a = await createTemplate({
    templateName: 'CSY · Viral Video Vault Delivery',
    subject: 'Your Viral Video Vault is here.',
    htmlContent: vaultDeliveryHtml(),
    tag: 'csy-vault-delivery',
  })
  if (a) console.log(`✓ Template ${a}: Viral Video Vault Delivery`)

  const b = await createTemplate({
    templateName: 'CSY · Bonus Call Confirmation',
    subject: 'You are on the bonus call list.',
    htmlContent: bonusCallHtml(),
    tag: 'csy-bonus-call',
  })
  if (b) console.log(`✓ Template ${b}: Bonus Call Confirmation`)
}

main()
