import { NextResponse } from 'next/server';

const mentors = [
  'Alice (Software Engineer)',
  'Bob (UX Designer)',
  'Charlie (Product Manager)',
  'Diana (Data Scientist)',
  'Eve (Cybersecurity Analyst)',
];

export async function POST(request: Request) {
  await request.json();
  // In a real application, you would use the interests to perform an intelligent match
  const randomIndex = Math.floor(Math.random() * mentors.length);
  const mentor = mentors[randomIndex];
  return NextResponse.json({ mentor });
}