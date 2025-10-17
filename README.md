# EduTrack Pro

This is a Next.js project with Prisma for database management.

## Setup

1.  **Clone the repository:**
    ```bash
    git clone [repository-url]
    cd edutrack-pro
    ```
2.  **Install dependencies:**
    This project uses `pnpm` as the package manager.
    ```bash
    pnpm install
    ```

## Database Setup (Prisma)

1.  **Configure Environment Variables:**
    Create a `.env` file in the root directory and add your database connection string.
    Example `.env`:
    ```
    DATABASE_URL="postgresql://user:password@host:port/database?schema=public"
    NEXTAUTH_SECRET="YOUR_NEXTAUTH_SECRET"
    NEXTAUTH_URL="http://localhost:3000"
    ```
    (Note: Replace with your actual database URL and generate a strong secret for NEXTAUTH_SECRET)

2.  **Push Prisma schema to your database:**
    ```bash
    pnpm run db:push
    ```
    This command will create the tables in your database based on `prisma/schema.prisma`.

3.  **Generate Prisma client:**
    ```bash
    pnpm run db:generate
    ```
    This generates the Prisma client that your application uses to interact with the database.

4.  **Seed the database (optional):**
    If you have a seed file (`prisma/seed.ts`), you can run it to populate your database with initial data:
    ```bash
    pnpm run db:seed
    ```

## Running the Application

1.  **Start the development server:**
    ```bash
    pnpm run dev
    ```
    The application will be accessible at `http://localhost:3000`.

2.  **Open Prisma Studio (optional):**
    To view and manage your database data, you can open Prisma Studio:
    ```bash
    pnpm run db:studio
    ```
    This will open a web interface in your browser.

## Available Scripts

-   `pnpm run dev`: Starts the development server.
-   `pnpm run build`: Builds the application for production.
-   `pnpm run start`: Starts the production server.
-   `pnpm run lint`: Runs ESLint to check for code style issues.
-   `pnpm run lint:fix`: Runs ESLint and attempts to fix issues.
-   `pnpm run type-check`: Checks TypeScript types.
-   `pnpm run test`: Runs tests using Vitest.
-   `pnpm run db:push`: Pushes the Prisma schema to the database.
-   `pnpm run db:studio`: Opens Prisma Studio.
-   `pnpm run db:generate`: Generates the Prisma client.
-   `pnpm run db:migrate`: Runs Prisma migrations.
-   `pnpm run db:seed`: Seeds the database.
-   `pnpm run create-admin`: Creates an admin user (check `src/lib/scripts/create-admin.ts` for details).
