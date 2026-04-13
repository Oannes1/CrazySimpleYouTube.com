import { NextRequest, NextResponse } from 'next/server'

const BREVO_API_KEY = process.env.BREVO_API_KEY
const COMPANION_KIT_LIST_ID = 21

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, firstName } = body

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      )
    }

    if (!BREVO_API_KEY) {
      console.error('BREVO_API_KEY not configured')
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    // Add/update contact in Brevo and assign to Companion Kit list
    const brevoResponse = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'api-key': BREVO_API_KEY,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        email,
        attributes: {
          FIRSTNAME: firstName || '',
        },
        listIds: [COMPANION_KIT_LIST_ID],
        updateEnabled: true,
      }),
    })

    if (!brevoResponse.ok) {
      const errorData = await brevoResponse.json().catch(() => ({}))
      // "Contact already exists" is fine — they're being added to the list
      if (errorData.code === 'duplicate_parameter') {
        // Contact exists, add them to the list
        await fetch(
          `https://api.brevo.com/v3/contacts/lists/${COMPANION_KIT_LIST_ID}/contacts/add`,
          {
            method: 'POST',
            headers: {
              'api-key': BREVO_API_KEY,
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify({ emails: [email] }),
          }
        )
      } else {
        console.error('Brevo API error:', errorData)
        return NextResponse.json(
          { error: 'Failed to subscribe' },
          { status: 500 }
        )
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Subscribe error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
