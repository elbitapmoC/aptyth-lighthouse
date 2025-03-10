# API Integration with Deno Backend

This directory contains information about the API routes for the Lighthouse Bible Platform. All API routes are now handled by the Deno backend, which provides a robust and scalable solution for managing server-side logic.

## Overview

The Deno backend is responsible for handling all API requests, including authentication, database interactions, and WebSocket communication. It is built using the [Oak](https://deno.land/x/oak) framework and follows modern best practices for API development.

## Key Features

- **Authentication**: Secure user authentication using JWT tokens.
- **Database Integration**: Seamless interaction with a PostgreSQL database.
- **WebSocket Support**: Real-time communication using WebSocket connections.
- **CORS Handling**: Cross-Origin Resource Sharing (CORS) is configured to allow requests from the frontend.

## API Endpoints

The following API endpoints are available:

### Authentication

- **POST** `/auth/login`: Authenticate a user and return a JWT token.
- **PUT** `/auth/register`: Register a new user.

### WebSocket

The WebSocket server is available at `ws://localhost:8080`. It supports real-time communication for features like live updates and notifications.

## How to Use

1. **Base URL**: The base URL for the API is `http://localhost:8000`.
2. **Headers**: Include the following headers in your requests:
   - `Content-Type: application/json`
   - `Authorization: Bearer <JWT_TOKEN>` (for protected routes)
3. **WebSocket**: Connect to the WebSocket server at `ws://localhost:8080` for real-time features.

## Example Usage

### Login Request

```bash
curl -X POST http://localhost:8000/auth/login \
-H "Content-Type: application/json" \
-d '{"email": "user@example.com", "password": "password123"}'
```

### WebSocket Connection

```javascript
const ws = new WebSocket("ws://localhost:8080");

ws.onopen = () => {
  console.log("WebSocket connection established.");
  ws.send("Hello, server!");
};

ws.onmessage = (event) => {
  console.log("Message from server:", event.data);
};

ws.onclose = () => {
  console.log("WebSocket connection closed.");
};
```

## Notes

- Ensure the backend server is running before making API requests or connecting to the WebSocket server.
- For more details about the backend, refer to the [backend README](../../../backend/README.md).

## Contributing

If you need to add or modify API routes, make changes in the `backend` directory and ensure they are documented here.

