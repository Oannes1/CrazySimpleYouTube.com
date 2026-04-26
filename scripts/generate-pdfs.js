/**
 * Generate 24 individual worksheet PDFs.
 *
 * Reads scripts/worksheets-content.json (parsed from WORKSHEETS_LIBRARY.md).
 * Outputs to public/pdfs/worksheets/[slug].pdf
 *
 * Layout (US Letter, 1" margins):
 *   - Top of every page: brand red header bar (chapter/title/page number)
 *   - Body content flows in standard pdfkit text engine
 *   - Bottom of every page: dark footer bar (site name + URL)
 *   - Page 1 has an additional hero block above the body
 *   - End of body: red callout inviting community participation
 */
const fs = require('fs')
const path = require('path')
const PDFDocument = require('pdfkit')

const CONTENT_FILE = path.join(__dirname, 'worksheets-content.json')
const OUT_DIR = path.join(__dirname, '..', 'public', 'pdfs', 'worksheets')

const RED = '#C41230'
const DARK = '#1A1A2E'
const MID = '#666666'
const LIGHT = '#999999'

const PAGE_W = 612
const PAGE_H = 792
const MARGIN_X = 72
const MARGIN_TOP = 110 // leaves room for 56px red header bar + 14px gap
const MARGIN_BOTTOM = 96 // leaves room for 36px footer bar + 60px gap
const CONTENT_W = PAGE_W - MARGIN_X * 2

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true })

const worksheets = JSON.parse(fs.readFileSync(CONTENT_FILE, 'utf8'))

function slug(chapter, title) {
  const t = title
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, '')
    .replace(/\s+/g, '-')
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

