import { db } from "@/lib/db";

export async function getStudyStreak(userId?: string): Promise<number> {
  if (!userId) {
    return 0;
  }

  try {
    const wellnessData = await db.wellnessData.findMany({
      where: {
        student: {
          userId: userId,
        },
        studyMinutes: {
          gt: 0,
        },
      },
      orderBy: {
        date: "desc",
      },
    });

    if (wellnessData.length === 0) {
      return 0;
    }

    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    // Check if the most recent study day is today or yesterday
    const mostRecentEntryDate = new Date(wellnessData[0].date);
    mostRecentEntryDate.setHours(0, 0, 0, 0);

    if (
      mostRecentEntryDate.getTime() !== today.getTime() &&
      mostRecentEntryDate.getTime() !== yesterday.getTime()
    ) {
      return 0;
    }

    streak = 1;
    let lastDate = mostRecentEntryDate;

    for (let i = 1; i < wellnessData.length; i++) {
      const currentDate = new Date(wellnessData[i].date);
      currentDate.setHours(0, 0, 0, 0);

      const expectedDate = new Date(lastDate);
      expectedDate.setDate(lastDate.getDate() - 1);

      if (currentDate.getTime() === expectedDate.getTime()) {
        streak++;
        lastDate = currentDate;
      } else {
        break;
      }
    }

    return streak;
  } catch (error) {
    console.error("Failed to fetch study streak:", error);
    return 0;
  }
}
