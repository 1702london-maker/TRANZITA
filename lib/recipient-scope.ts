import type { PortalRole } from '@/lib/server-portal'

const roleScopes: Record<PortalRole, Set<string>> = {
  admin: new Set(['operations', 'admin_operations', 'medical_operations', 'school_safeguarding', 'partner_vehicle_documents', 'partner_vehicle_inspections', 'operations_parent_notify', 'nurse_record']),
  school: new Set(['operations', 'school_safeguarding']),
  parent: new Set(['operations', 'parent_support']),
  driver: new Set(['operations', 'driver_operations']),
  codriver: new Set(['operations', 'copilot_operations']),
  nurse: new Set(['operations', 'medical_operations', 'nurse_record', 'operations_parent_notify', 'school_safeguarding']),
  partner: new Set(['operations', 'partner_vehicle_documents', 'partner_vehicle_inspections']),
}

export function safeRecipientScope(role: PortalRole, requested?: unknown) {
  const scope = typeof requested === 'string' ? requested.trim() : ''
  if (scope && roleScopes[role].has(scope)) return scope
  return role === 'admin' ? 'admin_operations' : 'operations'
}
