import { NextResponse } from 'next/server';

const students = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank', 'Grace'];

export async function POST(request: Request) {
  await request.json();
  // In a real application, you would use the topic to find relevant students
  const shuffled = students.sort(() => 0.5 - Math.random());
  const group = shuffled.slice(0, 3);
  return NextResponse.json({ group });
}