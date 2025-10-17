"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import React, { useEffect, useState } from 'react';

export function ProductivityScore() {
  const [score, setScore] = useState(0);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real application, you would fetch this data from your API
    const fetchScore = () => {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        const newScore = Math.floor(Math.random() * 101);
        setScore(newScore);
        if (newScore < 60) {
          setSuggestions([
            'Try using a focus mode app to limit distractions.',
            'Schedule short breaks to recharge.',
            'Prioritize your tasks for the day.',
          ]);
        } else if (newScore < 85) {
          setSuggestions([
            'You\'re doing great! Keep up the good work.',
            'Consider using the Pomodoro Technique.',
            'Review your goals to stay motivated.',
          ]);
        } else {
          setSuggestions([
            'Excellent productivity! Share your tips with others.',
            'Challenge yourself with a new learning goal.',
          ]);
        }
        setLoading(false);
      }, 1500);
    };

    fetchScore();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Productivity Score</CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        {loading ? (
          <p>Analyzing your digital habits...</p>
        ) : (
          <>
            <div className="relative w-32 h-32 mx-auto">
              <Progress value={score} className="w-full h-full rounded-full" />
              <span className="absolute inset-0 flex items-center justify-center text-3xl font-bold">
                {score}
              </span>
            </div>
            <div className="mt-6 text-left">
              <h4 className="font-semibold">Improvement Suggestions:</h4>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                {suggestions.map((suggestion, index) => (
                  <li key={index}>{suggestion}</li>
                ))}
              </ul>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}