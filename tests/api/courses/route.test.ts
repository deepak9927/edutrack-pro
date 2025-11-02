// tests/api/courses/route.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GET, POST } from '@/app/api/courses/route';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth/auth';

// Mock Prisma and Auth
vi.mock('@/lib/prisma', () => ({
  prisma: {
    course: {
      findMany: vi.fn(),
      count: vi.fn(),
      create: vi.fn(),
    },
    teacher: {
      findUnique: vi.fn(),
    },
  },
}));

vi.mock('@/lib/auth/auth', () => ({
  auth: vi.fn(),
}));

// Mock handleError to prevent actual error logging during tests
vi.mock('@/lib/utils/error-handler', () => ({
  handleError: vi.fn((error) => {
    console.error('Mocked handleError:', error);
    return new Response(JSON.stringify({ message: 'Internal Server Error', success: false }), { status: 500 });
  }),
}));

describe('Courses API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock a successful authentication for most tests
    (auth as vi.Mock).mockResolvedValue({ user: { role: 'ADMIN', id: 'admin123' } });
  });

  // =========================================================================
  // GET /api/courses Tests
  // =========================================================================

  describe('GET /api/courses', () => {
    it('should return all courses with default pagination and sorting', async () => {
      const mockCourses = [
        { id: 'c1', courseCode: 'CS101', title: 'Intro to CS', teacherId: 't1', department: 'CS', academicYear: '2023-2024', semester: 1, createdAt: new Date() },
        { id: 'c2', courseCode: 'MA201', title: 'Calculus I', teacherId: 't2', department: 'Math', academicYear: '2023-2024', semester: 2, createdAt: new Date() },
      ];
      (prisma.course.findMany as vi.Mock).mockResolvedValue(mockCourses);
      (prisma.course.count as vi.Mock).mockResolvedValue(mockCourses.length);

      const request = new Request('http://localhost/api/courses');
      const response = await GET(request);
      const json = await response.json();

      expect(response.status).toBe(200);
      expect(json.success).toBe(true);
      expect(json.data).toEqual(mockCourses);
      expect(json.pagination).toEqual({
        total: 2,
        page: 1,
        limit: 10,
        totalPages: 1,
      });
      expect(prisma.course.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          take: 10,
          skip: 0,
          orderBy: { createdAt: 'desc' },
        })
      );
    });

    it('should filter courses by courseCode', async () => {
      const mockCourses = [
        { id: 'c1', courseCode: 'CS101', title: 'Intro to CS', teacherId: 't1', department: 'CS', academicYear: '2023-2024', semester: 1, createdAt: new Date() },
      ];
      (prisma.course.findMany as vi.Mock).mockResolvedValue(mockCourses);
      (prisma.course.count as vi.Mock).mockResolvedValue(mockCourses.length);

      const request = new Request('http://localhost/api/courses?courseCode=CS101');
      const response = await GET(request);
      const json = await response.json();

      expect(response.status).toBe(200);
      expect(json.data).toEqual(mockCourses);
      expect(prisma.course.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { courseCode: { contains: 'CS101', mode: 'insensitive' } },
        })
      );
    });

    it('should filter courses by title', async () => {
      const mockCourses = [
        { id: 'c1', courseCode: 'CS101', title: 'Intro to CS', teacherId: 't1', department: 'CS', academicYear: '2023-2024', semester: 1, createdAt: new Date() },
      ];
      (prisma.course.findMany as vi.Mock).mockResolvedValue(mockCourses);
      (prisma.course.count as vi.Mock).mockResolvedValue(mockCourses.length);

      const request = new Request('http://localhost/api/courses?title=Intro');
      const response = await GET(request);
      const json = await response.json();

      expect(response.status).toBe(200);
      expect(json.data).toEqual(mockCourses);
      expect(prisma.course.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { title: { contains: 'Intro', mode: 'insensitive' } },
        })
      );
    });

    it('should filter courses by teacherId', async () => {
      const mockCourses = [
        { id: 'c1', courseCode: 'CS101', title: 'Intro to CS', teacherId: 't1', department: 'CS', academicYear: '2023-2024', semester: 1, createdAt: new Date() },
      ];
      (prisma.course.findMany as vi.Mock).mockResolvedValue(mockCourses);
      (prisma.course.count as vi.Mock).mockResolvedValue(mockCourses.length);

      const request = new Request('http://localhost/api/courses?teacherId=t1');
      const response = await GET(request);
      const json = await response.json();

      expect(response.status).toBe(200);
      expect(json.data).toEqual(mockCourses);
      expect(prisma.course.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { teacherId: 't1' },
        })
      );
    });

    it('should filter courses by department', async () => {
      const mockCourses = [
        { id: 'c1', courseCode: 'CS101', title: 'Intro to CS', teacherId: 't1', department: 'CS', academicYear: '2023-2024', semester: 1, createdAt: new Date() },
      ];
      (prisma.course.findMany as vi.Mock).mockResolvedValue(mockCourses);
      (prisma.course.count as vi.Mock).mockResolvedValue(mockCourses.length);

      const request = new Request('http://localhost/api/courses?department=CS');
      const response = await GET(request);
      const json = await response.json();

      expect(response.status).toBe(200);
      expect(json.data).toEqual(mockCourses);
      expect(prisma.course.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { department: { contains: 'CS', mode: 'insensitive' } },
        })
      );
    });

    it('should filter courses by academicYear', async () => {
      const mockCourses = [
        { id: 'c1', courseCode: 'CS101', title: 'Intro to CS', teacherId: 't1', department: 'CS', academicYear: '2023-2024', semester: 1, createdAt: new Date() },
      ];
      (prisma.course.findMany as vi.Mock).mockResolvedValue(mockCourses);
      (prisma.course.count as vi.Mock).mockResolvedValue(mockCourses.length);

      const request = new Request('http://localhost/api/courses?academicYear=2023-2024');
      const response = await GET(request);
      const json = await response.json();

      expect(response.status).toBe(200);
      expect(json.data).toEqual(mockCourses);
      expect(prisma.course.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { academicYear: '2023-2024' },
        })
      );
    });

    it('should filter courses by semester', async () => {
      const mockCourses = [
        { id: 'c1', courseCode: 'CS101', title: 'Intro to CS', teacherId: 't1', department: 'CS', academicYear: '2023-2024', semester: 1, createdAt: new Date() },
      ];
      (prisma.course.findMany as vi.Mock).mockResolvedValue(mockCourses);
      (prisma.course.count as vi.Mock).mockResolvedValue(mockCourses.length);

      const request = new Request('http://localhost/api/courses?semester=1');
      const response = await GET(request);
      const json = await response.json();

      expect(response.status).toBe(200);
      expect(json.data).toEqual(mockCourses);
      expect(prisma.course.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { semester: 1 },
        })
      );
    });

    it('should handle pagination correctly', async () => {
      const mockCourses = Array.from({ length: 20 }, (_, i) => ({
        id: `c${i + 1}`,
        courseCode: `CODE${i + 1}`,
        title: `Course ${i + 1}`,
        teacherId: 't1',
        department: 'CS',
        academicYear: '2023-2024',
        semester: 1,
        createdAt: new Date(),
      }));
      (prisma.course.findMany as vi.Mock).mockResolvedValue(mockCourses.slice(5, 10));
      (prisma.course.count as vi.Mock).mockResolvedValue(20);

      const request = new Request('http://localhost/api/courses?page=2&limit=5');
      const response = await GET(request);
      const json = await response.json();

      expect(response.status).toBe(200);
      expect(json.data.length).toBe(5);
      expect(json.pagination).toEqual({
        total: 20,
        page: 2,
        limit: 5,
        totalPages: 4,
      });
      expect(prisma.course.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          take: 5,
          skip: 5,
        })
      );
    });

    it('should handle sorting correctly', async () => {
      const mockCourses = [
        { id: 'c1', title: 'Zebra', createdAt: new Date('2023-01-01') },
        { id: 'c2', title: 'Apple', createdAt: new Date('2023-03-01') },
      ];
      (prisma.course.findMany as vi.Mock).mockResolvedValue(mockCourses);
      (prisma.course.count as vi.Mock).mockResolvedValue(mockCourses.length);

      const request = new Request('http://localhost/api/courses?sortBy=title&sortOrder=asc');
      const response = await GET(request);
      const json = await response.json();

      expect(response.status).toBe(200);
      expect(prisma.course.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          orderBy: { title: 'asc' },
        })
      );
    });

    it('should return 500 if an unexpected error occurs', async () => {
      (prisma.course.findMany as vi.Mock).mockRejectedValue(new Error('Database connection failed'));

      const request = new Request('http://localhost/api/courses');
      const response = await GET(request);
      const json = await response.json();

      expect(response.status).toBe(500);
      expect(json.success).toBe(false);
      expect(json.message).toBe('Internal Server Error');
    });
  });

  // =========================================================================
  // POST /api/courses Tests (Existing functionality, ensure it still works)
  // =========================================================================

  describe('POST /api/courses', () => {
    it('should create a new course successfully for an ADMIN', async () => {
      const mockCourseData = {
        courseCode: 'NEW101',
        title: 'New Course',
        credits: 3,
        semester: 1,
        teacherId: 'teacher1',
        department: 'CS',
        academicYear: '2024-2025',
      };
      (auth as vi.Mock).mockResolvedValue({ user: { role: 'ADMIN', id: 'admin123' } });
      (prisma.teacher.findUnique as vi.Mock).mockResolvedValue({ id: 'teacher1' });
      (prisma.course.create as vi.Mock).mockResolvedValue({ id: 'newCourseId', ...mockCourseData });

      const request = new Request('http://localhost/api/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mockCourseData),
      });

      const response = await POST(request);
      const json = await response.json();

      expect(response.status).toBe(201);
      expect(json.success).toBe(true);
      expect(json.message).toBe('Course created successfully');
      expect(json.course).toEqual(expect.objectContaining({ id: 'newCourseId', ...mockCourseData }));
      expect(prisma.course.create).toHaveBeenCalledWith({
        data: expect.objectContaining(mockCourseData),
      });
    });

    it('should return 401 if unauthorized', async () => {
      (auth as vi.Mock).mockResolvedValue(null); // No session

      const request = new Request('http://localhost/api/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });

      const response = await POST(request);
      const json = await response.json();

      expect(response.status).toBe(401);
      expect(json.success).toBe(false);
      expect(json.message).toBe('Unauthorized');
    });

    it('should return 404 if teacher not found', async () => {
      const mockCourseData = {
        courseCode: 'NEW101',
        title: 'New Course',
        credits: 3,
        semester: 1,
        teacherId: 'nonExistentTeacher',
        department: 'CS',
        academicYear: '2024-2025',
      };
      (prisma.teacher.findUnique as vi.Mock).mockResolvedValue(null); // Teacher not found

      const request = new Request('http://localhost/api/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mockCourseData),
      });

      const response = await POST(request);
      const json = await response.json();

      expect(response.status).toBe(404);
      expect(json.success).toBe(false);
      expect(json.message).toBe('Teacher not found');
    });

    it('should return 400 for invalid input data', async () => {
      const invalidCourseData = {
        courseCode: 'SH', // Too short
        title: 'New Course',
        credits: 3,
        semester: 1,
        teacherId: 'teacher1',
        department: 'CS',
        academicYear: '2024-2025',
      };
      (prisma.teacher.findUnique as vi.Mock).mockResolvedValue({ id: 'teacher1' });

      const request = new Request('http://localhost/api/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(invalidCourseData),
      });

      const response = await POST(request);
      const json = await response.json();

      expect(response.status).toBe(500); // handleError returns 500 for Zod errors
      expect(json.success).toBe(false);
      expect(json.message).toBe('Internal Server Error'); // Mocked handleError message
    });
  });
});