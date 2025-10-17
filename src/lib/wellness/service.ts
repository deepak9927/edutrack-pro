import { prisma } from '@/lib/prisma';
import { ScreenSession } from '@prisma/client';

export async function saveScreenSession(payload: {
  sessionId?: string;
  userId?: string | null;
  url?: string | null;
  title?: string | null;
  category?: string | null;
  startedAt: Date;
  endedAt: Date;
  duration: number;
}): Promise<ScreenSession> {
  const data = {
    userId: payload.userId,
    url: payload.url,
    title: payload.title,
    category: payload.category,
    startedAt: payload.startedAt,
    endedAt: payload.endedAt,
    duration: Math.max(0, Math.floor(payload.duration)),
  } as any;

  if (payload.sessionId) {
    // try to find an existing session; if found, update, else create
    const existing = await prisma.screenSession.findFirst({ where: { sessionId: payload.sessionId } });
    if (existing) {
      return prisma.screenSession.update({ where: { id: existing.id }, data });
    }
    return prisma.screenSession.create({ data: { sessionId: payload.sessionId, ...data } });
  }

  return prisma.screenSession.create({ data });
}

export async function aggregateLastDays(days = 7) {
  const now = new Date();
  const from = new Date(now);
  from.setDate(now.getDate() - days);

  const sessions = await prisma.screenSession.findMany({ where: { startedAt: { gte: from } } });

  const daily: Record<string, { totalSeconds: number; sessions: number }> = {};
  const categoryTotals: Record<string, number> = {};

  for (const s of sessions) {
    const day = s.startedAt.toISOString().split('T')[0] ?? s.startedAt.toISOString();
    daily[day] = daily[day] || { totalSeconds: 0, sessions: 0 };
    daily[day].totalSeconds += s.duration;
    daily[day].sessions += 1;

    const cat = s.category || 'other';
    categoryTotals[cat] = (categoryTotals[cat] || 0) + s.duration;
  }

  const dailyArray = Object.entries(daily).map(([date, v]) => ({ date, minutes: Math.round(v.totalSeconds / 60), sessions: v.sessions }));
  dailyArray.sort((a, b) => a.date.localeCompare(b.date));

  const appUsage = Object.entries(categoryTotals).map(([name, seconds]) => ({ name, usage: Math.round(seconds / 60) }));
  appUsage.sort((a, b) => b.usage - a.usage);

  const totalMinutes = sessions.reduce((sum: number, s: ScreenSession) => sum + s.duration, 0) / 60;
  const dailyAverage = sessions.length ? Math.round((totalMinutes / days)) : 0;
  const productivityScore = Math.max(0, 100 - Math.round((appUsage.find(u => u.name === 'social')?.usage || 0) / 10));

  return { dailyAverage, appUsage, productivityScore, daily: dailyArray };
}

export async function runRetention(days = 90, anonymizedOnly = true) {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);

  const where: any = { createdAt: { lt: cutoff } };
  if (anonymizedOnly) where.userId = null;

  const result = await prisma.screenSession.deleteMany({ where });
  return result.count;
}
