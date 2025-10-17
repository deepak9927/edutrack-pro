# Wellness Data Model

Prisma model: `ScreenSession`

Fields:
- id: String @id
- userId: String? (nullable for anonymized entries)
- sessionId: String? (client-provided id for idempotency)
- url: String?
- title: String?
- category: String? (e.g., study, social, productivity)
- startedAt: DateTime
- endedAt: DateTime
- duration: Int (seconds)
- createdAt: DateTime @default(now())

Indexes:
- @@index([userId])
- @@index([startedAt])

Notes:
- `sessionId` is not unique to allow clients to retry safely; server uses `findFirst` on sessionId and updates the first match. If you prefer absolute de-duplication, add a unique constraint on `sessionId`.
- Keep userId nullable to respect anonymized collections.

***