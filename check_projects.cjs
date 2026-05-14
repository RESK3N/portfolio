
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://augtdugzpbkejuqnztmm.supabase.co';
const supabaseKey = 'sb_publishable_0KY1jT_SL6TRlbGHp3ka6g_YElJHA1j';
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkProjects() {
  const { data, error } = await supabase.from('projects').select('*');
  if (error) {
    console.error(error);
    return;
  }
  console.log(JSON.stringify(data, null, 2));
}

checkProjects();
