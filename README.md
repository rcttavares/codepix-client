# Codepix Client

Frontend for the **CodePix** system — a Pix payment application built with Next.js and Material UI.

## Features

- Bank account listing
- Per-account dashboard: current balance and latest transactions
- Pix key registration and listing (CPF or email)
- Pix transfers

## Routes

| Route | Description |
| ----- | ----------- |
| `/bank-accounts` | Lists all bank accounts |
| `/bank-accounts/[id]/dashboard` | Account panel with balance and transactions |
| `/bank-accounts/[id]/pix` | Pix key management |
| `/bank-accounts/[id]/withdraw` | Transfer form |

## Stack

- [Next.js](https://nextjs.org/) 16 (App Router)
- [TypeScript](https://www.typescriptlang.org/) 5
- [Material UI](https://mui.com/) v5
- [MUI X Data Grid](https://mui.com/x/react-data-grid/) v7

## Prerequisites

- Node.js 20+
- Backend API running (see environment variable below)

## Environment variables

Create a `.env.local` file at the project root:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## Getting Started

**1. Start the app container:**

```bash
docker compose up -d
```

**2. Install dependencies:**

```bash
npm install
```

**3. Start the development server:**

```bash
npm run dev
```

Open the URL shown in the terminal (default: `http://localhost:3000`).

## Scripts

| Command | Description |
| ------- | ----------- |
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## API

The client connects to a REST API. Endpoints used:

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| `GET` | `/bank-accounts` | List bank accounts |
| `GET` | `/bank-accounts/:id` | Get bank account by ID |
| `GET` | `/bank-accounts/:id/transactions` | List account transactions |
| `POST` | `/bank-accounts/:id/transactions` | Create a transaction (transfer) |
| `GET` | `/bank-accounts/:id/pix-keys` | List Pix keys for account |
| `POST` | `/bank-accounts/:id/pix-keys` | Register a Pix key |
