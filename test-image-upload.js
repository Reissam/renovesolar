// Testar upload com imagem real
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndiZW5zdGxieHhsbXF3aHB2b3NlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NzM2Nzg4MSwiZXhwIjoyMDgyOTQzODgxfQ.YMMWKo6_E55LcRSRW4aQA3CiLxwoUPsqPBFSfuaRtU4';
const URL = 'https://wbenstlbxxlmqwhpvose.supabase.co';

async function testImageUpload() {
  console.log('🖼️ Testando upload com imagem real...');
  
  try {
    // Criar uma imagem de teste (1x1 pixel PNG)
    const pngData = atob('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChAI9jU77yQAAAABJRU5ErkJggg==');
    const imageFile = new Blob([pngData], { type: 'image/png' });
    const fileName = `test-image-${Date.now()}.png`;
    
    const formData = new FormData();
    formData.append('file', imageFile, fileName);
    
    console.log('📤 Enviando imagem:', fileName);
    console.log('📏 Tamanho:', imageFile.size, 'bytes');
    console.log('📋 Tipo:', imageFile.type);
    
    const response = await fetch(`${URL}/storage/v1/object/renove-images/${fileName}`, {
      method: 'POST',
      headers: {
        'apikey': SERVICE_KEY,
        'Authorization': `Bearer ${SERVICE_KEY}`
      },
      body: formData
    });
    
    console.log('Status:', response.status);
    
    if (response.ok) {
      const result = await response.json();
      console.log('✅ Upload de imagem OK:', result);
      
      // Testar URL pública
      const publicUrl = `${URL}/storage/v1/object/public/renove-images/${fileName}`;
      console.log('🔗 URL pública:', publicUrl);
      
      // Testar acesso à URL
      const testResponse = await fetch(publicUrl);
      console.log('🌐 Acesso à URL pública:', testResponse.status);
      
      // Limpar
      await fetch(`${URL}/storage/v1/object/renove-images/${fileName}`, {
        method: 'DELETE',
        headers: {
          'apikey': SERVICE_KEY,
          'Authorization': `Bearer ${SERVICE_KEY}`
        }
      });
      console.log('🧹 Imagem de teste removida');
      
      console.log('🎉 BUCKET PRONTO PARA USO!');
      
    } else {
      const error = await response.text();
      console.log('❌ Erro no upload:', error);
    }
    
  } catch (error) {
    console.error('❌ Erro geral:', error);
  }
}

testImageUpload();
