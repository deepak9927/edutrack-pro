import { NextResponse } from 'next/server';
import { z } from 'zod';
import { generatePersonalizedStudyPlan } from '@/lib/ai/study-plan-generator';
import { auth } from '@/lib/auth/auth';

const studyPlanRequestSchema = z.object({
  studentId: z.string(),
  learningObjectives: z.array(z.string()).min(1, "At least one learning objective is required"),
  timeCommitment: z.string().min(1, "Time commitment is required"),
});

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session || session.user.role !== 'STUDENT') {
      return NextResponse.json({ message: 'Unauthorized', success: false }, { status: 401 });
    }

    const body = await request.json();
    const validatedBody = studyPlanRequestSchema.parse(body);

    // Ensure the studentId in the request matches the authenticated user's ID
    if (session.user.id !== validatedBody.studentId) {
      return NextResponse.json({ message: 'Unauthorized: Mismatched student ID', success: false }, { status: 403 });
    }

    const studyPlan = await generatePersonalizedStudyPlan(validatedBody);

    return NextResponse.json({ message: 'Study plan generated successfully', success: true, studyPlan }, { status: 200 });
  } catch (error) {
    console.error('Error generating study plan:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: 'Invalid request body', errors: error.errors }, { status: 400 });
    }

    return NextResponse.json({ message: 'Failed to generate study plan', success: false, error: error.message }, { status: 500 });
  }
}