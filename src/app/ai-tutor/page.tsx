"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, BookOpen, Lightbulb } from "lucide-react";
import { StudyPlanner } from "@/components/features/ai-tutor/study-planner";
import { AdaptiveAssessment } from "@/components/features/ai-tutor/adaptive-assessment";
import { AiGrowthAssistant } from "@/components/features/ai-tutor/ai-growth-assistant";

export default function AiTutorPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">AI Tutor & Assistant</h1>
      <p className="text-muted-foreground">
        Your personalized AI companion for academic excellence, skill development, and well-being.
      </p>

      <Tabs defaultValue="study-planner" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="study-planner">
            <BookOpen className="mr-2 h-4 w-4" /> Study Planner
          </TabsTrigger>
          <TabsTrigger value="adaptive-assessment">
            <Brain className="mr-2 h-4 w-4" /> Adaptive Assessment
          </TabsTrigger>
          <TabsTrigger value="growth-assistant">
            <Lightbulb className="mr-2 h-4 w-4" /> Growth Assistant
          </TabsTrigger>
        </TabsList>
        <TabsContent value="study-planner">
          <StudyPlanner />
        </TabsContent>
        <TabsContent value="adaptive-assessment">
          <AdaptiveAssessment />
        </TabsContent>
        <TabsContent value="growth-assistant">
          <AiGrowthAssistant />
        </TabsContent>
      </Tabs>
    </div>
  );
}