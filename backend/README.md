# Educational Social Network — Backend

Backend API for the Educational Social Network platform.

## Description

A social network focused on education where teachers create challenges (missions) and students publish content related to disciplines, receiving likes, comments, and gamification points.

This repository contains the backend infrastructure. Business logic, authentication, and database models are not implemented yet.

## Technologies

- Node.js 22
- TypeScript
- Fastify
- Prisma ORM
- PostgreSQL 17
- Docker & Docker Compose
- Zod
- JWT (dependencies installed)
- ESLint & Prettier

## Prerequisites

- Node.js 22+
- Docker & Docker Compose
- npm

## Getting Started

### 1. Environment

```bash
cp .env.example .env
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start PostgreSQL

From the project root:

```bash
docker compose up -d
```

### 4. Prisma

```bash
npm run prisma:generate
```

### 5. Run the server

```bash
npm run dev
```

The API will be available at `http://localhost:3333`.

### Health Check

```bash
curl http://localhost:3333/health
```

## Scripts

| Script              | Description                          |
| ------------------- | ------------------------------------ |
| `npm run dev`       | Start development server with hot reload |
| `npm run build`     | Compile TypeScript to JavaScript     |
| `npm start`         | Run compiled production build        |
| `npm run lint`      | Run ESLint                           |
| `npm run format`    | Format code with Prettier            |
| `npm run prisma:generate` | Generate Prisma Client           |
| `npm run prisma:migrate`  | Run database migrations          |
| `npm run prisma:studio`   | Open Prisma Studio               |

## Project Structure

```
backend/
├── src/
│   ├── app/
│   │   ├── plugins/     # Fastify plugins
│   │   ├── routes/      # Route registration
│   │   └── server.ts    # Server builder
│   ├── config/          # Environment configuration
│   ├── modules/         # Domain modules
│   │   ├── auth/
│   │   ├── users/
│   │   ├── posts/
│   │   ├── comments/
│   │   ├── missions/
│   │   ├── ranking/
│   │   ├── notifications/
│   │   └── dashboard/
│   ├── shared/          # Shared utilities
│   └── index.ts         # Application entry point
├── prisma/              # Prisma schema and migrations
├── tests/               # Test files
└── Dockerfile           # Container image definition
```

## Best Practices

- TypeScript strict mode enabled.
- Environment variables validated with Zod at startup.
- Modular architecture with clear domain boundaries.
- Consistent naming conventions across the codebase.
- SOLID principles applied where appropriate.

## Documentation

See the `docs/` directory at the project root for architecture, Docker, database, Git flow, and API documentation.
