// db/supabaseClient.js
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config(); // Ensure env variables are loaded

const supaBaseUrl = process.env.SUPABASE_URL;
const supaBaseKey = process.env.SUPABASE_KEY;

export const SupabaseConnect = createClient(supaBaseUrl, supaBaseKey);