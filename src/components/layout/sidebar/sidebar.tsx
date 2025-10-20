"use client";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Session } from "next-auth";
import { SidebarContent } from "./sidebar-content";

interface SidebarProps {
  role: string;
  session: Session | null;
}

export function Sidebar({ role, session }: SidebarProps) {
  return (
    <>
      {/* Mobile Sheet */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden fixed top-4 left-4 z-50">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 bg-secondary pt-10 w-80">
          <SidebarContent role={role} session={session} />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:flex-col h-full">
        <SidebarContent role={role} session={session} />
      </div>
    </>
  );
}
