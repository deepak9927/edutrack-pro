Testing guide

This document explains how to test the app locally and in the cloud (Supabase + Azure/Vercel).

Local testing
-------------
1. Ensure Node.js and pnpm are installed.
2. Install dependencies:
   pnpm install

3. Ensure you have a working database. Two options:
   - Use Supabase direct connection (recommended): edit `.env.local` and set:
     DATABASE_URL="postgresql://postgres:<PASSWORD>@db.<PROJECT>.supabase.co:5432/postgres?sslmode=require"
     Replace `<PASSWORD>` and `<PROJECT>` with your project values.
   - Or use local SQLite (fast local only): edit `.env.local` and set:
     DATABASE_URL="file:./dev.db"
     Also change `prisma/schema.prisma` datasource provider to `sqlite`.

4. Generate Prisma client / push schema:
   set -a && source .env.local && set +a && npx prisma db push

5. Start the dev server:
   pnpm dev

6. Open http://localhost:3000 (or the port printed by Next). Test register and login flows.

Notes:
- If you use Supabase and your machine prefers IPv4 but the project resolves only to IPv6, you may need to use the IPv6 literal in `.env.local`:
  postgresql://postgres:<PASSWORD>@[2406:....]:5432/postgres?sslmode=require

Cloud testing (Supabase + Vercel / Azure Static Web Apps)
---------------------------------------------------------
1. Add environment variables in your cloud provider's dashboard (do NOT commit .env.local):
   - DATABASE_URL: use the Supabase direct connection string (port 5432)
   - NEXTAUTH_SECRET: a base64 secret
   - ANY OAUTH KEYS used in env

2. In Supabase: ensure the database user and password are correct (Project → Settings → Database → Connection string)

3. Deploy frontend (Vercel / Azure): follow their docs. On successful deploy run sanity tests:
   - POST /api/auth/register with JSON body { name, email, password }
   - Confirm user exists in Supabase `users` table

4. If you see connection issues in cloud, verify the DATABASE_URL and that the cloud runner can resolve the Supabase host.

Security
--------
- Never commit `.env.local` or secrets to Git.
- Remove development-only `debug` fields or detailed error messages before production.

Contact
-------
If you want, I can prepare a GitHub Action to run a smoke-test after deploy that verifies registration/login.
