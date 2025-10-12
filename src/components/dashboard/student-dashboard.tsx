"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation"; // Import useRouter
import { 
  BookOpen, 
  Trophy, 
  Flame, 
  Calendar, 
  MessageSquare, 
  TrendingUp,
  Target,
  Star
} from "lucide-react";
import { useUser } from "@/hooks/use-user";
import { usePerformance } from "@/hooks/usePerformance";
import { getDashboardCourses } from "@/actions/get-dashboard-courses";
import { getStudyStreak } from "@/actions/get-study-streak";
import { getRecentAchievements } from "@/actions/get-recent-achievements";
import { getAcademicAnalytics } from "@/actions/get-academic-analytics";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import dynamic from "next/dynamic";

// Lazy load heavy components for better performance
const Assignments = dynamic(() => import("@/components/dashboard/assignments").then(mod => ({ default: mod.Assignments })), {
  loading: () => <div className="h-32 bg-muted rounded animate-pulse-subtle flex items-center justify-center">Loading assignments...</div>
});

interface Course {
  id: string;
  title: string;
  progress: number;
  chapters: { id: string; title: string }[];
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  unlockedAt: Date;
  points: number;
}

interface AnalyticsData {
  date: string;
  studyHours: number;
  assignmentsCompleted: number;
  averageScore: number;
}

const motivationalQuotes = [
  "The only way to do great work is to love what you do.",
  "Success is not final, failure is not fatal: it is the courage to continue that counts.",
  "The future belongs to those who believe in the beauty of their dreams.",
  "Don't watch the clock; do what it does. Keep going.",
  "The best way to predict the future is to create it.",
];

