import { NextResponse } from 'next/server'
import { requirePortalUser } from '@/lib/server-portal'

export async function POST(request: Request) {
  try {
    const { profile, service } = await requirePortalUser(['admin', 'school'])
    const body = await request.json()
    const child = String(body.child || 'School child').trim()
    const guardian = String(body.guardian || 'Guardian').trim()
    const decision = String(body.decision || 'reviewed').trim()

    const { data, error } = await service.from('audit_events').insert({
      actor_id: profile.id,
      actor_role: profile.role,
      event_type: 'school_guardian_approval',
      entity_type: 'guardian',
      summary: `${profile.full_name} marked ${guardian} for ${child} as ${decision}.`,
      metadata: { child, guardian, decision },
    }).select('id, created_at').single()

    if (error) throw error
    return NextResponse.json({ ok: true, action: data })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Guardian action could not be saved.'
    return NextResponse.json({ error: message }, { status: message.includes('Sign in') ? 401 : message.includes('permission') ? 403 : 500 })
  }
}
