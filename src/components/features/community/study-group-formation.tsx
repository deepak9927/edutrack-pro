"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { useState } from 'react';

export function StudyGroupFormation() {
  const [topic, setTopic] = useState('');
  const [group, setGroup] = useState<string[] | null>(null);

  const findGroup = () => {
    // In a real application, this would call an AI-powered matching API
    const students = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve'];
    const shuffled = students.sort(() => 0.5 - Math.random());
    setGroup(shuffled.slice(0, 3));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Find a Study Group</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="topic">Topic</Label>
          <Input
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., Data Structures, Algorithms"
          />
        </div>
        <Button onClick={findGroup} className="w-full">
          Find a Group
        </Button>
        {group && (
          <div className="pt-4">
            <h4 className="font-semibold">Your matched study group:</h4>
            <ul className="list-disc pl-5">
              {group.map((member, index) => (
                <li key={index}>{member}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}