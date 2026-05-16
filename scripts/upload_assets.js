import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
// Load env vars manually
const env = fs.readFileSync('.env', 'utf8');
const supabaseUrl = env.match(/VITE_SUPABASE_URL=(.*)/)?.[1]?.trim();
const supabaseKey = env.match(/VITE_SUPABASE_ANON_KEY=(.*)/)?.[1]?.trim();
// Alternatively, if the user has a service role key, that would be better for a script.
// But we'll try with the anon key and tell them to ensure the policy is correct.

const supabase = createClient(supabaseUrl, supabaseKey);

const ASSETS_DIR = './public';
const BUCKET_NAME = 'portfolio';

const filesToUpload = [
  'dashboard-mockup.png',
  'dashboard-real.png',
  'projects-real.png',
  'resume-real.png',
  'vidintelligence-mistral.png',
  'vidintelligence-new.png',
  'youtube-engine-screenshot.png',
  'profile.png'
];

async function uploadFiles() {
  console.log('🚀 Starting Asset Migration to Supabase Storage...');

  for (const fileName of filesToUpload) {
    const filePath = path.join(ASSETS_DIR, fileName);
    
    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️  File not found: ${fileName}, skipping...`);
      continue;
    }

    const fileBuffer = fs.readFileSync(filePath);
    
    console.log(`⏳ Uploading ${fileName}...`);
    
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(fileName, fileBuffer, {
        upsert: true,
        contentType: 'image/png'
      });

    if (error) {
      console.error(`❌ Error uploading ${fileName}:`, error.message);
    } else {
      console.log(`✅ Successfully uploaded ${fileName}`);
    }
  }

  console.log('\n✨ Migration Complete!');
  console.log(`🔗 Your assets are now available at: ${supabaseUrl}/storage/v1/object/public/${BUCKET_NAME}/`);
}

uploadFiles();
