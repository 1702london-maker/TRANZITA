import { NextResponse } from 'next/server'
import { requirePortalUser } from '@/lib/server-portal'

export async function POST(request: Request) {
  try {
    const { profile, service } = await requirePortalUser(['admin', 'school'])
    const body = await request.json()
    const exportType = String(body.exportType || 'School report export').trim()
    const format = String(body.format || 'PDF').toUpperCase()
    const dateRange = String(body.dateRange || 'Current period').trim()

    const { data, error } = await service.from('audit_events').insert({
      actor_id: profile.id,
      actor_role: profile.role,
      event_type: 'school_export_requested',
      entity_type: 'school_export',
      summary: `${profile.full_name} requested ${format} export: ${exportType}.`,
      metadata: { exportType, format, dateRange },
    }).select('id, created_at').single()

    if (error) throw error
    return NextResponse.json({ ok: true, export: data })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'School export could not be saved.'
    return NextResponse.json({ error: message }, { status: message.includes('Sign in') ? 401 : message.includes('permission') ? 403 : 500 })
  }
}
