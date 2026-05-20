/**
 * Supabase client factories.
 *
 * - getSupabaseAdminClient()   — server-side, uses SERVICE_ROLE_KEY if available,
 *   falls back to anon key. Used in API routes for writes.
 * - getSupabaseBrowserClient() — for the browser (anon key only).
 *
 * Returns `null` if Supabase isn't configured so the app degrades gracefully
 * (payment can still succeed even if saving the order to the DB fails).
 */

import {
  createClient,
  type SupabaseClient,
} from '@supabase/supabase-js'

let adminClient: SupabaseClient | null | undefined
let browserClient: SupabaseClient | null | undefined

export function getSupabaseAdminClient(): SupabaseClient | null {
  if (adminClient !== undefined) return adminClient

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    // eslint-disable-next-line no-console
    console.warn(
      '[supabase] NEXT_PUBLIC_SUPABASE_URL and a key (service role or anon) are required. Order persistence disabled.',
    )
    adminClient = null
    return null
  }

  adminClient = createClient(url, key, {
    auth: { persistSession: false },
  })
  return adminClient
}

export function getSupabaseBrowserClient(): SupabaseClient | null {
  if (browserClient !== undefined) return browserClient

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    browserClient = null
    return null
  }

  browserClient = createClient(url, key, {
    auth: { persistSession: false },
  })
  return browserClient
}
