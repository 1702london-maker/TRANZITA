import 'server-only'
import { NextResponse } from 'next/server'
import { safeRecipientScope } from '@/lib/recipient-scope'
import type { PortalRole } from '@/lib/server-portal'
import { requirePortalUser } from '@/lib/server-portal'

type PortalActionInput = {
  request: Request
  allowedRoles: PortalRole[]
  eventType: string
  entityType: string
  subjectPrefix: string
  buildPayload: (body: Record<string, unknown>) => {
    subject: string
    body: string
    recipientScope?: string
    metadata?: Record<string, unknown>
  }
  validate?: (
    body: Record<string, unknown>,
    context: Awaited<ReturnType<typeof requirePortalUser>>,
  ) => Promise<Record<string, unknown> | void>
}

export async function logPortalAction({
  request,
  allowedRoles,
  eventType,
  entityType,
  subjectPrefix,
  buildPayload,
  validate,
}: PortalActionInput) {
  try {
    const { profile, service } = await requirePortalUser(allowedRoles)
    const body = await request.json()
    const validatedMetadata = (await validate?.(body, { profile, service } as Awaited<ReturnType<typeof requirePortalUser>>)) || {}
    const payload = buildPayload(body)
    const subject = `${subjectPrefix}: ${payload.subject}`.slice(0, 240)
    const messageBody = payload.body.trim()

    if (!payload.subject.trim() || !messageBody) {
      return NextResponse.json({ error: 'Action title and details are required.' }, { status: 400 })
    }

    const { data, error } = await service
      .from('portal_messages')
      .insert({
        submitted_by: profile.id,
        role: profile.role,
        channel: 'support',
        subject,
        body: messageBody,
        recipient_scope: safeRecipientScope(profile.role, payload.recipientScope),
      })
      .select('id, subject, status, created_at')
      .single()

    if (error) throw error

    await service.from('audit_events').insert({
      actor_id: profile.id,
      actor_role: profile.role,
      event_type: eventType,
      entity_type: entityType,
      entity_id: data.id,
      summary: `${profile.full_name} logged ${subject}.`,
      metadata: { ...(payload.metadata || {}), ...validatedMetadata },
    })

    return NextResponse.json({ ok: true, action: data })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Portal action could not be completed.'
    const status = message.includes('Sign in') ? 401 : message.includes('permission') ? 403 : 500
    return NextResponse.json({ error: message }, { status })
  }
}

export function textValue(body: Record<string, unknown>, key: string, fallback = '') {
  return String(body[key] || fallback).trim()
}
