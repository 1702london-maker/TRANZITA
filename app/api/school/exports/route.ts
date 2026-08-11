import { NextResponse } from 'next/server'
import { reportError } from '@/lib/error-monitoring'
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
    reportError(error, { route: '/api/school/exports', operation: 'create_school_export_request' })
    const message = error instanceof Error ? error.message : 'School export could not be saved.'
    const status = message.includes('Sign in') || message.includes('active') ? 401 : message.includes('permission') ? 403 : 500
    return NextResponse.json({ error: status === 500 ? 'School export could not be saved.' : message }, { status })
  }
}
