// Teste com imagem real para debug
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndiZW5zdGxieHhsbXF3aHB2b3NlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjczNjc4ODEsImV4cCI6MjA4Mjk0Mzg4MX0.CxgHp7f_LXjVm2hf7bG1kgs0WFrQmPKA3Te8ma1HD4w';
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndiZW5zdGxieHhsbXF3aHB2b3NlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NzM2Nzg4MSwiZXhwIjoyMDgyOTQzODgxfQ.YMMWKo6_E55LcRSRW4aQA3CiLxwoUPsqPBFSfuaRtU4';
const URL = 'https://wbenstlbxxlmqwhpvose.supabase.co';

async function testImageUploadDebug() {
  console.log('🖼️ Teste de upload com imagem...');
  
  try {
    // Criar imagem PNG de 1x1 pixel
    const pngData = atob('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChAI9jU77yQAAAABJRU5ErkJggg==');
    const imageFile = new Blob([pngData], { type: 'image/png' });
    const formData = new FormData();
    formData.append('file', imageFile, 'debug-image.png');
    
    console.log('📏 Tamanho:', imageFile.size, 'bytes');
    console.log('📋 Tipo:', imageFile.type);
    
    // Testar com anon key
    const response = await fetch(`${URL}/storage/v1/object/renove-images/debug-image.png`, {
      method: 'POST',
      headers: {
        'apikey': API_KEY,
        'Authorization': `Bearer ${API_KEY}`
      },
      body: formData
    });
    
    console.log('Status:', response.status);
    
    if (response.ok) {
      const result = await response.json();
      console.log('✅ Upload OK:', result);
      
      // Testar URL pública
      const publicUrl = `${URL}/storage/v1/object/public/renove-images/debug-image.png`;
      console.log('🔗 URL pública:', publicUrl);
      
      // Limpar
      await fetch(`${URL}/storage/v1/object/renove-images/debug-image.png`, {
        method: 'DELETE',
        headers: {
          'apikey': API_KEY,
          'Authorization': `Bearer ${API_KEY}`
        }
      });
      console.log('🧹 Imagem removida');
      
    } else {
      const error = await response.text();
      console.log('❌ Erro no upload:', error);
    }
    
  } catch (error) {
    console.error('❌ Erro geral:', error);
  }
}

testImageUploadDebug();
