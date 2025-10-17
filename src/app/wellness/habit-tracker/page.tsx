"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle, Plus, Flame, Trash2 } from "lucide-react";

interface Habit {
  id: string;
  name: string;
  streak: number;
  lastCompleted: string | null;
}

export default function HabitTrackerPage() {
  const [habits, setHabits] = useState<Habit[]>([
    {
      id: "habit_1",
      name: "Drink 8 glasses of water",
      streak: 5,
      lastCompleted: "2023-10-03",
    },
    {
      id: "habit_2",
      name: "Study for 2 hours",
      streak: 3,
      lastCompleted: "2023-10-02",
    },
    {
      id: "habit_3",
      name: "Meditate for 10 minutes",
      streak: 0,
      lastCompleted: null,
    },
  ]);

  const [newHabitName, setNewHabitName] = useState("");

  const handleAddHabit = () => {
    if (newHabitName.trim()) {
      setHabits([
        ...habits,
        {
          id: `habit_${habits.length + 1}`,
          name: newHabitName,
          streak: 0,
          lastCompleted: null,
        },
      ]);
      setNewHabitName("");
    }
  };

  const handleToggleCompletion = (id: string) => {
    const today = new Date().toISOString().split("T")[0];
    setHabits(
      habits.map((habit) => {
        if (habit.id === id) {
          const isCompletedToday = habit.lastCompleted === today;
          if (isCompletedToday) {
            // Unmark completion
            return {
              ...habit,
              streak: habit.streak > 0 ? habit.streak - 1 : 0,
              lastCompleted: null,
            };
          } else {
            // Mark completion
            return {
              ...habit,
              streak: habit.lastCompleted ? habit.streak + 1 : 1,
              lastCompleted: today as string | null,
            };
          }
        }
        return habit;
      })
    );
  };

  const handleDeleteHabit = (id: string) => {
    setHabits(habits.filter((habit) => habit.id !== id));
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Habit Tracker</h1>
      <p className="text-muted-foreground">
        Build positive habits and track your progress.
      </p>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Plus className="mr-2 h-5 w-5" />
            Add New Habit
          </CardTitle>
        </CardHeader>
        <CardContent className="flex space-x-2">
          <Input
            placeholder="e.g., Read 30 minutes"
            value={newHabitName}
            onChange={(e) => setNewHabitName(e.target.value)}
          />
          <Button onClick={handleAddHabit}>Add Habit</Button>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {habits.map((habit) => {
          const isCompletedToday = habit.lastCompleted === new Date().toISOString().split("T")[0];
          return (
            <Card key={habit.id} className="p-4 border rounded-lg flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleToggleCompletion(habit.id)}
                  className={isCompletedToday ? "text-green-500" : "text-gray-400"}
                >
                  <CheckCircle className="h-6 w-6" />
                </Button>
                <div>
                  <h3 className="font-medium">{habit.name}</h3>
                  <p className="text-sm text-muted-foreground flex items-center">
                    <Flame className="h-4 w-4 mr-1 text-orange-500" />
                    {habit.streak} day streak
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={() => handleDeleteHabit(habit.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </Card>
          );
        })}
        {habits.length === 0 && (
          <p className="text-muted-foreground text-center">No habits added yet. Start building one!</p>
        )}
      </div>
    </div>
  );
}
