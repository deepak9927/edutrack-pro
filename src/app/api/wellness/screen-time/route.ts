import { NextResponse } from 'next/server';
import { ScreenTimeData } from '@/lib/models/screen-time';

export async function GET() {
  // Simulate fetching data from a database
  const userId = 'user123';
  const today = new Date();
  const screenTimeData: ScreenTimeData[] = [];

  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    let dateString = date.toISOString().split('T')[0]; // YYYY-MM-DD

    if (!dateString) {
      dateString = date.toISOString();
    }

    const productiveTime = Math.floor(Math.random() * 240); // Up to 4 hours
    const distractingTime = Math.floor(Math.random() * 120); // Up to 2 hours

    const appUsage: { [appName: string]: number } = {
      'VS Code': Math.floor(Math.random() * productiveTime),
      'Web Browser': Math.floor(Math.random() * (productiveTime + distractingTime)),
      'Social Media': Math.floor(Math.random() * distractingTime),
    };

    screenTimeData.push({
      userId,
      date: dateString,
      productiveTime,
      distractingTime,
      appUsage,
    });
  }

  return NextResponse.json(screenTimeData);
}