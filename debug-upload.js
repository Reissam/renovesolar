// Teste simples de upload para debug
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndiZW5zdGxieHhsbXF3aHB2b3NlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjczNjc4ODEsImV4cCI6MjA4Mjk0Mzg4MX0.CxgHp7f_LXjVm2hf7bG1kgs0WFrQmPKA3Te8ma1HD4w';
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndiZW5zdGxieHhsbXF3aHB2b3NlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NzM2Nzg4MSwiZXhwIjoyMDgyOTQzODgxfQ.YMMWKo6_E55LcRSRW4aQA3CiLxwoUPsqPBFSfuaRtU4';
const URL = 'https://wbenstlbxxlmqwhpvose.supabase.co';

async function testUploadDebug() {
  console.log('🔍 Teste de upload debug...');
  
  try {
    // Testar com anon key primeiro
    console.log('📋 Testando com ANON key...');
    const testFile = new Blob(['test'], { type: 'text/plain' });
    const formData = new FormData();
    formData.append('file', testFile, 'debug-test.txt');
    
    const response = await fetch(`${URL}/storage/v1/object/renove-images/debug-test.txt`, {
      method: 'POST',
      headers: {
        'apikey': API_KEY,
        'Authorization': `Bearer ${API_KEY}`
      },
      body: formData
    });
    
    console.log('Status ANON:', response.status);
    console.log('Headers ANON:', response.headers);
    
    if (!response.ok) {
      const error = await response.text();
      console.log('Erro ANON:', error);
      
      // Tentar com service role
      console.log('📋 Testando com SERVICE role...');
      const serviceResponse = await fetch(`${URL}/storage/v1/object/renove-images/debug-test-service.txt`, {
        method: 'POST',
        headers: {
          'apikey': SERVICE_KEY,
          'Authorization': `Bearer ${SERVICE_KEY}`
        },
        body: formData
      });
      
      console.log('Status SERVICE:', serviceResponse.status);
      
      if (!serviceResponse.ok) {
        const serviceError = await serviceResponse.text();
        console.log('Erro SERVICE:', serviceError);
      } else {
        console.log('✅ SERVICE role funcionou!');
      }
    } else {
      console.log('✅ ANON key funcionou!');
    }
    
    // Verificar bucket
    const bucketResponse = await fetch(`${URL}/storage/v1/bucket/renove-images`, {
      headers: {
        'apikey': SERVICE_KEY,
        'Authorization': `Bearer ${SERVICE_KEY}`
      }
    });
    
    if (bucketResponse.ok) {
      const bucket = await bucketResponse.json();
      console.log('📁 Bucket info:', bucket);
    }
    
  } catch (error) {
    console.error('❌ Erro geral:', error);
  }
}

testUploadDebug();
