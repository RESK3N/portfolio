import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const envFile = fs.readFileSync('.env', 'utf-8');
const envVars = envFile.split('\n').reduce((acc, line) => {
  const [key, ...value] = line.split('=');
  if (key && value) acc[key.trim()] = value.join('=').trim().replace(/['"]/g, '');
  return acc;
}, {});

const supabase = createClient(envVars.VITE_SUPABASE_URL, envVars.VITE_SUPABASE_ANON_KEY);


async function fixProject() {
  console.log('Fixing project...');

  // 1. Ensure bucket exists
  const { data: buckets, error: bucketError } = await supabase.storage.listBuckets();
  if (bucketError) {
    console.error('Error listing buckets:', bucketError);
  } else {
    const bucketExists = buckets.find(b => b.name === 'project-images');
    if (!bucketExists) {
      console.log('Bucket project-images not found. Creating it...');
      const { error: createError } = await supabase.storage.createBucket('project-images', { public: true });
      if (createError) console.error('Error creating bucket:', createError);
      else console.log('Bucket created successfully.');
    }
  }

  // 2. Upload image
  const imagePath = '/Users/resken/Desktop/Langchain/app_screenshot_after_use_v2.png';
  let imageUrl = null;
  
  if (fs.existsSync(imagePath)) {
    console.log('Uploading image...');
    const fileBuffer = fs.readFileSync(imagePath);
    const fileName = `youtube-engine-${Date.now()}.png`;
    
    const { error: uploadError } = await supabase.storage
      .from('project-images')
      .upload(fileName, fileBuffer, {
        contentType: 'image/png',
        upsert: true
      });

    if (uploadError) {
      console.error('Upload error:', uploadError);
    } else {
      const { data } = supabase.storage.from('project-images').getPublicUrl(fileName);
      imageUrl = data.publicUrl;
      console.log('Image uploaded successfully:', imageUrl);
  const imageUrl = '/youtube-engine-screenshot.png';

  // 3. Update project
  console.log('Updating project in database...');
  
  // Find the project first
  const { data: projects } = await supabase.from('projects').select('*');
  const projectToUpdate = projects.find(p => p.title.toLowerCase().includes('vidintelligence') || p.title.toLowerCase().includes('youtube'));
  
  if (projectToUpdate) {
    const updateData = {
      image_url: imageUrl
    };

    const { error: updateError } = await supabase.from('projects')
      .update(updateData)
      .eq('id', projectToUpdate.id);
      
    if (updateError) {
      console.error('Error updating project:', updateError);
    } else {
      console.log('Project updated successfully!');
    }
  } else {
    console.log('Could not find project to update.');
  }
}

fixProject();
