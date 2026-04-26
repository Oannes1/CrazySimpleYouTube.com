/**
 * Parse WORKSHEETS_LIBRARY.md into a structured JSON file we can use
 * to generate the PDFs.
 *
 * Output: scripts/worksheets-content.json
 */
const fs = require('fs')
const path = require('path')

const SOURCE = path.join(
  __dirname,
  '..',
  'Trailing Documents',
  'CSY Trailing Inst',
  'extracted',
  'crazy-simple-youtube-site-build',
  'content',
  'WORKSHEETS_LIBRARY.md'
)

const md = fs.readFileSync(SOURCE, 'utf8')

// Each worksheet starts with "## CH N:" or "## Ch N:"
const blocks = md.split(/^## CH\s+/m).slice(1)

const worksheets = blocks.map((block) => {
  // First line: "1: Calculate Your YouTube Hourly Rate"
  const firstNewline = block.indexOf('\n')
  const header = block.slice(0, firstNewline).trim()
  const body = block.slice(firstNewline + 1)

  const headerMatch = header.match(/^(\d+):\s*(.+)$/)
  if (!headerMatch) return null
  const chapter = parseInt(headerMatch[1], 10)
  const title = headerMatch[2].trim()

  // Status line
  const statusMatch = body.match(/\*\*Status:\*\*\s*(\w+)/)
  const status = statusMatch ? statusMatch[1] : 'CONVERT'

  // Time line
  const timeMatch = body.match(/\*\*Time:\*\*\s*(.+)/)
  const time = timeMatch ? timeMatch[1].trim() : ''

  // Case study person
  const personMatch = body.match(/\*\*Case study person:\*\*\s*(.+)/)
  const fullPerson = personMatch ? personMatch[1].trim() : ''
  // First name only (intake brand rules)
  const personFirstName = fullPerson === 'N/A' || fullPerson === ''
    ? ''
    : fullPerson.split(/[\s(]/)[0]

  // Sections: "### Part N: Title" or "### Section: Title"
  const sectionsRaw = body.split(/^###\s+/m).slice(1)
  const sections = sectionsRaw.map((s) => {
    const nl = s.indexOf('\n')
    const sHeader = s.slice(0, nl).trim()
    const sBody = s.slice(nl + 1).trim()

    // Strip the next worksheet's "---" separator if present
    const cleanBody = sBody.split(/^---\s*$/m)[0].trim()

    return {
      header: sHeader,
      body: cleanBody,
    }
  })

  return {
    chapter,
    title,
    status,
    time,
    person: personFirstName,
    sections,
  }
}).filter(Boolean)

const out = path.join(__dirname, 'worksheets-content.json')
fs.writeFileSync(out, JSON.stringify(worksheets, null, 2))
console.log(`Parsed ${worksheets.length} worksheets to ${out}`)
console.log('Sample:')
console.log(`  Ch 1: ${worksheets[0].title} (${worksheets[0].time}, ${worksheets[0].sections.length} sections)`)
console.log(`  Ch 24: ${worksheets[23].title} (${worksheets[23].time}, ${worksheets[23].sections.length} sections)`)
