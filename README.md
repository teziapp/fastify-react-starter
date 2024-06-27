# Fastify-React Boilerplate

This repository provides a boilerplate starter for building scalable web applications using Fastify for the backend and React with TypeScript for the frontend. It is managed through Vite and Turbo, leveraging modern tooling to ensure a fast development and build process.

## Features

- [**Fastify**](https://www.fastify.io/): A high-performance backend framework with a robust plugin architecture.
- [**React 18**](https://reactjs.org/): Utilizes the latest version of React for building user interfaces.
- [**TypeScript**](https://www.typescriptlang.org/): Provides type safety across both frontend and backend code.
- [**Vite**](https://vitejs.dev/): A next-generation frontend tooling for rapid development and build cycles.
- [**Turbo**](https://turborepo.org/): Manages monorepo tasks and dependencies efficiently.
- [**Trpc**](https://trpc.io/): Enhances communication between the client and server with end-to-end type safety through a powerful RPC-style API framework.
- [**Orchid-Orm**](https://github.com/romeerez/orchid-orm): A lightweight ORM for PostgreSQL, designed to facilitate easy data management and operations.
- [**zod**](https://github.com/colinhacks/zod): Offers TypeScript-first schema validation with static type inference, ensuring robust data validation at runtime.

## Included Packages

- **Backend (`api`)**: Fastify equipped with plugins for security, sessions, and OAuth2.
- **Frontend (`pwa`)**: React application configured with Vite, featuring Ant Design for UI components and `react-query` for state management.

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/teziapp/fastify-react-starter.git
   cd fastify-react-starter
   ```

2. **Install dependencies:**
   ```bash
   pnpm i
   ```

3. **Create `.env` files at root and API level:**
   - At the root level, create a `.env` file with:
     ```bash
     ENVIRONMENT='dev'
     FRONTEND_URL=http://localhost:5173
     VITE_BE_URL=http://localhost:3000
     ```
   - Inside the `api` directory, create another `.env` file with:
     ```bash
     ENVIRONMENT='dev'
     DB_URL=postgres://postgres:postgres@localhost:5432/boilerplate
     DB_TEST_URL=postgres://postgres:postgres@localhost:5432/boilerplate
     FRONTEND_URL=http://localhost:5173
     VITE_BE_URL=http://localhost:3000
     GOOGLE_CLIENT_ID=
     GOOGLE_CLIENT_SECRET=
     JWT_SECRET=thisismyjwtsecret
     ```
   > Obtain Google client ID and secret from [Google Cloud Console](https://console.cloud.google.com/).

4. **Create DB and run the migration:**
   - Create the database:
     ```bash
     pnpm run db create
     ```
   - Run the migration:
     ```bash
     pnpm run db migrate up
     ```

5. **Run the development server:**
   ```bash
   pnpm run dev
   ```
   This command concurrently starts both the backend and frontend development servers.

6. **Build for production:**
   ```bash
   pnpm run build
   ```
   This command builds both the backend and frontend for production deployment.

## Project Structure

- `/apps/api`: Contains the Fastify backend application.
- `/apps/pwa`: Contains the React frontend application.
- `/packages`: Includes shared utilities and configurations used across the project.

## Scripts Explained

- `dev`: Starts the development servers for both backend and frontend using Turbo.
- `build`: Builds both applications for production.
- `lint`: Ensures code quality by running ESLint across the project.
- `db`: Manages database scripts for the backend.

## Contributing

Contributions are welcome!