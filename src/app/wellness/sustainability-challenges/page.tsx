"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Award, Lightbulb } from "lucide-react";

interface Challenge {
  id: string;
  title: string;
  description: string;
  points: number;
  completed: boolean;
}

export default function SustainabilityChallengesPage() {
  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: "sc_1",
      title: "Reduce Plastic Use",
      description: "Avoid single-use plastics for a week.",
      points: 50,
      completed: false,
    },
    {
      id: "sc_2",
      title: "Energy Conservation",
      description: "Turn off lights and unplug electronics when not in use for a day.",
      points: 30,
      completed: false,
    },
    {
      id: "sc_3",
      title: "Eco-Friendly Commute",
      description: "Walk, bike, or use public transport instead of driving for 3 days.",
      points: 75,
      completed: false,
    },
  ]);

  const handleToggleCompletion = (id: string) => {
    setChallenges(
      challenges.map((challenge) =>
        challenge.id === id ? { ...challenge, completed: !challenge.completed } : challenge
      )
    );
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Sustainability Challenges</h1>
      <p className="text-muted-foreground">
        Participate in challenges to reduce your environmental footprint.
      </p>

      <div className="space-y-4">
        {challenges.map((challenge) => (
          <Card key={challenge.id} className="p-4 border rounded-lg flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleToggleCompletion(challenge.id)}
                className={challenge.completed ? "text-green-500" : "text-gray-400"}
              >
                <CheckCircle className="h-6 w-6" />
              </Button>
              <div>
                <h3 className="font-medium">{challenge.title}</h3>
                <p className="text-sm text-muted-foreground">{challenge.description}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-semibold text-primary">{challenge.points} pts</span>
              {challenge.completed && <Award className="h-5 w-5 text-yellow-500" />}
            </div>
          </Card>
        ))}
        {challenges.length === 0 && (
          <p className="text-muted-foreground text-center">No sustainability challenges available yet.</p>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Lightbulb className="mr-2 h-5 w-5" />
            Eco-Tips
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>Use reusable water bottles and coffee cups.</li>
            <li>Unplug electronics when not in use to save energy.</li>
            <li>Reduce food waste by planning meals and composting.</li>
            <li>Support local and sustainable businesses.</li>
            <li>Educate yourself and others on environmental issues.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}