import { NextResponse } from 'next/server'
import { requirePortalUser } from '@/lib/server-portal'

export async function POST(request: Request) {
  try {
    const { profile, service } = await requirePortalUser(['admin', 'school'])
    const body = await request.json()
    const route = String(body.route || 'School route').trim()
    const requestedChange = String(body.requestedChange || body.reason || 'Route review requested').trim()

    const { data, error } = await service.from('audit_events').insert({
      actor_id: profile.id,
      actor_role: profile.role,
      event_type: 'school_route_review_requested',
      entity_type: 'route',
      summary: `${profile.full_name} requested a school route review.`,
      metadata: { route, requestedChange },
    }).select('id, created_at').single()

    if (error) throw error
    return NextResponse.json({ ok: true, action: data })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Route review could not be saved.'
    return NextResponse.json({ error: message }, { status: message.includes('Sign in') ? 401 : message.includes('permission') ? 403 : 500 })
  }
}
