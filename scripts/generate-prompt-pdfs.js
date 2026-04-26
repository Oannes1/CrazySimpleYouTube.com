/**
 * Generate 24 individual prompt PDFs + bundle.
 * Editorial design with embedded fonts (Anton/Inter/Caveat).
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

    const f = (field) => {
      const m = yaml.match(new RegExp(`^${field}:\\s*(.+)$`, 'm'))
      return m ? m[1].trim() : ''
    }
    const fb = (field) => {
      const m = yaml.match(new RegExp(`${field}:\\s*\\|\\s*\\n([\\s\\S]*?)(?=\\n[a-z_]+:|$)`, 'm'))
      return m ? m[1].trim() : ''
    }

    const slug = f('slug') || `chapter-${chapter}`
    const title = f('title') || titleFromHeader
    const chapterTitle = f('chapter_title')
    const category = f('category')
    const setup = fb('setup')
    const closing = fb('closing')

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

async function trimTrailing(rawBytes, contentPageCount) {
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

// === COVER ===
function drawCover(doc, p) {
  isolated(doc, () => {
    // Cream background top
    doc.rect(0, 0, PAGE.width, PAGE.height - 56).fill(C.cream)

    // Massive Anton chapter number — design element
    const numStr = String(p.chapter).padStart(2, '0')
    doc
      .font('display')
      .fontSize(360)
      .fillColor(C.red)
      .fillOpacity(0.13)
      .text(numStr, -20, 60, {
        width: 600,
        align: 'left',
        lineBreak: false,
        height: 400,
      })
      .fillOpacity(1)

    // Eyebrow
    doc
      .font('body')
      .fontSize(9)
      .fillColor(C.red)
      .text(`${p.category.toUpperCase()}  ·  AI PROMPT  ·  ${p.chapter} OF 24`, PAGE.marginX, 100, {
        width: PAGE.contentW,
        characterSpacing: 1.8,
        lineBreak: false,
      })

    doc
      .font('display')
      .fontSize(13)
      .fillColor(C.charcoal)
      .text(`PROMPT ${String(p.chapter).padStart(2, '0')}`, PAGE.marginX, 118, {
        width: PAGE.contentW,
        characterSpacing: 0.8,
        lineBreak: false,
      })

    // Source chapter (ABOVE the title for prompts — gives title room to wrap)
    if (p.chapterTitle) {
      doc
        .font('body')
        .fontSize(9)
        .fillColor(C.mid)
        .text('FROM CHAPTER', PAGE.marginX, 250, {
          width: PAGE.contentW,
          characterSpacing: 1.6,
          lineBreak: false,
        })
      doc
        .font('display')
        .fontSize(14)
        .fillColor(C.charcoal)
        .text(`${p.chapter}: ${p.chapterTitle}`, PAGE.marginX, 264, {
          width: PAGE.contentW,
          characterSpacing: 0.4,
          height: 22,
          ellipsis: true,
          lineBreak: false,
        })
    }

    // Title (allow 1-3 lines, scale with length)
    const titleFontSize = p.title.length > 32 ? 42 : 50
    doc
      .font('display')
      .fontSize(titleFontSize)
      .fillColor(C.charcoal)
      .text(p.title.toUpperCase(), PAGE.marginX, 300, {
        width: PAGE.contentW,
        lineGap: -4,
        characterSpacing: -0.5,
        height: 200,
      })

    // Red bar (anchored to bottom area, not relative to title)
    doc.rect(PAGE.marginX, 530, 64, 4).fill(C.red)

    // Bottom dark panel
    const panelY = PAGE.height - 56 - 90
    doc.rect(0, panelY, PAGE.width, 90).fill(C.charcoal)

    doc
      .font('accent')
      .fontSize(28)
      .fillColor(C.red)
      .fillOpacity(0.85)
      .text('a prompt', PAGE.marginX, panelY + 18, { width: 200, lineBreak: false })
      .fillOpacity(1)

    doc
      .font('body')
      .fontSize(9)
      .fillColor('rgba(255,255,255,0.5)')
      .text('FROM', PAGE.marginX, panelY + 18, {
        width: PAGE.contentW, align: 'right', characterSpacing: 1.6, lineBreak: false,
      })
    doc
      .font('display')
      .fontSize(14)
      .fillColor('#FFFFFF')
      .text('CRAZY SIMPLE YOUTUBE', PAGE.marginX, panelY + 32, {
        width: PAGE.contentW, align: 'right', characterSpacing: 0.8, lineBreak: false,
      })
    doc
      .font('body')
      .fontSize(9)
      .fillColor('rgba(255,255,255,0.5)')
      .text('BY AARON CUHA', PAGE.marginX, panelY + 52, {
        width: PAGE.contentW, align: 'right', characterSpacing: 1.6, lineBreak: false,
      })
  })
}

// === BODY ===
function drawSectionHeader(doc, num, label, isFirst) {
  if (!isFirst) {
    if (doc.y > PAGE.height - PAGE.marginBottom - 200) {
      doc.addPage()
      doc.y = PAGE.marginTop + 28
    } else {
      doc.moveDown(1.4)
    }
  }
  const startY = doc.y

  isolated(doc, () => {
    doc
      .font('display')
      .fontSize(56)
      .fillColor(C.red)
      .text(String(num).padStart(2, '0'), PAGE.marginX, startY, {
        width: 80, lineBreak: false, height: 70,
      })
  })
  isolated(doc, () => {
    doc
      .font('display')
      .fontSize(13)
      .fillColor(C.mid)
      .text('STEP', PAGE.marginX + 80, startY + 6, {
        width: PAGE.contentW - 80, characterSpacing: 1.8, lineBreak: false, height: 14,
      })
  })
  isolated(doc, () => {
    doc
      .font('display')
      .fontSize(20)
      .fillColor(C.charcoal)
      .text(label.toUpperCase(), PAGE.marginX + 80, startY + 24, {
        width: PAGE.contentW - 80, characterSpacing: -0.2, height: 50, ellipsis: true,
      })
  })

  doc.x = PAGE.marginX
  doc.y = startY + 80

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

function drawPromptBox(doc, promptText) {
  // Reserve space and draw box first
  const boxX = PAGE.marginX
  const boxY = doc.y
  const padX = 18
  const padY = 16

  // Render text once to measure size, then draw box, then re-render text on top
  doc
    .font('body')
    .fontSize(10.5)
    .fillColor(C.charcoal)
    .text(promptText, boxX + padX, boxY + padY, {
      width: PAGE.contentW - padX * 2,
      lineGap: 4,
    })

  const endY = doc.y + padY

  // Now draw the box behind (using a saved layer)
  isolated(doc, () => {
    doc
      .roundedRect(boxX, boxY, PAGE.contentW, endY - boxY, 8)
      .fillColor(C.creamDeep)
      .fillOpacity(0.4)
      .fill()
      .fillOpacity(1)

    // Left red accent
    doc
      .rect(boxX, boxY, 4, endY - boxY)
      .fill(C.red)
  })

  // Re-render text on top so box doesn't cover it
  doc
    .font('body')
    .fontSize(10.5)
    .fillColor(C.charcoal)
    .text(promptText, boxX + padX, boxY + padY, {
      width: PAGE.contentW - padX * 2,
      lineGap: 4,
    })

  doc.x = PAGE.marginX
  doc.y = endY + 8
}

async function generateOnePrompt(p) {
  const filename = `${p.slug}.pdf`
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
      Title: `${p.title} — AI Prompt — Crazy Simple YouTube`,
      Author: 'Aaron Cuha',
      Subject: 'AI prompt from Crazy Simple YouTube',
      Keywords: `youtube, ai prompt, ${p.category.toLowerCase()}`,
    },
    bufferPages: true,
    autoFirstPage: false,
  })
  registerFonts(doc)

  const stream = fs.createWriteStream(outPath)
  doc.pipe(stream)

  // Cover
  doc.addPage()
  drawCover(doc, p)

  // Body page
  doc.addPage()
  doc.x = PAGE.marginX
  doc.y = PAGE.marginTop + 28

  // Section 1: Why this matters (the setup)
  if (p.setup) {
    drawSectionHeader(doc, 1, 'Why this matters', true)
    doc
      .font('body')
      .fontSize(11.5)
      .fillColor(C.body)
      .text(p.setup, { width: PAGE.contentW, lineGap: 5 })
  }

  // Section 2: The prompt
  drawSectionHeader(doc, 2, 'The prompt', !p.setup)
  drawPromptBox(doc, p.prompt)

  // Section 3: How to use
  drawSectionHeader(doc, 3, 'How to use', false)
  const howTo = [
    'Copy the entire prompt above.',
    'Paste into ChatGPT, Claude, or Gemini.',
    'Replace the bracketed placeholders with your real info.',
    'Run it. Read the output. Iterate as needed.',
  ]
  for (const h of howTo) {
    const startY = doc.y
    isolated(doc, () => {
      doc
        .font('display')
        .fontSize(11)
        .fillColor(C.red)
        .text('—', PAGE.marginX, startY + 1, { width: 16, lineBreak: false, height: 14 })
    })
    doc
      .font('body')
      .fontSize(11)
      .fillColor(C.body)
      .text(h, PAGE.marginX + 20, startY, { width: PAGE.contentW - 20, lineGap: 4 })
    doc.x = PAGE.marginX
    doc.moveDown(0.3)
  }

  // Section 4: Closing note (if any)
  if (p.closing) {
    drawSectionHeader(doc, 4, "Aaron's note", false)
    const startY = doc.y
    isolated(doc, () => {
      doc
        .font('display')
        .fontSize(64)
        .fillColor(C.red)
        .fillOpacity(0.4)
        .text("'", PAGE.marginX - 4, startY - 14, {
          width: 40, lineBreak: false, height: 50,
        })
        .fillOpacity(1)
    })
    doc
      .font('body')
      .fontSize(13)
      .fillColor(C.charcoal)
      .text(p.closing, PAGE.marginX + 36, startY, {
        width: PAGE.contentW - 46,
        lineGap: 4,
        oblique: 8,
      })
    doc.x = PAGE.marginX
    doc.moveDown(0.6)
  }

  // CTA
  if (doc.y + 24 + 100 > PAGE.height - PAGE.marginBottom - 28) {
    doc.addPage()
    doc.y = PAGE.marginTop + 28
  } else {
    doc.moveDown(1.5)
  }
  const ctaY = doc.y
  isolated(doc, () => {
    doc.rect(PAGE.marginX, ctaY, PAGE.contentW, 100).fill(C.charcoal)
    doc.rect(PAGE.marginX, ctaY, 4, 100).fill(C.red)
    doc
      .font('accent')
      .fontSize(20)
      .fillColor('#FFFFFF')
      .fillOpacity(0.65)
      .text('want them all?', PAGE.marginX + 22, ctaY + 16, {
        width: 200, lineBreak: false, height: 24,
      })
      .fillOpacity(1)
    doc
      .font('display')
      .fontSize(20)
      .fillColor('#FFFFFF')
      .text('GET ALL 24 PROMPTS, FREE.', PAGE.marginX + 22, ctaY + 38, {
        width: PAGE.contentW - 32, characterSpacing: 0.4, lineBreak: false, height: 22,
      })
    doc
      .font('body')
      .fontSize(10)
      .fillColor('rgba(255,255,255,0.65)')
      .text('Every AI prompt from the book, copy-paste ready.', PAGE.marginX + 22, ctaY + 62, {
        width: PAGE.contentW - 32, lineBreak: false, height: 14,
      })
    doc
      .font('display')
      .fontSize(11)
      .fillColor(C.red)
      .text('CRAZYSIMPLEYOUTUBE.COM/PROMPTS', PAGE.marginX + 22, ctaY + 80, {
        width: PAGE.contentW - 32, characterSpacing: 1.2, lineBreak: false, height: 14,
      })
  })
  doc.y = ctaY + 110
  doc.x = PAGE.marginX

  // Snapshot real page count and apply chrome inline
  const range = doc.bufferedPageRange()
  const realCount = range.count
  for (let i = range.start; i < range.start + realCount; i++) {
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
          .font('body').fontSize(8).fillColor(C.red)
          .text(`PROMPT ${p.chapter} OF 24`, PAGE.marginX, y, {
            width: PAGE.contentW, align: 'left', characterSpacing: 1.6, lineBreak: false,
          })
        doc
          .font('display').fontSize(10).fillColor(C.charcoal)
          .text(p.title.toUpperCase(), PAGE.marginX, y, {
            width: PAGE.contentW, align: 'center', characterSpacing: 0.8, lineBreak: false,
          })
        doc
          .font('body').fontSize(8).fillColor(C.mid)
          .text(`PAGE ${i + 1}`, PAGE.marginX, y, {
            width: PAGE.contentW, align: 'right', characterSpacing: 1.6, lineBreak: false,
          })
      }
      const fy = PAGE.height - 36
      doc
        .moveTo(PAGE.marginX, fy - 4)
        .lineTo(PAGE.width - PAGE.marginX, fy - 4)
        .lineWidth(0.5)
        .strokeColor(C.hairline)
        .stroke()
      doc
        .font('display').fontSize(11).fillColor(C.charcoal)
        .text('CRAZY SIMPLE YOUTUBE', PAGE.marginX, fy, {
          width: PAGE.contentW, align: 'left', characterSpacing: 1.2, lineBreak: false,
        })
      doc
        .font('body').fontSize(8).fillColor(C.mid)
        .text('CRAZYSIMPLEYOUTUBE.COM/PROMPTS', PAGE.marginX, fy + 1, {
          width: PAGE.contentW, align: 'right', characterSpacing: 1.6, lineBreak: false,
        })
    })
  }

  doc.end()

  return new Promise((resolve) => {
    stream.on('finish', async () => {
      try {
        const raw = fs.readFileSync(outPath)
        const trimmed = await trimTrailing(raw, realCount)
        if (trimmed.length !== raw.length) fs.writeFileSync(outPath, trimmed)
      } catch {}
      const sz = fs.statSync(outPath).size
      resolve({ slug: p.slug, sizeKB: Math.round(sz / 1024) })
    })
  })
}

async function main() {
  console.log('Generating individual prompt PDFs (editorial design)...')
  const results = []
  for (const p of prompts) {
    const r = await generateOnePrompt(p)
    results.push(r)
    console.log(`  ✓ ${r.slug}.pdf (${r.sizeKB} KB)`)
  }

  // Bundle
  console.log('\nBuilding prompts bundle PDF...')
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
