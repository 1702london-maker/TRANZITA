import { NextResponse } from 'next/server'
import { getApplicationStatusEmail, sendApplicationStatusEmail } from '@/lib/email'
import { isOnboardingRole, type ApplicationStatus } from '@/lib/onboarding'
import { getSupabaseAdminClient, requireAdminProfile } from '../../route-helpers'

export async function POST(_: Request, { params }: { params: { id: string } }) {
  const admin = await requireAdminProfile()
  if ('error' in admin) return NextResponse.json({ error: admin.error }, { status: admin.status })

  const supabase = getSupabaseAdminClient()
  if (!supabase) return NextResponse.json({ error: 'Supabase admin client is not configured.' }, { status: 503 })

  const { data: application, error } = await supabase
    .from('applications')
    .select('id, role, status, full_name, email')
    .eq('id', params.id)
    .single()

  if (error || !application || !isOnboardingRole(application.role)) {
    return NextResponse.json({ error: 'Application was not found.' }, { status: 404 })
  }

  const status = application.status as ApplicationStatus
  const emailResult = await sendApplicationStatusEmail({
    to: application.email,
    role: application.role,
    fullName: application.full_name,
    status,
    note: 'This is a resent copy from the Tranzita onboarding desk.',
  })
  const email = getApplicationStatusEmail({
    role: application.role,
    fullName: application.full_name,
    status,
    note: 'This is a resent copy from the Tranzita onboarding desk.',
  })

  await supabase.from('email_events').insert({
    application_id: application.id,
    recipient_email: application.email,
    template_key: `application_${status}_resent`,
    subject: email.subject,
    status: emailResult.status,
    provider_message_id: 'id' in emailResult ? emailResult.id : null,
    error_message: 'error' in emailResult ? emailResult.error : null,
    sent_at: emailResult.status === 'sent' ? new Date().toISOString() : null,
  })

  await supabase.from('audit_events').insert({
    actor_id: admin.adminProfile.id,
    actor_role: 'admin',
    event_type: 'application_email_resent',
    entity_type: 'application',
    entity_id: application.id,
    summary: `Admin resent ${status} email to ${application.email}.`,
    metadata: { status },
  })

  return NextResponse.json({ ok: true, emailStatus: emailResult.status })
}
