import { getServiceSupabase } from '@/lib/server-portal'

type Bucket = {
  count: number
  resetAt: number
}

const buckets = new Map<string, Bucket>()

export function rateLimit(key: string, limit = 8, windowMs = 60_000) {
  const now = Date.now()
  const bucket = buckets.get(key)

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs })
    return { ok: true, remaining: limit - 1, resetAt: now + windowMs }
  }

  if (bucket.count >= limit) {
    return { ok: false, remaining: 0, resetAt: bucket.resetAt }
  }

  bucket.count += 1
  return { ok: true, remaining: limit - bucket.count, resetAt: bucket.resetAt }
}

export async function durableRateLimit(key: string, limit = 8, windowMs = 60_000) {
  const since = new Date(Date.now() - windowMs).toISOString()

  try {
    const supabase = getServiceSupabase()
    const { count, error: countError } = await supabase
      .from('rate_limit_events')
      .select('id', { count: 'exact', head: true })
      .eq('key', key)
      .gte('created_at', since)

    if (countError) throw countError
    if ((count || 0) >= limit) return { ok: false, remaining: 0, resetAt: Date.now() + windowMs }

    const { error: insertError } = await supabase.from('rate_limit_events').insert({ key })
    if (insertError) throw insertError
    return { ok: true, remaining: limit - (count || 0) - 1, resetAt: Date.now() + windowMs }
  } catch {
    return { ok: false, remaining: 0, resetAt: Date.now() + windowMs }
  }
}

export function rateLimitKey(request: Request, scope: string) {
  const forwardedFor = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  const realIp = request.headers.get('x-real-ip')?.trim()
  return `${scope}:${forwardedFor || realIp || 'unknown'}`
}
