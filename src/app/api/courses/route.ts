import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma'; // Prisma client
import { auth } from '@/lib/auth/auth'; // Auth utility for session/user info
import { handleError } from '@/lib/utils/error-handler';
import type { Prisma } from '@prisma/client';

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

/**
 * Handles GET requests to retrieve courses.
 * Supports filtering, pagination, and sorting.
 * @param request The incoming request object.
 * @returns A NextResponse object with the appropriate status and message.
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // Optional: Authorization check if only certain roles can view all courses
    // const session = await auth();
    // if (!session) {
    //   return NextResponse.json({ message: 'Unauthorized', success: false }, { status: 401 });
    // }

    // Filtering
    const courseCode = searchParams.get('courseCode');
    const title = searchParams.get('title');
    const teacherId = searchParams.get('teacherId');
    const department = searchParams.get('department');
    const academicYear = searchParams.get('academicYear');
    const semester = searchParams.get('semester');

  const where: Prisma.CourseWhereInput = {};
    if (courseCode) where.courseCode = { contains: courseCode, mode: 'insensitive' };
    if (title) where.title = { contains: title, mode: 'insensitive' };
    if (teacherId) where.teacherId = teacherId;
    if (department) where.department = { contains: department, mode: 'insensitive' };
    if (academicYear) where.academicYear = academicYear;
    if (semester) where.semester = parseInt(semester as string);

    // Pagination
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    // Sorting
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc'; // 'asc' or 'desc'

  // Validate sortOrder and sortBy to avoid runtime errors
  function isValidSortOrder(v: string | null): v is Prisma.SortOrder {
    return v === 'asc' || v === 'desc';
  }

  function isValidSortBy(v: string | null): v is keyof Prisma.CourseOrderByInput {
    return v === 'createdAt' || v === 'title' || v === 'courseCode' || v === 'semester';
  }

  const validatedSortOrder = isValidSortOrder(sortOrder) ? (sortOrder as Prisma.SortOrder) : 'desc';
  const validatedSortBy = isValidSortBy(sortBy) ? (sortBy as keyof Prisma.CourseOrderByInput) : 'createdAt';

  const orderBy: Prisma.CourseOrderByWithRelationInput = { [validatedSortBy]: validatedSortOrder } as Prisma.CourseOrderByWithRelationInput;

    const courses = await prisma.course.findMany({
      where,
      skip,
      take: limit,
      orderBy,
      include: {
        teacher: {
          select: {
            id: true,
            employeeId: true,
            department: true,
            designation: true,
            user: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    const totalCourses = await prisma.course.count({ where });

    return NextResponse.json({
      message: 'Courses retrieved successfully',
      success: true,
      data: courses,
      pagination: {
        total: totalCourses,
        page,
        limit,
        totalPages: Math.ceil(totalCourses / limit),
      },
    }, { status: 200 });
  } catch (error) {
    return handleError(error);
  }
}
