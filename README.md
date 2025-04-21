
# 📱 Zapwise App

**Zapwise App** é a aplicação principal do ecossistema Zapwise. Ela é construída com **Next.js 14 (App Router)** e atua como o painel administrativo do usuário, onde é possível gerenciar conversas, acompanhar o status dos clientes no WhatsApp, ativar conexões, visualizar insights e interagir com a IA de follow-up.

---

## ⚙️ Tecnologias Utilizadas

- [Next.js 14](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [NextAuth.js](https://next-auth.js.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Socket.io-client](https://socket.io/)
- [Zod](https://zod.dev/) — validações
- [React Icons / Lucide React](https://lucide.dev/)

---

## 🧠 O que este sistema faz?

### 1. **Autenticação**
- Login com e-mail e senha via NextAuth (strategy: JWT).
- Cadastro de novos usuários.

### 2. **Conexão com o WhatsApp**
- Tela de conexão personalizada no estilo WhatsApp Web.
- O sistema conecta o número do usuário à instância `zapwise.whatsapp` via WebSocket.
- A conexão é identificada por um `session_id` UUID e vinculada ao usuário no banco.

### 3. **Recebimento de Mensagens**
- O backend do `zapwise.whatsapp` envia mensagens via webhook.
- Mensagens são armazenadas em uma estrutura de `Conversation` e `Message`.

### 4. **Análise de Follow-up com IA**
- A cada nova mensagem recebida (vinda do cliente), a conversa é eventualmente analisada por um worker (`zapwise.worker`) que classifica seu status: `active`, `pending` ou `lost`, com substatus específicos.
- Análises são agendadas para rodar após 10 minutos da última mensagem, com debounce.

### 5. **Dashboard de Conversas**
- O sistema exibe uma lista com cards das conversas pendentes ou ativas.
- Cada card tem status, substatus, última mensagem, tempo desde a última interação e ação contextual com sugestão de follow-up.

---

## 📂 Estrutura de Pastas

```
zapwise.app/
├── app/                     # Rotas App Router
│   ├── api/app/connection/  # API de conexão com o WhatsApp
│   └── ...
├── components/              # Componentes reutilizáveis
├── lib/                     # Utilitários e auth
├── prisma/                  # Schema e seed do banco
├── styles/                  # Estilos globais (se houver)
├── public/                  # Arquivos estáticos
└── README.md
```

---

## 🔐 Segurança

- O endpoint de webhook `/api/app/connection/webhook` não requer autenticação pois é chamado internamente pelo serviço `zapwise.whatsapp`, mas pode ser protegido por token no futuro.
- Sessões e conexões são sempre vinculadas ao usuário logado (`userId`).

---

## 🔌 Integrações

- **zapwise.whatsapp** (WebSocket + Webhook): Responsável por gerenciar sessões e capturar mensagens recebidas e enviadas no WhatsApp.
- **zapwise.worker** (HTTP): Serviço que recebe requests para análise de conversas com IA (OpenAI).

---

## 🧪 Como rodar localmente

```bash
git clone https://github.com/sua-org/zapwise.app
cd zapwise.app
pnpm install

# Configurar o arquivo .env
cp .env.example .env

# Rodar as migrations
npx prisma migrate dev

# Iniciar o dev server
pnpm dev
```

---

## 🚀 Deploy

A aplicação é pensada para rodar na **Vercel**, mas também pode ser hospedada manualmente.

---

## ✨ To-Do (MVP)

- [x] Autenticação com NextAuth
- [x] Integração com WhatsApp via WebSocket
- [x] Recebimento de mensagens via webhook
- [x] Armazenamento de conversas
- [x] Dashboard com follow-ups
- [x] Reclassificação manual de conversas
- [ ] Tela de conversa completa (chat)
- [ ] Resposta automática (futuro)

---

## 🧑‍💻 Autor

Desenvolvido com ❤️ por Henrique Vieira.

---
