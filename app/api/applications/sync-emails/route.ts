import { NextResponse } from 'next/server'
import { getApplicationStatusEmail, sendApplicationStatusEmail } from '@/lib/email'
import { isOnboardingRole, type ApplicationStatus } from '@/lib/onboarding'
import { getSupabaseAdminClient, requireAdminProfile } from '../route-helpers'

const syncableStatuses: ApplicationStatus[] = [
  'under_review',
  'documents_requested',
  'payment_required',
  'payment_confirmed',
  'approved',
  'activated',
  'rejected',
  'suspended',
]

export async function POST() {
  const admin = await requireAdminProfile()
  if ('error' in admin) return NextResponse.json({ error: admin.error }, { status: admin.status })

  const supabase = getSupabaseAdminClient()
  if (!supabase) return NextResponse.json({ error: 'Supabase admin client is not configured.' }, { status: 503 })

  const { data: applications, error } = await supabase
    .from('applications')
    .select('id, role, status, full_name, email')
    .in('status', syncableStatuses)
    .order('updated_at', { ascending: false })
    .limit(50)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const results: Array<{ applicationId: string; email: string; status: string; emailStatus: string; emailError?: string | null }> = []

  for (const application of applications || []) {
    if (!isOnboardingRole(application.role) || !syncableStatuses.includes(application.status)) continue

    const templateKey = `application_${application.status}`
    const { data: existingSent } = await supabase
      .from('email_events')
      .select('id')
      .eq('application_id', application.id)
      .eq('template_key', templateKey)
      .eq('status', 'sent')
      .maybeSingle()

    if (existingSent) continue

    const emailResult = await sendApplicationStatusEmail({
      to: application.email,
      role: application.role,
      fullName: application.full_name,
      status: application.status,
      note: 'This update was synced from the Tranzita onboarding desk.',
    })
    const email = getApplicationStatusEmail({
      role: application.role,
      fullName: application.full_name,
      status: application.status,
      note: 'This update was synced from the Tranzita onboarding desk.',
    })

    await supabase.from('email_events').insert({
      application_id: application.id,
      recipient_email: application.email,
      template_key: templateKey,
      subject: email.subject,
      status: emailResult.status,
      provider_message_id: 'id' in emailResult ? emailResult.id : null,
      error_message: 'error' in emailResult ? emailResult.error : null,
      sent_at: emailResult.status === 'sent' ? new Date().toISOString() : null,
    })

    results.push({
      applicationId: application.id,
      email: application.email,
      status: application.status,
      emailStatus: emailResult.status,
      emailError: 'error' in emailResult ? emailResult.error : null,
    })
  }

  await supabase.from('audit_events').insert({
    actor_id: admin.adminProfile.id,
    actor_role: 'admin',
    event_type: 'application_email_sync',
    entity_type: 'application',
    summary: `Admin synced ${results.length} onboarding status email(s).`,
    metadata: { synced: results.length, results },
  })

  return NextResponse.json({ ok: true, synced: results.length, results })
}
