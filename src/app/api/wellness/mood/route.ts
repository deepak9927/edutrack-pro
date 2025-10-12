import { db } from "@/lib/db";
import { auth } from "@/lib/auth/auth";
import { NextResponse } from "next/server";
import { dailyMoodSchema } from "@/lib/validations/wellness";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const json = await req.json();
    const body = dailyMoodSchema.parse(json);

    const moodEntry = await db.wellnessData.create({
      data: {
        studentId: session.user.id,
        date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
        moodScore: body.moodScore,
        stressLevel: body.stressLevel,
        anxietyLevel: body.anxietyLevel,
        energyLevel: body.energyLevel,
        dailyReflection: body.dailyReflection,
      },
    });

    return new NextResponse(JSON.stringify(moodEntry), {
      status: 201,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error: unknown) {
    console.error("Mood API Error:", error);
    
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify({ error: "Invalid request data", details: error.errors }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    return new NextResponse(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

export async function GET() {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const student = await db.student.findUnique({
      where: { userId: session.user.id },
    });

    if (!student) {
      return new NextResponse("Student profile not found", { status: 404 });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const wellnessData = await db.wellnessData.findFirst({
      where: {
        studentId: student.id,
        date: today,
      },
    });

    return NextResponse.json(wellnessData);
  } catch (error) {
    console.error("[WELLNESS_MOOD_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
