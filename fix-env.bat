@echo off
echo Corrigindo variáveis de ambiente do Supabase...
echo.

echo VITE_SUPABASE_URL=https://wbenstlbxxlmqwhpvose.supabase.co > .env
echo VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndiZW5zdGxieHhsbXF3aHB2b3NlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUzMDI0MjQsImV4cCI6MjA0MDg3ODQyNH0.8y6JH5X_1B6hJH9nJx8wKqYfJQ9L6X3nZ9vKqYfJQ9 >> .env

echo.
echo ✅ Variáveis de ambiente corrigidas!
echo URL: https://wbenstlbxxlmqwhpvose.supabase.co
echo.
echo Reinicie o servidor: npm run dev
pause
