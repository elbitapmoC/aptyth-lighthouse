# aptyth-lighthouse

## Project Overview
Aptyth Lighthouse is a modern web application designed to provide a seamless user experience by integrating a Next.js frontend with a Deno backend. The project leverages cutting-edge technologies like Tailwind CSS, Zustand for state management, and AI-powered services using RAG and Supabase Vector.

## Technologies Used
- **Frontend**: Next.js, TypeScript, Tailwind CSS
- **Backend**: Deno, Hono, Supabase
- **State Management**: Zustand
- **AI Services**: Retrieval-Augmented Generation (RAG) with Supabase Vector

## Setup Instructions

### Prerequisites
Ensure you have the following installed:
- Node.js (v16 or higher)
- Deno (v1.35 or higher)

### Frontend Setup
1. Navigate to the project directory:
   ```bash
   cd aptyth-lighthouse
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Run the Deno server:
   ```bash
   deno run --allow-net --allow-read main.ts
   ```

## Running the Project Locally
1. Start the frontend development server as described above.
2. Start the backend server as described above.
3. Open your browser and navigate to `http://localhost:3000` to access the application.

## Contributing
We welcome contributions! Please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Submit a pull request with a detailed description of your changes.

## License
This project is licensed under the MIT License.