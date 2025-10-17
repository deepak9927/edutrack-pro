"use client";

import { useParams } from "next/navigation";
import { AssignmentForm } from "@/components/forms/academic/assignment-form";


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