# API Routes Migration to Deno Backend

As part of the ongoing improvements to the Lighthouse Bible Platform, all API routes previously handled by the Next.js framework have been migrated to a dedicated Deno backend. This change enhances the separation of concerns, scalability, and performance of the platform.

## Key Changes

1.  **API Routes Removed from Next.js**:
    *   The API routes under the `frontend/app/api/` directory have been removed.
    *   These routes are now served by the Deno backend.

2.  **Deno Backend**:
    *   The Deno backend is responsible for handling all API requests, including authentication, Bible content retrieval, and WebSocket connections.
    *   The backend is built using the [Hono](https://hono.dev) framework and integrates with a PostgreSQL database (Neon).

## How to Use the New API

The frontend now communicates with the Deno backend via HTTP requests. The base URL for the backend API is: `http://localhost:8000/api`

**Note:** All routes are prefixed with `/api`.

### Example API Endpoints

*   **Authentication**:
    *   `POST /api/auth/login`: Authenticate a user and set a JWT cookie.
    *   `POST /api/auth/register`: Register a new user.
    *   `GET /api/auth/logout`: Log out a user
*   **Bible Content**:
    *   `GET /api/bible/:version/:book/:chapter/:verse`: Fetch a specific Bible verse.
* **User**
    *    `GET /api/profile`: Get user's profile.

### Updating the Frontend

To interact with the new backend, the frontend should make HTTP requests to the Deno backend endpoints (listed above and in the `backend/README.md`).  You no longer need a `frontend/lib/api.ts` file specifically for interacting with Next.js API routes.  Instead, use standard `fetch` calls (or a library like `TanStack Query`) to communicate with the Deno backend.

## Benefits of the Migration

*   **Improved Performance**: The Deno backend, built with Hono, is optimized for handling API requests efficiently.
*   **Better Scalability**: The separation of frontend and backend allows for independent scaling of each component.
*   **Enhanced Maintainability**: The dedicated backend simplifies the codebase and makes it easier to manage API logic.
*   **Full Control:** You have complete control over your API implementation, using Deno's powerful features and security model.

## Next Steps

*   Ensure that the Deno backend is running before starting the frontend.
*   Update any frontend components that directly interacted with the removed Next.js API routes to use the new Deno backend endpoints (via `fetch` or a similar library).
*   Use the new base url.

For more details about the Deno backend, refer to the [backend README](../../../backend/README.md).