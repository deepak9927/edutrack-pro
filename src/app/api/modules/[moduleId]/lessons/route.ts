import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth/auth';

const createLessonSchema = z.object({
  title: z.string().min(3, "Lesson title must be at least 3 characters long"),
  content: z.string().optional(),
  videoUrl: z.string().url().optional(),
  readingTime: z.number().int().min(0).optional(),
  order: z.number().int().min(0, "Order must be a non-negative integer"),
});

export async function GET(
  request: Request,
  { params }: { params: { moduleId: string } }
) {
  try {
    const { moduleId } = params;

    const lessons = await prisma.lesson.findMany({
      where: { moduleId },
      orderBy: { order: 'asc' },
    });

    return NextResponse.json(lessons, { status: 200 });
  } catch (error) {
    console.error('Error fetching lessons:', error);
    return NextResponse.json({ message: 'Failed to fetch lessons', success: false }, { status: 500 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: { moduleId: string } }
) {
  try {
    const session = await auth();
    if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'TEACHER')) {
      return NextResponse.json({ message: 'Unauthorized', success: false }, { status: 401 });
    }

    const { moduleId } = params;
    const body = await request.json();
    const validatedBody = createLessonSchema.parse(body);

    const newLesson = await prisma.lesson.create({
      data: {
        moduleId,
        title: validatedBody.title,
        content: validatedBody.content,
        videoUrl: validatedBody.videoUrl,
        readingTime: validatedBody.readingTime,
        order: validatedBody.order,
      },
    });

    return NextResponse.json({ message: 'Lesson created successfully', success: true, lesson: newLesson }, { status: 201 });
  } catch (error) {
    console.error('Error creating lesson:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: 'Invalid request body', errors: error.errors }, { status: 400 });
    }

    return NextResponse.json({ message: 'Failed to create lesson', success: false }, { status: 500 });
  }
}