import { getUserByEmail } from '@/lib/actions/get-user';
import { db } from '@/lib/db';
import { expect, test, vi } from 'vitest';

vi.mock('@/lib/db', () => ({
  db: {
    user: {
      findUnique: vi.fn(),
    },
  },
}));

const mockedDb = db as any;

test('getUserByEmail returns user on success', async () => {
  const mockUser = { id: '1', email: 'test@example.com', name: 'Test User' };
  mockedDb.user.findUnique.mockResolvedValue(mockUser);

  const user = await getUserByEmail('test@example.com');

  expect(user).toEqual(mockUser);
  expect(mockedDb.user.findUnique).toHaveBeenCalledWith({ where: { email: 'test@example.com' } });
});

test('getUserByEmail returns null on error', async () => {
  mockedDb.user.findUnique.mockRejectedValue(new Error('Database error'));

  const user = await getUserByEmail('test@example.com');

  expect(user).toBeNull();
  expect(mockedDb.user.findUnique).toHaveBeenCalledWith({ where: { email: 'test@example.com' } });
});