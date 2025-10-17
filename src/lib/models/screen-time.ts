export interface ScreenTimeData {
  userId: string;
  date: string; // ISO 8601 date string
  productiveTime: number; // in minutes
  distractingTime: number; // in minutes
  appUsage: {
    [appName: string]: number; // time in minutes
  };
}