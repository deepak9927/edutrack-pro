"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, PenTool, Share2, Mail, TrendingUp } from "lucide-react";

interface Resource {
  id: string;
  title: string;
  description: string;
  type: "tutorial" | "strategy" | "tool";
  link: string;
  icon: React.ElementType;
}

const digitalMarketingResources: Resource[] = [
  {
    id: "dm_1",
    title: "Technical SEO Mastery",
    description: "Learn advanced SEO techniques to rank higher in search results.",
    type: "tutorial",
    link: "#",
    icon: Search,
  },
  {
    id: "dm_2",
    title: "Content Creation Studio",
    description: "Develop engaging content for various digital platforms.",
    type: "strategy",
    link: "#",
    icon: PenTool,
  },
  {
    id: "dm_3",
    title: "Social Media Strategy",
    description: "Craft effective social media campaigns and grow your audience.",
    type: "strategy",
    link: "#",
    icon: Share2,
  },
  {
    id: "dm_4",
    title: "Email Marketing Automation",
    description: "Set up automated email campaigns for lead nurturing and sales.",
    type: "tool",
    link: "#",
    icon: Mail,
  },
  {
    id: "dm_5",
    title: "Growth Hacking Fundamentals",
    description: "Discover creative strategies for rapid business growth.",
    type: "strategy",
    link: "#",
    icon: TrendingUp,
  },
];

export default function DigitalMarketingPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Digital Marketing Track</h1>
      <p className="text-muted-foreground">
        Master the art of digital marketing to drive growth and engagement.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {digitalMarketingResources.map((resource) => (
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
                  {resource.type === "strategy" && "Learn Strategy"}
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