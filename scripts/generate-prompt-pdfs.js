/**
 * Generate 24 individual prompt PDFs (one per prompt) plus a bundle.
 *
 * Reads PROMPTS_LIBRARY.md directly (single source of truth, same as
 * lib/prompts-data.ts).
 *
 * Outputs:
 *   public/pdfs/prompts/[slug].pdf  (24 individual)
 *   public/pdfs/csy-prompts-bundle.pdf  (all 24 in one)
 */
const fs = require('fs')
const path = require('path')
const PDFDocument = require('pdfkit')
const { PDFDocument: PDFLibDocument } = require('pdf-lib')

const SOURCE = path.join(
  __dirname,
  '..',
  'Trailing Documents',
  'CSY Trailing Inst',
  'extracted',
  'crazy-simple-youtube-site-build',
  'content',
  'PROMPTS_LIBRARY.md'
)

const OUT_DIR = path.join(__dirname, '..', 'public', 'pdfs', 'prompts')
const BUNDLE_PATH = path.join(__dirname, '..', 'public', 'pdfs', 'csy-prompts-bundle.pdf')

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true })

const RED = '#C41230'
const DARK = '#1A1A2E'
const MID = '#666666'
const LIGHT_BG = '#F8F8F8'

const PAGE_W = 612
const PAGE_H = 792
const MARGIN_X = 72
const MARGIN_TOP = 110
const MARGIN_BOTTOM = 96
const CONTENT_W = PAGE_W - MARGIN_X * 2

