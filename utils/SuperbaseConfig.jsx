import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabase = createClient('https://gjlwbqugbiqwrohmgcnr.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdqbHdicXVnYmlxd3JvaG1nY25yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk3Mjg2NDUsImV4cCI6MjA1NTMwNDY0NX0.iaZjBTZKrZKTeYks-FQ-TreQwIFSKY9Vfzh7GrjffwA')
