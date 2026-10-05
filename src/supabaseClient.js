import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zzvkgalsgtqxprfjkmbr.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp6dmtnYWxzZ3RxeHByZmprbWJyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTExNzY0NzIsImV4cCI6MjEwNjc1MjQ3Mn0.v9uOH11Melp9Ij1UfLN70T-T-knHjEy4KU8j78VBYdc'

export const supabase = createClient(supabaseUrl, supabaseKey)