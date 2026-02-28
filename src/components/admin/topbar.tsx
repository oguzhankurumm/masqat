"use client"

import { Menu, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CommandMenu } from "@/components/admin/command-menu";

interface TopbarProps {
  onMobileMenuOpen: () => void;
}

export function Topbar({ onMobileMenuOpen }: TopbarProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-4 lg:px-6 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden text-muted-foreground"
          onClick={onMobileMenuOpen}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="hidden sm:block flex-1 max-w-xl pr-4">
          <CommandMenu />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
          <Bell className="h-5 w-5" />
        </Button>
        <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
          A
        </div>
      </div>
    </header>
  );
}
