"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  Calendar, 
  FileText, 
  Upload,
  CheckCircle,
  Clock,
  AlertCircle
} from "lucide-react";

interface Assignment {
  id: string;
  title: string;
  description: string;
  courseId: string;
  courseTitle: string;
  dueDate: Date;
  status: "pending" | "submitted" | "graded";
  grade?: number;
  maxGrade: number;
  attachments?: string[];
}

export default function AssignmentsPage() {
  const [assignments, setAssignments] = useState<Assignment[]>([
    {
      id: "assign_1",
      title: "Introduction to Python",
      description: "Complete exercises 1-10 from Chapter 1",
      courseId: "course_1",
      courseTitle: "Introduction to Programming",
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
      status: "pending",
      maxGrade: 100
    },
    {
      id: "assign_2",
      title: "Data Structures Project",
      description: "Implement a binary search tree with insertion and deletion",
      courseId: "course_2",
      courseTitle: "Data Structures",
      dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      status: "submitted",
      maxGrade: 100
    },
    {
      id: "assign_3",
      title: "Algorithm Analysis",
      description: "Analyze the time complexity of sorting algorithms",
      courseId: "course_2",
      courseTitle: "Data Structures",
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      status: "pending",
      maxGrade: 100
    }
  ]);
  
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [submissionText, setSubmissionText] = useState("");

  const handleSubmission = (assignmentId: string) => {
    setAssignments(assignments.map(assignment => 
      assignment.id === assignmentId 
        ? { ...assignment, status: "submitted", grade: undefined } 
        : assignment
    ));
    
    if (selectedAssignment && selectedAssignment.id === assignmentId) {
      setSelectedAssignment({ ...selectedAssignment, status: "submitted", grade: undefined });
    }
    
    setSubmissionText("");
  };

  const getStatusIcon = (status: Assignment["status"]) => {
    switch (status) {
      case "pending": return <Clock className="h-4 w-4 text-yellow-500" />;
      case "submitted": return <CheckCircle className="h-4 w-4 text-blue-500" />;
      case "graded": return <CheckCircle className="h-4 w-4 text-green-500" />;
      default: return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusText = (status: Assignment["status"]) => {
    switch (status) {
      case "pending": return "Pending";
      case "submitted": return "Submitted";
      case "graded": return "Graded";
      default: return "Unknown";
    }
  };

  const getDaysUntilDue = (dueDate: Date) => {
    const today = new Date();
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">My Assignments</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Assignment List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Assignment List
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {assignments.map((assignment) => {
                  const daysUntilDue = getDaysUntilDue(assignment.dueDate);
                  const isOverdue = daysUntilDue < 0;
                  
                  return (
                    <div 
                      key={assignment.id} 
                      className={`p-4 border rounded-lg cursor-pointer hover:bg-accent ${
                        selectedAssignment?.id === assignment.id ? "bg-accent" : ""
                      }`}
                      onClick={() => setSelectedAssignment(assignment)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{assignment.title}</h3>
                          <p className="text-sm text-muted-foreground">{assignment.courseTitle}</p>
                          <div className="flex items-center mt-1">
                            {getStatusIcon(assignment.status)}
                            <span className="text-xs ml-1">{getStatusText(assignment.status)}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`text-xs ${isOverdue ? "text-red-500" : "text-muted-foreground"}`}>
                            {isOverdue ? `${Math.abs(daysUntilDue)} days overdue` : `${daysUntilDue} days left`}
                          </p>
                          {assignment.grade !== undefined && (
                            <p className="text-xs font-medium">
                              Grade: {assignment.grade}/{assignment.maxGrade}
                            </p>
                          )}
                        </div>
                      </div>
                      {assignment.status === "graded" && assignment.grade !== undefined && (
                        <div className="mt-2">
                          <Progress value={(assignment.grade / assignment.maxGrade) * 100} className="h-1" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Assignment Details */}
        <div className="lg:col-span-2">
          {selectedAssignment ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-start">
                  <span>{selectedAssignment.title}</span>
                  <div className="flex items-center">
                    {getStatusIcon(selectedAssignment.status)}
                    <span className="text-sm ml-1">{getStatusText(selectedAssignment.status)}</span>
                  </div>
                </CardTitle>
                <p className="text-muted-foreground">{selectedAssignment.courseTitle}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Description</h3>
                    <p>{selectedAssignment.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Due Date</h3>
                      <p>{selectedAssignment.dueDate.toDateString()}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-2">Max Grade</h3>
                      <p>{selectedAssignment.maxGrade}</p>
                    </div>
                  </div>
                  
                  {selectedAssignment.status === "graded" && selectedAssignment.grade !== undefined && (
                    <div>
                      <h3 className="text-lg font-medium mb-2">Grade</h3>
                      <div className="flex items-center">
                        <span className="text-2xl font-bold">{selectedAssignment.grade}/{selectedAssignment.maxGrade}</span>
                        <Progress 
                          value={(selectedAssignment.grade / selectedAssignment.maxGrade) * 100} 
                          className="ml-4 flex-1 h-2" 
                        />
                      </div>
                    </div>
                  )}
                  
                  {selectedAssignment.status === "pending" && (
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-medium mb-2">Submission</h3>
                        <textarea
                          className="w-full p-3 border rounded-lg"
                          rows={5}
                          placeholder="Enter your assignment solution here..."
                          value={submissionText}
                          onChange={(e) => setSubmissionText(e.target.value)}
                        />
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          onClick={() => handleSubmission(selectedAssignment.id)}
                          disabled={!submissionText.trim()}
                        >
                          <Upload className="mr-2 h-4 w-4" />
                          Submit Assignment
                        </Button>
                        <Button variant="outline">
                          <FileText className="mr-2 h-4 w-4" />
                          Upload File
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {selectedAssignment.status === "submitted" && (
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 text-blue-500 mr-2" />
                        <span>Your assignment has been submitted and is awaiting grading.</span>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center h-64">
                <p className="text-muted-foreground">Select an assignment to view details</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}