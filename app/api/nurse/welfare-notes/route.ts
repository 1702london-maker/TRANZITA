import { NextResponse } from 'next/server'
import { resolveAssignedChildByName } from '@/lib/child-access'
import { reportError } from '@/lib/error-monitoring'
import { requirePortalUser } from '@/lib/server-portal'

export async function POST(request: Request) {
  try {
    const { profile, service } = await requirePortalUser(['nurse', 'admin'])
    const body = await request.json().catch(() => ({}))
    const childName = String(body.child || body.childName || '').trim()
    const severity = String(body.severity || 'Observation').trim()
    const observation = String(body.observation || body.note || '').trim()
    const actionRequired = Boolean(body.actionRequired || body.notifySchool || body.notifyParent)

    if (!childName) return NextResponse.json({ error: 'Child name is required.' }, { status: 400 })
    if (!observation) return NextResponse.json({ error: 'Welfare note is required.' }, { status: 400 })

    const child = await resolveAssignedChildByName({ service, profile, childName, role: 'nurse' })
    const nurseId = profile.role === 'nurse' ? await resolveCrewMemberId({ service, profileId: profile.id }) : null

    const { data, error } = await service
      .from('welfare_notes')
      .insert({
        child_id: child.id,
        nurse_id: nurseId,
        note: `${severity}: ${observation}`,
        action_required: actionRequired,
      })
      .select('id, child_id, note, action_required, created_at')
      .single()

    if (error) throw error

    await service.from('audit_events').insert({
      actor_id: profile.id,
      actor_role: profile.role,
      event_type: 'nurse_welfare_note_created',
      entity_type: 'welfare_note',
      entity_id: data.id,
      summary: `${profile.full_name} created an append-only welfare note for ${child.full_name}.`,
      metadata: {
        childId: child.id,
        childName: child.full_name,
        severity,
        actionRequired,
      },
    })

    return NextResponse.json({ ok: true, welfareNote: data })
  } catch (error) {
    reportError(error, { route: '/api/nurse/welfare-notes', operation: 'create_welfare_note' })
    const message = error instanceof Error ? error.message : 'Welfare note could not be saved.'
    const status = message.includes('Sign in') || message.includes('active') ? 401 : message.includes('permission') || message.includes('assignment') || message.includes('manifest') ? 403 : 500
    return NextResponse.json({ error: message }, { status })
  }
}

async function resolveCrewMemberId({
  service,
  profileId,
}: {
  service: ReturnType<typeof import('@/lib/server-portal').getServiceSupabase>
  profileId: string
}) {
  const { data, error } = await service
    .from('crew_members')
    .select('id')
    .eq('user_id', profileId)
    .eq('role', 'nurse')
    .eq('active', true)
    .maybeSingle()

  if (error) throw new Error('Nurse crew record could not be verified.')
  if (!data?.id) throw new Error('You do not have an active nurse crew assignment.')
  return data.id
}
