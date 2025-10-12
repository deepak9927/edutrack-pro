"use client";

import { CreateCourseForm } from "@/components/forms/create-course-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const CreateCoursePage = () => {
  return (
    <div>
      <div className="mb-4">
        <Link href="/admin/courses">
          <Button variant="ghost">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Courses
          </Button>
        </Link>
      </div>
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full p-4">
        <h2 className="text-2xl font-bold mb-4">Create New Course</h2>
        <CreateCourseForm />
      </div>
    </div>
  );
};

export default CreateCoursePage;