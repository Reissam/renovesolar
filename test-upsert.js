// Testar upload com upsert para evitar erro 409
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndiZW5zdGxieHhsbXF3aHB2b3NlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjczNjc4ODEsImV4cCI6MjA4Mjk0Mzg4MX0.CxgHp7f_LXjVm2hf7bG1kgs0WFrQmPKA3Te8ma1HD4w';
const URL = 'https://wbenstlbxxlmqwhpvose.supabase.co';

async function testUpsertUpload() {
  console.log('🔧 Testando upload com upsert...');
  
  try {
    // Criar imagem de teste
    const pngData = atob('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChAI9jU77yQAAAABJRU5ErkJggg==');
    const imageFile = new Blob([pngData], { type: 'image/png' });
    
    // Teste 1: Primeiro upload (deve criar)
    console.log('📤 Primeiro upload...');
    const formData1 = new FormData();
    formData1.append('file', imageFile);
    
    const response1 = await fetch(`${URL}/storage/v1/object/renove-images/hero.jpg`, {
      method: 'POST',
      headers: {
        'apikey': API_KEY,
        'Authorization': `Bearer ${API_KEY}`,
        'x-upsert': 'true'
      },
      body: formData1
    });
    
    console.log('Status primeiro upload:', response1.status);
    
    if (response1.ok) {
      const result1 = await response1.json();
      console.log('✅ Primeiro upload OK:', result1);
    } else {
      const error1 = await response1.text();
      console.log('❌ Erro primeiro upload:', error1);
      return;
    }
    
    // Teste 2: Segundo upload (deve sobrescrever)
    console.log('📤 Segundo upload (upsert)...');
    const formData2 = new FormData();
    formData2.append('file', imageFile);
    
    const response2 = await fetch(`${URL}/storage/v1/object/renove-images/hero.jpg`, {
      method: 'POST',
      headers: {
        'apikey': API_KEY,
        'Authorization': `Bearer ${API_KEY}`,
        'x-upsert': 'true'
      },
      body: formData2
    });
    
    console.log('Status segundo upload:', response2.status);
    
    if (response2.ok) {
      const result2 = await response2.json();
      console.log('✅ Segundo upload (upsert) OK:', result2);
    } else {
      const error2 = await response2.text();
      console.log('❌ Erro segundo upload:', error2);
    }
    
    // Testar URL pública
    const publicUrl = `${URL}/storage/v1/object/public/renove-images/hero.jpg`;
    console.log('🔗 URL pública:', publicUrl);
    
    // Limpar
    await fetch(`${URL}/storage/v1/object/renove-images/hero.jpg`, {
      method: 'DELETE',
      headers: {
        'apikey': API_KEY,
        'Authorization': `Bearer ${API_KEY}`
      }
    });
    console.log('🧹 Arquivo removido');
    
  } catch (error) {
    console.error('❌ Erro geral:', error);
  }
}

testUpsertUpload();
