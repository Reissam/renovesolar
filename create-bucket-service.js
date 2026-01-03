// Criar bucket com service role key
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndiZW5zdGxieHhsbXF3aHB2b3NlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NzM2Nzg4MSwiZXhwIjoyMDgyOTQzODgxfQ.YMMWKo6_E55LcRSRW4aQA3CiLxwoUPsqPBFSfuaRtU4';
const URL = 'https://wbenstlbxxlmqwhpvose.supabase.co';

async function createBucket() {
  console.log('🔧 Criando bucket com service role...');
  
  try {
    const response = await fetch(`${URL}/storage/v1/bucket`, {
      method: 'POST',
      headers: {
        'apikey': SERVICE_KEY,
        'Authorization': `Bearer ${SERVICE_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: 'renove-images',
        name: 'renove-images',
        public: true,
        file_size_limit: 5242880, // 5MB
        allowed_mime_types: ['image/jpeg', 'image/png', 'image/webp', 'image/jpg']
      })
    });
    
    console.log('Status:', response.status);
    
    if (response.ok) {
      const result = await response.json();
      console.log('✅ Bucket criado com sucesso:', result);
      
      // Agora criar políticas RLS
      await createPolicies();
    } else {
      const error = await response.text();
      console.log('❌ Erro ao criar bucket:', error);
      
      // Se já existe, vamos criar políticas
      if (response.status === 409) {
        console.log('📁 Bucket já existe, criando políticas...');
        await createPolicies();
      }
    }
    
  } catch (error) {
    console.error('❌ Erro geral:', error);
  }
}

async function createPolicies() {
  console.log('🔧 Criando políticas RLS...');
  
  try {
    // Política para permitir acesso público
    const policyResponse = await fetch(`${URL}/rest/v1/rpc/create_storage_policy`, {
      method: 'POST',
      headers: {
        'apikey': SERVICE_KEY,
        'Authorization': `Bearer ${SERVICE_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        policy_name: 'Allow public access to renove-images',
        bucket_id: 'renove-images',
        definition: {
          role: 'anon',
          action: ['SELECT', 'INSERT', 'UPDATE', 'DELETE'],
          condition: 'true'
        }
      })
    });
    
    if (policyResponse.ok) {
      console.log('✅ Políticas criadas com sucesso');
    } else {
      const error = await policyResponse.text();
      console.log('❌ Erro ao criar políticas:', error);
    }
    
  } catch (error) {
    console.error('❌ Erro ao criar políticas:', error);
  }
}

async function verifyBucket() {
  console.log('🔍 Verificando bucket...');
  
  try {
    const response = await fetch(`${URL}/storage/v1/bucket/renove-images`, {
      headers: {
        'apikey': SERVICE_KEY,
        'Authorization': `Bearer ${SERVICE_KEY}`
      }
    });
    
    if (response.ok) {
      const bucket = await response.json();
      console.log('✅ Bucket verificado:', bucket);
      return true;
    } else {
      console.log('❌ Bucket não encontrado');
      return false;
    }
  } catch (error) {
    console.error('❌ Erro ao verificar bucket:', error);
    return false;
  }
}

// Executar
createBucket();
