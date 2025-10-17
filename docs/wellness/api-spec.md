# Wellness API Specification

POST /api/wellness/screentime
- Description: Accepts one or more screen sessions. Each session is anonymized by default.
- Body (single object or array):
  - sessionId?: string
  - url?: string
  - title?: string
  - category?: string
  - startedAt: ISO string
  - endedAt: ISO string
  - duration: number (seconds)
  - anonymized?: boolean (default true)
- Success: 201 Created, { ok: true, session: { id } }

GET /api/wellness/screentime
- Description: Returns aggregated metrics for the last 7 days.
- Success: 200 OK, { dailyAverage, appUsage, productivityScore, daily }

POST /api/wellness/screentime/retention
- Description: Admin-only endpoint to delete older anonymized sessions.
- Body: { days?: number, anonymizedOnly?: boolean }
- Security: Requires admin session (NextAuth) or run as scheduled server job.
- Success: 200 OK, { ok: true, deleted }

GET /api/wellness/screentime/retention
- Description: Returns retention policy metadata (defaultDays = 90)

***