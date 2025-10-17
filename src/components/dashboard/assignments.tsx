"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { format, isToday, isTomorrow, isPast } from "date-fns";
import { Calendar, Clock, CheckCircle, AlertCircle } from "lucide-react";

interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  progress: number;
  priority?: "low" | "medium" | "high";
}

export function Assignments() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch assignments from API
    const fetchAssignments = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch("/api/assignments");
        const data = await response.json();
        setAssignments(data);
      } catch (error) {
        console.error("Failed to fetch assignments:", error);
        // Mock data for demonstration
        setAssignments([
          {
            id: "1",
            title: "Mathematics Assignment 1",
            description: "Complete algebra problems 1-20",
            dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
            progress: 75,
            priority: "high"
          },
          {
            id: "2",
            title: "Physics Lab Report",
            description: "Write report on pendulum experiment",
            dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
            progress: 30,
            priority: "medium"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  const getDueDateInfo = (dueDate: Date) => {
    if (isToday(dueDate)) return { text: "Due Today", color: "destructive", icon: AlertCircle };
    if (isTomorrow(dueDate)) return { text: "Due Tomorrow", color: "secondary", icon: Clock };
    if (isPast(dueDate)) return { text: "Overdue", color: "destructive", icon: AlertCircle };
    return { text: `Due ${format(dueDate, "MMM dd")}`, color: "outline", icon: Calendar };
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200";
      case "medium": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200";
      case "low": return "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-200";
    }
  };

  if (loading) {
    return (
      <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50">
        <CardHeader className="bg-gradient-to-r from-red-500/10 to-pink-500/10">
          <CardTitle className="flex items-center text-lg sm:text-xl font-bold">
            <div className="p-2 bg-red-100 dark:bg-red-900/50 rounded-lg mr-3">
              <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-red-600 dark:text-red-400" />
            </div>
            Assignments
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 animate-pulse">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-3"></div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-red-50/30 dark:from-gray-900 dark:to-red-950/20 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-red-500/10 to-pink-500/10 pb-6">
        <CardTitle className="flex items-center text-lg sm:text-xl font-bold">
          <div className="p-2 bg-red-100 dark:bg-red-900/50 rounded-lg mr-3">
            <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-red-600 dark:text-red-400" />
          </div>
          Assignments
        </CardTitle>
        <p className="text-sm text-muted-foreground mt-2">Track your upcoming tasks and deadlines</p>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {assignments.length > 0 ? (
            assignments.map((assignment) => {
              const dueInfo = getDueDateInfo(assignment.dueDate);
              const DueIcon = dueInfo.icon;

              return (
                <div key={assignment.id} className="group relative bg-white dark:bg-gray-800 rounded-xl p-4 border border-red-100 dark:border-red-800/30 hover:shadow-lg transition-all duration-300 hover:border-red-200 dark:hover:border-red-700/50 overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-400 to-pink-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-red-100 to-pink-100 dark:from-red-900/50 dark:to-pink-900/50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <CheckCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h4 className="font-bold text-base sm:text-lg break-words text-gray-900 dark:text-gray-100 group-hover:text-red-700 dark:group-hover:text-red-300 transition-colors duration-300">
                          {assignment.title}
                        </h4>
                        {assignment.priority && (
                          <Badge className={`text-xs ${getPriorityColor(assignment.priority)}`}>
                            {assignment.priority}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 break-words mb-3">{assignment.description}</p>
                      <div className="flex items-center gap-2 mb-3">
                        <DueIcon className="h-4 w-4 text-gray-500" />
                        <Badge variant={dueInfo.color as "destructive" | "secondary" | "outline"} className="text-xs">
                          {dueInfo.text}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Progress</span>
                          <span className="text-sm font-bold text-red-600 dark:text-red-400">{Math.round(assignment.progress)}%</span>
                        </div>
                        <Progress value={assignment.progress} className="h-3 bg-gray-200 dark:bg-gray-700" indicatorColor="bg-gradient-to-r from-red-500 to-pink-500" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-12">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">No assignments due</h3>
              <p className="text-muted-foreground">Great job staying on top of your work!</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
