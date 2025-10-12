import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuthApi } from "@/lib/auth/middleware";

/**
 * GET /api/courses
 * Returns a list of all courses.
 */
export async function GET(req: NextRequest) {
  try {
    const authResult = await requireAuthApi();
    if (authResult.error) {
      return authResult.error;
    }

    const courses = await prisma.course.findMany();
    return NextResponse.json(courses);
  } catch (error) {
    console.error("[COURSES_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

/**
 * POST /api/courses
 * Creates a new course.
 * Required fields: name, code, semester, credits
 */
export async function POST(req: NextRequest) {
  try {
    const authResult = await requireAuthApi();
    if (authResult.error) {
      return authResult.error;
    }

    const body = await req.json();
    const { name, code, description, semester, credits } = body;

    if (!name || !code || !semester || !credits) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const newCourse = await prisma.course.create({
      data: {
        name,
        code,
        description,
        semester,
        credits,
      },
    });

    return NextResponse.json(newCourse, { status: 201 });
  } catch (error) {
    console.error("[COURSES_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}