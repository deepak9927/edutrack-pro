import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth/auth';
import { db } from '@/lib/db';
import { LearningAnalytics } from '@prisma/client';
import { z } from 'zod';

// Zod schema for GET request query parameters
const getAnalyticsSchema = z.object({
  studentId: z.string().min(1, { message: "Student ID is required" }),
  date: z.string().datetime().optional(),
});

// Zod schema for POST request body
const createAnalyticsSchema = z.object({
  studentId: z.string().min(1, { message: "Student ID is required" }),
  date: z.string().datetime(),
  studyMinutes: z.number().int().min(0).default(0).optional(),
  completedTasks: z.number().int().min(0).default(0).optional(),
  averageScore: z.number().min(0).max(100).optional(),
  loginCount: z.number().int().min(0).default(0).optional(),
  pageViews: z.number().int().min(0).default(0).optional(),
  timeOnPlatform: z.number().int().min(0).default(0).optional(), // minutes
  gpaForecast: z.number().min(0).max(4).optional(), // Assuming GPA is on a 4.0 scale
  riskScore: z.number().min(0).max(100).optional(), // 0-100 scale
  engagementScore: z.number().min(0).max(100).optional(), // 0-100 scale
});

// Zod schema for PUT request body
const updateAnalyticsSchema = z.object({
  id: z.string().min(1, { message: "Analytics ID is required" }),
  studentId: z.string().min(1, { message: "Student ID is required" }).optional(),
  date: z.string().datetime().optional(),
  studyMinutes: z.number().int().min(0).optional(),
  completedTasks: z.number().int().min(0).optional(),
  averageScore: z.number().min(0).max(100).optional(),
  loginCount: z.number().int().min(0).optional(),
  pageViews: z.number().int().min(0).optional(),
  timeOnPlatform: z.number().int().min(0).optional(),
  gpaForecast: z.number().min(0).max(4).optional(),
  riskScore: z.number().min(0).max(100).optional(),
  engagementScore: z.number().min(0).max(100).optional(),
});

// Zod schema for DELETE request query parameters
const deleteAnalyticsSchema = z.object({
  id: z.string().min(1, { message: "Analytics ID is required" }),
});

/**
 * @swagger
 * /api/learning-analytics:
 *   get:
 *     summary: Retrieve learning analytics data for a student.
 *     description: Fetches learning analytics records for a specific student, optionally filtered by date.
 *     tags:
 *       - Learning Analytics
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: studentId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the student.
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Optional date to filter analytics for a specific day (ISO 8601 format).
 *     responses:
 *       200:
 *         description: Successfully retrieved learning analytics data.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/LearningAnalytics'
 *       400:
 *         description: Bad Request - Invalid or missing student ID.
 *       401:
 *         description: Unauthorized - User not authenticated.
 *       500:
 *         description: Internal Server Error.
 */
