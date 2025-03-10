# Deno Backend for Lighthouse Bible Platform

This is the backend service for the Lighthouse Bible Platform, built using [Deno](https://deno.land/) and the [Oak](https://deno.land/x/oak) framework. It provides API endpoints for authentication, database interactions, and other backend functionalities.

## Prerequisites

Before running the backend, ensure you have the following installed:

- [Deno](https://deno.land/) (v1.35.0 or later)
- A PostgreSQL database instance
- Environment variables configured (see below)

## Environment Variables

Create a `.env` file in the `backend` directory or set the following environment variables in your system:

- `DATABASE_URL`: The connection string for your PostgreSQL database.
- `JWT_SECRET`: A secret key for signing JWT tokens.
- `PORT` (optional): The port number for the server (default is `8000`).

Example `.env` file:

```
DATABASE_URL=postgres://user:password@localhost:5432/database_name
JWT_SECRET=your_jwt_secret_key
PORT=8000
```

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/elbitapmoC/aptyth-lighthouse.git
   cd aptyth-lighthouse/backend
   ```

2. Install dependencies (Deno automatically fetches dependencies when running the application).

## Running the Server

To start the backend server, run the following command:

```bash
deno task start
```

This will start the server on the specified port (default: `8000`). You can access the API at `http://localhost:8000`.

### Import Map Path

Ensure that the `--import-map` flag in the `deno.jsonc` file points to the correct path for the `import_map.json` file. For example:

```json
"importMap": "./import_map.json"
```

If you encounter issues with imports, verify that the `import_map.json` file exists and is correctly configured.

### Resolving TypeScript Errors

If you encounter TypeScript errors, ensure the following:

1. The `tsconfig.json` file includes all necessary files:
   ```json
   "include": ["**/*.ts", "types.d.ts"]
   ```

2. The `types.d.ts` file is present and includes type declarations for external modules, such as:
   ```ts
   declare module "oak" {
     export * from "https://deno.land/x/oak/mod.ts";
   }
   ```

3. Run the following command to check for TypeScript issues:
   ```bash
   deno check backend/main.ts

## Development

### File Structure

- `main.ts`: The entry point of the application.
- `routes/`: Contains route handlers for different API endpoints.
  - `auth.ts`: Handles authentication routes (e.g., login, register).
  - `mod.ts`: Combines and exports all routes.
- `middleware/`: Contains middleware for the application.
  - `cors.ts`: Handles Cross-Origin Resource Sharing (CORS).
- `db/`: Contains database connection and query utilities.
- `utils/`: Contains utility functions (e.g., JWT token generation and verification).

### Running Tests

To run tests, use the following command:

```bash
deno task test
```

### Linting and Formatting

Deno includes built-in linting and formatting tools. Use the following commands:

- Linting:

  ```bash
  deno lint
  ```

- Formatting:

  ```bash
  deno fmt
  ```

## API Endpoints

### Authentication

- **POST** `/auth/login`: Authenticate a user and return a JWT token.
- **PUT** `/auth/register`: Register a new user.

### Example Request

#### Login

```bash
curl -X POST http://localhost:8000/auth/login \
-H "Content-Type: application/json" \
-d '{"email": "user@example.com", "password": "password123"}'
```

#### Register

```bash
curl -X PUT http://localhost:8000/auth/register \
-H "Content-Type: application/json" \
-d '{"email": "user@example.com", "password": "password123"}'
```

## Deployment

To deploy the backend, ensure the environment variables are set on the target server and run the `deno task start` command. You can use a process manager like [PM2](https://pm2.keymetrics.io/) or a containerization tool like Docker for production deployments.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes and push the branch.
4. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](../LICENSE) file for details.