# Database Schema Documentation

This document provides an overview of the database schema, managed using Prisma ORM. The schema is defined in `prisma/schema.prisma`.

## Overview

The database schema is designed to support a comprehensive academic management system, including user authentication, role-specific profiles (Student, Teacher, Admin), academic records (Courses, Assignments, Grades, Enrollments), wellness tracking, community features, AI interactions, and notifications.

## Key Models and Relationships

### 1. User Management & Authentication

*   **`User`**: Central user model.
    *   `id`: Unique identifier (CUID).
    *   `email`: User's email (unique).
    *   `username`: Optional unique username.
    *   `role`: Enum (`STUDENT`, `TEACHER`, `ADMIN`, etc.).
    *   `password`: Hashed password.
    *   `isActive`: Account status.
    *   `isTwoFactorEnabled`: 2FA status.
    *   **Relationships**:
        *   One-to-many with `Account` (for OAuth).
        *   One-to-many with `Session`.
        *   One-to-one with `Student`, `Teacher`, `Admin` profiles.
*   **`Account`**: Stores OAuth provider account information.
*   **`Session`**: Stores user session tokens.
*   **`VerificationToken`**: Used for email verification.
*   **`TwoFactorToken`**: Used for 2FA authentication.

### 2. Role-Specific Profiles

*   **`Student`**: Extends `User` with student-specific academic and personal details.
    *   `userId`: Foreign key to `User`.
    *   `studentId`: Unique student identifier.
    *   `semester`, `cgpa`, `batch`, `admissionYear`, `expectedGradYear`.
    *   **Relationships**: Many-to-many with `Course` via `Enrollment`, `Assignment` via `Submission`, `Grade`, `AttendanceRecord`, `WellnessData`, `Achievement`, `Certification`, `SkillAssessment`, `Mentorship`, `StudyGroupMember`, `ForumPost`, `ForumComment`, `MeditationSession`, `HabitTracker`, `LearningAnalytics`, `UserAssignment`.
*   **`Teacher`**: Extends `User` with teacher-specific professional and academic details.
    *   `userId`: Foreign key to `User`.
    *   `employeeId`: Unique employee identifier.
    *   `department`, `designation`, `qualification`, `experience`, `expertise`.
    *   **Relationships**: One-to-many with `Course`, `Assignment`, `Grade`, `Mentorship`.
*   **`Admin`**: Extends `User` with administrative details.
    *   `userId`: Foreign key to `User`.
    *   `adminLevel`: Enum (`INSTITUTION`, `DEPARTMENT`, etc.).
    *   `permissions`: JSON field for flexible permissions.

### 3. Academic Management

*   **`Course`**: Represents an academic course.
    *   `courseCode`: Unique course identifier.
    *   `title`, `description`, `credits`, `semester`, `department`, `academicYear`.
    *   `teacherId`: Foreign key to `Teacher`.
    *   `deletedAt`: For soft deletes.
    *   **Relationships**: One-to-many with `Enrollment`, `Assignment`, `Resource`, `Announcement`, `AttendanceRecord`, `StudyGroup`.
*   **`Enrollment`**: Links `Student` to `Course`.
    *   `studentId`, `courseId`: Composite unique key.
    *   `status`: Enum (`ENROLLED`, `COMPLETED`, etc.).
    *   `midtermGrade`, `finalGrade`, `overallGrade`.
*   **`Assignment`**: Details about an assignment for a course.
    *   `courseId`, `teacherId`.
    *   `dueDate`, `maxMarks`, `type`.
    *   **Relationships**: One-to-many with `Submission`, `Grade`, `UserAssignment`.
*   **`Submission`**: A student's submission for an assignment.
    *   `assignmentId`, `studentId`: Composite unique key.
    *   `content`, `attachments`, `status`.
    *   `plagiarismScore`, `aiDetectionScore`.
*   **`Grade`**: Records the grade a student received for an assignment.
    *   `assignmentId`, `studentId`: Composite unique key.
    *   `teacherId`.
    *   `marksObtained`, `percentage`, `letterGrade`, `feedback`.
