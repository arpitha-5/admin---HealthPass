"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  FileText,
  BarChart3,
  Settings,
  Heart,
  ChevronLeft,
  ChevronRight,
  X,
  Receipt,
  Wallet,
  HeadphonesIcon,
  Bell,
  Activity,
  ShieldAlert,
  CalendarCog,
  Shield,
  AlertTriangle,
  FileBarChart,
  Building2,
  TestTube,
  Pill,
  Tags,
  Download,
  ShieldCheck,
  MessageSquare,
  Ticket,
  CalendarClock,
} from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Sheet, SheetContent } from "@/components/ui/sheet"

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Patients", href: "/patients", icon: Users },
  { name: "Appointments", href: "/appointments", icon: CalendarDays },
  { name: "Medical Records", href: "/medical-records", icon: FileText },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
]

const operationsNavigation = [
  { name: "Bill Management", href: "/bills", icon: Receipt },
  { name: "Wallet & Credits", href: "/wallet", icon: Wallet },
  { name: "Support Tickets", href: "/support", icon: HeadphonesIcon },
  { name: "Notifications", href: "/notifications", icon: Bell },
  { name: "Performance", href: "/performance", icon: Activity },
  { name: "Fraud Detection", href: "/fraud", icon: ShieldAlert },
  { name: "Appointment Control", href: "/appointment-control", icon: CalendarCog },
  { name: "Insurance Issues", href: "/insurance-issues", icon: Shield },
  { name: "Emergency Control", href: "/emergency", icon: AlertTriangle },
  { name: "Reports", href: "/reports", icon: FileBarChart },
]

const entityManagementNavigation = [
  { name: "Hospitals", href: "/hospitals", icon: Building2 },
  { name: "Diagnostics", href: "/diagnostics", icon: TestTube },
  { name: "Medical Stores", href: "/medical-stores", icon: Pill },
  { name: "Insurance", href: "/insurance", icon: ShieldCheck },
  { name: "Hospital Dashboard", href: "/hospital-dashboard", icon: BarChart3 },
  { name: "Diagnostic Dashboard", href: "/diagnostic-dashboard", icon: BarChart3 },
  { name: "Medical Store Dashboard", href: "/medical-store-dashboard", icon: BarChart3 },
  { name: "Discount Control", href: "/discount-control", icon: Tags },
  { name: "Export Reports", href: "/export-reports", icon: Download },
  { name: "Chat Escalation", href: "/chat-escalation", icon: MessageSquare },
  { name: "Free Visit Control", href: "/free-visits", icon: Ticket },
  { name: "Booking Conflicts", href: "/booking-conflicts", icon: CalendarClock },
]

const secondaryNavigation = [
  { name: "Settings", href: "/settings", icon: Settings },
]

interface SidebarProps {
  collapsed?: boolean
  onToggle?: () => void
  mobileOpen?: boolean
  onMobileClose?: () => void
}

