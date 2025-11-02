import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// Define schema for GratitudeEntry input
const gratitudeEntrySchema = z.object({
  date: z.string().datetime().optional(),
  note: z.string().min(1, 'Gratitude note cannot be empty.'),
});

/**
 * @swagger
 * /api/wellness/gratitude:
 *   get:
 *     summary: Retrieve gratitude journal entries for the authenticated user.
 *     description: Fetches all gratitude entries, optionally filtered by a date range.
 *     tags:
 *       - Wellness
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: from
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Start date for filtering entries (ISO 8601 format).
 *       - in: query
 *         name: to
 *         schema:
 *           type: string
 *           format: date-time
 *         description: End date for filtering entries (ISO 8601 format).
 *     responses:
 *       200:
 *         description: Successfully retrieved gratitude entries.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   studentId:
 *                     type: string
 *                   date:
 *                     type: string
 *                     format: date-time
 *                   note:
 *                     type: string
 *       401:
 *         description: Unauthorized. User not authenticated.
 *       400:
 *         description: Invalid date parameter provided.
 *       500:
 *         description: Failed to fetch gratitude entries.
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
    const gratitudeEntries = await prisma.gratitudeEntry.findMany({
      where: {
        studentId: userId,
        date: {
          gte: fromDate,
          lte: toDate,
        },
      },
      orderBy: {
        date: 'desc',
      },
    });
    return NextResponse.json(gratitudeEntries);
  } catch (error) {
    console.error('Error fetching gratitude entries:', error);
    return NextResponse.json({ message: 'Failed to fetch gratitude entries' }, { status: 500 });
  }
}

/**
 * @swagger
 * /api/wellness/gratitude:
 *   post:
 *     summary: Create a new gratitude journal entry for the authenticated user.
 *     description: Adds a new gratitude note for the current day or a specified date.
 *     tags:
 *       - Wellness
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date-time
 *                 description: Optional date for the entry (ISO 8601 format). Defaults to current day.
 *               note:
 *                 type: string
 *                 description: The gratitude note.
 *                 minLength: 1
 *             required:
 *               - note
 *     responses:
 *       201:
 *         description: Gratitude entry created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 studentId:
 *                   type: string
 *                 date:
 *                   type: string
 *                   format: date-time
 *                 note:
 *                   type: string
 *       401:
 *         description: Unauthorized. User not authenticated.
 *       400:
 *         description: Invalid request data.
 *       500:
 *         description: Failed to create gratitude entry.
 */
export async function POST(req: Request) {
  const session = await auth();
  if (!session || !session.user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const userId = session.user.id;

  try {
    const body = await req.json();
    const validatedData = gratitudeEntrySchema.parse(body);

    const entryDate = validatedData.date ? new Date(validatedData.date) : new Date();
    entryDate.setHours(0, 0, 0, 0); // Normalize date to start of day

    const gratitudeEntry = await prisma.gratitudeEntry.create({
      data: {
        studentId: userId,
        date: entryDate,
        note: validatedData.note,
      },
    });

    return NextResponse.json(gratitudeEntry, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: 'Invalid request data', errors: error.errors }, { status: 400 });
    }
    console.error('Error creating gratitude entry:', error);
    return NextResponse.json({ message: 'Failed to create gratitude entry' }, { status: 500 });
  }
}