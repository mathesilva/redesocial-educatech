# Database

## Overview

The project uses PostgreSQL 17 as the primary database, managed through Prisma ORM.

## Connection

| Parameter | Value         |
| --------- | ------------- |
| Host      | localhost     |
| Port      | 5432          |
| Database  | education_db  |
| User      | postgres      |
| Password  | postgres      |

Connection string:

```
postgresql://postgres:postgres@localhost:5432/education_db?schema=public
```

## Prisma

Prisma is initialized with a PostgreSQL datasource. No models have been defined yet.

### Schema Location

```
backend/prisma/schema.prisma
```

### Commands

Run from the `backend/` directory:

```bash
# Generate Prisma Client
npm run prisma:generate

# Create and apply migrations
npm run prisma:migrate

# Open Prisma Studio
npm run prisma:studio
```

## Migrations

Migration files will be stored in `backend/prisma/migrations/` once models are created and the first migration is applied.

## Conventions (planned)

- Table names in snake_case via `@@map`.
- UUID primary keys for entities.
- `created_at` and `updated_at` timestamps on all tables.
- Soft deletes where appropriate.
