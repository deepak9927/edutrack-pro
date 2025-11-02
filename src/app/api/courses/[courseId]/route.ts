import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { handleError } from '@/lib/utils/error-handler';
import rateLimit from '@/lib/utils/rate-limit'; // in-memory rate limiter
import { z } from 'zod';

const courseIdSchema = z.object({
  courseId: z.string().cuid(),
});

/**
 * Handles GET requests to retrieve a specific course by ID.
 * @param request The incoming request object.
 * @param params The route parameters.
 * @returns A NextResponse object with the appropriate status and message.
 */
export async function GET(request: Request, context: { params: Promise<{ courseId: string }> }) {
  try {
    // Rate limit the request
    const limiter = rateLimit({ interval: 60 * 1000, uniqueTokenPerInterval: 500 });
    const result = await limiter.check(request, 10); // 10 requests per minute
    if (!result.success) {
      console.log("Rate limit exceeded");
      return new NextResponse(JSON.stringify({ error: 'Rate limit exceeded' }), {
        status: 429,
        headers: {
          'Retry-After': result.resetAfter,
        },
      });
    }
    const params = await context.params;
    const courseId = params?.courseId;
    try {
      courseIdSchema.parse({ courseId });
    } catch (error) {
      console.error("Invalid courseId", error);
      return NextResponse.json({ message: 'Invalid courseId: ' + error.message, success: false }, { status: 400 });
    }

    const course = await prisma.course.findUnique({
      where: {
        id: courseId,
      },
    });

    if (!course) {
      return NextResponse.json({ message: 'Course not found', success: false }, { status: 404 });
    }

    return NextResponse.json({ message: 'Course retrieved successfully', success: true, course }, { status: 200 });
  } catch (error) {
    console.error("Error retrieving course", error);
    return handleError(error);
  }
}