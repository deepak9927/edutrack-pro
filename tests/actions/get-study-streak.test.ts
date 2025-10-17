import { describe, it, expect, vi } from 'vitest';
import { PrismaClient } from '@prisma/client';
import { getStudyStreak } from '../../src/actions/get-study-streak';

const prisma = new PrismaClient();

vi.mock('@prisma/client', () => {
  const mockPrisma = {
    wellnessData: {
      findMany: vi.fn(),
    },
  };
  return { PrismaClient: vi.fn(() => mockPrisma) };
});

describe('getStudyStreak', () => {
  it('should return 0 for a user with no study data', async () => {
    (prisma.wellnessData.findMany as any).mockResolvedValue([]);
    const streak = await getStudyStreak('user-1');
    expect(streak).toBe(0);
  });

  it('should return 2 for a user who studied yesterday and today', async () => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    (prisma.wellnessData.findMany as any).mockResolvedValue([
      { date: today, studyMinutes: 60 },
      { date: yesterday, studyMinutes: 30 },
    ]);

    const streak = await getStudyStreak('user-1');
    expect(streak).toBe(2);
  });

  it('should return 1 for a user who studied today but not yesterday', async () => {
    const today = new Date();
    (prisma.wellnessData.findMany as any).mockResolvedValue([
      { date: today, studyMinutes: 60 },
    ]);

    const streak = await getStudyStreak('user-1');
    expect(streak).toBe(1);
  });

  it('should return 1 for a user who studied yesterday but not today', async () => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    (prisma.wellnessData.findMany as any).mockResolvedValue([
      { date: yesterday, studyMinutes: 30 },
    ]);

    const streak = await getStudyStreak('user-1');
    expect(streak).toBe(1);
  });

  it('should return 0 for a user who studied two days ago but not yesterday or today', async () => {
    const today = new Date();
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(today.getDate() - 2);

    (prisma.wellnessData.findMany as any).mockResolvedValue([
      { date: twoDaysAgo, studyMinutes: 30 },
    ]);

    const streak = await getStudyStreak('user-1');
    expect(streak).toBe(0);
  });
});
