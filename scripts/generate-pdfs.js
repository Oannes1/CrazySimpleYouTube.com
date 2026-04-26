/**
 * Generate 24 individual worksheet PDFs + bundle.
 *
 * Editorial design with embedded fonts (Anton/Inter/Caveat).
 * Magazine-style cover, generous whitespace, real typographic hierarchy.
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
  applyChrome,
  drawCommunityCTA,
} = require('./lib/pdf-design')

const CONTENT_FILE = path.join(__dirname, 'worksheets-content.json')
const OUT_DIR = path.join(__dirname, '..', 'public', 'pdfs', 'worksheets')
const BUNDLE_PATH = path.join(__dirname, '..', 'public', 'pdfs', 'csy-worksheets-bundle.pdf')

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true })

const worksheets = JSON.parse(fs.readFileSync(CONTENT_FILE, 'utf8'))

// Optional per-chapter context (intro / Aaron's note / case study).
// Loaded if available; otherwise PDFs render without these enrichments.
let context = []
try {
  const contextPath = path.join(__dirname, '..', 'lib', 'worksheet-context.ts')
  const tsSource = fs.readFileSync(contextPath, 'utf8')
  // Extract objects from the array
  const arr = tsSource.match(/\{\s*chapter:\s*\d+[\s\S]*?\}\s*,?(?=\s*(?:\{|]))/g) || []
  context = arr.map((s) => {
    const ch = parseInt(s.match(/chapter:\s*(\d+)/)?.[1] || '0', 10)
    const why = s.match(/why:\s*'((?:[^'\\]|\\.)*)'/)?.[1] || ''
    const aaronNote = s.match(/aaronNote:\s*'((?:[^'\\]|\\.)*)'/)?.[1] || ''
    const caseStudyBlurb = s.match(/caseStudyBlurb:\s*'((?:[^'\\]|\\.)*)'/)?.[1] || ''
    return {
      chapter: ch,
      why: why.replace(/\\'/g, "'").replace(/\\\\/g, '\\'),
      aaronNote: aaronNote.replace(/\\'/g, "'").replace(/\\\\/g, '\\'),
      caseStudyBlurb: caseStudyBlurb.replace(/\\'/g, "'").replace(/\\\\/g, '\\'),
    }
  })
  console.log(`Loaded context for ${context.length} chapters`)
} catch {
  console.log('No context file yet — generating without enrichments')
}

function getContext(chapter) {
  return context.find((c) => c.chapter === chapter) || { why: '', aaronNote: '', caseStudyBlurb: '' }
}

function slug(chapter, title) {
  const t = title.toLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/\s+/g, '-')
  return `${String(chapter).padStart(2, '0')}-${t}`
}

function clean(text) {
  return text
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\*(.+?)\*/g, '$1')
    .replace(/`(.+?)`/g, '$1')
    .replace(/\[(.+?)\]\(.+?\)/g, '$1')
    .trim()
}

/**
 * Render a Notes / capture block at the end of a worksheet — generous
 * lined writing area for the reader to flesh out their thinking.
 */
function drawNotesBlock(doc) {
  if (doc.y > PAGE.height - PAGE.marginBottom - 240) {
    doc.addPage()
    doc.y = PAGE.marginTop + 28
  } else {
    doc.moveDown(1.2)
  }

  // Section header (matches drawSectionHeader style but with N for "Notes")
  const startY = doc.y
  isolated(doc, () => {
    doc.font('display').fontSize(56).fillColor(C.red)
      .text('+', PAGE.marginX, startY, { width: 80, lineBreak: false, height: 70 })
  })
  isolated(doc, () => {
    doc.font('display').fontSize(13).fillColor(C.mid)
      .text('YOUR', PAGE.marginX + 80, startY + 6, {
        width: PAGE.contentW - 80, characterSpacing: 1.8, lineBreak: false, height: 14,
      })
  })
  isolated(doc, () => {
    doc.font('display').fontSize(20).fillColor(C.charcoal)
      .text('NOTES, NEXT STEPS, COMMITMENTS', PAGE.marginX + 80, startY + 24, {
        width: PAGE.contentW - 80, characterSpacing: -0.2, height: 50, ellipsis: true,
      })
  })
  doc.x = PAGE.marginX
  doc.y = startY + 80

  isolated(doc, () => {
    doc.moveTo(PAGE.marginX, doc.y).lineTo(PAGE.width - PAGE.marginX, doc.y)
      .lineWidth(0.5).strokeColor(C.hairline).stroke()
  })
  doc.moveDown(0.6)

  // 8 horizontal writing lines
  const lineSpacing = 26
  isolated(doc, () => {
    doc.lineWidth(0.5).strokeColor(C.light)
    for (let i = 0; i < 7; i++) {
      const y = doc.y + i * lineSpacing
      if (y > PAGE.height - PAGE.marginBottom - 28) break
      doc.moveTo(PAGE.marginX, y).lineTo(PAGE.width - PAGE.marginX, y).stroke()
    }
  })
  doc.y = doc.y + 6 * lineSpacing + 12
}

