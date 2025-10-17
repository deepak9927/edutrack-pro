import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

interface ErrorResponse {
  message: string;
  errors?: any;
}

export function handleError(error: unknown): NextResponse<ErrorResponse> {
  console.error('API Error:', error);

  if (error instanceof ZodError) {
    return new NextResponse(
      JSON.stringify({
        message: 'Validation failed',
        errors: error.flatten().fieldErrors,
      }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  if (typeof error === 'object' && error !== null && 'code' in error) {
    switch (error.code) {
      case 'P2002': // Prisma unique constraint violation
        return new NextResponse(
          JSON.stringify({ message: 'A record with this value already exists.' }),
          { status: 409, headers: { 'Content-Type': 'application/json' } }
        );
      // Add other Prisma error codes as needed
    }
  }

  if (error instanceof Error) {
    return new NextResponse(
      JSON.stringify({ message: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  return new NextResponse(
    JSON.stringify({ message: 'An unknown error occurred.' }),
    { status: 500, headers: { 'Content-Type': 'application/json' } }
  );
}
