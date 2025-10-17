import { NextResponse } from 'next/server';
import { z } from 'zod';

// In a real application, these settings would be stored in a database

interface ScheduleItem {
  day: string;
  startTime: string;
  endTime: string;
}

interface FocusModeSettings {
  isEnabled: boolean;
  blockedApps: string[];
  blockedWebsites: string[];
  schedule: ScheduleItem[];
}

let focusModeSettings: FocusModeSettings = {
  isEnabled: false,
  blockedApps: ['facebook.com', 'twitter.com'],
  blockedWebsites: ['youtube.com', 'netflix.com'],
  schedule: [], // e.g., [{ day: 'Monday', startTime: '09:00', endTime: '17:00' }]
};

const focusModeSchema = z.object({
  isEnabled: z.boolean().optional(),
  blockedApps: z.array(z.string()).optional(),
  blockedWebsites: z.array(z.string()).optional(),
  schedule: z.array(z.object({
    day: z.string(),
    startTime: z.string(),
    endTime: z.string(),
  })).optional(),
});

export async function GET() {
  return NextResponse.json(focusModeSettings);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedSettings = focusModeSchema.parse(body);
    focusModeSettings = { ...focusModeSettings, ...validatedSettings };
    console.log('Updated focus mode settings:', focusModeSettings);
    return NextResponse.json({ message: 'Focus mode settings updated', settings: focusModeSettings });
  } catch (error) {
    if (error instanceof Error) {
      return new NextResponse(`Validation Error: ${error.message}`, { status: 400 });
    }
    return new NextResponse('An unknown error occurred', { status: 500 });
  }
}
