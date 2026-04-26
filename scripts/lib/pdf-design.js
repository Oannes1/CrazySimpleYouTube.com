/**
 * Shared design system for the CSY PDF templates.
 *
 * Editorial / magazine aesthetic. Massive Anton numerals as design
 * elements. Inter for body, Caveat for handwritten accents. Brand red
 * used sparingly for accent and structure. Generous whitespace.
 */
const path = require('path')

const FONTS_DIR = path.join(__dirname, '..', '..', 'fonts')

const FONTS = {
  Anton: path.join(FONTS_DIR, 'Anton-Regular.ttf'),
  Inter: path.join(FONTS_DIR, 'Inter-Variable.ttf'),
  Caveat: path.join(FONTS_DIR, 'Caveat-Variable.ttf'),
}

// Brand palette
const C = {
  red: '#C41230',
  redDark: '#931025',
  redTint: '#FBE9EC',
  charcoal: '#1A1A2E',
  charcoalSoft: '#3a3a4e',
  cream: '#FAF7EE',
  creamDeep: '#F2ECE0',
  ink: '#222230',
  body: '#3D3D4E',
  mid: '#6E6E80',
  light: '#B0B0BD',
  hairline: '#E2E2E8',
}

// Page geometry (US Letter)
const PAGE = {
  width: 612,
  height: 792,
  marginX: 60,
  marginTop: 56,
  marginBottom: 56,
  contentW: 612 - 60 * 2, // 492
}

function registerFonts(doc) {
  doc.registerFont('display', FONTS.Anton)
  doc.registerFont('body', FONTS.Inter)
  doc.registerFont('accent', FONTS.Caveat)
}

/**
 * Run decorative drawing isolated from the text cursor.
 * Saves graphics state + cursor, runs fn, then restores.
 */
function isolated(doc, fn) {
  const x = doc.x
  const y = doc.y
  doc.save()
  fn(doc)
  doc.restore()
  doc.x = x
  doc.y = y
}

/**
 * Draw a discreet running header on every page (skipped on cover).
 * Page 1 is treated as a cover and gets no running header.
 */
function drawRunningHeader(doc, opts) {
  const { eyebrow, title, isCover, pageNum } = opts
  if (isCover) return

  const y = PAGE.marginTop - 30
  // hairline divider
  doc
    .save()
    .moveTo(PAGE.marginX, y + 14)
    .lineTo(PAGE.width - PAGE.marginX, y + 14)
    .lineWidth(0.5)
    .strokeColor(C.hairline)
    .stroke()
    .restore()

  // Eyebrow tag (left): tiny red caps
  doc
    .font('body')
    .fontSize(8)
    .fillColor(C.red)
    .text(eyebrow.toUpperCase(), PAGE.marginX, y, {
      width: PAGE.contentW,
      align: 'left',
      characterSpacing: 1.6,
      lineBreak: false,
    })

  // Title (centered): Anton small caps
  doc
    .font('display')
    .fontSize(10)
    .fillColor(C.charcoal)
    .text(title.toUpperCase(), PAGE.marginX, y, {
      width: PAGE.contentW,
      align: 'center',
      characterSpacing: 0.8,
      lineBreak: false,
    })

  // Page number (right)
  doc
    .font('body')
    .fontSize(8)
    .fillColor(C.mid)
    .text(`PAGE ${pageNum}`, PAGE.marginX, y, {
      width: PAGE.contentW,
      align: 'right',
      characterSpacing: 1.6,
      lineBreak: false,
    })
}

/**
 * Discreet running footer on every page (including cover).
 * Brand mark + URL.
 */
