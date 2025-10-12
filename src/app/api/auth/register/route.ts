import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { RegisterSchema } from "@/lib/validations/auth";
import { NextResponse } from "next/server";
import * as z from "zod";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const validatedFields = RegisterSchema.safeParse(body);

    if (!validatedFields.success) {
      return NextResponse.json({ error: "Invalid fields!" }, { status: 400 });
    }

    const { email, password, name } = validatedFields.data;

    // Check if email already exists
    const existingUser = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      // Redirect to login page if user already exists
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    const { password: newUserPassword, ...rest } = newUser;

    console.log("User created successfully:", newUser.email); // Add server-side log
    return NextResponse.json(
      { success: "User created successfully!" },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Registration API validation error:", error.errors); // Log validation errors
      return NextResponse.json({ message: "Invalid data", errors: error.errors }, { status: 400 });
    }

    console.error("Registration API error:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};
