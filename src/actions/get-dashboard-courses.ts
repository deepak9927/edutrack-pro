import { db } from "@/lib/db";

interface CourseWithProgress {
  id: string;
  title: string;
  progress: number;
  chapters: { id: string; title: string }[];
}

export async function getDashboardCourses(userId?: string): Promise<CourseWithProgress[]> {
  if (!userId) {
    return [];
  }

  try {
    // In a real implementation, this would fetch actual course data from the database
    // For now, we'll return mock data
    await new Promise(resolve => setTimeout(resolve, 300)); // Simulate DB query delay
    
    return [
      {
        id: "course_1",
        title: "Introduction to Programming",
        progress: 75,
        chapters: [
          { id: "chapter_1", title: "Variables and Data Types" },
          { id: "chapter_2", title: "Control Structures" },
          { id: "chapter_3", title: "Functions" },
          { id: "chapter_4", title: "Arrays and Objects" }
        ]
      },
      {
        id: "course_2",
        title: "Data Structures",
        progress: 40,
        chapters: [
          { id: "chapter_5", title: "Stacks and Queues" },
          { id: "chapter_6", title: "Linked Lists" },
          { id: "chapter_7", title: "Trees" },
          { id: "chapter_8", title: "Graphs" }
        ]
      },
      {
        id: "course_3",
        title: "Web Development",
        progress: 20,
        chapters: [
          { id: "chapter_9", title: "HTML Basics" },
          { id: "chapter_10", title: "CSS Styling" },
          { id: "chapter_11", title: "JavaScript Fundamentals" },
          { id: "chapter_12", title: "React Introduction" }
        ]
      }
    ];
  } catch (error) {
    console.error("Failed to fetch dashboard courses:", error);
    return [];
  }
}