-- ==========================================
-- NUCLEAR STORAGE FIX (Run this to fix uploads)
-- ==========================================
-- INSTRUCTIONS:
-- 1. Copy the content of this file.
-- 2. Go to your Supabase Dashboard: https://supabase.com/dashboard
-- 3. Navigate to the "SQL Editor" tab (Icon with >_).
-- 4. Paste this code and click "Run".
-- NOTE: Do NOT try to run this from VS Code unless you have a direct database connection set up.
-- ==========================================

-- 1. DATABASE TABLES (Clean Slate)
DROP TABLE IF EXISTS public.business_scores CASCADE;
DROP TABLE IF EXISTS public.pathway_progress CASCADE;
DROP TABLE IF EXISTS public.assets CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;

-- Create Tables
CREATE TABLE public.profiles (
    id TEXT PRIMARY KEY, 
    email TEXT,
    full_name TEXT,
    role TEXT CHECK (role IN ('admin', 'provider', 'intern')) DEFAULT 'provider',
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    last_seen_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

CREATE TABLE public.pathway_progress (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id TEXT REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    layer_id TEXT NOT NULL,
    pathway_id TEXT NOT NULL,
    status TEXT CHECK (status IN ('locked', 'in-progress', 'completed')) DEFAULT 'in-progress',
    evidence_url TEXT, 
    details JSONB,     
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    UNIQUE(user_id, layer_id, pathway_id)
);

CREATE TABLE public.business_scores (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id TEXT REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    foundation_score INT DEFAULT 0,
    patient_flow_score INT DEFAULT 0,
    outreach_score INT DEFAULT 0,
    network_score INT DEFAULT 0,
    total_score INT DEFAULT 0,
    calculated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    UNIQUE(user_id)
);

CREATE TABLE public.assets (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    type TEXT CHECK (type IN ('video', 'pdf', 'image', 'link')) NOT NULL,
    url TEXT NOT NULL,
    pathway_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 2. DISABLE ROW SECURITY 
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.pathway_progress DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_scores DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.assets DISABLE ROW LEVEL SECURITY;

GRANT ALL ON ALL TABLES IN SCHEMA public TO anon;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- 3. STORAGE SETUP (THE FIX)
-- Make sure the bucket exists
INSERT INTO storage.buckets (id, name, public) 
VALUES ('pathway-uploads', 'pathway-uploads', true)
ON CONFLICT (id) DO NOTHING;

-- NUCLEAR PERMISSIONS FOR STORAGE
-- Allow Anon to USE the storage schema
GRANT USAGE ON SCHEMA storage TO anon;
GRANT USAGE ON SCHEMA storage TO authenticated;

-- Allow Anon to TOUCH the tables
GRANT ALL ON TABLE storage.buckets TO anon;
GRANT ALL ON TABLE storage.objects TO anon;
GRANT ALL ON TABLE storage.buckets TO authenticated;
GRANT ALL ON TABLE storage.objects TO authenticated;

-- Clean old policies
DROP POLICY IF EXISTS "Public Access Bucket" ON storage.objects;
DROP POLICY IF EXISTS "Public Pathway Uploads" ON storage.objects;

-- Create the Wide Open Policy
CREATE POLICY "Public Pathway Uploads" ON storage.objects FOR ALL USING ( bucket_id = 'pathway-uploads' ) WITH CHECK ( bucket_id = 'pathway-uploads' );

-- 4. DEMO DATA
INSERT INTO public.profiles (id, full_name, role, email) 
VALUES ('demo-1', 'Dr. Arjun Verma', 'provider', 'arjun@demo.com')
ON CONFLICT DO NOTHING;

INSERT INTO public.business_scores (user_id, foundation_score, patient_flow_score, total_score)
VALUES ('demo-1', 10, 5, 15)
ON CONFLICT DO NOTHING;
