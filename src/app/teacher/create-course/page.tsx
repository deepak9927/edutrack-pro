"use client";

import { CreateCourseForm } from "@/components/forms/create-course-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Plus } from "lucide-react";

export default function CreateCoursePage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-gray-950 dark:via-blue-950/20 dark:to-indigo-950/30">
      <div className="p-4 sm:p-6 space-y-6 sm:space-y-8 max-w-4xl mx-auto">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/50 dark:to-purple-900/50 rounded-xl">
              <Plus className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100">
                Create New Course
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
                Design and launch your course curriculum
              </p>
            </div>
          </div>
        </div>

        <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50">
          <CardHeader className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 pb-6">
            <CardTitle className="flex items-center text-xl sm:text-2xl font-bold">
              <div className="p-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg mr-3">
                <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              Course Information
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-2">
              Fill in the details below to create your new course
            </p>
          </CardHeader>
          <CardContent className="p-6">
            <CreateCourseForm />
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center mx-auto mb-3">
                <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">Course Structure</h3>
              <p className="text-sm text-blue-700 dark:text-blue-300">Organize your content into chapters and modules</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/50 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Plus className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-semibold text-green-900 dark:text-green-100 mb-1">Assignments</h3>
              <p className="text-sm text-green-700 dark:text-green-300">Create quizzes, projects, and assessments</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 rounded-lg flex items-center justify-center mx-auto mb-3">
                <BookOpen className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-1">Student Progress</h3>
              <p className="text-sm text-purple-700 dark:text-purple-300">Track and analyze student performance</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}