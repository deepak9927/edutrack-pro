generativelanguage.googleapis.com/generate_content_free_tier_input_token_count# API Documentation

This document outlines the backend API routes, their functionalities, and expected request/response formats.

---

## 1. Authentication Routes

### `POST /api/auth/register`

*   **Purpose:** Registers a new user.
*   **Method:** `POST`
*   **Request Body:**
    ```json
    {
        "name": "string",
        "email": "string (email format)",
        "password": "string (min 6 characters)"
    }
    ```
*   **Response:**
    *   **Success (201 Created):**
        ```json
        {
            "message": "User registered successfully"
        }
        ```
    *   **Error (400 Bad Request):** If validation fails or user already exists.
        ```json
        {
            "error": "Error message"
        }
        ```

### `GET /api/auth/[...nextauth]`

*   **Purpose:** Handles authentication callbacks and sessions using NextAuth.js. This route is managed by NextAuth.js and typically doesn't require direct interaction for standard API calls.
*   **Methods:** `GET`, `POST` (handled internally by NextAuth.js)
*   **Details:** Refer to NextAuth.js documentation for specific endpoints like `/api/auth/signin`, `/api/auth/callback`, `/api/auth/signout`, `/api/auth/session`.

---

## 2. Courses Routes

### `GET /api/courses`

*   **Purpose:** Retrieves a list of all available courses.
*   **Method:** `GET`
*   **Request Body:** None
*   **Response:**
    *   **Success (200 OK):** An array of course objects.
        ```json
        [
            {
                "id": "string",
                "title": "string",
                "description": "string",
                "imageUrl": "string",
                "price": "number",
                "isPublished": "boolean",
                "categoryId": "string",
                "createdAt": "Date",
                "updatedAt": "Date"
            }
        ]
        ```
    *   **Error (500 Internal Server Error):**
        ```json
        {
            "error": "Error message"
        }
        ```

### `POST /api/courses`

*   **Purpose:** Creates a new course.
*   **Method:** `POST`
*   **Request Body:**
    ```json
    {
        "title": "string (required)",
        "description": "string (optional)",
        "imageUrl": "string (optional)",
        "price": "number (optional)",
        "categoryId": "string (optional)"
    }
    ```
*   **Response:**
    *   **Success (201 Created):** The newly created course object.
        ```json
        {
            "id": "string",
            "title": "string",
            "description": "string",
            "imageUrl": "string",
            "price": "number",
            "isPublished": "boolean",
            "categoryId": "string",
            "createdAt": "Date",
            "updatedAt": "Date"
        }
        ```
    *   **Error (400 Bad Request / 500 Internal Server Error):**
        ```json
        {
            "error": "Error message"
        }
        ```

### `GET /api/courses/[courseId]/modules`

*   **Purpose:** Retrieves modules for a specific course.
*   **Method:** `GET`
*   **URL Parameters:** `courseId` (string) - The ID of the course.
*   **Request Body:** None
*   **Response:**
    *   **Success (200 OK):** An array of module objects for the specified course.
        ```json
        [
            {
                "id": "string",
                "title": "string",
                "description": "string",
                "courseId": "string",
                "position": "number",
                "isPublished": "boolean",
                "createdAt": "Date",
                "updatedAt": "Date"
            }
        ]
        ```
    *   **Error (404 Not Found / 500 Internal Server Error):**
        ```json
        {
            "error": "Error message"
        }
        ```

### `GET /api/courses/[courseId]`

*   **Purpose:** Retrieves a specific course by ID.
*   **Method:** `GET`
*   **URL Parameters:** `courseId` (string) - The ID of the course.
*   **Request Body:** None
*   **Response:**
    *   **Success (200 OK):** The course object.
        ```json
        {
            "id": "string",
            "title": "string",
            "description": "string",
            "imageUrl": "string",
            "price": "number",
            "isPublished": "boolean",
            "categoryId": "string",
            "createdAt": "Date",
            "updatedAt": "Date"
        }
        ```
    *   **Error (404 Not Found / 500 Internal Server Error):**
        ```json
        {
            "error": "Error message"
        }
        ```

---

## 3. Wellness Routes

### `GET /api/wellness`

*   **Purpose:** Retrieves general wellness data. (Further details would require inspecting the route handler).
*   **Method:** `GET`
*   **Request Body:** None
*   **Response:** (Example - actual response depends on implementation)
    ```json
    {
        "status": "success",
        "data": {}
    }
    ```

### `POST /api/wellness/mood`

*   **Purpose:** Records a user's mood.
*   **Method:** `POST`
*   **Request Body:**
    ```json
    {
        "mood": "string (e.g., 'happy', 'sad', 'neutral')",
        "notes": "string (optional)"
    }
    ```
*   **Response:**
    *   **Success (201 Created):**
        ```json
        {
            "message": "Mood recorded successfully"
        }
        ```
    *   **Error (400 Bad Request / 500 Internal Server Error):**
        ```json
        {
            "error": "Error message"
        }
        ```

### `GET /api/wellness/screen-time`

*   **Purpose:** Retrieves screen time data for the user.
*   **Method:** `GET`
*   **Request Body:** None
*   **Response:** (Example - actual response depends on implementation)
    ```json
    {
        "screenTimeRecords": [
            {
                "id": "string",
                "userId": "string",
                "durationMinutes": "number",
                "date": "Date",
                "createdAt": "Date"
            }
        ]
    }
    ```

### `POST /api/wellness/screen-time`

*   **Purpose:** Records screen time data.
*   **Method:** `POST`
*   **Request Body:**
    ```json
    {
        "durationMinutes": "number (required)"
    }
    ```
