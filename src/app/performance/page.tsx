"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Activity,
  TrendingUp,
  TrendingDown,
  Clock,
  FileCheck,
  AlertTriangle,
  Calendar,
  Building,
} from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,

} from "recharts"

const cancellationData = [
  { date: "Jan 1", rate: 8.5, appointments: 120 },
  { date: "Jan 2", rate: 6.2, appointments: 135 },
  { date: "Jan 3", rate: 9.1, appointments: 110 },
  { date: "Jan 4", rate: 7.8, appointments: 125 },
  { date: "Jan 5", rate: 5.5, appointments: 140 },
  { date: "Jan 6", rate: 4.2, appointments: 95 },
  { date: "Jan 7", rate: 3.8, appointments: 85 },
  { date: "Jan 8", rate: 7.2, appointments: 130 },
  { date: "Jan 9", rate: 8.9, appointments: 115 },
  { date: "Jan 10", rate: 6.5, appointments: 128 },
  { date: "Jan 11", rate: 5.8, appointments: 142 },
  { date: "Jan 12", rate: 7.1, appointments: 118 },
  { date: "Jan 13", rate: 4.5, appointments: 88 },
  { date: "Jan 14", rate: 3.9, appointments: 78 },
]

const waitingTimeData = [
  { date: "Jan 1", avgWait: 18, target: 15 },
  { date: "Jan 2", avgWait: 22, target: 15 },
  { date: "Jan 3", avgWait: 25, target: 15 },
  { date: "Jan 4", avgWait: 20, target: 15 },
  { date: "Jan 5", avgWait: 16, target: 15 },
  { date: "Jan 6", avgWait: 12, target: 15 },
  { date: "Jan 7", avgWait: 10, target: 15 },
  { date: "Jan 8", avgWait: 19, target: 15 },
  { date: "Jan 9", avgWait: 23, target: 15 },
  { date: "Jan 10", avgWait: 17, target: 15 },
  { date: "Jan 11", avgWait: 14, target: 15 },
  { date: "Jan 12", avgWait: 21, target: 15 },
  { date: "Jan 13", avgWait: 11, target: 15 },
  { date: "Jan 14", avgWait: 9, target: 15 },
]

const turnaroundData = [
  { category: "Blood Tests", hours: 4, target: 6 },
  { category: "X-Ray", hours: 8, target: 12 },
  { category: "MRI", hours: 24, target: 48 },
  { category: "CT Scan", hours: 18, target: 24 },
  { category: "Ultrasound", hours: 2, target: 4 },
  { category: "ECG", hours: 1, target: 2 },
]

const departmentPerformance = [
  { name: "Cardiology", efficiency: 92, cancellations: 3.2, avgWait: 12 },
  { name: "Orthopedics", efficiency: 88, cancellations: 5.1, avgWait: 18 },
  { name: "Neurology", efficiency: 85, cancellations: 4.8, avgWait: 22 },
  { name: "Pediatrics", efficiency: 95, cancellations: 2.1, avgWait: 8 },
  { name: "Dermatology", efficiency: 90, cancellations: 3.5, avgWait: 10 },
  { name: "General", efficiency: 87, cancellations: 6.2, avgWait: 15 },
]

