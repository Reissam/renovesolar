/*
  ========================================
  RENOVE SOLAR - DATABASE SETUP SCRIPT
  ========================================
  
  Execute this script in your Supabase SQL Editor:
  1. Go to https://supabase.com/dashboard
  2. Select your project: wbenstlbxxlmqwhpvose
  3. Go to SQL Editor
  4. Paste this entire script
  5. Click "Run" ▶️
*/

-- ========================================
-- 1. LEADS TABLE
-- ========================================
CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  consumption numeric,
  property_type text DEFAULT 'residential',
  city text,
  state text,
  best_contact_time text DEFAULT 'morning',
  lead_source text DEFAULT 'website',
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anonymous users to insert leads
CREATE POLICY "Allow anonymous insert"
  ON leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Allow service role to read all leads
CREATE POLICY "Allow service role to read all"
  ON leads
  FOR SELECT
  TO service_role
  USING (true);

-- Policy: Allow service role to update all leads
CREATE POLICY "Allow service role to update all"
  ON leads
  FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

-- ========================================
-- 2. ANALYTICS TABLES
-- ========================================

-- Page views tracking
CREATE TABLE IF NOT EXISTS page_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  user_id text,
  page_path text NOT NULL,
  referrer text,
  user_agent text,
  ip_address text,
  viewport_width integer,
  viewport_height integer,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous insert page_views"
  ON page_views
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow service role read page_views"
  ON page_views
  FOR SELECT
  TO service_role
  USING (true);

-- User interactions tracking
CREATE TABLE IF NOT EXISTS user_interactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  user_id text,
  interaction_type text NOT NULL,
  element text NOT NULL,
  properties jsonb,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE user_interactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous insert interactions"
  ON user_interactions
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow service role read interactions"
  ON user_interactions
  FOR SELECT
  TO service_role
  USING (true);

-- Form submissions tracking
CREATE TABLE IF NOT EXISTS form_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  form_name text NOT NULL,
  success boolean NOT NULL,
  error_count integer DEFAULT 0,
  errors jsonb,
  submission_data jsonb,
  session_id text,
  user_id text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous insert form_submissions"
  ON form_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow service role read form_submissions"
  ON form_submissions
  FOR SELECT
  TO service_role
  USING (true);

-- ========================================
-- 3. ADMIN TABLES
-- ========================================

-- Admin users (for future admin panel)
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  role text DEFAULT 'admin',
  is_active boolean DEFAULT true,
  last_login timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin users full access"
  ON admin_users
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- System settings
CREATE TABLE IF NOT EXISTS system_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value jsonb NOT NULL,
  description text,
  is_public boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE system_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read public settings"
  ON system_settings
  FOR SELECT
  TO anon
  USING (is_public = true);

CREATE POLICY "Service role full access settings"
  ON system_settings
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- ========================================
-- 4. PERFORMANCE MONITORING
-- ========================================

-- Performance metrics
CREATE TABLE IF NOT EXISTS performance_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_name text NOT NULL,
  metric_value numeric NOT NULL,
  metric_unit text,
  context jsonb,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE performance_metrics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous insert metrics"
  ON performance_metrics
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow service role read metrics"
  ON performance_metrics
  FOR SELECT
  TO service_role
  USING (true);

-- ========================================
-- 5. INDEXES FOR PERFORMANCE
-- ========================================

-- Leads table indexes
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_state ON leads(state);

