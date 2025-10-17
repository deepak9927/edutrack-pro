"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { useState } from 'react';

export function IntelligentPersonalAssistant() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<string | null>(null);

  const askAssistant = async () => {
    // In a real application, this would call an AI-powered assistant API
    setResponse('This is a sample response from the AI Assistant.');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ask Your AI Assistant</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="query">Your Question</Label>
          <Input
            id="query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g., What is the capital of France?"
          />
        </div>
        <Button onClick={askAssistant} className="w-full">
          Ask
        </Button>
        {response && (
          <div className="pt-4">
            <h4 className="font-semibold">Response:</h4>
            <p>{response}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}