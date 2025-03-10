# API Routes Migration to Deno Backend

As part of the ongoing improvements to the Lighthouse Bible Platform, all API routes previously handled by the Next.js framework have been migrated to a dedicated Deno backend. This change enhances the separation of concerns, scalability, and performance of the platform.

## Key Changes

1. **API Routes Removed from Next.js**:
   - The API routes under the `frontend/app/api/` directory have been removed.
   - These routes are now served by the Deno backend.

2. **Deno Backend**:
   - The Deno backend is responsible for handling all API requests, including authentication, Bible content retrieval, and WebSocket connections.
   - The backend is built using the [Oak](https://deno.land/x/oak) framework and integrates with a PostgreSQL database.

## How to Use the New API

The frontend now communicates with the Deno backend via HTTP requests. The base URL for the backend is:

```
http://localhost:8000
```

### Example API Endpoints

- **Authentication**:
  - `POST /auth/login`: Authenticate a user and retrieve a JWT token.
  - `PUT /auth/register`: Register a new user.

- **Bible Content**:
  - `GET /bible?book=<book>&chapter=<chapter>`: Fetch Bible content for a specific book and chapter.

### Updating the Frontend

To interact with the new backend, the frontend uses the `frontend/lib/api.ts` module. This module provides utility functions for making API requests, such as `login`, `register`, and `fetchBibleContent`.

## Benefits of the Migration

- **Improved Performance**: The Deno backend is optimized for handling API requests efficiently.
- **Better Scalability**: The separation of frontend and backend allows for independent scaling of each component.
- **Enhanced Maintainability**: The dedicated backend simplifies the codebase and makes it easier to manage API logic.

## Next Steps

- Ensure that the Deno backend is running before starting the frontend.
- Update any frontend components that directly interacted with the removed Next.js API routes to use the new backend endpoints.

For more details about the Deno backend, refer to the [backend README](../../../backend/README.md).
