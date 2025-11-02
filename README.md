# EduTrack Pro

## Project Overview
EduTrack Pro is a comprehensive educational platform designed to enhance the learning experience through personalized content, adaptive assessments, and robust progress tracking. It leverages modern web technologies to provide a scalable and interactive environment for students and educators. Key features include:
- **Personalized Learning Paths:** Tailored content delivery based on individual student performance and preferences.
- **Adaptive Assessments:** Dynamic quizzes and tests that adjust difficulty in real-time.
- **Study Streak & Achievements:** Gamified elements to motivate continuous learning.
- **AI-Powered Tutoring:** Integration with generative AI for intelligent assistance.
- **Wellness Tracking:** Features to monitor student well-being and mood.

## Technologies Used
- **Frontend:** Next.js, React, Tailwind CSS, Radix UI
- **Backend:** Next.js API Routes
- **Database:** PostgreSQL (via Prisma ORM)
- **Authentication:** NextAuth.js
- **AI Integration:** Google Generative AI
- **Package Manager:** pnpm
- **Deployment:** Docker, Azure

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

## Documentation
For more detailed information, please refer to the following documents:
- [Project Synopsis](docs/synopsis.md)
- [Database Diagram](docs/database-diagram.md)
- [API Documentation](docs/api-documentation.md)
- [Architectural Overview](docs/architecture.md)
- [Database Schema](docs/database.md)
- [Screen Time Analytics](docs/screen-time-analytics.md)
- [Smoke Test Workflow](docs/smoke-test-workflow.md)
- [Wellness Module Documentation](docs/wellness/README.md)

## Screenshots/Demo
(Add screenshots or a link to a live demo here to showcase the application's features.)

## Deployment
This project is configured for deployment to Azure using Docker. Refer to [azure-deploy.md](azure-deploy.md) for detailed deployment instructions.

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
