import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

// Manually parse .env because we are running in plain node
const envContent = fs.readFileSync('.env', 'utf8');
const env = Object.fromEntries(
  envContent.split('\n').filter(line => line.includes('=')).map(line => line.split('='))
);

const supabaseUrl = env.VITE_SUPABASE_URL.trim();
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY.trim();

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function seed() {
  console.log('Seeding data from resume.tex...');

  // 1. Seed About
  const aboutText = "AI-focused Computer Science student with hands-on experience in agentic AI systems, cloud automation, and computer vision. Skilled in building multi-agent workflows, integrating cloud AI services, and developing scalable automation pipelines for enterprise infrastructure operations.";
  const { error: err1 } = await supabase.from('about').upsert([{ content: aboutText }], { onConflict: 'content' });
  if (err1) console.error('Error seeding about:', err1);
  else console.log('✅ About seeded');

  // 2. Seed Experience
  const experiences = [
    {
      role: 'AI Engineer Intern',
      company: 'ATOS',
      duration: 'March 2026 -- Present',
      description: 'Developed AI-driven automation workflows for cloud-based infrastructure management in an enterprise environment\nIntegrated cloud AI services to enable intelligent decision-making and reduce manual effort\nDesigned scalable automation pipelines improving system efficiency and responsiveness\nCollaborated within a professional engineering team while adhering to strict security and confidentiality standards'
    }
  ];
  const { error: err2 } = await supabase.from('experience').upsert(experiences, { onConflict: 'company,role' });
  if (err2) console.error('Error seeding experience:', err2);
  else console.log('✅ Experience seeded');

  // 3. Seed Projects
  const projects = [
    {
      title: 'Automatic Number Plate Recognition (ANPR)',
      description: 'Built a real-time ANPR system using YOLOv8 for detection and EasyOCR for text recognition. Integrated ESP32-CAM for live video streaming and edge-based capture. Improved model accuracy through custom dataset training and tuning.',
      tags: ['Python', 'YOLOv8', 'EasyOCR', 'ESP32-CAM']
    },
    {
      title: 'Interdisciplinary Subject Selection System',
      description: 'Developed a full-stack web platform for course selection with admin and student dashboards. Handled workflows for 2500+ students with secure authentication and database management. Deployed on VPS and maintained system with continuous updates.',
      tags: ['HTML', 'Tailwind CSS', 'PHP', 'MySQL', 'AJAX']
    },
    {
      title: 'LLM-Based YouTube Video Summarizer',
      description: 'Built an automated pipeline to extract and summarize video transcripts using LLMs. Implemented chunking and context handling for long-form content processing. Generated structured summaries and PDF outputs.',
      tags: ['Python', 'LangChain', 'HuggingFace', 'Flask']
    }
  ];
  const { error: err3 } = await supabase.from('projects').upsert(projects, { onConflict: 'title' });
  if (err3) console.error('Error seeding projects:', err3);
  else console.log('✅ Projects seeded');

  // 4. Seed Skills
  const skills = [
    { category: 'Programming', items: ['Python', 'C', 'C++', 'Java'] },
    { category: 'AI/ML', items: ['YOLO', 'TensorFlow', 'HuggingFace', 'LangChain', 'OpenCV', 'EasyOCR', 'scikit-learn'] },
    { category: 'Cloud & DevOps', items: ['Microsoft Azure', 'Google Cloud', 'CI/CD', 'GitHub Actions'] },
    { category: 'Frameworks', items: ['Flask', 'Streamlit', 'Dash'] },
    { category: 'Databases', items: ['SQL', 'MongoDB'] },
    { category: 'Agentic AI', items: ['Microsoft Agent Framework', 'Multi-agent orchestration'] },
    { category: 'Other', items: ['Bash', 'Kali Linux', 'ESP32', 'Arduino'] }
  ];
  const { error: err4 } = await supabase.from('skills').upsert(skills, { onConflict: 'category' });
  if (err4) console.error('Error seeding skills:', err4);
  else console.log('✅ Skills seeded');

  console.log('\n🚀 ALL DONE! Check for errors above.');
}

seed().catch(err => console.error('Error seeding data:', err));
