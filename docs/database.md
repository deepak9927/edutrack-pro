# Database Diagram

```mermaid
erDiagram
    User {
        String id PK
        String email UK
        String username UK
        String name
        String image
        DateTime emailVerified
        String password
        UserRole role
        Boolean isActive
        DateTime lastLogin
        Boolean isTwoFactorEnabled
        String bio
        String phone
        DateTime dateOfBirth
        Gender gender
        Json address
        Json socialLinks
        Json preferences
        String timezone
        String language
        DateTime createdAt
        DateTime updatedAt
    }

    Account {
        String id PK
        String userId FK
        String type
        String provider
        String providerAccountId
        String refresh_token
        String access_token
        Int expires_at
        String token_type
        String scope
        String id_token
        String session_state
    }

    Session {
        String id PK
        String sessionToken UK
        String userId FK
        DateTime expires
    }

    VerificationToken {
        String identifier
        String token UK
        DateTime expires
    }

    TwoFactorToken {
        String id PK
        String email
        String token UK
        DateTime expires
    }

    Student {
        String id PK
        String userId FK
        String studentId UK
        Int semester
        Float cgpa
        String batch
        String section
        Int admissionYear
        Int expectedGradYear
        StudentStatus status
        Json emergencyContact
        DateTime createdAt
        DateTime updatedAt
    }

    Teacher {
        String id PK
        String userId FK
        String employeeId UK
        String department
        String designation
        String[] qualification
        Int experience
        String[] expertise
        DateTime createdAt
        DateTime updatedAt
    }

    Admin {
        String id PK
        String userId FK
        AdminLevel adminLevel
        Json permissions
        DateTime createdAt
        DateTime updatedAt
    }

    Course {
        String id PK
        String courseCode UK
        String title
        String description
        Int credits
        Int semester
        String department
        String syllabus
        String[] prerequisites
        String[] objectives
        String teacherId FK
        Json schedule
        Boolean isActive
        String academicYear
        DateTime deletedAt
        DateTime createdAt
        DateTime updatedAt
    }

    Enrollment {
        String id PK
        String studentId FK
        String courseId FK
        DateTime enrollmentDate
        EnrollmentStatus status
        Float midtermGrade
        Float finalGrade
        Float overallGrade
    }

    Assignment {
        String id PK
        String title
        String description
        String courseId FK
        String teacherId FK
        AssignmentType type
        Float maxMarks
        String instructions
        Json attachments
        DateTime assignedDate
        DateTime dueDate
        Boolean submissionOpen
        DateTime createdAt
        DateTime updatedAt
    }

    Submission {
        String id PK
        String assignmentId FK
        String studentId FK
        String content
        Json attachments
        DateTime submittedAt
        Boolean isLate
        SubmissionStatus status
        Float plagiarismScore
        Float aiDetectionScore
        DateTime updatedAt
    }

    Grade {
        String id PK
        String assignmentId FK
        String studentId FK
        String teacherId FK
        Float marksObtained
        Float maxMarks
        Float percentage
        String letterGrade
        String feedback
        Json rubricData
        DateTime gradedAt
        Boolean isPublished
        DateTime updatedAt
    }

    AttendanceRecord {
        String id PK
        String studentId FK
        String courseId FK
        DateTime date
        AttendanceStatus status
        DateTime checkedInAt
        DateTime checkedOutAt
        String location
        String notes
    }

    Resource {
        String id PK
        String title
        String description
        String courseId FK
        ResourceType type
        String fileUrl
        String fileName
        Int fileSize
        String mimeType
        String category
        String[] tags
        Int downloadCount
        DateTime createdAt
        DateTime updatedAt
    }

    Announcement {
        String id PK
        String title
        String content
        String courseId FK
        Priority priority
        Boolean isPublished
        DateTime publishedAt
        DateTime expiresAt
        Json attachments
        String[] tags
        DateTime createdAt
        DateTime updatedAt
    }

    Skill {
        String id PK
        String name UK
        SkillCategory category
        String description
        DifficultyLevel difficulty
        String[] prerequisites
        String[] tags
        Float marketDemand
        Float averageSalary
        DateTime createdAt
        DateTime updatedAt
    }

    SkillAssessment {
        String id PK
        String studentId FK
        String skillId FK
        SkillLevel currentLevel
        Float scorePercentage
        Json assessmentData
        SkillLevel previousLevel
        Float improvementRate
        DateTime assessedAt
        DateTime validUntil
        DateTime updatedAt
    }

    Certification {
        String id PK
        String studentId FK
        String skillId FK
        String title
        String issuer
        String certificationId
        String verificationUrl
        Boolean isVerified
        String credentialHash
        DateTime issuedDate
        DateTime expiryDate
        CertificationCategory category
        SkillLevel level
        String description
        DateTime createdAt
        DateTime updatedAt
    }

    Achievement {
        String id PK
        String studentId FK
        String title
        String description
        AchievementType type
        String iconUrl
        String badgeColor
        String category
        Int points
        RarityLevel rarity
        Json requirements
        Json progress
        DateTime unlockedAt
        Boolean isVisible
        DateTime createdAt
        DateTime updatedAt
    }

    WellnessData {
        String id PK
        String studentId FK
        DateTime date
        Int moodScore
        Int stressLevel
        Int anxietyLevel
        Int energyLevel
        Float sleepHours
        Int sleepQuality
        DateTime bedtime
        DateTime wakeupTime
        Int exerciseMinutes
        Int steps
        Int screenTimeMinutes
        Int productiveMinutes
        Int socialMediaMinutes
        Int meditationMinutes
        Int breathingExercises
        Int studyMinutes
        Int focusScore
        Int pomodoroCount
        String dailyReflection
        String[] gratitudeNotes
        DateTime createdAt
        DateTime updatedAt
    }

    AIInteraction {
        String id PK
        String userId FK
        AIInteractionType type
        String query
        String response
        Json context
        String model
        Int tokensUsed
        Int responseTime
        Int userRating
        Boolean wasHelpful
        DateTime createdAt
    }

    LearningAnalytics {
        String id PK
        String studentId FK
        DateTime date
        Int studyMinutes
        Int completedTasks
        Float averageScore
        Int loginCount
        Int pageViews
        Int timeOnPlatform
        Float gpaForecast
        Float riskScore
        Float engagementScore
    }

    Notification {
        String id PK
        String userId FK
        String title
        String message
        NotificationType type
        String category
        Priority priority
        String actionUrl
        Boolean isRead
        DateTime readAt
        Json metadata
        String imageUrl
        DateTime scheduledAt
        DateTime expiresAt
        DateTime createdAt
    }

    SystemConfiguration {
        String id PK
        String key UK
        Json value
        String description
        String category
        Boolean isPublic
        String dataType
        DateTime createdAt
        DateTime updatedAt
    }

    User ||--o{ Account : "has"
    User ||--o{ Session : "has"
    User ||--o{ Student : "is a"
    User ||--o{ Teacher : "is a"
    User ||--o{ Admin : "is a"
    Student ||--o{ Enrollment : "has"
    Student ||--o{ Submission : "has"
    Student ||--o{ Grade : "has"
    Student ||--o{ AttendanceRecord : "has"
    Student ||--o{ WellnessData : "has"
    Student ||--o{ Achievement : "has"
    Course ||--o{ Enrollment : "has"
    Course ||--o{ Assignment : "has"
    Course ||--o{ Resource : "has"
    Course ||--o{ Announcement : "has"
    Course ||--o{ AttendanceRecord : "has"
    Teacher ||--o{ Assignment : "creates"
    Teacher ||--o{ Grade : "grades"
    Assignment ||--o{ Submission : "has"
    Assignment ||--o{ Grade : "has"
