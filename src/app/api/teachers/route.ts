import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const teachers = await db.teacher.findMany({
      select: {
        id: true,
        // name: true,  // Assuming 'name' is not a selectable field.  If it is, uncomment this line.
      },
    });

    return NextResponse.json(teachers);
  } catch (error) {
    console.error("GET_TEACHERS", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};