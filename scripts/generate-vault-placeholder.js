/**
 * Placeholder for The Viral Video Vault PDF.
 * Generates a single branded page so the email links resolve until
 * Aaron drops the real 5-page Vault at public/pdfs/the-viral-video-vault.pdf
 */
const fs = require('fs')
const path = require('path')
const PDFDocument = require('pdfkit')
const { C, PAGE, registerFonts, isolated } = require('./lib/pdf-design')

const OUT = path.join(__dirname, '..', 'public', 'pdfs', 'the-viral-video-vault.pdf')

const doc = new PDFDocument({
  size: 'LETTER',
  margins: { top: 72, bottom: 72, left: 60, right: 60 },
  info: {
    Title: 'The Viral Video Vault — Crazy Simple YouTube',
    Author: 'Aaron Cuha',
    Subject: 'Reverse-engineered viral real estate video breakdown',
  },
  autoFirstPage: false,
})
registerFonts(doc)
doc.pipe(fs.createWriteStream(OUT))
doc.addPage()

const GOLD = '#B8860B'

isolated(doc, () => {
  doc.rect(0, 0, PAGE.width, PAGE.height).fill(C.charcoal)
  // gold top stripe
  doc.rect(0, 0, PAGE.width, 8).fill(GOLD)

  doc
    .font('body').fontSize(11).fillColor(GOLD)
    .text('EXCLUSIVE  |  LISTING VELOCITY COHORT', 60, 130, {
      width: PAGE.contentW, align: 'center', characterSpacing: 2, lineBreak: false,
    })

  doc
    .font('display').fontSize(64).fillColor('#FAF7EE')
    .text('THE VIRAL', 60, 200, { width: PAGE.contentW, align: 'center', lineBreak: false })
  doc
    .font('display').fontSize(64).fillColor(C.red)
    .text('VIDEO VAULT', 60, 264, { width: PAGE.contentW, align: 'center', lineBreak: false })

  doc
    .font('body').fontSize(13).fillColor('rgba(250,247,238,0.6)')
    .text(
      'The most viral real estate videos on YouTube, reverse-engineered. The exact formats, hooks, titles, thumbnails, and first-30-second patterns that made them blow up.',
      120, 360, { width: PAGE.width - 240, align: 'center' }
    )

  doc
    .font('body').fontSize(11).fillColor('rgba(250,247,238,0.35)')
    .text('PLACEHOLDER — final 5-page Vault to be supplied by Aaron', 60, 600, {
      width: PAGE.contentW, align: 'center', lineBreak: false,
    })

  doc.rect(0, PAGE.height - 8, PAGE.width, 8).fill(GOLD)
  doc
    .font('body').fontSize(9).fillColor('rgba(250,247,238,0.4)')
    .text('© 2026 Haymaker LLC  ·  Crazy Simple YouTube  ·  Aaron Cuha', 60, PAGE.height - 40, {
      width: PAGE.contentW, align: 'center', lineBreak: false,
    })
})

doc.end()
doc.on('end', () => console.log(`✓ Vault placeholder PDF: ${OUT}`))
