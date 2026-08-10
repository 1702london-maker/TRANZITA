import { NextResponse } from 'next/server'
import { requirePortalUser } from '@/lib/server-portal'

export async function POST(request: Request) {
  try {
    const { profile, service } = await requirePortalUser()
    const body = await request.json()
    const scanType = String(body.scanType || '').trim()
    const qrValue = String(body.qrValue || '').trim()
    const action = String(body.action || 'lookup').trim()

    if (!scanType || !qrValue) return NextResponse.json({ error: 'Scan type and QR value are required.' }, { status: 400 })

    const { data, error } = await service
      .from('qr_scan_events')
      .insert({ scanned_by: profile.id, role: profile.role, scan_type: scanType, qr_value: qrValue, action })
      .select('id, scan_type, result_summary, created_at')
      .single()

    if (error) throw error

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
    const message = error instanceof Error ? error.message : 'QR scan could not be logged.'
    const status = message.includes('Sign in') ? 401 : message.includes('permission') ? 403 : 500
    return NextResponse.json({ error: message }, { status })
  }
}
