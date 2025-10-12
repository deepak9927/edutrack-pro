"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, BookOpen } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar/index";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuHeader } from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import { SidebarContent } from "./sidebar/sidebar-content";
import { ThemeToggle } from "./theme-toggle";

interface HeaderProps {
  session: Session | null;
  role: string;
}

export function Header({ session, role }: HeaderProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();

  // Improved logout: redirect to login after sign out, handle errors
  const handleSignOut = async () => {
    try {
      await signOut({ redirect: false });
      router.push("/auth/login");
    } catch (err) {
      // TODO: Show error notification to user
      console.error("Logout failed:", err);
    }
  };

  return (
    <header className="flex h-16 items-center justify-between gap-4 border-b bg-background px-4 md:px-6">
      <div className="flex items-center gap-4">
        {/* Mobile sidebar navigation */}
        <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden"> {/* Keep hidden on large screens for mobile toggle */}
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col p-0 bg-secondary pt-10 w-80">
            <SidebarContent role={role} session={session} />
          </SheetContent>
        </Sheet>
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <BookOpen className="h-6 w-6" />
          <span className="sr-only">EduTrack Pro</span>
          <span className="hidden md:inline">EduTrack Pro</span>
        </Link>
        {/* Chat link */}
        <Link href="/chat" className="ml-2 text-sm font-medium hover:underline">
          Chat
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        {session?.user ? (
          <>
            <span className="text-sm font-medium">
              Welcome, {session.user.name || session.user.email}! ({role})
            </span>
            {role === "TEACHER" && (
              <Link href="/teacher/create-course">
                <Button variant="outline">Create Course</Button>
              </Link>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={session.user.image || "/placeholder-avatar.png"} alt="User Avatar" />
                    <AvatarFallback>
                      {session.user.name?.charAt(0) || session.user.email?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuHeader className="font-normal">
                  <div className="flex flex-col space-y-1.5 p-2">
                    <p className="text-sm font-medium leading-none">
                      {session.user.name || session.user.email || "User"}
                    </p>
                    <p className="text-xs text-muted-foreground">{role}</p>
                  </div>
                </DropdownMenuHeader>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  Log out
                </DropdownMenuItem>
                {/* TODO: Add more menu items for notifications, settings, etc. */}
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <div className="flex gap-2">
            <Link href="/auth/login">
              <Button>Login</Button>
            </Link>
            <Link href="/auth/register">
              <Button variant="secondary">Register</Button>
            </Link>
            {/* Teacher/Admin login/register */}
            <Link href="/auth/login?role=teacher">
              <Button variant="outline">Teacher Login</Button>
            </Link>
            <Link href="/auth/register?role=teacher">
              <Button variant="outline">Teacher Register</Button>
            </Link>
            <Link href="/auth/login?role=admin">
              <Button variant="outline">Admin Login</Button>
            </Link>
            <Link href="/auth/register?role=admin">
              <Button variant="outline">Admin Register</Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
