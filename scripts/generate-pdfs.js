/**
 * Generate 24 worksheet PDFs + a bundle PDF.
 *
 * Reads scripts/worksheets-content.json (parsed from WORKSHEETS_LIBRARY.md)
 * Outputs to public/pdfs/worksheets/
 */
const fs = require('fs')
const path = require('path')
const PDFDocument = require('pdfkit')
const { PDFDocument: PDFLibDocument } = require('pdf-lib')

const CONTENT_FILE = path.join(__dirname, 'worksheets-content.json')
const OUT_DIR = path.join(__dirname, '..', 'public', 'pdfs', 'worksheets')

// Brand colors (per intake guidelines: Arial, brand red, dark)
const RED = '#C41230'
const DARK = '#1A1A2E'
const LIGHT_GRAY = '#666666'
const BG = '#FFFFFF'

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true })

const worksheets = JSON.parse(fs.readFileSync(CONTENT_FILE, 'utf8'))

// Helper: slug from chapter+title
function slug(chapter, title) {
  const t = title
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, '')
    .replace(/\s+/g, '-')
  return `${String(chapter).padStart(2, '0')}-${t}`
}

// Helper: convert markdown-ish source to lines we can render
function bodyToLines(body) {
  const lines = []
  const rawLines = body.split('\n')

  for (const line of rawLines) {
    const trimmed = line.trim()
    if (!trimmed) {
      lines.push({ type: 'spacer' })
      continue
    }

    // Markdown table — skip for now (just render header line)
    if (trimmed.startsWith('|')) {
      lines.push({ type: 'fillable-line' })
      continue
    }

    // Bullet
    if (/^[-*]\s+/.test(trimmed)) {
      const text = trimmed.replace(/^[-*]\s+/, '')
      lines.push({ type: 'bullet', text })
      continue
    }

    // Checkbox: "☐ ..."
    if (trimmed.startsWith('☐') || /^\[\s\]/.test(trimmed)) {
      const text = trimmed.replace(/^☐\s*/, '').replace(/^\[\s\]\s*/, '')
      lines.push({ type: 'checkbox', text })
      continue
    }

    // Numbered list
    if (/^\d+\.\s+/.test(trimmed)) {
      const text = trimmed.replace(/^\d+\.\s+/, '')
      lines.push({ type: 'numbered', text })
      continue
    }

    // Block quote
    if (trimmed.startsWith('>')) {
      lines.push({ type: 'quote', text: trimmed.replace(/^>\s*/, '') })
      continue
    }

    // Sub-header (bold)
    if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
      lines.push({ type: 'subhead', text: trimmed.replace(/\*\*/g, '') })
      continue
    }

    lines.push({ type: 'paragraph', text: trimmed })
  }

  return lines
}

// Strip markdown formatting from text content for clean PDF rendering
function clean(text) {
  return text
    .replace(/\*\*(.+?)\*\*/g, '$1') // bold
    .replace(/\*(.+?)\*/g, '$1') // italic
    .replace(/`(.+?)`/g, '$1') // code
    .replace(/\[(.+?)\]\(.+?\)/g, '$1') // links
    .trim()
}

