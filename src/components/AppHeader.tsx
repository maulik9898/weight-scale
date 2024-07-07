
import React from 'react'
import { Menu, CircleUser } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Link } from '@tanstack/react-router'

export const AppHeader: React.FC = () => {
  return (
    <header className="sticky top-0 flex items-center justify-between px-4 py-2 border-b bg-background">
      <div className="flex items-center justify-center align-baseline  gap-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="flex flex-col gap-4 mt-8">
              <Link
                to='/'
                activeProps={{ className: "text-foreground" }}
                inactiveProps={{ className: "text-muted-foreground" }}
                className="text-lg font-medium  hover:text-foreground"
              >
                Dashboard
              </Link>
              <Link
                to='/products'
                activeProps={{ className: "text-foreground" }}
                inactiveProps={{ className: "text-muted-foreground" }}
                className="text-lg font-medium  hover:text-foreground"
              >
                Products
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <p className="text-2xl font-bold font-mono">Evitran</p>
      </div>
      <nav className="hidden md:flex items-center gap-6">
        <Link
          to='/'
          activeProps={{ className: "text-foreground" }}
          inactiveProps={{ className: "text-muted-foreground" }}
          className="text-sm font-medium transition-colors hover:text-foreground"
        >
          Dashboard
        </Link>
        <Link
          to='/products'
          activeProps={{ className: "text-foreground" }}
          inactiveProps={{ className: "text-muted-foreground" }}
          className="text-sm font-medium  transition-colors hover:text-foreground"
        >
          Products
        </Link>
      </nav>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <CircleUser className="h-5 w-5" />
            <span className="sr-only">User menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
