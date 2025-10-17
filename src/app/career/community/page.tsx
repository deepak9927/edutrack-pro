"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Code, BookOpen, GitPullRequest, Trophy, GraduationCap } from "lucide-react";

export default function CommunityPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Community Learning Hub</h1>
      <p className="text-muted-foreground">
        AI-optimized study groups, peer code review, knowledge marketplace, and project collaboration.
      </p>

      {/* Study Group Formation */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="mr-2 h-5 w-5" /> Study Group Formation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            AI-optimized team creation based on learning styles and goals.
          </p>
          <Button className="w-full">Form a Study Group</Button>
        </CardContent>
      </Card>

      {/* Peer Code Review System */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Code className="mr-2 h-5 w-5" /> Peer Code Review System
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Structured review process with reputation and rating mechanisms.
          </p>
          <Button className="w-full">Submit Code for Review</Button>
        </CardContent>
      </Card>

      {/* Knowledge Marketplace */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <BookOpen className="mr-2 h-5 w-5" /> Knowledge Marketplace
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Peer tutoring platform with skill-based matching.
          </p>
          <Button className="w-full">Find a Tutor / Offer Tutoring</Button>
        </CardContent>
      </Card>

      {/* Project Collaboration Center */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <GitPullRequest className="mr-2 h-5 w-5" /> Project Collaboration Center
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Team management tools with integrated version control.
          </p>
          <Button className="w-full">Start a New Project</Button>
        </CardContent>
      </Card>

      {/* Academic Competitions */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Trophy className="mr-2 h-5 w-5" /> Academic Competitions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Regular hackathons, coding contests, and innovation challenges.
          </p>
          <Button className="w-full">View Upcoming Competitions</Button>
        </CardContent>
      </Card>

      {/* Alumni Success Network */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <GraduationCap className="mr-2 h-5 w-5" /> Alumni Success Network
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Structured mentorship from successful graduates.
          </p>
          <Button className="w-full">Connect with Alumni</Button>
        </CardContent>
      </Card>
    </div>
  );
}