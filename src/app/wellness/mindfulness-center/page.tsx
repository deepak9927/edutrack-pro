"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Play, Pause, Timer, BookOpen, Heart } from "lucide-react";

interface MeditationSession {
  id: string;
  title: string;
  duration: number; // in minutes
  audioUrl: string;
}

interface GratitudeEntry {
  id: string;
  text: string;
  date: string;
}

const meditationSessions: MeditationSession[] = [
  {
    id: "med_1",
    title: "5-Minute Mindfulness",
    duration: 5,
    audioUrl: "/sounds/5-min-mindfulness.mp3", // Placeholder
  },
  {
    id: "med_2",
    title: "10-Minute Stress Relief",
    duration: 10,
    audioUrl: "/sounds/10-min-stress-relief.mp3", // Placeholder
  },
  {
    id: "med_3",
    title: "Deep Breathing Exercise",
    duration: 3,
    audioUrl: "/sounds/deep-breathing.mp3", // Placeholder
  },
];

export default function MindfulnessCenterPage() {
  const [currentSession, setCurrentSession] = useState<MeditationSession | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timer, setTimer] = useState(0); // seconds
  const [gratitudeEntries, setGratitudeEntries] = useState<GratitudeEntry[]>([]);
  const [newGratitudeEntry, setNewGratitudeEntry] = useState("");

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying && currentSession) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer >= currentSession.duration * 60) {
            clearInterval(interval!);
            setIsPlaying(false);
            return 0;
          }
          return prevTimer + 1;
        });
      }, 1000);
    } else if (!isPlaying && interval) {
      clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, currentSession]);

  const handlePlayPause = (session: MeditationSession) => {
    if (currentSession?.id !== session.id) {
      // New session selected
      setCurrentSession(session);
      setIsPlaying(true);
      setTimer(0);
      // In a real app, you'd play the audio here
      console.log(`Playing: ${session.title}`);
    } else {
      // Toggle play/pause for current session
      setIsPlaying(!isPlaying);
      console.log(isPlaying ? `Pausing: ${session.title}` : `Resuming: ${session.title}`);
    }
  };

  const handleAddGratitude = () => {
    if (newGratitudeEntry.trim()) {
      setGratitudeEntries([
        ...gratitudeEntries,
        {
          id: `grat_${gratitudeEntries.length + 1}`,
          text: newGratitudeEntry,
          date: new Date().toLocaleDateString(),
        },
      ]);
      setNewGratitudeEntry("");
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Mindfulness Center</h1>
      <p className="text-muted-foreground">
        Find peace and improve your focus with guided meditations and gratitude journaling.
      </p>

      {/* Meditation Sessions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Heart className="mr-2 h-5 w-5" />
            Guided Meditations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {meditationSessions.map((session) => (
            <div key={session.id} className="p-4 border rounded-lg flex items-center justify-between">
              <div>
                <h3 className="font-medium">{session.title}</h3>
                <p className="text-sm text-muted-foreground">{session.duration} minutes</p>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handlePlayPause(session)}
              >
                {currentSession?.id === session.id && isPlaying ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
              </Button>
            </div>
          ))}
          {currentSession && isPlaying && (
            <div className="flex items-center justify-center mt-4 space-x-2">
              <Timer className="h-5 w-5" />
              <span className="text-lg font-semibold">{formatTime(timer)} / {formatTime(currentSession.duration * 60)}</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Gratitude Journal */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BookOpen className="mr-2 h-5 w-5" />
            Gratitude Journal
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="gratitude-entry">What are you grateful for today?</Label>
            <Textarea
              id="gratitude-entry"
              value={newGratitudeEntry}
              onChange={(e) => setNewGratitudeEntry(e.target.value)}
              placeholder="I am grateful for..."
              rows={3}
            />
            <Button onClick={handleAddGratitude} className="mt-2 w-full">
              Add Entry
            </Button>
          </div>
          <div className="space-y-2">
            {gratitudeEntries.map((entry) => (
              <div key={entry.id} className="p-3 border rounded-lg">
                <p className="text-sm text-muted-foreground">{entry.date}</p>
                <p>{entry.text}</p>
              </div>
            ))}
            {gratitudeEntries.length === 0 && (
              <p className="text-muted-foreground text-center">No gratitude entries yet.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}