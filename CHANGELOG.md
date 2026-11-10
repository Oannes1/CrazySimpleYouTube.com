# Changelog

Newest first. One entry per working session. Plain language, no dashes.

## 2026-11-10 | Viral Video Vault email and PDF cover made right for any signup

**Why**
- Aaron wants to use the Vault as a lead magnet on the website. Both the delivery
  email and the PDF cover were labeled for the Listing Velocity cohort.

**Done**
- Brevo template 106 ("Your Viral Video Vault is here."), changed live through the
  Brevo API. Two edits only:
  - Top label "LISTING VELOCITY COHORT" now reads "CRAZY SIMPLE YOUTUBE".
  - The P.S. about the book buyer bonus call is replaced with: "These blueprints go
    hand in hand with my book, Crazy Simple YouTube. If you do not have it yet, grab
    it on Amazon." (links to the Amazon listing).
  Subject, sender, body, button and the PDF link are unchanged.
- `scripts/create-vault-templates.js` carries the same two edits so the repo copy of
  the template matches what is live in Brevo.
- `public/pdfs/top-25-viral-blueprints.pdf`: the cover line "FOR LISTING VELOCITY
  CLIENTS" is removed. Still 108 pages. A page by page text comparison shows page 1
  as the only page that differs. The MASTER and TOP 10 documents keep that line.

**Left open (waiting on Aaron)**
- The book checkbox on /vault, `/vault/thank-you` and Brevo template 107 still promise
  a 2 hour live Zoom in "late June 2026".
- `/vault/thank-you` and the last page of the PDF still list the old coaching tiers
  and "YouTube Management".
- The form still tags every signup `VAULT_SOURCE: session-6-2026` and `cohort-2026`.
  A new website lead magnet form should send its own source.
- The PDF cover runs four lines past the first page (title line, site links, call
  link, handles land alone on page 2). That was true before today.

## 2026-11-10 | Viral Video Vault PDF: founder line corrected

**Done**
- The last page of `public/pdfs/top-25-viral-blueprints.pdf` read
  "Founder: Crazy Simple YouTube, Got Coach?, Planety Posts, Mountain Builders".
  "Got Coach?" is a retired brand and "Planety Posts" is a misspelling. It now
  reads "Founder: Crazy Simple YouTube, Planet Posts, Mountain Builders".
- Nothing else in the document changed. Still 108 pages. A full text comparison
  of the old and new PDF shows that one line as the only difference, and it sits
  on page 108.
- This is the file emailed to every /vault opt-in by Brevo template 106. The
  template links to the file by URL, so it needed no change and was not touched.
  No email was sent.
- Checked the other 53 PDFs and both Word files under `public/` for the same two
  strings. No other hits.

**How this PDF is built (it was not documented anywhere before today)**
- It is not generated inside this repo. A Python script builds a Word file, and
  LibreOffice on the Mac converts that Word file to PDF.
- The script and its data live in AaronOS, outside this repo, at
  `01_BOOKS/Crazy_Simple_YouTube/Viral Video Master Playbook/_generator/`.
  Rebuild steps are written at the top of `build_doc.py` in that folder.
- Keep that folder out of this repo. This repo is public, and the data file
  holds all 50 blueprints, not only the 25 that are given away.
- Convert on the Mac, not in a Linux sandbox. The Mac has the real Georgia and
  Arial fonts. A sandbox swaps in other fonts and the line breaks move.

**Files touched**
- `public/pdfs/top-25-viral-blueprints.pdf` (replaced)
- `CHANGELOG.md` (new)

**Left open**
- The same founder line is still in two sister documents that this site does
  not deliver: the 50 blueprint master and the Top 10 quick start, both in the
  AaronOS folder above. The script is fixed, so the next rebuild corrects them.
- The same back page still lists GROW, SCALE and YouTube Management. The site
  retired that ladder. Left alone pending Aaron's call on the wording.
- The community document library holds an unpublished draft copy of this PDF
  tagged needs-review. It can now be swapped for the corrected file and
  published.
