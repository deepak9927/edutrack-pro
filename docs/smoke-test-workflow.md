# Frontend-Backend Smoke Test Workflow

This document outlines a basic smoke test workflow to manually verify the core frontend-backend interactions of the application. This is a high-level guide for quick verification and not a comprehensive testing strategy.

**Prerequisites:**

1.  Ensure your development environment is set up (Node.js, pnpm, Prisma).
2.  Start the development server: `pnpm run dev`
3.  Ensure your database is migrated and seeded with some initial data if necessary (e.g., `prisma migrate dev`, `tsx prisma/seed.ts`).

---

## 1. User Authentication

### Test Case: User Registration

*   **Frontend Path:** [`/auth/register`](http://localhost:3000/auth/register)
*   **Backend Endpoint:** `POST /api/auth/register`
*   **Steps:**
    1.  Navigate to the registration page.
    2.  Fill in the registration form with a new email, name, and password.
    3.  Click the "Register" button.
    4.  **Expected Result:**
        *   The user is successfully registered and redirected to a dashboard or login page.
        *   No error messages are displayed on the frontend.
        *   (Optional) Verify the new user exists in the database using `prisma studio`.

### Test Case: User Login

*   **Frontend Path:** [`/auth/login`](http://localhost:3000/auth/login)
*   **Backend Endpoint:** `GET/POST /api/auth/[...nextauth]`
*   **Steps:**
    1.  Navigate to the login page.
    2.  Enter the credentials of a registered user.
    3.  Click the "Login" button.
    4.  **Expected Result:**
        *   The user is successfully logged in and redirected to the dashboard.
        *   No error messages are displayed on the frontend.
        *   The user's session information is visible (e.g., in a profile section if available).

---

## 2. Course Management

### Test Case: View Courses

*   **Frontend Path:** [`/dashboard`](http://localhost:3000/dashboard) or a dedicated courses page.
*   **Backend Endpoint:** `GET /api/courses`
*   **Steps:**
    1.  Log in as a user.
    2.  Navigate to the dashboard or the courses listing page.
    3.  **Expected Result:**
        *   A list of courses is displayed.
        *   The course titles, descriptions, and other relevant information are correctly rendered.

### Test Case: Create a Course (if applicable)

*   **Frontend Path:** (Likely an admin or instructor dashboard, e.g., `/admin/courses/create`)
*   **Backend Endpoint:** `POST /api/courses`
*   **Steps:**
    1.  Log in as an administrator or instructor.
    2.  Navigate to the "Create Course" form.
    3.  Fill in the course details (title, description, etc.).
    4.  Click the "Create" or "Submit" button.
    5.  **Expected Result:**
        *   The new course is successfully created and appears in the course list.
        *   No error messages are displayed.

---

## 3. AI Tutor Functionality

### Test Case: Generate Study Plan

*   **Frontend Path:** [`/ai-tutor`](http://localhost:3000/ai-tutor) or [`/study-planner`](http://localhost:3000/study-planner)
*   **Backend Endpoint:** `POST /api/ai/generate-study-plan`
*   **Steps:**
    1.  Log in as a user.
    2.  Navigate to the AI Tutor or Study Planner page.
    3.  Input details for a study plan (e.g., topic, duration, difficulty).
    4.  Click the "Generate Plan" button.
    5.  **Expected Result:**
        *   A study plan is generated and displayed on the page.
        *   The content of the plan is relevant to the input provided.

---

## 4. Wellness Features

### Test Case: Record Mood

*   **Frontend Path:** [`/wellness`](http://localhost:3000/wellness) or a specific mood tracking component.
*   **Backend Endpoint:** `POST /api/wellness/mood`
*   **Steps:**
    1.  Log in as a user.
    2.  Navigate to the wellness section.
    3.  Select a mood and optionally add notes.
    4.  Submit the mood entry.
    5.  **Expected Result:**
        *   A confirmation message is displayed.
        *   The mood entry is successfully recorded (e.g., visible in a mood history chart if available).

### Test Case: Record Screen Time

*   **Frontend Path:** [`/wellness/screen-time`](http://localhost:3000/wellness/screen-time)
*   **Backend Endpoint:** `POST /api/wellness/screen-time`
*   **Steps:**
    1.  Log in as a user.
    2.  Navigate to the screen time tracking page.
    3.  Input a duration for screen time.
    4.  Submit the entry.
    5.  **Expected Result:**
        *   A confirmation message is displayed.
        *   The screen time is recorded and reflected in analytics (if displayed).

---

## 5. Assignments

### Test Case: View Assignments

*   **Frontend Path:** [`/assignments`](http://localhost:3000/assignments) or dashboard.
*   **Backend Endpoint:** `GET /api/assignments`
*   **Steps:**
    1.  Log in as a user.
    2.  Navigate to the assignments page.
    3.  **Expected Result:**
        *   A list of assignments is displayed.
        *   Assignment details (title, due date, status) are correct.

---

This workflow provides a starting point for verifying that the main parts of your application are communicating correctly between the frontend and backend.
