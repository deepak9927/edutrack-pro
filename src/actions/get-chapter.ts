import { db } from "@/lib/db";

// Local minimal types to avoid depending on generated Prisma types in build
// (keeps compile stable across different generated client versions).
type Attachment = {
  id: string;
  courseId: string;
  url?: string;
  filename?: string;
};

type Chapter = {
  id: string;
  isFree?: boolean;
  position?: number | null;
};

interface GetChapterProps {
  userId: string;
  courseId: string;
  chapterId: string;
};

export const getChapter = async ({
  userId,
  courseId,
  chapterId,
}: GetChapterProps) => {
  try {
    // Concrete minimal types for the records we use here (no `any`)
    type PurchaseRec = { id: string; userId: string; courseId: string };
    type CourseRec = { id: string; isPublished?: boolean; price?: number | null };
    type ChapterRec = { id: string; isFree?: boolean; position?: number | null };
    type AttachmentRec = { id: string; courseId: string; url?: string; filename?: string };
    type MuxDataRec = { id: string; chapterId: string; playbackId?: string } | null;
    type UserProgressRec = { id: string; userId: string; chapterId: string } | null;

    type ModelFindUnique<T> = (opts: unknown) => Promise<T | null>;
    type ModelFindMany<T> = (opts: unknown) => Promise<T[]>;

    type DBWithModels = {
      purchase: { findUnique: ModelFindUnique<PurchaseRec> };
      course: { findUnique: ModelFindUnique<CourseRec> };
      chapter: { findUnique: ModelFindUnique<ChapterRec>; findFirst: ModelFindUnique<ChapterRec> };
      attachment: { findMany: ModelFindMany<AttachmentRec> };
      muxData: { findUnique: ModelFindUnique<MuxDataRec> };
      userProgress: { findUnique: ModelFindUnique<UserProgressRec> };
    };

    const dbTyped = db as unknown as DBWithModels;

    const purchase = await dbTyped.purchase.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        }
      }
    });

  const course = await dbTyped.course.findUnique({ where: { id: courseId } });

  const chapter = await dbTyped.chapter.findUnique({ where: { id: chapterId } });

    // Check published flag safely at runtime
    const courseIsPublished = course && typeof course.isPublished === 'boolean' ? course.isPublished : false;
    if (!chapter || !course || !courseIsPublished) {
      throw new Error("Chapter or course not found or not published");
    }

    let muxData = null;
    let attachments: Attachment[] = [];
    let nextChapter: Chapter | null = null;

    if (purchase) {
      attachments = await dbTyped.attachment.findMany({ where: { courseId } });
      // attachments are AttachmentRec[], compatible with our local Attachment type
    }

    if (chapter.isFree || purchase) {
      muxData = await dbTyped.muxData.findUnique({ where: { chapterId } });

      const chapterPosition = chapter && typeof chapter.position === 'number' ? chapter.position : null;
      nextChapter = await dbTyped.chapter.findFirst({
        where: chapterPosition !== null ? { courseId, isPublished: true, position: { gt: chapterPosition } } : { courseId, isPublished: true },
        orderBy: { position: 'asc' },
      }) as ChapterRec | null;
    }

    const userProgress = await dbTyped.userProgress.findUnique({ where: { userId_chapterId: { userId, chapterId } } });

    return {
      chapter,
      course,
      muxData,
      attachments,
      nextChapter,
      userProgress,
      purchase,
    };
  } catch (error) {
    console.log("[GET_CHAPTER]", error);
    return {
      chapter: null,
      course: null,
      muxData: null,
      attachments: [],
      nextChapter: null,
      userProgress: null,
      purchase: null,
    }
  }
}