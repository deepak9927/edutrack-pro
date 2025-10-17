import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { requireAdmin } from '@/lib/auth/admin';
import { Prisma } from '@prisma/client';

// POST /api/wellness/screentime/retention
// Body: { days?: number, anonymizedOnly?: boolean }
// Deletes screen sessions older than `days` (default 90).

const retentionSchema = z.object({
  days: z.number().int().min(1).optional(),
  anonymizedOnly: z.boolean().optional(),
});

export async function POST(req: Request) {
  try {
    // Require admin session
    const authCheck = await requireAdmin();
    if ('error' in authCheck) return authCheck.error;

    const body = await req.json();
    const parsed = retentionSchema.parse(body ?? {});

    const days = parsed.days ?? 90;
    const anonymizedOnly = parsed.anonymizedOnly ?? true;

    const deleted = await runRetention(days, anonymizedOnly);
    return NextResponse.json({ ok: true, deleted });
  } catch (e: unknown) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ ok: false, error: "invalid_payload", details: e.errors }, { status: 400 });
    }
    console.error("Retention job error", e);
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}

export async function GET() {
  // Return default retention policy info
  return NextResponse.json({ defaultDays: 90, note: "POST to this endpoint with { days, anonymizedOnly } to run retention. Protect in production." });
}

async function runRetention(days: number, anonymizedOnly: boolean) {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);

  const whereClause: Prisma.ScreenSessionWhereInput = {
    startedAt: {
      lt: cutoffDate,
    },
  };

  if (anonymizedOnly) {
    whereClause.userId = null; 
  }

  const deleted = await db.screenSession.deleteMany({
    where: whereClause,
  });

  return deleted.count;
}
