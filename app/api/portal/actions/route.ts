import { NextResponse } from 'next/server'
import { reportError } from '@/lib/error-monitoring'
import { safeRecipientScope } from '@/lib/recipient-scope'
import { requirePortalUser } from '@/lib/server-portal'

export async function POST(request: Request) {
  try {
    const { profile, service } = await requirePortalUser()
    const body = await request.json()
    const actionType = String(body.actionType || '').trim()
    const label = String(body.label || actionType).trim()
    const entityType = String(body.entityType || 'portal_action').trim()
    const metadata = typeof body.metadata === 'object' && body.metadata ? body.metadata : {}

    if (!actionType || !label) return NextResponse.json({ error: 'Action type and label are required.' }, { status: 400 })

    const { data, error } = await service
      .from('audit_events')
      .insert({
        actor_id: profile.id,
        actor_role: profile.role,
        event_type: actionType,
        entity_type: entityType,
        summary: `${profile.full_name} completed: ${label}.`,
        metadata,
      })
      .select('id, created_at')
      .single()

    if (error) throw error

    if (actionType.includes('message') || actionType.includes('comms') || actionType.includes('support')) {
      await service.from('portal_messages').insert({
        submitted_by: profile.id,
        role: profile.role,
        channel: 'support',
        subject: label,
        body: String(metadata.note || label),
        recipient_scope: safeRecipientScope(profile.role, (metadata as Record<string, unknown>).recipientScope),
      })
    }

    return NextResponse.json({ ok: true, action: data })
  } catch (error) {
    reportError(error, { route: '/api/portal/actions', operation: 'create_portal_action' })
    const message = error instanceof Error ? error.message : 'Portal action could not be saved.'
    const status = message.includes('Sign in') || message.includes('active') ? 401 : message.includes('permission') ? 403 : 500
    return NextResponse.json({ error: status === 500 ? 'Portal action could not be saved.' : message }, { status })
  }
}
