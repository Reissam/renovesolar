@echo off
echo 🔧 Corrigindo API Key do Supabase
echo ===================================
echo.
echo 1. Acesse: https://supabase.com/dashboard
echo 2. Projeto: wbenstlbxxlmqwhpvose
echo 3. Settings -> API
echo 4. Copie a "anon public key"
echo.
set /p API_KEY="Cole a API key aqui: "

echo.
echo Atualizando .env...
(
echo VITE_SUPABASE_URL=https://wbenstlbxxlmqwhpvose.supabase.co
echo VITE_SUPABASE_ANON_KEY=%API_KEY%
) > .env

echo.
echo ✅ API Key atualizada!
echo URL: https://wbenstlbxxlmqwhpvose.supabase.co
echo Key: %API_KEY:~0,50%...
echo.
echo Reiniciando servidor...
taskkill /F /IM node.exe 2>nul
npm run dev

pause
