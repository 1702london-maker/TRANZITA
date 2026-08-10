import { NextResponse } from 'next/server'
import { requirePortalUser } from '@/lib/server-portal'

export async function POST(request: Request) {
  try {
    const { profile, service } = await requirePortalUser()
    const body = await request.json()
    const subject = String(body.subject || '').trim()
    const details = String(body.details || '').trim()
    const priority = String(body.priority || 'normal').toLowerCase()

    if (!subject || !details) return NextResponse.json({ error: 'Subject and details are required.' }, { status: 400 })

    const { data, error } = await service
      .from('portal_complaints')
      .insert({ submitted_by: profile.id, role: profile.role, subject, priority, details })
      .select('id, status, created_at')
      .single()

    if (error) throw error

    await service.from('audit_events').insert({
      actor_id: profile.id,
      actor_role: profile.role,
      event_type: 'portal_complaint_created',
      entity_type: 'portal_complaint',
      entity_id: data.id,
      summary: `${profile.full_name} submitted a ${priority} complaint.`,
      metadata: { subject },
    })

    return NextResponse.json({ ok: true, complaint: data })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Complaint could not be submitted.'
    const status = message.includes('Sign in') ? 401 : message.includes('permission') ? 403 : 500
    return NextResponse.json({ error: message }, { status })
  }
}
