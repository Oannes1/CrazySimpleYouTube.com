/**
 * Amazon affiliate link helper.
 *
 * - If a product has an explicit `amazonUrl` (a /dp/ASIN URL),
 *   we append the associates tag to it.
 * - Otherwise, we generate an Amazon search URL with the brand+name
 *   and the associates tag attached for tracking.
 * - The associates tag comes from NEXT_PUBLIC_AMAZON_ASSOCIATES_TAG.
 */

const TAG = process.env.NEXT_PUBLIC_AMAZON_ASSOCIATES_TAG || ''

function appendTag(url: string): string {
  if (!TAG) return url
  try {
    const u = new URL(url)
    u.searchParams.set('tag', TAG)
    return u.toString()
  } catch {
    return url
  }
}

/**
 * Build an Amazon link for a given product.
 * If `amazonUrl` is provided, use that directly (with tag appended).
 * Otherwise, fallback to a search URL.
 */
export function amazonLink(opts: {
  amazonUrl?: string
  brand: string
  name: string
}): string {
  if (opts.amazonUrl && opts.amazonUrl.length > 0) {
    return appendTag(opts.amazonUrl)
  }
  // Fallback: search Amazon for "Brand Name"
  const query = encodeURIComponent(`${opts.brand} ${opts.name}`.trim())
  const base = `https://www.amazon.com/s?k=${query}`
  return appendTag(base)
}

export function hasAmazonTag(): boolean {
  return TAG.length > 0
}