export default function PerformancePage() {
  const [timeRange, setTimeRange] = useState("7d")
  const [selectedDepartment, setSelectedDepartment] = useState("all")

  const avgCancellationRate = (
    cancellationData.reduce((sum, d) => sum + d.rate, 0) / cancellationData.length
  ).toFixed(1)
  const avgWaitingTime = (
    waitingTimeData.reduce((sum, d) => sum + d.avgWait, 0) / waitingTimeData.length
  ).toFixed(0)
  const avgTurnaround = (
    turnaroundData.reduce((sum, d) => sum + d.hours, 0) / turnaroundData.length
  ).toFixed(1)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Performance Monitoring</h1>
            <p className="text-muted-foreground">
              Track key healthcare operational metrics
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-full sm:w-[150px]">
                <Calendar className="mr-2 h-4 w-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 Days</SelectItem>
                <SelectItem value="30d">Last 30 Days</SelectItem>
                <SelectItem value="90d">Last 90 Days</SelectItem>
                <SelectItem value="1y">Last Year</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <Building className="mr-2 h-4 w-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="cardiology">Cardiology</SelectItem>
                <SelectItem value="orthopedics">Orthopedics</SelectItem>
                <SelectItem value="neurology">Neurology</SelectItem>
                <SelectItem value="pediatrics">Pediatrics</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className={Number(avgCancellationRate) > 5 ? "border-red-200 dark:border-red-900" : ""}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Avg Cancellation Rate
              </CardTitle>
              {Number(avgCancellationRate) > 5 ? (
                <TrendingDown className="h-4 w-4 text-red-500" />
              ) : (
                <TrendingUp className="h-4 w-4 text-green-500" />
              )}
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${Number(avgCancellationRate) > 5 ? "text-red-500" : "text-green-500"}`}>
                {avgCancellationRate}%
              </div>
              <p className="text-xs text-muted-foreground">Target: 5%</p>
              {Number(avgCancellationRate) > 5 && (
                <Badge variant="destructive" className="mt-2 text-xs">
                  <AlertTriangle className="mr-1 h-3 w-3" />
                  Above Target
                </Badge>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Waiting Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${Number(avgWaitingTime) > 15 ? "text-yellow-500" : "text-green-500"}`}>
                {avgWaitingTime} min
              </div>
              <p className="text-xs text-muted-foreground">Target: 15 min</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Report Turnaround</CardTitle>
              <FileCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">
                {avgTurnaround}h
              </div>
              <p className="text-xs text-muted-foreground">Below target</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overall Efficiency</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">91%</div>
              <p className="text-xs text-muted-foreground">+2% from last week</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="cancellation" className="space-y-6">
          <TabsList>
            <TabsTrigger value="cancellation">Cancellation Rate</TabsTrigger>
            <TabsTrigger value="waiting">Waiting Time</TabsTrigger>
            <TabsTrigger value="turnaround">Report Turnaround</TabsTrigger>
            <TabsTrigger value="departments">Department Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="cancellation">
            <Card>
              <CardHeader>
                <CardTitle>Cancellation Rate Trends</CardTitle>
                <CardDescription>
                  Daily cancellation rate over the selected period
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={cancellationData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="date" className="text-xs" />
                      <YAxis className="text-xs" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "var(--background)",
                          border: "1px solid var(--border)",
                          borderRadius: "8px",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="rate"
                        stroke="#DC2626"
                        strokeWidth={2}
                        dot={{ fill: "#DC2626", r: 4 }}
                        name="Cancellation Rate (%)"
                      />
                      <Line
                        type="monotone"
                        dataKey="appointments"
                        stroke="#2563EB"
                        strokeWidth={2}
                        dot={{ fill: "#2563EB", r: 4 }}
                        name="Total Appointments"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="waiting">
            <Card>
              <CardHeader>
                <CardTitle>Average Waiting Time Trends</CardTitle>
                <CardDescription>
                  Patient waiting time compared to target (15 minutes)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={waitingTimeData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="date" className="text-xs" />
                      <YAxis className="text-xs" unit=" min" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "var(--background)",
                          border: "1px solid var(--border)",
                          borderRadius: "8px",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="avgWait"
                        stroke="#CA8A04"
                        strokeWidth={2}
                        dot={{ fill: "#CA8A04", r: 4 }}
                        name="Average Wait (min)"
                      />
                      <Line
                        type="monotone"
                        dataKey="target"
                        stroke="#16A34A"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={false}
                        name="Target (min)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="turnaround">
            <Card>
              <CardHeader>
                <CardTitle>Diagnostic Report Turnaround Time</CardTitle>
                <CardDescription>
                  Average time to deliver test results by category
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={turnaroundData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis type="number" className="text-xs" unit="h" />
                      <YAxis dataKey="category" type="category" className="text-xs" width={100} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "var(--background)",
                          border: "1px solid var(--border)",
                          borderRadius: "8px",
                        }}
                      />
                      <Bar dataKey="hours" fill="#2563EB" name="Actual (hours)" radius={[0, 4, 4, 0]} />
                      <Bar dataKey="target" fill="#16A34A" name="Target (hours)" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="departments">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Department Efficiency Scores</CardTitle>
                  <CardDescription>
                    Overall performance rating by department
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={departmentPerformance}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis dataKey="name" className="text-xs" />
                        <YAxis className="text-xs" unit="%" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "var(--background)",
                            border: "1px solid var(--border)",
                            borderRadius: "8px",
                          }}
                        />
                        <Bar dataKey="efficiency" fill="#16A34A" name="Efficiency (%)" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Breakdown</CardTitle>
                  <CardDescription>
                    Key metrics by department
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {departmentPerformance.map((dept) => (
                      <div key={dept.name} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium">{dept.name}</span>
                          <span className="text-muted-foreground">
                            {dept.efficiency}% efficiency
                          </span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                          <div
                            className="h-full rounded-full bg-primary transition-all"
                            style={{ width: `${dept.efficiency}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Cancel: {dept.cancellations}%</span>
                          <span>Wait: {dept.avgWait} min</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
