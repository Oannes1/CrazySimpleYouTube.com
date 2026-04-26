/**
 * Generate the client release form PDF that Aaron can send to past
 * case study clients (Rachel, Scott, Leah, Daniel, Patrick, Natalia,
 * etc.) to get written permission to use full names + photos + quotes.
 *
 * Output: public/pdfs/csy-release-form.pdf
 */
const fs = require('fs')
const path = require('path')
const PDFDocument = require('pdfkit')
const { PDFDocument: PDFLibDocument } = require('pdf-lib')
const {
  C,
  PAGE,
  registerFonts,
  isolated,
} = require('./lib/pdf-design')

const OUT_PATH = path.join(__dirname, '..', 'public', 'pdfs', 'csy-release-form.pdf')

const doc = new PDFDocument({
  size: 'LETTER',
  margins: {
    top: PAGE.marginTop,
    bottom: PAGE.marginBottom,
    left: PAGE.marginX,
    right: PAGE.marginX,
  },
  info: {
    Title: 'Client Release Form — Crazy Simple YouTube',
    Author: 'Aaron Cuha',
    Subject: 'Permission to use name, photo, and quote',
  },
  bufferPages: true,
  autoFirstPage: false,
})
registerFonts(doc)

doc.pipe(fs.createWriteStream(OUT_PATH))
doc.addPage()

// ============ Header ============
isolated(doc, () => {
  doc.rect(0, 0, PAGE.width, 200).fill(C.cream)

  // Watermark "01"
  doc
    .font('display')
    .fontSize(280)
    .fillColor(C.red)
    .fillOpacity(0.10)
    .text('R', -10, 50, { width: 600, align: 'left', lineBreak: false, height: 320 })
    .fillOpacity(1)

  // Eyebrow
  doc
    .font('body')
    .fontSize(9)
    .fillColor(C.red)
    .text('CRAZY SIMPLE YOUTUBE  ·  CLIENT RELEASE FORM', PAGE.marginX, 90, {
      width: PAGE.contentW,
      characterSpacing: 1.8,
      lineBreak: false,
    })

  // Big title (two lines, generous height)
  doc
    .font('display')
    .fontSize(40)
    .fillColor(C.charcoal)
    .text('PERMISSION TO USE\nYOUR STORY.', PAGE.marginX, 110, {
      width: PAGE.contentW,
      lineGap: -4,
      characterSpacing: -0.5,
      height: 200,
    })

  // Red bar
  doc.rect(PAGE.marginX, 215, 64, 4).fill(C.red)
})

// ============ Body ============
doc.x = PAGE.marginX
doc.y = 250

// Intro
doc
  .font('body')
  .fontSize(11)
  .fillColor(C.body)
  .text(
    `Hey,\n\nIf you are reading this, you have already done the work. Your story made it into the book Crazy Simple YouTube and onto the website at crazysimpleyoutube.com. I want to keep it there, with your full name, photo, and the actual numbers you put up. To do that legally, I need your written permission.\n\nThis form is short. Sign it, send it back, you are done. If you want any of it tweaked or removed, that is fine too. Just tell me what to change.`,
    { width: PAGE.contentW, lineGap: 5 }
  )

doc.moveDown(1.5)

// Section header helper
function sectionHeader(num, label) {
  if (doc.y > PAGE.height - PAGE.marginBottom - 200) {
    doc.addPage()
    doc.y = PAGE.marginTop + 28
  } else {
    doc.moveDown(1)
  }
  const startY = doc.y
  isolated(doc, () => {
    doc
      .font('display')
      .fontSize(40)
      .fillColor(C.red)
      .text(String(num).padStart(2, '0'), PAGE.marginX, startY, {
        width: 60, lineBreak: false, height: 50,
      })
  })
  isolated(doc, () => {
    doc
      .font('display')
      .fontSize(11)
      .fillColor(C.mid)
      .text('SECTION', PAGE.marginX + 60, startY + 4, {
        width: PAGE.contentW - 60, characterSpacing: 1.8, lineBreak: false, height: 14,
      })
  })
  isolated(doc, () => {
    doc
      .font('display')
      .fontSize(18)
      .fillColor(C.charcoal)
      .text(label.toUpperCase(), PAGE.marginX + 60, startY + 18, {
        width: PAGE.contentW - 60, characterSpacing: -0.2, height: 30, ellipsis: true, lineBreak: false,
      })
  })
  doc.x = PAGE.marginX
  doc.y = startY + 56
  isolated(doc, () => {
    doc
      .moveTo(PAGE.marginX, doc.y)
      .lineTo(PAGE.width - PAGE.marginX, doc.y)
      .lineWidth(0.5)
      .strokeColor(C.hairline)
      .stroke()
  })
  doc.moveDown(0.6)
}

