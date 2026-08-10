'use client'

import { useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'

type PortalActionButtonProps = {
  actionType: string
  label: string
  entityType?: string
  metadata?: Record<string, unknown>
  className?: string
  style?: CSSProperties
  children?: ReactNode
}

export default function PortalActionButton({ actionType, label, entityType, metadata, className, style, children }: PortalActionButtonProps) {
  const [state, setState] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')

  async function handleClick() {
    setState('saving')
    const response = await fetch('/api/portal/actions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ actionType, label, entityType, metadata }),
    })
    setState(response.ok ? 'saved' : 'error')
  }

  const suffix = state === 'saving' ? '...' : state === 'saved' ? ' Saved' : state === 'error' ? ' Retry' : ''

  return (
    <button onClick={handleClick} className={className} style={style} type="button">
      {children || label}{suffix}
    </button>
  )
}
