import type { SupabaseClient } from '@supabase/supabase-js'
import type { OnboardingRole } from '@/lib/onboarding'

type ApplicationForActivation = {
  id: string
  role: OnboardingRole
  full_name: string
  email: string
  phone?: string | null
  organisation_name?: string | null
  city?: string | null
}

export async function activateApplicationAccess({
  supabase,
  application,
}: {
  supabase: SupabaseClient
  application: ApplicationForActivation
}) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.tranzita.africa'
  const tempPassword = `Trz-${crypto.randomUUID()}-${Date.now()}`
  let authUserId: string | null = null

  const { data: existingProfile } = await supabase
    .from('app_users')
    .select('id, auth_user_id, role')
    .eq('email', application.email)
    .maybeSingle()

  if (existingProfile?.role && existingProfile.role !== application.role) {
    throw new Error(`This email already belongs to a ${existingProfile.role} portal profile. Use a different email before activating ${application.role} access.`)
  }

  if (existingProfile?.auth_user_id) {
    const existingAuthUserId = String(existingProfile.auth_user_id)
    authUserId = existingAuthUserId
    const { error: updateAuthError } = await supabase.auth.admin.updateUserById(existingAuthUserId, {
      app_metadata: { role: application.role },
      user_metadata: { full_name: application.full_name, role: application.role },
      email_confirm: true,
    })
    if (updateAuthError) throw new Error(updateAuthError.message)
  } else {
    const { data: created, error: createError } = await supabase.auth.admin.createUser({
      email: application.email,
      password: tempPassword,
      email_confirm: true,
      app_metadata: { role: application.role },
      user_metadata: { full_name: application.full_name, role: application.role },
    })

    if (createError || !created.user) throw new Error(createError?.message || 'Supabase auth user could not be created.')
    authUserId = created.user.id
  }

  const setupUrl = await createSetupLink({ supabase, email: application.email, siteUrl })
  const schoolId = application.role === 'school' ? await ensureSchoolRecord({ supabase, application }) : null

  const { data: profile, error: profileError } = await supabase
    .from('app_users')
    .upsert({
      auth_user_id: authUserId,
      email: application.email,
      phone: application.phone || null,
      full_name: application.full_name,
      role: application.role,
      school_id: schoolId,
      is_active: true,
    }, { onConflict: 'email' })
    .select('id, auth_user_id')
    .single()

  if (profileError || !profile) throw new Error(profileError?.message || 'Portal profile could not be created.')

  await supabase
    .from('applications')
    .update({ activated_user_id: profile.id })
    .eq('id', application.id)

  return { authUserId, appUserId: profile.id, setupUrl }
}

async function createSetupLink({ supabase, email, siteUrl }: { supabase: SupabaseClient; email: string; siteUrl: string }) {
  const { data, error } = await supabase.auth.admin.generateLink({
    type: 'recovery',
    email,
    options: { redirectTo: `${siteUrl}/auth/signin` },
  })

  if (error || !data.properties?.action_link) throw new Error(error?.message || 'Portal setup link could not be generated.')
  return data.properties.action_link
}

async function ensureSchoolRecord({ supabase, application }: { supabase: SupabaseClient; application: ApplicationForActivation }) {
  const schoolName = application.organisation_name || `${application.full_name} School`
  const { data: existing } = await supabase
    .from('schools')
    .select('id')
    .eq('contact_email', application.email)
    .maybeSingle()

  if (existing?.id) return existing.id

  const { data, error } = await supabase
    .from('schools')
    .insert({
      name: schoolName,
      city: application.city || 'Lagos',
      contact_name: application.full_name,
      contact_email: application.email,
      contact_phone: application.phone || null,
      onboarding_status: 'activated',
      subscription_status: 'active',
    })
    .select('id')
    .single()

  if (error || !data) throw new Error(error?.message || 'School record could not be created.')
  return data.id
}
