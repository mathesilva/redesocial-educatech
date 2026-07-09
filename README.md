# Educational Social Network

A social network focused on education where teachers create challenges (missions) and students publish content related to disciplines, receiving likes, comments, and gamification points.

## Overview

This monorepo-style project contains the backend infrastructure for the Educational Social Network platform. The current phase delivers a solid foundation: server setup, Docker configuration, Prisma initialization, modular folder structure, and documentation.

Business logic, authentication, database models, and domain endpoints are **not implemented yet**.

## Technologies

| Technology       | Purpose                    |
| ---------------- | -------------------------- |
| Node.js 22       | Runtime                    |
| TypeScript       | Type-safe development      |
| Fastify          | HTTP server framework      |
| Prisma ORM       | Database access layer      |
| PostgreSQL 17    | Relational database        |
| Docker           | Containerization           |
| Zod              | Schema validation          |
| JWT              | Authentication (planned)   |
| ESLint/Prettier  | Code quality               |

## Project Structure

```
educational-social-network/
├── backend/              # API server
│   ├── src/
│   │   ├── app/          # Server, routes, plugins
│   │   ├── config/       # Configuration
│   │   ├── modules/      # Domain modules
│   │   └── shared/       # Shared utilities
│   ├── prisma/           # Database schema
│   ├── tests/            # Tests
│   └── Dockerfile        # Backend container image
├── docs/                 # Project documentation
├── docker/               # Docker-related configs
└── docker-compose.yml    # Infrastructure orchestration
```

## Getting Started

### Prerequisites

- Node.js 22+
- Docker & Docker Compose
- npm

### 1. Clone and configure

```bash
cd backend
cp .env.example .env
npm install
```

### 2. Start infrastructure

```bash
# From project root
docker compose up -d
```

### 3. Initialize Prisma

```bash
cd backend
npm run prisma:generate
```

### 4. Run the API

```bash
npm run dev
```

Verify the health check:

```bash
curl http://localhost:3333/health
```

Expected response:

```json
{
  "status": "ok",
  "timestamp": "2026-07-09T18:00:00.000Z"
}
```

## Docker

PostgreSQL runs via Docker Compose with a persistent volume.

| Parameter | Value        |
| --------- | ------------ |
| Database  | education_db |
| User      | postgres     |
| Password  | postgres     |
| Port      | 5432         |

See [docs/Docker.md](docs/Docker.md) for details.

## Prisma

Prisma is initialized with PostgreSQL as the datasource. No models are defined yet.

```bash
cd backend
npm run prisma:generate   # Generate client
npm run prisma:migrate    # Run migrations (when models exist)
npm run prisma:studio     # Open database GUI
```

See [docs/Database.md](docs/Database.md) for details.

## Scripts

All scripts run from the `backend/` directory:

| Script                    | Description                    |
| ------------------------- | ------------------------------ |
| `npm run dev`             | Development server             |
| `npm run build`           | TypeScript compilation         |
| `npm start`               | Production server              |
| `npm run lint`            | ESLint                         |
| `npm run format`          | Prettier formatting            |
| `npm run prisma:generate` | Generate Prisma Client         |
| `npm run prisma:migrate`  | Database migrations            |
| `npm run prisma:studio`   | Prisma Studio                  |

## Documentation

| Document                           | Description              |
| ---------------------------------- | ------------------------ |
| [Architecture](docs/Architecture.md) | System architecture  |
| [Docker](docs/Docker.md)           | Container setup          |
| [Database](docs/Database.md)       | Database and Prisma      |
| [Git Flow](docs/GitFlow.md)        | Branching strategy       |
| [API](docs/API.md)                 | API reference            |

## Best Practices

- **Modular architecture**: Domains isolated in `src/modules/` with clear responsibilities.
- **TypeScript strict mode**: Full type safety enforced at compile time.
- **Environment validation**: All config validated with Zod at startup.
- **SOLID principles**: Applied where they add clarity without over-engineering.
- **Consistent naming**: camelCase for code, snake_case for database (planned).
- **Growth-ready**: Structure prepared for controllers, services, and repositories per module.

## License

UNLICENSED — Private project.
