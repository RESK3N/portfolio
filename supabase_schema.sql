-- Run this in your Supabase SQL Editor

-- 1. Projects Table
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  github_link TEXT,
  live_link TEXT,
  tags TEXT[], -- Array of strings
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Experience Table
CREATE TABLE experience (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company TEXT NOT NULL,
  role TEXT NOT NULL,
  duration TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Skills Table
CREATE TABLE skills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category TEXT NOT NULL, -- e.g., "Frontend", "Backend"
  items TEXT[], -- Array of strings
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. About Table (Single row typically)
CREATE TABLE about (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  content TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Set up Row Level Security (RLS)
-- Allow public read access to all tables
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read-only access." ON projects FOR SELECT USING (true);
CREATE POLICY "Allow authenticated full access." ON projects FOR ALL USING (auth.role() = 'authenticated');

ALTER TABLE experience ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read-only access." ON experience FOR SELECT USING (true);
CREATE POLICY "Allow authenticated full access." ON experience FOR ALL USING (auth.role() = 'authenticated');

ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read-only access." ON skills FOR SELECT USING (true);
CREATE POLICY "Allow authenticated full access." ON skills FOR ALL USING (auth.role() = 'authenticated');

ALTER TABLE about ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read-only access." ON about FOR SELECT USING (true);
CREATE POLICY "Allow authenticated full access." ON about FOR ALL USING (auth.role() = 'authenticated');

-- 5. Storage Bucket for Resume files
-- Run this SEPARATELY after the above if you get errors (storage.buckets may need to exist first)
INSERT INTO storage.buckets (id, name, public) VALUES ('resume', 'resume', true);

-- Allow public read access to resume files
CREATE POLICY "Allow public read access to resume" ON storage.objects
  FOR SELECT USING (bucket_id = 'resume');

-- Allow authenticated users to upload/update resume files
CREATE POLICY "Allow authenticated upload to resume" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'resume' AND auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update to resume" ON storage.objects
  FOR UPDATE USING (bucket_id = 'resume' AND auth.role() = 'authenticated');
