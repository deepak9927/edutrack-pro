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
import { aiRequest, getSkillRecommendations } from "@/lib/ai/gemini";

const formSchema = z.object({
  currentSkills: z.string().min(1, { message: "Current skills are required." }),
  interests: z.string().min(1, { message: "Interests are required." }),
  careerGoals: z.string().optional(),
  timeCommitment: z.coerce.number().min(1).max(168), // hours per week
  currentLevel: z.enum(["beginner", "intermediate", "advanced"]),
});

export function SkillRecommender() {
  const [skillRecommendations, setSkillRecommendations] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentSkills: "",
      interests: "",
      careerGoals: "",
      timeCommitment: 10,
      currentLevel: "beginner",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);
    setSkillRecommendations(null);

    try {
      // Convert skills and interests from comma-separated strings to arrays
      const currentSkillsArray = values.currentSkills.split(",").map((skill) => skill.trim());
      const interestsArray = values.interests.split(",").map((interest) => interest.trim());
      const careerGoalsArray = values.careerGoals
        ? values.careerGoals.split(",").map((goal) => goal.trim())
        : [];

      const aiResponse = await aiRequest(() =>
        getSkillRecommendations({
          currentSkills: currentSkillsArray,
          interests: interestsArray,
          careerGoals: careerGoalsArray,
          timeCommitment: values.timeCommitment,
          currentLevel: values.currentLevel as "beginner" | "intermediate" | "advanced",
        })
      );

      if (aiResponse.success && aiResponse.data) {
        setSkillRecommendations(aiResponse.data);
      } else {
        setError(aiResponse.error || "Failed to get skill recommendations.");
      }
    } catch (err) {
      console.error("Skill Recommender Error:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>AI Skill Recommender</CardTitle>
          <p className="text-sm text-muted-foreground">
            Get personalized skill recommendations based on your current abilities, interests, and career goals.
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
                        placeholder="e.g., JavaScript, React, Python, SQL"
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
                name="careerGoals"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Career Goals (comma-separated, optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Full Stack Developer, Data Analyst, Product Manager"
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
                name="timeCommitment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weekly Time Commitment (hours)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        max="168"
                        placeholder="e.g., 15"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Analyzing..." : "Get Skill Recommendations"}
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

      {skillRecommendations && (
        <Card>
          <CardHeader>
            <CardTitle>Your Personalized Skill Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none">
              {skillRecommendations.split("\n").map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}