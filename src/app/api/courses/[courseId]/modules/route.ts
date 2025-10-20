import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth/auth';

const createModuleSchema = z.object({
  title: z.string().min(3, "Module title must be at least 3 characters long"),
  description: z.string().optional(),
  order: z.number().int().min(0, "Order must be a non-negative integer"),
});

interface Context {
  params: {
    courseId: string;
  };
}

export async function GET(
  request: Request,
  context: Context
) {
  try {
    const { courseId } = context.params;

    const modules = await prisma.module.findMany({
      where: { courseId },
      orderBy: { order: 'asc' },
      include: { lessons: true }, // Optionally include lessons
    });

    return NextResponse.json(modules, { status: 200 });
  } catch (error) {
    console.error('Error fetching modules:', error);
    return NextResponse.json({ message: 'Failed to fetch modules', success: false }, { status: 500 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const session = await auth();
    if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'TEACHER')) {
      return NextResponse.json({ message: 'Unauthorized', success: false }, { status: 401 });
    }

    const { courseId } = params;
    const body = await request.json();
    const validatedBody = createModuleSchema.parse(body);

    const newModule = await prisma.module.create({
      data: {
        courseId,
        title: validatedBody.title,
        description: validatedBody.description,
        order: validatedBody.order,
      },
    });

    return NextResponse.json({ message: 'Module created successfully', success: true, module: newModule }, { status: 201 });
  } catch (error) {
    console.error('Error creating module:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: 'Invalid request body', errors: error.errors }, { status: 400 });
    }

    return NextResponse.json({ message: 'Failed to create module', success: false }, { status: 500 });
  }
}
