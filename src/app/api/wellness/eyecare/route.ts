import { NextResponse } from 'next/server';
import { EyeCareSettings } from '@/types/wellness';

let eyeCareSettings: EyeCareSettings = {
  blueLightFilter: false,
  remindersEnabled: true,
  postureAlertsEnabled: false,
};

export async function GET() {
  return NextResponse.json(eyeCareSettings);
}

export async function POST(request: Request) {
  const newSettings = await request.json();
  eyeCareSettings = { ...eyeCareSettings, ...newSettings };
  return NextResponse.json(eyeCareSettings);
}
