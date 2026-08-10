/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      { source: '/terms-of-service', destination: '/terms', permanent: true },
      { source: '/safety-policy', destination: '/safety', permanent: true },
      { source: '/schools', destination: '/auth/signin?next=/dashboard/school', permanent: false },
      { source: '/parents', destination: '/auth/signin?next=/dashboard/parent', permanent: false },
      { source: '/drivers', destination: '/auth/signin?next=/dashboard/driver', permanent: false },
    ]
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Content-Security-Policy', value: "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' fonts.googleapis.com; img-src 'self' data: blob:; font-src 'self' fonts.gstatic.com; connect-src 'self' https://*.supabase.co https://api.openai.com https://api.resend.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self'" },
        ],
      },
    ]
  },
}

module.exports = nextConfig
