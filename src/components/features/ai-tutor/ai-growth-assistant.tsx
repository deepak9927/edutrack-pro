"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "react-hot-toast";
import { Brain, Lightbulb, TrendingUp, Target } from "lucide-react";

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
import { aiRequest, getCareerGuidance, getMotivationalAdvice, generateStudyPlan, getWellnessAdvice } from "@/components/features/ai-tutor/ai-tutor-utils";

// Schemas
const careerGuidanceSchema = z.object({
  skills: z.string().min(1, { message: "Skills are required." }),
  interests: z.string().min(1, { message: "Interests are required." }),
  currentEducation: z.string().min(1, { message: "Current education is required." }),
  targetRoles: z.string().optional(),
});

const motivationalAdviceSchema = z.object({
  currentMood: z.string().min(1, { message: "Current mood is required." }),
  challenges: z.string().min(1, { message: "Challenges are required." }),
});

const studyPlanSchema = z.object({
  subject: z.string().min(1, { message: "Subject is required." }),
  currentLevel: z.enum(["beginner", "intermediate", "advanced"]),
  timeAvailable: z.coerce.number().min(1).max(168), // hours per week (168 hours in a week)
  goals: z.string().min(1, { message: "Goals are required." }),
  weakAreas: z.string().optional(),
});

const wellnessAdviceSchema = z.object({
  stressLevel: z.coerce.number().min(1).max(10, { message: "Stress level must be between 1 and 10." }),
  studyHours: z.coerce.number().min(0, { message: "Study hours cannot be negative." }),
  sleepHours: z.coerce.number().min(0, { message: "Sleep hours cannot be negative." }),
  issues: z.string().optional(),
});

