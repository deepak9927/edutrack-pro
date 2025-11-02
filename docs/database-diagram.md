# EduTrack Pro Database Diagram

This diagram provides a high-level overview of the core entities and their relationships within the EduTrack Pro database. It is generated from the `prisma/schema.prisma` file.

```mermaid
erDiagram
    User ||--o{ Account : has
    User ||--o{ Session : has
    User ||--o| Student : has
    User ||--o| Teacher : has
    User ||--o| Admin : has

    Student ||--o{ Enrollment : enrolls_in
    Student ||--o{ Submission : submits
    Student ||--o{ Grade : receives
    Student ||--o{ AttendanceRecord : has
    Student ||--o{ WellnessData : tracks
    Student ||--o{ Achievement : earns
    Student ||--o{ SkillAssessment : undergoes
    Student ||--o{ Certification : obtains
    Student ||--o{ Mentorship : is_mentee_in
    Student ||--o{ StudyGroupMember : is_member_of
    Student ||--o{ ForumPost : creates
    Student ||--o{ ForumComment : comments_on
    Student ||--o{ ScreenTimeEntry : logs
    Student ||--o| UserScreenTimeSummary : summarizes
    Student ||--o| FocusModeConfig : configures
    Student ||--o{ FocusSession : participates_in
    Student ||--o| DigitalSabbathSchedule : schedules
    Student ||--o{ UserSabbathHistory : records
    Student ||--o| EyeCareSettings : sets
    Student ||--o{ EyeCareLog : logs
    Student ||--o| ProductivityScore : has
    Student ||--o{ CrisisAlert : raises
    Student ||--o| RecoveryPlan : has
    Student ||--o{ RecoveryMilestone : tracks
    Student ||--o| MentorProfile : has
    Student ||--o{ MentorshipSession : attends
    Student ||--o{ MentorshipGoal : sets
    Student ||--o{ MockInterview : takes
    Student ||--o{ CodeReview : submits
    Student ||--o{ TutoringOffer : makes
    Student ||--o{ Project : works_on
    Student ||--o| AlumniProfile : has
    Student ||--o{ Credential : earns
    Student ||--o| SkillPortfolio : has
    Student ||--o{ SkillGapAnalysis : undergoes
    Student ||--o{ AchievementBadge : earns
    Student ||--o| LeaderboardEntry : has
    Student ||--o{ PeerRecognition : gives_or_receives
    Student ||--o{ AssistantInteraction : interacts_with
    Student ||--o{ LearningRecommendation : receives
    Student ||--o{ StudyScheduleAdjustment : adjusts
    Student ||--o{ PerformancePrediction : has
    Student ||--o{ AcademicForecast : has
    Student ||--o{ HabitSuccess : tracks
    Student ||--o| CareerReadiness : has
    Student ||--o{ UserConsent : manages
    Student ||--o{ DataErasureRequest : requests

    Teacher ||--o{ Course : teaches
    Teacher ||--o{ Assignment : creates
    Teacher ||--o{ Grade : assigns
    Teacher ||--o{ Mentorship : is_mentor_in

    Course ||--o{ Enrollment : has
    Course ||--o{ Assignment : has
    Course ||--o{ Resource : has
    Course ||--o{ Announcement : has
    Course ||--o{ AttendanceRecord : has
    Course ||--o{ Module : contains

    Module ||--o{ Lesson : contains

    Assignment ||--o{ Submission : has
    Assignment ||--o{ Grade : has
    Assignment ||--o{ UserAssignment : has

    UserAssignment ||--o| User : for
    UserAssignment ||--o| Assignment : of

    Submission ||--o| Student : by
    Submission ||--o| Assignment : for

    Grade ||--o| Student : for
    Grade ||--o| Assignment : for
    Grade ||--o| Teacher : by

    WellnessData ||--o| Student : belongs_to

    Skill ||--o{ SkillAssessment : has
    Skill ||--o{ Certification : relates_to

    StudyGroup ||--o{ StudyGroupMember : has
    StudyGroup ||--o{ StudySession : hosts

    Mentorship ||--o{ MentorshipSession : has

    Forum ||--o{ ForumPost : contains

    ForumPost ||--o{ ForumComment : has

    ForumComment ||--o{ ForumComment : replies_to

    AIInteraction ||--o| User : by

    LearningAnalytics ||--o| Student : tracks

    Notification ||--o| User : for

    // Digital Wellness
    ScreenTimeEntry ||--o| Student : logs
    UserScreenTimeSummary ||--o| Student : summarizes
    FocusModeConfig ||--o| Student : configures
    FocusSession ||--o| Student : belongs_to
    DigitalSabbathSchedule ||--o| Student : schedules
    UserSabbathHistory ||--o| Student : records
    EyeCareSettings ||--o| Student : sets
    EyeCareLog ||--o| Student : logs
    ProductivityScore ||--o| Student : has

    // Anonymous Support Network
    CrisisAlert ||--o| Student : raises
    RecoveryPlan ||--o| Student : has
    RecoveryMilestone ||--o| Student : tracks

    // Professional Network & Mentorship
    MentorProfile ||--o| Student : has
    MentorshipSession ||--o| Student : for_student
    MentorshipSession ||--o| MentorProfile : by_mentor
    MentorshipGoal ||--o| MentorshipSession : for
    MockInterview ||--o| Student : takes
    CodeReview ||--o| Student : submitted_by
    TutoringOffer ||--o| Student : offered_by
    Project ||--o| Student : owned_by
    AlumniProfile ||--o| Student : has

    // Gamified Achievement & Certification System
    Credential ||--o| Student : earns
    SkillPortfolio ||--o| Student : has
    SkillGapAnalysis ||--o| Student : undergoes
    AchievementBadge ||--o| Student : earns
    LeaderboardEntry ||--o| Student : has
    PeerRecognition ||--o| Student : given_by_or_received_by

    // Advanced AI & Automation Features
    AssistantInteraction ||--o| Student : by
    LearningRecommendation ||--o| Student : for
    StudyScheduleAdjustment ||--o| Student : for
    PerformancePrediction ||--o| Student : for
    AcademicForecast ||--o| Student : for
    HabitSuccess ||--o| Student : for
    CareerReadiness ||--o| Student : has
    MarketDemand ||--o| Skill : tracks

    // Enhanced Security & Privacy Framework
    UserConsent ||--o| Student : manages
    DataErasureRequest ||--o| Student : requests

    // Additional
    MeditationSession ||--o| Student : participates_in
    HabitTracker ||--o| Student : tracks
    HabitCompletion ||--o|| HabitTracker : completes
    LearningAnalytics ||--o| Student : analyzes