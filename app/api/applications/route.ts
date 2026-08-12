import { NextResponse } from 'next/server'
import { sendApplicationReceivedEmail } from '@/lib/email'
import { applicationReceivedCopy, isOnboardingRole } from '@/lib/onboarding'
import { durableRateLimit, rateLimitKey } from '@/lib/rate-limit'
import { getServiceSupabase } from '@/lib/server-portal'
import { getSupabaseAdminClient, requireAdminProfile } from './route-helpers'

export async function GET() {
  const admin = await requireAdminProfile()
  if ('error' in admin) return NextResponse.json({ error: admin.error }, { status: admin.status })

  const supabase = getSupabaseAdminClient()
  if (!supabase) return NextResponse.json({ error: 'Supabase admin client is not configured.' }, { status: 503 })

  const { data, error } = await supabase
    .from('applications')
    .select('id, role, status, full_name, email, phone, whatsapp, organisation_name, city, applicant_notes, vehicle_plate_numbers, created_at, reviewed_at')
    .order('created_at', { ascending: false })
    .limit(100)

  if (error) return NextResponse.json({ error: 'Applications could not be loaded.' }, { status: 500 })

  const applicationIds = (data || []).map((application) => application.id)
  const latestEmailByApplication = new Map<string, any>()

  if (applicationIds.length) {
    const { data: emailEvents } = await supabase
      .from('email_events')
      .select('application_id, template_key, status, error_message, sent_at, created_at')
      .in('application_id', applicationIds)
      .order('created_at', { ascending: false })

    for (const event of emailEvents || []) {
      if (event.application_id && !latestEmailByApplication.has(event.application_id)) {
        latestEmailByApplication.set(event.application_id, event)
      }
    }
  }

  return NextResponse.json({
    applications: (data || []).map((application) => ({
      ...application,
      latest_email_event: latestEmailByApplication.get(application.id) || null,
    })),
  })
}

export async function POST(request: Request) {
  const limited = await durableRateLimit(rateLimitKey(request, 'applications'), 4, 60_000)
  if (!limited.ok) {
    return NextResponse.json({ error: 'Too many applications from this connection. Please try again shortly.' }, { status: 429 })
  }

  const payload = await request.json().catch(() => null)

  if (!payload || typeof payload !== 'object') {
    return NextResponse.json({ error: 'Invalid application payload.' }, { status: 400 })
  }

  const role = String(payload.role || '')
  const fullName = String(payload.fullName || '').trim()
  const email = String(payload.email || '').trim().toLowerCase()

  if (!isOnboardingRole(role)) {
    return NextResponse.json({ error: 'Select a valid Tranzita onboarding role.' }, { status: 400 })
  }

  if (!fullName || !email) {
    return NextResponse.json({ error: 'Full name and email address are required.' }, { status: 400 })
  }

  let supabase
  try {
    supabase = getServiceSupabase()
  } catch {
    return NextResponse.json(
      { error: 'Application intake is not connected yet. Add NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.' },
      { status: 503 },
    )
  }

  const plateNumbers = String(payload.vehiclePlateNumbers || '')
    .split(',')
    .map((item) => item.trim().toUpperCase())
    .filter(Boolean)

  const { data: application, error: applicationError } = await supabase
    .from('applications')
    .insert({
      role,
      status: 'submitted',
      full_name: fullName,
      email,
      phone: cleanString(payload.phone),
      whatsapp: cleanString(payload.whatsapp),
      organisation_name: cleanString(payload.organisationName),
      city: cleanString(payload.city),
      state: cleanString(payload.state),
      applicant_notes: cleanString(payload.notes),
      vehicle_plate_numbers: role === 'partner' ? plateNumbers : [],
      school_interest: cleanString(payload.schoolInterest),
      metadata: {
        source: 'auth_signup_application',
        submittedAt: new Date().toISOString(),
      },
    })
    .select('id, role, status')
    .single()

  if (applicationError || !application) {
    return NextResponse.json({ error: applicationError?.message || 'Application could not be saved.' }, { status: 500 })
  }

  await supabase.from('application_status_events').insert({
    application_id: application.id,
    to_status: 'submitted',
    note: 'Application submitted from public onboarding form.',
  })

  const copy = applicationReceivedCopy[role]
  const emailResult = await sendApplicationReceivedEmail({
    to: email,
    role,
    fullName,
    applicationId: application.id,
  })

  await supabase.from('email_events').insert({
    application_id: application.id,
    recipient_email: email,
    template_key: 'application_received',
    subject: copy.subject,
    status: emailResult.status,
    provider_message_id: 'id' in emailResult ? emailResult.id : null,
    error_message: 'error' in emailResult ? emailResult.error : null,
    sent_at: emailResult.status === 'sent' ? new Date().toISOString() : null,
  })

  return NextResponse.json({
    ok: true,
    applicationId: application.id,
    status: application.status,
    emailStatus: emailResult.status,
    emailError: 'error' in emailResult ? emailResult.error : null,
  })
}

function cleanString(value: unknown) {
  if (typeof value !== 'string') return null
  const trimmed = value.trim()
  return trimmed ? trimmed : null
}
