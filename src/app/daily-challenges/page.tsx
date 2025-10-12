"use client";

import { DailyChallenges } from "@/components/features/ai-tutor/daily-challenges";

export default function DailyChallengesPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Daily Growth Challenges</h1>
        <p className="text-muted-foreground mt-2">
          Get personalized daily challenges designed to accelerate your personal and professional growth.
          Build positive habits, develop new skills, and stay motivated on your journey.
        </p>
      </div>

      <DailyChallenges />
    </div>
  );
}