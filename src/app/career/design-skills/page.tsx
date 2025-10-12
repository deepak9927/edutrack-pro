"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Palette, Layout, Sparkles, Accessibility, BookOpen } from "lucide-react";

interface Resource {
  id: string;
  title: string;
  description: string;
  type: "tutorial" | "tool" | "principle";
  link: string;
  icon: React.ElementType;
}

const designResources: Resource[] = [
  {
    id: "ds_1",
    title: "UI/UX Design Fundamentals",
    description: "Learn the core principles of user interface and user experience design.",
    type: "tutorial",
    link: "#",
    icon: BookOpen,
  },
  {
    id: "ds_2",
    title: "Figma Mastery: Collaborative Design",
    description: "Master Figma for wireframing, prototyping, and team collaboration.",
    type: "tool",
    link: "#",
    icon: Layout,
  },
  {
    id: "ds_3",
    title: "Color Theory for Designers",
    description: "Understand the psychology and application of color in design.",
    type: "principle",
    link: "#",
    icon: Palette,
  },
  {
    id: "ds_4",
    title: "Motion Design with Framer Motion",
    description: "Add engaging animations and micro-interactions to your designs.",
    type: "tutorial",
    link: "#",
    icon: Sparkles,
  },
  {
    id: "ds_5",
    title: "Accessibility in Design",
    description: "Design inclusive experiences that are accessible to all users.",
    type: "principle",
    link: "#",
    icon: Accessibility,
  },
];

export default function DesignSkillsPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Design Skills Track</h1>
      <p className="text-muted-foreground">
        Develop your creative and user-centered design abilities.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {designResources.map((resource) => (
          <Card key={resource.id}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <resource.icon className="mr-2 h-5 w-5" />
                {resource.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{resource.description}</p>
              <Button asChild>
                <a href={resource.link} target="_blank" rel="noopener noreferrer">
                  {resource.type === "tutorial" && "Start Tutorial"}
                  {resource.type === "tool" && "Explore Tool"}
                  {resource.type === "principle" && "Learn Principle"}
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}