# Lighthouse Bible Platform - Backend (Deno + Hono)

This is the backend service for the Lighthouse Bible Platform, built with [Deno](https://deno.land/) and the [Hono](https://hono.dev) framework. It provides REST API endpoints for user authentication, Bible verse retrieval, and WebSocket connections for real-time features.

## Prerequisites

*   [Deno](https://deno.land/) (v1.38 or later recommended)
*   A PostgreSQL database (Neon recommended)

## Environment Variables

Create a `.env` file in the `backend` directory (or set these as environment variables in your deployment environment):

*   **`DATABASE_URL`:** Your Neon PostgreSQL connection string.  The `sslmode=require` part is *essential* for secure connections to Neon.
*   **`JWT_SECRET`:** A *strong, random secret key* used for signing and verifying JWTs.  **Do not use the example value in production!**  Generate a long, random string.
*   **`PORT`:** (Optional) The port the server listens on. Defaults to 8000.

## Getting Started

1.  **Clone the Repository:**

    ```bash
    git clone [https://github.com/elbitapmoC/aptyth-lighthouse.git](https://github.com/elbitapmoC/aptyth-lighthouse.git)
    cd aptyth-lighthouse/backend
    ```

2.  **Install Dependencies:**

    Deno handles dependencies automatically, but it's best practice to explicitly cache them:

    ```bash
    deno task cache
    ```
    This command uses the `cache` task defined in `deno.jsonc` to download and cache all project dependencies, and to create (or update) the `deno.lock` file for reproducible builds.

3. **Create the Tables**
    ```sql
        CREATE TABLE users (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            created_at TIMESTAMPTZ DEFAULT now(),
            updated_at TIMESTAMPTZ DEFAULT now()
        );
        CREATE TABLE verses (
        	book TEXT NOT NULL,
        	chapter INTEGER NOT NULL,
        	verse INTEGER NOT NULL,
        	text TEXT NOT NULL,
        	version TEXT NOT NULL,
        	PRIMARY KEY (book, chapter, verse, version)
        );
        ```

## Running the Server

*   **Development (with auto-reload):**

    ```bash
    deno task dev
    ```

*   **Production:**

    ```bash
    deno task start
    ```

The server will start on `http://localhost:8000` (or the port you specified in your `.env`).

## Project Structure (`backend/`)
backend/
├── api/           # API route handlers (Hono)
│   ├── auth.ts     # Authentication routes (register, login, logout)
│   ├── bible.ts    # Bible verse routes
│   └── user.ts     # User profile route (example)
├── db/
│   ├── client.ts   # Database connection setup (Neon/Postgres)
│   └── queries.ts  # Database query functions
├── middleware/
│   └── authMiddleware.ts # JWT authentication middleware
├── models/       # Data models (Zod schemas)
│   ├── user.ts
│   └── verse.ts
├── websockets/   # WebSocket logic
│   ├── connectionManager.ts  # Manages WebSocket connections
│   └── handlers.ts        # Handles WebSocket events
├── utils/
│   ├── auth.ts    # Authentication helpers (hashing, JWT)
│   └── logger.ts   # Logging
├── server.ts    # Main server entry point (Hono)
├── deno.jsonc  # Deno configuration
└── deps.ts      # Dependency management


## Key Technologies

*   **Deno:** A secure and modern JavaScript/TypeScript runtime.
*   **Hono:** An ultrafast web framework for Deno.
*   **PostgreSQL (Neon):**  A serverless PostgreSQL database.
*   **Zod:**  A TypeScript-first schema declaration and validation library.
*   **bcrypt:**  For password hashing.
*   **jose:**  For JSON Web Token (JWT) creation and verification.
*   **WebSockets:** For real-time communication.

## API Endpoints (Example)

*   **Authentication:**
    *   `POST /api/auth/register`: Register a new user.
    *   `POST /api/auth/login`:  Login and get a JWT.
    *   `GET /api/auth/logout`: logout.
*   **Bible Verses:**
    *   `GET /api/bible/:version/:book/:chapter/:verse`: Get a specific Bible verse.
* **User**
    *   `GET /api/profile`: Get profile.
*   **WebSockets:**
    *   `GET /ws`:  Establish a WebSocket connection (requires authentication).

## `deno.jsonc` Configuration

The `deno.jsonc` file configures Deno's behavior:

```jsonc
{
  "tasks": {
    "start": "deno task cache && deno run --allow-net --allow-read --allow-env server.ts",
    "dev": "deno task cache && deno run --allow-net --allow-read --allow-env --watch server.ts",
    "lint": "deno lint",
    "fmt": "deno fmt",
    "test": "deno test --allow-env --allow-read --allow-net",
    "cache": "deno cache --lock=deno.lock server.ts"
  },
  "imports": {
    "hono": "npm:hono@4.0.8",
    "hono/": "npm:hono@4.0.8/",
    "zod": "npm:zod@3.22.4",
    "bcrypt": "npm:bcrypt@0.4.1",
    "jose": "npm:jose@4.14.4",
    "dotenv/": "[https://deno.land/std@0.218.0/dotenv/](https://deno.land/std@0.218.0/dotenv/)",
    "deno-postgres": "[https://deno.land/x/postgres@v0.17.0/mod.ts](https://deno.land/x/postgres@v0.17.0/mod.ts)",
    "std/": "[https://deno.land/std@0.218.0/](https://deno.land/std@0.218.0/)"
  },
  "lint": {
    "rules": {
      "tags": ["recommended"]
    }
  },
  "fmt": {
    "useTabs": true,
    "lineWidth": 80,
    "indentWidth": 4,
    "singleQuote": true,
    "proseWrap": "preserve"
  },
  "nodeModulesDir": true
}