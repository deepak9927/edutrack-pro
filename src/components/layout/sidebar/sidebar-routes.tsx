import {
  BookOpen,
  LayoutDashboard,
  Users,
  MessageSquare,
  Settings,
  LucideIcon,
  Flame,
  Brain,
  Target,
  FileText,
  Clock,
  Lightbulb,
  Globe
} from "lucide-react";

interface SidebarRoute {
  icon: LucideIcon;
  label: string;
  href: string;
}

export const studentRoutes: SidebarRoute[] = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    icon: BookOpen,
    label: "Courses",
    href: "/courses",
  },
  {
    icon: FileText,
    label: "Assignments",
    href: "/assignments",
  },
  {
    icon: Brain,
    label: "AI Tutor",
    href: "/ai-tutor",
  },
  {
    icon: Lightbulb, // Using Lightbulb icon for Growth Assistant
    label: "AI Growth Assistant",
    href: "/ai-growth-assistant",
  },
  {
    icon: Target, // Using Target icon for Daily Challenges
    label: "Daily Challenges",
    href: "/daily-challenges",
  },
  {
    icon: Flame,
    label: "Wellness",
    href: "/wellness",
  },
  {
    icon: Users,
    label: "Community",
    href: "/career/community",
  },
  {
    icon: Clock, // Using Clock icon for Community Service Tracker
    label: "Community Service",
    href: "/career/community-service",
  },
  {
    icon: BookOpen, // Using BookOpen icon for Knowledge Sharing
    label: "Knowledge Sharing",
    href: "/career/knowledge-sharing",
  },
  {
    icon: Globe, // Using Globe icon for Global Awareness
    label: "Global Awareness",
    href: "/career/global-awareness",
  },
  {
    icon: Lightbulb, // Using Lightbulb icon for Innovation Lab
    label: "Innovation Lab",
    href: "/career/innovation-lab",
  },
  {
    icon: Settings,
    label: "Profile",
    href: "/profile",
  },
];

export const teacherRoutes: SidebarRoute[] = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    icon: BookOpen,
    label: "Courses",
    href: "/courses",
  },
  {
    icon: FileText,
    label: "Assignments",
    href: "/assignments",
  },
  {
    icon: MessageSquare,
    label: "Communication",
    href: "/communication",
  },
  {
    icon: Settings,
    label: "Profile",
    href: "/profile",
  },
];

export const adminRoutes: SidebarRoute[] = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    icon: Users,
    label: "Users",
    href: "/admin",
  },
  {
    icon: BookOpen,
    label: "Courses",
    href: "/admin/courses",
  },
  {
    icon: Settings,
    label: "Settings",
    href: "/admin/settings",
  },
];