export function StudentDashboard() {
  const { user } = useUser();
  const router = useRouter();
  const { logMetrics } = usePerformance();
  const [courses, setCourses] = useState<Course[]>([]);
  const [studyStreak, setStudyStreak] = useState(0);
  const [recentAchievements, setRecentAchievements] = useState<Achievement[]>([]);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData[]>([]);
  const [loading, setLoading] = useState(true);
  const [motivationalQuote, setMotivationalQuote] = useState("");

  useEffect(() => {
    // Set a random motivational quote on component mount
    const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)] || "Keep learning and growing!";
    setMotivationalQuote(randomQuote);

    const fetchData = async () => {
      try {
        const [coursesData, streakData, achievementsData, analyticsData] = await Promise.all([
          getDashboardCourses(user?.id),
          getStudyStreak(user?.id),
          getRecentAchievements(user?.id),
          getAcademicAnalytics(user?.id)
        ]);
        
        setCourses(coursesData);
        setStudyStreak(streakData);
        setRecentAchievements(achievementsData);
        setAnalyticsData(analyticsData);
        console.log("Courses Data:", coursesData);
        console.log("Streak Data:", streakData);
        console.log("Achievements Data:", achievementsData);
        console.log("Analytics Data:", analyticsData);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
        // Could add toast notification here for error feedback
      } finally {
        setLoading(false);
        // Log performance metrics after initial load
        setTimeout(() => logMetrics(), 1000);
      }
    };
    if (user?.id) {
      console.log("Fetching data for user ID:", user.id);
      fetchData();
    } else {
      console.log("User ID is not available.");
    }
  }, [user?.id]);


  if (loading) {
    return (
      <div className="p-4 sm:p-6 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-3">
            <div className="h-8 bg-muted rounded animate-pulse-subtle w-64"></div>
            <div className="h-4 bg-muted rounded animate-pulse-subtle w-48"></div>
          </div>
          <div className="h-10 bg-muted rounded animate-pulse-subtle w-40"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-muted rounded-lg p-6 animate-pulse-subtle">
              <div className="h-4 bg-muted-foreground/20 rounded w-24 mb-2"></div>
              <div className="h-8 bg-muted-foreground/20 rounded w-16 mb-2"></div>
              <div className="h-3 bg-muted-foreground/20 rounded w-32"></div>
            </div>
          ))}
        </div>

        <div className="bg-muted rounded-lg p-6 animate-pulse-subtle h-80">
          <div className="h-6 bg-muted-foreground/20 rounded w-48 mb-4"></div>
          <div className="space-y-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-4 bg-muted-foreground/20 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-gray-950 dark:via-blue-950/20 dark:to-indigo-950/30" role="main" aria-label="Student Dashboard">
      <div className="p-4 sm:p-6 space-y-6 sm:space-y-8 max-w-7xl mx-auto">
      <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-6 sm:p-8 text-white shadow-2xl animate-gradient-x">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/15 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-spin-slow"></div>

        <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="text-3xl animate-bounce">👋</div>
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold break-words leading-tight">
                  Good {new Date().getHours() < 12 ? "Morning" : new Date().getHours() < 18 ? "Afternoon" : "Evening"}, {user?.name || "Champion"}!
                </h1>
                <p className="text-blue-100 text-sm sm:text-base mt-1 opacity-90">
                  Ready to conquer your goals today? 🚀
                </p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mt-4 border border-white/20">
              <p className="text-sm sm:text-base italic text-blue-50 leading-relaxed" aria-live="polite">
                "{motivationalQuote}"
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Button
              variant="secondary"
              className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-200"
              aria-label="View your achievements"
              onClick={() => router.push("/achievements")}
            >
              <Trophy className="mr-2 h-4 w-4" aria-hidden="true" />
              <span className="text-sm sm:text-base">Achievements</span>
            </Button>
            <Button
              variant="default"
              className="bg-white text-blue-600 hover:bg-blue-50 shadow-lg hover:shadow-xl transition-all duration-200 font-semibold"
              aria-label="Schedule a new study session"
            >
              <Calendar className="mr-2 h-4 w-4" aria-hidden="true" />
              <span className="text-sm sm:text-base">Schedule Session</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Quick Stats Overview */}
      <section aria-labelledby="stats-heading" className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 id="stats-heading" className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-blue-500" />
            Your Progress Overview
          </h2>
          <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            Live Updates
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
           <Card className="group relative bg-white dark:bg-gray-900 border-0 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
             <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-500"></div>
             <CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
               <CardTitle className="text-sm sm:text-base font-semibold text-blue-700 dark:text-blue-300">Total Courses</CardTitle>
               <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50 transition-colors duration-300">
                 <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 dark:text-blue-400" aria-hidden="true" />
               </div>
             </CardHeader>
             <CardContent className="relative z-10">
               <div className="text-2xl sm:text-3xl font-bold text-blue-800 dark:text-blue-200 mb-1" aria-label={`${courses.length} courses enrolled`}>
                 {courses.length}
               </div>
               <p className="text-xs sm:text-sm text-muted-foreground font-medium">Enrolled in</p>
             </CardContent>
           </Card>

           <Card className="group relative bg-white dark:bg-gray-900 border-0 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-green-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
             <div className="absolute top-0 right-0 w-20 h-20 bg-green-500/10 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-500"></div>
             <CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
               <CardTitle className="text-sm sm:text-base font-semibold text-green-700 dark:text-green-300">Study Streak</CardTitle>
               <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-lg group-hover:bg-green-200 dark:group-hover:bg-green-800/50 transition-colors duration-300">
                 <Flame className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 dark:text-green-400 animate-pulse" aria-hidden="true" />
               </div>
             </CardHeader>
             <CardContent className="relative z-10">
               <div className="text-2xl sm:text-3xl font-bold text-green-800 dark:text-green-200 mb-1" aria-label={`${studyStreak} day study streak`}>
                 {studyStreak} <span className="text-lg">days</span>
               </div>
               <p className="text-xs sm:text-sm text-muted-foreground font-medium">Keep up the great work!</p>
             </CardContent>
           </Card>

           <Card className="group relative bg-white dark:bg-gray-900 border-0 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-yellow-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
             <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-500/10 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-500"></div>
             <CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
               <CardTitle className="text-sm sm:text-base font-semibold text-yellow-700 dark:text-yellow-300">Achievements</CardTitle>
               <div className="p-2 bg-yellow-100 dark:bg-yellow-900/50 rounded-lg group-hover:bg-yellow-200 dark:group-hover:bg-yellow-800/50 transition-colors duration-300">
                 <Trophy className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-600 dark:text-yellow-400" aria-hidden="true" />
               </div>
             </CardHeader>
             <CardContent className="relative z-10">
               <div className="text-2xl sm:text-3xl font-bold text-yellow-800 dark:text-yellow-200 mb-1" aria-label={`${recentAchievements.length} achievements unlocked`}>
                 {recentAchievements.length}
               </div>
               <p className="text-xs sm:text-sm text-muted-foreground font-medium">New milestones await</p>
             </CardContent>
           </Card>

           <Card className="group relative bg-white dark:bg-gray-900 border-0 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
             <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/10 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-500"></div>
             <CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
               <CardTitle className="text-sm sm:text-base font-semibold text-purple-700 dark:text-purple-300">Avg. Score</CardTitle>
               <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-lg group-hover:bg-purple-200 dark:group-hover:bg-purple-800/50 transition-colors duration-300">
                 <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600 dark:text-purple-400" aria-hidden="true" />
               </div>
             </CardHeader>
             <CardContent className="relative z-10">
               <div className="text-2xl sm:text-3xl font-bold text-purple-800 dark:text-purple-200 mb-1" aria-label={`Average score ${(analyticsData && analyticsData.length > 0) ? Math.round((analyticsData[analyticsData.length - 1] as AnalyticsData).averageScore) : 0} percent`}>
                 {(analyticsData && analyticsData.length > 0) ?
                   `${Math.round((analyticsData[analyticsData.length - 1] as AnalyticsData).averageScore)}%` :
                   "0%"}
               </div>
               <p className="text-xs sm:text-sm text-muted-foreground font-medium">Based on recent submissions</p>
             </CardContent>
           </Card>
         </div>

        {/* Progress Celebration */}
        {studyStreak > 0 && (
          <div className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-700 hover:bg-gradient-to-r hover:from-yellow-50 hover:to-orange-50 dark:hover:from-yellow-950/30 dark:hover:to-orange-950/30 hover:border-yellow-200/50 dark:hover:border-yellow-800/50 transition-all duration-200">
            <div className="flex items-center gap-3">
              <div className="text-2xl animate-bounce">🎉</div>
              <div>
                <h3 className="font-semibold text-yellow-800 dark:text-yellow-200">
                  {studyStreak >= 7 ? "Week Warrior!" : studyStreak >= 3 ? "Consistency Champion!" : "Great Start!"}
                </h3>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  {studyStreak} day streak! Keep the momentum going! 🔥
                </p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* My Courses Section */}
       <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50">
         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-t-lg">
           <CardTitle className="text-xl sm:text-2xl font-bold flex items-center gap-2">
             <div className="p-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg">
               <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-600 dark:text-indigo-400" />
             </div>
             My Courses
           </CardTitle>
           <Button variant="outline" onClick={() => router.push("/courses")} className="text-sm sm:text-base border-indigo-200 hover:bg-indigo-50 dark:border-indigo-800 dark:hover:bg-indigo-900/50">
             View All Courses →
           </Button>
         </CardHeader>
         <CardContent className="p-6">
           <div className="grid gap-4 sm:gap-6">
             {courses.length > 0 ? (
               courses.map((course, index) => (
                 <div key={course.id} className="group relative bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-indigo-200 dark:hover:border-indigo-700 overflow-hidden">
                   <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                   <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                     <div className="flex-shrink-0">
                       <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/50 dark:to-purple-900/50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                         <BookOpen className="h-6 w-6 sm:h-7 sm:w-7 text-indigo-600 dark:text-indigo-400" />
                       </div>
                     </div>
                     <div className="flex-1 min-w-0">
                       <h3 className="font-bold text-lg sm:text-xl break-words text-gray-900 dark:text-gray-100 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors duration-300">{course.title}</h3>
                       <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                         {course.chapters.length} Chapters • Interactive Learning
                       </p>
                     </div>
                     <div className="w-full sm:w-1/3 flex-shrink-0 space-y-2">
                       <div className="flex justify-between items-center">
                         <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Progress</span>
                         <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">{Math.round(course.progress)}%</span>
                       </div>
                       <Progress value={course.progress} className="h-3 bg-gray-200 dark:bg-gray-700" indicatorColor="bg-gradient-to-r from-indigo-500 to-purple-500" />
                       <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                         {course.progress < 25 ? "Just started" : course.progress < 50 ? "Making progress" : course.progress < 75 ? "Halfway there" : course.progress < 100 ? "Almost done" : "Completed!"}
                       </p>
                     </div>
                   </div>
                 </div>
               ))
             ) : (
               <div className="text-center py-12 sm:py-16">
                 <div className="w-20 h-20 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-full flex items-center justify-center mb-4">
                   <BookOpen className="h-10 w-10 text-gray-400" />
                 </div>
                 <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">No courses enrolled yet</h3>
                 <p className="text-muted-foreground mb-6">Start your learning journey and unlock your potential!</p>
                 <Button onClick={() => router.push("/courses")} className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600">
                   Browse Courses
                 </Button>
               </div>
             )}
           </div>
         </CardContent>
       </Card>

      {/* Academic Analytics Chart */}
       <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-blue-50/30 dark:from-gray-900 dark:to-blue-950/20 overflow-hidden">
         <CardHeader className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 pb-6">
           <CardTitle className="flex items-center text-lg sm:text-xl font-bold">
             <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg mr-3">
               <Target className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 dark:text-blue-400" />
             </div>
             Study Progress Analytics
           </CardTitle>
           <p className="text-sm text-muted-foreground mt-2">Track your learning journey over time</p>
         </CardHeader>
         <CardContent className="p-6">
           <div className="h-72 sm:h-80 bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-800 dark:to-gray-700/50 rounded-xl p-4 shadow-inner">
             <ResponsiveContainer width="100%" height="100%">
               <LineChart data={analyticsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                 <defs>
                   <linearGradient id="studyHoursGradient" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#8884d8" stopOpacity={0.3}/>
                     <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                   </linearGradient>
                   <linearGradient id="assignmentsGradient" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.3}/>
                     <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                   </linearGradient>
                   <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#ffc658" stopOpacity={0.3}/>
                     <stop offset="95%" stopColor="#ffc658" stopOpacity={0}/>
                   </linearGradient>
                 </defs>
                 <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" strokeOpacity={0.3} />
                 <XAxis
                   dataKey="date"
                   fontSize={12}
                   stroke="#64748b"
                   tick={{ fill: '#64748b' }}
                   axisLine={{ stroke: '#e2e8f0' }}
                 />
                 <YAxis
                   fontSize={12}
                   stroke="#64748b"
                   tick={{ fill: '#64748b' }}
                   axisLine={{ stroke: '#e2e8f0' }}
                 />
                 <Tooltip
                   contentStyle={{
                     backgroundColor: 'rgba(255, 255, 255, 0.95)',
                     border: 'none',
                     borderRadius: '12px',
                     boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                     backdropFilter: 'blur(10px)'
                   }}
                 />
                 <Line
                   type="monotone"
                   dataKey="studyHours"
                   stroke="#6366f1"
                   strokeWidth={3}
                   activeDot={{ r: 8, fill: '#6366f1', stroke: '#ffffff', strokeWidth: 2 }}
                   name="Study Hours"
                   dot={{ fill: '#6366f1', strokeWidth: 2, r: 4 }}
                 />
                 <Line
                   type="monotone"
                   dataKey="assignmentsCompleted"
                   stroke="#10b981"
                   strokeWidth={3}
                   activeDot={{ r: 8, fill: '#10b981', stroke: '#ffffff', strokeWidth: 2 }}
                   name="Assignments Completed"
                   dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                 />
                 <Line
                   type="monotone"
                   dataKey="averageScore"
                   stroke="#f59e0b"
                   strokeWidth={3}
                   activeDot={{ r: 8, fill: '#f59e0b', stroke: '#ffffff', strokeWidth: 2 }}
                   name="Average Score (%)"
                   dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
                 />
               </LineChart>
             </ResponsiveContainer>
           </div>
           <div className="flex flex-wrap justify-center gap-4 mt-4">
             <div className="flex items-center gap-2">
               <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
               <span className="text-sm text-gray-600 dark:text-gray-400">Study Hours</span>
             </div>
             <div className="flex items-center gap-2">
               <div className="w-3 h-3 bg-green-500 rounded-full"></div>
               <span className="text-sm text-gray-600 dark:text-gray-400">Assignments</span>
             </div>
             <div className="flex items-center gap-2">
               <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
               <span className="text-sm text-gray-600 dark:text-gray-400">Avg. Score</span>
             </div>
           </div>
         </CardContent>
       </Card>

      {/* Recent Achievements */}
       <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-yellow-50/30 dark:from-gray-900 dark:to-yellow-950/20 overflow-hidden">
         <CardHeader className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 pb-6">
           <CardTitle className="flex items-center text-lg sm:text-xl font-bold">
             <div className="p-2 bg-yellow-100 dark:bg-yellow-900/50 rounded-lg mr-3">
               <Star className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-600 dark:text-yellow-400" />
             </div>
             Recent Achievements
           </CardTitle>
           <p className="text-sm text-muted-foreground mt-2">Celebrate your milestones and progress</p>
         </CardHeader>
         <CardContent className="p-6">
           <div className="space-y-4">
             {recentAchievements.slice(0, 5).map((achievement, index) => (
               <div key={achievement.id} className="group relative bg-gradient-to-r from-white to-yellow-50/50 dark:from-gray-800 dark:to-yellow-900/20 rounded-xl p-4 border border-yellow-100 dark:border-yellow-800/30 hover:shadow-lg transition-all duration-300 hover:border-yellow-200 dark:hover:border-yellow-700/50">
                 <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-orange-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                 <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                   <div className="flex-shrink-0">
                     <div className="w-12 h-12 bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900/50 dark:to-orange-900/50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                       <Trophy className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                     </div>
                   </div>
                   <div className="flex-1 min-w-0">
                     <h4 className="font-bold text-base sm:text-lg break-words text-gray-900 dark:text-gray-100 group-hover:text-yellow-700 dark:group-hover:text-yellow-300 transition-colors duration-300">{achievement.title}</h4>
                     <p className="text-sm text-gray-600 dark:text-gray-400 break-words mt-1">{achievement.description}</p>
                   </div>
                   <div className="flex-shrink-0">
                     <Badge variant="secondary" className="bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/50 dark:to-orange-900/50 text-yellow-800 dark:text-yellow-200 border-yellow-200 dark:border-yellow-700 px-3 py-1 font-bold text-sm">
                       {achievement.points} pts
                     </Badge>
                   </div>
                 </div>
               </div>
             ))}
             {recentAchievements.length === 0 && (
               <div className="text-center py-12">
                 <div className="w-20 h-20 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-full flex items-center justify-center mb-4">
                   <Trophy className="h-10 w-10 text-gray-400" />
                 </div>
                 <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">No achievements yet</h3>
                 <p className="text-muted-foreground mb-6">Keep studying to unlock your first achievement!</p>
                 <Button variant="outline" onClick={() => router.push("/courses")} className="border-yellow-200 hover:bg-yellow-50 dark:border-yellow-700 dark:hover:bg-yellow-900/50">
                   Start Learning
                 </Button>
               </div>
             )}
           </div>
           {recentAchievements.length > 0 && (
             <div className="mt-6 text-center">
               <Button variant="outline" onClick={() => router.push("/achievements")} className="border-yellow-200 hover:bg-yellow-50 dark:border-yellow-700 dark:hover:bg-yellow-900/50">
                 View All Achievements →
               </Button>
             </div>
           )}
         </CardContent>
       </Card>

      {/* Quick Actions */}
       <div className="space-y-4">
         <h3 className="text-lg sm:text-xl font-bold text-center text-gray-900 dark:text-gray-100">Quick Actions</h3>
         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
           <Button
             className="group relative h-16 sm:h-20 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
             onClick={() => router.push("/chat")}
           >
             <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
             <div className="relative flex flex-col items-center gap-2">
               <MessageSquare className="h-6 w-6 sm:h-7 sm:w-7 group-hover:scale-110 transition-transform duration-300" />
               <span className="text-sm sm:text-base font-semibold">Chat with Teacher</span>
             </div>
           </Button>
           <Button
             variant="outline"
             className="group relative h-16 sm:h-20 border-2 border-yellow-200 hover:border-yellow-300 bg-gradient-to-r from-yellow-50 to-orange-50 hover:from-yellow-100 hover:to-orange-100 dark:from-yellow-950/20 dark:to-orange-950/20 dark:border-yellow-700 dark:hover:border-yellow-600 text-yellow-800 dark:text-yellow-200 shadow-lg hover:shadow-xl transition-all duration-300"
             onClick={() => router.push("/achievements")}
           >
             <div className="flex flex-col items-center gap-2">
               <Trophy className="h-6 w-6 sm:h-7 sm:w-7 group-hover:scale-110 transition-transform duration-300" />
               <span className="text-sm sm:text-base font-semibold">View Achievements</span>
             </div>
           </Button>
         </div>
         <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
           <Button
             variant="ghost"
             className="h-12 bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 dark:from-green-950/20 dark:to-emerald-950/20 border border-green-200 dark:border-green-700 text-green-800 dark:text-green-200 hover:border-green-300 dark:hover:border-green-600 transition-all duration-300"
             onClick={() => router.push("/courses")}
           >
             <BookOpen className="mr-2 h-4 w-4" />
             <span className="text-sm">Browse Courses</span>
           </Button>
           <Button
             variant="ghost"
             className="h-12 bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 dark:from-purple-950/20 dark:to-pink-950/20 border border-purple-200 dark:border-purple-700 text-purple-800 dark:text-purple-200 hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-300"
             onClick={() => router.push("/daily-challenges")}
           >
             <Target className="mr-2 h-4 w-4" />
             <span className="text-sm">Daily Challenges</span>
           </Button>
           <Button
             variant="ghost"
             className="h-12 bg-gradient-to-r from-indigo-50 to-blue-50 hover:from-indigo-100 hover:to-blue-100 dark:from-indigo-950/20 dark:to-blue-950/20 border border-indigo-200 dark:border-indigo-700 text-indigo-800 dark:text-indigo-200 hover:border-indigo-300 dark:hover:border-indigo-600 transition-all duration-300"
             onClick={() => router.push("/analytics")}
           >
             <TrendingUp className="mr-2 h-4 w-4" />
             <span className="text-sm">View Analytics</span>
           </Button>
         </div>
       </div>

      {/* Assignments */}
       <Assignments /> {/* Render Assignments component */}
      </div>
    </div>
   );
 }
