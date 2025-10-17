import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma'; // Assuming prisma client is exported from here
import { auth } from '@/lib/auth/auth'; // Assuming an auth utility for session/user info
import { handleError } from '@/lib/utils/error-handler';

// Define the request body schema
const createCourseSchema = z.object({
  courseCode: z.string().min(3, "Course code must be at least 3 characters long"),
  title: z.string().min(3, "Course title must be at least 3 characters long"),
  description: z.string().optional(),
  credits: z.number().int().min(1, "Credits must be at least 1"),
  semester: z.number().int().min(1, "Semester must be at least 1"),
  teacherId: z.string().min(1, "Teacher ID is required"),
  department: z.string().min(1, "Department is required"),
  academicYear: z.string().min(4, "Academic year must be at least 4 characters long"), // Added academicYear
});

/**
 * Handles POST requests to create a new course.
 * @param request The incoming request object.
 * @returns A NextResponse object with the appropriate status and message.
 */
export async function POST(request: Request) {
  try {
    // Basic Authorization Check (Placeholder)
    // In a real application, you would check the user's session/token
    // and their role (e.g., only ADMIN or TEACHER can create courses).
    const session = await auth(); // Assuming auth() returns the current session
    if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'TEACHER')) {
      return NextResponse.json({ message: 'Unauthorized', success: false }, { status: 401 });
    }

    const body = await request.json();
    const validatedBody = createCourseSchema.parse(body);

    // Check if the teacher exists
    const teacher = await prisma.teacher.findUnique({
      where: { id: validatedBody.teacherId },
    });

    if (!teacher) {
      return NextResponse.json({ message: 'Teacher not found', success: false }, { status: 404 });
    }

    const newCourse = await prisma.course.create({
      data: {
        courseCode: validatedBody.courseCode,
        title: validatedBody.title,
        description: validatedBody.description,
        credits: validatedBody.credits,
        semester: validatedBody.semester,
        department: validatedBody.department,
        teacherId: validatedBody.teacherId,
        academicYear: validatedBody.academicYear,
        // isActive and createdAt/updatedAt are handled by Prisma defaults
      },
    });

    return NextResponse.json({ message: 'Course created successfully', success: true, course: newCourse }, { status: 201 });
  } catch (error) {
    return handleError(error);
  }
}
