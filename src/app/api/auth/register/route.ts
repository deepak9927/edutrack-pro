import { db } from "@/lib/db"; // Corrected import
import bcrypt from "bcryptjs";
import { RegisterSchema } from "@/lib/validations/auth";
import { NextResponse } from "next/server";
import * as z from "zod";
import { Prisma } from "@prisma/client";

export const POST = async (req: Request) => {
  try {
    console.log("Register API: Received request.");
    const body = await req.json();
    console.log("Register API: Request body parsed.", body);

    // Validate request body
    const result = RegisterSchema.safeParse(body);
    if (!result.success) {
      console.info("Register API: Validation failed.", result.error.errors);
      return NextResponse.json(
        { ok: false, error: "Invalid fields", details: result.error.errors },
        { status: 400 }
      );
    }
    console.log("Register API: Validation successful.");

    // Sanitize inputs
    const name = result.data.name.trim();
    const email = result.data.email.toLowerCase().trim();
    const password = result.data.password;
    console.log("Register API: Inputs sanitized. Email:", email);

    // Check if user already exists
    const existingUser = await db.user.findUnique({ where: { email } }); // Changed prisma.user to db.user
    if (existingUser) {
      console.warn("Register API: User already exists for email:", email);
      return NextResponse.json(
        { ok: false, error: "User already exists" },
        { status: 409 }
      );
    }
    console.log("Register API: User does not exist, proceeding with creation.");

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Register API: Password hashed.");

    // Create user
    const newUser = await db.user.create({ // Changed prisma.user to db.user
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

    console.info(`Register API: User created successfully: ${newUser.email}`);
    return NextResponse.json({ ok: true, user: newUser }, { status: 201 });
  } catch (error) {
    console.error("Register API: An unexpected error occurred.", error);
    // Handle Prisma unique constraint race (in case of concurrent requests)
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      console.warn("Register API: Registration conflict (unique constraint).", error.meta);
      return NextResponse.json(
        { ok: false, error: "User already exists" },
        { status: 409 }
      );
    }

    if (error instanceof z.ZodError) {
      console.error("Register API: Validation error during processing.", error.errors);
      return NextResponse.json({ ok: false, error: "Invalid data", details: error.errors }, { status: 400 });
    }

    // Log the detailed error server-side for troubleshooting
    console.error("Register API: Generic server error.", error);

    // In development only, return a short debug token so devs can correlate logs.
    if (process.env.NODE_ENV !== 'production') {
      const message = error instanceof Error ? error.message : String(error);
      // Return a short message and the original message in a `debug` field only in development
      return NextResponse.json({ ok: false, error: "Something went wrong", debug: message }, { status: 500 });
    }

    // Production: do not leak internals
    return NextResponse.json({ ok: false, error: "Something went wrong" }, { status: 500 });
  }
};
