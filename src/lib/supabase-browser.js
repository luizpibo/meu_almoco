import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
// NOTE: `createBrowserSupabaseClient` has been renamed to `createPagesBrowserClient` in version `0.7.0`

const supabase = createBrowserSupabaseClient();

export default supabase;