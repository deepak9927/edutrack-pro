"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { aiRequest, getDailyChallenges } from "@/lib/ai/gemini";

const formSchema = z.object({
  currentSkills: z.string().min(1, { message: "Current skills are required." }),
  interests: z.string().min(1, { message: "Interests are required." }),
  currentLevel: z.enum(["beginner", "intermediate", "advanced"]),
  completedChallenges: z.string().optional(),
  preferredChallengeType: z.enum(["skill-building", "mindfulness", "productivity", "creativity", "mixed"]).optional(),
});

export function DailyChallenges() {
  const [dailyChallenges, setDailyChallenges] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentSkills: "",
      interests: "",
      currentLevel: "beginner",
      completedChallenges: "",
      preferredChallengeType: "mixed",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);
    setDailyChallenges(null);

    try {
      // Convert skills and interests from comma-separated strings to arrays
      const currentSkillsArray = values.currentSkills.split(",").map((skill) => skill.trim());
      const interestsArray = values.interests.split(",").map((interest) => interest.trim());
      const completedChallengesArray = values.completedChallenges
        ? values.completedChallenges.split(",").map((challenge) => challenge.trim())
        : [];

      const aiResponse = await aiRequest(() =>
        getDailyChallenges({
          currentSkills: currentSkillsArray,
          interests: interestsArray,
          currentLevel: values.currentLevel as "beginner" | "intermediate" | "advanced",
          completedChallenges: completedChallengesArray,
          preferredChallengeType: values.preferredChallengeType as "skill-building" | "mindfulness" | "productivity" | "creativity" | "mixed",
        })
      );

      if (aiResponse.success && aiResponse.data) {
        setDailyChallenges(aiResponse.data);
      } else {
        setError(aiResponse.error || "Failed to generate daily challenges.");
      }
    } catch (err) {
      console.error("Daily Challenges Error:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>AI Daily Growth Challenges</CardTitle>
          <p className="text-sm text-muted-foreground">
            Get personalized daily challenges designed to accelerate your growth and build positive habits.
          </p>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="currentSkills"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Skills (comma-separated)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., JavaScript, React, Python"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="interests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Interests (comma-separated)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Web Development, Data Science, UI/UX Design"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="currentLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Skill Level</FormLabel>
                    <FormControl>
                      <select
                        className="w-full p-2 border rounded"
                        {...field}
                      >
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="completedChallenges"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Previously Completed Challenges (comma-separated, optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., 30-day coding challenge, meditation streak"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="preferredChallengeType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Challenge Type (optional)</FormLabel>
                    <FormControl>
                      <select
                        className="w-full p-2 border rounded"
                        {...field}
                      >
                        <option value="mixed">Mixed (Recommended)</option>
                        <option value="skill-building">Skill Building</option>
                        <option value="mindfulness">Mindfulness</option>
                        <option value="productivity">Productivity</option>
                        <option value="creativity">Creativity</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Generating..." : "Get Daily Challenges"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {error && (
        <Card>
          <CardHeader>
            <CardTitle>Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-500">{error}</p>
          </CardContent>
        </Card>
      )}

      {dailyChallenges && (
        <Card>
          <CardHeader>
            <CardTitle>Your Personalized Daily Growth Challenges</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none">
              {dailyChallenges.split("\n").map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}