export function Sidebar({ collapsed = false, onToggle, mobileOpen, onMobileClose }: SidebarProps) {
  const pathname = usePathname()

  const NavItem = ({ item, onClick }: { item: typeof navigation[0]; onClick?: () => void }) => {
    const isActive = pathname === item.href

    const button = (
      <Link href={item.href} onClick={onClick}>
        <Button
          variant={isActive ? "secondary" : "ghost"}
          className={cn(
            "h-10 w-full transition-all duration-200 ease-out",
            collapsed ? "justify-center px-0" : "justify-start px-3",
            isActive && "bg-primary/10 text-primary hover:bg-primary/15 hover:text-primary"
          )}
        >
          <item.icon className={cn("h-4 w-4 shrink-0", collapsed && "h-5 w-5")} />
          {!collapsed && <span className="ml-2">{item.name}</span>}
        </Button>
      </Link>
    )

    if (collapsed) {
      return (
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>{button}</TooltipTrigger>
          <TooltipContent side="right" className="flex items-center gap-2 font-medium">
            {item.name}
          </TooltipContent>
        </Tooltip>
      )
    }

    return button
  }

  const sidebarContent = (
    <div
      className={cn(
        "relative flex h-screen flex-col border-r bg-sidebar transition-all duration-300 ease-out overflow-hidden",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div
        className={cn(
          "flex h-16 shrink-0 items-center border-b transition-all duration-300 ease-out",
          collapsed ? "justify-center px-2" : "justify-between px-4"
        )}
      >
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Heart className="h-5 w-5" />
          </div>
          {!collapsed && (
            <span className="text-lg font-semibold tracking-tight">HealthPass</span>
          )}
        </Link>
      </div>

      <ScrollArea className="flex-1 px-2 py-4 h-[calc(100vh-4rem)]">
        <nav className="space-y-1">
          {navigation.map((item) => (
            <NavItem key={item.name} item={item} />
          ))}
        </nav>

        <Separator className="my-4" />

        <div className="px-3 py-1">
          {!collapsed && (
            <span className="text-xs font-medium uppercase text-muted-foreground">Operations</span>
          )}
        </div>

        <nav className="space-y-1">
          {operationsNavigation.map((item) => (
            <NavItem key={item.name} item={item} />
          ))}
        </nav>

        <Separator className="my-4" />

        <div className="px-3 py-1">
          {!collapsed && (
            <span className="text-xs font-medium uppercase text-muted-foreground">Entity Management</span>
          )}
        </div>

        <nav className="space-y-1">
          {entityManagementNavigation.map((item) => (
            <NavItem key={item.name} item={item} />
          ))}
        </nav>

        <Separator className="my-4" />

        <nav className="space-y-1">
          {secondaryNavigation.map((item) => (
            <NavItem key={item.name} item={item} />
          ))}
        </nav>
      </ScrollArea>

      <div className="border-t p-2">
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              className={cn("h-9", !collapsed && "w-full justify-between px-3")}
            >
              {!collapsed && <span className="text-sm">Collapse</span>}
              {collapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>
          </TooltipTrigger>
          {collapsed && (
            <TooltipContent side="right">Expand sidebar</TooltipContent>
          )}
        </Tooltip>
      </div>
    </div>
  )

  return (
    <>
      <div className="hidden lg:block">
        {sidebarContent}
      </div>

      <Sheet open={mobileOpen || false} onOpenChange={onMobileClose}>
        <SheetContent side="left" className="p-0 w-[280px]">
          <div className="flex h-16 items-center justify-between border-b px-4">
            <Link href="/" className="flex items-center gap-2" onClick={onMobileClose}>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Heart className="h-5 w-5" />
              </div>
              <span className="text-lg font-semibold tracking-tight">HealthPass</span>
            </Link>
            <Button variant="ghost" size="icon" onClick={onMobileClose} className="lg:hidden">
              <X className="h-5 w-5" />
            </Button>
          </div>
          <ScrollArea className="flex-1 py-4">
            <nav className="space-y-1 px-2">
              {navigation.map((item) => (
                <NavItem key={item.name} item={item} onClick={onMobileClose} />
              ))}
            </nav>
            <Separator className="my-4 px-2" />
            <div className="px-3 py-1">
              <span className="text-xs font-medium uppercase text-muted-foreground">Operations</span>
            </div>
            <nav className="space-y-1 px-2">
              {operationsNavigation.map((item) => (
                <NavItem key={item.name} item={item} onClick={onMobileClose} />
              ))}
            </nav>
            <Separator className="my-4 px-2" />
            <div className="px-3 py-1">
              <span className="text-xs font-medium uppercase text-muted-foreground">Entity Management</span>
            </div>
            <nav className="space-y-1 px-2">
              {entityManagementNavigation.map((item) => (
                <NavItem key={item.name} item={item} onClick={onMobileClose} />
              ))}
            </nav>
            <Separator className="my-4 px-2" />
            <nav className="space-y-1 px-2">
              {secondaryNavigation.map((item) => (
                <NavItem key={item.name} item={item} onClick={onMobileClose} />
              ))}
            </nav>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </>
  )
}
