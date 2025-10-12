"use client";

import { useState } from "react";
import { Task } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { PlusCircle, Trash2 } from "lucide-react";

// This is the main component for our Study Planner page.
export default function StudyPlannerPage() {
  // We use `useState` to manage the list of tasks.
  // Initially, we'll have a few example tasks.
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: "Read Chapter 3 of History", completed: false },
    { id: 2, text: "Complete Math assignment", completed: true },
    { id: 3, text: "Prepare for Physics quiz", completed: false },
  ]);

  // This state will hold the text for the new task being added.
  const [newTaskText, setNewTaskText] = useState("");

  // Function to add a new task to the list.
  const handleAddTask = () => {
    // Don't add empty tasks.
    if (newTaskText.trim() === "") return;

    const newTask: Task = {
      id: Date.now(), // Use a timestamp for a unique ID.
      text: newTaskText,
      completed: false,
    };

    // Add the new task to the existing list and clear the input field.
    setTasks([...tasks, newTask]);
    setNewTaskText("");
  };

  // Function to toggle the 'completed' status of a task.
  const handleToggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Function to delete a task.
  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">My Study Planner</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2 mb-4">
            <Input
              type="text"
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              placeholder="Add a new study task..."
              onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
            />
            <Button onClick={handleAddTask}><PlusCircle className="h-4 w-4 mr-2" /> Add Task</Button>
          </div>
          <div className="space-y-2">
            {tasks.map((task) => (
              <div key={task.id} className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
                <Checkbox id={`task-${task.id}`} checked={task.completed} onCheckedChange={() => handleToggleTask(task.id)} />
                <label htmlFor={`task-${task.id}`} className={`flex-grow ${task.completed ? 'line-through text-gray-500' : ''}`}>{task.text}</label>
                <Button variant="ghost" size="icon" onClick={() => handleDeleteTask(task.id)}><Trash2 className="h-4 w-4 text-red-500" /></Button>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
            <p className="text-sm text-gray-500">{tasks.filter(t => !t.completed).length} tasks remaining</p>
        </CardFooter>
      </Card>
    </div>
  );
}

