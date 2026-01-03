// Teste do AdminPanel isolado
console.log('🔍 Testando AdminPanel...');

// Verificar se as variáveis de ambiente estão disponíveis
console.log('Environment Variables:');
console.log('VITE_SUPABASE_URL:', import.meta.env.VITE_SUPABASE_URL);
console.log('VITE_SUPABASE_ANON_KEY:', import.meta.env.VITE_SUPABASE_ANON_KEY ? 'Present' : 'Missing');
console.log('VITE_SUPABASE_SERVICE_ROLE_KEY:', import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY ? 'Present' : 'Missing');

// Testar import do Supabase
import { supabase } from './lib/supabase.js';

async function testAdminPanelUpload() {
  console.log('📤 Testando upload como AdminPanel...');
  
  try {
    // Simular upload do AdminPanel
    const testFile = new Blob(['test'], { type: 'text/plain' });
    const formData = new FormData();
    formData.append('file', testFile, 'admin-test.txt');
    
    // Usar a mesma lógica do AdminPanel
    const apiKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY;
    const fileName = `hero-${Date.now()}.txt`;
    
    console.log('📋 Usando API Key:', apiKey ? 'Present' : 'Missing');
    console.log('📋 File name:', fileName);
    
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/renove-images/${fileName}`, {
      method: 'POST',
      headers: {
        'apikey': apiKey,
        'Authorization': `Bearer ${apiKey}`
      },
      body: formData
    });
    
    console.log('📊 Status:', response.status);
    
    if (response.ok) {
      const result = await response.json();
      console.log('✅ AdminPanel upload OK:', result);
      
      // Limpar
      await fetch(`${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/renove-images/${fileName}`, {
        method: 'DELETE',
        headers: {
          'apikey': apiKey,
          'Authorization': `Bearer ${apiKey}`
        }
      });
      console.log('🧹 Arquivo removido');
      
    } else {
      const error = await response.text();
      console.log('❌ AdminPanel upload falhou:', error);
    }
    
  } catch (error) {
    console.error('❌ Erro no AdminPanel:', error);
  }
}

testAdminPanelUpload();
