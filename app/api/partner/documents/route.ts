import { logPortalAction, textValue } from '@/app/api/portal-action-utils'

export async function POST(request: Request) {
  return logPortalAction({
    request,
    allowedRoles: ['partner', 'admin'],
    eventType: 'partner_document_action_logged',
    entityType: 'partner_document_action',
    subjectPrefix: 'Partner document',
    buildPayload: (body) => {
      const vehicleId = textValue(body, 'vehicleId', 'Partner vehicle')
      const documentType = textValue(body, 'documentType', 'Vehicle document')
      const expiryDate = textValue(body, 'expiryDate', 'Expiry date pending')
      const action = textValue(body, 'action', 'submitted for review')
      return {
        subject: `${documentType} for ${vehicleId}`,
        body: `${documentType} on ${vehicleId} was ${action}. Expiry/date: ${expiryDate}. Partner-scoped vehicle document only.`,
        recipientScope: 'partner_vehicle_documents',
        metadata: { vehicleId, documentType, expiryDate, action },
      }
    },
  })
}
