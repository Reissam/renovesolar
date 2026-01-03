// Script para testar conexão com Supabase Storage
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wbenstlbxxlmqwhpvose.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndiZW5zdGxieHhsbXF3aHB2b3NlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUzMDI0MjQsImV4cCI6MjA0MDg3ODQyNH0.8y6JH5X_1B6hJH9nJx8wKqYfJQ9L6X3nZ9vKqYfJQ9';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
  console.log('🔍 Testando conexão com Supabase Storage...');
  
  try {
    // 1. Testar conexão básica
    const { data, error } = await supabase
      .from('image_metadata')
      .select('count')
      .single();
    
    if (error) {
      console.error('❌ Erro na conexão:', error);
      return;
    }
    
    console.log('✅ Conexão OK');
    
    // 2. Testar listagem de buckets
    const { data: buckets, error: bucketError } = await supabase.storage.listBuckets();
    
    if (bucketError) {
      console.error('❌ Erro ao listar buckets:', bucketError);
      return;
    }
    
    console.log('📁 Buckets encontrados:', buckets);
    
    // 3. Testar upload de arquivo pequeno
    const testFile = new Blob(['test'], { type: 'text/plain' });
    const fileName = `test-${Date.now()}.txt`;
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('renove-images')
      .upload(fileName, testFile);
    
    if (uploadError) {
      console.error('❌ Erro no upload:', uploadError);
      return;
    }
    
    console.log('✅ Upload OK:', uploadData);
    
    // 4. Testar URL pública
    const { data: { publicUrl } } = supabase.storage
      .from('renove-images')
      .getPublicUrl(fileName);
    
    console.log('🔗 URL pública:', publicUrl);
    
    // 5. Limpar arquivo de teste
    await supabase.storage
      .from('renove-images')
      .remove([fileName]);
    
    console.log('🧹 Arquivo de teste removido');
    console.log('🎉 Todos os testes passaram!');
    
  } catch (err) {
    console.error('❌ Erro geral:', err);
  }
}

testConnection();
