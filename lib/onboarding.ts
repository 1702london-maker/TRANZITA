export const onboardingRoles = ['school', 'parent', 'driver', 'codriver', 'nurse', 'partner'] as const

export type OnboardingRole = (typeof onboardingRoles)[number]

export type ApplicationStatus =
  | 'submitted'
  | 'under_review'
  | 'documents_requested'
  | 'payment_required'
  | 'payment_confirmed'
  | 'approved'
  | 'activated'
  | 'rejected'
  | 'suspended'

export const roleLabels: Record<OnboardingRole, string> = {
  school: 'School',
  parent: 'Parent',
  driver: 'Driver',
  codriver: 'Copilot',
  nurse: 'Nurse',
  partner: 'Partner',
}

export const applicationReceivedCopy: Record<OnboardingRole, { subject: string; headline: string; body: string; next: string[] }> = {
  school: {
    subject: 'We received your Tranzita school application',
    headline: 'Your school application is now with Tranzita.',
    body: 'Thank you for applying to use Tranzita as part of your school transport and safeguarding operation. Our team will review your school details, route needs, payment status, and onboarding requirements.',
    next: ['A Tranzita team member will contact your school.', 'We will confirm route scope, student onboarding, and setup fees.', 'Portal access is activated only after approval and payment confirmation.'],
  },
  parent: {
    subject: 'We received your Tranzita parent application',
    headline: 'Your parent registration is now with Tranzita.',
    body: 'Thank you for registering your interest in Tranzita for your child. Our team will review your details, confirm school and route availability, and contact you with the next steps.',
    next: ['We will confirm your child, school, and guardian details.', 'Payment or school approval may be required before access is activated.', 'You will receive portal instructions after approval.'],
  },
  driver: {
    subject: 'We received your Tranzita driver application',
    headline: 'Your application to become a Tranzita driver has been received.',
    body: 'Our operations team will review your application and get back to you for further documentation, background checks, licence review, and route-readiness screening.',
    next: ['Do not expect dashboard access yet.', 'We will request documents after the first review.', 'Access is activated only after clearance and assignment.'],
  },
  codriver: {
    subject: 'We received your Tranzita copilot application',
    headline: 'Your application to become a Tranzita copilot has been received.',
    body: 'Our team will review your safeguarding fit, identity details, and route-readiness. We will contact you for further documentation if your first review is successful.',
    next: ['We will contact you for the next vetting stage.', 'Portal access is not active during review.', 'Access is activated only after approval and assignment.'],
  },
  nurse: {
    subject: 'We received your Tranzita nurse application',
    headline: 'Your application to become a Tranzita onboard nurse has been received.',
    body: 'Our team will review your credentials, first-aid readiness, safeguarding fit, and route availability. We will contact you for further documentation after the first review.',
    next: ['Prepare registration and qualification documents.', 'Portal access is not active during review.', 'Access is activated only after approval and assignment.'],
  },
  partner: {
    subject: 'We received your Tranzita partner application',
    headline: 'Your partner intake application is now with Tranzita.',
    body: 'Thank you for applying to partner with Tranzita. Partner portal access is created by Tranzita only after vehicle intake, plate registration, document review, and approval.',
    next: ['We will review the vehicle details and plate numbers supplied.', 'Only approved Tranzita partner vehicles can be shown in your portal.', 'Partners cannot see child names, parent records, or private school data.'],
  },
}

export function isOnboardingRole(value: string): value is OnboardingRole {
  return onboardingRoles.includes(value as OnboardingRole)
}
