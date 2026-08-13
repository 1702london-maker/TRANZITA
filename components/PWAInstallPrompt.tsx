'use client'

import { useEffect, useState } from 'react'
import { Download, Smartphone, X } from 'lucide-react'

type InstallPromptEvent = Event & {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export default function PWAInstallPrompt() {
  const [installEvent, setInstallEvent] = useState<InstallPromptEvent | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const dismissed = window.localStorage.getItem('tranzita-pwa-dismissed')

    function handleBeforeInstallPrompt(event: Event) {
      event.preventDefault()
      setInstallEvent(event as InstallPromptEvent)
      if (!dismissed) setVisible(true)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
  }, [])

  async function installApp() {
    if (!installEvent) return
    await installEvent.prompt()
    await installEvent.userChoice.catch(() => undefined)
    setVisible(false)
    setInstallEvent(null)
  }

  function dismiss() {
    window.localStorage.setItem('tranzita-pwa-dismissed', 'true')
    setVisible(false)
  }

  if (!visible || !installEvent) return null

  return (
    <div className="fixed inset-x-3 bottom-[92px] z-[10000] mx-auto max-w-md rounded-[24px] border border-[#DDE9D2] bg-white p-4 shadow-2xl sm:bottom-5">
      <div className="flex items-start gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#FFF0E4] text-[#D96B1F]">
          <Smartphone size={22} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-extrabold text-[#183024]">Install Tranzita</p>
          <p className="mt-1 text-xs font-semibold leading-5 text-[#65785F]">Add the PWA to this phone for faster parent, school, crew and partner portal access.</p>
          <div className="mt-3 flex gap-2">
            <button type="button" onClick={installApp} className="inline-flex items-center gap-2 rounded-full bg-[#D96B1F] px-4 py-2 text-xs font-extrabold text-white">
              <Download size={15} /> Install
            </button>
            <button type="button" onClick={dismiss} className="rounded-full bg-[#F1F6EA] px-4 py-2 text-xs font-extrabold text-[#183024]">
              Later
            </button>
          </div>
        </div>
        <button type="button" onClick={dismiss} className="rounded-full p-1 text-[#65785F]" aria-label="Dismiss install prompt">
          <X size={17} />
        </button>
      </div>
    </div>
  )
}