/**
 * Pull-quote callout: Aaron's voice, inset with red rule.
 */
function drawAaronNote(doc, text) {
  if (!text) return
  if (doc.y > PAGE.height - PAGE.marginBottom - 130) {
    doc.addPage()
    doc.y = PAGE.marginTop + 28
  } else {
    doc.moveDown(1)
  }

  const startY = doc.y
  // Eyebrow
  isolated(doc, () => {
    doc.font('body').fontSize(9).fillColor(C.red)
      .text("AARON'S NOTE", PAGE.marginX, startY, {
        width: PAGE.contentW, characterSpacing: 1.8, lineBreak: false, height: 12,
      })
  })

  // Big handwritten flourish
  isolated(doc, () => {
    doc.font('accent').fontSize(28).fillColor(C.red).fillOpacity(0.5)
      .text('listen.', PAGE.marginX, startY + 14, { width: 200, lineBreak: false, height: 30 })
      .fillOpacity(1)
  })

  doc.x = PAGE.marginX
  doc.y = startY + 50

  // The note text
  doc.font('body').fontSize(14).fillColor(C.charcoal)
    .text(text, PAGE.marginX, doc.y, {
      width: PAGE.contentW, lineGap: 5, oblique: 6,
    })

  // Red rule below
  isolated(doc, () => {
    doc.moveTo(PAGE.marginX, doc.y + 4).lineTo(PAGE.marginX + 64, doc.y + 4)
      .lineWidth(2).strokeColor(C.red).stroke()
  })
  doc.moveDown(0.6)
}

/**
 * Why-this-matters intro at the start of body content.
 */
function drawIntro(doc, text) {
  if (!text) return
  const startY = doc.y

  isolated(doc, () => {
    doc.font('body').fontSize(9).fillColor(C.red)
      .text('WHY THIS MATTERS', PAGE.marginX, startY, {
        width: PAGE.contentW, characterSpacing: 1.8, lineBreak: false, height: 12,
      })
  })

  doc.x = PAGE.marginX
  doc.y = startY + 18

  doc.font('body').fontSize(13).fillColor(C.body)
    .text(text, PAGE.marginX, doc.y, {
      width: PAGE.contentW, lineGap: 5,
    })

  doc.moveDown(1)
}

/**
 * Case study summary box.
 */
