import { db } from "@/lib/db";

export const getProgress = async (
  userId: string,
  courseId: string,
): Promise<number> => {
  try {
    type ModelFindMany = (opts: unknown) => Promise<any[]>;
    type DBWithChapter = { chapter: { findMany: ModelFindMany }; userProgress: { count: (opts: unknown) => Promise<number> } };
    const dbTyped = db as unknown as DBWithChapter;

    const publishedChapters = await dbTyped.chapter.findMany({
      where: { courseId, isPublished: true },
      select: { id: true },
    });

    const publishedChapterIds = publishedChapters.map((chapter) => chapter.id);

    const validCompletedChapters = await dbTyped.userProgress.count({
      where: { userId, chapterId: { in: publishedChapterIds }, isCompleted: true },
    });

    const progressPercentage = (validCompletedChapters / publishedChapterIds.length) * 100;

    return progressPercentage;
  } catch (error) {
    console.log("[GET_PROGRESS]", error);
    return 0;
  }
}
