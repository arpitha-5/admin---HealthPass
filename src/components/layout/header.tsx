"use client"

import { Search, Moon, Sun, LogOut, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { NotificationSheet, NotificationBell } from "@/components/ui-extensions/notification-sheet"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"

const searchResults = [
  { id: "1", name: "Sarah Johnson", type: "Patient", href: "/patients" },
  { id: "2", name: "Dr. Michael Chen", type: "Doctor", href: "/doctors" },
  { id: "3", name: "General Checkup", type: "Appointment", href: "/appointments" },
  { id: "4", name: "Lab Results Report", type: "Medical Record", href: "/medical-records" },
]

const notifications = [
  {
    id: "1",
    title: "New Appointment",
    message: "Sarah Johnson booked an appointment for tomorrow at 10:00 AM",
    type: "appointment" as const,
    read: false,
    time: "5 minutes ago",
  },
  {
    id: "2",
    title: "Lab Results Ready",
    message: "Robert Williams' blood test results are now available",
    type: "patient" as const,
    read: false,
    time: "15 minutes ago",
  },
  {
    id: "3",
    title: "System Update",
    message: "Scheduled maintenance will occur tonight at 2:00 AM",
    type: "system" as const,
    read: true,
    time: "1 hour ago",
  },
  {
    id: "4",
    title: "Alert: No-show",
    message: "David Brown missed their appointment scheduled for 2:00 PM",
    type: "alert" as const,
    read: true,
    time: "2 hours ago",
  },
]

interface HeaderProps {
  onMenuClick?: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  const router = useRouter()
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    router.push("/login")
  }

  const handleMarkAllRead = () => {
    console.log("Mark all as read")
  }

  return (
    <>
      <header className="flex h-16 items-center justify-between border-b bg-background px-4 lg:px-6">
        <div className="flex items-center gap-4 flex-1">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden shrink-0"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex flex-1 max-w-md">
            <Button
              variant="outline"
              className="relative h-9 w-full justify-start text-sm text-muted-foreground"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="mr-2 h-4 w-4" />
              Search...
              <kbd className="pointer-events-none absolute right-2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium lg:flex">
                <span className="text-xs">Ctrl</span>K
              </kbd>
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            className="text-muted-foreground"
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          <NotificationBell
            notifications={notifications}
            onOpen={() => setIsNotificationOpen(true)}
          />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground font-semibold text-sm">
                    A
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-semibold leading-none">Admin User</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    admin@healthpass.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="/settings" className="flex w-full">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/settings" className="flex w-full">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-900/20">
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <CommandDialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <CommandInput placeholder="Search patients, doctors, appointments..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            {searchResults.map((result) => (
              <CommandItem key={result.id}>
                <Link
                  href={result.href}
                  className="flex w-full items-center"
                  onClick={() => setIsSearchOpen(false)}
                >
                  <span className="mr-2 text-xs text-muted-foreground">{result.type}</span>
                  <span className="font-semibold">{result.name}</span>
                </Link>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>

      <NotificationSheet
        open={isNotificationOpen}
        onOpenChange={setIsNotificationOpen}
        notifications={notifications}
        onMarkAllRead={handleMarkAllRead}
      />
    </>
  )
}
