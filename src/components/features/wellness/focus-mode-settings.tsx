"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface FocusModeSettings {
  isEnabled: boolean;
  blockedApps: string[];
  blockedWebsites: string[];
  schedule: Array<{ day: string; startTime: string; endTime: string }>;
}

export function FocusModeSettingsComponent() {
  const [settings, setSettings] = useState<FocusModeSettings>({
    isEnabled: false,
    blockedApps: [],
    blockedWebsites: [],
    schedule: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    async function fetchSettings() {
      try {
        const response = await fetch('/api/wellness/focus-mode');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: FocusModeSettings = await response.json();
        setSettings(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchSettings();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setSaveSuccess(false);
    try {
      const response = await fetch('/api/wellness/focus-mode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000); // Hide success message after 3 seconds
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const handleToggle = (key: keyof FocusModeSettings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleBlockedItemChange = (type: 'apps' | 'websites', value: string) => {
    const items = value.split(',').map(item => item.trim()).filter(item => item.length > 0);
    if (type === 'apps') {
      setSettings((prev) => ({ ...prev, blockedApps: items }));
    } else {
      setSettings((prev) => ({ ...prev, blockedWebsites: items }));
    }
  };

  const handleScheduleChange = (index: number, field: 'day' | 'startTime' | 'endTime', value: string) => {
    const newSchedule = [...settings.schedule];
    newSchedule[index] = { ...newSchedule[index], [field]: value };
    setSettings((prev) => ({ ...prev, schedule: newSchedule }));
  };

  const addScheduleEntry = () => {
    setSettings((prev) => ({
      ...prev,
      schedule: [...prev.schedule, { day: '', startTime: '', endTime: '' } as { day: string; startTime: string; endTime: string }],
    }));
  };

  const removeScheduleEntry = (index: number) => {
    setSettings((prev) => ({
      ...prev,
      schedule: prev.schedule.filter((_, i) => i !== index),
    }));
  };

  if (loading) {
    return <div>Loading focus mode settings...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Focus Mode Pro Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <Label htmlFor="focus-mode-enabled">Enable Focus Mode</Label>
          <Switch
            id="focus-mode-enabled"
            checked={settings.isEnabled}
            onCheckedChange={() => handleToggle('isEnabled')}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="blocked-apps">Blocked Applications (comma-separated)</Label>
          <Input
            id="blocked-apps"
            value={settings.blockedApps.join(', ')}
            onChange={(e) => handleBlockedItemChange('apps', e.target.value)}
            placeholder="e.g., Discord, Spotify"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="blocked-websites">Blocked Websites (comma-separated)</Label>
          <Input
            id="blocked-websites"
            value={settings.blockedWebsites.join(', ')}
            onChange={(e) => handleBlockedItemChange('websites', e.target.value)}
            placeholder="e.g., youtube.com, facebook.com"
          />
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Scheduled Focus Sessions</h3>
          {settings.schedule.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Input
                value={entry.day}
                onChange={(e) => handleScheduleChange(index, 'day', e.target.value)}
                placeholder="Day (e.g., Monday)"
                className="w-1/3"
              />
              <Input
                value={entry.startTime}
                onChange={(e) => handleScheduleChange(index, 'startTime', e.target.value)}
                placeholder="Start Time (HH:MM)"
                className="w-1/3"
              />
              <Input
                value={entry.endTime}
                onChange={(e) => handleScheduleChange(index, 'endTime', e.target.value)}
                placeholder="End Time (HH:MM)"
                className="w-1/3"
              />
              <Button variant="destructive" size="sm" onClick={() => removeScheduleEntry(index)}>
                Remove
              </Button>
            </div>
          ))}
          <Button variant="outline" onClick={addScheduleEntry}>
            Add Schedule
          </Button>
        </div>

        <Button onClick={handleSave} disabled={saving}>
          {saving ? 'Saving...' : 'Save Settings'}
        </Button>
        {saveSuccess && <p className="text-green-500 text-sm">Settings saved successfully!</p>}
      </CardContent>
    </Card>
  );
}
