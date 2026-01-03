// Verificar bucket existente
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndiZW5zdGxieHhsbXF3aHB2b3NlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NzM2Nzg4MSwiZXhwIjoyMDgyOTQzODgxfQ.YMMWKo6_E55LcRSRW4aQA3CiLxwoUPsqPBFSfuaRtU4';
const URL = 'https://wbenstlbxxlmqwhpvose.supabase.co';

async function checkBucket() {
  console.log('🔍 Verificando bucket renove-images...');
  
  try {
    const response = await fetch(`${URL}/storage/v1/bucket/renove-images`, {
      headers: {
        'apikey': SERVICE_KEY,
        'Authorization': `Bearer ${SERVICE_KEY}`
      }
    });
    
    console.log('Status:', response.status);
    
    if (response.ok) {
      const bucket = await response.json();
      console.log('✅ Bucket encontrado:', bucket);
      
      // Verificar se é público
      console.log('Público:', bucket.public);
      console.log('Limite de arquivo:', bucket.file_size_limit, 'bytes');
      console.log('MIME types:', bucket.allowed_mime_types);
      
      // Testar upload
      await testUpload();
    } else {
      const error = await response.text();
      console.log('❌ Erro:', error);
    }
    
  } catch (error) {
    console.error('❌ Erro geral:', error);
  }
}

async function testUpload() {
  console.log('📤 Testando upload...');
  
  try {
    // Criar arquivo de teste
    const testFile = new Blob(['test upload'], { type: 'text/plain' });
    const fileName = `test-${Date.now()}.txt`;
    
    const formData = new FormData();
    formData.append('file', testFile, fileName);
    
    const response = await fetch(`${URL}/storage/v1/object/renove-images/${fileName}`, {
      method: 'POST',
      headers: {
        'apikey': SERVICE_KEY,
        'Authorization': `Bearer ${SERVICE_KEY}`
      },
      body: formData
    });
    
    console.log('Upload Status:', response.status);
    
    if (response.ok) {
      const result = await response.json();
      console.log('✅ Upload de teste OK:', result);
      
      // Testar URL pública
      const publicUrl = `${URL}/storage/v1/object/public/renove-images/${fileName}`;
      console.log('🔗 URL pública:', publicUrl);
      
      // Limpar
      await fetch(`${URL}/storage/v1/object/renove-images/${fileName}`, {
        method: 'DELETE',
        headers: {
          'apikey': SERVICE_KEY,
          'Authorization': `Bearer ${SERVICE_KEY}`
        }
      });
      console.log('🧹 Arquivo de teste removido');
      
    } else {
      const error = await response.text();
      console.log('❌ Erro no upload:', error);
    }
    
  } catch (error) {
    console.error('❌ Erro no upload:', error);
  }
}

checkBucket();
