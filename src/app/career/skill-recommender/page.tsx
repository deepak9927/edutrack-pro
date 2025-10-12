"use client";

import { SkillRecommender } from "@/components/features/ai-tutor/skill-recommender";

export default function SkillRecommenderPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">AI Skill Recommender</h1>
        <p className="text-muted-foreground mt-2">
          Discover your next skills to learn based on your current abilities, interests, and career goals.
          Our AI analyzes your profile and provides personalized recommendations to accelerate your growth.
        </p>
      </div>

      <SkillRecommender />
    </div>
  );
}