"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useState } from "react";

const formSchema = z.object({
  subject: z.string().min(2, {
    message: "Subject must be at least 2 characters.",
  }),
  goal: z.string().min(10, {
    message: "Goal must be at least 10 characters.",
  }),
  duration: z.coerce.number().min(1, {
    message: "Duration must be at least 1 week.",
  }),
});

export default function StudyPlannerPage() {
  const [plan, setPlan] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: "",
      goal: "",
      duration: 1,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setPlan("");
    // TODO: Call the AI service to generate the plan
    console.log(values);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setPlan(`Here is a sample plan for learning ${values.subject} to ${values.goal} in ${values.duration} weeks. This is a placeholder and will be replaced with a real AI-generated plan.`);
    setIsLoading(false);
  }

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>AI-Powered Study Planner</CardTitle>
          <CardDescription>
            Tell us your study goals, and we'll generate a personalized study plan for you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Next.js and React" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="goal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Study Goal</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Build a full-stack application" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration (in weeks)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 4" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Generating..." : "Generate Plan"}
              </Button>
            </form>
          </Form>
        </CardContent>
        {plan && (
          <CardFooter>
            <div className="mt-4 w-full">
              <h3 className="text-lg font-semibold">Your Study Plan</h3>
              <p className="whitespace-pre-wrap">{plan}</p>
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
