import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://sfpexkpxgcmwcxilemqi.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNmcGV4a3B4Z2Ntd2N4aWxlbXFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE0MDEyNjYsImV4cCI6MjAwNjk3NzI2Nn0.1hSQ07ixyVt9VNVlMnRxfBv5uLECKiRdBT9aZKYWArU";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
