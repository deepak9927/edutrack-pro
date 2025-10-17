"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ProductivityScoringPage() {
  return (
    <div className="p-6 space-y-6">
      <Button variant="outline" asChild>
        <Link href="/wellness">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Wellness
        </Link>
      </Button>
      <h1 className="text-3xl font-bold flex items-center">
        <Leaf className="mr-2 h-7 w-7" /> Productivity Scoring
      </h1>
      <p className="text-muted-foreground">
        AI-driven analysis of your digital habits and personalized improvement suggestions.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Your Productivity Score</CardTitle>
          </CardHeader>
          <CardContent>
            <p>See your current productivity score based on your digital activities.</p>
            {/* Placeholder for productivity score data */}
            <div className="mt-4 p-4 bg-gray-100 rounded-md">
              <p className="text-lg font-semibold">Current Score: 82/100</p>
              <p>Last Updated: Just now</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Habit Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Understand which digital habits contribute positively or negatively to your productivity.</p>
            {/* Placeholder for habit analysis */}
            <div className="mt-4 p-4 bg-gray-100 rounded-md">
              <p className="text-lg font-semibold">Positive Habits: Focused work sessions</p>
              <p>Negative Habits: Frequent social media checks</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Improvement Suggestions</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Get personalized recommendations to boost your productivity.</p>
            {/* Placeholder for improvement suggestions */}
            <div className="mt-4 p-4 bg-gray-100 rounded-md">
              <p className="text-lg font-semibold">Suggestion: Try the Pomodoro Technique</p>
              <p>Goal: Increase focused work time by 15%</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}