// Teste direto da API Key
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndiZW5zdGxieHhsbXF3aHB2b3NlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjczNjc4ODEsImV4cCI6MjA4Mjk0Mzg4MX0.CxgHp7f_LXjVm2hf7bG1kgs0WFrQmPKA3Te8ma1HD4w';
const URL = 'https://wbenstlbxxlmqwhpvose.supabase.co';

async function testAPI() {
  console.log('🔍 Testando API Key...');
  
  try {
    // Teste 1: Verificar se a API key é válida
    const response = await fetch(`${URL}/rest/v1/`, {
      headers: {
        'apikey': API_KEY,
        'Authorization': `Bearer ${API_KEY}`
      }
    });
    
    console.log('Status:', response.status);
    console.log('Headers:', response.headers);
    
    if (response.ok) {
      console.log('✅ API Key válida');
    } else {
      console.log('❌ API Key inválida');
      const error = await response.text();
      console.log('Erro:', error);
    }
    
    // Teste 2: Verificar buckets
    const bucketResponse = await fetch(`${URL}/storage/v1/bucket`, {
      headers: {
        'apikey': API_KEY,
        'Authorization': `Bearer ${API_KEY}`
      }
    });
    
    console.log('Buckets Status:', bucketResponse.status);
    
    if (bucketResponse.ok) {
      const buckets = await bucketResponse.json();
      console.log('✅ Buckets:', buckets);
    } else {
      const error = await bucketResponse.text();
      console.log('❌ Erro buckets:', error);
    }
    
  } catch (error) {
    console.error('❌ Erro geral:', error);
  }
}

testAPI();
