import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

export default async (req) => {
  const url = new URL(req.url);
  const type = url.searchParams.get('type'); // 'tex' or 'pdf'
  
  if (!type) {
    return new Response('Missing type parameter', { status: 400 });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);
  const fileName = 'resume.tex';
  const { data: { publicUrl: texUrl } } = supabase.storage.from('resume').getPublicUrl(fileName);

  if (type === 'tex') {
    return Response.redirect(texUrl, 302);
  }

  if (type === 'pdf') {
    const pdfUrl = `https://latexonline.cc/compile?url=${encodeURIComponent(texUrl)}`;
    return Response.redirect(pdfUrl, 302);
  }

  return new Response('Invalid type', { status: 400 });
};
