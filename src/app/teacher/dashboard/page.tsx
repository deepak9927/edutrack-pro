"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  Users,
  FileText,
  TrendingUp,
  Plus,
  MessageSquare,
  Calendar,
  Star
} from "lucide-react";
import { useUser } from "@/hooks/use-user";

interface TeacherStats {
  totalCourses: number;
  totalStudents: number;
  totalAssignments: number;
  averageRating: number;
}

interface Course {
  id: string;
  title: string;
  studentCount: number;
  assignmentsCount: number;
  averageGrade: number;
}

const TeacherDashboard = () => {
  const { user } = useUser();
  const router = useRouter();
  const [stats, setStats] = useState<TeacherStats>({
    totalCourses: 0,
    totalStudents: 0,
    totalAssignments: 0,
    averageRating: 0
  });
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeacherData = async () => {
      try {
        // Mock data for demonstration - replace with actual API calls
        setStats({
          totalCourses: 5,
          totalStudents: 127,
          totalAssignments: 23,
          averageRating: 4.7
        });

        setCourses([
          {
            id: "1",
            title: "Introduction to Computer Science",
            studentCount: 45,
            assignmentsCount: 8,
            averageGrade: 85
          },
          {
            id: "2",
            title: "Data Structures and Algorithms",
            studentCount: 32,
            assignmentsCount: 6,
            averageGrade: 78
          },
          {
            id: "3",
            title: "Web Development Fundamentals",
            studentCount: 50,
            assignmentsCount: 9,
            averageGrade: 92
          }
        ]);
      } catch (error) {
        console.error("Failed to fetch teacher data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchTeacherData();
    }
  }, [user?.id]);

  if (loading) {
    return (
      <div className="p-4 sm:p-6 space-y-8">
        <div className="h-8 bg-muted rounded animate-pulse w-64"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-muted rounded-lg p-6 animate-pulse">
              <div className="h-4 bg-muted-foreground/20 rounded w-24 mb-2"></div>
              <div className="h-8 bg-muted-foreground/20 rounded w-16 mb-2"></div>
              <div className="h-3 bg-muted-foreground/20 rounded w-32"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-gray-950 dark:via-blue-950/20 dark:to-indigo-950/30">
      <div className="p-4 sm:p-6 space-y-6 sm:space-y-8 max-w-7xl mx-auto">
        {/* Header */}
        <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-6 sm:p-8 text-white shadow-2xl">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="text-3xl animate-bounce">👨‍🏫</div>
                <div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold break-words leading-tight">
                    Welcome back, {user?.name || "Professor"}!
                  </h1>
                  <p className="text-blue-100 text-sm sm:text-base mt-1 opacity-90">
                    Ready to inspire and educate today? 🎓
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Button
                variant="secondary"
                className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-200"
                onClick={() => router.push("/teacher/create-course")}
              >
                <Plus className="mr-2 h-4 w-4" />
                <span className="text-sm sm:text-base">Create Course</span>
              </Button>
              <Button
                variant="default"
                className="bg-white text-blue-600 hover:bg-blue-50 shadow-lg hover:shadow-xl transition-all duration-200 font-semibold"
                onClick={() => router.push("/communication")}
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                <span className="text-sm sm:text-base">Communicate</span>
              </Button>
            </div>
          </div>
        </header>

        {/* Stats Overview */}
        <section aria-labelledby="stats-heading" className="space-y-4">
          <h2 id="stats-heading" className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-blue-500" />
            Your Teaching Overview
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <Card className="group relative bg-white dark:bg-gray-900 border-0 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
                <CardTitle className="text-sm sm:text-base font-semibold text-blue-700 dark:text-blue-300">Total Courses</CardTitle>
                <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
                  <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="text-2xl sm:text-3xl font-bold text-blue-800 dark:text-blue-200 mb-1">
                  {stats.totalCourses}
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground font-medium">Active courses</p>
              </CardContent>
            </Card>

            <Card className="group relative bg-white dark:bg-gray-900 border-0 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-green-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
                <CardTitle className="text-sm sm:text-base font-semibold text-green-700 dark:text-green-300">Total Students</CardTitle>
                <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-lg">
                  <Users className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 dark:text-green-400" />
                </div>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="text-2xl sm:text-3xl font-bold text-green-800 dark:text-green-200 mb-1">
                  {stats.totalStudents}
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground font-medium">Enrolled students</p>
              </CardContent>
            </Card>

            <Card className="group relative bg-white dark:bg-gray-900 border-0 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-yellow-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
                <CardTitle className="text-sm sm:text-base font-semibold text-yellow-700 dark:text-yellow-300">Assignments</CardTitle>
                <div className="p-2 bg-yellow-100 dark:bg-yellow-900/50 rounded-lg">
                  <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-600 dark:text-yellow-400" />
                </div>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="text-2xl sm:text-3xl font-bold text-yellow-800 dark:text-yellow-200 mb-1">
                  {stats.totalAssignments}
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground font-medium">Created assignments</p>
              </CardContent>
            </Card>

            <Card className="group relative bg-white dark:bg-gray-900 border-0 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
                <CardTitle className="text-sm sm:text-base font-semibold text-purple-700 dark:text-purple-300">Avg. Rating</CardTitle>
                <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-lg">
                  <Star className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600 dark:text-purple-400" />
                </div>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="text-2xl sm:text-3xl font-bold text-purple-800 dark:text-purple-200 mb-1">
                  {stats.averageRating}/5
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground font-medium">Student satisfaction</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* My Courses */}
        <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-t-lg">
            <CardTitle className="text-xl sm:text-2xl font-bold flex items-center gap-2">
              <div className="p-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg">
                <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              My Courses
            </CardTitle>
            <Button variant="outline" onClick={() => router.push("/teacher/create-course")} className="border-indigo-200 hover:bg-indigo-50 dark:border-indigo-800 dark:hover:bg-indigo-900/50">
              <Plus className="mr-2 h-4 w-4" />
              Add New Course
            </Button>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid gap-4 sm:gap-6">
              {courses.map((course) => (
                <div key={course.id} className="group relative bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-indigo-200 dark:hover:border-indigo-700 overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/50 dark:to-purple-900/50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <BookOpen className="h-6 w-6 sm:h-7 sm:w-7 text-indigo-600 dark:text-indigo-400" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-lg sm:text-xl break-words text-gray-900 dark:text-gray-100 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors duration-300">
                        {course.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 mt-2">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">{course.studentCount} students</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FileText className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">{course.assignmentsCount} assignments</span>
                        </div>
                        <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200">
                          Avg: {course.averageGrade}%
                        </Badge>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <Button variant="outline" size="sm" onClick={() => router.push(`/courses/${course.id}`)}>
                        Manage Course
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button className="h-16 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300" onClick={() => router.push("/assignments")}>
            <FileText className="mr-2 h-5 w-5" />
            <span>Manage Assignments</span>
          </Button>
          <Button variant="outline" className="h-16 border-green-200 hover:bg-green-50 dark:border-green-700 dark:hover:bg-green-900/50" onClick={() => router.push("/communication")}>
            <MessageSquare className="mr-2 h-5 w-5" />
            <span>Student Communication</span>
          </Button>
          <Button variant="outline" className="h-16 border-purple-200 hover:bg-purple-50 dark:border-purple-700 dark:hover:bg-purple-900/50" onClick={() => router.push("/analytics")}>
            <TrendingUp className="mr-2 h-5 w-5" />
            <span>View Analytics</span>
          </Button>
          <Button variant="outline" className="h-16 border-yellow-200 hover:bg-yellow-50 dark:border-yellow-700 dark:hover:bg-yellow-900/50" onClick={() => router.push("/calendar")}>
            <Calendar className="mr-2 h-5 w-5" />
            <span>Schedule Sessions</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;