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

-- Habilitar RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_config ENABLE ROW LEVEL SECURITY;

-- Políticas de leitura pública
CREATE POLICY "Public read projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Public read hero" ON hero_config FOR SELECT USING (true);

-- Políticas de escrita (service role)
CREATE POLICY "Service role write projects" ON projects FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role write hero" ON hero_config FOR ALL USING (auth.role() = 'service_role');

-- Dados iniciais
INSERT INTO hero_config (id, image) VALUES (1, '') ON CONFLICT (id) DO NOTHING;
