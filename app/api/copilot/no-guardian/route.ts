import { NextResponse } from 'next/server'
import { requirePortalUser } from '@/lib/server-portal'

export async function POST(request: Request) {
  try {
    const { profile, service } = await requirePortalUser(['codriver', 'admin'])
    const body = await request.json().catch(() => ({}))
    const childName = typeof body.childName === 'string' ? body.childName : 'Child'
    const childId = typeof body.childId === 'string' && body.childId ? body.childId : null
    const routeLabel = typeof body.routeLabel === 'string' ? body.routeLabel : 'Assigned route'
    const stopLabel = typeof body.stopLabel === 'string' ? body.stopLabel : 'Current stop'
    const note = typeof body.note === 'string' ? body.note : 'No verified guardian at handoff point.'

    const { data, error } = await service
      .from('incidents')
      .insert({
        child_id: childId,
        severity: 'high',
        title: `No guardian protocol: ${childName}`,
        details: `${note} Route: ${routeLabel}. Stop: ${stopLabel}. Child remains on board while operations contacts verified guardians.`,
        status: 'open',
      })
      .select('id, created_at')
      .single()

    if (error) throw error

    await service.from('audit_events').insert({
      actor_id: profile.id,
      actor_role: profile.role,
      event_type: 'copilot_no_guardian_protocol_started',
      entity_type: 'incident',
      entity_id: data.id,
      summary: `${profile.full_name} started no-guardian protocol for ${childName}.`,
      metadata: { childName, childId, routeLabel, stopLabel },
    })

    return NextResponse.json({ ok: true, incident: data })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to start no-guardian protocol.'
    const status = message.includes('permission') ? 403 : message.includes('Sign in') || message.includes('active') ? 401 : 500
    return NextResponse.json({ error: message }, { status })
  }
}
