"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase } from "lucide-react";

export const CareerGuidanceAI = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Briefcase className="mr-2 h-5 w-5" />
          Career Guidance AI
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          Comprehensive career counseling based on market trends and interests. (Placeholder)
        </p>
      </CardContent>
    </Card>
  );
};