-- Criar tabela para configurações do site
CREATE TABLE IF NOT EXISTS site_config (
  id SERIAL PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela para projetos
CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  image TEXT,
  consumption TEXT,
  savings TEXT,
  rating INTEGER DEFAULT 5,
  quote TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela para hero
CREATE TABLE IF NOT EXISTS hero_config (
  id SERIAL PRIMARY KEY,
  image TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Políticas RLS
ALTER TABLE site_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_config ENABLE ROW LEVEL SECURITY;

-- Políticas para leitura pública
CREATE POLICY "Public read access" ON site_config FOR SELECT USING (true);
CREATE POLICY "Public read access" ON projects FOR SELECT USING (true);
CREATE POLICY "Public read access" ON hero_config FOR SELECT USING (true);

-- Políticas para escrita (service role only)
CREATE POLICY "Service role write access" ON site_config FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role write access" ON projects FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role write access" ON hero_config FOR ALL USING (auth.role() = 'service_role');

-- Inserir dados iniciais
INSERT INTO hero_config (id, image) VALUES (1, '') ON CONFLICT (id) DO NOTHING;

-- Índices
CREATE INDEX IF NOT EXISTS idx_site_config_key ON site_config(key);
CREATE INDEX IF NOT EXISTS idx_projects_id ON projects(id);
