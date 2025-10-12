interface AnalyticsData {
  date: string;
  studyHours: number;
  assignmentsCompleted: number;
  averageScore: number;
}

export async function getAcademicAnalytics(userId?: string): Promise<AnalyticsData[]> {
  if (!userId) {
    return [];
  }

  try {
    // In a real implementation, this would fetch actual analytics data from the database
    // For now, we'll return mock data
    await new Promise(resolve => setTimeout(resolve, 300)); // Simulate DB query delay
    
    // Mock analytics data for the last 7 days
    const data: AnalyticsData[] = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      data.push({
        date: date.toISOString().split('T')[0] || "", // YYYY-MM-DD
        studyHours: Math.floor(Math.random() * 5) + 1, // 1-5 hours
        assignmentsCompleted: Math.floor(Math.random() * 3), // 0-2 assignments
        averageScore: Math.floor(Math.random() * 40) + 60 // 60-100%
      });
    }
    
    return data;
  } catch (error) {
    console.error("Failed to fetch academic analytics:", error);
    return [];
  }
}