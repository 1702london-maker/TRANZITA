import { logPortalAction, textValue } from '@/lib/portal-action-utils'

export async function POST(request: Request) {
  return logPortalAction({
    request,
    allowedRoles: ['nurse', 'admin'],
    eventType: 'nurse_emergency_event_logged',
    entityType: 'nurse_emergency_event',
    subjectPrefix: 'Emergency event',
    buildPayload: (body) => {
      const type = textValue(body, 'type', 'operations')
      const child = textValue(body, 'child', 'Route child')
      const note = textValue(body, 'note', 'Emergency escalation started by onboard nurse.')
      return {
        subject: `${type} escalation`,
        body: `${child}: ${note}`,
        recipientScope: 'medical_operations',
        metadata: { type, child },
      }
    },
  })
}
