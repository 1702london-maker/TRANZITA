import { logPortalAction, textValue } from '@/app/api/portal-action-utils'

export async function POST(request: Request) {
  return logPortalAction({
    request,
    allowedRoles: ['partner', 'admin'],
    eventType: 'partner_inspection_action_logged',
    entityType: 'partner_inspection_action',
    subjectPrefix: 'Partner inspection',
    buildPayload: (body) => {
      const vehicleId = textValue(body, 'vehicleId', 'Partner vehicle')
      const inspectionId = textValue(body, 'inspectionId', 'inspection')
      const action = textValue(body, 'action', 'attendance confirmed')
      const note = textValue(body, 'note', 'Inspection action logged for partner vehicle.')
      return {
        subject: `${action} for ${vehicleId}`,
        body: `${inspectionId}: ${note}`,
        recipientScope: 'partner_vehicle_inspections',
        metadata: { vehicleId, inspectionId, action },
      }
    },
  })
}
