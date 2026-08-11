import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { durableRateLimit, rateLimitKey } from '@/lib/rate-limit'
import { reportError } from '@/lib/error-monitoring'
import { getServiceSupabase } from '@/lib/server-portal'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: Request) {
  try {
    const limited = await durableRateLimit(rateLimitKey(request, 'newsletter'), 5, 60_000)
    if (!limited.ok) {
      return NextResponse.json({ error: 'Too many newsletter requests. Please try again shortly.' }, { status: 429 })
    }

    const body = await request.json().catch(() => null)
    const email = String(body?.email || '').trim().toLowerCase()

    if (!emailPattern.test(email)) {
      return NextResponse.json({ error: 'Enter a valid email address.' }, { status: 400 })
    }

    const supabase = getServiceSupabase()
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .upsert({ email, source: 'footer', status: 'subscribed' }, { onConflict: 'email' })
      .select('id')
      .single()

    if (error || !data) {
      if (error) reportError(error, { route: '/api/newsletter', operation: 'upsert_subscriber' })
      return NextResponse.json({ error: 'Newsletter subscription could not be saved right now.' }, { status: 500 })
    }

    const emailStatus = await sendNewsletterConfirmation(email)

    return NextResponse.json({
      ok: true,
      subscriberId: data.id,
      emailStatus: emailStatus.status,
      emailError: emailStatus.error || null,
    })
  } catch (error) {
    reportError(error, { route: '/api/newsletter', operation: 'subscribe' })
    return NextResponse.json({ error: 'Newsletter subscription could not be saved right now.' }, { status: 500 })
  }
}

async function sendNewsletterConfirmation(email: string) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return { status: 'skipped', error: 'RESEND_API_KEY is not configured' }

  const resend = new Resend(apiKey)
  const result = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL || 'Tranzita <onboarding@tranzita.africa>',
    to: [email],
    subject: 'You are on the Tranzita launch update list',
    html: `
      <div style="font-family:Arial,sans-serif;background:#FFF9F2;padding:32px;color:#183024">
        <div style="max-width:620px;margin:0 auto;background:#ffffff;border:1px solid #DDE9D2;border-radius:24px;padding:28px">
          <p style="margin:0 0 12px;color:#D96B1F;font-size:12px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase">Tranzita Updates</p>
          <h1 style="margin:0 0 16px;font-size:28px;line-height:1.15">You are on the list.</h1>
          <p style="font-size:15px;line-height:1.7;color:#65785F">Thank you for joining Tranzita updates. We will send useful launch notes, school transport safety updates, and platform availability news.</p>
          <p style="font-size:13px;line-height:1.6;color:#65785F">For support, email <a href="mailto:booking@tranzita.africa" style="color:#D96B1F;font-weight:700">booking@tranzita.africa</a>.</p>
        </div>
      </div>
    `,
  })

  if (result.error) return { status: 'failed', error: result.error.message }
  return { status: 'sent', error: null }
}
