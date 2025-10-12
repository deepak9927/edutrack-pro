"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Lightbulb, Briefcase, Handshake, Presentation } from "lucide-react";

interface Resource {
  id: string;
  title: string;
  description: string;
  type: "tutorial" | "skill" | "project";
  link: string;
  icon: React.ElementType;
}

const businessSkillsResources: Resource[] = [
  {
    id: "bs_1",
    title: "Effective Communication Strategies",
    description: "Improve your verbal and written communication skills for professional settings.",
    type: "skill",
    link: "#",
    icon: Users,
  },
  {
    id: "bs_2",
    title: "Leadership Development Program",
    description: "Cultivate leadership qualities and inspire your team.",
    type: "skill",
    link: "#",
    icon: Lightbulb,
  },
  {
    id: "bs_3",
    title: "Project Management Fundamentals",
    description: "Learn the basics of planning, executing, and closing projects successfully.",
    type: "tutorial",
    link: "#",
    icon: Briefcase,
  },
  {
    id: "bs_4",
    title: "Negotiation Skills Workshop",
    description: "Develop effective negotiation tactics for various business scenarios.",
    type: "skill",
    link: "#",
    icon: Handshake,
  },
  {
    id: "bs_5",
    title: "Public Speaking and Presentation Mastery",
    description: "Overcome stage fright and deliver impactful presentations.",
    type: "skill",
    link: "#",
    icon: Presentation,
  },
];

export default function BusinessSkillsPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Business Skills Track</h1>
      <p className="text-muted-foreground">
        Develop essential business skills for leadership and professional growth.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {businessSkillsResources.map((resource) => (
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
                  {resource.type === "skill" && "Develop Skill"}
                  {resource.type === "project" && "Start Project"}
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}