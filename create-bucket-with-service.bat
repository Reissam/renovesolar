@echo off
echo 🔧 Obtendo Service Role Key para criar bucket
echo ========================================
echo.
echo 1. Acesse: https://supabase.com/dashboard
echo 2. Projeto: wbenstlbxxlmqwhpvose
echo 3. Settings -> API
echo 4. Copie a "service_role key" (NÃO a anon key)
echo.
set /p SERVICE_KEY="Cole a service_role key aqui: "

echo.
echo Criando bucket com service role...
(
echo const SERVICE_KEY = '%SERVICE_KEY%';
echo const URL = 'https://wbenstlbxxlmqwhpvose.supabase.co';
echo.
echo async function createBucket^(^) {
echo   console.log^('🔧 Criando bucket com service role...'^);
echo   
echo   try {
echo     const response = await fetch^(`${URL}/storage/v1/bucket`, {
echo       method: 'POST',
echo       headers: {
echo         'apikey': SERVICE_KEY,
echo         'Authorization': `Bearer ${SERVICE_KEY}`,
echo         'Content-Type': 'application/json'
echo       },
echo       body: JSON.stringify^({
echo         id: 'renove-images',
echo         name: 'renove-images',
echo         public: true,
echo         file_size_limit: 5242880,
echo         allowed_mime_types: ['image/jpeg', 'image/png', 'image/webp', 'image/jpg']
echo       }^)
echo     }^);
echo     
echo     console.log^('Status:', response.status^);
echo     
echo     if ^(response.ok^) {
echo       const result = await response.json^(^);
echo       console.log^('✅ Bucket criado:', result^);
echo     } else {
echo       const error = await response.text^(^);
echo       console.log^('❌ Erro:', error^);
echo     }
echo     
echo   } catch ^(error^) {
echo     console.error^('❌ Erro geral:', error^);
echo   }
echo }
echo.
echo createBucket^(^);
) > create-bucket-service.js

echo.
echo Executando...
node create-bucket-service.js

pause
