import { NextResponse } from 'next/server'
import { getApplicationStatusEmail, sendApplicationStatusEmail } from '@/lib/email'
import { isOnboardingRole, type ApplicationStatus } from '@/lib/onboarding'
import { activateApplicationAccess } from '@/lib/activate-access'
import { getSupabaseAdminClient, requireAdminProfile } from '../../route-helpers'

const statuses: ApplicationStatus[] = [
  'submitted',
  'under_review',
  'documents_requested',
  'payment_required',
  'payment_confirmed',
  'approved',
  'activated',
  'rejected',
  'suspended',
]

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const payload = await request.json().catch(() => null)
  const nextStatus = String(payload?.status || '') as ApplicationStatus
  const note = typeof payload?.note === 'string' ? payload.note.trim() : null

  if (!statuses.includes(nextStatus)) {
    return NextResponse.json({ error: 'Invalid application status.' }, { status: 400 })
  }

  const admin = await requireAdminProfile()
  if ('error' in admin) return NextResponse.json({ error: admin.error }, { status: admin.status })

  const supabase = getSupabaseAdminClient()
  if (!supabase) return NextResponse.json({ error: 'Supabase admin client is not configured.' }, { status: 503 })

  const { data: existing, error: existingError } = await supabase
    .from('applications')
    .select('id, role, status, full_name, email, phone, organisation_name, city')
    .eq('id', params.id)
    .single()

  if (existingError || !existing || !isOnboardingRole(existing.role)) {
    return NextResponse.json({ error: 'Application was not found.' }, { status: 404 })
  }

  const transitionError = validateTransition(existing.status, nextStatus)
  if (transitionError) return NextResponse.json({ error: transitionError }, { status: 409 })

  let setupUrl: string | null = null
  if (nextStatus === 'activated') {
    try {
      const activation = await activateApplicationAccess({ supabase, application: existing })
      setupUrl = activation.setupUrl
    } catch (error) {
      return NextResponse.json({ error: error instanceof Error ? error.message : 'Portal access could not be activated.' }, { status: 500 })
    }
  }

  const { data: updated, error: updateError } = await supabase
    .from('applications')
    .update({
    status: nextStatus,
      reviewed_by: admin.adminProfile.id,
      reviewed_at: new Date().toISOString(),
    })
    .eq('id', params.id)
    .select('id, role, status, full_name, email')
    .single()

  if (updateError || !updated) {
    return NextResponse.json({ error: updateError?.message || 'Application could not be updated.' }, { status: 500 })
  }

  await supabase.from('application_status_events').insert({
    application_id: updated.id,
    from_status: existing.status,
    to_status: nextStatus,
    actor_user_id: admin.adminProfile.id,
    note,
  })

  const emailResult = await sendApplicationStatusEmail({
    to: updated.email,
    role: updated.role,
    fullName: updated.full_name,
    status: nextStatus,
    note,
    setupUrl,
  })
  const email = getApplicationStatusEmail({ role: updated.role, fullName: updated.full_name, status: nextStatus, note, setupUrl })

  await supabase.from('email_events').insert({
    application_id: updated.id,
    recipient_email: updated.email,
    template_key: `application_${nextStatus}`,
    subject: email.subject,
    status: emailResult.status,
    provider_message_id: 'id' in emailResult ? emailResult.id : null,
    error_message: 'error' in emailResult ? emailResult.error : null,
    sent_at: emailResult.status === 'sent' ? new Date().toISOString() : null,
  })

  return NextResponse.json({
    ok: true,
    application: updated,
    emailStatus: emailResult.status,
    emailError: 'error' in emailResult ? emailResult.error : null,
  })
}

function validateTransition(currentStatus: ApplicationStatus, nextStatus: ApplicationStatus) {
  if (nextStatus === 'approved' && !['submitted', 'under_review', 'documents_requested'].includes(currentStatus)) {
    return 'Applications can only be approved from submitted, under review, or documents requested.'
  }

  if (nextStatus === 'payment_confirmed' && currentStatus !== 'approved') {
    return 'Payment can only be confirmed after approval.'
  }

  if (nextStatus === 'activated' && currentStatus !== 'payment_confirmed') {
    return 'Portal access can only be activated after payment confirmation.'
  }

  return null
}
