"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, MessageSquare, Video, Award, Users } from "lucide-react";

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
      <h1 className="text-3xl font-bold">Mentor Connect</h1>
      <p className="text-muted-foreground">
        Connect with alumni and industry professionals for guidance and support.
      </p>

      {/* Available Mentors */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="mr-2 h-5 w-5" />
            Available Mentors
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {availableMentors.map((mentor) => (
            <div key={mentor.id} className="p-4 border rounded-lg">
              <h3 className="font-medium">{mentor.name}</h3>
              <p className="text-sm text-muted-foreground">
                Expertise: {mentor.expertise.join(", ")}
              </p>
              <p className="text-xs text-muted-foreground">Company: {mentor.company}</p>
              <p className="text-xs text-muted-foreground">Rating: {mentor.rating} / 5</p>
              <div className="mt-2 flex space-x-2">
                <Button variant="outline" size="sm">
                  <MessageSquare className="h-4 w-4 mr-1" /> Message
                </Button>
                <Button variant="outline" size="sm">
                  <Video className="h-4 w-4 mr-1" /> Video Call
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Schedule Mentorship Session */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Plus className="mr-2 h-5 w-5" />
            Schedule New Session
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
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
        </CardContent>
      </Card>

      {/* My Mentorship Sessions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="mr-2 h-5 w-5" />
            My Mentorship Sessions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
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
        </CardContent>
      </Card>
    </div>
  );
}