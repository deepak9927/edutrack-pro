import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth/auth';
import { UserRole } from '@prisma/client'; // Assuming UserRole enum is available from Prisma client

export async function adminMiddleware(request: NextRequest, handler: (request: NextRequest) => Promise<NextResponse>) {
  const session = await auth();

  if (!session || !session.user || session.user.role !== UserRole.ADMIN) {
    return NextResponse.json({ message: 'Unauthorized: Admin access required' }, { status: 403 });
  }

  return handler(request);
}
