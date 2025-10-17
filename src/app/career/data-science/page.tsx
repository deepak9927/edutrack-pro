"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Database, Table, BarChart2, PlayCircle } from "lucide-react";

interface Resource {
  id: string;
  title: string;
  description: string;
  type: "tutorial" | "practice" | "tool";
  link: string;
  icon: React.ElementType;
}

const dataScienceResources: Resource[] = [
  {
    id: "ds_1",
    title: "Python for Data Science Tutorial",
    description: "Learn the basics of Python programming for data analysis.",
    type: "tutorial",
    link: "#",
    icon: PlayCircle,
  },
  {
    id: "ds_2",
    title: "SQL Practice Problems",
    description: "Practice your SQL skills with interactive exercises.",
    type: "practice",
    link: "#",
    icon: Database,
  },
  {
    id: "ds_3",
    title: "Excel Mastery for Data Analysis",
    description: "Master Excel functions and tools for data manipulation.",
    type: "tutorial",
    link: "#",
    icon: Table,
  },
  {
    id: "ds_4",
    title: "Tableau Basics: Data Visualization",
    description: "Get started with Tableau to create stunning visualizations.",
    type: "tool",
    link: "#",
    icon: BarChart2,
  },
];

export default function DataSciencePage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Data Science Track</h1>
      <p className="text-muted-foreground">
        Enhance your data science skills with tutorials, practice, and tool mastery.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dataScienceResources.map((resource) => (
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
                  {resource.type === "practice" && "Start Practice"}
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