function drawRunningFooter(doc) {
  const y = PAGE.height - 36
  // hairline above
  doc
    .save()
    .moveTo(PAGE.marginX, y - 4)
    .lineTo(PAGE.width - PAGE.marginX, y - 4)
    .lineWidth(0.5)
    .strokeColor(C.hairline)
    .stroke()
    .restore()

  doc
    .font('display')
    .fontSize(11)
    .fillColor(C.charcoal)
    .text('CRAZY SIMPLE YOUTUBE', PAGE.marginX, y, {
      width: PAGE.contentW,
      align: 'left',
      characterSpacing: 1.2,
      lineBreak: false,
    })

  doc
    .font('body')
    .fontSize(8)
    .fillColor(C.mid)
    .text('CRAZYSIMPLEYOUTUBE.COM', PAGE.marginX, y + 1, {
      width: PAGE.contentW,
      align: 'right',
      characterSpacing: 1.6,
      lineBreak: false,
    })
}

/**
 * Apply running header + footer to every page after content is written.
 * `meta` is the per-document metadata (eyebrow, title).
 */
function applyChrome(doc, meta) {
  const range = doc.bufferedPageRange()
  const total = range.count
  for (let i = range.start; i < range.start + total; i++) {
    doc.switchToPage(i)
    isolated(doc, () => {
      drawRunningHeader(doc, {
        eyebrow: meta.eyebrow,
        title: meta.title,
        isCover: i === 0,
        pageNum: i + 1,
      })
    })
    isolated(doc, () => drawRunningFooter(doc))
  }
  return total
}

/**
 * Closing block: red gradient panel with handwritten Caveat callout
 * + community URL. Used at end of body content.
 */
function drawCommunityCTA(doc) {
  const CTA_HEIGHT = 100
  const SPACING = 24
  const pageBottom = PAGE.height - PAGE.marginBottom - 28
  if (doc.y + SPACING + CTA_HEIGHT > pageBottom) {
    doc.addPage()
    doc.y = PAGE.marginTop + 28
  } else {
    doc.moveDown(1.5)
  }

  const y = doc.y
  // Background tinted block
  doc
    .save()
    .rect(PAGE.marginX, y, PAGE.contentW, CTA_HEIGHT)
    .fill(C.charcoal)
    .restore()

  // Left red accent bar
  doc
    .save()
    .rect(PAGE.marginX, y, 4, CTA_HEIGHT)
    .fill(C.red)
    .restore()

  // Handwritten flourish
  doc
    .save()
    .font('accent')
    .fontSize(20)
    .fillColor('#FFFFFF')
    .opacity(0.65)
    .text('p.s.', PAGE.marginX + 22, y + 16, { width: 60, lineBreak: false })
    .opacity(1)
    .restore()

  // Headline
  doc
    .save()
    .font('display')
    .fontSize(20)
    .fillColor('#FFFFFF')
    .text('YOU FINISHED THIS.', PAGE.marginX + 22, y + 38, {
      width: PAGE.contentW - 32,
      characterSpacing: 0.4,
      lineBreak: false,
    })
    .restore()

  // Body line
  doc
    .save()
    .font('body')
    .fontSize(10)
    .fillColor('rgba(255,255,255,0.65)')
    .text(
      'Drop a win in the community. Get feedback from people doing the same work.',
      PAGE.marginX + 22,
      y + 62,
      { width: PAGE.contentW - 32, height: 14, ellipsis: true }
    )
    .restore()

  // URL
  const urlY = y + 80
  doc
    .save()
    .font('display')
    .fontSize(11)
    .fillColor(C.red)
    .text('CRAZYSIMPLEYOUTUBE.COM/COMMUNITY', PAGE.marginX + 22, urlY, {
      width: PAGE.contentW - 32,
      characterSpacing: 1.2,
      lineBreak: false,
    })
    .restore()

  // Critical: move cursor PAST the CTA so any subsequent draws happen below
  doc.y = y + CTA_HEIGHT + 10
  doc.x = PAGE.marginX
}

module.exports = {
  C,
  PAGE,
  FONTS,
  registerFonts,
  isolated,
  drawRunningHeader,
  drawRunningFooter,
  applyChrome,
  drawCommunityCTA,
}
