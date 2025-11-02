import { GET } from './route';
import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';

// Mock the prisma.course.findUnique function
jest.mock('@/lib/prisma', () => ({
  prisma: {
    course: {
      findUnique: jest.fn(),
    },
  },
}));

describe('GET /api/courses/[courseId]', () => {
  it('should return the correct course data for a given course ID', async () => {
    // Mock the course data
    const mockCourse = {
      id: '123',
      title: 'Test Course',
      description: 'This is a test course',
    };

    // Mock the prisma.course.findUnique function to return the mock course data
    (prisma.course.findUnique as jest.Mock).mockResolvedValue(mockCourse);

    // Create a mock request object
    const req = {} as NextRequest;

    // Create a mock params object
    const params = { params: { courseId: '123' } };

    // Call the GET function
    const res = await GET(req, params);

    // Verify that the response is successful
    expect(res.status).toBe(200);

    // Verify that the response body contains the correct course data
    const body = await res.json();
    expect(body.course).toEqual(expect.objectContaining({
      id: '123',
      title: 'Test Course',
      description: 'This is a test course',
    }));
  });
});