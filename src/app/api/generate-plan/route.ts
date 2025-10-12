import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";

const formSchema = z.object({
  subject: z.string().min(2),
  goal: z.string().min(10),
  duration: z.coerce.number().min(1),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { subject, goal, duration } = formSchema.parse(body);

    if (!process.env.GEMINI_API_KEY) {
      return new NextResponse("Missing Gemini API Key", { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Create a detailed study plan for learning ${subject} with the goal of ${goal} in ${duration} weeks. Break it down week by week.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ plan: text });
  } catch (error) {
    console.error("[GENERATE_PLAN_ERROR]", error);
    if (error instanceof z.ZodError) {
      return new NextResponse(error.message, { status: 400 });
    }
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
