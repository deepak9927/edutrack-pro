"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, MessageSquare, Video, Award, Users, CheckCircle, XCircle, Lightbulb } from "lucide-react";

interface Mentor {
  id: string;
  name: string;
  expertise: string[];
  company: string;
  rating: number;
}

interface MentorshipSession {
  id: string;
  mentorId: string;
  mentorName: string;
  topic: string;
  date: string;
  status: "scheduled" | "completed" | "cancelled";
}

const availableMentors: Mentor[] = [
  {
    id: "mentor_1",
    name: "Dr. Emily White",
    expertise: ["Data Science", "Machine Learning", "Python"],
    company: "Tech Innovations Inc.",
    rating: 4.8,
  },
  {
    id: "mentor_2",
    name: "Mr. David Green",
    expertise: ["Web Development", "React", "Node.js", "UI/UX"],
    company: "Creative Solutions Co.",
    rating: 4.5,
  },
  {
    id: "mentor_3",
    name: "Ms. Sarah Blue",
    expertise: ["Digital Marketing", "SEO", "Content Strategy"],
    company: "Growth Marketing Agency",
    rating: 4.9,
  },
];

export default function MentorConnectPage() {
  const [mentorshipSessions, setMentorshipSessions] = useState<MentorshipSession[]>([]);
  const [selectedMentorId, setSelectedMentorId] = useState<string>("");
  const [sessionTopic, setSessionTopic] = useState("");
  const [sessionDate, setSessionDate] = useState("");

  const handleScheduleSession = () => {
    const selectedMentor = availableMentors.find(m => m.id === selectedMentorId);
    if (selectedMentor && sessionTopic && sessionDate) {
      setMentorshipSessions([
        ...mentorshipSessions,
        {
          id: `session_${mentorshipSessions.length + 1}`,
          mentorId: selectedMentor.id,
          mentorName: selectedMentor.name,
          topic: sessionTopic,
          date: sessionDate,
          status: "scheduled",
        },
      ]);
      setSelectedMentorId("");
      setSessionTopic("");
      setSessionDate("");
      alert("Mentorship session scheduled successfully!");
    } else {
      alert("Please fill in all session details.");
    }
  };

  const handleCancelSession = (id: string) => {
    setMentorshipSessions(
      mentorshipSessions.map((session) =>
        session.id === id ? { ...session, status: "cancelled" } : session
      )
    );
  };

  const handleCompleteSession = (id: string) => {
    setMentorshipSessions(
      mentorshipSessions.map((session) =>
        session.id === id ? { ...session, status: "completed" } : session
      )
    );
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">AI-Powered Mentor Connect</h1>
      <p className="text-muted-foreground">
        Advanced algorithms pairing students with ideal mentors, video mentorship, goal tracking, and mock interviews.
      </p>

      {/* Intelligent Matching & Industry Expert Database */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="mr-2 h-5 w-5" />
            Find Your Ideal Mentor
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Our advanced algorithms intelligently match you with mentors from our database of 500+ industry experts.
          </p>
          <Button className="w-full">Discover Mentors</Button>
          <div className="space-y-2">
            <h3 className="font-medium">Featured Mentors:</h3>
            {availableMentors.map((mentor) => (
              <div key={mentor.id} className="p-3 border rounded-lg">
                <h4 className="font-medium">{mentor.name}</h4>
                <p className="text-sm text-muted-foreground">
                  Expertise: {mentor.expertise.join(", ")}
                </p>
                <p className="text-xs text-muted-foreground">Company: {mentor.company}</p>
                <p className="text-xs text-muted-foreground">Rating: {mentor.rating} / 5</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Video Mentorship Platform */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Video className="mr-2 h-5 w-5" />
            Video Mentorship Platform
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Engage in built-in video calls with session recording and notes.
          </p>
          <Button className="w-full">Start a Video Call</Button>
        </CardContent>
      </Card>

      {/* Goal Tracking System */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="mr-2 h-5 w-5" />
            Goal Tracking System
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Collaborative objective setting with milestone celebrations.
          </p>
          <Button className="w-full">Set New Goal</Button>
          {/* Placeholder for goal list */}
          <div className="mt-4 p-4 bg-gray-100 rounded-md">
            <p className="text-lg font-semibold">Current Goal: Land a Tech Internship</p>
            <p>Milestones: Resume Review (Completed), Mock Interview (Pending)</p>
          </div>
        </CardContent>
      </Card>

      {/* Mock Interview Engine */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageSquare className="mr-2 h-5 w-5" /> {/* Using MessageSquare as placeholder */}
            Mock Interview Engine
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            AI-powered practice with real-time feedback and improvement tips.
          </p>
          <Button className="w-full">Start Mock Interview</Button>
        </CardContent>
      </Card>

      {/* Career Path Visualization */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Lightbulb className="mr-2 h-5 w-5" /> {/* Using Lightbulb as placeholder */}
            Career Path Visualization
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Interactive journey mapping with industry insights.
          </p>
          <Button className="w-full">View Career Paths</Button>
        </CardContent>
      </Card>

      {/* My Mentorship Sessions (Existing functionality, adapted) */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Plus className="mr-2 h-5 w-5" />
            My Mentorship Sessions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Schedule and manage your mentorship sessions.
          </p>
          <div>
            <Label htmlFor="mentor-select">Select Mentor</Label>
            <Select onValueChange={setSelectedMentorId} value={selectedMentorId}>
              <SelectTrigger id="mentor-select">
                <SelectValue placeholder="Choose a mentor" />
              </SelectTrigger>
              <SelectContent>
                {availableMentors.map((mentor) => (
                  <SelectItem key={mentor.id} value={mentor.id}>
                    {mentor.name} ({mentor.expertise[0]})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="session-topic">Session Topic</Label>
            <Input
              id="session-topic"
              value={sessionTopic}
              onChange={(e) => setSessionTopic(e.target.value)}
              placeholder="e.g., Career Path Guidance, Project Review"
            />
          </div>
          <div>
            <Label htmlFor="session-date">Date & Time</Label>
            <Input
              id="session-date"
              type="datetime-local"
              value={sessionDate}
              onChange={(e) => setSessionDate(e.target.value)}
            />
          </div>
          <Button onClick={handleScheduleSession} className="w-full">
            Schedule Session
          </Button>
          <div className="space-y-2 mt-4">
            {mentorshipSessions.length > 0 ? (
              mentorshipSessions.map((session) => (
                <div key={session.id} className="p-4 border rounded-lg flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{session.topic}</h3>
                    <p className="text-sm text-muted-foreground">Mentor: {session.mentorName}</p>
                    <p className="text-xs text-muted-foreground">Date: {new Date(session.date).toLocaleString()}</p>
                    <p className={`text-xs font-semibold ${
                      session.status === "scheduled" ? "text-blue-500" :
                      session.status === "completed" ? "text-green-500" :
                      "text-red-500"
                    }`}>
                      Status: {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    {session.status === "scheduled" && (
                      <>
                        <Button variant="outline" size="sm" onClick={() => handleCompleteSession(session.id)}>
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleCancelSession(session.id)}>
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-center">No mentorship sessions scheduled yet.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}