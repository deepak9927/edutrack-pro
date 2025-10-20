import { NextResponse } from 'next/server';
import { z } from 'zod';

// Define the request body schema
const updateMarksSchema = z.object({
  // Assignment ID
  assignmentId: z.string(),
  // Student ID
  studentId: z.string(),
  // Marks obtained (integer between 0 and 100)
  marks: z.number().int().min(0).max(100),
});

/**
 * Handles POST requests to update marks for an assignment.
 * @param request The incoming request object.
 * @returns A NextResponse object with the appropriate status and message.
 */
export async function POST(request: Request) {
  try {
    // Parse the request body as JSON
    const body = await request.json();

    // Validate the request body against the schema
    updateMarksSchema.parse(body);

    // Implement the logic to update the marks in the database here
    // For example:
    // await prisma.marks.update({
    //   where: {
    //     assignmentId_studentId: {
    //       assignmentId: validatedBody.assignmentId,
    //       studentId: validatedBody.studentId,
    //     },
    //   },
    //   data: {
    //     marks: validatedBody.marks,
    //   },
    // });

    // Return a success response
    return NextResponse.json({ message: 'Marks updated successfully' }, { status: 200 });
  } catch (error) {
    // Log the error
    console.error('Error updating marks:', error);

    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: 'Invalid request body', errors: error.errors }, { status: 400 });
    }

    // Return a generic error response
    return NextResponse.json({ message: 'Failed to update marks' }, { status: 500 });
  }
}