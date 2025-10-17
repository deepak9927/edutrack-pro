# API Documentation

This document outlines the API endpoints available in the system, following RESTful principles.

## Base URL

`/api`

## Authentication

All protected endpoints require authentication. This typically involves sending a valid session token or JWT in the `Authorization` header (e.g., `Bearer YOUR_TOKEN`).

## Error Handling

API responses follow a consistent error structure:

```json
{
  "message": "A descriptive error message",
  "success": false,
  "errors": [
    // Optional: detailed validation errors from Zod
    {
      "code": "invalid_type",
      "expected": "string",
      "received": "undefined",
      "path": ["courseCode"],
      "message": "Required"
    }
  ]
}
```

Common HTTP status codes for errors:
*   `400 Bad Request`: Invalid request payload or parameters (e.g., Zod validation errors).
*   `401 Unauthorized`: Authentication failed or missing.
*   `403 Forbidden`: Authenticated, but the user does not have the necessary permissions.
*   `404 Not Found`: The requested resource does not exist.
*   `409 Conflict`: Resource already exists (e.g., trying to create a course with a duplicate code).
*   `500 Internal Server Error`: An unexpected server-side error occurred.

---

## Course Management

### Create a New Course

**Endpoint:** `POST /api/courses`

**Description:** Creates a new academic course. Requires `ADMIN` or `TEACHER` role.

**Request Body (JSON):**

```json
{
  "courseCode": "CS101",
  "title": "Introduction to Computer Science",
  "description": "A foundational course in computer science.",
  "credits": 3,
  "semester": 1,
  "teacherId": "clx0x0x0x0x0x0x0x0x0x0x0", // Example CUID
  "department": "Computer Science",
  "academicYear": "2025-2026"
}
```

**Request Body Schema (Zod):**

```typescript
const createCourseSchema = z.object({
  courseCode: z.string().min(3, "Course code must be at least 3 characters long"),
  title: z.string().min(3, "Course title must be at least 3 characters long"),
  description: z.string().optional(),
  credits: z.number().int().min(1, "Credits must be at least 1"),
  semester: z.number().int().min(1, "Semester must be at least 1"),
  teacherId: z.string().min(1, "Teacher ID is required"),
  department: z.string().min(1, "Department is required"),
  academicYear: z.string().min(4, "Academic year must be at least 4 characters long"),
});
```

**Success Response (`201 Created`):**

```json
{
  "message": "Course created successfully",
  "success": true,
  "course": {
    "id": "clx0x0x0x0x0x0x0x0x0x0x1",
    "courseCode": "CS101",
    "title": "Introduction to Computer Science",
    "description": "A foundational course in computer science.",
    "credits": 3,
    "semester": 1,
    "teacherId": "clx0x0x0x0x0x0x0x0x0x0x0",
    "department": "Computer Science",
    "isActive": true,
    "academicYear": "2025-2026",
    "deletedAt": null,
    "createdAt": "2025-10-13T15:00:00.000Z",
    "updatedAt": "2025-10-13T15:00:00.000Z"
  }
}
```

**Error Responses:**
*   `400 Bad Request`: Invalid request body (e.g., missing `title`, `credits` less than 1).
*   `401 Unauthorized`: User not authenticated.
*   `403 Forbidden`: User does not have `ADMIN` or `TEACHER` role.
*   `404 Not Found`: `teacherId` does not correspond to an existing teacher.
*   `409 Conflict`: A course with the provided `courseCode` already exists.
*   `500 Internal Server Error`: Server error during course creation.

---

<!-- Add more API endpoints here as they are developed -->
