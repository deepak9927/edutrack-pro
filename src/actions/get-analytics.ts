import { db } from "@/lib/db";
import type { Course } from "@prisma/client";

// We'll infer the PurchaseWithCourse structure at runtime instead of
// importing a Purchase type which may not exist in the generated client in all setups.
type PurchaseWithCourse = {
  id: string;
  userId: string;
  courseId: string;
  amount: number;
  currency?: string;
  createdAt: Date;
  course: Course;
};

const groupByCourse = (purchases: PurchaseWithCourse[]) => {
  const grouped: { [courseTitle: string]: number } = {};
  
  purchases.forEach((purchase) => {
    const courseTitle = purchase.course.title;
    if (!grouped[courseTitle]) {
      grouped[courseTitle] = 0;
    }
    // Use the purchase.amount field (amount paid) if present.
    const amount = typeof purchase.amount === 'number' ? purchase.amount : 0;
    grouped[courseTitle] += amount;
  });

  return grouped;
};

export const getAnalytics = async (userId: string) => {
  try {
    // Create a minimal typed view of the `db` object for the queries we
    // need here so we avoid a blanket `any` cast which ESLint flags.
  type DBWithPurchase = { purchase: { findMany: (opts: unknown) => Promise<PurchaseWithCourse[]> } };
  const dbWithPurchase = db as unknown as DBWithPurchase;
    const purchases = await dbWithPurchase.purchase.findMany({
      where: {
        course: {
          userId: userId
        }
      },
      include: {
        course: true,
      }
    });

    const groupedEarnings = groupByCourse(purchases);
    const data = Object.entries(groupedEarnings).map(([courseTitle, total]) => ({
      name: courseTitle,
      total: total,
    }));

    const totalRevenue = data.reduce((acc, curr) => acc + curr.total, 0);
    const totalSales = purchases.length;

    return {
      data,
      totalRevenue,
      totalSales,
    }
  } catch (error) {
    console.log("[GET_ANALYTICS]", error);
    return {
      data: [],
      totalRevenue: 0,
      totalSales: 0,
    }
  }
}