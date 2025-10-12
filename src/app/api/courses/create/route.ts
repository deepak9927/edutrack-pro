import { NextResponse } from 'next/server';
import { z } from 'zod';

// Define the request body schema
const createCourseSchema = z.object({
  // Course code (minimum 3 characters)
  courseCode: z.string().min(3),
  // Course title (minimum 3 characters)
  title: z.string().min(3),
  // Course description (optional)
  description: z.string().optional(),
  // Number of credits (minimum 1)
  credits: z.number().int().min(1),
  // Semester number (minimum 1)
  semester: z.number().int().min(1),
  // Teacher ID (required)
  teacherId: z.string().min(1),
  // Department (required)
  department: z.string().min(1),
});

/**
 * Handles POST requests to create a new course.
 * @param request The incoming request object.
 * @returns A NextResponse object with the appropriate status and message.
 */
export async function POST(request: Request) {
  try {
    // Parse the request body as JSON
    const body = await request.json();

    // Validate the request body against the schema
    const validatedBody = createCourseSchema.parse(body);

    // Implement the logic to create the course in the database here
    // For example:
    // await prisma.course.create({
    //   data: validatedBody,
    // });

    // Return a success response
    return NextResponse.json({ message: 'Course created successfully', success: true }, { status: 201 });
  } catch (error) {
    // Log the error
    console.error('Error creating course:', error);

    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: 'Invalid request body', error: error.errors }, { status: 400 });
    }

    // Return a generic error response
    return NextResponse.json({ message: 'Failed to create course', error: true }, { status: 500 });
  }
}