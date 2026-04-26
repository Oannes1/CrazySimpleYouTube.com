/**
 * Create the remaining Brevo welcome templates for non-asset opt-ins:
 *   - CSY · Community Waitlist Welcome (Day 0)
 *   - CSY · Set in Stone Waitlist Welcome (Day 0)
 *   - CSY · Discovery Call Confirmation (Day 0)
 *
 * Each template uses the same brand-aligned HTML shell (matches the
 * Asset Delivery template 102) with copy tailored to the funnel stage.
 *
 * Run: BREVO_API_KEY=$(grep BREVO_API_KEY .env | cut -d= -f2) node scripts/create-brevo-welcome-templates.js
 */

const API = process.env.BREVO_API_KEY
if (!API) {
  console.error('BREVO_API_KEY env var required')
  process.exit(1)
}

const SENDER = { email: 'ac@aaroncuha.com', name: 'Aaron Cuha' }

// Shared CSS / shell (matches Asset Delivery template aesthetic)
const SHELL_CSS = `
  body { margin: 0; padding: 0; background: #1A1A2E; font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Helvetica, Arial, sans-serif; color: #FAF7EE; }
  table { border-collapse: collapse; }
  .container { max-width: 600px; margin: 0 auto; background: #1A1A2E; }
  .h-stripe { height: 6px; background: linear-gradient(90deg, #C41230 0%, #EF4444 50%, #C41230 100%); }
  .pad { padding: 32px 28px; }
  .eyebrow { font-size: 11px; letter-spacing: 0.25em; text-transform: uppercase; color: #C41230; font-weight: 700; }
  .h1 { font-family: 'Anton', 'Impact', Helvetica, Arial, sans-serif; font-size: 38px; line-height: 0.95; text-transform: uppercase; color: #FAF7EE; letter-spacing: -0.5px; margin: 8px 0 0; font-weight: 400; }
  .h1 .red { color: #C41230; }
  .lead { font-size: 16px; line-height: 1.6; color: rgba(250, 247, 238, 0.8); margin: 18px 0 0; }
  .lead strong { color: #FAF7EE; font-weight: 600; }
  .cta-wrap { padding: 24px 0 8px; }
  .cta { display: inline-block; padding: 16px 28px; background: #C41230; color: #FFFFFF !important; text-decoration: none; font-weight: 700; font-size: 16px; border-radius: 12px; box-shadow: 0 8px 24px rgba(196, 18, 48, 0.25); }
  .cta-secondary { display: inline-block; padding: 14px 24px; border: 1px solid rgba(255,255,255,0.15); color: #FAF7EE !important; text-decoration: none; font-weight: 600; font-size: 14px; border-radius: 12px; margin-left: 8px; }
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
  .timeline { margin: 18px 0; padding: 18px 22px; border-left: 3px solid rgba(196, 18, 48, 0.4); }
  .timeline-item { font-size: 14px; color: rgba(250, 247, 238, 0.7); margin: 6px 0; }
  .timeline-item strong { color: #FAF7EE; }
`

function shell(eyebrowText, h1Html, bodyHtml, psBlockHtml) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>You are on the list.</title>
<style>${SHELL_CSS}</style>
</head>
<body>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center">
        <table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0">
          <tr><td><div class="h-stripe"></div></td></tr>

          <tr><td class="pad" style="padding-bottom: 0;">
            <div class="eyebrow">${eyebrowText}</div>
            <h1 class="h1">${h1Html}</h1>
          </td></tr>

          <tr><td class="pad" style="padding-top: 16px; padding-bottom: 0;">
            ${bodyHtml}
          </td></tr>

          <tr><td class="pad" style="padding-top: 0; padding-bottom: 0;">
            <hr class="divider">
          </td></tr>

          <tr><td class="pad" style="padding-top: 0;">
            ${psBlockHtml}
          </td></tr>

          <tr><td class="pad" style="padding-top: 12px;">
            <p class="signature">Keep it crazy simple.</p>
            <p class="lead" style="margin-top: 0;">Aaron Cuha</p>
          </td></tr>

          <tr><td class="footer">
            <a href="https://crazysimpleyoutube.com">crazysimpleyoutube.com</a>  ·  <a href="https://crazysimpleyoutube.com/community">Community</a>  ·  <a href="https://crazysimpleyoutube.com/work-with-me">Work With Me</a>
            <br><br>
            &copy; 2026 Haymaker LLC. You opted in to a Crazy Simple YouTube resource.
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

// Template 1: Community Waitlist Welcome
const COMMUNITY_TEMPLATE = {
  templateName: 'CSY · Community Waitlist Welcome (Day 0)',
  subject: "You're on the Systems Over Hustle waitlist",
  tag: 'csy-community-waitlist',
  htmlContent: shell(
    'CRAZY SIMPLE YOUTUBE  ·  COMMUNITY WAITLIST',
    `You're <span class="red">in.</span><br>Founding spot locked.`,
    `<p class="lead">Hey {{ params.FIRSTNAME | default: "there" }},</p>
     <p class="lead">Welcome to the founding-100 waitlist for <strong>Systems Over Hustle</strong>. The community opens the end of May 2026, and as one of the first 100, you have <strong>founding pricing locked in for life</strong>.</p>

     <div class="timeline">
       <p class="timeline-item"><strong>Now:</strong> You are on the list. We will email you the moment doors open.</p>
       <p class="timeline-item"><strong>Late May 2026:</strong> Doors open. You get first access plus your founding-pricing invite link.</p>
       <p class="timeline-item"><strong>Inside:</strong> Monthly Q&A with Aaron, peer accountability pods, 12 organized topic channels, and the full templates library.</p>
     </div>

     <p class="lead">Bought the book? You also get <strong>3 months free + 3 months of group coaching</strong> when the doors open. We will verify book buyers separately closer to launch.</p>

     <div class="cta-wrap">
       <a class="cta" href="https://www.aaroncuha.com/community">See the full community page</a>
     </div>`,
    `<div class="ps-block">
       <div class="ps-eyebrow">while you wait</div>
       <div class="ps-head">START WITH THE BOOK.</div>
       <p class="ps-body">The community is built for people doing the work. The book is the work. Read it. Fill out the worksheets. By the time the community opens, you will be ready to actually use it.</p>
       <a class="ps-link" href="https://www.amazon.com/dp/B0GWYK8TX6">Get the book on Amazon &rarr;</a>
     </div>`
  ),
}

