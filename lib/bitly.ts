/**
 * Bitly helper for shortening + tracking affiliate links.
 *
 * Uses the v4 API. Token is server-side only.
 * Default group GUID is auto-discovered on first call and cached.
 */

const BITLY_API = 'https://api-ssl.bitly.com/v4'

export interface BitlyLinkResult {
  link: string
  long_url: string
  id: string
}

export async function shortenLink(longUrl: string): Promise<BitlyLinkResult | null> {
  const token = process.env.BITLY_ACCESS_TOKEN
  if (!token) {
    console.error('BITLY_ACCESS_TOKEN not configured')
    return null
  }

  try {
    const res = await fetch(`${BITLY_API}/shorten`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ long_url: longUrl }),
    })

    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      console.error('Bitly shorten error:', err)
      return null
    }

    const data = (await res.json()) as BitlyLinkResult
    return data
  } catch (e) {
    console.error('Bitly fetch error:', e)
    return null
  }
}

/**
 * Get aggregate click count for a Bitly link (server-side only).
 * The bitlinkId is the "link.id" returned from shortenLink (e.g., "bit.ly/abc123").
 */
export async function getClickCount(bitlinkId: string): Promise<number | null> {
  const token = process.env.BITLY_ACCESS_TOKEN
  if (!token) return null

  try {
    const res = await fetch(
      `${BITLY_API}/bitlinks/${encodeURIComponent(bitlinkId)}/clicks/summary`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    if (!res.ok) return null
    const data = await res.json()
    return data.total_clicks ?? 0
  } catch {
    return null
  }
}
