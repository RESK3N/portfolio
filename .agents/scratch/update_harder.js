import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const envPath = path.resolve(process.cwd(), '.env');
const envFile = fs.readFileSync(envPath, 'utf-8');
const envVars = envFile.split('\n').reduce((acc, line) => {
  const [key, ...value] = line.split('=');
  if (key && value.length > 0) acc[key.trim()] = value.join('=').trim().replace(/['"]/g, '');
  return acc;
}, {});

const supabase = createClient(envVars.VITE_SUPABASE_URL, envVars.VITE_SUPABASE_ANON_KEY);

async function updateProject() {
  console.log('Updating project to "Harder/Cooler" version...');
  
  const { data: projects } = await supabase.from('projects').select('*');
  const project = projects.find(p => p.title.toLowerCase().includes('vidintelligence'));

  if (project) {
    const { error } = await supabase.from('projects')
      .update({
        description: "YouTube Intelligence Studio: A high-performance AI engine for deep video analysis. Leverages parallel LLM pipelines to extract transcripts, generate executive summaries, and produce detailed PDF reports. Features a real-time Dash UI, context-aware Q&A, and high-speed processing with Groq and LangChain.",
        tags: ["Python", "Groq AI", "LangChain", "Dash UI", "Parallel Processing", "NLP"]
      })
      .eq('id', project.id);

    if (error) console.error('Error updating project:', error);
    else console.log('Database updated successfully!');
  } else {
    console.log('Project not found.');
  }
}

updateProject();
