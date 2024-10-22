import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabase = createClient('https://bnplivusijobfbodvuxy.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJucGxpdnVzaWpvYmZib2R2dXh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY5Njk3MzEsImV4cCI6MjAyMjU0NTczMX0.VX0ZmE0Cva4GwpkyfcHgkFUwzH_edH9ytEp2erfctLk')
