# Admin Tattoo Management

Painel administrativo para gestao de pedidos de um estudio de tatuagem. O projeto foi criado com React, TypeScript, Vite e Tailwind CSS, usando armazenamento local do navegador para simular login e CRUD de pedidos.

## Funcionalidades

- Login com usuarios de demonstracao.
- Rota protegida para a area de pedidos.
- Cadastro, edicao e remocao de pedidos.
- Confirmacao antes de excluir um pedido.
- Filtros por status, numero do pedido e datas.
- Ordenacao por data do pedido, conclusao ou pagamento.
- Paginacao da tabela de pedidos.
- Persistencia dos dados no `localStorage`.

## Tecnologias

- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- React Router DOM
- Lucide React
- use-local-storage

## Requisitos

- Node.js instalado
- npm instalado

## Como Rodar

Instale as dependencias:

```bash
npm install
```

Inicie o ambiente de desenvolvimento:

```bash
npm run dev
```

Acesse a URL exibida no terminal, normalmente:

```text
http://localhost:5173
```

## Acesso de Demonstracao

Use uma das contas abaixo para entrar no sistema:

| Nome | E-mail | Senha |
| --- | --- | --- |
| Admin Studio | `admin@studio.com` | `admin123` |
| Caio Sena | `caio@studio.com` | `caio123` |

## Scripts

| Comando | Descricao |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento. |
| `npm run build` | Executa a checagem TypeScript e gera a build de producao. |
| `npm run typecheck` | Executa apenas a checagem de tipos. |
| `npm run lint` | Executa o ESLint no projeto. |
| `npm run preview` | Abre uma previa local da build de producao. |

## Estrutura

```text
src/
  assets/              Imagens usadas na interface
  components/          Componentes reutilizaveis
  components/orders/   Componentes da area de pedidos
  components/ui/       Componentes base de interface
  hooks/               Regras de dados e localStorage
  layouts/             Layouts da aplicacao
  pages/               Paginas da aplicacao
  routes/              Configuracao das rotas
```

## Rotas

| Rota | Descricao |
| --- | --- |
| `/login` | Tela de acesso. |
| `/pedidos` | Painel protegido de gestao de pedidos. |
| `*` | Pagina de erro para rotas nao encontradas. |

## Observacoes

Este projeto usa `localStorage`, entao os dados ficam salvos apenas no navegador atual. Para restaurar os dados iniciais, limpe o armazenamento local do site nas ferramentas do navegador.
