@echo off
echo 🔧 Configurando Environment Variables no Vercel
echo ========================================
echo.
echo Isso vai configurar as 3 variáveis necessárias:
echo 1. VITE_SUPABASE_URL
echo 2. VITE_SUPABASE_ANON_KEY  
echo 3. VITE_SUPABASE_SERVICE_ROLE_KEY
echo.
echo Pressione qualquer tecla para continuar...
pause

echo.
echo Configurando VITE_SUPABASE_URL...
vercel env add VITE_SUPABASE_URL

echo.
echo Configurando VITE_SUPABASE_ANON_KEY...
vercel env add VITE_SUPABASE_ANON_KEY

echo.
echo Configurando VITE_SUPABASE_SERVICE_ROLE_KEY...
vercel env add VITE_SUPABASE_SERVICE_ROLE_KEY

echo.
echo ✅ Variáveis configuradas no Vercel!
echo.
echo Agora faça deploy para aplicar:
echo vercel --prod
pause
