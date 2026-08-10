import { NextResponse } from 'next/server'
import { resolveAssignedChildByName } from '@/lib/child-access'
import { requirePortalUser } from '@/lib/server-portal'

export async function POST(request: Request) {
  try {
    const { profile, service } = await requirePortalUser(['admin', 'nurse'])
    const body = await request.json()
    const childName = String(body.childName || '').trim()
    const routeSession = String(body.routeSession || 'morning').toLowerCase()
    const temperatureC = Number(body.temperatureC)
    const note = String(body.note || '').trim() || null

    if (!childName) return NextResponse.json({ error: 'Child name is required.' }, { status: 400 })
    if (!['morning', 'noon', 'afternoon'].includes(routeSession)) return NextResponse.json({ error: 'Choose morning, noon, or afternoon.' }, { status: 400 })
    if (!Number.isFinite(temperatureC) || temperatureC < 34 || temperatureC > 42) return NextResponse.json({ error: 'Enter a valid temperature reading.' }, { status: 400 })

    const child = await resolveAssignedChildByName({ service, profile, childName, role: 'nurse' })
    const status = temperatureC >= 37.8 ? 'high temperature review' : 'normal'
    const { data, error } = await service
      .from('temperature_readings')
      .insert({ child_id: child.id, child_name: child.full_name, nurse_id: profile.id, route_session: routeSession, temperature_c: temperatureC, status, note })
      .select('id, child_name, route_session, temperature_c, status, created_at')
      .single()

    if (error) throw error

    await service.from('audit_events').insert({
      actor_id: profile.id,
      actor_role: profile.role,
      event_type: 'temperature_reading_created',
      entity_type: 'temperature_reading',
      entity_id: data.id,
      summary: `${profile.full_name} recorded ${temperatureC}C for ${child.full_name}.`,
      metadata: { routeSession, status, childId: child.id },
    })

    return NextResponse.json({ ok: true, reading: data })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Temperature reading could not be saved.'
    const status = message.includes('Sign in') ? 401 : message.includes('permission') ? 403 : 500
    return NextResponse.json({ error: message }, { status })
  }
}
