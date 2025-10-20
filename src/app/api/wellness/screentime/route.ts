import { NextResponse } from "next/server";
import { z } from "zod";

import { auth } from '@/lib/auth/auth';
import { saveScreenSession, aggregateLastDays } from '@/lib/wellness/service';

const sessionSchema = z.object({
  sessionId: z.string().optional(),
  url: z.string().url().optional(),
  title: z.string().optional(),
  category: z.string().optional(),
  startedAt: z.string(), // ISO
  endedAt: z.string(), // ISO
  duration: z.number().nonnegative(), // seconds
  anonymized: z.boolean().optional(),
});

export async function GET() {
  const result = await aggregateLastDays(7);
  return NextResponse.json(result);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = sessionSchema.parse(body);

    const startedAt = new Date(parsed.startedAt);
    const endedAt = new Date(parsed.endedAt);

    // Determine userId server-side if not anonymized and a session exists
    let userId: string | null | undefined = parsed.anonymized ? null : undefined;
    if (!parsed.anonymized) {
      try {
        const session = await auth();
        if (session?.user?.id) userId = session.user.id;
      } catch (e) {
        // ignore: auth may not be available in all contexts
      }
    }

    // If client provided a sessionId, attempt idempotent update to avoid duplicates
    const saved = await saveScreenSession({
      sessionId: parsed.sessionId,
      userId,
      url: parsed.url,
      title: parsed.title,
      category: parsed.category,
      startedAt,
      endedAt,
      duration: Math.max(0, Math.floor(parsed.duration)),
    });

    return NextResponse.json({ ok: true, session: { id: saved.id } }, { status: 201 });
  } catch (e: unknown) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ ok: false, error: 'invalid_payload', details: e.errors }, { status: 400 });
    }
    console.error('screentime POST error', e);
    return NextResponse.json({ ok: false, error: 'server_error' }, { status: 500 });
  }
}
