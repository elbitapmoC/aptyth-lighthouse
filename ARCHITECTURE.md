# Project Architecture

## Overview

The **Aptyth Lighthouse** project is a modern web application designed with a **Next.js** frontend and a **Deno** backend. The architecture is modular, scalable, and optimized for performance, developer productivity, and maintainability. This document provides an overview of the project structure, technology choices, and their rationale.

---

## Project Structure

The project is organized into the following directories:

```
aptyth-lighthouse/
├── app/                # Next.js application directory
│   ├── globals.css     # Global CSS with Tailwind imports
│   ├── layout.tsx      # Root layout component
│   ├── page.tsx        # Home page component
├── components/         # Reusable UI components
│   └── ui/             # UI-specific components
│       └── button.tsx  # Sample ShadCN button component
├── lib/                # Utility libraries and state management
│   └── store.ts        # Zustand store for state management
├── backend/            # Deno backend directory
│   ├── deno.json       # Deno configuration file
│   ├── main.ts         # Main entry point for the backend
│   ├── routes/         # API route handlers
│   │   └── bible.ts    # Sample Bible API route
│   └── services/       # Backend services
│       └── ai.ts       # AI-related functionality using RAG and Supabase Vector
├── public/             # Static assets (e.g., images, fonts)
├── styles/             # Additional global styles (if needed)
├── .gitignore          # Git ignore file
├── biome.json          # Biome configuration for linting and formatting
├── next.config.js      # Next.js configuration file
├── package.json        # Node.js package configuration
├── postcss.config.js   # PostCSS configuration for Tailwind CSS
├── tailwind.config.js  # Tailwind CSS configuration
├── tsconfig.json       # TypeScript configuration
└── README.md           # Project documentation
```

---

## Technology Choices

### 1. **Frontend: Next.js**
- **Why Next.js?**
  - Server-side rendering (SSR) and static site generation (SSG) for improved performance and SEO.
  - Built-in routing and API support.
  - Optimized for React with features like `reactStrictMode` and SWC-based minification.
- **Key Features:**
  - **Internationalization (i18n):** Configured in `next.config.js` to support multiple locales (`en`, `es`, `fr`).
  - **Tailwind CSS:** Integrated for utility-first styling.
  - **TypeScript:** Ensures type safety and better developer experience.

### 2. **Styling: Tailwind CSS**
- **Why Tailwind CSS?**
  - Utility-first CSS framework for rapid UI development.
  - Customizable themes and responsive design.
- **Configuration:**
  - `tailwind.config.js` defines custom colors (`primary`, `secondary`) and fonts (`Inter`).
  - `app/globals.css` imports Tailwind's base, components, and utilities.

### 3. **State Management: Zustand**
- **Why Zustand?**
  - Lightweight and simple state management library.
  - Minimal boilerplate compared to Redux.
- **Implementation:**
  - `lib/store.ts` defines a basic store with actions for incrementing, decrementing, and resetting a counter.

### 4. **Backend: Deno**
- **Why Deno?**
  - Secure runtime with built-in TypeScript support.
  - Modern standard library and dependency management.
- **Key Features:**
  - **Hono Framework:** Lightweight web framework for building APIs.
  - **Supabase Integration:** Used for vector search and AI-related functionality.
  - **AI Services:** OpenAI's GPT models are used for embedding generation and response generation.

### 5. **AI Integration**
- **Why OpenAI and Supabase?**
  - OpenAI provides state-of-the-art language models for embedding and response generation.
  - Supabase Vector enables efficient similarity searches for context retrieval.
- **Implementation:**
  - `backend/services/ai.ts` handles embedding generation, context retrieval, and response generation.

### 6. **Linting and Formatting: Biome**
- **Why Biome?**
  - Unified tool for linting, formatting, and organizing imports.
  - Supports TypeScript, React, and Tailwind CSS rules.
- **Configuration:**
  - `biome.json` enables strict linting and formatting rules, including accessibility checks for React.

---

## Key Features

### 1. **Frontend Features**
- **Responsive Design:** Tailwind CSS ensures the app is mobile-friendly.
- **Reusable Components:** UI components like `Button` are modular and customizable.
- **Internationalization:** Supports multiple languages for a global audience.

### 2. **Backend Features**
- **Health Check Route:** `/` endpoint in `backend/main.ts` provides a basic health check.
- **Bible API:** `backend/routes/bible.ts` includes routes for fetching Bible verses and chapters.
- **AI Services:** `backend/services/ai.ts` integrates OpenAI and Supabase for advanced AI functionality.

### 3. **Developer Experience**
- **TypeScript:** Ensures type safety across the codebase.
- **Prettier:** Configured in `package.json` for consistent code formatting.
- **Biome:** Enforces coding standards and organizes imports.

---

## Future Enhancements

1. **Authentication:**
   - Add user authentication using NextAuth.js or Supabase Auth.
2. **Database Integration:**
   - Extend Supabase usage for persistent data storage.
3. **Testing:**
   - Add unit and integration tests using Jest and React Testing Library.
4. **Deployment:**
   - Deploy the frontend on Vercel and the backend on Deno Deploy.

---

## Conclusion

The **Aptyth Lighthouse** project is built with a modern tech stack that prioritizes performance, scalability, and developer productivity. The modular architecture ensures ease of maintenance and future enhancements. By leveraging tools like Next.js, Tailwind CSS, Deno, and Supabase, the project is well-equipped to deliver a robust and user-friendly experience.
