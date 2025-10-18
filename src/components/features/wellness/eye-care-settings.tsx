"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { EyeCareSettings } from '@/types/wellness';

export function EyeCareSettingsComponent() {
  const [settings, setSettings] = useState<EyeCareSettings>({
    blueLightFilter: false,
    remindersEnabled: false,
    postureAlertsEnabled: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    async function fetchSettings() {
      try {
        const response = await fetch('/api/wellness/eyecare');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: EyeCareSettings = await response.json();
        setSettings(data);
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : 'An unknown error occurred');
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
      const response = await fetch('/api/wellness/eyecare', {
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
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'An unknown error occurred');
    } finally {
      setSaving(false);
    }
  };

  const handleToggle = (key: keyof EyeCareSettings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  if (loading) {
    return <div>Loading eye care settings...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Eye Care System Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="blue-light-filter">Blue Light Filter</Label>
          <Switch
            id="blue-light-filter"
            checked={settings.blueLightFilter}
            onCheckedChange={() => handleToggle('blueLightFilter')}
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="reminders-enabled">Eye Exercise Reminders</Label>
          <Switch
            id="reminders-enabled"
            checked={settings.remindersEnabled}
            onCheckedChange={() => handleToggle('remindersEnabled')}
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="posture-alerts">Posture Alerts</Label>
          <Switch
            id="posture-alerts"
            checked={settings.postureAlertsEnabled}
            onCheckedChange={() => handleToggle('postureAlertsEnabled')}
          />
        </div>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? 'Saving...' : 'Save Settings'}
        </Button>
        {saveSuccess && <p className="text-green-500 text-sm">Settings saved successfully!</p>}
      </CardContent>
    </Card>
  );
}