// Generate one worksheet PDF
function generateWorksheet(ws) {
  const filename = `${slug(ws.chapter, ws.title)}.pdf`
  const outPath = path.join(OUT_DIR, filename)

  const doc = new PDFDocument({
    size: 'LETTER',
    margins: { top: 72, bottom: 72, left: 72, right: 72 },
    info: {
      Title: `Chapter ${ws.chapter}: ${ws.title} | Crazy Simple YouTube`,
      Author: 'Aaron Cuha',
      Subject: 'A Crazy Simple Action worksheet',
      Keywords: 'youtube, business, lead generation, worksheet',
    },
  })

  const stream = fs.createWriteStream(outPath)
  doc.pipe(stream)

  // === Cover Page ===
  // Red header bar
  doc
    .save()
    .rect(0, 0, 612, 100)
    .fill(RED)
    .fontSize(11)
    .fillColor('#FFFFFF')
    .font('Helvetica-Bold')
    .text(`CHAPTER ${ws.chapter}`, 72, 30, { width: 468 })
    .fontSize(10)
    .font('Helvetica')
    .text('A CRAZY SIMPLE ACTION', 72, 50)
    .restore()

  // Title
  doc
    .moveDown(2)
    .fontSize(28)
    .fillColor(DARK)
    .font('Helvetica-Bold')
    .text(ws.title, 72, 140, { width: 468 })

  // Time + person
  doc.moveDown(0.5)
  doc.fontSize(11).font('Helvetica').fillColor(LIGHT_GRAY)
  let metaLine = `Time: ${ws.time}`
  if (ws.person && ws.person !== 'N/A') {
    metaLine += `   |   Case study: ${ws.person}`
  }
  doc.text(metaLine)

  // Divider
  doc.moveDown(1)
  const dividerY = doc.y
  doc
    .moveTo(72, dividerY)
    .lineTo(540, dividerY)
    .lineWidth(2)
    .strokeColor(RED)
    .stroke()
  doc.moveDown(1)

  // Sections
  for (const section of ws.sections) {
    if (doc.y > 680) doc.addPage()

    // Section header
    doc
      .fontSize(16)
      .fillColor(DARK)
      .font('Helvetica-Bold')
      .text(clean(section.header), { width: 468 })
    doc.moveDown(0.4)

    // Section body
    const lines = bodyToLines(section.body)
    for (const line of lines) {
      if (doc.y > 720) doc.addPage()

      switch (line.type) {
        case 'spacer':
          doc.moveDown(0.4)
          break
        case 'paragraph':
          doc
            .fontSize(11)
            .fillColor(DARK)
            .font('Helvetica')
            .text(clean(line.text), { width: 468 })
          doc.moveDown(0.5)
          break
        case 'subhead':
          doc.moveDown(0.3)
          doc
            .fontSize(12)
            .fillColor(DARK)
            .font('Helvetica-Bold')
            .text(clean(line.text), { width: 468 })
          doc.moveDown(0.3)
          break
        case 'bullet':
          doc
            .fontSize(11)
            .fillColor(DARK)
            .font('Helvetica')
            .text(`•  ${clean(line.text)}`, { width: 468, indent: 12 })
          doc.moveDown(0.3)
          break
        case 'numbered':
          doc
            .fontSize(11)
            .fillColor(DARK)
            .font('Helvetica')
            .text(clean(line.text), { width: 468, indent: 18 })
          doc.moveDown(0.3)
          break
        case 'checkbox':
          // Draw checkbox + text
          {
            const y = doc.y
            doc
              .lineWidth(1)
              .strokeColor(DARK)
              .rect(74, y + 2, 10, 10)
              .stroke()
            doc
              .fontSize(11)
              .fillColor(DARK)
              .font('Helvetica')
              .text(`   ${clean(line.text)}`, 86, y, { width: 454 })
            doc.moveDown(0.4)
          }
          break
        case 'fillable-line':
          {
            // Draw a fillable line
            doc.moveDown(0.3)
            const y = doc.y + 8
            doc
              .lineWidth(0.5)
              .strokeColor('#999999')
              .moveTo(72, y)
              .lineTo(540, y)
              .stroke()
            doc.moveDown(0.8)
          }
          break
        case 'quote':
          doc.moveDown(0.4)
          {
            // Don't add quote marks if source already has them
            let q = clean(line.text)
            if (!q.startsWith('"')) q = `"${q}"`
            doc
              .fontSize(11)
              .fillColor(LIGHT_GRAY)
              .font('Helvetica-Oblique')
              .text(q, { width: 468, indent: 12 })
          }
          doc.moveDown(0.4)
          break
      }
    }

    doc.moveDown(0.8)
  }

  // === Footer / commitment === (always on last page)
  if (doc.y > 600) doc.addPage()

  doc.moveDown(2)
  const footerY = doc.y

  // Bottom red bar
  doc
    .rect(0, 720, 612, 72)
    .fill(RED)
    .fontSize(10)
    .fillColor('#FFFFFF')
    .font('Helvetica-Bold')
    .text(
      'WHEN YOU FINISH, DROP IN THE COMMUNITY:',
      72,
      735,
      { width: 468, align: 'center' }
    )
    .fontSize(11)
    .font('Helvetica')
    .text('crazysimpleyoutube.com/community', 72, 753, {
      width: 468,
      align: 'center',
    })

  // Restore for body content
  doc.fillColor(DARK).font('Helvetica')

  // Above the bar: signature
  doc
    .fontSize(11)
    .fillColor(LIGHT_GRAY)
    .font('Helvetica-Oblique')
    .text('Keep it crazy simple.', 72, 660, { width: 468, align: 'center' })
  doc
    .font('Helvetica')
    .text('Aaron Cuha', 72, 678, { width: 468, align: 'center' })

  // Copyright
  doc
    .fontSize(8)
    .fillColor(LIGHT_GRAY)
    .text('© 2026 Coach Aaron Cuha. All rights reserved.', 72, 700, {
      width: 468,
      align: 'center',
    })

  doc.end()

  return new Promise((resolve) => {
    stream.on('finish', () => {
      const sz = fs.statSync(outPath).size
      resolve({ filename, sizeKB: Math.round(sz / 1024) })
    })
  })
}

async function main() {
  console.log(`Generating ${worksheets.length} worksheet PDFs...`)
  const results = []
  for (const ws of worksheets) {
    const r = await generateWorksheet(ws)
    results.push(r)
    console.log(`  ✓ ${r.filename} (${r.sizeKB} KB)`)
  }

  // Bundle all PDFs into one
  console.log('\nBuilding bundle PDF...')
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

  const bundleBytes = await bundle.save()
  const bundlePath = path.join(OUT_DIR, '..', 'csy-worksheets-bundle.pdf')
  fs.writeFileSync(bundlePath, bundleBytes)
  console.log(
    `  ✓ csy-worksheets-bundle.pdf (${Math.round(
      bundleBytes.length / 1024
    )} KB)`
  )
  console.log('\nDone.')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
