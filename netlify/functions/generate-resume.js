import { createClient } from '@supabase/supabase-js';
import { GoogleGenAI } from '@google/genai';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const geminiKey = process.env.GEMINI_API_KEY;

const RESUME_TEMPLATE_PREAMBLE = `\\documentclass[letterpaper,10pt]{article}

\\usepackage{latexsym}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{marvosym}
\\usepackage[usenames,dvipsnames]{color}
\\usepackage{verbatim}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{fancyhdr}
\\usepackage[english]{babel}
\\usepackage{tabularx}
\\usepackage[scaled]{helvet}
\\renewcommand\\familydefault{\\sfdefault}
\\usepackage[T1]{fontenc}
\\input{glyphtounicode}

\\pagestyle{fancy}
\\fancyhf{}
\\fancyfoot{}
\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0pt}

\\addtolength{\\oddsidemargin}{-0.5in}
\\addtolength{\\evensidemargin}{-0.5in}
\\addtolength{\\textwidth}{1in}
\\addtolength{\\topmargin}{-.5in}
\\addtolength{\\textheight}{1.0in}

\\urlstyle{same}
\\raggedbottom
\\raggedright
\\setlength{\\tabcolsep}{0in}

\\titleformat{\\section}{\\Large\\bfseries\\scshape\\raggedright}{}{0em}{}[\\titlerule]
\\pdfgentounicode=1

\\newcommand{\\resumeItem}[1]{\\item\\small{#1}}
\\newcommand{\\resumeSubheading}[4]{
\\vspace{-1pt}\\item
  \\begin{tabular*}{0.97\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
    \\textbf{#1} & #2 \\\\
    \\textit{#3} & \\textit{#4} \\\\
  \\end{tabular*}\\vspace{-7pt}
}
\\newcommand{\\resumeSubHeadingList}{\\begin{itemize}[leftmargin=0.15in, label={}]}
\\newcommand{\\resumeSubHeadingListEnd}{\\end{itemize}}`;

export default async (req) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  if (req.method === 'OPTIONS') {
    return new Response('ok', { status: 200, headers });
  }

  if (!geminiKey) {
    return new Response(JSON.stringify({ error: 'GEMINI_API_KEY not configured' }), { status: 500, headers });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch all portfolio data
    const [aboutRes, expRes, projRes, skillsRes] = await Promise.all([
      supabase.from('about').select('*').limit(1),
      supabase.from('experience').select('*').order('created_at', { ascending: false }),
      supabase.from('projects').select('*').order('created_at', { ascending: false }),
      supabase.from('skills').select('*').order('created_at', { ascending: true }),
    ]);

    const aboutContent = aboutRes.data?.[0]?.content || '';
    const experiences = expRes.data || [];
    const projects = projRes.data || [];
    const skills = skillsRes.data || [];

    // Build the prompt for Gemini
    const prompt = `You are a LaTeX resume generator. You MUST generate ONLY the \\begin{document}...\\end{document} body content for a resume using specific custom macros. Do NOT include any preamble, do NOT include \\documentclass, do NOT include any \\usepackage commands. Start directly with \\begin{document}.

CRITICAL RULES:
1. Use ONLY these custom macros: \\resumeItem{}, \\resumeSubheading{arg1}{arg2}{arg3}{arg4}, \\resumeSubHeadingList, \\resumeSubHeadingListEnd
2. Escape special LaTeX characters: use \\& for &, -- for dashes, \\% for %
3. Section order MUST be: Header → Summary → Technical Skills → Experience → Projects → Education → Certifications
4. For skills: each category is \\resumeItem{\\textbf{Category:} item1, item2, item3}
5. For experience: \\resumeSubheading{Role}{Duration}{Company}{} then \\resumeItem{bullet point} for each bullet
6. For projects: \\resumeSubheading{Title}{}{}{Tech, Stack, Here} then \\resumeItem{bullet point} for each bullet. The tech stack goes in arg4.
7. Education and Certifications sections should use the same static data provided.
8. Keep bullet points concise — one line each, no periods at end.
9. Output ONLY raw LaTeX code. No markdown, no code fences, no explanations.

PERSONAL INFO (static — always include):
Name: Pritam Mondal
Phone: +91-8967345961
Email: 999.pritammondal@gmail.com
LinkedIn: linkedin.com/in/resken
GitHub: github.com/resk3n

SUMMARY:
${aboutContent}

SKILLS DATA (from database):
${JSON.stringify(skills.map(s => ({ category: s.category, items: s.items })))}

EXPERIENCE DATA (from database):
${JSON.stringify(experiences.map(e => ({ role: e.role, company: e.company, duration: e.duration, bullets: e.description.split('\\n').filter(l => l.trim()) })))}

PROJECTS DATA (from database):
${JSON.stringify(projects.map(p => ({ title: p.title, tags: p.tags, bullets: p.description.split('. ').filter(s => s.trim()) })))}

EDUCATION (static — always include exactly):
- Adamas University, 2023 -- 2027, B.Tech in Computer Science and Engineering (CGPA: 8.3)
- Kalyani Public School (CBSE), 2021, Class XII -- 69.4\\%
- Cygnet Day School (ICSE), 2019, Class X -- 74\\%

CERTIFICATIONS (static — always include exactly):
- NPTEL Elite Certification -- Advanced C++
- C Programming Certification -- Great Learning
- GDSC Cohort '25
- Robotics using AutoCAD

Generate the \\begin{document}...\\end{document} body now:`;

    // Call Gemini AI
    const ai = new GoogleGenAI({ apiKey: geminiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    let texBody = response.text;
    
    // Clean up any markdown code fences if Gemini adds them
    texBody = texBody.replace(/```latex\n?/g, '').replace(/```\n?/g, '').trim();

    // Combine preamble + body
    const fullTex = RESUME_TEMPLATE_PREAMBLE + '\n\n' + texBody + '\n';

    // Store in Supabase Storage
    const fileName = 'resume.tex';
    const { error: uploadError } = await supabase.storage
      .from('resume')
      .upload(fileName, fullTex, {
        contentType: 'text/plain',
        upsert: true,
      });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      return new Response(JSON.stringify({ error: 'Failed to upload .tex file', details: uploadError.message }), { status: 500, headers });
    }

    // Get public URL
    const { data: urlData } = supabase.storage.from('resume').getPublicUrl(fileName);
    const texUrl = urlData.publicUrl;

    // Generate PDF URL via latexonline.cc
    const pdfUrl = `https://latexonline.cc/compile?url=${encodeURIComponent(texUrl)}`;

    return new Response(JSON.stringify({
      success: true,
      texUrl,
      pdfUrl,
      texContent: fullTex,
    }), { status: 200, headers });

  } catch (error) {
    console.error('Error generating resume:', error);
    return new Response(JSON.stringify({ error: 'Failed to generate resume', details: error.message }), { status: 500, headers });
  }
};

export const config = {
  path: '/.netlify/functions/generate-resume',
};
