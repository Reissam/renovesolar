# 🗄️ Criando o Banco de Dados - Renove Solar

## 📋 Pré-requisitos

- ✅ Projeto Supabase criado: `wbenstlbxxlmqwhpvose`
- ✅ Chave API configurada no `.env.local`
- ✅ Arquivo `DATABASE-SETUP.sql` pronto

## 🚀 Passo a Passo

### 1️⃣ Acessar Dashboard Supabase

1. Abra: https://supabase.com/dashboard
2. Faça login com sua conta
3. Selecione o projeto: **wbenstlbxxlmqwhpvose**

### 2️⃣ Abrir SQL Editor

1. No menu lateral esquerdo, clique em **SQL Editor** 📝
2. Clique em **New query** ➕
3. Você verá uma área de texto vazia

### 3️⃣ Executar Script SQL

1. **Copie** todo o conteúdo do arquivo `DATABASE-SETUP.sql`
2. **Cole** na área de texto do SQL Editor
3. **Clique** em **Run** ▶️ (botão verde no canto superior direito)

### 4️⃣ Aguardar Execução

O script levará cerca de 30-60 segundos para executar. Você verá:

```
✅ RENOVE SOLAR DATABASE SETUP COMPLETE!
===========================================
Tables created:
  • leads (main business data)
  • page_views (analytics)
  • user_interactions (analytics)
  • form_submissions (analytics)
  • admin_users (admin panel)
  • system_settings (configuration)
  • performance_metrics (monitoring)
```

### 5️⃣ Verificar Tabelas Criadas

1. No menu lateral, clique em **Table Editor** 📊
2. Você deverá ver estas tabelas:
   - `leads`
   - `page_views`
   - `user_interactions`
   - `form_submissions`
   - `admin_users`
   - `system_settings`
   - `performance_metrics`

### 6️⃣ Testar Conexão

Execute no terminal:
```bash
cd "e:\Aplicativos\Site_Renove_Solar"
npm run supabase:test
```

Você deve ver:
```
🔍 Testing real Supabase connection...
📋 Test 1: Checking if leads table exists...
✅ Leads table exists and is accessible
📝 Test 2: Testing insert permission...
✅ Insert permission working!
📄 Test record inserted: [uuid]
🧹 Test 3: Cleaning up test data...
✅ Test data cleaned up successfully
🎉 All tests passed!
🚀 Supabase is ready for use!
```

## 📊 Estrutura do Banco de Dados

### 🏢 Tabelas Principais

#### `leads` - Dados de Clientes
```sql
- id: UUID (chave primária)
- name: Text (nome do cliente)
- email: Text (email)
- phone: Text (WhatsApp/telefone)
- consumption: Numeric (consumo mensal kWh)
- property_type: Text (residential/commercial/rural)
- city: Text (cidade)
- state: Text (estado)
- best_contact_time: Text (melhor horário)
- lead_source: Text (origem do lead)
- status: Text (new/contacted/qualified/lost)
- created_at: Timestamp
- updated_at: Timestamp
```

#### `page_views` - Analytics
```sql
- id: UUID
- session_id: Text
- page_path: Text
- referrer: Text
- user_agent: Text
- created_at: Timestamp
```

#### `user_interactions` - Comportamento
```sql
- id: UUID
- session_id: Text
- interaction_type: Text
- element: Text
- properties: JSON
- created_at: Timestamp
```

### 🔐 Segurança Configurada

- **RLS Ativado**: Row Level Security em todas as tabelas
- **Anônimos**: Podem inserir dados (formulários)
- **Service Role**: Acesso total (admin)
- **Políticas**: Inserção, leitura e atualização controladas

### 📈 Índices Otimizados

```sql
-- Performance
idx_leads_status
idx_leads_created_at
idx_page_views_session_id
idx_user_interactions_created_at
-- ... e mais
```

## 🧪 Testes Manuais

### 1. Testar Inserção Manual

No **SQL Editor**, execute:
```sql
INSERT INTO leads (name, email, phone, consumption, city, state)
VALUES ('Teste Usuario', 'teste@email.com', '(96) 99999-9999', 500, 'Belém', 'PA')
RETURNING *;
```

### 2. Verificar Dados

No **Table Editor**, clique na tabela `leads` para ver os dados.

### 3. Testar Formulário

1. Inicie o servidor: `npm run dev`
2. Abra: http://localhost:5173
3. Preencha o formulário "Orçamento Grátis"
4. Verifique se aparece na tabela `leads`

## 🔧 Administração

### Acessar Dados

1. **Table Editor**: Visualização e edição direta
2. **SQL Editor**: Consultas personalizadas
3. **API**: Acesso programático

### Consultas Úteis

```sql
-- Estatísticas de leads
SELECT status, COUNT(*) as count 
FROM leads 
GROUP BY status;

-- Leads por estado
SELECT state, COUNT(*) as count 
FROM leads 
GROUP BY state 
ORDER BY count DESC;

-- Leads recentes
SELECT name, email, created_at 
FROM leads 
ORDER BY created_at DESC 
LIMIT 10;
```

## 🚨 Troubleshooting

### Erro Comum: "Permission denied"

**Causa**: RLS policies bloqueando acesso
**Solução**: Verifique se as políticas foram criadas corretamente

### Erro Comum: "Table does not exist"

**Causa**: Script não executou completamente
**Solução**: Execute o script novamente

### Erro Comum: "Connection failed"

**Causa**: Variáveis de ambiente incorretas
**Solução**: Verifique `.env.local`

## 📱 Próximos Passos

1. ✅ **Banco criado**
2. ✅ **Tabelas configuradas**
3. ✅ **Segurança ativa**
4. ✅ **Testes funcionando**
5. 🔄 **Iniciar desenvolvimento**
6. 🔄 **Testar formulários**
7. 🔄 **Monitorar analytics**

## 🎉 Sucesso!

Seu banco de dados está pronto! 🚀

- **Leads**: Coleta automática de formulários
- **Analytics**: Monitoramento completo
- **Admin**: Painel administrativo pronto
- **Performance**: Otimizado e escalável

**Agora você pode usar o formulário do site e os dados serão salvos automaticamente!** 📊
