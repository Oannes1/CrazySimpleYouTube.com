/**
 * Generate the bundle PDF of all 24 prompts.
 * Reads from lib/prompts-data.ts (compiled by ts-node) — but to keep it simple,
 * we'll reuse the same source-of-truth markdown via a TS-free import.
 *
 * Output: public/pdfs/csy-prompts-bundle.pdf
 */
const fs = require('fs')
const path = require('path')
const PDFDocument = require('pdfkit')

const RED = '#C41230'
const DARK = '#1A1A2E'
const LIGHT_GRAY = '#666666'

// Parse prompts directly from the same source-of-truth markdown
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
const md = fs.readFileSync(SOURCE, 'utf8')

const blocks = md.split(/^## CHAPTER\s+/m).slice(1)

const prompts = blocks.map((block) => {
  const lines = block.split('\n')
  const headerLine = lines[0]
  const headerMatch = headerLine.match(/^(\d+):\s*(.+)$/)
  if (!headerMatch) return null

  const chapter = parseInt(headerMatch[1], 10)
  const title = headerMatch[2].trim()

  // Find YAML block (between ```yaml and ```)
  const yamlMatch = block.match(/```yaml\n([\s\S]*?)\n```/)
  const yaml = yamlMatch ? yamlMatch[1] : ''

  const setupMatch = yaml.match(/setup:\s*\|\s*\n([\s\S]*?)(?=\nclosing:|\n[a-z_]+:|$)/)
  const setup = setupMatch ? setupMatch[1].trim() : ''

  const closingMatch = yaml.match(/closing:\s*\|\s*\n([\s\S]*?)(?=\n[a-z_]+:|$)/)
  const closing = closingMatch ? closingMatch[1].trim() : ''

  const chapterTitleMatch = yaml.match(/chapter_title:\s*(.+)/)
  const chapterTitle = chapterTitleMatch ? chapterTitleMatch[1].trim() : ''

  const categoryMatch = yaml.match(/category:\s*(.+)/)
  const category = categoryMatch ? categoryMatch[1].trim() : ''

  // Find prompt block (after **Prompt:** header, between ``` and ```)
  const promptSplit = block.split(/\*\*Prompt:\*\*/)
  let promptText = ''
  if (promptSplit[1]) {
    const promptMatch = promptSplit[1].match(/```\n([\s\S]*?)\n```/)
    promptText = promptMatch ? promptMatch[1] : ''
  }

  return { chapter, title, chapterTitle, category, setup, closing, prompt: promptText }
}).filter(Boolean)

console.log(`Parsed ${prompts.length} prompts`)

const outPath = path.join(__dirname, '..', 'public', 'pdfs', 'csy-prompts-bundle.pdf')
const doc = new PDFDocument({
  size: 'LETTER',
  margins: { top: 72, bottom: 72, left: 72, right: 72 },
  info: {
    Title: 'Crazy Simple YouTube — All 24 AI Prompts',
    Author: 'Aaron Cuha',
    Subject: 'AI prompt library companion to Crazy Simple YouTube',
  },
})

const stream = fs.createWriteStream(outPath)
doc.pipe(stream)

// Cover
doc.rect(0, 0, 612, 130).fill(RED)
doc
  .fillColor('#FFFFFF')
  .font('Helvetica-Bold')
  .fontSize(13)
  .text('CRAZY SIMPLE YOUTUBE', 72, 35)
  .fontSize(28)
  .text('AI Prompt Library', 72, 60, { width: 468 })
doc
  .fontSize(11)
  .font('Helvetica')
  .text('All 24 prompts from the book', 72, 100)

doc.fillColor(DARK).font('Helvetica').fontSize(11)
doc.moveDown(8)
doc.text(
  `This is the complete prompt library from the book Crazy Simple YouTube. Built for ChatGPT, Claude, and Gemini. Copy, paste, replace the bracketed placeholders with your real info, and run.`,
  72,
  200,
  { width: 468 }
)
doc.moveDown(1)
doc.font('Helvetica-Oblique').fillColor(LIGHT_GRAY)
doc.text(
  `Aaron's preference: Claude for long-form strategy, ChatGPT for quick brainstorms, Gemini for research-heavy queries.`,
  { width: 468 }
)

// One prompt per page
for (const p of prompts) {
  doc.addPage()

  // Header bar
  doc.save().rect(0, 0, 612, 60).fill(RED)
  doc
    .fillColor('#FFFFFF')
    .font('Helvetica-Bold')
    .fontSize(10)
    .text(`PROMPT ${p.chapter} OF 24`, 72, 18)
    .fontSize(9)
    .font('Helvetica')
    .text(p.category.toUpperCase(), 72, 35)
    .restore()

  doc.moveDown(3.5)

  // Title
  doc.fillColor(DARK).font('Helvetica-Bold').fontSize(20)
  doc.text(p.title, 72, 90, { width: 468 })

  // From chapter
  if (p.chapterTitle) {
    doc.moveDown(0.3)
    doc.font('Helvetica-Oblique').fontSize(10).fillColor(LIGHT_GRAY)
    doc.text(`From Chapter ${p.chapter}: ${p.chapterTitle}`)
  }

  // Divider
  doc.moveDown(0.8)
  const dividerY = doc.y
  doc
    .moveTo(72, dividerY)
    .lineTo(540, dividerY)
    .lineWidth(1)
    .strokeColor(RED)
    .stroke()
  doc.moveDown(0.8)

  // Setup
  if (p.setup) {
    doc.font('Helvetica').fontSize(10).fillColor(LIGHT_GRAY)
    doc.text(p.setup, { width: 468 })
    doc.moveDown(0.8)
  }

  // Prompt block in a colored box
  if (p.prompt) {
    const startY = doc.y
    doc.font('Courier').fontSize(9).fillColor(DARK)
    doc.text(p.prompt, 82, startY + 12, { width: 448 })
    const endY = doc.y + 12
    doc
      .save()
      .roundedRect(72, startY, 468, endY - startY, 4)
      .lineWidth(0.5)
      .strokeColor('#CCCCCC')
      .fillAndStroke('#F8F8F8', '#CCCCCC')
      .restore()
    // Re-render text on top of box
    doc.font('Courier').fontSize(9).fillColor(DARK)
    doc.text(p.prompt, 82, startY + 12, { width: 448 })
    doc.moveDown(0.8)
  }

  // Closing
  if (p.closing) {
    doc.font('Helvetica-Oblique').fontSize(10).fillColor(LIGHT_GRAY)
    doc.text(p.closing, { width: 468 })
  }
}

// Final page
doc.addPage()
doc.rect(0, 0, 612, 100).fill(RED)
doc
  .fillColor('#FFFFFF')
  .font('Helvetica-Bold')
  .fontSize(20)
  .text('Keep going.', 72, 35, { width: 468 })

doc.moveDown(8)
doc.fillColor(DARK).font('Helvetica').fontSize(12)
doc.text(`Now apply them.`, 72, 200, { width: 468 })
doc.moveDown(1)
doc.text(`The prompts are tools. Your business is the work. The clients are out there, ready to find you. Hit record.`, { width: 468 })

doc.moveDown(3)
doc.fillColor(LIGHT_GRAY).font('Helvetica-Oblique')
doc.text('Keep it crazy simple.', { width: 468 })
doc.moveDown(0.3)
doc.font('Helvetica').text('Aaron Cuha')

doc.moveDown(3)
doc.fontSize(10)
doc.text('Worksheets to pair with each prompt: crazysimpleyoutube.com/worksheets')
doc.text('Want feedback in a community of builders? crazysimpleyoutube.com/community')

doc.moveDown(2)
doc.fontSize(8)
doc.text('© 2026 Coach Aaron Cuha. All rights reserved.')

doc.end()

stream.on('finish', () => {
  const sz = fs.statSync(outPath).size
  console.log(`✓ csy-prompts-bundle.pdf (${Math.round(sz / 1024)} KB) at ${outPath}`)
})