// === Parse PROMPTS_LIBRARY.md ===
const md = fs.readFileSync(SOURCE, 'utf8')
const blocks = md.split(/^## CHAPTER\s+/m).slice(1)

const prompts = blocks
  .map((block) => {
    const lines = block.split('\n')
    const headerMatch = lines[0].match(/^(\d+):\s*(.+)$/)
    if (!headerMatch) return null
    const chapter = parseInt(headerMatch[1], 10)
    const titleFromHeader = headerMatch[2].trim()

    const yamlMatch = block.match(/```yaml\n([\s\S]*?)\n```/)
    const yaml = yamlMatch ? yamlMatch[1] : ''

    function yamlField(field) {
      const re = new RegExp(`^${field}:\\s*(.+)$`, 'm')
      const m = yaml.match(re)
      return m ? m[1].trim() : ''
    }

    function yamlBlock(field) {
      const re = new RegExp(`${field}:\\s*\\|\\s*\\n([\\s\\S]*?)(?=\\n[a-z_]+:|$)`, 'm')
      const m = yaml.match(re)
      return m ? m[1].trim() : ''
    }

    const slug = yamlField('slug') || `chapter-${chapter}`
    const title = yamlField('title') || titleFromHeader
    const chapterTitle = yamlField('chapter_title')
    const category = yamlField('category')
    const setup = yamlBlock('setup')
    const closing = yamlBlock('closing')

    // Prompt body — everything inside the **Prompt:** code block
    const ps = block.split(/\*\*Prompt:\*\*/)
    let promptText = ''
    if (ps[1]) {
      const m = ps[1].match(/```\n([\s\S]*?)\n```/)
      promptText = m ? m[1] : ''
    }

    return { slug, chapter, title, chapterTitle, category, setup, closing, prompt: promptText }
  })
  .filter(Boolean)

console.log(`Parsed ${prompts.length} prompts`)

// === Drawing helpers ===
function drawHeader(doc, p) {
  doc.save().rect(0, 0, PAGE_W, 56).fill(RED).restore()
  doc
    .fillColor('#FFFFFF')
    .font('Helvetica-Bold')
    .fontSize(11)
    .text(`PROMPT ${p.chapter} OF 24`, MARGIN_X, 16)
    .fontSize(9)
    .font('Helvetica')
    .text(p.category.toUpperCase(), MARGIN_X, 33)
  doc
    .font('Helvetica-Bold')
    .fontSize(11)
    .text('CRAZYSIMPLEYOUTUBE.COM/PROMPTS', MARGIN_X, 24, {
      width: CONTENT_W,
      align: 'right',
    })
}

function drawFooter(doc, n, total) {
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
    .text(`Page ${n} of ${total}`, MARGIN_X, y + 13, {
      width: CONTENT_W,
      align: 'right',
    })
}

// === Render the body of a prompt at the current cursor position ===
function renderPromptBody(doc, p) {
  // Title
  doc
    .fillColor(DARK)
    .font('Helvetica-Bold')
    .fontSize(26)
    .text(p.title, MARGIN_X, doc.y, { width: CONTENT_W })
  doc.moveDown(0.3)

  // Chapter source
  if (p.chapterTitle) {
    doc
      .font('Helvetica-Oblique')
      .fontSize(11)
      .fillColor(MID)
      .text(`From Chapter ${p.chapter}: ${p.chapterTitle}`)
    doc.moveDown(0.5)
  }

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

  // Setup intro
  if (p.setup) {
    doc
      .font('Helvetica-Bold')
      .fontSize(10)
      .fillColor(RED)
      .text('WHY THIS MATTERS', { width: CONTENT_W })
    doc.moveDown(0.3)
    doc
      .font('Helvetica')
      .fontSize(11)
      .fillColor(DARK)
      .text(p.setup, { width: CONTENT_W })
    doc.moveDown(1)
  }

  // Prompt header
  doc
    .font('Helvetica-Bold')
    .fontSize(10)
    .fillColor(RED)
    .text('THE PROMPT', { width: CONTENT_W })
  doc.moveDown(0.3)

  // Prompt body inside a tinted box
  if (p.prompt) {
    const boxX = MARGIN_X
    const startY = doc.y
    const padY = 16
    const padX = 18

    // Render text first to measure height
    doc
      .font('Courier')
      .fontSize(10)
      .fillColor(DARK)
      .text(p.prompt, boxX + padX, startY + padY, {
        width: CONTENT_W - padX * 2,
      })
    const endY = doc.y + padY

    // Draw the box behind the text. PDF order matters: we have to
    // re-render text on top after drawing the rect.
    // Workaround: clip the rect to NOT cover text by drawing rect first
    // on a separate path... Actually easier: erase, draw rect, redraw text.
    // Instead, just leave the text on top of nothing and draw a thin border.
    doc
      .save()
      .lineWidth(1)
      .strokeColor('#D4D4D4')
      .roundedRect(boxX, startY, CONTENT_W, endY - startY, 6)
      .stroke()
      .restore()
    doc.moveDown(0.6)
  }

  // How to use
  doc.moveDown(0.4)
  doc
    .font('Helvetica-Bold')
    .fontSize(10)
    .fillColor(RED)
    .text('HOW TO USE', { width: CONTENT_W })
  doc.moveDown(0.3)
  const howToLines = [
    'Copy the entire prompt above.',
    'Paste into ChatGPT, Claude, or Gemini.',
    'Replace bracketed placeholders (like [YOUR PROFESSION]) with your real info.',
    'Run it. Read the output. Tweak as needed.',
  ]
  for (const line of howToLines) {
    const y0 = doc.y
    doc
      .font('Helvetica-Bold')
      .fontSize(11)
      .fillColor(RED)
      .text('•', MARGIN_X, y0, { width: 12 })
    doc
      .font('Helvetica')
      .fontSize(11)
      .fillColor(DARK)
      .text(line, MARGIN_X + 16, y0, { width: CONTENT_W - 16 })
    doc.x = MARGIN_X
    doc.moveDown(0.2)
  }

  // Closing note
  if (p.closing) {
    doc.moveDown(0.6)
    const sY = doc.y
    doc
      .font('Helvetica-Oblique')
      .fontSize(11)
      .fillColor(MID)
      .text(p.closing, MARGIN_X + 14, sY, { width: CONTENT_W - 14 })
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
  }

  // Closing CTA
  doc.moveDown(1)
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
    .text('WANT THE OTHER 23?', MARGIN_X + 18, ctaY + 14, {
      width: CONTENT_W - 36,
    })
  doc
    .fillColor(DARK)
    .font('Helvetica')
    .fontSize(11)
    .text(
      'All 24 AI prompts from the book, free, copy-paste ready:',
      MARGIN_X + 18,
      ctaY + 35,
      { width: CONTENT_W - 36 }
    )
  doc
    .fillColor(RED)
    .font('Helvetica-Bold')
    .fontSize(12)
    .text('crazysimpleyoutube.com/prompts', MARGIN_X + 18, ctaY + 56, {
      width: CONTENT_W - 36,
    })
}

async function generateOnePrompt(p) {
  const filename = `${p.slug}.pdf`
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
      Title: `${p.title} | AI Prompt | Crazy Simple YouTube`,
      Author: 'Aaron Cuha',
      Subject: 'AI prompt from Crazy Simple YouTube',
      Keywords: `youtube, ai prompt, ${p.category.toLowerCase()}`,
    },
    bufferPages: true,
  })

  const stream = fs.createWriteStream(outPath)
  doc.pipe(stream)

  doc.x = MARGIN_X
  doc.y = MARGIN_TOP

  renderPromptBody(doc, p)

  // Header + footer on every page
  const range = doc.bufferedPageRange()
  const total = range.count
  for (let i = range.start; i < range.start + total; i++) {
    doc.switchToPage(i)
    drawHeader(doc, p)
    drawFooter(doc, i + 1, total)
  }

  doc.end()

  return new Promise((resolve) => {
    stream.on('finish', () => {
      const sz = fs.statSync(outPath).size
      resolve({ slug: p.slug, sizeKB: Math.round(sz / 1024), pages: total })
    })
  })
}

async function main() {
  console.log('Generating individual prompt PDFs...')
  const results = []
  for (const p of prompts) {
    const r = await generateOnePrompt(p)
    results.push(r)
    console.log(`  ✓ ${r.slug}.pdf (${r.pages}pp, ${r.sizeKB} KB)`)
  }

  // Bundle: stitch all 24 individual PDFs into one master file
  console.log('\nBuilding bundle PDF...')
  const bundle = await PDFLibDocument.create()
  bundle.setTitle('Crazy Simple YouTube — All 24 AI Prompts')
  bundle.setAuthor('Aaron Cuha')
  bundle.setSubject('Companion AI prompts to Crazy Simple YouTube')

  for (const r of results) {
    const buf = fs.readFileSync(path.join(OUT_DIR, `${r.slug}.pdf`))
    const src = await PDFLibDocument.load(buf)
    const pages = await bundle.copyPages(src, src.getPageIndices())
    pages.forEach((page) => bundle.addPage(page))
  }
  fs.writeFileSync(BUNDLE_PATH, await bundle.save())
  const sz = fs.statSync(BUNDLE_PATH).size
  console.log(`  ✓ csy-prompts-bundle.pdf (${Math.round(sz / 1024)} KB)`)

  console.log(`\nDone. ${results.length} individual + 1 bundle.`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
