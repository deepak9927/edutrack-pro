"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Heart, Users, Leaf, Target } from "lucide-react";
import Link from "next/link";

interface WellnessFeature {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: React.ElementType;
}

const wellnessFeatures: WellnessFeature[] = [
  {
    id: "wf_1",
    title: "Advanced Screen Time Analytics",
    description: "Deep insights into app usage and productivity patterns.",
    href: "/wellness/screen-time-analytics",
    icon: Brain, // Placeholder icon
  },
  {
    id: "wf_2",
    title: "Focus Mode Pro",
    description: "Intelligent app/website blocking during study sessions.",
    href: "/wellness/focus-mode-pro",
    icon: Target, // Placeholder icon
  },
  {
    id: "wf_3",
    title: "Digital Sabbath Planner",
    description: "Scheduled offline time with alternative activity suggestions.",
    href: "/wellness/digital-sabbath-planner",
    icon: Heart, // Placeholder icon
  },
  {
    id: "wf_4",
    title: "Eye Care System",
    description: "Blue light monitoring, eye exercise reminders, posture alerts.",
    href: "/wellness/eye-care-system",
    icon: Users, // Placeholder icon
  },
  {
    id: "wf_5",
    title: "Productivity Scoring",
    description: "AI-driven analysis of digital habits and improvement suggestions.",
    href: "/wellness/productivity-scoring",
    icon: Leaf, // Placeholder icon
  },
  {
    id: "wf_6",
    title: "Digital Detox Tools",
    description: "Track screen time, monitor app usage, and set healthy boundaries.",
    href: "/wellness/digital-detox",
    icon: Brain,
  },
  {
    id: "wf_7",
    title: "Habit Formation",
    description: "Build positive habits with a 66-day tracker for consistent progress.",
    href: "/wellness/habit-tracker",
    icon: Target,
  },
  {
    id: "wf_8",
    title: "Mindfulness Center",
    description: "Access guided meditations, breathing exercises, and a gratitude journal.",
    href: "/wellness/mindfulness-center",
    icon: Heart,
  },
  {
    id: "wf_9",
    title: "Addiction Support",
    description: "Join anonymous peer support groups and track recovery milestones.",
    href: "/wellness/addiction-support",
    icon: Users,
  },
  {
    id: "wf_10",
    title: "Sustainability Challenges",
    description: "Participate in eco-friendly challenges and track your environmental impact.",
    href: "/wellness/sustainability-challenges",
    icon: Leaf,
  },
];

export default function WellnessPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Wellness & Mental Health Suite</h1>
      <p className="text-muted-foreground">
        Prioritize your well-being with tools and resources for a balanced life.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wellnessFeatures.map((feature) => (
          <Card key={feature.id}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <feature.icon className="mr-2 h-5 w-5" />
                {feature.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{feature.description}</p>
              <Button asChild>
                <Link href={feature.href}>Explore</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}