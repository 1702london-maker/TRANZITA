import { redirect } from 'next/navigation'

export default function PartnerPortalPage() {
  redirect('/auth/signin?role=partner&next=/dashboard/partner')
}
