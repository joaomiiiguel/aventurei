'use client'

import { createContext, useContext, ReactNode } from 'react'

// Type for our dictionary
export type Dictionary = Record<string, any>

// Create context with empty object as default
const LocaleContext = createContext<Dictionary>({})

interface LocaleProviderProps {
  children: ReactNode
  dictionary: Dictionary
}

/**
 * LocaleProvider - Provides translations to all child components
 * This should be used in the layout to wrap the app and provide translations
 */
export function LocaleProvider({ children, dictionary }: LocaleProviderProps) {
  return (
    <LocaleContext.Provider value={dictionary}>
      {children}
    </LocaleContext.Provider>
  )
}

/**
 * useTranslations - Hook to access translations in client components
 * @returns Dictionary object with all translations
 * 
 * @example
 * const t = useTranslations()
 * return <h1>{t.hero_title}</h1>
 */
export function useTranslations() {
  const context = useContext(LocaleContext)

  if (!context) {
    throw new Error('useTranslations must be used within a LocaleProvider')
  }

  return context
}

/**
 * Helper function to get a translation with fallback
 */
export function useTranslation(key: string, fallback?: string): string {
  const translations = useTranslations()
  return translations[key] || fallback || key
}
