# OstrideLabs Tasks — Monorepo

This repository contains a full-stack ToDo application built with a Vite + React + TypeScript frontend and a Node.js + Express backend using PostgreSQL.

Quick links
- Frontend README: packages/frontend/README.md
- Backend README: packages/backend/README.md

Summary
-------
- Frontend: Vite + React + TypeScript, Material UI, TanStack Query, @dnd-kit for drag-and-drop.
- Backend: Node.js + Express, PostgreSQL, Knex migrations.
- Database: PostgreSQL running in Docker (docker-compose).
- Monorepo: npm workspaces (packages/*).

Prerequisites
-------------
- Node.js (>=20)
- Docker & Docker Compose (for PostgreSQL)

Install
-------
```bash
npm install
```

Scripts
----------------------
These scripts call into package workspaces for convenience (see `package.json` at repo root):

- `npm run frontend:dev` — Start the frontend dev server (Vite)
- `npm run frontend:build` — Build the frontend for production
- `npm run backend:dev` — Start the backend dev server (nodemon/tsx)
- `npm run backend:build` — Build the backend
- `npm run backend:migrate:latest` — Run backend migrations
- `npm run backend:db:up` — Start PostgreSQL (docker-compose)
- `npm run backend:db:down` — Stop PostgreSQL and remove volumes
- `npm run backend:db:restart` — Restart PostgreSQL

Quickstart (development)
------------------------
1. Install dependencies:

```bash
npm install
```

2. Start the database:

```bash
npm run backend:db:up
```

_Wait for the container to be ready._

3. Run database migrations (backend package):

```bash
npm run backend:migrate:latest
```

4. Start the backend (new terminal):

```bash
npm run backend:dev
```

Default: http://localhost:3001

5. Start the frontend (another terminal):

```bash
npm run frontend:dev
```

Default: http://localhost:5173

6. Open your browser at http://localhost:5173

## Architecture Overview

```
Browser (http://localhost:5173)
    ↓
React Frontend (Vite)
    ↓
React Query (Caching)
    ↓
REST API (http://localhost:3001)
    ↓
Express Backend (Node.js)
    ↓
PostgreSQL Database (Docker, port 5432)
```

Next steps
-------------------------
- Persist ordering 
- Add authentication
- Unit/integration tests
- Server-side pagination
- Optimistic updates for React Query
- Add tsoa lib support
- Add OpenAPI spec generation
- Improve error handling and notifications
-------------------------
