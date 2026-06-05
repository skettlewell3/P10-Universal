import { createClient } from '@supabase/supabase-js'

const supabaseURL = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseURL || !supabaseAnonKey) {
  console.error("Supabase URL or anon key is missing. Make sure you have a .env file set up!");
}

export const supabase = createClient(supabaseURL, supabaseAnonKey)