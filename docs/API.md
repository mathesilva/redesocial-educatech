# API

## Overview

RESTful API for the Educational Social Network. Built with Fastify and TypeScript.

Base URL (local development): `http://localhost:3333`

## Conventions (planned)

- JSON request and response bodies.
- HTTP status codes following REST standards.
- Validation errors return `400` with structured error details.
- Authentication via Bearer JWT (not yet implemented).

## Endpoints

### Health Check

Check if the API is running.

```
GET /health
```

**Response** `200 OK`

```json
{
  "status": "ok",
  "timestamp": "2026-07-09T18:00:00.000Z"
}
```

## Future Modules

The following endpoint groups will be added in future iterations:

| Module        | Prefix (planned)     | Description                    |
| ------------- | -------------------- | ------------------------------ |
| Auth          | `/auth`              | Login, registration, tokens    |
| Users         | `/users`             | User profiles and management   |
| Posts         | `/posts`             | Student content publications   |
| Comments      | `/comments`          | Post comments                  |
| Missions      | `/missions`          | Teacher challenges             |
| Ranking       | `/ranking`           | Gamification and leaderboards  |
| Notifications | `/notifications`     | User notifications             |
| Dashboard     | `/dashboard`         | Analytics and aggregated data  |

## Error Format (planned)

```json
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": "Validation failed",
  "details": []
}
```
