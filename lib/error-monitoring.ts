import 'server-only'

export function reportError(error: unknown, context: Record<string, unknown>) {
  const message = error instanceof Error ? error.message : String(error)
  console.error(JSON.stringify({
    level: 'error',
    message,
    timestamp: new Date().toISOString(),
    ...context,
  }))

  if (process.env.SENTRY_DSN) {
    void import('@sentry/nextjs')
      .then((Sentry) => Sentry.captureException(error, { extra: context }))
      .catch(() => {})
  }
}
