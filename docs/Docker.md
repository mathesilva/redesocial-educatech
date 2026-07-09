# Docker

Docker-related configuration and notes for the Educational Social Network project.

## Overview

The project uses Docker Compose to orchestrate infrastructure services. The backend is prepared to run in a separate container when needed.

## Services

| Service    | Image              | Port | Description        |
| ---------- | ------------------ | ---- | ------------------ |
| PostgreSQL | postgres:17-alpine | 5432 | Primary database   |

## Volumes

- `postgres_data`: Persistent storage for PostgreSQL data.

## Commands

```bash
# Start all services
docker compose up -d

# Stop all services
docker compose down

# View logs
docker compose logs -f postgres

# Remove containers and volumes (destructive)
docker compose down -v
```

## Backend Container

The backend Dockerfile is located at `backend/Dockerfile`. The backend service is commented out in `docker-compose.yml` and can be enabled when the API is ready to run in Docker.

## Environment

Database connection string for local development:

```
postgresql://postgres:postgres@localhost:5432/education_db?schema=public
```

When running the backend inside Docker, use `postgres` as the hostname instead of `localhost`.
