"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, LineChart, PieChart, Lightbulb } from "lucide-react";

interface Resource {
  id: string;
  title: string;
  description: string;
  type: "tutorial" | "tool" | "concept";
  link: string;
  icon: React.ElementType;
}

const analyticsResources: Resource[] = [
  {
    id: "an_1",
    title: "Google Analytics 4 (GA4) Fundamentals",
    description: "Learn how to set up and use GA4 for website and app analytics.",
    type: "tutorial",
    link: "#",
    icon: LineChart,
  },
  {
    id: "an_2",
    title: "Data Visualization Best Practices",
    description: "Understand principles for creating effective and impactful data visualizations.",
    type: "concept",
    link: "#",
    icon: BarChart,
  },
  {
    id: "an_3",
    title: "Statistical Thinking for Data Analysis",
    description: "Develop a foundational understanding of statistical concepts for data-driven decisions.",
    type: "concept",
    link: "#",
    icon: Lightbulb,
  },
  {
    id: "an_4",
    title: "Introduction to Power BI",
    description: "Explore Power BI for business intelligence and interactive dashboards.",
    type: "tool",
    link: "#",
    icon: PieChart,
  },
];

export default function AnalyticsSkillsPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Analytics Skills</h1>
      <p className="text-muted-foreground">
        Develop essential analytics skills for data-driven decision making.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {analyticsResources.map((resource) => (
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
                  {resource.type === "concept" && "Learn Concept"}
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}