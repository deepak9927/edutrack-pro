"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { useState } from 'react';

export function CredentialTracking() {
  const [platform, setPlatform] = useState('');
  const [credentials, setCredentials] = useState<string[]>([]);

  const trackCredentials = () => {
    // In a real application, this would connect to external platforms
    setCredentials(['Certificate 1', 'Badge 2', 'Course Completion 3']);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Track Your Credentials</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="platform">Platform</Label>
          <Input
            id="platform"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            placeholder="e.g., Coursera, Udemy, edX"
          />
        </div>
        <Button onClick={trackCredentials} className="w-full">
          Track Credentials
        </Button>
        {credentials.length > 0 && (
          <div className="pt-4">
            <h4 className="font-semibold">Your Credentials:</h4>
            <ul className="list-disc pl-5">
              {credentials.map((credential, index) => (
                <li key={index}>{credential}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}