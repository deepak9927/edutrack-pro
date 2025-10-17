"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import React, { useState } from 'react';

export function FocusMode() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [blockedWebsites, setBlockedWebsites] = useState<string[]>([]);
  const [newWebsite, setNewWebsite] = useState('');

  const addWebsite = () => {
    if (newWebsite && !blockedWebsites.includes(newWebsite)) {
      setBlockedWebsites([...blockedWebsites, newWebsite]);
      setNewWebsite('');
    }
  };

  const removeWebsite = (siteToRemove: string) => {
    setBlockedWebsites(blockedWebsites.filter((site) => site !== siteToRemove));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Focus Mode</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="focus-mode-switch">Enable Focus Mode</Label>
          <Switch
            id="focus-mode-switch"
            checked={isEnabled}
            onCheckedChange={setIsEnabled}
          />
        </div>
        {isEnabled && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="new-website">Block a new website</Label>
              <div className="flex space-x-2">
                <Input
                  id="new-website"
                  value={newWebsite}
                  onChange={(e) => setNewWebsite(e.target.value)}
                  placeholder="e.g., youtube.com"
                />
                <Button onClick={addWebsite}>Add</Button>
              </div>
            </div>
            {blockedWebsites.length > 0 && (
              <div>
                <h4 className="font-medium">Blocked Websites:</h4>
                <ul className="list-disc pl-5">
                  {blockedWebsites.map((site) => (
                    <li key={site} className="flex justify-between items-center">
                      <span>{site}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeWebsite(site)}
                      >
                        Remove
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}