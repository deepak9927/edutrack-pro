"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Users, MessageSquare, CheckCircle, Award, Lightbulb } from "lucide-react";

interface SupportGroup {
  id: string;
  name: string;
  description: string;
  members: number;
}

interface RecoveryMilestone {
  id: string;
  title: string;
  date: string;
  achieved: boolean;
}

export default function AddictionSupportPage() {
  const [supportGroups, setSupportGroups] = useState<SupportGroup[]>([
    {
      id: "group_1",
      name: "Digital Wellness Warriors",
      description: "A safe space to discuss digital addiction and recovery strategies.",
      members: 15,
    },
    {
      id: "group_2",
      name: "Study-Life Balance Seekers",
      description: "Share tips and support for maintaining a healthy balance.",
      members: 22,
    },
  ]);

  const [recoveryMilestones, setRecoveryMilestones] = useState<RecoveryMilestone[]>([
    {
      id: "milestone_1",
      title: "1 Week Digital Detox",
      date: "2023-09-28",
      achieved: true,
    },
    {
      id: "milestone_2",
      title: "30 Days Social Media Free",
      date: "2023-10-28",
      achieved: false,
    },
  ]);

  const [newMilestoneTitle, setNewMilestoneTitle] = useState("");

  const handleAddMilestone = () => {
    if (newMilestoneTitle.trim()) {
      setRecoveryMilestones([
        ...recoveryMilestones,
        {
          id: `milestone_${recoveryMilestones.length + 1}`,
          title: newMilestoneTitle,
          date: new Date().toISOString().split("T")[0],
          achieved: false,
        },
      ]);
      setNewMilestoneTitle("");
    }
  };

  const handleToggleMilestone = (id: string) => {
    setRecoveryMilestones(
      recoveryMilestones.map((milestone) =>
        milestone.id === id ? { ...milestone, achieved: !milestone.achieved } : milestone
      )
    );
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Addiction Recovery & Wellness</h1>
      <p className="text-muted-foreground">
        Find support, track your recovery, and build healthy habits.
      </p>

      {/* Anonymous Peer Support Groups */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="mr-2 h-5 w-5" />
            Anonymous Peer Support Groups
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {supportGroups.map((group) => (
            <div key={group.id} className="p-4 border rounded-lg flex items-center justify-between">
              <div>
                <h3 className="font-medium">{group.name}</h3>
                <p className="text-sm text-muted-foreground">{group.description}</p>
                <p className="text-xs text-muted-foreground">{group.members} members</p>
              </div>
              <Button variant="outline" size="sm">
                <MessageSquare className="h-4 w-4 mr-1" /> Join Group
              </Button>
            </div>
          ))}
          {supportGroups.length === 0 && (
            <p className="text-muted-foreground text-center">No support groups available yet.</p>
          )}
        </CardContent>
      </Card>

      {/* Recovery Milestones */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="mr-2 h-5 w-5" />
            My Recovery Milestones
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="new-milestone">New Milestone</Label>
            <div className="flex space-x-2">
              <Input
                id="new-milestone"
                placeholder="e.g., 7 days without social media"
                value={newMilestoneTitle}
                onChange={(e) => setNewMilestoneTitle(e.target.value)}
              />
              <Button onClick={handleAddMilestone}>Add</Button>
            </div>
          </div>
          <div className="space-y-2">
            {recoveryMilestones.map((milestone) => (
              <div key={milestone.id} className="p-3 border rounded-lg flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleToggleMilestone(milestone.id)}
                    className={milestone.achieved ? "text-green-500" : "text-gray-400"}
                  >
                    <CheckCircle className="h-5 w-5" />
                  </Button>
                  <div>
                    <h3 className="font-medium">{milestone.title}</h3>
                    <p className="text-sm text-muted-foreground">{milestone.date}</p>
                  </div>
                </div>
                {milestone.achieved && (
                  <span className="text-xs text-green-600 font-semibold">Achieved!</span>
                )}
              </div>
            ))}
            {recoveryMilestones.length === 0 && (
              <p className="text-muted-foreground text-center">No milestones set yet.</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Healthy Alternatives & Focus Enhancement */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Lightbulb className="mr-2 h-5 w-5" />
            Healthy Alternatives & Focus
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Productive Activity Suggestions:</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Read a book or an article related to your studies.</li>
              <li>Go for a short walk or do some light exercises.</li>
              <li>Practice mindfulness meditation for 5-10 minutes.</li>
              <li>Learn a new skill or language online.</li>
              <li>Connect with a friend or family member.</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-2">Focus Enhancement Techniques:</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Implement the Pomodoro Technique (25 mins focus, 5 mins break).</li>
              <li>Use distraction blocker apps during study sessions.</li>
              <li>Create a dedicated "deep work" environment.</li>
              <li>Listen to instrumental music or white noise to improve concentration.</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}