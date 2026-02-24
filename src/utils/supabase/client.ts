import { createBrowserClient } from '@supabase/ssr'
import { useMemo } from 'react'

export function useSupabaseClient() {
  const supabaseClient = useMemo(() => {
    return createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  }, [])

  return supabaseClient
}