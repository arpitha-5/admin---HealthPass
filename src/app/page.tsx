"use client"

import { DashboardLayout } from "@/components/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  Users,
  CalendarCheck,
  Clock,
  TrendingUp,
  TrendingDown,
  Activity,
  ArrowRight,
  Plus,
  Loader2,
  IndianRupee,
} from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useAppointments } from "@/hooks/use-appointments"
import { usePatients } from "@/hooks/use-patients"

function formatIndianRupee(value: number): string {
  const str = value.toString()
  const lastThree = str.substring(str.length - 3)
  const rest = str.substring(0, str.length - 3)
  const formatted = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + (rest ? "," : "") + lastThree
  return `₹${formatted}`
}

function formatNumber(value: number): string {
  const str = value.toString()
  const lastThree = str.substring(str.length - 3)
  const rest = str.substring(0, str.length - 3)
  return rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + (rest ? "," : "") + lastThree
}

const stats = [
  {
    title: "Total Patients",
    value: 2847,
    formattedValue: formatNumber(2847),
    change: "+12%",
    trend: "up",
    icon: Users,
    color: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-950",
  },
  {
    title: "Appointments Today",
    value: 156,
    formattedValue: formatNumber(156),
    change: "+8%",
    trend: "up",
    icon: CalendarCheck,
    color: "text-green-600",
    bgColor: "bg-green-50 dark:bg-green-950",
  },
  {
    title: "Pending Tasks",
    value: 23,
    formattedValue: formatNumber(23),
    change: "-3%",
    trend: "down",
    icon: Clock,
    color: "text-amber-600",
    bgColor: "bg-amber-50 dark:bg-amber-950",
  },
  {
    title: "Revenue (Month)",
    value: 4829000,
    formattedValue: formatIndianRupee(4829000),
    change: "+18%",
    trend: "up",
    icon: IndianRupee,
    color: "text-primary",
    bgColor: "bg-red-50 dark:bg-red-950",
  },
]

const patientTrends = [
  { day: "Mon", patients: 45 },
  { day: "Tue", patients: 52 },
  { day: "Wed", patients: 48 },
  { day: "Thu", patients: 61 },
  { day: "Fri", patients: 55 },
  { day: "Sat", patients: 38 },
  { day: "Sun", patients: 25 },
]

const appointmentStatus = [
  { status: "Completed", count: 89, color: "bg-green-500" },
  { status: "Scheduled", count: 45, color: "bg-blue-500" },
  { status: "Cancelled", count: 12, color: "bg-red-500" },
  { status: "No-show", count: 10, color: "bg-amber-500" },
]

const maxPatients = Math.max(...patientTrends.map((t) => t.patients))

export default function DashboardPage() {
  const { data: appointments = [], isLoading: isLoadingAppointments } = useAppointments()
  const { isLoading: isLoadingPatients } = usePatients()

  const isLoading = isLoadingAppointments || isLoadingPatients

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back! Here&apos;s an overview of your clinic.
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Appointment
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <div className={`rounded-lg p-2 ${stat.bgColor}`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.formattedValue}</div>
                <p className="flex items-center text-xs text-muted-foreground">
                  {stat.trend === "up" ? (
                    <TrendingUp className="mr-1 h-3 w-3 text-green-600" />
                  ) : (
                    <TrendingDown className="mr-1 h-3 w-3 text-red-600" />
                  )}
                  <span className={stat.trend === "up" ? "text-green-600" : "text-red-600"}>
                    {stat.change}
                  </span>
                  {" "}from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-7">
          <Card className="lg:col-span-4">
            <CardHeader>
              <CardTitle>Patient Visits (7-Day Trend)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex h-[200px] items-end justify-between gap-2">
                {patientTrends.map((trend) => (
                  <div key={trend.day} className="flex flex-1 flex-col items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      {trend.patients}
                    </span>
                    <div
                      className="w-full rounded-t-md bg-primary transition-all hover:bg-primary/80"
                      style={{ height: `${(trend.patients / maxPatients) * 150}px` }}
                    />
                    <span className="text-xs font-semibold">{trend.day}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Appointment Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {appointmentStatus.map((item) => (
                <div key={item.status} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`h-3 w-3 rounded-full ${item.color}`} />
                    <span className="text-sm">{item.status}</span>
                  </div>
                  <span className="font-semibold">{item.count}</span>
                </div>
              ))}
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">Total</span>
                <span className="font-bold">{appointmentStatus.reduce((a, b) => a + b.count, 0)}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Appointments</CardTitle>
              <Button variant="ghost" size="sm">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex h-[200px] items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="font-semibold">Patient</TableHead>
                        <TableHead className="font-semibold">Doctor</TableHead>
                        <TableHead className="font-semibold">Time</TableHead>
                        <TableHead className="font-semibold">Type</TableHead>
                        <TableHead className="font-semibold">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {appointments.slice(0, 5).map((apt) => (
                        <TableRow key={apt.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback className="text-xs font-semibold">
                                  {apt.patient.split(" ").map((n) => n[0]).join("")}
                                </AvatarFallback>
                              </Avatar>
                              <span className="font-semibold">{apt.patient}</span>
                            </div>
                          </TableCell>
                          <TableCell>{apt.doctor}</TableCell>
                          <TableCell>{apt.time}</TableCell>
                          <TableCell>{apt.type}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                apt.status === "Completed"
                                  ? "default"
                                  : apt.status === "In Progress"
                                  ? "secondary"
                                  : "outline"
                              }
                              className={
                                apt.status === "Completed"
                                  ? "bg-green-500 hover:bg-green-600 font-semibold"
                                  : apt.status === "In Progress"
                                  ? "bg-blue-500 hover:bg-blue-600 font-semibold"
                                  : ""
                              }
                            >
                              {apt.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <Users className="mr-2 h-4 w-4" />
                Add New Patient
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <CalendarCheck className="mr-2 h-4 w-4" />
                Schedule Appointment
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Activity className="mr-2 h-4 w-4" />
                View Medical Records
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <IndianRupee className="mr-2 h-4 w-4" />
                Generate Report
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