function fillableLine(label, lines = 1) {
  doc
    .font('body')
    .fontSize(10)
    .fillColor(C.mid)
    .text(label, { width: PAGE.contentW })
  doc.moveDown(0.3)
  isolated(doc, () => {
    doc.lineWidth(0.5).strokeColor(C.body)
    for (let i = 0; i < lines; i++) {
      const y = doc.y + i * 22 + 6
      doc.moveTo(PAGE.marginX, y).lineTo(PAGE.width - PAGE.marginX, y).stroke()
    }
  })
  doc.y = doc.y + lines * 22 + 12
}

// Section 1: Your details
sectionHeader(1, 'Your details')
fillableLine('Full name')
fillableLine('Profession (e.g. Real Estate Agent, Coach, Consultant)')
fillableLine('City and state')
fillableLine('Email address')
fillableLine('YouTube channel or website (optional)')

// Section 2: What you grant
sectionHeader(2, 'What you grant')
doc
  .font('body')
  .fontSize(11)
  .fillColor(C.body)
  .text(
    'By signing below, you grant Haymaker LLC and Aaron Cuha permission to use the following on the website crazysimpleyoutube.com, in marketing materials for the book Crazy Simple YouTube and its sequels, and in social media:',
    { width: PAGE.contentW, lineGap: 4 }
  )
doc.moveDown(0.5)
const grants = [
  'Your first and last name',
  'A professional photo or headshot you provide',
  'Direct quotes from our coaching conversations or your written reviews',
  'Your business results (subscribers, revenue, leads, retention metrics) as you reported them',
  'Your industry, market, and approximate location',
  'Reference to your YouTube channel by handle or URL',
]
for (const g of grants) {
  const y = doc.y + 2
  isolated(doc, () => {
    doc.lineWidth(1).strokeColor(C.body).rect(PAGE.marginX, y, 11, 11).stroke()
  })
  doc
    .font('body')
    .fontSize(11)
    .fillColor(C.body)
    .text(g, PAGE.marginX + 20, y - 2, { width: PAGE.contentW - 20, lineGap: 4 })
  doc.x = PAGE.marginX
  doc.moveDown(0.4)
}

// Section 3: Limits
sectionHeader(3, 'What you DO NOT grant')
doc
  .font('body')
  .fontSize(11)
  .fillColor(C.body)
  .text(
    'This permission does not transfer ownership of your name, image, or content to Haymaker LLC. You can revoke this permission in writing at any time by emailing privacy@aaroncuha.com. Within 30 days of receiving a written revocation, we will remove your name, photo, and quotes from the website and any new marketing materials. Materials already printed (the physical book) cannot be recalled.',
    { width: PAGE.contentW, lineGap: 4 }
  )

// Section 4: Anything you want changed
sectionHeader(4, 'Anything you want different')
doc
  .font('body')
  .fontSize(11)
  .fillColor(C.body)
  .text(
    'If you want anything modified, anonymized, or kept off the public site, write it here. We will honor it.',
    { width: PAGE.contentW, lineGap: 4 }
  )
doc.moveDown(0.4)
isolated(doc, () => {
  doc.lineWidth(0.5).strokeColor(C.body)
  for (let i = 0; i < 4; i++) {
    const y = doc.y + i * 22 + 6
    doc.moveTo(PAGE.marginX, y).lineTo(PAGE.width - PAGE.marginX, y).stroke()
  }
})
doc.y = doc.y + 4 * 22 + 12

// Section 5: Signature
sectionHeader(5, 'Sign and send back')
fillableLine('Your signature')
fillableLine('Printed name')
fillableLine('Date (MM/DD/YYYY)')

doc.moveDown(0.5)
doc
  .font('body')
  .fontSize(10)
  .fillColor(C.mid)
  .text(
    'Reply to the email where you got this form, or send a photo or scan to ac@aaroncuha.com. Aaron reads every reply.',
    { width: PAGE.contentW, lineGap: 4 }
  )

