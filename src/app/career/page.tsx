"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Database,
  Code,
  Search,
  Palette,
  Briefcase,
  Award,
  Users,
  Globe,
  Lightbulb,
  Brain,
  TrendingUp,
  Target,
  BarChart2,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

interface CareerFeature {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: React.ElementType;
}

const careerFeatures: CareerFeature[] = [
  {
    id: "cf_1",
    title: "Data Science Mastery",
    description: "Unlock the power of data! Learn Python, SQL, Excel, and Tableau to become a data-driven decision maker. Build real-world projects and land high-paying analytics roles.",
    href: "/career/data-science",
    icon: Database,
  },
  {
    id: "cf_2",
    title: "Analytics Excellence",
    description: "Master Google Analytics, data visualization, and statistical thinking. Transform raw data into actionable business insights and drive organizational success.",
    href: "/career/analytics",
    icon: BarChart2,
  },
  {
    id: "cf_3",
    title: "Programming Bootcamp",
    description: "Launch your coding career! Master JavaScript, React, Python, and Git. Build stunning web applications and join the elite community of software developers.",
    href: "/career/programming-bootcamp",
    icon: Code,
  },
  {
    id: "cf_4",
    title: "Digital Marketing Pro",
    description: "Dominate the digital landscape! Master SEO, content creation, social media strategy, and email marketing. Grow businesses online and become a marketing superstar.",
    href: "/career/digital-marketing",
    icon: Search,
  },
  {
    id: "cf_5",
    title: "Creative Design Studio",
    description: "Unleash your creativity! Master Figma, Canva, UI/UX principles, color theory, and motion design. Design beautiful experiences that captivate and convert.",
    href: "/career/design-skills",
    icon: Palette,
  },
  {
    id: "cf_6",
    title: "Business Leadership",
    description: "Lead with confidence! Develop communication, leadership, project management, and negotiation skills. Become the executive the world needs.",
    href: "/career/business-skills",
    icon: Briefcase,
  },
  {
    id: "cf_7",
    title: "Certification Accelerator",
    description: "Fast-track your career! Track and complete Coursera, Udemy, Google, AWS, and Microsoft certifications. Get recognized and rewarded for your expertise.",
    href: "/career/certification-tracking",
    icon: Award,
  },
  {
    id: "cf_8",
    title: "Impact & Service",
    description: "Make a difference! Log volunteer hours, track social impact projects, and build a legacy of service. Create positive change in your community and beyond.",
    href: "/career/community-service",
    icon: Users,
  },
  {
    id: "cf_9",
    title: "Knowledge Exchange",
    description: "Share to grow! Exchange expertise through tutorials, guides, and peer learning. Teach others what you know and accelerate your own learning journey.",
    href: "/career/knowledge-sharing",
    icon: BookOpen,
  },
  {
    id: "cf_10",
    title: "Global Citizenship",
    description: "Be a global leader! Explore UN SDGs, climate change, global health, and human rights. Develop the awareness and skills to create a better world.",
    href: "/career/global-awareness",
    icon: Globe,
  },
  {
    id: "cf_11",
    title: "Innovation Hub",
    description: "Invent the future! Showcase groundbreaking projects and collaborate on real-world problem-solving. Turn your ideas into solutions that matter.",
    href: "/career/innovation-lab",
    icon: Lightbulb,
  },
  {
    id: "cf_12",
    title: "Mentor Network",
    description: "Accelerate your growth! Connect with successful alumni and industry professionals. Get personalized guidance and insider knowledge to fast-track your career.",
    href: "/career/mentor-connect",
    icon: Brain,
  },
  {
    id: "cf_13",
    title: "AI Career Coach",
    description: "Your personal career strategist! Get AI-powered skill recommendations tailored to your unique profile and goals. Discover your perfect career path with intelligent guidance.",
    href: "/career/skill-recommender",
    icon: Sparkles,
  },
];

export default function CareerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-16 sm:py-24">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">Your Future Starts Here</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Transform Your Career with
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Expert-Guided Learning
              </span>
            </h1>

            <p className="text-xl sm:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Master in-demand skills, build your professional network, and unlock limitless opportunities in the digital age.
              Join thousands of successful graduates who transformed their careers with IGNOU Compass.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-3 text-lg shadow-xl hover:shadow-2xl transition-all duration-200">
                <Target className="mr-2 h-5 w-5" />
                Start Your Journey
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm font-semibold px-8 py-3 text-lg">
                <Users className="mr-2 h-5 w-5" />
                Connect with Mentors
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">10,000+</div>
            <div className="text-gray-600 dark:text-gray-400">Students Trained</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">95%</div>
            <div className="text-gray-600 dark:text-gray-400">Job Placement Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">500+</div>
            <div className="text-gray-600 dark:text-gray-400">Industry Partners</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
            <div className="text-gray-600 dark:text-gray-400">Mentor Support</div>
          </div>
        </div>

        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Choose Your Path to Success
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover comprehensive learning tracks designed by industry experts to prepare you for tomorrow's careers.
            Each path includes hands-on projects, mentorship, and certification opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {careerFeatures.map((feature) => (
            <Card key={feature.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white dark:bg-gray-800 hover:-translate-y-1">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 group-hover:from-blue-200 group-hover:to-purple-200 dark:group-hover:from-blue-800/50 dark:group-hover:to-purple-800/50 transition-all duration-300">
                    <feature.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="text-xs font-medium text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/50 px-2 py-1 rounded-full">
                    Popular
                  </div>
                </div>
                <CardTitle className="text-lg font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{feature.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                    Active Learning
                  </div>
                  <Button asChild size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all duration-200">
                    <Link href={feature.href} className="flex items-center">
                      Explore
                      <TrendingUp className="ml-1 h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action Section */}
        <div className="mt-16 text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
          <h3 className="text-2xl sm:text-3xl font-bold mb-4">
            Ready to Transform Your Future?
          </h3>
          <p className="text-lg text-blue-100 mb-6 max-w-2xl mx-auto">
            Join our community of successful learners and start building the career you've always dreamed of.
            Your journey to success begins today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-3 shadow-xl hover:shadow-2xl transition-all duration-200">
              Get Started Free
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm font-semibold px-8 py-3">
              Schedule Consultation
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}