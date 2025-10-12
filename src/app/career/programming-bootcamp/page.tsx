"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code, GitBranch, Laptop, Rocket, Terminal } from "lucide-react";

interface Resource {
  id: string;
  title: string;
  description: string;
  type: "tutorial" | "project" | "tool";
  link: string;
  icon: React.ElementType;
}

const programmingResources: Resource[] = [
  {
    id: "pb_1",
    title: "JavaScript Fundamentals",
    description: "Learn the core concepts of JavaScript programming language.",
    type: "tutorial",
    link: "#",
    icon: Code,
  },
  {
    id: "pb_2",
    title: "React.js: Build Your First App",
    description: "Build a simple web application using the React library.",
    type: "project",
    link: "#",
    icon: Laptop,
  },
  {
    id: "pb_3",
    title: "Python for Beginners",
    description: "An introduction to Python for scripting and basic programming.",
    type: "tutorial",
    link: "#",
    icon: Terminal,
  },
  {
    id: "pb_4",
    title: "Git Version Control Essentials",
    description: "Master Git commands for collaborative development and code management.",
    type: "tool",
    link: "#",
    icon: GitBranch,
  },
  {
    id: "pb_5",
    title: "Full Stack Web Development Project",
    description: "Develop a complete web application from frontend to backend.",
    type: "project",
    link: "#",
    icon: Rocket,
  },
];

export default function ProgrammingBootcampPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Programming Bootcamp</h1>
      <p className="text-muted-foreground">
        Kickstart your coding journey with essential programming languages and tools.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {programmingResources.map((resource) => (
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
                  {resource.type === "project" && "Start Project"}
                  {resource.type === "tool" && "Explore Tool"}
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}