"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar/index";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuHeader } from "@/components/ui/dropdown-menu";
import { auth, signOut } from "@/lib/auth/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/lib/constants";
import { adminRoutes, studentRoutes, teacherRoutes } from "./sidebar-routes";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button/button";
import { Settings } from "lucide-react";
import { Session } from "next-auth";

interface SidebarContentProps {
  role: string;
  session: Session | null;
}

export function SidebarContent({ role, session }: SidebarContentProps) {
  const pathname = usePathname();
  const router = useRouter();

  let routes = [];

  if (role === "ADMIN") {
    routes = adminRoutes;
  } else if (role === "TEACHER") {
    routes = teacherRoutes;
  } else {
    routes = studentRoutes;
  }

  return (
    <div className="flex flex-col h-full text-foreground">
      <div className="px-4 py-6">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="w-full h-auto p-3 rounded-xl bg-white dark:bg-gray-900 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-950/50 dark:hover:to-purple-950/50 border border-gray-200 dark:border-gray-700 hover:border-blue-200/50 dark:hover:border-blue-800/50 transition-all duration-200 group"
            >
              <div className="flex items-center space-x-3 w-full">
                <div className="relative">
                  <Avatar className="h-10 w-10 ring-2 ring-blue-200 dark:ring-blue-800 group-hover:ring-blue-300 dark:group-hover:ring-blue-700 transition-all duration-200">
                    <AvatarImage src="/examples/card-example.png" alt="Profile" />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                      {session?.user?.name?.charAt(0)?.toUpperCase() || session?.user?.email?.charAt(0)?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-900 flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  </div>
                </div>
                <div className="flex-1 text-left min-w-0">
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                    {session?.user?.name || "Welcome Back!"}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                    {role.toLowerCase()} • Online
                  </p>
                </div>
                <div className="text-blue-500 group-hover:text-blue-600 dark:text-blue-400 dark:group-hover:text-blue-300 transition-colors">
                  <Settings className="h-4 w-4" />
                </div>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-80" align="end" forceMount>
            <DropdownMenuHeader className="font-normal">
              <div className="flex flex-col space-y-2 p-4 bg-white dark:bg-gray-900 rounded-t-lg">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12 ring-2 ring-blue-200 dark:ring-blue-800">
                    <AvatarImage src="/examples/card-example.png" alt="Profile" />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold text-lg">
                      {session?.user?.name?.charAt(0)?.toUpperCase() || session?.user?.email?.charAt(0)?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-base font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {session?.user?.name || "Student"}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                      {session?.user?.email || "user@example.com"}
                    </p>
                    <div className="flex items-center mt-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-xs text-green-600 dark:text-green-400 font-medium capitalize">
                        {role.toLowerCase()} • Active
                      </span>
                    </div>
                  </div>
                </div>
                <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 mt-2">
                  <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
                    🎯 "Success is not final, failure is not fatal: It is the courage to continue that counts."
                  </p>
                </div>
              </div>
            </DropdownMenuHeader>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => router.push("/profile")}
              className="flex items-center p-3 hover:bg-blue-50 dark:hover:bg-blue-950/50 cursor-pointer"
            >
              <Settings className="mr-3 h-4 w-4 text-blue-500" />
              <div>
                <span className="font-medium">Profile Settings</span>
                <p className="text-xs text-gray-500 dark:text-gray-400">Manage your account</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => router.push("/achievements")}
              className="flex items-center p-3 hover:bg-yellow-50 dark:hover:bg-yellow-950/50 cursor-pointer"
            >
              <div className="mr-3 h-4 w-4 text-yellow-500">🏆</div>
              <div>
                <span className="font-medium">Achievements</span>
                <p className="text-xs text-gray-500 dark:text-gray-400">View your progress</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => router.push("/wellness")}
              className="flex items-center p-3 hover:bg-green-50 dark:hover:bg-green-950/50 cursor-pointer"
            >
              <div className="mr-3 h-4 w-4 text-green-500">🧘</div>
              <div>
                <span className="font-medium">Wellness Center</span>
                <p className="text-xs text-gray-500 dark:text-gray-400">Mindfulness & balance</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => signOut({
                redirect: false,
                redirectTo: DEFAULT_LOGIN_REDIRECT
              })}
              className="flex items-center p-3 hover:bg-red-50 dark:hover:bg-red-950/50 cursor-pointer text-red-600 dark:text-red-400"
            >
              <div className="mr-3 h-4 w-4">🚪</div>
              <span className="font-medium">Sign Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex-1 space-y-2 px-3">
        {routes.map((route, index) => (
          <Button
            key={route.href}
            variant="ghost"
            className="w-full justify-start font-medium h-12 px-4 rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-950/50 dark:hover:to-purple-950/50 hover:border hover:border-blue-200/50 dark:hover:border-blue-800/50 transition-all duration-200 group relative overflow-hidden"
            onClick={() => router.push(route.href)}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
            <route.icon className="mr-3 h-5 w-5 text-blue-500 group-hover:text-blue-600 dark:text-blue-400 dark:group-hover:text-blue-300 transition-colors duration-200" />
            <span className="text-sm group-hover:text-blue-700 dark:group-hover:text-blue-200 transition-colors duration-200">
              {route.label}
            </span>
            {index < 3 && (
              <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              </div>
            )}
          </Button>
        ))}

        {/* Inspirational quote section */}
        <div className="mt-8 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-950/30 dark:hover:to-purple-950/30 hover:border-blue-200/50 dark:hover:border-blue-800/50 transition-all duration-200">
          <div className="text-center">
            <div className="text-2xl mb-2">🌟</div>
            <p className="text-xs text-gray-600 dark:text-gray-400 italic leading-relaxed">
              "The beautiful thing about learning is that no one can take it away from you."
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-2 font-medium">
              — B.B. King
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
