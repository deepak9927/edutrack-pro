"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  BookOpen, 
  Users, 
  Calendar, 
  BarChart3,
  Plus,
  Edit,
  Trash2
} from "lucide-react";
import { useParams } from "next/navigation";
import { AssignmentForm } from "@/components/forms/academic/assignment-form";

interface Course {
  id: string;
  title: string;
  description: string;
  credits: number;
}

export default function CourseDetailPage() {
  const { courseId } = useParams();

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Course Detail Page</h1>
      <p>Course ID: {courseId}</p>

      <AssignmentForm courseId={courseId as string} />
    </div>
  );
}