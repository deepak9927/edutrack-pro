import { z } from "zod";

export const dailyMoodSchema = z.object({
  moodScore: z.number().min(1).max(10).optional(),
  stressLevel: z.number().min(1).max(10).optional(),
  anxietyLevel: z.number().min(1).max(10).optional(),
  energyLevel: z.number().min(1).max(10).optional(),
  dailyReflection: z.string().optional(),
  gratitudeNotes: z.array(z.string()).optional(),
});

export type DailyMoodInput = z.infer<typeof dailyMoodSchema>;

export const digitalDetoxSchema = z.object({
  screenTime: z.number().min(0),
  productiveTime: z.number().min(0),
  socialMediaTime: z.number().min(0),
});

export type DigitalDetoxInput = z.infer<typeof digitalDetoxSchema>;
