import { createClient } from '@supabase/supabase-js'
import { supabase as mockClient } from './supabaseClient.mock'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder'

const realClient = createClient(supabaseUrl, supabaseAnonKey)

// If VITE_MOCK_AUTH is set to 'true', export the mock client
export const supabase = import.meta.env.VITE_MOCK_AUTH === 'true' ? mockClient : realClient

export const getStorageUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http')) return path; // Already a full URL
  return `${supabaseUrl}/storage/v1/object/public/portfolio/${path}`;
};
