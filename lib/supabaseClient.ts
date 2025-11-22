import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://twuxcytoffbnrqsbhkos.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR3dXhjeXRvZmZibnJxc2Joa29zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM4MzAzODcsImV4cCI6MjA3OTQwNjM4N30.SN0CBnOdzhOp5gYgz_oJY-VcBe-5Aa4xEZ0vFovPL0I';

export const supabase = createClient(supabaseUrl, supabaseKey);