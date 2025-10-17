"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DigitalSabbathPlannerPage() {
  return (
    <div className="p-6 space-y-6">
      <Button variant="outline" asChild>
        <Link href="/wellness">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Wellness
        </Link>
      </Button>
      <h1 className="text-3xl font-bold flex items-center">
        <Heart className="mr-2 h-7 w-7" /> Digital Sabbath Planner
      </h1>
      <p className="text-muted-foreground">
        Schedule dedicated offline time and discover alternative activity suggestions for a digital detox.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Schedule Offline Time</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Set your preferred digital Sabbath hours and days.</p>
            {/* Placeholder for scheduling controls */}
            <div className="mt-4 p-4 bg-gray-100 rounded-md">
              <p className="text-lg font-semibold">Scheduled: Saturday 6 PM - Sunday 6 PM</p>
              <p>Next Sabbath: In 3 days</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Activity Suggestions</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Explore a curated list of offline activities to enjoy during your digital Sabbath.</p>
            {/* Placeholder for activity suggestions */}
            <div className="mt-4 p-4 bg-gray-100 rounded-md">
              <p className="text-lg font-semibold">Suggestions: Reading, Hiking, Board Games</p>
              <p>New ideas added weekly!</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sabbath History</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Review your past digital Sabbaths and track your consistency.</p>
            {/* Placeholder for Sabbath history data */}
            <div className="mt-4 p-4 bg-gray-100 rounded-md">
              <p className="text-lg font-semibold">Last Sabbath: Completed (24 hours)</p>
              <p>Completion Rate: 90%</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}