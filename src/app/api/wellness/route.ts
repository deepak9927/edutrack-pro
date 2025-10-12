import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// Define schema for WellnessData input
const wellnessDataSchema = z.object({
  date: z.string().datetime().optional(), // Date will be handled by default or provided
  moodScore: z.number().int().min(1).max(10).optional(),
  stressLevel: z.number().int().min(1).max(10).optional(),
  anxietyLevel: z.number().int().min(1).max(10).optional(),
  energyLevel: z.number().int().min(1).max(10).optional(),
  sleepHours: z.number().optional(),
  sleepQuality: z.number().int().min(1).max(10).optional(),
  bedtime: z.string().datetime().optional(),
  wakeupTime: z.string().datetime().optional(),
  exerciseMinutes: z.number().int().optional(),
  steps: z.number().int().optional(),
  screenTimeMinutes: z.number().int().optional(),
  productiveMinutes: z.number().int().optional(),
  socialMediaMinutes: z.number().int().optional(),
  meditationMinutes: z.number().int().optional(),
  breathingExercises: z.number().int().optional(),
  studyMinutes: z.number().int().optional(),
  focusScore: z.number().int().min(1).max(10).optional(),
  pomodoroCount: z.number().int().optional(),
  dailyReflection: z.string().optional(),
  gratitudeNotes: z.array(z.string()).optional(),
});

/**
 * GET /api/wellness
 * Returns wellness data for the authenticated user.
 * Optional query params: from, to (date range)
 */
export async function GET(req: Request) {
  const session = await auth();
  if (!session || !session.user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const userId = session.user.id;
  const { searchParams } = new URL(req.url);
  const fromDateParam = searchParams.get('from');
  const toDateParam = searchParams.get('to');

  let fromDate: Date | undefined;
  let toDate: Date | undefined;

  if (fromDateParam) {
    fromDate = new Date(fromDateParam);
    if (isNaN(fromDate.getTime())) {
      return NextResponse.json({ message: 'Invalid fromDate parameter' }, { status: 400 });
    }
  }

  if (toDateParam) {
    toDate = new Date(toDateParam);
    if (isNaN(toDate.getTime())) {
      return NextResponse.json({ message: 'Invalid toDate parameter' }, { status: 400 });
    }
  }

  try {
    const wellnessData = await prisma.wellnessData.findMany({
      where: {
        studentId: userId,
        date: {
          gte: fromDate,
          lte: toDate,
        },
      },
      orderBy: {
        date: 'asc',
      },
    });
    return NextResponse.json(wellnessData);
  } catch (error) {
    console.error('Error fetching wellness data:', error);
    return NextResponse.json({ message: 'Failed to fetch wellness data' }, { status: 500 });
  }
}

/**
 * POST /api/wellness
 * Creates or updates today's wellness data for the authenticated user.
 */
export async function POST(req: Request) {
  const session = await auth();
  if (!session || !session.user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const userId = session.user.id;

  try {
    const body = await req.json();
    const validatedData = wellnessDataSchema.parse(body);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existingEntry = await prisma.wellnessData.findUnique({
      where: {
        studentId_date: {
          studentId: userId,
          date: today,
        },
      },
    });

    let wellnessEntry;
    if (existingEntry) {
      wellnessEntry = await prisma.wellnessData.update({
        where: {
          studentId_date: {
            studentId: userId,
            date: today,
          },
        },
        data: {
          ...validatedData,
          student: {
            connect: { id: userId },
          },
        },
      });
    } else {
      wellnessEntry = await prisma.wellnessData.create({
        data: {
          ...validatedData,
          studentId: userId,
          date: today,
        },
      });
    }

    return NextResponse.json(wellnessEntry, { status: existingEntry ? 200 : 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: 'Invalid request data', errors: error.errors }, { status: 400 });
    }
    console.error('Error creating/updating wellness data:', error);
    return NextResponse.json({ message: 'Failed to create/update wellness data' }, { status: 500 });
  }
}