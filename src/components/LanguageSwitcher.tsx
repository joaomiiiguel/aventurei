'use client'

import { usePathname, useRouter } from 'next/navigation'
import { locales, type Locale } from '@/lib/i18n-config'
import { Globe } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

interface LanguageSwitcherProps {
  currentLocale: string
}

const localeNames: Record<Locale, string> = {
  'pt-br': 'PT-BR',
  'es': 'ES',
  'en': 'EN',
}

export function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const switchLocale = (newLocale: string) => {
    // Replace the current locale in the pathname with the new one
    const segments = pathname.split('/')
    segments[1] = newLocale
    const newPath = segments.join('/')
    
    // Set cookie to persist preference
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`
    
    // Navigate to new locale
    router.push(newPath)
    setIsOpen(false)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#00382F]/80 transition-colors hover:cursor-pointer ${isOpen ? "bg-[#00382F]/70" : ""}`}
        aria-label="Selecionar idioma"
      >
        <Globe className="h-5 w-5" />
        <span className="text-sm font-medium hidden sm:inline">
          {localeNames[currentLocale as Locale]}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-40 bg-[#00382F]/90 rounded-lg shadow-lg border border-[#00382F] py-1 z-50">
          {locales.map((locale) => (
            <button
              key={locale}
              onClick={() => switchLocale(locale)}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-white/20 transition-colors ${
                locale === currentLocale
                  ? 'bg-white/30 font-semibold'
                  : ''
              }`}
            >
              {localeNames[locale]}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
