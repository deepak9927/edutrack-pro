"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { useState } from 'react';

export function DigitalSabbathPlanner() {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [activity, setActivity] = useState('');
  const [scheduled, setScheduled] = useState(false);

  const scheduleSabbath = () => {
    if (startTime && endTime) {
      setScheduled(true);
      // Here you would typically call an API to save the schedule
    }
  };

  const cancelSabbath = () => {
    setScheduled(false);
    setStartTime('');
    setEndTime('');
  };

  const suggestActivity = () => {
    const activities = [
      'Read a book',
      'Go for a walk in nature',
      'Meditate for 15 minutes',
      'Try a new recipe',
      'Call a friend or family member',
      'Work on a hobby',
    ];
    const randomIndex = Math.floor(Math.random() * activities.length);
    setActivity(activities[randomIndex]);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Digital Sabbath Planner</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {scheduled ? (
          <div>
            <p>
              Your Digital Sabbath is scheduled from <strong>{startTime}</strong> to{' '}
              <strong>{endTime}</strong>.
            </p>
            <p className="mt-4">Suggested activity: <strong>{activity}</strong></p>
            <Button onClick={cancelSabbath} variant="outline" className="mt-4">
              Cancel
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="start-time">Start Time</Label>
                <Input
                  id="start-time"
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="end-time">End Time</Label>
                <Input
                  id="end-time"
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </div>
            </div>
            <Button onClick={suggestActivity}>Suggest an Activity</Button>
            {activity && <p>Suggested activity: <strong>{activity}</strong></p>}
            <Button onClick={scheduleSabbath} className="w-full">
              Schedule Digital Sabbath
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}