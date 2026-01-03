import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';

function TestConnection() {
  const [status, setStatus] = useState('Testando conexão...');
  const [details, setDetails] = useState({});

  useEffect(() => {
    testSupabaseConnection();
  }, []);

  const testSupabaseConnection = async () => {
    try {
      // Teste 1: Conexão básica
      setStatus('🔍 Testando conexão básica...');
      
      const { data, error } = await supabase
        .from('image_metadata')
        .select('count')
        .single();
      
      if (error) {
        setStatus('❌ Erro na conexão');
        setDetails({ error: error.message, hint: error.hint });
        return;
      }
      
      setStatus('✅ Conexão OK');
      setDetails({ connection: 'sucesso', data });
      
      // Teste 2: Listar buckets
      const { data: buckets, error: bucketError } = await supabase.storage.listBuckets();
      
      if (bucketError) {
        setDetails(prev => ({ ...prev, bucketError: bucketError.message }));
      } else {
        setDetails(prev => ({ ...prev, buckets }));
      }
      
    } catch (err) {
      setStatus('❌ Erro geral');
      setDetails({ error: err.message });
    }
  };

  const testUpload = async () => {
    try {
      setStatus('📤 Testando upload...');
      
      // Criar arquivo de teste
      const testFile = new Blob(['test upload'], { type: 'text/plain' });
      const fileName = `test-${Date.now()}.txt`;
      
      const { data, error } = await supabase.storage
        .from('renove-images')
        .upload(fileName, testFile);
      
      if (error) {
        setStatus('❌ Erro no upload');
        setDetails(prev => ({ ...prev, uploadError: error.message }));
        return;
      }
      
      setStatus('✅ Upload OK');
      setDetails(prev => ({ ...prev, uploadSuccess: data }));
      
      // Limpar arquivo
      await supabase.storage
        .from('renove-images')
        .remove([fileName]);
      
    } catch (err) {
      setStatus('❌ Erro no upload');
      setDetails(prev => ({ ...prev, uploadError: err.message }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-900 mb-6">Teste de Conexão Supabase</h1>
        
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="mb-4">
            <span className="text-lg font-semibold">Status: </span>
            <span className={`text-lg ${status.includes('✅') ? 'text-green-600' : status.includes('❌') ? 'text-red-600' : 'text-blue-600'}`}>
              {status}
            </span>
          </div>
          
          <button
            onClick={testSupabaseConnection}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mr-4"
          >
            🔍 Testar Conexão
          </button>
          
          <button
            onClick={testUpload}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            📤 Testar Upload
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Detalhes:</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto">
            {JSON.stringify(details, null, 2)}
          </pre>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">Configuração:</h2>
          <div className="space-y-2">
            <div><strong>URL:</strong> {import.meta.env.VITE_SUPABASE_URL}</div>
            <div><strong>Key:</strong> {import.meta.env.VITE_SUPABASE_ANON_KEY ? 'Configurada' : 'Não configurada'}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestConnection;
