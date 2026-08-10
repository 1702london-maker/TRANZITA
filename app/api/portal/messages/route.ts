import { NextResponse } from 'next/server'
import { requirePortalUser } from '@/lib/server-portal'

const channels = new Set(['email', 'whatsapp', 'support'])

export async function POST(request: Request) {
  try {
    const { profile, service } = await requirePortalUser()
    const body = await request.json()
    const channel = String(body.channel || 'support').toLowerCase()
    const subject = String(body.subject || '').trim() || null
    const messageBody = String(body.body || '').trim()
    const recipientScope = String(body.recipientScope || 'operations').trim()

    if (!channels.has(channel)) return NextResponse.json({ error: 'Unknown message channel.' }, { status: 400 })
    if (!messageBody) return NextResponse.json({ error: 'Message body is required.' }, { status: 400 })

    const { data, error } = await service
      .from('portal_messages')
      .insert({ submitted_by: profile.id, role: profile.role, channel, subject, body: messageBody, recipient_scope: recipientScope })
      .select('id, channel, status, created_at')
      .single()

    if (error) throw error

    await service.from('audit_events').insert({
      actor_id: profile.id,
      actor_role: profile.role,
      event_type: 'portal_message_logged',
      entity_type: 'portal_message',
      entity_id: data.id,
      summary: `${profile.full_name} logged a ${channel} support message.`,
      metadata: { subject, recipientScope },
    })

    return NextResponse.json({ ok: true, message: data })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Message could not be logged.'
    const status = message.includes('Sign in') ? 401 : message.includes('permission') ? 403 : 500
    return NextResponse.json({ error: message }, { status })
  }
}
