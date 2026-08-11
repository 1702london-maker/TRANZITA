import { NextResponse } from 'next/server'
import { sendDropoffEmail } from '@/lib/email'
import { reportError } from '@/lib/error-monitoring'
import { requirePortalUser } from '@/lib/server-portal'

export async function POST(request: Request) {
  try {
    const { profile, service } = await requirePortalUser()
    const body = await request.json()
    const scanType = String(body.scanType || '').trim()
    const qrValue = String(body.qrValue || '').trim()
    const action = String(body.action || 'lookup').trim()

    if (!scanType || !qrValue) return NextResponse.json({ error: 'Scan type and QR value are required.' }, { status: 400 })
    const movementActions = ['tap_on', 'tap_off', 'board_child', 'drop_off_child', 'guardian_handover']
    const movementScan = /child|student|guardian|handover/i.test(scanType) && movementActions.includes(action)
    if (movementScan && !['codriver', 'nurse', 'admin'].includes(profile.role)) {
      return NextResponse.json({ error: 'Only onboard crew can record child movement QR events.' }, { status: 403 })
    }

    const { data, error } = await service
      .from('qr_scan_events')
      .insert({ scanned_by: profile.id, role: profile.role, scan_type: scanType, qr_value: qrValue, action })
      .select('id, scan_type, result_summary, created_at')
      .single()

    if (error) throw error

    if (movementScan && ['tap_off', 'drop_off_child', 'guardian_handover'].includes(action)) {
      await sendDropoffNotifications({
        service,
        actorId: profile.id,
        childLookup: qrValue,
        locationLabel: typeof body.locationLabel === 'string' ? body.locationLabel : null,
      })
    }

    await service.from('audit_events').insert({
      actor_id: profile.id,
      actor_role: profile.role,
      event_type: 'qr_scan_logged',
      entity_type: 'qr_scan_event',
      entity_id: data.id,
      summary: `${profile.full_name} scanned ${scanType}.`,
      metadata: { action },
    })

    return NextResponse.json({ ok: true, scan: data })
  } catch (error) {
    reportError(error, { route: '/api/portal/qr-scans', operation: 'log_qr_scan' })
    const message = error instanceof Error ? error.message : 'QR scan could not be logged.'
    const status = message.includes('Sign in') ? 401 : message.includes('permission') ? 403 : 500
    return NextResponse.json({ error: status === 500 ? 'QR scan could not be logged.' : message }, { status })
  }
}

async function sendDropoffNotifications({
  service,
  actorId,
  childLookup,
  locationLabel,
}: {
  service: Awaited<ReturnType<typeof requirePortalUser>>['service']
  actorId: string
  childLookup: string
  locationLabel: string | null
}) {
  const child = await findChild(service, childLookup)
  if (!child) return

  const { data: guardians, error } = await service
    .from('guardians')
    .select('id, full_name, email')
    .eq('child_id', child.id)
    .eq('verified', true)
    .not('email', 'is', null)

  if (error) throw error
  if (!guardians?.length) return

  const eventTime = new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'Africa/Lagos',
  }).format(new Date())

  for (const guardian of guardians) {
    const emailResult = await sendDropoffEmail({
      to: guardian.email,
      guardianName: guardian.full_name,
      childName: child.full_name,
      locationLabel,
      eventTime,
    })

    await service.from('parent_notifications').insert({
      guardian_id: guardian.id,
      child_id: child.id,
      channel: 'email',
      title: `Drop-off confirmed for ${child.full_name}`,
      status: emailResult.status,
      sent_at: emailResult.status === 'sent' ? new Date().toISOString() : null,
    })

    await service.from('audit_events').insert({
      actor_id: actorId,
      actor_role: 'system',
      event_type: 'dropoff_email_processed',
      entity_type: 'parent_notification',
      entity_id: guardian.id,
      summary: `Drop-off email ${emailResult.status} for ${child.full_name}.`,
      metadata: { childId: child.id, guardianId: guardian.id, emailStatus: emailResult.status },
    })
  }
}

async function findChild(service: Awaited<ReturnType<typeof requirePortalUser>>['service'], childLookup: string) {
  const trimmed = childLookup.trim()
  const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  const query = service.from('children').select('id, full_name').eq('active', true)

  const { data, error } = uuidPattern.test(trimmed)
    ? await query.eq('id', trimmed).maybeSingle()
    : await query.ilike('full_name', trimmed).maybeSingle()

  if (error) throw error
  return data as { id: string; full_name: string } | null
}
