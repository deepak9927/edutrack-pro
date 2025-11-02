import { GET } from '@/app/api/assignments/route';
import { NextResponse } from 'next/server';

describe('GET /api/assignments', () => {
  it('should return a list of assignments', async () => {
    const res = await GET();
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toEqual(expect.arrayContaining([
      expect.objectContaining({
        id: expect.any(String),
        title: expect.any(String),
        description: expect.any(String),
        dueDate: expect.any(String), // Dates are stringified in JSON
        progress: expect.any(Number),
      }),
    ]));
    expect(body.length).toBeGreaterThan(0);
  });
});