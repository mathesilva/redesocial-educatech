# Architecture

## Overview

Educational Social Network is a modular monolith backend built with TypeScript and Fastify. The architecture is designed to support growth while keeping boundaries clear between domains.

## Layers

```
src/
├── app/          # Application bootstrap, server, routes, and plugins
├── config/       # Environment and application configuration
├── modules/      # Domain modules (auth, users, posts, etc.)
└── shared/       # Cross-cutting utilities and shared types
```

## Module Structure

Each domain module will follow a consistent internal structure:

```
modules/<domain>/
├── controllers/
├── services/
├── repositories/
├── schemas/
└── routes/
```

This structure is not implemented yet. Each module currently contains only a README describing its responsibility.

## Design Principles

- **Modular monolith**: Domains are isolated in modules with clear boundaries.
- **SOLID**: Single responsibility per service; dependency inversion via interfaces where applicable.
- **Strict TypeScript**: Full type safety with strict compiler options.
- **Validation at the edge**: Request validation with Zod schemas at route boundaries.
- **Configuration via environment**: All runtime config loaded and validated at startup.

## Request Flow

```
Client → Fastify Route → Controller → Service → Repository → Database
```

## Future Considerations

- Authentication via JWT (dependencies installed, not yet implemented).
- Prisma ORM for data access (schema initialized, no models yet).
- Event-driven notifications for gamification and social interactions.
