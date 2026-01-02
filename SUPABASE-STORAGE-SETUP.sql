/*
  ========================================
  SUPABASE STORAGE SETUP - RENOVE SOLAR
  ========================================
  
  Execute este script no SQL Editor do Supabase:
  1. Go to https://supabase.com/dashboard
  2. Select your project: wbenstlbxxlmqwhpvose
  3. Go to SQL Editor
  4. Paste this entire script
  5. Click "Run" ▶️
*/

-- ========================================
-- 1. CREATE STORAGE BUCKET
-- ========================================
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'renove-images', 
  'renove-images', 
  true, 
  5242880, -- 5MB em bytes
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/jpg']
) ON CONFLICT (id) DO NOTHING;

-- ========================================
-- 2. CREATE POLICIES FOR PUBLIC ACCESS
-- ========================================

-- Policy: Anyone can view images
CREATE POLICY "Anyone can view images"
  ON storage.objects
  FOR SELECT
  TO anon
  USING (bucket_id = 'renove-images');

-- Policy: Anyone can upload images (for admin use)
CREATE POLICY "Anyone can upload images"
  ON storage.objects
  FOR INSERT
  TO anon
  WITH CHECK (bucket_id = 'renove-images');

-- Policy: Anyone can update images (for admin use)
CREATE POLICY "Anyone can update images"
  ON storage.objects
  FOR UPDATE
  TO anon
  USING (bucket_id = 'renove-images')
  WITH CHECK (bucket_id = 'renove-images');

-- Policy: Anyone can delete images (for admin use)
CREATE POLICY "Anyone can delete images"
  ON storage.objects
  FOR DELETE
  TO anon
  USING (bucket_id = 'renove-images');

-- ========================================
-- 3. CREATE TABLE FOR IMAGE METADATA
-- ========================================
CREATE TABLE IF NOT EXISTS image_metadata (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL, -- 'hero' or 'project'
  project_id integer, -- para projetos
  file_path text NOT NULL,
  file_size bigint,
  mime_type text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE image_metadata ENABLE ROW LEVEL SECURITY;

-- Policies for image_metadata
CREATE POLICY "Anyone can view image metadata"
  ON image_metadata
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Anyone can insert image metadata"
  ON image_metadata
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anyone can update image metadata"
  ON image_metadata
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete image metadata"
  ON image_metadata
  FOR DELETE
  TO anon
  USING (true);

-- ========================================
-- 4. CREATE INDEXES
-- ========================================
CREATE INDEX IF NOT EXISTS idx_image_metadata_type ON image_metadata(type);
CREATE INDEX IF NOT EXISTS idx_image_metadata_project_id ON image_metadata(project_id);
CREATE INDEX IF NOT EXISTS idx_image_metadata_created_at ON image_metadata(created_at DESC);

-- ========================================
-- 5. TRIGGER FOR UPDATED_AT
-- ========================================
CREATE OR REPLACE FUNCTION update_image_metadata_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_image_metadata_updated_at 
  BEFORE UPDATE ON image_metadata 
  FOR EACH ROW EXECUTE FUNCTION update_image_metadata_updated_at();

-- ========================================
-- 6. SAMPLE DATA (Optional)
-- ========================================
-- Inserir metadados para imagens padrão
INSERT INTO image_metadata (name, type, file_path, file_size, mime_type)
VALUES 
  ('hero-default', 'hero', 'hero-default.jpg', 0, 'image/jpeg'),
  ('project-1', 'project', 'project-1.jpg', 0, 'image/jpeg'),
  ('project-2', 'project', 'project-2.jpg', 0, 'image/jpeg'),
  ('project-3', 'project', 'project-3.jpg', 0, 'image/jpeg')
ON CONFLICT DO NOTHING;

-- ========================================
-- 7. COMPLETION MESSAGE
-- ========================================
DO $$
BEGIN
  RAISE NOTICE '===========================================';
  RAISE NOTICE '✅ SUPABASE STORAGE SETUP COMPLETE!';
  RAISE NOTICE '===========================================';
  RAISE NOTICE 'Bucket created: renove-images';
  RAISE NOTICE 'File size limit: 5MB';
  RAISE NOTICE 'Allowed formats: JPEG, PNG, WebP';
  RAISE NOTICE 'Public access: ENABLED';
  RAISE NOTICE 'Metadata table: image_metadata';
  RAISE NOTICE '';
  RAISE NOTICE 'Next steps:';
  RAISE NOTICE '  1. Test upload functionality';
  RAISE NOTICE '  2. Update AdminPanel component';
  RAISE NOTICE '  3. Test image persistence';
  RAISE NOTICE '  4. Deploy to production';
  RAISE NOTICE '===========================================';
END $$;
