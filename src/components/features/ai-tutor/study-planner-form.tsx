"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { generateStudyPlan, StudyPlanRequest, AIResponse } from "@/components/features/ai-tutor/ai-tutor-utils";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import Select from 'react-select';
import { getDashboardCourses } from "@/actions/get-dashboard-courses";
import { Course } from "@/types/academic";
import { useSession } from "next-auth/react";

const formSchema = z.object({
  selectedCourses: z.array(z.string()).min(1, { message: "Please select at least one course." }),
  subject: z.string().min(1, { message: "Subject is required." }),
  topics: z.string().min(1, { message: "Topics are required." }),
  deadline: z.string().refine((val) => new Date(val) > new Date(), {
    message: "Deadline must be in the future.",
  }),
  estimatedStudyTimePerTopic: z.coerce.number().min(1, { message: "Estimated study time per topic must be at least 1 hour." }),
  currentLevel: z.enum(["beginner", "intermediate", "advanced"], {
    required_error: "Please select your current level.",
  }),
  timeAvailable: z.coerce.number().min(1, { message: "Time available must be at least 1 hour." }),
  goals: z.string().min(1, { message: "Goals are required." }),
  weakAreas: z.string().optional(),
});

type StudyPlanFormValues = z.infer<typeof formSchema>;

export function StudyPlannerForm() {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [studyPlan, setStudyPlan] = useState<string | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [coursesLoading, setCoursesLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      setCoursesLoading(true);
      try {
        const fetchedCourses = await getDashboardCourses(session?.user?.id);
        setCourses(fetchedCourses);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
        toast.error("Failed to load courses.");
      } finally {
        setCoursesLoading(false);
      }
    };
    fetchCourses();
  }, [session?.user?.id]);

  const form = useForm<StudyPlanFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      selectedCourses: [],
      subject: "",
      topics: "",
      deadline: "",
      estimatedStudyTimePerTopic: 2, // Default to 2 hours
      currentLevel: "beginner",
      timeAvailable: 5,
      goals: "",
      weakAreas: "",
    },
  });

  async function onSubmit(values: StudyPlanFormValues) {
    setIsLoading(true);
    setStudyPlan(null);

    const request: StudyPlanRequest = {
      selectedCourses: values.selectedCourses,
      subject: values.subject,
      topics: values.topics.split(",").map((topic) => topic.trim()),
      deadline: values.deadline,
      estimatedStudyTimePerTopic: values.estimatedStudyTimePerTopic,
      currentLevel: values.currentLevel,
      timeAvailable: values.timeAvailable,
      goals: values.goals.split(",").map((goal) => goal.trim()),
      weakAreas: values.weakAreas
        ? values.weakAreas.split(",").map((area) => area.trim())
        : undefined,
    };

    try {
      const response: AIResponse = await generateStudyPlan(request);

      if (response.success && response.data) {
        setStudyPlan(response.data);
        toast.success("Study plan generated! Your personalized study plan is ready.");
      } else {
        toast.error(response.error || "Failed to generate study plan.");
      }
    } catch (error) {
      console.error("Failed to generate study plan:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">AI Study Planner</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="selectedCourses"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Courses</FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      isMulti
                      options={courses.map(course => ({ value: course.id, label: course.title }))}
                      onChange={(selectedOptions) => field.onChange(selectedOptions ? selectedOptions.map(option => option.value) : [])}
                      value={courses.filter(course => field.value.includes(course.id)).map(course => ({ value: course.id, label: course.title }))}
                      isLoading={coursesLoading}
                      isDisabled={coursesLoading}
                      placeholder="Select courses..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Data Structures, Web Development" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="topics"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Topics (comma-separated)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., Variables, Functions, Loops, Arrays"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="deadline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deadline</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="estimatedStudyTimePerTopic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estimated Study Time per Topic (hours)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
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
                    <Select
                      options={[
                        { value: "beginner", label: "Beginner" },
                        { value: "intermediate", label: "Intermediate" },
                        { value: "advanced", label: "Advanced" },
                      ]}
                      onChange={(selectedOption: { value: string; label: string } | null) => field.onChange(selectedOption?.value)}
                      value={field.value ? { value: field.value, label: field.value.charAt(0).toUpperCase() + field.value.slice(1) } : null}
                    />
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
                  <FormLabel>Time Available (hours per week)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
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
                      placeholder="e.g., Understand algorithms, Build a project, Prepare for exams"
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
                  <FormLabel>Weak Areas (optional, comma-separated)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., Recursion, Database queries"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isLoading || coursesLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Generate Study Plan
            </Button>
          </form>
        </Form>

        {studyPlan && (
          <div className="mt-8 p-6 border rounded-md bg-gray-50 dark:bg-gray-800 whitespace-pre-wrap">
            <h3 className="text-xl font-semibold mb-4">Your Personalized Study Plan:</h3>
            <p>{studyPlan}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
