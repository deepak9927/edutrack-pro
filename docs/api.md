# IgnouCompass API Documentation

This document provides an overview of the IgnouCompass API, including authentication, endpoints, and data models.

## Authentication

All API requests must be authenticated using a JSON Web Token (JWT). The JWT should be included in the `Authorization` header of each request as a Bearer token.

`Authorization: Bearer <YOUR_JWT>`

## API Endpoints

The API is organized into the following resource categories:

*   **Academic:** Manage courses, assignments, and academic progress.
*   **AI:** Interact with the AI-powered tutor and other intelligent features.
*   **Analytics:** Retrieve academic and wellness analytics data.
*   **Auth:** User authentication and session management.
*   **Payments:** Manage subscriptions and payments.
*   **Wellness:** Track habits, mindfulness, and other wellness data.

### Academic Endpoints

*   `GET /api/academic/courses`: Get a list of all courses.
*   `GET /api/academic/courses/:id`: Get a specific course by ID.
*   `POST /api/academic/courses`: Create a new course (admin only).
*   `PUT /api/academic/courses/:id`: Update a course (admin only).
*   `DELETE /api/academic/courses/:id`: Delete a course (admin only).
*   `GET /api/academic/assignments`: Get a list of all assignments.
*   `POST /api/academic/assignments`: Create a new assignment (admin only).

### AI Endpoints

*   `POST /api/ai/tutor`: Interact with the AI-powered tutor.
*   `POST /api/ai/summarize`: Summarize a piece of text.
*   `POST /api/ai/recommendations`: Get personalized recommendations.

### Analytics Endpoints

*   `GET /api/analytics/academic`: Get academic performance analytics.
*   `GET /api/analytics/wellness`: Get wellness and habit tracking analytics.

### Auth Endpoints

*   `POST /api/auth/login`: Log in a user.
*   `POST /api/auth/register`: Register a new user.
*   `POST /api/auth/logout`: Log out a user.
*   `GET /api/auth/session`: Get the current user's session.

### Wellness Endpoints

*   `GET /api/wellness/habits`: Get a list of all habits.
*   `POST /api/wellness/habits`: Create a new habit.
*   `PUT /api/wellness/habits/:id`: Update a habit.
*   `DELETE /api/wellness/habits/:id`: Delete a habit.

## Data Models

### User

```json
{
  "id": "string",
  "name": "string",
  "email": "string",
  "role": "string"
}
```

### Course

```json
{
  "id": "string",
  "title": "string",
  "description": "string",
  "teacherId": "string"
}
```

### Assignment

```json
{
  "id": "string",
  "title": "string",
  "description": "string",
  "courseId": "string",
  "dueDate": "date"
}
```

### Habit

```json
{
  "id": "string",
  "name": "string",
  "description": "string",
  "userId": "string"
}
