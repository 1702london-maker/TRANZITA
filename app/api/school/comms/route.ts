import { NextResponse } from 'next/server'
import { safeRecipientScope } from '@/lib/recipient-scope'
import { requirePortalUser } from '@/lib/server-portal'

export async function POST(request: Request) {
  try {
    const { profile, service } = await requirePortalUser(['admin', 'school'])
    const body = await request.json()
    const audience = String(body.audience || 'School transport parents').trim()
    const message = String(body.message || body.body || 'School communication request').trim()
    const channel = String(body.channel || 'whatsapp').toLowerCase()
    const recipientScope = safeRecipientScope(profile.role, body.recipientScope || 'school_safeguarding')

    const { data, error } = await service.from('portal_messages').insert({
      submitted_by: profile.id,
      role: profile.role,
      channel: channel === 'email' ? 'email' : 'whatsapp',
      subject: `School communication: ${audience}`,
      body: message,
      recipient_scope: recipientScope,
    }).select('id, created_at').single()

    if (error) throw error
    await service.from('audit_events').insert({
      actor_id: profile.id,
      actor_role: profile.role,
      event_type: 'school_comms_logged',
      entity_type: 'portal_message',
      entity_id: data.id,
      summary: `${profile.full_name} logged a school communication.`,
      metadata: { audience, channel, recipientScope },
    })

    return NextResponse.json({ ok: true, message: data })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'School communication could not be saved.'
    return NextResponse.json({ error: message }, { status: message.includes('Sign in') ? 401 : message.includes('permission') ? 403 : 500 })
  }
}