// ============ Footer / final block ============
doc.moveDown(2)
const ctaY = doc.y
isolated(doc, () => {
  doc.rect(PAGE.marginX, ctaY, PAGE.contentW, 70).fill(C.charcoal)
  doc.rect(PAGE.marginX, ctaY, 4, 70).fill(C.red)
  doc
    .font('accent')
    .fontSize(20)
    .fillColor(C.red)
    .fillOpacity(0.85)
    .text('thanks for trusting us with your story.', PAGE.marginX + 22, ctaY + 14, {
      width: PAGE.contentW - 32, lineBreak: false,
    })
    .fillOpacity(1)
  doc
    .font('body')
    .fontSize(10)
    .fillColor('rgba(255,255,255,0.7)')
    .text(
      'Your results help every other business owner reading this book see what is possible. We do not take that lightly.',
      PAGE.marginX + 22,
      ctaY + 38,
      { width: PAGE.contentW - 32, height: 24, lineBreak: false }
    )
})

// Snapshot real page count BEFORE chrome (chrome iteration can pad)
const _rangeBefore = doc.bufferedPageRange()
const REAL_PAGES = _rangeBefore.count

// Apply chrome to all pages
const range = doc.bufferedPageRange()
for (let i = range.start; i < range.start + REAL_PAGES; i++) {
  doc.switchToPage(i)
  isolated(doc, () => {
    if (i > 0) {
      const y = PAGE.marginTop - 30
      doc
        .moveTo(PAGE.marginX, y + 14)
        .lineTo(PAGE.width - PAGE.marginX, y + 14)
        .lineWidth(0.5)
        .strokeColor(C.hairline)
        .stroke()
      doc
        .font('body').fontSize(8).fillColor(C.red)
        .text('CLIENT RELEASE FORM', PAGE.marginX, y, {
          width: PAGE.contentW, align: 'left', characterSpacing: 1.6, lineBreak: false,
        })
      doc
        .font('body').fontSize(8).fillColor(C.mid)
        .text(`PAGE ${i + 1}`, PAGE.marginX, y, {
          width: PAGE.contentW, align: 'right', characterSpacing: 1.6, lineBreak: false,
        })
    }
    const fy = PAGE.height - 36
    doc
      .moveTo(PAGE.marginX, fy - 4).lineTo(PAGE.width - PAGE.marginX, fy - 4)
      .lineWidth(0.5).strokeColor(C.hairline).stroke()
    doc
      .font('display').fontSize(11).fillColor(C.charcoal)
      .text('CRAZY SIMPLE YOUTUBE', PAGE.marginX, fy, {
        width: PAGE.contentW, align: 'left', characterSpacing: 1.2, lineBreak: false,
      })
    doc
      .font('body').fontSize(8).fillColor(C.mid)
      .text('© 2026 HAYMAKER LLC', PAGE.marginX, fy + 1, {
        width: PAGE.contentW, align: 'right', characterSpacing: 1.6, lineBreak: false,
      })
  })
}

doc.end()

// Wait for the write stream to finish, then post-process to trim
// any trailing blank pages pdfkit may have left behind.
doc.on('end', async () => {
  try {
    // pdfkit's stream finishes async — give it a moment
    setTimeout(async () => {
      try {
        const raw = fs.readFileSync(OUT_PATH)
        const src = await PDFLibDocument.load(raw)
        const total = src.getPageCount()
        if (total > REAL_PAGES) {
          const out = await PDFLibDocument.create()
          out.setTitle(src.getTitle() || 'Client Release Form')
          out.setAuthor('Aaron Cuha')
          out.setSubject('Permission to use name, photo, and quote')
          const pages = await out.copyPages(
            src,
            Array.from({ length: REAL_PAGES }, (_, i) => i)
          )
          pages.forEach((p) => out.addPage(p))
          fs.writeFileSync(OUT_PATH, await out.save())
        }
        const sz = fs.statSync(OUT_PATH).size
        console.log(`✓ Client release form: ${OUT_PATH} (${Math.round(sz / 1024)} KB, ${REAL_PAGES} pages)`)
      } catch (e) {
        console.error('trim error:', e)
      }
    }, 200)
  } catch (e) {
    console.error(e)
  }
})
