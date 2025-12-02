# Backend API Service

Node.js/Express REST API for OstrideLabs Tasks application.

## Summary

This service provides a simple REST API to manage todos, backed by PostgreSQL and using Knex for migrations.

## Features

- RESTful API for CRUD operations on todos
- PostgreSQL database containerized with Docker
- Knex migrations included

## Prerequisites

- Node.js (>=20)
- Docker (for running PostgreSQL)

## Environment

Create a `.env` file in this package (or set environment variables in your environment) with the values below:

```
PORT=3001
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/todos_db
```

## Scripts

Available npm scripts:

- `npm run dev` - start the dev server with hot reloading (nodemon + tsx)
- `npm run build` - compile TypeScript to `dist/`
- `npm run start` - run the compiled `dist/index.js` (production)
- `npm run migrate:latest` - run Knex migrations (migrate to latest)
- `npm run migrate:up` - run a single up migration step
- `npm run migrate:down` - rollback last migration
- `npm run db:up` - start PostgreSQL database using docker-compose
- `npm run db:down` - stop PostgreSQL database using docker-compose **drop volume with DB data**
- `npm run db:logs` - view PostgreSQL database logs
- `npm run db:restart` - restart PostgreSQL database using docker-compose

## How to start server:
1. Install dependencies
```bash
npm install
```
2. Start PostgreSQL database (using docker-compose)
```bash
npm run db:up
```
3. Run migrations to set up database schema
```bash
npm run migrate:latest
```

4. Start the development server
```bash
npm run dev
```

## API Endpoints

Base path: `/api/todos`

- `GET /api/todos`
  - Response: 200 JSON array of todo rows
- `GET /api/todos/:id`
  - Response: 200 JSON todo object or 404
- `POST /api/todos`
  - Body: JSON with at minimum `{ id: string, title: string }` (id is generated client-side in the frontend)
  - Example body:

```json
{
  "id": "uuid-v4",
  "title": "Buy milk",
  "description": "2 liters",
  "completed": false
}
```

  - Response: 200 JSON of created todo
- `PUT /api/todos/:id`
  - Body: JSON with `{ title: string, description?: string, completed?: boolean }`
  - Response: 200 JSON of updated todo or 404
- `PATCH /api/todos/:id/toggle`
  - No body required. Toggles the `completed` boolean for the todo and returns the updated todo.
  - Response: 200 JSON of updated todo or 404
- `DELETE /api/todos/:id`
  - Response: 200 JSON message on success or 404
