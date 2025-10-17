"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { useState } from 'react';

export function MentorConnect() {
  const [interests, setInterests] = useState('');
  const [mentor, setMentor] = useState<string | null>(null);

  const findMentor = () => {
    // In a real application, this would call an AI-powered matching API
    const mentors = ['Alice (Software Engineer)', 'Bob (UX Designer)', 'Charlie (Product Manager)'];
    const randomIndex = Math.floor(Math.random() * mentors.length);
    setMentor(mentors[randomIndex]);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Find a Mentor</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="interests">Your Interests</Label>
          <Input
            id="interests"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            placeholder="e.g., Machine Learning, UI/UX Design"
          />
        </div>
        <Button onClick={findMentor} className="w-full">
          Find a Mentor
        </Button>
        {mentor && (
          <div className="pt-4">
            <h4 className="font-semibold">Your matched mentor:</h4>
            <p>{mentor}</p>
            <Button variant="outline" className="mt-2">
              Schedule a Meeting
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}