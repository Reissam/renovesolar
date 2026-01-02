# 🚀 Implementação Supabase Storage - Guia Rápido

## 📋 Passo a Passo

### 1️⃣ Acessar Dashboard Supabase
1. Abra: https://supabase.com/dashboard
2. Faça login
3. Selecione o projeto: **wbenstlbxxlmqwhpvose**

### 2️⃣ Executar Script SQL
1. No menu lateral, clique em **SQL Editor** 📝
2. Clique em **New query** ➕
3. **Copie** todo o conteúdo do arquivo `SUPABASE-STORAGE-SETUP.sql`
4. **Cole** no SQL Editor
5. Clique em **Run** ▶️

### 3️⃣ Verificar Bucket Criado
1. No menu lateral, clique em **Storage** 📁
2. Você deverá ver o bucket: **renove-images**
3. Clique no bucket para ver as configurações

### 4️⃣ Testar Upload
1. Inicie o servidor: `npm run dev`
2. Acesse: http://localhost:5175/admin.html
3. Faça login: `admin123`
4. Tente fazer upload de uma imagem
5. Verifique se aparece no Storage do Supabase

## ✅ O Que Será Criado

### 📁 Bucket: renove-images
- **Capacidade**: 5MB por arquivo
- **Formatos**: JPEG, PNG, WebP
- **Acesso**: Público (para URLs públicas)

### 🗄️ Tabela: image_metadata
- **Controle**: Metadados das imagens
- **Tipos**: 'hero' e 'project'
- **Relacionamento**: Com projetos

### 🔐 Políticas de Segurança
- **Leitura**: Pública (anon)
- **Escrita**: Pública (anon) - para admin
- **Atualização**: Pública (anon) - para admin
- **Exclusão**: Pública (anon) - para admin

## 🎯 Como Funciona

### Upload de Imagem
1. **Seleção** → Arquivo escolhido
2. **Validação** → Tamanho e formato
3. **Upload** → Para Supabase Storage
4. **URL Pública** → Gerada automaticamente
5. **Metadados** → Salvos na tabela
6. **Site Principal** → Usa URL pública

### Benefícios
- **☁️ Nuvem**: Imagens salvas permanentemente
- **🌐 Global**: Acessível de qualquer lugar
- **⚡ Performance**: CDN do Supabase
- **📱 Multi-dispositivo**: Sincronização automática
- **💾 Backup**: Seguro na nuvem

## 🚨 Solução de Problemas

### Erro: "Bucket does not exist"
**Solução**: Execute o script SQL novamente

### Erro: "Permission denied"
**Solução**: Verifique as políticas RLS no SQL Editor

### Erro: "File too large"
**Solução**: Reduza o tamanho da imagem (< 5MB)

### Upload lento
**Solução**: Use imagens otimizadas (JPEG 80%)

## 📱 Teste Rápido

Após executar o script:

1. **Verifique Storage**: Deve ver o bucket `renove-images`
2. **Teste Upload**: Tente fazer upload no admin
3. **Verifique URL**: A imagem deve aparecer com URL pública
4. **Teste Site**: A imagem deve aparecer no site principal

## 🎉 Pronto!

Após executar o script SQL, o painel admin estará usando Supabase Storage!

**As imagens ficarão salvas na nuvem permanentemente!** 🚀
