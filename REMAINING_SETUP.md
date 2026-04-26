# Remaining Setup — 15 minutes total

Three tiny tasks to fully complete the funnel. None block launch but each unlocks one more capability.

---

## 1. Brevo Meetings booking URL (5 min)

Right now the discovery call form on `/work-with-me` redirects to your aaroncuha.com services page. Once you set up a Brevo Meeting type, that redirect points straight to your live calendar.

### Steps

1. Log into **app.brevo.com**
2. Top nav → **Meetings**
3. Click **Create a Meeting**
4. Fill in:
   - **Name:** `30-Minute Discovery Call`
   - **Duration:** 30 minutes
   - **Buffer:** 15 min before, 15 min after (gives you breathing room between calls)
   - **Available days:** Tue, Wed, Thu (or whatever you prefer)
   - **Available hours:** Suggest 10am-4pm Mountain
   - **Questions to ask before booking:**
     - First name (required)
     - Email (required)
     - Business type (dropdown: Real Estate / Coaching / Consulting / Financial Advisor / Attorney / Contractor / Other)
     - Current YouTube stage (dropdown: Not started / A few videos / 1K-10K subs / 10K+ subs)
     - What do you want from YouTube? (text field, optional)
5. Save and **publish** the meeting
6. Copy the public URL — it'll look like `https://meet.brevo.com/aaron-cuha/30-min-discovery`

### Send me the URL

Reply with: `Brevo Meetings URL: https://meet.brevo.com/...`

I'll update the env var via Vercel CLI and trigger a redeploy. The `/work-with-me` form will then redirect every lead straight to your calendar.

---

## 2. Supabase project URL (30 sec)

You sent me the publishable + secret keys, but I still need the project URL to actually make API calls. The URL is what tells the Supabase client which project to talk to.

### Steps

1. Log into **app.supabase.com**
2. Click your project (the one called `csy-tracking` or similar)
3. Left sidebar → **Settings** (gear icon at the bottom)
4. **API** section in settings
5. Top of page: **Project URL** — looks like `https://abcd1234efgh.supabase.co`
6. Copy that URL

### Send me the URL

Reply with: `Supabase URL: https://[your-ref].supabase.co`

Once you do, I'll:
- Add it as `NEXT_PUBLIC_SUPABASE_URL` to Vercel
- Run a SQL migration to create the `affiliate_clicks` table
- Wire `/api/track` to record every gear click with timestamp, source page, product, user email if known

You'll then be able to query click data in Supabase to see which products convert best, which pages drive clicks, and attribute revenue back to specific email subscribers.

---

## 3. Photos workflow (whenever you have time)

Drop photos into the right folder and tell me. I'll wire them into the right components.

### Folders ready

```
public/photos/
├── aaron/      ← Headshots, on-camera, speaking shots
├── book/       ← Book cover, spread shots, on-desk
├── clients/    ← Client headshots (after they sign the release form)
├── bts/        ← Behind-the-scenes filming/editing setup
└── gear/       ← Original product photos for /gear page
```

### Filename convention (kebab-case, lowercase)

```
aaron/aaron-headshot-01.jpg
aaron/aaron-on-camera-vanlife.jpg
book/book-cover-front.jpg
gear/sony-zv-e10-ii.jpg          ← matches the gear-data slug
gear/dji-mic-mini.jpg
```

### Format

- JPG for photos, PNG for screenshots
- Max width 2400px (Next.js auto-optimizes)
- No HEIC (convert to JPG first)

### Workflow

1. Drop a photo into the matching folder
2. Reply with: `Photo: [filename] for [where it goes]`
3. I wire it into the component within 5 minutes

---

## 4. Client release forms (whenever you can send)

I built a branded 3-page release form at `/pdfs/csy-release-form.pdf`. Each released client unlocks more credibility on the homepage.

### How to use

1. Download the form: **https://crazysimpleyoutube.com/pdfs/csy-release-form.pdf**
2. Email it to your case study clients (Rachel, Scott, Leah, Daniel, Patrick, Natalia, plus anyone else you'd like to feature with full name)
3. Subject line suggestion: `Quick favor — release form for the book`
4. Body suggestion:
   ```
   Hey [Name],
   
   The book is live and your story is in it. Want to use your full name on
   the marketing site too. Here's a short release form (1 page of fields,
   2 pages of legal stuff). Sign it, send it back, and you'll see your
   full name + photo featured on crazysimpleyoutube.com.
   
   If you want any part anonymized or removed, the form has a section for
   that too.
   
   Just reply with the signed PDF or a photo of it.
   
   Aaron
   ```
5. Once they reply with the signed form, send it to me. I'll re-add their full name + photo placeholder to the testimonial.

---

## What's already done (no action needed)

- ✅ Brevo welcome emails fire automatically for: worksheets bundle, prompts bundle, individual prompts, individual worksheets, community waitlist, set in stone waitlist, discovery call inquiry
- ✅ Email gate via middleware blocks direct PDF URL access
- ✅ Cookie-based unlock so users only fill the form once per device
- ✅ Per-asset Brevo tagging so you can see exactly which document drove which contact
- ✅ Amazon affiliate links across all 69 products + 9 kits with tag travelnomad-20
- ✅ FTC disclosure on /gear and /kits
- ✅ Sitemap with 52 indexable URLs submitted-ready
- ✅ Google Search Console verification meta on every page
- ✅ Privacy + Terms pages
- ✅ All 6 trailing-doc pages from the book (community, work-with-me, book2, prompts, worksheets, gear)

---

That's the whole list. Ship it.