// Template 2: Set in Stone Waitlist Welcome
const SET_IN_STONE_TEMPLATE = {
  templateName: 'CSY · Set in Stone Waitlist Welcome (Day 0)',
  subject: 'Set in Stone is coming. You will be first.',
  tag: 'csy-set-in-stone-waitlist',
  htmlContent: shell(
    'CRAZY SIMPLE YOUTUBE  ·  WHAT IS NEXT',
    `Set in <span class="red">Stone.</span><br>You're on the list.`,
    `<p class="lead">Hey {{ params.FIRSTNAME | default: "there" }},</p>
     <p class="lead">You just got on the launch list for <strong>Set in Stone</strong>, Aaron's next book. Picks up where mindset meets execution. The architecture for building a business that does not crumble when the market shifts, the algorithm changes, or you have a bad month.</p>

     <div class="timeline">
       <p class="timeline-item"><strong>First chapter:</strong> Lands in your inbox the moment it is finalized.</p>
       <p class="timeline-item"><strong>Pre-order pricing:</strong> Locked in for launch list members before the public release.</p>
       <p class="timeline-item"><strong>Bonuses:</strong> Worksheets and templates that will not ship with the regular release.</p>
       <p class="timeline-item"><strong>Live Q&A:</strong> Optional invitation to a small live call with Aaron before launch.</p>
     </div>

     <p class="lead">No spam. We send updates roughly monthly. You can unsubscribe with one click.</p>

     <div class="cta-wrap">
       <a class="cta" href="https://crazysimpleyoutube.com/book2">Visit the book page</a>
     </div>`,
    `<div class="ps-block">
       <div class="ps-eyebrow">in the meantime</div>
       <div class="ps-head">CRAZY SIMPLE YOUTUBE IS LIVE.</div>
       <p class="ps-body">If you have not read book one yet, that is the foundation Set in Stone builds on. The YouTube system that has put 200,000-plus subscribers across two channels and millions in client revenue.</p>
       <a class="ps-link" href="https://www.amazon.com/dp/B0GWYK8TX6">Get the book on Amazon &rarr;</a>
     </div>`
  ),
}

// Template 3: Discovery Call Confirmation
const DISCOVERY_TEMPLATE = {
  templateName: 'CSY · Discovery Call Confirmation (Day 0)',
  subject: "Got it. Let's talk.",
  tag: 'csy-discovery-call',
  htmlContent: shell(
    'CRAZY SIMPLE YOUTUBE  ·  WORK WITH AARON',
    `Got it.<br>Let's <span class="red">talk.</span>`,
    `<p class="lead">Hey {{ params.FIRSTNAME | default: "there" }},</p>
     <p class="lead">Aaron just got your discovery call request. Within 24 hours you will get a calendar link to grab a 30-minute slot.</p>

     <div class="timeline">
       <p class="timeline-item"><strong>Step 1:</strong> Calendar link arrives. You pick a time that works.</p>
       <p class="timeline-item"><strong>Step 2:</strong> 30-minute call. We walk through your channel (or your plan to start one), identify the bottleneck, and decide together if working together makes sense.</p>
       <p class="timeline-item"><strong>Step 3:</strong> No high-pressure pitch. If we are not a fit, Aaron will tell you. If we are, we figure out which tier fits.</p>
     </div>

     <p class="lead">If you have questions before the call, just reply to this email. Aaron reads every reply.</p>

     <div class="cta-wrap">
       <a class="cta" href="https://crazysimpleyoutube.com/work-with-me">See all coaching tiers</a>
     </div>`,
    `<div class="ps-block">
       <div class="ps-eyebrow">prep for the call</div>
       <div class="ps-head">RUN THE 30-SECOND QUIZ.</div>
       <p class="ps-body">Three questions that get to the right tier in 30 seconds. Saves us both time on the call and gives Aaron a head start understanding your situation.</p>
       <a class="ps-link" href="https://crazysimpleyoutube.com/work-with-me#quiz">Take the quiz &rarr;</a>
     </div>`
  ),
}

async function createTemplate(template) {
  const res = await fetch('https://api.brevo.com/v3/smtp/templates', {
    method: 'POST',
    headers: {
      'api-key': API,
      'content-type': 'application/json',
      accept: 'application/json',
    },
    body: JSON.stringify({
      sender: SENDER,
      isActive: true,
      replyTo: 'ac@aaroncuha.com',
      ...template,
    }),
  })
  const json = await res.json()
  if (!res.ok) {
    console.error(`Failed to create "${template.templateName}":`, json)
    return null
  }
  return json.id
}

async function main() {
  for (const t of [COMMUNITY_TEMPLATE, SET_IN_STONE_TEMPLATE, DISCOVERY_TEMPLATE]) {
    const id = await createTemplate(t)
    if (id) console.log(`✓ Created template ${id}: ${t.templateName}`)
  }
}

main()
