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

export const appUsageSchema = z.object({
  name: z.string(),
  usage: z.number().min(0),
});

export const screenTimeDataSchema = z.object({
  dailyAverage: z.number().min(0),
  appUsage: z.array(appUsageSchema),
  productivityScore: z.number().min(0).max(100),
});

export const eyeCareSettingsSchema = z.object({
  blueLightFilter: z.boolean(),
  remindersEnabled: z.boolean(),
  postureAlertsEnabled: z.boolean(),
});

export const focusModeScheduleEntrySchema = z.object({
  day: z.string().min(1, "Day cannot be empty"),
  startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid start time format (HH:MM)"),
  endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid end time format (HH:MM)"),
});

export const focusModeSettingsSchema = z.object({
  isEnabled: z.boolean().optional(),
  blockedApps: z.array(z.string().min(1, "Blocked app name cannot be empty")).optional(),
  blockedWebsites: z.array(z.string().url("Invalid website URL")).optional(),
  schedule: z.array(focusModeScheduleEntrySchema).optional(),
});
