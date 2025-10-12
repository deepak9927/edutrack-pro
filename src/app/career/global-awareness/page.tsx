"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, BookOpen, Users, Lightbulb } from "lucide-react";

interface Topic {
  id: string;
  title: string;
  description: string;
  link: string;
}

const globalAwarenessTopics: Topic[] = [
  {
    id: "ga_1",
    title: "UN Sustainable Development Goals (SDGs)",
    description: "Learn about the 17 global goals for a better and more sustainable future.",
    link: "#",
  },
  {
    id: "ga_2",
    title: "Climate Change: Causes and Solutions",
    description: "Understand the science behind climate change and what can be done.",
    link: "#",
  },
  {
    id: "ga_3",
    title: "Global Health Challenges",
    description: "Explore major health issues affecting populations worldwide.",
    link: "#",
  },
  {
    id: "ga_4",
    title: "Human Rights and Social Justice",
    description: "Delve into the principles of human rights and ongoing social justice movements.",
    link: "#",
  },
];

export default function GlobalAwarenessPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Global Awareness</h1>
      <p className="text-muted-foreground">
        Expand your understanding of world issues and contribute to a better global community.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {globalAwarenessTopics.map((topic) => (
          <Card key={topic.id}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="mr-2 h-5 w-5" />
                {topic.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{topic.description}</p>
              <Button asChild>
                <a href={topic.link} target="_blank" rel="noopener noreferrer">
                  Learn More
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="mr-2 h-5 w-5" />
            Discussions & Community
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Join our community forums to discuss global issues, share insights, and collaborate on solutions.
          </p>
          <Button asChild>
            <Link href="/career/community">Go to Community Forum</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