export function AiGrowthAssistant() {
  // State for Career Guidance
  const [careerGuidanceResult, setCareerGuidanceResult] = useState<string | null>(null);
  const [isLoadingCareerGuidance, setIsLoadingCareerGuidance] = useState(false);
  const [careerGuidanceError, setCareerGuidanceError] = useState<string | null>(null);

  // State for Motivational Advice
  const [motivationalAdviceResult, setMotivationalAdviceResult] = useState<string | null>(null);
  const [isLoadingMotivationalAdvice, setIsLoadingMotivationalAdvice] = useState(false);
  const [motivationalAdviceError, setMotivationalAdviceError] = useState<string | null>(null);

  // State for Study Plan
  const [studyPlanResult, setStudyPlanResult] = useState<string | null>(null);
  const [isLoadingStudyPlan, setIsLoadingStudyPlan] = useState(false);
  const [studyPlanError, setStudyPlanError] = useState<string | null>(null);

  // State for Wellness Advice
  const [wellnessAdviceResult, setWellnessAdviceResult] = useState<string | null>(null);
  const [isLoadingWellnessAdvice, setIsLoadingWellnessAdvice] = useState(false);
  const [wellnessAdviceError, setWellnessAdviceError] = useState<string | null>(null);


  // Career Guidance Form
  const careerForm = useForm<z.infer<typeof careerGuidanceSchema>>({
    resolver: zodResolver(careerGuidanceSchema),
    defaultValues: {
      skills: "",
      interests: "",
      currentEducation: "",
      targetRoles: "",
    },
  });

  // Motivational Advice Form
  const motivationalForm = useForm<z.infer<typeof motivationalAdviceSchema>>({
    resolver: zodResolver(motivationalAdviceSchema),
    defaultValues: {
      currentMood: "",
      challenges: "",
    },
  });

  // Study Plan Form
  const studyPlanForm = useForm<z.infer<typeof studyPlanSchema>>({
    resolver: zodResolver(studyPlanSchema),
    defaultValues: {
      subject: "",
      currentLevel: "beginner",
      timeAvailable: 10,
      goals: "",
      weakAreas: "",
    },
  });

  // Wellness Advice Form
  const wellnessForm = useForm<z.infer<typeof wellnessAdviceSchema>>({
    resolver: zodResolver(wellnessAdviceSchema),
    defaultValues: {
      stressLevel: 5,
      studyHours: 4,
      sleepHours: 7,
      issues: "",
    },
  });

  async function handleGetCareerGuidance(values: z.infer<typeof careerGuidanceSchema>) {
    setIsLoadingCareerGuidance(true);
    setCareerGuidanceError(null);
    setCareerGuidanceResult(null);

    try {
      const skillsArray = values.skills.split(",").map((s) => s.trim());
      const interestsArray = values.interests.split(",").map((i) => i.trim());
      const targetRolesArray = values.targetRoles
        ? values.targetRoles.split(",").map((r) => r.trim())
        : [];

      const aiResponse = await aiRequest(() =>
        getCareerGuidance({
          skills: skillsArray,
          interests: interestsArray,
          currentEducation: values.currentEducation,
          targetRoles: targetRolesArray,
        })
      );

      if (aiResponse.success && aiResponse.data) {
        setCareerGuidanceResult(aiResponse.data);
        toast.success("Career guidance generated!");
      } else {
        setCareerGuidanceError(aiResponse.error || "Failed to get career guidance.");
        toast.error(aiResponse.error || "Failed to get career guidance.");
      }
    } catch (err) {
      console.error("AI Career Guidance Error:", err);
      setCareerGuidanceError("An unexpected error occurred. Please try again.");
      toast.error("An unexpected error occurred.");
    } finally {
      setIsLoadingCareerGuidance(false);
    }
  }

  async function handleGetMotivationalAdvice(values: z.infer<typeof motivationalAdviceSchema>) {
    setIsLoadingMotivationalAdvice(true);
    setMotivationalAdviceError(null);
    setMotivationalAdviceResult(null);

    try {
      const challengesArray = values.challenges.split(",").map((c) => c.trim());

      const aiResponse = await aiRequest(() =>
        getMotivationalAdvice(values.currentMood, challengesArray)
      );

      if (aiResponse.success && aiResponse.data) {
        setMotivationalAdviceResult(aiResponse.data);
        toast.success("Motivational advice generated!");
      } else {
        setMotivationalAdviceError(aiResponse.error || "Failed to get motivational advice.");
        toast.error(aiResponse.error || "Failed to get motivational advice.");
      }
    } catch (err) {
      console.error("AI Motivational Advice Error:", err);
      setMotivationalAdviceError("An unexpected error occurred. Please try again.");
      toast.error("An unexpected error occurred.");
    } finally {
      setIsLoadingMotivationalAdvice(false);
    }
  }

  async function handleGenerateStudyPlan(values: z.infer<typeof studyPlanSchema>) {
    setIsLoadingStudyPlan(true);
    setStudyPlanError(null);
    setStudyPlanResult(null);

    try {
      const goalsArray = values.goals.split(",").map((goal) => goal.trim());
      const weakAreasArray = values.weakAreas
        ? values.weakAreas.split(",").map((area) => area.trim())
        : [];

      const aiResponse = await aiRequest(() =>
        generateStudyPlan({
          subject: values.subject,
          currentLevel: values.currentLevel as "beginner" | "intermediate" | "advanced",
          timeAvailable: values.timeAvailable,
          goals: goalsArray,
          weakAreas: weakAreasArray,
        })
      );

      if (aiResponse.success && aiResponse.data) {
        setStudyPlanResult(aiResponse.data);
        toast.success("Study plan generated!");
      } else {
        setStudyPlanError(aiResponse.error || "Failed to generate study plan.");
        toast.error(aiResponse.error || "Failed to generate study plan.");
      }
    } catch (err) {
      console.error("AI Study Plan Error:", err);
      setStudyPlanError("An unexpected error occurred. Please try again.");
      toast.error("An unexpected error occurred.");
    } finally {
      setIsLoadingStudyPlan(false);
    }
  }

  async function handleGetWellnessAdvice(values: z.infer<typeof wellnessAdviceSchema>) {
    setIsLoadingWellnessAdvice(true);
    setWellnessAdviceError(null);
    setWellnessAdviceResult(null);

    try {
      const issuesArray = values.issues
        ? values.issues.split(",").map((issue) => issue.trim())
        : [];

      const aiResponse = await aiRequest(() =>
        getWellnessAdvice({
          stressLevel: values.stressLevel,
          studyHours: values.studyHours,
          sleepHours: values.sleepHours,
          issues: issuesArray,
        })
      );

      if (aiResponse.success && aiResponse.data) {
        setWellnessAdviceResult(aiResponse.data);
        toast.success("Wellness advice generated!");
      } else {
        setWellnessAdviceError(aiResponse.error || "Failed to get wellness advice.");
        toast.error(aiResponse.error || "Failed to get wellness advice.");
      }
    } catch (err) {
      console.error("AI Wellness Advice Error:", err);
      setWellnessAdviceError("An unexpected error occurred. Please try again.");
      toast.error("An unexpected error occurred.");
    } finally {
      setIsLoadingWellnessAdvice(false);
    }
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">AI-Powered Growth Assistant</h1>
      <p className="text-muted-foreground">
        Get personalized recommendations, career guidance, and motivational support.
      </p>

      {/* Career Path Guidance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="mr-2 h-5 w-5" />
            Career Path Guidance & Skill Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...careerForm}>
            <form onSubmit={careerForm.handleSubmit(handleGetCareerGuidance)} className="space-y-4">
              <FormField
                control={careerForm.control}
                name="skills"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Skills (comma-separated)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., JavaScript, React, SQL" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={careerForm.control}
                name="interests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Interests (comma-separated)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Web Development, Data Analysis, AI" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={careerForm.control}
                name="currentEducation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Education</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., BCA 3rd Year" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={careerForm.control}
                name="targetRoles"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Target Roles (comma-separated, optional)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Frontend Developer, Data Scientist" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoadingCareerGuidance}>
                {isLoadingCareerGuidance ? "Getting Guidance..." : "Get Career Guidance"}
              </Button>
            </form>
          </Form>

          {careerGuidanceError && (
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Error</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-red-500">{careerGuidanceError}</p>
              </CardContent>
            </Card>
          )}

          {careerGuidanceResult && (
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Your Career Guidance & Skill Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  {careerGuidanceResult.split("\n").map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      {/* Learning Style Analysis and Optimized Study Plans */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Brain className="mr-2 h-5 w-5" />
            Learning Style Analysis & Optimized Study Plans
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...studyPlanForm}>
            <form onSubmit={studyPlanForm.handleSubmit(handleGenerateStudyPlan)} className="space-y-4">
              <FormField
                control={studyPlanForm.control}
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
                control={studyPlanForm.control}
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
                control={studyPlanForm.control}
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
                control={studyPlanForm.control}
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
                control={studyPlanForm.control}
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
              <Button type="submit" disabled={isLoadingStudyPlan}>
                {isLoadingStudyPlan ? "Generating..." : "Generate Study Plan"}
              </Button>
            </form>
          </Form>

          {studyPlanError && (
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Error</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-red-500">{studyPlanError}</p>
              </CardContent>
            </Card>
          )}

          {studyPlanResult && (
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Your Personalized Study Plan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  {studyPlanResult.split("\n").map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      {/* Addiction Trigger Identification & Coping Strategies */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="mr-2 h-5 w-5" />
            Addiction Trigger Identification & Coping Strategies
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...wellnessForm}>
            <form onSubmit={wellnessForm.handleSubmit(handleGetWellnessAdvice)} className="space-y-4">
              <FormField
                control={wellnessForm.control}
                name="stressLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Stress Level (1-10)</FormLabel>
                    <FormControl>
                      <Input type="number" min="1" max="10" placeholder="e.g., 7" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={wellnessForm.control}
                name="studyHours"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Average Study Hours per Day</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" placeholder="e.g., 4" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={wellnessForm.control}
                name="sleepHours"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Average Sleep Hours per Night</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" placeholder="e.g., 7" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={wellnessForm.control}
                name="issues"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Specific Issues (comma-separated, optional)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Difficulty concentrating, Feeling overwhelmed" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoadingWellnessAdvice}>
                {isLoadingWellnessAdvice ? "Getting Advice..." : "Get Wellness Advice"}
              </Button>
            </form>
          </Form>

          {wellnessAdviceError && (
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Error</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-red-500">{wellnessAdviceError}</p>
              </CardContent>
            </Card>
          )}

          {wellnessAdviceResult && (
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Your Wellness Advice</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  {wellnessAdviceResult.split("\n").map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      {/* Daily Growth Challenges & Motivational Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Lightbulb className="mr-2 h-5 w-5" />
            Daily Growth Challenges & Motivational Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...motivationalForm}>
            <form onSubmit={motivationalForm.handleSubmit(handleGetMotivationalAdvice)} className="space-y-4">
              <FormField
                control={motivationalForm.control}
                name="currentMood"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Current Mood</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Stressed, Motivated, Confused" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={motivationalForm.control}
                name="challenges"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Challenges (comma-separated)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Procrastination, Difficulty understanding algorithms" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoadingMotivationalAdvice}>
                {isLoadingMotivationalAdvice ? "Getting Advice..." : "Get Motivational Advice"}
              </Button>
            </form>
          </Form>

          {motivationalAdviceError && (
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Error</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-red-500">{motivationalAdviceError}</p>
              </CardContent>
            </Card>
          )}

          {motivationalAdviceResult && (
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Your Daily Growth Challenge & Motivational Tip</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  {motivationalAdviceResult.split("\n").map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