export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const validatedParams = getAnalyticsSchema.safeParse(Object.fromEntries(searchParams));

    if (!validatedParams.success) {
      return new NextResponse(validatedParams.error.message, { status: 400 });
    }

    const { studentId, date } = validatedParams.data;

    // Ensure the authenticated user is the student whose data is being requested
    // Or, implement role-based access control (e.g., admin/teacher can view any student's data)
    // For now, assuming only students can view their own data.
    // if (session.user.id !== studentId) {
    //   return new NextResponse('Forbidden', { status: 403 });
    // }

    let analytics: LearningAnalytics[] = [];

    if (date) {
      const specificDate = new Date(date);
      analytics = await db.learningAnalytics.findMany({
        where: {
          studentId: studentId,
          date: specificDate,
        },
      });
    } else {
      analytics = await db.learningAnalytics.findMany({
        where: {
          studentId: studentId,
        },
        orderBy: {
          date: 'desc',
        },
      });
    }

    return NextResponse.json(analytics);
  } catch (error) {
    console.error('[LEARNING_ANALYTICS_GET]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

/**
 * @swagger
 * /api/learning-analytics:
 *   post:
 *     summary: Create a new learning analytics record.
 *     description: Adds a new learning analytics entry for a specific student.
 *     tags:
 *       - Learning Analytics
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateLearningAnalytics'
 *     responses:
 *       201:
 *         description: Successfully created a new learning analytics record.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LearningAnalytics'
 *       400:
 *         description: Bad Request - Invalid or missing fields.
 *       401:
 *         description: Unauthorized - User not authenticated.
 *       403:
 *         description: Forbidden - User not authorized to create analytics for this student.
 *       500:
 *         description: Internal Server Error.
 */
export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = await req.json();
    const validatedData = createAnalyticsSchema.safeParse(body);

    if (!validatedData.success) {
      return new NextResponse(validatedData.error.message, { status: 400 });
    }

    const { studentId, date, studyMinutes, completedTasks, averageScore, loginCount, pageViews, timeOnPlatform, gpaForecast, riskScore, engagementScore } = validatedData.data;

    // Ensure the authenticated user is the student whose data is being created
    // Or, implement role-based access control (e.g., admin/teacher can create data for students)
    // For now, assuming only students can create their own data.
    // if (session.user.id !== studentId) {
    //   return new NextResponse('Forbidden', { status: 403 });
    // }

    const newAnalytics = await db.learningAnalytics.create({
      data: {
        studentId,
        date: new Date(date),
        studyMinutes,
        completedTasks,
        averageScore,
        loginCount,
        pageViews,
        timeOnPlatform,
        gpaForecast,
        riskScore,
        engagementScore,
      },
    });

    return NextResponse.json(newAnalytics, { status: 201 });
  } catch (error) {
    console.error('[LEARNING_ANALYTICS_POST]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

/**
 * @swagger
 * /api/learning-analytics:
 *   put:
 *     summary: Update an existing learning analytics record.
 *     description: Updates a specific learning analytics entry identified by its ID.
 *     tags:
 *       - Learning Analytics
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateLearningAnalytics'
 *     responses:
 *       200:
 *         description: Successfully updated the learning analytics record.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LearningAnalytics'
 *       400:
 *         description: Bad Request - Invalid or missing fields, or analytics ID.
 *       401:
 *         description: Unauthorized - User not authenticated.
 *       403:
 *         description: Forbidden - User not authorized to update this analytics record.
 *       404:
 *         description: Not Found - Learning analytics record not found.
 *       500:
 *         description: Internal Server Error.
 */
export async function PUT(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = await req.json();
    const validatedData = updateAnalyticsSchema.safeParse(body);

    if (!validatedData.success) {
      return new NextResponse(validatedData.error.message, { status: 400 });
    }

    const { id, ...updateData } = validatedData.data;

    // Optional: Ensure the authenticated user is the student whose data is being updated
    // if (session.user.id !== studentId) {
    //   return new NextResponse('Forbidden', { status: 403 });
    // }

    const existingAnalytics = await db.learningAnalytics.findUnique({
      where: { id },
    });

    if (!existingAnalytics) {
      return new NextResponse('Learning analytics record not found', { status: 404 });
    }

    // Ensure the authenticated user is the owner of the record
    if (existingAnalytics.studentId !== session.user.id) {
      return new NextResponse('Forbidden', { status: 403 });
    }

    const updatedAnalytics = await db.learningAnalytics.update({
      where: { id },
      data: {
        ...updateData,
        date: updateData.date ? new Date(updateData.date) : existingAnalytics.date,
        // studentId should not be changed after creation, or handle carefully
        studentId: existingAnalytics.studentId,
      },
    });

    return NextResponse.json(updatedAnalytics);
  } catch (error) {
    console.error('[LEARNING_ANALYTICS_PUT]', error);
    if (error instanceof z.ZodError) {
      return new NextResponse(error.message, { status: 400 });
    }
    return new NextResponse('Internal Error', { status: 500 });
  }
}

/**
 * @swagger
 * /api/learning-analytics:
 *   delete:
 *     summary: Delete a learning analytics record.
 *     description: Deletes a specific learning analytics entry by its ID.
 *     tags:
 *       - Learning Analytics
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the learning analytics record to delete.
 *     responses:
 *       200:
 *         description: Learning analytics record deleted successfully.
 *       400:
 *         description: Bad Request - Missing analytics ID.
 *       401:
 *         description: Unauthorized - User not authenticated.
 *       403:
 *         description: Forbidden - User not authorized to delete this analytics record.
 *       404:
 *         description: Not Found - Learning analytics record not found.
 *       500:
 *         description: Internal Server Error.
 */
export async function DELETE(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const validatedParams = deleteAnalyticsSchema.safeParse(Object.fromEntries(searchParams));

    if (!validatedParams.success) {
      return new NextResponse(validatedParams.error.message, { status: 400 });
    }

    const { id } = validatedParams.data;

    const existingAnalytics = await db.learningAnalytics.findUnique({
      where: { id },
    });

    if (!existingAnalytics) {
      return new NextResponse('Learning analytics record not found', { status: 404 });
    }

    // Ensure the authenticated user is the owner of the record
    if (existingAnalytics.studentId !== session.user.id) {
      return new NextResponse('Forbidden', { status: 403 });
    }

    await db.learningAnalytics.delete({
      where: { id },
    });

    return new NextResponse('Learning analytics record deleted', { status: 200 });
  } catch (error) {
    console.error('[LEARNING_ANALYTICS_DELETE]', error);
    if (error instanceof z.ZodError) {
      return new NextResponse(error.message, { status: 400 });
    }
    return new NextResponse('Internal Error', { status: 500 });
  }
}
