import { test, expect, vi } from 'vitest';
import { POST } from '@/app/api/wellness/screentime/retention/route';
import { NextRequest } from 'next/server';

// Mock admin check to always succeed
vi.mock('@/lib/auth/admin', () => ({
  requireAdmin: async () => ({ userId: 'admin-user-id', userRole: 'ADMIN' }),
}));

// Mock the wellness service runRetention function
const runRetentionMock = vi.fn();
vi.mock('@/lib/wellness/service', () => ({
  // Avoid inline TypeScript annotations in mock factories to keep the test
  // transformer happy. The mock simply forwards arguments to the spy.
  runRetention: (...args: any) => runRetentionMock(...args),
}));

test('retention job delegates to runRetention (anonymizedOnly=true)', async () => {
  runRetentionMock.mockResolvedValueOnce(2);
  const request = new NextRequest('http://localhost/api/wellness/screentime/retention', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ days: 90, anonymizedOnly: true }),
  });

  const response = await POST(request);
  const result = await response.json();

  expect(response.status).toBe(200);
  expect(result.deleted).toBe(2);
  expect(runRetentionMock).toHaveBeenCalledWith(90, true);
});

test('retention job delegates to runRetention (anonymizedOnly=false)', async () => {
  runRetentionMock.mockResolvedValueOnce(2);
  const request = new NextRequest('http://localhost/api/wellness/screentime/retention', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ days: 90, anonymizedOnly: false }),
  });

  const response = await POST(request);
  const result = await response.json();

  expect(response.status).toBe(200);
  expect(result.deleted).toBe(2);
  expect(runRetentionMock).toHaveBeenCalledWith(90, false);
});

test('retention job returns 400 for invalid payload', async () => {
  const request = new NextRequest('http://localhost/api/wellness/screentime/retention', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ days: 'invalid' }),
  });

  const response = await POST(request);
  expect(response.status).toBe(400);
  const result = await response.json();
  expect(result.error).toBe('invalid_payload');
});
