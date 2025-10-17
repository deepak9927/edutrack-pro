export interface EyeCareSettings {
  blueLightFilter: boolean;
  remindersEnabled: boolean;
  postureAlertsEnabled: boolean;
}

export interface FocusModeSettings {
  isEnabled: boolean;
  blockedApps: string[];
  blockedWebsites: string[];
  schedule: Array<{ day: string; startTime: string; endTime: string }>;
}
