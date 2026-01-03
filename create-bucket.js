// Script para criar bucket via API REST
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndiZW5zdGxieHhsbXF3aHB2b3NlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjczNjc4ODEsImV4cCI6MjA4Mjk0Mzg4MX0.CxgHp7f_LXjVm2hf7bG1kgs0WFrQmPKA3Te8ma1HD4w';
const URL = 'https://wbenstlbxxlmqwhpvose.supabase.co';

async function createBucket() {
  console.log('🔧 Criando bucket renove-images...');
  
  try {
    const response = await fetch(`${URL}/storage/v1/bucket`, {
      method: 'POST',
      headers: {
        'apikey': API_KEY,
        'Authorization': `Bearer ${API_KEY}`,
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
      console.log('✅ Bucket criado:', result);
    } else {
      const error = await response.text();
      console.log('❌ Erro ao criar bucket:', error);
      
      // Se já existe, vamos verificar
      if (response.status === 409) {
        console.log('📁 Bucket já existe, verificando...');
        await checkBucket();
      }
    }
    
  } catch (error) {
    console.error('❌ Erro geral:', error);
  }
}

async function checkBucket() {
  try {
    const response = await fetch(`${URL}/storage/v1/bucket/renove-images`, {
      headers: {
        'apikey': API_KEY,
        'Authorization': `Bearer ${API_KEY}`
      }
    });
    
    if (response.ok) {
      const bucket = await response.json();
      console.log('✅ Bucket encontrado:', bucket);
    } else {
      console.log('❌ Bucket não encontrado');
    }
  } catch (error) {
    console.error('❌ Erro ao verificar bucket:', error);
  }
}

createBucket();
