// Criar tabelas individualmente via REST API
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndiZW5zdGxieHhsbXF3aHB2b3NlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NzM2Nzg4MSwiZXhwIjoyMDgyOTQzODgxfQ.YMMWKo6_E55LcRSRW4aQA3CiLxwoUPsqPBFSfuaRtU4';
const URL = 'https://wbenstlbxxlmqwhpvose.supabase.co';

async function createTable(tableName, definition) {
  try {
    const response = await fetch(`${URL}/rest/v1/${tableName}`, {
      method: 'POST',
      headers: {
        'apikey': SERVICE_KEY,
        'Authorization': `Bearer ${SERVICE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({})
    });
    
    console.log(`Tabela ${tableName}:`, response.status);
    
    if (response.ok) {
      console.log(`✅ ${tableName} OK`);
    } else {
      const error = await response.text();
      console.log(`❌ ${tableName}:`, error);
    }
  } catch (error) {
    console.error(`❌ Erro ${tableName}:`, error);
  }
}

async function setupTables() {
  console.log('🔧 Configurando tabelas...');
  
  // Vamos criar as tabelas manualmente no dashboard
  console.log('📋 Execute manualmente no SQL Editor do Supabase:');
  console.log('URL: https://supabase.com/dashboard/project/wbenstlbxxlmqwhpvose/sql');
  console.log('');
  console.log('-- Copie e cole este SQL:');
  console.log(`
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
  `);
}

setupTables();