*   **`AttendanceRecord`**: Tracks student attendance for a course on a specific date.
    *   `studentId`, `courseId`, `date`: Composite unique key.
    *   `status`: Enum (`PRESENT`, `ABSENT`, etc.).
*   **`UserAssignment`**: Tracks a student's progress on an assignment.

### 4. Resources & Content Management

*   **`Resource`**: Educational materials related to a course.
    *   `courseId`.
    *   `fileUrl`, `fileName`, `mimeType`, `type`.
*   **`Announcement`**: Course-specific or institution-wide announcements.
    *   `courseId`: Optional.
    *   `priority`: Enum (`LOW`, `MEDIUM`, `HIGH`, `URGENT`).

### 5. Skills & Certification Management

*   **`Skill`**: Defines a skill.
    *   `name`: Unique skill name.
    *   `category`, `difficulty`, `marketDemand`.
*   **`SkillAssessment`**: Records a student's assessment for a skill.
    *   `studentId`, `skillId`: Composite unique key.
    *   `currentLevel`, `scorePercentage`.
*   **`Certification`**: Records a student's certifications.
    *   `studentId`, `skillId`: Optional.
    *   `title`, `issuer`, `issuedDate`, `expiryDate`.
*   **`Achievement`**: Tracks student achievements.
    *   `studentId`.
    *   `title`, `description`, `type`, `rarity`.

### 6. Wellness & Mental Health

*   **`WellnessData`**: Daily wellness metrics for students.
    *   `studentId`, `date`: Composite unique key.
    *   `moodScore`, `stressLevel`, `sleepHours`, `screenTimeMinutes`, `studyMinutes`.
*   **`MeditationSession`**: Records student meditation sessions.
    *   `studentId`.
    *   `duration`, `category`.
*   **`HabitTracker`**: Helps students track habits.
    *   `studentId`.
    *   `habitName`, `targetFrequency`.
*   **`HabitCompletion`**: Records daily completion of a habit.

### 7. Community & Social Features

*   **`StudyGroup`**: Facilitates student collaboration.
    *   `courseId`: Optional.
    *   `name`, `description`, `isPublic`.
*   **`StudyGroupMember`**: Links `Student` to `StudyGroup`.
*   **`StudySession`**: Scheduled sessions for study groups.
*   **`Mentorship`**: Connects `Teacher` (mentor) with `Student` (mentee).
    *   `mentorId`, `menteeId`: Composite unique key.
    *   `status`, `focus`, `goals`.
*   **`MentorshipSession`**: Records individual mentorship sessions.
*   **`Forum`**: Top-level forum categories.
*   **`ForumPost`**: Posts within a forum.
    *   `forumId`, `authorId`.
    *   `title`, `content`.
*   **`ForumComment`**: Comments on forum posts.
    *   `postId`, `authorId`, `parentId` (for threading).

### 8. AI & Analytics

*   **`AIInteraction`**: Logs interactions with AI features.
    *   `userId`.
    *   `query`, `response`, `model`, `tokensUsed`.
*   **`LearningAnalytics`**: Aggregated learning data for students.
    *   `studentId`, `date`: Composite unique key.
    *   `studyMinutes`, `completedTasks`, `gpaForecast`, `riskScore`.

### 9. Notifications & System

*   **`Notification`**: Stores notifications for users.
    *   `userId`.
    *   `title`, `message`, `type`, `isRead`.
*   **`SystemConfiguration`**: Stores key-value pairs for system settings.

## Enums

The schema utilizes various enums for consistent data representation, including:
*   `UserRole`
*   `Gender`
*   `StudentStatus`
*   `AdminLevel`
*   `EnrollmentStatus`
*   `AssignmentType`
*   `SubmissionStatus`
*   `AttendanceStatus`
*   `ResourceType`
*   `Priority`
*   `SkillCategory`
*   `DifficultyLevel`
*   `SkillLevel`
*   `CertificationCategory`
*   `AchievementType`
*   `RarityLevel`
*   `MeditationType`
*   `HabitCategory`
*   `GroupRole`
*   `SessionStatus`
*   `MentorshipStatus`
*   `AIInteractionType`
*   `NotificationType`

This detailed schema provides a robust foundation for the application.
