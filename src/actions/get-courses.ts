// Avoid importing generated Prisma types directly during build - use
// minimal local types to keep compilation stable.
type Category = { id: string; name?: string };
type Course = {
  id: string;
  title: string;
  isPublished?: boolean;
  categoryId?: string | null;
  purchases?: { id: string }[];
  createdAt?: Date;
  chapters?: { id: string }[];
};

import { getProgress } from "@/actions/get-progress";
import { db } from "@/lib/db";

type CourseWithProgressWithCategory = Course & {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
};

type GetCourses = {
  userId: string;
  title?: string;
  categoryId?: string;
};

export const getCourses = async ({ userId, title, categoryId }: GetCourses): Promise<CourseWithProgressWithCategory[]> => {
  try {
    type ModelFindMany<T> = (opts: unknown) => Promise<T[]>;
    type CourseFetch = Course & { category?: Category | null; chapters?: { id: string }[]; purchases?: { id: string }[] };
    type DBWithCourse = { course: { findMany: ModelFindMany<CourseFetch> } };
    const dbTyped = db as unknown as DBWithCourse;

    // Build a typed where object without using `any` so ESLint is happy.
    type CourseWhere = {
      title?: { contains: string };
      categoryId?: string;
      // Other Prisma-supported filters can be added here if needed.
    };

    const where: CourseWhere = {};
    if (title) where.title = { contains: title };
    if (categoryId) where.categoryId = categoryId;

    // We'll filter unpublished courses at runtime after fetching to avoid
    // depending on a specific generated Prisma input type for `isPublished`.
    const courses = await dbTyped.course.findMany({
      where: where,
      include: {
        category: true,
        chapters: {
          where: { isPublished: true },
          select: { id: true },
        },
        purchases: { where: { userId } },
      },
      orderBy: { createdAt: 'desc' },
    }) as CourseFetch[];

    // Filter out unpublished courses (if the field exists) so behavior remains the same.
    const publishedFiltered = courses.filter((c) => {
      const obj = c as Record<string, unknown>;
      if (!Object.prototype.hasOwnProperty.call(obj, 'isPublished')) return true;
      return Boolean(obj['isPublished']);
    });

    const coursesWithProgress: CourseWithProgressWithCategory[] = await Promise.all(
      publishedFiltered.map(async (course) => {
        if (!course.purchases || course.purchases.length === 0) {
          return { ...course, progress: null } as CourseWithProgressWithCategory;
        }

        const progressPercentage = await getProgress(userId, course.id);
        return { ...course, progress: progressPercentage } as CourseWithProgressWithCategory;
      })
    );

    return coursesWithProgress;
  } catch (error) {
    console.log('[GET_COURSES]', error);
    return [];
  }
};