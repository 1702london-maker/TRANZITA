import { NextResponse } from 'next/server'
import { reportError } from '@/lib/error-monitoring'
import { requirePortalUser } from '@/lib/server-portal'

export async function POST(request: Request) {
  try {
    const { profile, service } = await requirePortalUser(['admin', 'school'])
    const body = await request.json()
    const childId = String(body.childId || '').trim()
    const child = String(body.child || 'School child').trim()
    const guardian = String(body.guardian || 'Guardian').trim()
    const decision = String(body.decision || 'reviewed').trim()

    if (!childId) return NextResponse.json({ error: 'A verified child record is required.' }, { status: 400 })

    const { data: childRecord, error: childError } = await service
      .from('children')
      .select('id, school_id, full_name')
      .eq('id', childId)
      .eq('active', true)
      .maybeSingle()

    if (childError) throw new Error('Child ownership could not be verified.')
    if (!childRecord?.id) return NextResponse.json({ error: 'Child record was not found.' }, { status: 404 })
    if (profile.role === 'school' && childRecord.school_id !== profile.school_id) {
      return NextResponse.json({ error: 'You do not have permission for this child record.' }, { status: 403 })
    }

    const { data, error } = await service.from('audit_events').insert({
      actor_id: profile.id,
      actor_role: profile.role,
      event_type: 'school_guardian_approval',
      entity_type: 'guardian',
      summary: `${profile.full_name} marked ${guardian} for ${childRecord.full_name || child} as ${decision}.`,
      metadata: { child: childRecord.full_name || child, childId: childRecord.id, guardian, decision },
    }).select('id, created_at').single()

    if (error) throw error
    return NextResponse.json({ ok: true, action: data })
  } catch (error) {
    reportError(error, { route: '/api/school/guardian-approvals', operation: 'create_guardian_approval' })
    const message = error instanceof Error ? error.message : 'Guardian action could not be saved.'
    const status = message.includes('Sign in') || message.includes('active') ? 401 : message.includes('permission') ? 403 : 500
    return NextResponse.json({ error: status === 500 ? 'Guardian action could not be saved.' : message }, { status })
  }
}
