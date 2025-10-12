# IGNOU Student Portal

A full-stack student portal for IGNOU, featuring assignment management, wellness tracking, course enrollment, and more.

## Features

- Assignment submission and grading
- Course management
- Student wellness tracking
- Authentication and role-based access
- Community features (forums, study groups)

## Getting Started

### Prerequisites

- Node.js >= 18
- PostgreSQL
- [Prisma](https://www.prisma.io/)

### Setup

```bash
git clone <repo-url>
cd ignou
npm install
cp .env.example .env
# Update DATABASE_URL in .env
npx prisma migrate dev
npm run dev
```

## API Endpoints

### Assignments

- `GET /api/assignments` — List assignments
- `POST /api/assignments` — Submit assignment

#### Example: Submit Assignment

```http
POST /api/assignments
Content-Type: application/json

{
  "assignmentId": "string",
  "studentId": "string",
  "content": "Assignment solution text"
}
```

### Courses

- `GET /api/courses` — List courses
- `POST /api/courses` — Create course

### Wellness

- `GET /api/wellness` — Get wellness data
- `POST /api/wellness` — Submit wellness data

## Database Schema

See [`schema.prisma`](./schema.prisma) for full schema.

## Contributing

Pull requests are welcome. For major changes, please open an issue first.

## License

MIT
```

5. Start dev server:

```bash
pnpm dev
```

Open http://localhost:3000 in your browser.

Quick checks

```bash
pnpm lint      # run eslint
pnpm type-check # run tsc --noEmit
pnpm test      # run vitest
pnpm check     # lint + type-check + test (added helper script)
```

CI

This repository includes a GitHub Actions workflow that runs on push and pull requests. It installs dependencies and runs build, lint, type-check and tests. See `.github/workflows/ci.yml`.

## Project Structure

The project follows a standard Next.js `app` directory structure. Here is a high-level overview:

```
/
├── public/               # Static assets
├── src/
│   ├── app/              # Application routes and pages
│   ├── components/       # Reusable UI components
│   ├── lib/              # Helper functions, utilities, db client
│   └── ...
├── prisma/               # Prisma schema and migrations
└── ...
```

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to contribute.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

## Package Manager

This project uses npm as the package manager. However, pnpm is recommended due to its efficient use of disk space. pnpm only downloads a package once, even if it is used by multiple projects, which can save a lot of disk space. Bun is another alternative, but it is still relatively new.
