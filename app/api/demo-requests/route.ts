import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { durableRateLimit, rateLimitKey } from '@/lib/rate-limit'
import { getServiceSupabase } from '@/lib/server-portal'

export async function POST(request: Request) {
  try {
    const limited = await durableRateLimit(rateLimitKey(request, 'demo-requests'), 5, 60_000)
    if (!limited.ok) {
      return NextResponse.json({ error: 'Too many route review requests. Please try again shortly.' }, { status: 429 })
    }

    const body = await request.json()
    const fullName = String(body.name || '').trim()
    const email = String(body.email || '').trim().toLowerCase()
    const schoolName = String(body.school || '').trim()
    const role = String(body.role || '').trim()
    const studentCount = String(body.students || '').trim() || null

    if (!fullName || !email || !schoolName || !role) {
      return NextResponse.json({ error: 'Name, email, school, and role are required.' }, { status: 400 })
    }

    const supabase = getServiceSupabase()
    const { data, error } = await supabase
      .from('demo_requests')
      .insert({ full_name: fullName, email, school_name: schoolName, role, student_count: studentCount })
      .select('id, created_at')
      .single()

    if (error) throw error

    const emailStatus = await sendLeadEmail({ id: data.id, fullName, email, schoolName, role, studentCount })
    return NextResponse.json({ ok: true, requestId: data.id, emailStatus })
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Route review request could not be saved.' }, { status: 500 })
  }
}

async function sendLeadEmail(input: { id: string; fullName: string; email: string; schoolName: string; role: string; studentCount: string | null }) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return 'skipped'

  const resend = new Resend(apiKey)
  const result = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL || 'Tranzita <onboarding@tranzita.africa>',
    to: [process.env.DEMO_LEADS_EMAIL || 'booking@tranzita.africa'],
    subject: `New Tranzita route review: ${input.schoolName}`,
    html: `
      <div style="font-family:Arial,sans-serif;color:#183024">
        <h2>New Tranzita route review request</h2>
        <p><strong>Name:</strong> ${escapeHtml(input.fullName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(input.email)}</p>
        <p><strong>School:</strong> ${escapeHtml(input.schoolName)}</p>
        <p><strong>Role:</strong> ${escapeHtml(input.role)}</p>
        <p><strong>Students:</strong> ${escapeHtml(input.studentCount || 'Not supplied')}</p>
        <p><strong>Reference:</strong> ${escapeHtml(input.id)}</p>
      </div>
    `,
  })

  return result.error ? 'failed' : 'sent'
}

function escapeHtml(value: string) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;')
}
