# Wellness Service Architecture

Overview:
- Client tracks active time on pages via `useScreenTime` hook and stores consent locally.
- When enabled, the hook buffers sessions and periodically sends anonymized payloads to `/api/wellness/screentime`.
- Server persists `ScreenSession` rows in PostgreSQL via Prisma.
- Aggregation endpoint `/api/wellness/screentime` returns 7-day aggregates used by the analytics UI.
- Retention endpoint `/api/wellness/screentime/retention` deletes old anonymized rows and is restricted to admins or a scheduled server job.

Design decisions:
- Privacy-by-default: client sends `anonymized: true` where possible; server allows `userId` only for authenticated requests.
- Idempotency: client may provide `sessionId` to dedupe; server upserts by `sessionId`.
- Multi-tab coordination: BroadcastChannel used to pick a leader tab for network syncs.
- Retention: configurable days, default 90; only deletes anonymized rows by default.

Security:
- Retention route requires admin privileges via `requireAdmin()`.
- All sensitive admin routes should be run server-side or behind server scheduled jobs.

***