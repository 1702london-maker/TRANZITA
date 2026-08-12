import { NextResponse } from 'next/server'
import { reportError } from '@/lib/error-monitoring'
import { requirePortalUser } from '@/lib/server-portal'

type ChecklistItem = {
  item?: string
  state?: string
  note?: string
}

export async function POST(request: Request) {
  try {
    const { profile, service } = await requirePortalUser(['driver', 'admin'])
    const body = await request.json().catch(() => ({}))
    const items = Array.isArray(body.items) ? (body.items as ChecklistItem[]) : []
    const vehicleLabel = typeof body.vehicleLabel === 'string' ? body.vehicleLabel : 'Assigned vehicle'
    const routeLabel = typeof body.routeLabel === 'string' ? body.routeLabel : 'Assigned route'

    if (!items.length) {
      return NextResponse.json({ error: 'Checklist items are required.' }, { status: 400 })
    }

    const failedItems = items.filter((entry) => !String(entry.state || '').toLowerCase().match(/passed|live|ready|88%|ok|clear/))
    const status = failedItems.length ? 'attention_required' : 'passed'
    const notes = JSON.stringify({
      routeLabel,
      vehicleLabel,
      submittedBy: profile.full_name,
      checklist: items,
      failedItems,
    })

    const { data, error } = await service
      .from('vehicle_inspections')
      .insert({
        inspector_name: profile.full_name,
        status,
        notes,
      })
      .select('id, status, created_at')
      .single()

    if (error) throw error

    await service.from('audit_events').insert({
      actor_id: profile.id,
      actor_role: profile.role,
      event_type: 'driver_checklist_submitted',
      entity_type: 'vehicle_inspection',
      entity_id: data.id,
      summary: `${profile.full_name} submitted ${vehicleLabel} checklist for ${routeLabel}.`,
      metadata: { vehicleLabel, routeLabel, status, itemCount: items.length },
    })

    return NextResponse.json({ ok: true, inspection: data })
  } catch (error) {
    reportError(error, { route: '/api/driver/checklist', operation: 'submit_driver_checklist' })
    const message = error instanceof Error ? error.message : 'Unable to submit checklist.'
    const status = message.includes('permission') ? 403 : message.includes('Sign in') || message.includes('active') ? 401 : 500
    return NextResponse.json({ error: status === 500 ? 'Unable to submit checklist.' : message }, { status })
  }
}
