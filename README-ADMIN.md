# Painel Administrativo - Renove Solar

## Acesso

1. **Site Principal**: http://localhost:5174/
2. **Painel Administrativo**: http://localhost:5174/admin.html

## Login

- **URL**: http://localhost:5174/admin.html
- **Senha**: `admin123`

## Funcionalidades

### 📸 Gerenciamento de Imagens

#### Imagem do Hero
- **Tamanho recomendado**: 1200 x 800 pixels
- **Formatos**: PNG, JPG
- **Tamanho máximo**: 5MB
- **Localização**: Seção principal do site

#### Imagens dos Estudos de Caso
- **Tamanho recomendado**: 600 x 400 pixels
- **Formatos**: PNG, JPG
- **Tamanho máximo**: 5MB
- **Quantidade**: Ilimitada

### 📝 Gerenciamento de Conteúdo

#### Estudos de Caso
- **Nome do projeto**: Título do estudo de caso
- **Consumo**: Ex: "1200 kWh/mês"
- **Economia**: Ex: "R$ 960/mês"
- **Depoimento**: Texto do cliente
- **Avaliação**: Classificação de 1 a 5 estrelas

## Como Usar

1. **Acessar o Painel**: Vá para `/admin.html`
2. **Fazer Login**: Digite a senha `admin123`
3. **Editar Imagens**:
   - Clique na área de upload
   - Selecione a imagem desejada
   - Aguarde o processamento
   - Salve automaticamente

4. **Editar Estudos de Caso**:
   - Clique no ícone de editar (✏️)
   - Modifique as informações
   - Clique em "Salvar"

5. **Adicionar Novo Projeto**:
   - Clique em "Novo Projeto"
   - Preencha todas as informações
   - Faça upload da imagem
   - Clique em "Salvar"

6. **Excluir Projeto**:
   - Clique no ícone de lixeira (🗑️)
   - Confirme a exclusão

## Armazenamento

- **Local**: Browser (localStorage)
- **Persistência**: Dados permanecem mesmo após recarregar a página
- **Sincronização**: Alterações refletem imediatamente no site principal

## Recomendações de Imagem

### Hero Section
- **Dimensões**: 1200 x 800 pixels
- **Qualidade**: Alta resolução
- **Conteúdo**: Painéis solares, instalações, ou energia renovável
- **Formato**: JPG para fotografias, PNG para gráficos

### Estudos de Caso
- **Dimensões**: 600 x 400 pixels
- **Qualidade**: Boa resolução
- **Conteúdo**: Fotos reais dos projetos
- **Formato**: JPG preferencialmente

## Segurança

- O painel é protegido por senha
- Senha padrão: `admin123`
- Recomenda-se alterar a senha em produção

## Suporte

Caso tenha problemas:
1. Verifique o console do navegador (F12)
2. Limpe o localStorage se necessário
3. Recarregue a página

## Desenvolvimento

Para testar localmente:
```bash
npm run dev
```

Acesse:
- Site: http://localhost:5174/
- Admin: http://localhost:5174/admin.html
