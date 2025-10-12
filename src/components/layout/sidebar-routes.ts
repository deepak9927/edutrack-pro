import {
  Users,
  Book,
} from "lucide-react";

export const adminRoutes = [
  {
    label: "Manage Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    label: "Create Course",
    href: "/admin/courses/create",
    icon: Book,
  },
];

export const teacherRoutes = []; // Add teacher routes here

export const studentRoutes = []; // Add student routes here