function drawCaseStudy(doc, person, blurb) {
  if (!blurb || !person) return
  if (doc.y > PAGE.height - PAGE.marginBottom - 140) {
    doc.addPage()
    doc.y = PAGE.marginTop + 28
  } else {
    doc.moveDown(0.8)
  }

  const startY = doc.y

  // Render text first to measure height
  doc.x = PAGE.marginX + 24

  doc.font('display').fontSize(11).fillColor(C.red)
    .text(`A REAL ONE: ${person.toUpperCase()}`, PAGE.marginX + 24, startY + 16, {
      width: PAGE.contentW - 48, characterSpacing: 1.6, lineBreak: false, height: 14,
    })

  doc.font('body').fontSize(11).fillColor(C.body)
    .text(blurb, PAGE.marginX + 24, startY + 36, {
      width: PAGE.contentW - 48, lineGap: 4,
    })

  const endY = doc.y + 16

  // Background box behind
  isolated(doc, () => {
    doc.rect(PAGE.marginX, startY, PAGE.contentW, endY - startY)
      .fillOpacity(0.5).fill(C.creamDeep).fillOpacity(1)
    doc.rect(PAGE.marginX, startY, 4, endY - startY).fill(C.red)
  })

  // Re-render text on top of background
  doc.font('display').fontSize(11).fillColor(C.red)
    .text(`A REAL ONE: ${person.toUpperCase()}`, PAGE.marginX + 24, startY + 16, {
      width: PAGE.contentW - 48, characterSpacing: 1.6, lineBreak: false, height: 14,
    })
  doc.font('body').fontSize(11).fillColor(C.body)
    .text(blurb, PAGE.marginX + 24, startY + 36, {
      width: PAGE.contentW - 48, lineGap: 4,
    })

  doc.x = PAGE.marginX
  doc.y = endY + 8
}

function bodyToLines(body) {
  const out = []
  for (const raw of body.split('\n')) {
    const line = raw.trim()
    if (!line) { out.push({ type: 'spacer' }); continue }
    if (line.match(/^\|.*-+/)) continue
    if (line.startsWith('|')) {
      const cells = line.split('|').slice(1, -1).map((c) => c.trim())
      out.push({ type: 'table', cells })
      continue
    }
    if (line.startsWith('☐') || /^\[\s\]/.test(line)) {
      out.push({ type: 'checkbox', text: line.replace(/^☐\s*/, '').replace(/^\[\s\]\s*/, '') })
      continue
    }
    if (/^[-*]\s+/.test(line)) {
      out.push({ type: 'bullet', text: line.replace(/^[-*]\s+/, '') })
      continue
    }
    if (/^\d+\.\s+/.test(line)) {
      out.push({ type: 'numbered', text: line.replace(/^\d+\.\s+/, '') })
      continue
    }
    if (line.startsWith('>')) {
      out.push({ type: 'quote', text: line.replace(/^>\s*/, '') })
      continue
    }
    if (line.startsWith('**') && line.endsWith('**') && line.length > 4) {
      out.push({ type: 'subhead', text: line.replace(/\*\*/g, '') })
      continue
    }
    out.push({ type: 'paragraph', text: line })
  }
  return out
}

function partForChapter(n) {
  if (n <= 6) return 'Foundation'
  if (n <= 12) return 'Content Creation'
  if (n <= 18) return 'Business of YouTube'
  return 'Scale and Sustainability'
}

// ============= COVER PAGE =============
function drawCover(doc, ws) {
  isolated(doc, () => drawCoverInner(doc, ws))
}

