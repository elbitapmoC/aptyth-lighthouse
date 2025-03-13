# API Documentation

## Base URL
```
http://localhost:8000 (Development)
https://api.aptyth.com (Production)
```

## Authentication

### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "string",
  "password": "string"
}
```

### Logout
```http
POST /api/auth/logout
Authorization: Bearer <token>
```

## Bible API

### Get Chapter
```http
GET /api/bible/chapter/{chapterId}
Authorization: Bearer <token>

Response:
{
  "book": "string",
  "chapter": number,
  "verses": [
    {
      "verse": number,
      "text": "string"
    }
  ]
}
```

### Search Verses
```http
GET /api/bible/search
Authorization: Bearer <token>
Query Parameters:
  - q: string (search query)
  - translation: string (default: "KJV")
  - limit: number (default: 20)
  - offset: number (default: 0)

Response:
{
  "results": [
    {
      "book": "string",
      "chapter": number,
      "verse": number,
      "text": "string",
      "relevance": number
    }
  ],
  "total": number
}
```

### Get Cross References
```http
GET /api/bible/cross-references/{verseId}
Authorization: Bearer <token>

Response:
{
  "references": [
    {
      "book": "string",
      "chapter": number,
      "verse": number,
      "text": "string",
      "relevance": number
    }
  ]
}
```

## User Data

### Get Profile
```http
GET /api/profile
Authorization: Bearer <token>

Response:
{
  "id": "string",
  "name": "string",
  "email": "string",
  "preferences": {
    "theme": "light" | "dark",
    "translation": "string",
    "fontSize": number
  }
}
```

### Update Profile
```http
PATCH /api/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "string",
  "preferences": {
    "theme": "light" | "dark",
    "translation": "string",
    "fontSize": number
  }
}
```

### Get Reading Progress
```http
GET /api/profile/progress
Authorization: Bearer <token>

Response:
{
  "chaptersRead": number,
  "streak": number,
  "lastRead": {
    "book": "string",
    "chapter": number,
    "timestamp": string
  }
}
```

## Study Tools

### Save Note
```http
POST /api/notes
Authorization: Bearer <token>
Content-Type: application/json

{
  "verseId": "string",
  "content": "string",
  "tags": ["string"]
}
```

### Get Notes
```http
GET /api/notes
Authorization: Bearer <token>
Query Parameters:
  - verseId: string (optional)
  - tag: string (optional)

Response:
{
  "notes": [
    {
      "id": "string",
      "verseId": "string",
      "content": "string",
      "tags": ["string"],
      "createdAt": string,
      "updatedAt": string
    }
  ]
}
```

### Save Highlight
```http
POST /api/highlights
Authorization: Bearer <token>
Content-Type: application/json

{
  "verseId": "string",
  "color": "string"
}
```

## AI Features

### Get Verse Context
```http
GET /api/ai/context/{verseId}
Authorization: Bearer <token>

Response:
{
  "historical": "string",
  "cultural": "string",
  "crossReferences": [
    {
      "book": "string",
      "chapter": number,
      "verse": number,
      "text": "string",
      "relevance": number
    }
  ]
}
```

### Get Study Suggestions
```http
GET /api/ai/suggestions
Authorization: Bearer <token>
Query Parameters:
  - topic: string
  - duration: number (days)

Response:
{
  "title": "string",
  "description": "string",
  "days": [
    {
      "day": number,
      "passages": [
        {
          "book": "string",
          "chapter": number,
          "verses": [number, number],
          "reason": "string"
        }
      ]
    }
  ]
}
```

## Error Responses

```http
400 Bad Request
{
  "error": "string",
  "message": "string"
}

401 Unauthorized
{
  "error": "string",
  "message": "string"
}

403 Forbidden
{
  "error": "string",
  "message": "string"
}

404 Not Found
{
  "error": "string",
  "message": "string"
}

500 Internal Server Error
{
  "error": "string",
  "message": "string"
}
```

## Rate Limiting

- API calls are limited to 100 requests per minute per user
- AI feature calls are limited to 20 requests per minute per user
- Search calls are limited to 50 requests per minute per user

## Websocket API

### Connect
```javascript
const ws = new WebSocket('wss://api.aptyth.com/ws');
ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  // Handle different message types
};
```

### Message Types

#### Study Group Updates
```javascript
{
  "type": "study_group",
  "action": "message" | "join" | "leave",
  "data": {
    "groupId": "string",
    "userId": "string",
    "message": "string",
    "timestamp": string
  }
}
```

#### Prayer Room Updates
```javascript
{
  "type": "prayer_room",
  "action": "prayer" | "join" | "leave",
  "data": {
    "roomId": "string",
    "userId": "string",
    "prayer": "string",
    "timestamp": string
  }
}
``` 