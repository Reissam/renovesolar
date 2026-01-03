@echo off
echo 🔧 Atualizando .env com Service Role Key
echo ========================================
echo.

echo VITE_SUPABASE_URL=https://wbenstlbxxlmqwhpvose.supabase.co > .env
echo VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndiZW5zdGxieHhsbXF3aHB2b3NlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjczNjc4ODEsImV4cCI6MjA4Mjk0Mzg4MX0.CxgHp7f_LXjVm2hf7bG1kgs0WFrQmPKA3Te8ma1HD4w >> .env
echo VITE_SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndiZW5zdGxieHhsbXF3aHB2b3NlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NzM2Nzg4MSwiZXhwIjoyMDgyOTQzODgxfQ.YMMWKo6_E55LcRSRW4aQA3CiLxwoUPsqPBFSfuaRtU4 >> .env

echo.
echo ✅ .env atualizado com 3 variáveis!
echo 1. VITE_SUPABASE_URL
echo 2. VITE_SUPABASE_ANON_KEY
echo 3. VITE_SUPABASE_SERVICE_ROLE_KEY
echo.
echo Reiniciando servidor...
taskkill /F /IM node.exe 2>nul
npm run dev

pause
