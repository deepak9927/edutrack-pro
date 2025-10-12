interface Achievement {
  id: string;
  title: string;
  description: string;
  unlockedAt: Date;
  points: number;
}

export async function getRecentAchievements(userId?: string): Promise<Achievement[]> {
  if (!userId) {
    return [];
  }

  try {
    // In a real implementation, this would fetch actual achievement data from the database
    // For now, we'll return mock data
    await new Promise(resolve => setTimeout(resolve, 200)); // Simulate DB query delay
    
    // Mock achievements data
    return [
      {
        id: "ach_1",
        title: "First Steps",
        description: "Complete your first assignment",
        unlockedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        points: 10
      },
      {
        id: "ach_2",
        title: "Week Warrior",
        description: "Study for 7 consecutive days",
        unlockedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
        points: 50
      },
      {
        id: "ach_3",
        title: "Quiz Master",
        description: "Score 90% or higher on a quiz",
        unlockedAt: new Date(),
        points: 25
      }
    ];
  } catch (error) {
    console.error("Failed to fetch recent achievements:", error);
    return [];
  }
}