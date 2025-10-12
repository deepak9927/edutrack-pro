import { auth } from '@/lib/auth/auth';
import { NextResponse } from 'next/server';
import { UserRole } from '@prisma/client';

export async function requireAdmin() {
  const session = await auth();
  if (!session?.user?.id || !session?.user?.role) {
    return { error: new NextResponse('Unauthorized', { status: 401 }) };
  }

  if (session.user.role !== UserRole.ADMIN && session.user.role !== UserRole.SUPER_ADMIN) {
    return { error: new NextResponse('Forbidden: Not an administrator', { status: 403 }) };
  }

  return { userId: session.user.id, userRole: session.user.role };
}