function drawCoverInner(doc, ws) {
  const part = partForChapter(ws.chapter)

  // Cream background wash for top
  doc
    .save()
    .rect(0, 0, PAGE.width, PAGE.height - 56)
    .fill(C.cream)
    .restore()

  // Massive Anton chapter number — design element, top-left, partial bleed
  const chapterStr = String(ws.chapter).padStart(2, '0')
  doc
    .save()
    .font('display')
    .fontSize(360)
    .fillColor(C.red)
    .opacity(0.13)
    .text(chapterStr, -20, 60, {
      width: 600,
      align: 'left',
      lineBreak: false,
      height: 400,
    })
    .opacity(1)
    .restore()

  // Eyebrow tag — small caps, red
  const eyebrowY = 100
  doc
    .font('body')
    .fontSize(9)
    .fillColor(C.red)
    .text(`${part.toUpperCase()}  ·  CRAZY SIMPLE ACTION`, PAGE.marginX, eyebrowY, {
      width: PAGE.contentW,
      characterSpacing: 1.8,
    })

  // Chapter label
  doc
    .font('display')
    .fontSize(13)
    .fillColor(C.charcoal)
    .text(`CHAPTER ${ws.chapter}`, PAGE.marginX, eyebrowY + 18, {
      width: PAGE.contentW,
      characterSpacing: 0.8,
    })

  // Title block (centered vertically in upper area)
  const titleY = 280
  doc
    .font('display')
    .fontSize(56)
    .fillColor(C.charcoal)
    .text(ws.title.toUpperCase(), PAGE.marginX, titleY, {
      width: PAGE.contentW,
      lineGap: -8,
      characterSpacing: -0.5,
      height: 200,
    })

  // Red accent bar after title
  const afterTitleY = doc.y + 24
  doc
    .save()
    .rect(PAGE.marginX, afterTitleY, 64, 4)
    .fill(C.red)
    .restore()

  // Meta block
  const metaY = afterTitleY + 32
  // Time
  doc
    .font('body')
    .fontSize(9)
    .fillColor(C.mid)
    .text('TIME TO COMPLETE', PAGE.marginX, metaY, {
      width: 200,
      characterSpacing: 1.6,
    })
  doc
    .font('display')
    .fontSize(20)
    .fillColor(C.charcoal)
    .text(ws.time, PAGE.marginX, metaY + 14, {
      width: 200,
    })

  // Case study
  if (ws.person && ws.person !== 'N/A' && ws.person !== '') {
    doc
      .font('body')
      .fontSize(9)
      .fillColor(C.mid)
      .text('CASE STUDY', PAGE.marginX + 220, metaY, {
        width: 200,
        characterSpacing: 1.6,
      })
    doc
      .font('display')
      .fontSize(20)
      .fillColor(C.charcoal)
      .text(ws.person, PAGE.marginX + 220, metaY + 14, {
        width: 200,
      })
  }

  // Bottom red panel that pulls the eye toward content
  const panelY = PAGE.height - 56 - 90
  doc
    .save()
    .rect(0, panelY, PAGE.width, 90)
    .fill(C.charcoal)
    .restore()

  // Handwritten flourish in panel
  doc
    .font('accent')
    .fontSize(28)
    .fillColor(C.red)
    .opacity(0.85)
    .text('a worksheet', PAGE.marginX, panelY + 18, { width: 200 })
    .opacity(1)

  // Author signature in panel
  doc
    .font('body')
    .fontSize(9)
    .fillColor('rgba(255,255,255,0.5)')
    .text('FROM', PAGE.marginX, panelY + 18, {
      width: PAGE.contentW,
      align: 'right',
      characterSpacing: 1.6,
    })
  doc
    .font('display')
    .fontSize(14)
    .fillColor('#FFFFFF')
    .text('CRAZY SIMPLE YOUTUBE', PAGE.marginX, panelY + 32, {
      width: PAGE.contentW,
      align: 'right',
      characterSpacing: 0.8,
    })
  doc
    .font('body')
    .fontSize(9)
    .fillColor('rgba(255,255,255,0.5)')
    .text('BY AARON CUHA', PAGE.marginX, panelY + 52, {
      width: PAGE.contentW,
      align: 'right',
      characterSpacing: 1.6,
    })
}

// ============= BODY PAGE =============
function startBodyPage(doc) {
  doc.addPage()
  // White content area
  doc.x = PAGE.marginX
  doc.y = PAGE.marginTop + 28 // leave room for running header
}

