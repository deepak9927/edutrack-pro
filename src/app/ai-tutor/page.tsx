"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, BookOpen, Lightbulb, TrendingUp, Briefcase } from "lucide-react";
import { StudyPlanner } from "@/components/features/ai-tutor/study-planner";
import { AdaptiveAssessment } from "@/components/features/ai-tutor/adaptive-assessment";
import { IntelligentPersonalAssistant } from "@/components/features/ai-tutor/intelligent-personal-assistant";
import { PredictiveAnalyticsDashboard } from "@/components/features/ai-tutor/predictive-analytics-dashboard";
import { CareerGuidanceAI } from "@/components/features/ai-tutor/career-guidance-ai";

export default function AiTutorPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">AI Tutor & Assistant</h1>
      <p className="text-muted-foreground">
        Your personalized AI companion for academic excellence, skill development, and well-being.
      </p>

      <Tabs defaultValue="personal-assistant" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="personal-assistant">
            <Lightbulb className="mr-2 h-4 w-4" /> Intelligent Personal Assistant
          </TabsTrigger>
          <TabsTrigger value="predictive-analytics">
            <TrendingUp className="mr-2 h-4 w-4" /> Predictive Analytics
          </TabsTrigger>
          <TabsTrigger value="career-guidance">
            <Briefcase className="mr-2 h-4 w-4" /> Career Guidance AI
          </TabsTrigger>
          <TabsTrigger value="study-planner">
            <BookOpen className="mr-2 h-4 w-4" /> Study Planner
          </TabsTrigger>
          <TabsTrigger value="adaptive-assessment">
            <Brain className="mr-2 h-4 w-4" /> Adaptive Assessment
          </TabsTrigger>
        </TabsList>
        <TabsContent value="personal-assistant">
          <IntelligentPersonalAssistant />
        </TabsContent>
        <TabsContent value="predictive-analytics">
          <PredictiveAnalyticsDashboard />
        </TabsContent>
        <TabsContent value="career-guidance">
          <CareerGuidanceAI />
        </TabsContent>
        <TabsContent value="study-planner">
          <StudyPlanner />
        </TabsContent>
        <TabsContent value="adaptive-assessment">
          <AdaptiveAssessment />
        </TabsContent>
      </Tabs>
    </div>
  );
}