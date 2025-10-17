"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function FocusModeProPage() {
  return (
    <div className="p-6 space-y-6">
      <Button variant="outline" asChild>
        <Link href="/wellness">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Wellness
        </Link>
      </Button>
      <h1 className="text-3xl font-bold flex items-center">
        <Target className="mr-2 h-7 w-7" /> Focus Mode Pro
      </h1>
      <p className="text-muted-foreground">
        Intelligent app/website blocking during study sessions to enhance your focus.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Block Apps & Websites</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Select applications and websites to block during your focus sessions.</p>
            {/* Placeholder for app/website blocking controls */}
            <div className="mt-4 p-4 bg-gray-100 rounded-md">
              <p className="text-lg font-semibold">Blocked: Social Media, News Sites</p>
              <p>Allowed: Learning Platforms, Code Editors</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Session Timer</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Set a timer for your focus sessions and track your progress.</p>
            {/* Placeholder for session timer controls */}
            <div className="mt-4 p-4 bg-gray-100 rounded-md">
              <p className="text-lg font-semibold">Current Session: 45 minutes</p>
              <p>Time Remaining: 23 minutes</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Session History</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Review your past focus sessions and analyze your productivity.</p>
            {/* Placeholder for session history data */}
            <div className="mt-4 p-4 bg-gray-100 rounded-md">
              <p className="text-lg font-semibold">Last Session: 1 hour (Highly Focused)</p>
              <p>Average Focus Score: 85%</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}