*   **Response:**
    *   **Success (201 Created):**
        ```json
        {
            "message": "Screen time recorded successfully"
        }
        ```
    *   **Error (400 Bad Request / 500 Internal Server Error):**
        ```json
        {
            "error": "Error message"
        }
        ```

### `GET /api/wellness/screentime/retention`

*   **Purpose:** Retrieves screen time retention data. (Further details would require inspecting the route handler).
*   **Method:** `GET`
*   **Request Body:** None
*   **Response:** (Example - actual response depends on implementation)
    ```json
    {
        "retentionData": []
    }
    ```

---

## 4. AI Routes

### `POST /api/ai/generate-study-plan`

*   **Purpose:** Generates a study plan using AI.
*   **Method:** `POST`
*   **Request Body:** (Example - actual body depends on implementation)
    ```json
    {
        "topic": "string",
        "duration": "number (in days/hours)",
        "difficulty": "string (e.g., 'beginner', 'intermediate')"
    }
    ```
*   **Response:**
    *   **Success (200 OK):** The generated study plan.
        ```json
        {
            "studyPlan": "string (markdown or structured data)"
        }
        ```
    *   **Error (500 Internal Server Error):**
        ```json
        {
            "error": "Error message"
        }
        ```

### `POST /api/ai-assistant/ask`

*   **Purpose:** Interacts with an AI assistant.
*   **Method:** `POST`
*   **Request Body:**
    ```json
    {
        "question": "string (required)"
    }
    ```
*   **Response:**
    *   **Success (200 OK):** The AI assistant's response.
        ```json
        {
            "answer": "string"
        }
        ```
    *   **Error (500 Internal Server Error):**
        ```json
        {
            "error": "Error message"
        }
        ```

---

## 5. Assignments Routes

### `GET /api/assignments`

*   **Purpose:** Retrieves a list of assignments.
*   **Method:** `GET`
*   **Request Body:** None
*   **Response:** (Example - actual response depends on implementation)
    ```json
    [
        {
            "id": "string",
            "title": "string",
            "description": "string",
            "dueDate": "Date",
            "courseId": "string",
            "isCompleted": "boolean"
        }
    ]
    ```

### `POST /api/assignments`

*   **Purpose:** Creates a new assignment.
*   **Method:** `POST`
*   **Request Body:**
    ```json
    {
        "title": "string (required)",
        "description": "string (optional)",
        "dueDate": "Date (optional)",
        "courseId": "string (required)"
    }
    ```
*   **Response:**
    *   **Success (201 Created):** The newly created assignment object.
        ```json
        {
            "id": "string",
            "title": "string",
            "description": "string",
            "dueDate": "Date",
            "courseId": "string",
            "isCompleted": "boolean"
        }
        ```
    *   **Error (400 Bad Request / 500 Internal Server Error):**
        ```json
        {
            "error": "Error message"
        }
        ```

---

## 6. Marks Routes

### `POST /api/marks/update`

*   **Purpose:** Updates marks for a student/assignment.
*   **Method:** `POST`
*   **Request Body:** (Example - actual body depends on implementation)
    ```json
    {
        "assignmentId": "string (required)",
        "studentId": "string (required)",
        "marks": "number (required)"
    }
    ```
*   **Response:**
    *   **Success (200 OK):**
        ```json
        {
            "message": "Marks updated successfully"
        }
        ```
    *   **Error (400 Bad Request / 500 Internal Server Error):**
        ```json
        {
            "error": "Error message"
        }
        ```

---

## 7. Community Routes

### `GET /api/community/find-group`

*   **Purpose:** Finds study groups based on criteria.
*   **Method:** `GET`
*   **Request Body:** None (query parameters likely used for filtering)
*   **Response:** (Example - actual response depends on implementation)
    ```json
    [
        {
            "id": "string",
            "name": "string",
            "description": "string",
            "members": ["string"],
            "topic": "string"
        }
    ]
    ```

---

## 8. Mentorship Routes

### `GET /api/mentorship/find`

*   **Purpose:** Finds mentors based on criteria.
*   **Method:** `GET`
*   **Request Body:** None (query parameters likely used for filtering)
*   **Response:** (Example - actual response depends on implementation)
    ```json
    [
        {
            "id": "string",
            "name": "string",
            "expertise": "string",
            "availability": "string"
        }
    ]
    ```

---

## 9. Support Routes

### `POST /api/support/chat`

*   **Purpose:** Handles support chat messages.
*   **Method:** `POST`
*   **Request Body:**
    ```json
    {
        "message": "string (required)",
        "userId": "string (optional, if authenticated)"
    }
    ```
*   **Response:**
    *   **Success (200 OK):**
        ```json
        {
            "reply": "string"
        }
        ```
    *   **Error (500 Internal Server Error):**
        ```json
        {
            "error": "Error message"
        }
        ```

---

## 10. Teachers Routes

### `GET /api/teachers`

*   **Purpose:** Retrieves a list of teachers.
*   **Method:** `GET`
*   **Request Body:** None
*   **Response:** (Example - actual response depends on implementation)
    ```json
    [
        {
            "id": "string",
            "name": "string",
            "email": "string",
            "bio": "string"
        }
    ]
    ```

---

## 11. Modules Routes

### `GET /api/modules/[moduleId]/lessons`

*   **Purpose:** Retrieves lessons for a specific module.
*   **Method:** `GET`
*   **URL Parameters:** `moduleId` (string) - The ID of the module.
*   **Request Body:** None
*   **Response:** (Example - actual response depends on implementation)
    ```json
    [
        {
            "id": "string",
            "title": "string",
            "content": "string",
            "moduleId": "string",
            "position": "number",
            "isPublished": "boolean"
        }
    ]