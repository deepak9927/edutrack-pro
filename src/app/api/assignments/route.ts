import { NextResponse } from "next/server";

interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  progress: number;
}

export const GET = async () => {
  const assignments: Assignment[] = [
    {
      id: "1",
      title: "BCA Assignment 1",
      description: "Introduction to Computer Applications",
      dueDate: new Date("2025-10-15"),
      progress: 50,
    },
    {
      id: "2",
      title: "BCA Assignment 2",
      description: "Programming in C",
      dueDate: new Date("2025-10-22"),
      progress: 75,
    },
    {
      id: "3",
      title: "BCA Assignment 3",
      description: "Mathematics",
      dueDate: new Date("2025-10-29"),
      progress: 25,
    },
  ];

  return NextResponse.json(assignments);
};
