import { NextResponse } from 'next/server';

interface SabbathSchedule {
  startTime: string;
  endTime: string;
  activity: string;
}

let schedule: SabbathSchedule | null = null;

export async function GET() {
  return NextResponse.json({ schedule });
}

export async function POST(request: Request) {
  const { startTime, endTime, activity } = await request.json();
  if (startTime && endTime) {
    schedule = { startTime, endTime, activity };
  }
  return NextResponse.json({ schedule });
}

export async function DELETE() {
  schedule = null;
  return NextResponse.json({ schedule });
}