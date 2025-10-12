"use client";

import React, { useState } from "react";
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
import { aiRequest, generateStudyPlan } from "@/components/features/ai-tutor/ai-tutor-utils";

const formSchema = z.object({
  subject: z.string().min(1, { message: "Subject is required." }),
  currentLevel: z.enum(["beginner", "intermediate", "advanced"], {
    required_error: "Please select your current level.",
  }),
  timeAvailable: z.coerce.number().min(1).max(168), // hours per week (168 hours in a week)
  goals: z.string().min(1, { message: "Goals are required." }),
  weakAreas: z.string().optional(),
});

type StudyPlannerFormValues = z.infer<typeof formSchema>;

export function StudyPlanner() {
  const [studyPlan, setStudyPlan] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<StudyPlannerFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: "",
      currentLevel: "beginner",
      timeAvailable: 10,
      goals: "",
      weakAreas: "",
    },
  });

  async function onSubmit(values: StudyPlannerFormValues) {
    setIsLoading(true);
    setError(null);
    setStudyPlan(null);

    try {
      // Convert goals and weakAreas from comma-separated strings to arrays
      const goalsArray = values.goals.split(",").map((goal) => goal.trim());
      const weakAreasArray = values.weakAreas
        ? values.weakAreas.split(",").map((area) => area.trim())
        : [];

      const aiResponse = await aiRequest(() =>
        generateStudyPlan({
          subject: values.subject,
          currentLevel: values.currentLevel,
          timeAvailable: values.timeAvailable,
          goals: goalsArray,
          weakAreas: weakAreasArray,
        })
      );

      if (aiResponse.success && aiResponse.data) {
        setStudyPlan(aiResponse.data);
      } else {
        setError(aiResponse.error || "Failed to generate study plan.");
      }
    } catch (err) {
      console.error("Study Planner Error:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>AI Study Planner</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Data Structures" {...field} />
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
                    <FormLabel>Current Level</FormLabel>
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
                name="timeAvailable"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time Available (hours/week)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        max="168"
                        placeholder="e.g., 10"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="goals"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Goals (comma-separated)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Understand basic concepts, Implement in JavaScript"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="weakAreas"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weak Areas (comma-separated, optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Recursion, Trees"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Generating..." : "Generate Study Plan"}
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

      {studyPlan && (
        <Card>
          <CardHeader>
            <CardTitle>Your Personalized Study Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none">
              {studyPlan.split("\n").map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}