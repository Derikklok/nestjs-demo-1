# NestJS Demo Application

A RESTful API built with NestJS, TypeORM, and PostgreSQL for managing tasks and books.

## Features

- Task management with CRUD operations
- Task status tracking (PENDING, IN_PROGRESS, DONE)
- PostgreSQL database integration
- TypeORM for database operations
- Input validation and error handling

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database
- npm or yarn

## Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd demo-1

# Install dependencies
npm install

# Start the application in development mode
npm run start:dev
```

## Environment Setup

The application connects to a PostgreSQL database. Update the database configuration in `src/app.module.ts` if needed.

## API Documentation

### Base URL
```
http://localhost:3000
```

## Tasks Endpoints

### 1. Create a Task
**POST** `/tasks`

Creates a new task with PENDING status by default.

**Request Body:**
```json
{
  "title": "Complete project documentation",
  "description": "Write comprehensive API documentation for the project"
}
```

**Response (201 Created):**
```json
{
  "id": 1,
  "title": "Complete project documentation",
  "description": "Write comprehensive API documentation for the project",
  "status": "PENDING"
}
```

### 2. Get All Tasks
**GET** `/tasks`

Retrieves all tasks from the database.

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "title": "Complete project documentation",
    "description": "Write comprehensive API documentation for the project",
    "status": "PENDING"
  },
  {
    "id": 2,
    "title": "Review code",
    "description": "Perform code review for the new features",
    "status": "IN_PROGRESS"
  }
]
```

### 3. Get Task by ID
**GET** `/tasks/:id`

Retrieves a specific task by its ID.

**URL Parameters:**
- `id` (number) - The task ID

**Example:** `GET /tasks/1`

**Response (200 OK):**
```json
{
  "id": 1,
  "title": "Complete project documentation",
  "description": "Write comprehensive API documentation for the project",
  "status": "PENDING"
}
```

**Error Responses:**
- **400 Bad Request** - Invalid ID format
```json
{
  "statusCode": 400,
  "message": "ID must be a valid positive number",
  "error": "Bad Request"
}
```

- **404 Not Found** - Task not found
```json
{
  "statusCode": 404,
  "message": "Task with ID 999 not found",
  "error": "Not Found"
}
```

### 4. Update Task Status
**PATCH** `/tasks/:id/status`

Updates the status of a specific task.

**URL Parameters:**
- `id` (number) - The task ID

**Request Body:**
```json
{
  "status": "IN_PROGRESS"
}
```

**Valid Status Values:**
- `PENDING`
- `IN_PROGRESS`
- `DONE`

**Example:** `PATCH /tasks/1/status`

**Response (200 OK):**
```json
{
  "id": 1,
  "title": "Complete project documentation",
  "description": "Write comprehensive API documentation for the project",
  "status": "IN_PROGRESS"
}
```

### 5. Delete Task
**DELETE** `/tasks/:id`

Deletes a specific task by its ID.

**URL Parameters:**
- `id` (number) - The task ID

**Example:** `DELETE /tasks/1`

**Response (200 OK):**
```json
{
  "message": "Task with ID 1 deleted successfully"
}
```

**Error Responses:**
- **400 Bad Request** - Invalid ID format
```json
{
  "statusCode": 400,
  "message": "ID must be a valid positive number",
  "error": "Bad Request"
}
```

- **404 Not Found** - Task not found
```json
{
  "statusCode": 404,
  "message": "Task with ID 999 not found",
  "error": "Not Found"
}
```

## Task Status Enum

The application uses the following status values:

| Status | Description |
|--------|-------------|
| `PENDING` | Task is created but not started (default) |
| `IN_PROGRESS` | Task is currently being worked on |
| `DONE` | Task is completed |

## Database Schema

### Task Entity

| Field | Type | Description |
|-------|------|-------------|
| `id` | number | Primary key, auto-generated |
| `title` | string | Task title (required) |
| `description` | string | Task description (required) |
| `status` | TaskStatus | Task status (default: PENDING) |

## Running the Application

```bash
# Development mode
npm run start:dev

# Production mode
npm run start:prod

# Debug mode
npm run start:debug
```

## Testing

```bash
# Run unit tests
npm run test

# Run e2e tests
npm run test:e2e

# Run tests with coverage
npm run test:cov
```

## Project Structure

```
src/
├── app.controller.ts
├── app.module.ts
├── app.service.ts
├── main.ts
├── organizations/
│   └── organizations.controller.ts
└── tasks/
    ├── task.entity.ts
    ├── tasks.controller.ts
    ├── tasks.module.ts
    ├── tasks.service.ts
    └── *.spec.ts (test files)
```

## Technologies Used

- **NestJS** - Progressive Node.js framework
- **TypeORM** - ORM for TypeScript and JavaScript
- **PostgreSQL** - Relational database
- **TypeScript** - Typed superset of JavaScript
- **Jest** - Testing framework

## Error Handling

The API implements comprehensive error handling:

- **400 Bad Request** - Invalid input data or malformed requests
- **404 Not Found** - Resource not found
- **500 Internal Server Error** - Server-side errors

All error responses follow a consistent format:
```json
{
  "statusCode": 400,
  "message": "Descriptive error message",
  "error": "Error Type"
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## License

This project is licensed under the UNLICENSED license.
