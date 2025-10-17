import { NextResponse } from 'next/server';

interface Message {
  id: number;
  user: string;
  text: string;
}

const messages: Message[] = [];

export async function GET() {
  return NextResponse.json({ messages });
}

export async function POST(request: Request) {
  const { user, text } = await request.json();
  const newMessage = { id: Date.now(), user, text };
  messages.push(newMessage);
  return NextResponse.json(newMessage);
}