function drawSectionHeader(doc, sectionNum, headerText, isFirst) {
  if (!isFirst) {
    if (doc.y > PAGE.height - PAGE.marginBottom - 200) {
      doc.addPage()
      doc.y = PAGE.marginTop + 28
    } else {
      doc.moveDown(1.4)
    }
  }

  const startY = doc.y
  const numStr = String(sectionNum).padStart(2, '0')

  // All decorative drawing isolated so the cursor doesn't drift
  isolated(doc, () => {
    doc
      .font('display')
      .fontSize(56)
      .fillColor(C.red)
      .text(numStr, PAGE.marginX, startY, {
        width: 80,
        lineBreak: false,
        height: 70,
      })
  })

  isolated(doc, () => {
    doc
      .font('display')
      .fontSize(13)
      .fillColor(C.mid)
      .text('SECTION', PAGE.marginX + 80, startY + 6, {
        width: PAGE.contentW - 80,
        characterSpacing: 1.8,
        lineBreak: false,
        height: 14,
      })
  })

  isolated(doc, () => {
    doc
      .font('display')
      .fontSize(20)
      .fillColor(C.charcoal)
      .text(clean(headerText).toUpperCase(), PAGE.marginX + 80, startY + 24, {
        width: PAGE.contentW - 80,
        characterSpacing: -0.2,
        height: 50,
        ellipsis: true,
      })
  })

  // Move cursor explicitly below the section header block
  doc.x = PAGE.marginX
  doc.y = startY + 80

  // Hairline divider
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

function renderLine(doc, line) {
  switch (line.type) {
    case 'spacer':
      doc.moveDown(0.4)
      break

    case 'paragraph':
      doc
        .font('body')
        .fontSize(11)
        .fillColor(C.body)
        .text(clean(line.text), { width: PAGE.contentW, lineGap: 4 })
      doc.moveDown(0.5)
      break

    case 'subhead':
      doc.moveDown(0.6)
      doc
        .font('display')
        .fontSize(14)
        .fillColor(C.charcoal)
        .text(clean(line.text).toUpperCase(), {
          width: PAGE.contentW,
          characterSpacing: 0.8,
        })
      doc.moveDown(0.3)
      break

    case 'bullet': {
      const startY = doc.y
      isolated(doc, () => {
        doc
          .font('display')
          .fontSize(11)
          .fillColor(C.red)
          .text('—', PAGE.marginX, startY + 1, {
            width: 16,
            lineBreak: false,
            height: 14,
          })
      })
      doc
        .font('body')
        .fontSize(11)
        .fillColor(C.body)
        .text(clean(line.text), PAGE.marginX + 20, startY, {
          width: PAGE.contentW - 20,
          lineGap: 4,
        })
      doc.x = PAGE.marginX
      doc.moveDown(0.3)
      break
    }

    case 'numbered': {
      // Use a simple arrow marker
      doc
        .font('body')
        .fontSize(11)
        .fillColor(C.body)
        .text(`→  ${clean(line.text)}`, { width: PAGE.contentW, indent: 12, lineGap: 4 })
      doc.moveDown(0.3)
      break
    }

    case 'checkbox': {
      const y = doc.y + 2
      isolated(doc, () => {
        doc
          .lineWidth(1)
          .strokeColor(C.body)
          .rect(PAGE.marginX, y, 11, 11)
          .stroke()
      })
      doc
        .font('body')
        .fontSize(11)
        .fillColor(C.body)
        .text(clean(line.text), PAGE.marginX + 20, y - 2, {
          width: PAGE.contentW - 20,
          lineGap: 4,
        })
      doc.x = PAGE.marginX
      doc.moveDown(0.45)
      break
    }

    case 'quote': {
      doc.moveDown(0.4)
      let q = clean(line.text)
      if (q.startsWith('"') || q.startsWith('“')) q = q.replace(/^["“]|["”]$/g, '').trim()

      const qY = doc.y

      // Stylized quote mark (decorative)
      isolated(doc, () => {
        doc
          .font('display')
          .fontSize(64)
          .fillColor(C.red)
          .opacity(0.4)
          .text("'", PAGE.marginX - 4, qY - 14, {
            width: 40,
            lineBreak: false,
            height: 50,
          })
      })

      // Quote text — flows naturally
      doc
        .font('body')
        .fontSize(13)
        .fillColor(C.charcoal)
        .text(q, PAGE.marginX + 36, qY, {
          width: PAGE.contentW - 46,
          lineGap: 4,
          oblique: 8,
        })

      doc.x = PAGE.marginX
      doc.moveDown(0.6)
      break
    }

    case 'table': {
      const cellW = PAGE.contentW / line.cells.length
      const rowH = 28

      if (doc.y + rowH > PAGE.height - PAGE.marginBottom - 24) {
        doc.addPage()
        doc.y = PAGE.marginTop + 28
      }

      const yStart = doc.y
      isolated(doc, () => {
        doc
          .rect(PAGE.marginX, yStart, PAGE.contentW, rowH)
          .fillOpacity(0.5)
          .fill(C.creamDeep)
          .fillOpacity(1)

        for (let i = 0; i < line.cells.length; i++) {
          const cellX = PAGE.marginX + i * cellW
          if (i > 0) {
            doc
              .moveTo(cellX, yStart)
              .lineTo(cellX, yStart + rowH)
              .lineWidth(0.5)
              .strokeColor(C.hairline)
              .stroke()
          }
          doc
            .font('display')
            .fontSize(9)
            .fillColor(C.charcoal)
            .text(clean(line.cells[i]).toUpperCase(), cellX + 10, yStart + 10, {
              width: cellW - 20,
              height: rowH - 16,
              ellipsis: true,
              characterSpacing: 1.2,
              lineBreak: false,
            })
        }

        doc
          .moveTo(PAGE.marginX, yStart + rowH)
          .lineTo(PAGE.width - PAGE.marginX, yStart + rowH)
          .lineWidth(0.5)
          .strokeColor(C.hairline)
          .stroke()
      })

      doc.x = PAGE.marginX
      doc.y = yStart + rowH + 8
      break
    }
  }
}

/**
 * pdfkit can leave trailing pages that contain only chrome (header/footer)
 * with no real content. We track when content is actually written and
 * trim the buffered range to only include those pages.
 */
async function trimTrailingBlanks(rawBytes, contentPageCount) {
  const src = await PDFLibDocument.load(rawBytes)
  const total = src.getPageCount()
  if (total <= contentPageCount) return rawBytes
  const out = await PDFLibDocument.create()
  out.setTitle(src.getTitle() || '')
  out.setAuthor(src.getAuthor() || '')
  out.setSubject(src.getSubject() || '')
  out.setKeywords(src.getKeywords()?.split(',') || [])
  const pages = await out.copyPages(src, Array.from({ length: contentPageCount }, (_, i) => i))
  pages.forEach((p) => out.addPage(p))
  return Buffer.from(await out.save())
}

async function generateWorksheet(ws) {
  const filename = `${slug(ws.chapter, ws.title)}.pdf`
  const outPath = path.join(OUT_DIR, filename)

  const doc = new PDFDocument({
    size: 'LETTER',
    margins: {
      top: PAGE.marginTop,
      bottom: PAGE.marginBottom,
      left: PAGE.marginX,
      right: PAGE.marginX,
    },
    info: {
      Title: `Chapter ${ws.chapter}: ${ws.title} — Crazy Simple YouTube`,
      Author: 'Aaron Cuha',
      Subject: 'A Crazy Simple Action worksheet',
      Keywords: 'youtube, business, lead generation, worksheet',
    },
    bufferPages: true,
    autoFirstPage: false,
  })
  registerFonts(doc)

  const stream = fs.createWriteStream(outPath)
  doc.pipe(stream)

  // Page 1: cover
  doc.addPage()
  drawCover(doc, ws)

  // Page 2+: body
  startBodyPage(doc)

  const ctx = getContext(ws.chapter)

  // Intro: why this matters (from manuscript)
  if (ctx.why) drawIntro(doc, ctx.why)

  // Case study summary (if applicable)
  if (ctx.caseStudyBlurb) {
    // Pull first name from worksheet metadata, fallback to first word of blurb
    let person = ws.person
    if (!person || person === 'N/A') {
      const m = ctx.caseStudyBlurb.match(/^([A-Z][a-z]+)/)
      person = m ? m[1] : 'A real one'
    }
    drawCaseStudy(doc, person, ctx.caseStudyBlurb)
  }

  // The exercise itself
  for (let s = 0; s < ws.sections.length; s++) {
    const section = ws.sections[s]
    drawSectionHeader(doc, s + 1, section.header, s === 0 && !ctx.why && !ctx.caseStudyBlurb)
    const lines = bodyToLines(section.body)
    for (const line of lines) renderLine(doc, line)
  }

  // Aaron's note (coaching insight from chapter)
  if (ctx.aaronNote) drawAaronNote(doc, ctx.aaronNote)

  // Notes block (writable lines)
  drawNotesBlock(doc)

  // Closing CTA
  drawCommunityCTA(doc)

  // Snapshot the real number of content pages BEFORE any chrome work
  const rangeBefore = doc.bufferedPageRange()
  const realPageCount = rangeBefore.count

  // Apply running chrome to exactly those pages
  for (let i = rangeBefore.start; i < rangeBefore.start + realPageCount; i++) {
    doc.switchToPage(i)
    isolated(doc, () => {
      const isCover = i === 0
      if (!isCover) {
        const y = PAGE.marginTop - 30
        doc
          .moveTo(PAGE.marginX, y + 14)
          .lineTo(PAGE.width - PAGE.marginX, y + 14)
          .lineWidth(0.5)
          .strokeColor(C.hairline)
          .stroke()
        doc
          .font('body')
          .fontSize(8)
          .fillColor(C.red)
          .text(`CHAPTER ${ws.chapter}`.toUpperCase(), PAGE.marginX, y, {
            width: PAGE.contentW, align: 'left', characterSpacing: 1.6, lineBreak: false,
          })
        doc
          .font('display')
          .fontSize(10)
          .fillColor(C.charcoal)
          .text(ws.title.toUpperCase(), PAGE.marginX, y, {
            width: PAGE.contentW, align: 'center', characterSpacing: 0.8, lineBreak: false,
          })
        doc
          .font('body')
          .fontSize(8)
          .fillColor(C.mid)
          .text(`PAGE ${i + 1}`, PAGE.marginX, y, {
            width: PAGE.contentW, align: 'right', characterSpacing: 1.6, lineBreak: false,
          })
      }
      // Footer (every page)
      const fy = PAGE.height - 36
      doc
        .moveTo(PAGE.marginX, fy - 4)
        .lineTo(PAGE.width - PAGE.marginX, fy - 4)
        .lineWidth(0.5)
        .strokeColor(C.hairline)
        .stroke()
      doc
        .font('display')
        .fontSize(11)
        .fillColor(C.charcoal)
        .text('CRAZY SIMPLE YOUTUBE', PAGE.marginX, fy, {
          width: PAGE.contentW, align: 'left', characterSpacing: 1.2, lineBreak: false,
        })
      doc
        .font('body')
        .fontSize(8)
        .fillColor(C.mid)
        .text('CRAZYSIMPLEYOUTUBE.COM', PAGE.marginX, fy + 1, {
          width: PAGE.contentW, align: 'right', characterSpacing: 1.6, lineBreak: false,
        })
    })
  }

  doc.end()

  return new Promise((resolve) => {
    stream.on('finish', async () => {
      // Post-process: trim any blank trailing pages pdfkit may have added
      try {
        const raw = fs.readFileSync(outPath)
        const trimmed = await trimTrailingBlanks(raw, realPageCount)
        if (trimmed.length !== raw.length) fs.writeFileSync(outPath, trimmed)
      } catch (e) {
        // ignore, keep raw
      }
      const sz = fs.statSync(outPath).size
      resolve({ filename, sizeKB: Math.round(sz / 1024) })
    })
  })
}

async function main() {
  console.log(`Generating ${worksheets.length} worksheet PDFs (editorial design)...`)
  const results = []
  for (const ws of worksheets) {
    const r = await generateWorksheet(ws)
    results.push(r)
    console.log(`  ✓ ${r.filename} (${r.sizeKB} KB)`)
  }

  // Build bundle
  console.log('\nBuilding worksheets bundle PDF...')
  const bundle = await PDFLibDocument.create()
  bundle.setTitle('Crazy Simple YouTube — All 24 Worksheets')
  bundle.setAuthor('Aaron Cuha')
  bundle.setSubject('Companion worksheets to Crazy Simple YouTube')
  for (const r of results) {
    const buf = fs.readFileSync(path.join(OUT_DIR, r.filename))
    const src = await PDFLibDocument.load(buf)
    const pages = await bundle.copyPages(src, src.getPageIndices())
    pages.forEach((p) => bundle.addPage(p))
  }
  fs.writeFileSync(BUNDLE_PATH, await bundle.save())
  const sz = fs.statSync(BUNDLE_PATH).size
  console.log(`  ✓ csy-worksheets-bundle.pdf (${Math.round(sz / 1024)} KB)`)

  console.log(`\nDone. ${results.length} worksheets + bundle.`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
