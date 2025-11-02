import { jest, beforeEach, describe, test, expect } from '@jest/globals';
import { POST, GET } from '@/app/api/wellness/mood/route';
import { NextRequest } from 'next/server';
import { db } from '@/lib/db';

// Mock the auth function
jest.mock('@/lib/auth/auth', () => ({
  auth: jest.fn(),
}));

// Mock the database
jest.mock('@/lib/db', () => ({
  db: {
    wellnessData: {
      create: jest.fn(),
      findFirst: jest.fn(),
    },
    student: {
      findUnique: jest.fn(),
    },
  },
}));

const mockAuth = jest.fn();
const mockWellnessDataCreate = jest.fn();
const mockWellnessDataFindFirst = jest.fn();
const mockStudentFindUnique = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
  (db.wellnessData.create as any).mockImplementation(mockWellnessDataCreate);
  (db.wellnessData.findFirst as any).mockImplementation(mockWellnessDataFindFirst);
  (db.student.findUnique as any).mockImplementation(mockStudentFindUnique);
  (require('@/lib/auth/auth').auth as any).mockImplementation(mockAuth);
});

// Helper to create a mock request
const createMockRequest = (method: string, body?: any) => {
  return new NextRequest(`http://localhost/api/wellness/mood`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
};

describe('POST /api/wellness/mood', () => {
  test('should create a mood entry successfully for an authenticated user', async () => {
    mockAuth.mockResolvedValueOnce({ user: { id: 'user123' } });
    mockWellnessDataCreate.mockResolvedValueOnce({
      id: 'mood1',
      studentId: 'user123',
      date: new Date().toISOString().split('T')[0],
      moodScore: 5,
      stressLevel: 3,
      anxietyLevel: 2,
      energyLevel: 4,
      dailyReflection: 'Feeling good today.',
    });

    const request = createMockRequest('POST', {
      moodScore: 5,
      stressLevel: 3,
      anxietyLevel: 2,
      energyLevel: 4,
      dailyReflection: 'Feeling good today.',
    });

    const response = await POST(request);
    const result = await response.json();

    expect(response.status).toBe(201);
    expect(result).toHaveProperty('id', 'mood1');
    expect(mockWellnessDataCreate).toHaveBeenCalledWith({
      data: {
        studentId: 'user123',
        date: new Date().toISOString().split('T')[0],
        moodScore: 5,
        stressLevel: 3,
        anxietyLevel: 2,
        energyLevel: 4,
        dailyReflection: 'Feeling good today.',
      },
    });
  });

  test('should return 401 if user is not authenticated', async () => {
    mockAuth.mockResolvedValueOnce(null);

    const request = createMockRequest('POST', {
      moodScore: 5,
      stressLevel: 3,
      anxietyLevel: 2,
      energyLevel: 4,
      dailyReflection: 'Feeling good today.',
    });

    const response = await POST(request);
    expect(response.status).toBe(401);
    expect(await response.text()).toBe('Unauthorized');
  });

  test('should return 400 for invalid request data', async () => {
    mockAuth.mockResolvedValueOnce({ user: { id: 'user123' } });

    const request = createMockRequest('POST', {
      moodScore: 'invalid', // Invalid type
      stressLevel: 3,
      anxietyLevel: 2,
      energyLevel: 4,
      dailyReflection: 'Feeling good today.',
    });

    const response = await POST(request);
    expect(response.status).toBe(400);
    const result = await response.json();
    expect(result.error).toBe('Invalid request data');
    expect(Array.isArray(result.details)).toBe(true);
    expect(result.details.length).toBeGreaterThan(0);
  });
});

describe('GET /api/wellness/mood', () => {
  test('should return today\'s mood entry for an authenticated user', async () => {
    mockAuth.mockResolvedValueOnce({ user: { id: 'user123' } });
    mockStudentFindUnique.mockResolvedValueOnce({ id: 'student123', userId: 'user123' });
    mockWellnessDataFindFirst.mockResolvedValueOnce({
      id: 'mood1',
      studentId: 'student123',
      date: new Date().toISOString().split('T')[0],
      moodScore: 5,
    });

    const request = createMockRequest('GET');
    const response = await GET(request);
    const result = await response.json();

    expect(response.status).toBe(200);
    expect(result).toHaveProperty('moodScore', 5);
    expect(mockStudentFindUnique).toHaveBeenCalledWith({ where: { userId: 'user123' } });
    expect(mockWellnessDataFindFirst).toHaveBeenCalled();
  });

  test('should return 401 if user is not authenticated', async () => {
    mockAuth.mockResolvedValueOnce(null);

    const request = createMockRequest('GET');
    const response = await GET(request);

    expect(response.status).toBe(401);
    expect(await response.text()).toBe('Unauthorized');
  });

  test('should return 404 if student profile not found', async () => {
    mockAuth.mockResolvedValueOnce({ user: { id: 'user123' } });
    mockStudentFindUnique.mockResolvedValueOnce(null);

    const request = createMockRequest('GET');
    const response = await GET(request);

    expect(response.status).toBe(404);
    expect(await response.text()).toBe('Student profile not found');
  });

  test('should return null if no mood entry for today', async () => {
    mockAuth.mockResolvedValueOnce({ user: { id: 'user123' } });
    mockStudentFindUnique.mockResolvedValueOnce({ id: 'student123', userId: 'user123' });
    mockWellnessDataFindFirst.mockResolvedValueOnce(null);

    const request = createMockRequest('GET');
    const response = await GET(request);
    const result = await response.json();

    expect(response.status).toBe(200);
    expect(result).toBeNull();
  });

  test('should return 500 for internal errors', async () => {
    mockAuth.mockResolvedValueOnce({ user: { id: 'user123' } });
    mockStudentFindUnique.mockRejectedValueOnce(new Error('Database error'));

    const request = createMockRequest('GET');
    const response = await GET(request);

    expect(response.status).toBe(500);
    expect(await response.text()).toBe('Internal Error');
  });
});