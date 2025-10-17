import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { RegisterSchema } from "@/lib/validations/auth";
import { NextResponse } from "next/server";
import * as z from "zod";
import { Prisma } from "@prisma/client";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();

    // Validate request body
    const result = RegisterSchema.safeParse(body);
    if (!result.success) {
      console.info("Registration validation failed");
      return NextResponse.json(
        { ok: false, error: "Invalid fields", details: result.error.errors },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const name = result.data.name.trim();
    const email = result.data.email.toLowerCase().trim();
    const password = result.data.password;

    // Check if user already exists
    const existingUser = await db.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { ok: false, error: "User already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await db.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    });

    console.info(`User created: ${newUser.email}`);
    return NextResponse.json({ ok: true, user: newUser }, { status: 201 });
  } catch (error) {
    // Handle Prisma unique constraint race (in case of concurrent requests)
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      console.warn("Registration conflict: unique constraint", error.meta);
      return NextResponse.json(
        { ok: false, error: "User already exists" },
        { status: 409 }
      );
    }

    if (error instanceof z.ZodError) {
      console.error("Registration API validation error:", error.errors);
      return NextResponse.json({ ok: false, error: "Invalid data", details: error.errors }, { status: 400 });
    }

    console.error("Registration API error:", error);
    return NextResponse.json({ ok: false, error: "Something went wrong" }, { status: 500 });
  }
};