function bodyToLines(body) {
  const out = []
  const lines = body.split('\n')
  for (const raw of lines) {
    const line = raw.trim()
    if (!line) {
      out.push({ type: 'spacer' })
      continue
    }
    if (line.match(/^\|.*-+/)) continue
    if (line.startsWith('|')) {
      const cells = line
        .split('|')
        .slice(1, -1)
        .map((c) => c.trim())
      out.push({ type: 'table', cells })
      continue
    }
    if (line.startsWith('☐') || /^\[\s\]/.test(line)) {
      out.push({
        type: 'checkbox',
        text: line.replace(/^☐\s*/, '').replace(/^\[\s\]\s*/, ''),
      })
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

function drawHeaderBar(doc, ws, isCover) {
  doc.save().rect(0, 0, PAGE_W, 56).fill(RED).restore()
  doc
    .fillColor('#FFFFFF')
    .font('Helvetica-Bold')
    .fontSize(11)
    .text(`CHAPTER ${ws.chapter}`, MARGIN_X, 16)
    .fontSize(9)
    .font('Helvetica')
    .text('A CRAZY SIMPLE ACTION', MARGIN_X, 33)
  // Right-aligned site name
  doc
    .font('Helvetica-Bold')
    .fontSize(11)
    .text('CRAZYSIMPLEYOUTUBE.COM', MARGIN_X, 24, {
      width: CONTENT_W,
      align: 'right',
    })
}

function drawFooterBar(doc, pageNum, totalPages) {
  const y = PAGE_H - 36
  doc.save().rect(0, y, PAGE_W, 36).fill(DARK).restore()
  doc
    .fillColor('#FFFFFF')
    .font('Helvetica')
    .fontSize(9)
    .text('© 2026 Aaron Cuha · Crazy Simple YouTube', MARGIN_X, y + 13, {
      width: CONTENT_W,
      align: 'left',
    })
  doc
    .font('Helvetica-Bold')
    .fontSize(9)
    .text(`Page ${pageNum} of ${totalPages}`, MARGIN_X, y + 13, {
      width: CONTENT_W,
      align: 'right',
    })
}

async function generateWorksheet(ws) {
  const filename = `${slug(ws.chapter, ws.title)}.pdf`
  const outPath = path.join(OUT_DIR, filename)

  const doc = new PDFDocument({
    size: 'LETTER',
    margins: {
      top: MARGIN_TOP,
      bottom: MARGIN_BOTTOM,
      left: MARGIN_X,
      right: MARGIN_X,
    },
    info: {
      Title: `Chapter ${ws.chapter}: ${ws.title} | Crazy Simple YouTube`,
      Author: 'Aaron Cuha',
      Subject: 'A Crazy Simple Action worksheet',
      Keywords: 'youtube, business, lead generation, worksheet',
    },
    bufferPages: true,
  })

  const stream = fs.createWriteStream(outPath)
  doc.pipe(stream)

  // ========== PAGE 1: Cover hero before body ==========
  // Title block (under the header bar)
  doc.fillColor(DARK)
  doc
    .font('Helvetica-Bold')
    .fontSize(28)
    .text(ws.title, MARGIN_X, MARGIN_TOP, { width: CONTENT_W })
  doc.moveDown(0.4)

  let metaText = `Time to complete: ${ws.time}`
  if (ws.person && ws.person !== 'N/A' && ws.person !== '') {
    metaText += `   ·   Case study: ${ws.person}`
  }
  doc
    .font('Helvetica')
    .fontSize(11)
    .fillColor(MID)
    .text(metaText)
  doc.moveDown(0.6)

  // Red separator
  doc
    .save()
    .moveTo(MARGIN_X, doc.y)
    .lineTo(MARGIN_X + 80, doc.y)
    .lineWidth(3)
    .strokeColor(RED)
    .stroke()
    .restore()
  doc.moveDown(0.8)

  // ========== Body sections ==========
  for (let s = 0; s < ws.sections.length; s++) {
    const section = ws.sections[s]

    if (s > 0) doc.moveDown(1)

    doc
      .font('Helvetica-Bold')
      .fontSize(15)
      .fillColor(RED)
      .text(clean(section.header).toUpperCase(), { width: CONTENT_W })
    doc.moveDown(0.5)

    const lines = bodyToLines(section.body)
    for (const line of lines) {
      switch (line.type) {
        case 'spacer':
          doc.moveDown(0.3)
          break
        case 'paragraph':
          doc
            .font('Helvetica')
            .fontSize(11)
            .fillColor(DARK)
            .text(clean(line.text), { width: CONTENT_W, align: 'left' })
          doc.moveDown(0.5)
          break
        case 'subhead':
          doc.moveDown(0.4)
          doc
            .font('Helvetica-Bold')
            .fontSize(12)
            .fillColor(DARK)
            .text(clean(line.text), { width: CONTENT_W })
          doc.moveDown(0.3)
          break
        case 'bullet': {
          const startY = doc.y
          doc
            .font('Helvetica-Bold')
            .fontSize(11)
            .fillColor(RED)
            .text('•', MARGIN_X, startY, { width: 12 })
          doc
            .font('Helvetica')
            .fillColor(DARK)
            .text(clean(line.text), MARGIN_X + 16, startY, {
              width: CONTENT_W - 16,
            })
          doc.x = MARGIN_X
          doc.moveDown(0.3)
          break
        }
        case 'numbered':
          doc
            .font('Helvetica')
            .fontSize(11)
            .fillColor(DARK)
            .text(clean(line.text), { width: CONTENT_W, indent: 16 })
          doc.moveDown(0.3)
          break
        case 'checkbox': {
          const y = doc.y + 2
          doc
            .save()
            .lineWidth(1)
            .strokeColor(DARK)
            .rect(MARGIN_X, y, 11, 11)
            .stroke()
            .restore()
          doc
            .font('Helvetica')
            .fontSize(11)
            .fillColor(DARK)
            .text(clean(line.text), MARGIN_X + 19, y - 2, {
              width: CONTENT_W - 19,
            })
          doc.x = MARGIN_X
          doc.moveDown(0.4)
          break
        }
        case 'quote': {
          doc.moveDown(0.3)
          let q = clean(line.text)
          if (!q.startsWith('"') && !q.startsWith('"')) q = `"${q}"`
          const sY = doc.y
          doc
            .font('Helvetica-Oblique')
            .fontSize(11)
            .fillColor(MID)
            .text(q, MARGIN_X + 14, sY, { width: CONTENT_W - 14 })
          const eY = doc.y
          doc
            .save()
            .lineWidth(3)
            .strokeColor(RED)
            .moveTo(MARGIN_X, sY)
            .lineTo(MARGIN_X, eY)
            .stroke()
            .restore()
          doc.x = MARGIN_X
          doc.moveDown(0.4)
          break
        }
        case 'table': {
          const cellW = CONTENT_W / line.cells.length
          const y = doc.y
          const rowH = 26
          if (y + rowH > PAGE_H - MARGIN_BOTTOM) {
            doc.addPage()
          }
          for (let i = 0; i < line.cells.length; i++) {
            const cellX = MARGIN_X + i * cellW
            doc
              .save()
              .lineWidth(0.5)
              .strokeColor(LIGHT)
              .rect(cellX, doc.y, cellW, rowH)
              .stroke()
              .restore()
            doc
              .font('Helvetica-Bold')
              .fontSize(9)
              .fillColor(DARK)
              .text(clean(line.cells[i]), cellX + 6, doc.y + 8, {
                width: cellW - 12,
                height: rowH - 12,
                ellipsis: true,
              })
          }
          doc.x = MARGIN_X
          doc.y = doc.y + rowH + 2
          break
        }
      }
    }
  }

  // ========== Closing CTA ==========
  // Check if CTA (90px tall + 14px top spacing) fits on current page.
  // If not, start new page; otherwise add normal spacing.
  const CTA_HEIGHT = 90
  const SPACING = 14
  const pageBottom = PAGE_H - MARGIN_BOTTOM
  if (doc.y + SPACING + CTA_HEIGHT > pageBottom) {
    doc.addPage()
  } else {
    doc.moveDown(1)
  }

  const ctaY = doc.y
  doc
    .save()
    .fillOpacity(0.06)
    .rect(MARGIN_X, ctaY, CONTENT_W, 80)
    .fill(RED)
    .restore()
  doc
    .fillOpacity(1)
    .fillColor(RED)
    .font('Helvetica-Bold')
    .fontSize(13)
    .text('WHEN YOU FINISH THIS:', MARGIN_X + 18, ctaY + 14, {
      width: CONTENT_W - 36,
    })
  doc
    .fillColor(DARK)
    .font('Helvetica')
    .fontSize(11)
    .text(
      'Drop a win in the community. Get feedback from people doing the same work.',
      MARGIN_X + 18,
      ctaY + 35,
      { width: CONTENT_W - 36 }
    )
  doc
    .fillColor(RED)
    .font('Helvetica-Bold')
    .fontSize(12)
    .text(
      'crazysimpleyoutube.com/community',
      MARGIN_X + 18,
      ctaY + 56,
      { width: CONTENT_W - 36 }
    )

  // ========== Add header/footer to every page ==========
  const range = doc.bufferedPageRange()
  const total = range.count
  for (let i = range.start; i < range.start + total; i++) {
    doc.switchToPage(i)
    drawHeaderBar(doc, ws, i === 0)
    drawFooterBar(doc, i + 1, total)
  }

  doc.end()

  return new Promise((resolve) => {
    stream.on('finish', () => {
      const sz = fs.statSync(outPath).size
      resolve({ filename, sizeKB: Math.round(sz / 1024), pages: total })
    })
  })
}

async function main() {
  console.log(`Generating ${worksheets.length} worksheet PDFs...`)
  const results = []
  for (const ws of worksheets) {
    const r = await generateWorksheet(ws)
    results.push(r)
    console.log(`  ✓ ${r.filename} (${r.pages}pp, ${r.sizeKB} KB)`)
  }

  // Bundle: stitch all 24 individual worksheet PDFs into one master file
  const { PDFDocument: PDFLibDocument } = require('pdf-lib')
  console.log('\nBuilding worksheets bundle PDF...')
  const bundle = await PDFLibDocument.create()
  bundle.setTitle('Crazy Simple YouTube — All 24 Worksheets')
  bundle.setAuthor('Aaron Cuha')
  bundle.setSubject('Companion worksheets to Crazy Simple YouTube')

  for (const r of results) {
    const buf = fs.readFileSync(path.join(OUT_DIR, r.filename))
    const src = await PDFLibDocument.load(buf)
    const pages = await bundle.copyPages(src, src.getPageIndices())
    pages.forEach((page) => bundle.addPage(page))
  }
  const bundlePath = path.join(__dirname, '..', 'public', 'pdfs', 'csy-worksheets-bundle.pdf')
  fs.writeFileSync(bundlePath, await bundle.save())
  const sz = fs.statSync(bundlePath).size
  console.log(`  ✓ csy-worksheets-bundle.pdf (${Math.round(sz / 1024)} KB)`)

  console.log(`\nDone. ${results.length} individual + 1 bundle.`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