-- Analytics indexes
CREATE INDEX IF NOT EXISTS idx_page_views_session_id ON page_views(session_id);
CREATE INDEX IF NOT EXISTS idx_page_views_created_at ON page_views(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_user_interactions_session_id ON user_interactions(session_id);
CREATE INDEX IF NOT EXISTS idx_user_interactions_created_at ON user_interactions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_form_submissions_created_at ON form_submissions(created_at DESC);

-- Performance indexes
CREATE INDEX IF NOT EXISTS idx_performance_metrics_name ON performance_metrics(metric_name);
CREATE INDEX IF NOT EXISTS idx_performance_metrics_created_at ON performance_metrics(created_at DESC);

-- ========================================
-- 6. TRIGGERS AND FUNCTIONS
-- ========================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_system_settings_updated_at BEFORE UPDATE ON system_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ========================================
-- 7. SAMPLE DATA (Optional)
-- ========================================

-- Insert sample admin user (password: admin123)
INSERT INTO admin_users (email, name, role) 
VALUES ('admin@renovesolar.com.br', 'Administrador', 'admin')
ON CONFLICT (email) DO NOTHING;

-- Insert sample system settings
INSERT INTO system_settings (key, value, description, is_public) VALUES
  ('company_name', '"Renove Solar"', 'Nome da empresa', true),
  ('company_phone', '"(96) 2027-0750"', 'Telefone da empresa', true),
  ('company_email', '"contato@renovesolar.com.br"', 'Email da empresa', true),
  ('default_tariff', '0.96', 'Tarifa padrão região Norte', true),
  ('regions', '["PA", "AP", "MA", "AM", "RR", "AC", "RO"]', 'Regiões atendidas', true),
  ('maintenance_mode', 'false', 'Modo de manutenção', false)
ON CONFLICT (key) DO NOTHING;

-- ========================================
-- 8. VIEWS FOR ANALYTICS
-- ========================================

-- Lead statistics view
CREATE OR REPLACE VIEW lead_stats AS
SELECT 
  COUNT(*) as total_leads,
  COUNT(*) FILTER (WHERE status = 'new') as new_leads,
  COUNT(*) FILTER (WHERE status = 'contacted') as contacted_leads,
  COUNT(*) FILTER (WHERE status = 'qualified') as qualified_leads,
  COUNT(*) FILTER (WHERE status = 'lost') as lost_leads,
  DATE_TRUNC('day', created_at) as date
FROM leads
GROUP BY DATE_TRUNC('day', created_at)
ORDER BY date DESC;

-- Daily analytics view
CREATE OR REPLACE VIEW daily_analytics AS
SELECT 
  DATE_TRUNC('day', created_at) as date,
  COUNT(*) as page_views,
  COUNT(DISTINCT session_id) as unique_sessions,
  COUNT(DISTINCT user_id) as unique_users
FROM page_views
GROUP BY DATE_TRUNC('day', created_at)
ORDER BY date DESC;

-- ========================================
-- 9. SECURITY FUNCTIONS
-- ========================================

-- Function to validate email format
CREATE OR REPLACE FUNCTION validate_email(email text)
RETURNS boolean AS $$
BEGIN
  RETURN email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$';
END;
$$ LANGUAGE plpgsql;

-- Function to validate phone format (Brazil)
CREATE OR REPLACE FUNCTION validate_phone(phone text)
RETURNS boolean AS $$
BEGIN
  RETURN phone ~* '^\(\d{2}\)\s?\d{4,5}-\d{4}$';
END;
$$ LANGUAGE plpgsql;

-- ========================================
-- 10. COMPLETION MESSAGE
-- ========================================

DO $$
BEGIN
  RAISE NOTICE '===========================================';
  RAISE NOTICE '✅ RENOVE SOLAR DATABASE SETUP COMPLETE!';
  RAISE NOTICE '===========================================';
  RAISE NOTICE 'Tables created:';
  RAISE NOTICE '  • leads (main business data)';
  RAISE NOTICE '  • page_views (analytics)';
  RAISE NOTICE '  • user_interactions (analytics)';
  RAISE NOTICE '  • form_submissions (analytics)';
  RAISE NOTICE '  • admin_users (admin panel)';
  RAISE NOTICE '  • system_settings (configuration)';
  RAISE NOTICE '  • performance_metrics (monitoring)';
  RAISE NOTICE '';
  RAISE NOTICE 'Security enabled:';
  RAISE NOTICE '  • Row Level Security (RLS) active';
  RAISE NOTICE '  • Anonymous users can insert leads';
  RAISE NOTICE '  • Service role has full access');
  RAISE NOTICE '';
  RAISE NOTICE 'Next steps:';
  RAISE NOTICE '  1. Test the connection: npm run supabase:test';
  RAISE NOTICE '  2. Start the dev server: npm run dev');
  RAISE NOTICE '  3. Test the form submission');
  RAISE NOTICE '  4. Check data in Table Editor';
  RAISE NOTICE '===========================================';
END $$;
