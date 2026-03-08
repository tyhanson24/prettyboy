import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const SUPABASE_URL = 'https://skugeflfcixakuctbklz.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNrdWdlZmxmY2l4YWt1Y3Ria2x6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwMDc4MzQsImV4cCI6MjA4ODU4MzgzNH0.D-shN59rMyK0sz1QGZH5rivcLlvb5KvCyezKyMKG3QY'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
