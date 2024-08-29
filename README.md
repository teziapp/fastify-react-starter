<p align="center">
  <img src="cool.png" alt="Logo" width="200" height="200">
</p>

# Fastify-React Boilerplate

Simple starter kit which just works

## 🚀 Features

- **[Fastify](https://www.fastify.io/)**: High-performance backend framework with a plugin-based architecture
- **[React 18](https://reactjs.org/)**: Latest version of React for building dynamic user interfaces
- **[TypeScript](https://www.typescriptlang.org/)**: Strong typing for both frontend and backend
- **[Vite](https://vitejs.dev/)**: Next-generation frontend tooling for rapid development
- **[Turbo](https://turborepo.org/)**: Efficient monorepo management and task running
- **[tRPC](https://trpc.io/)**: End-to-end typesafe APIs for seamless client-server communication
- **[Ant Design](https://ant.design/)**: Comprehensive UI component library for React
- **[Zustand](https://github.com/pmndrs/zustand)**: Lightweight state management for React
- **[Orchid ORM](https://github.com/romeerez/orchid-orm)**: Lightweight ORM for PostgreSQL
- **[zod](https://github.com/colinhacks/zod)**: TypeScript-first schema validation
- **[PostHog](https://posthog.com/)**: Open-source product analytics
- **[Microsoft Clarity](https://clarity.microsoft.com/)**: User behavior analytics tool

## 📦 Project Structure

```
fastify-react-starter/
├── apps/
│   ├── api/         # Fastify backend
│   └── pwa/         # React frontend
├── packages/        # Shared utilities and configurations
├── turbo.json       # Turbo configuration
└── package.json     # Root package.json
```

## 🛠️ Getting Started

Run this command to get started

```bash
git clone https://github.com/teziapp/fastify-react-starter.git
cd fastify-react-starter
pnpm i
```

-> Run this to setup
```bash
pnpm run setup
```
OR manually

1. **Set up environment variables:**

   Create `.env` files at the root and in the `api` directory:

   Root `.env`[.env]:
   ```
   ENVIRONMENT='dev'
   FRONTEND_URL=http://localhost:5173
   VITE_BE_URL=http://localhost:3000
   VITE_POSTHOG_KEY=your_posthog_key
   VITE_CLARITY_ID=your_clarity_id
   ```

   (`api/.env`)[/api/.env]:
   ```
   ENVIRONMENT='dev'
   DB_URL=postgres://postgres:postgres@localhost:5432/boilerplate
   DB_TEST_URL=postgres://postgres:postgres@localhost:5432/boilerplate
   FRONTEND_URL=http://localhost:5173
   VITE_BE_URL=http://localhost:3000
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   JWT_SECRET=your_jwt_secret
   AXIOM_DATASET=your_axiom_dataset
   AXIOM_TOKEN=your_axiom_token
   ```

2. **Set up the database:**

   ```bash
   pnpm run db create
   pnpm run db migrate up
   ```

3. **Start the development server:**

   ```bash
   pnpm run dev
   ```

4. **Build for production:**

   ```bash
   pnpm run build
   ```

## 📜 Available Scripts

- `pnpm run dev`: Start development servers for both backend and frontend
- `pnpm run build`: Build both applications for production
- `pnpm run lint`: Run ESLint across the project
- `pnpm run db`: Manage database operations (create, migrate, etc.)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Fastify](https://www.fastify.io/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Turbo](https://turborepo.org/)
- [tRPC](https://trpc.io/)
- [Ant Design](https://ant.design/)
- [Zustand](https://github.com/pmndrs/zustand)
- [Orchid ORM](https://github.com/romeerez/orchid-orm)
- [zod](https://github.com/colinhacks/zod)
- [PostHog](https://posthog.com/)
- [Microsoft Clarity](https://clarity.microsoft.com/)
- [Axiom](https://axiom.co/)

# Todos:

## Backend
[ ] Figure out how to get & use secure-session https://www.npmjs.com/package/@fastify/secure-session
[ ] Implement rate limiting.
[ ] Logs transport to FileSystem / Database.
[ ] Add swagger docs.
[ ] Add initiation migration file to apply following to db
    [ ] RLS for proper multi-tenancy security
    [ ] Database timezone setup.
    [ ] Check if present user has all access like dropping tables, etc... dont load the app.
[ ] Check & Force backend for proper timezone. (On both server & database)
[x] Logs transport to FileSystem / Database. (Added Axiom integration)

## Frontend
[ ] Option to make Form persistent on page-reloads.
[ ] Make it PWA.
[x] Add event tracking (Added PostHog and Microsoft Clarity)

## Common
[ ] Push Notifications
[ ] Testing
[ ] Auto version on commits.
[ ] Feature flags.
[ ] A/B Testing.
[ ] Github Actions for CI/CD.
[ ] Obersavability & Monitoring.
[x] Obersavability & Monitoring. (Partially implemented with Axiom, PostHog, and Clarity)

# Examples for reference:
- https://github.com/Cookie-gg/trpc-fastify-prisma/blob/master/package.json
- https://github.com/maybemaby/fastify-trpc-next
- https://github.com/josephgodwinkimani/tRPC-fastify-starter
- https://github.com/zongzheng123/fastify-trpc-swagger


- to generate the db migration:
```bash
nr db g migration_name
```