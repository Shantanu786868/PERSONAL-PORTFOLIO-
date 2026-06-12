import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://afepnndyvrzskfrhneod.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFmZXBubmR5dnJ6c2tmcmhuZW9kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEyNDQ4OTQsImV4cCI6MjA5NjgyMDg5NH0.i3p4mcrWozzmPuhVZ9lNofbsTN4LvFI5PgIkNfRuHmI'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
