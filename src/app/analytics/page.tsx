"use client"

import { DashboardLayout } from "@/components/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  TrendingUp,
  TrendingDown,
  Users,
  CalendarCheck,
  DollarSign,
  Activity,
  Download,
  Filter,
} from "lucide-react"

const monthlyData = [
  { month: "Jan", patients: 245, appointments: 512, revenue: 48500 },
  { month: "Feb", patients: 278, appointments: 548, revenue: 52300 },
  { month: "Mar", patients: 312, appointments: 589, revenue: 57800 },
  { month: "Apr", patients: 285, appointments: 521, revenue: 51200 },
  { month: "May", patients: 324, appointments: 612, revenue: 61200 },
  { month: "Jun", patients: 356, appointments: 678, revenue: 68400 },
]

const departmentPerformance = [
  { department: "Cardiology", patients: 485, revenue: 45200, satisfaction: 96 },
  { department: "Pediatrics", patients: 612, revenue: 38500, satisfaction: 94 },
  { department: "Orthopedics", patients: 378, revenue: 52100, satisfaction: 92 },
  { department: "Dermatology", patients: 445, revenue: 29800, satisfaction: 98 },
  { department: "Neurology", patients: 234, revenue: 41200, satisfaction: 95 },
  { department: "General Medicine", patients: 893, revenue: 35600, satisfaction: 91 },
]

const maxPatients = Math.max(...monthlyData.map((d) => d.patients))
const maxRevenue = Math.max(...monthlyData.map((d) => d.revenue))

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
            <p className="text-muted-foreground">
              Monitor health data and generate reports.
            </p>
          </div>
          <div className="flex gap-2">
            <Select defaultValue="6months">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30days">Last 30 Days</SelectItem>
                <SelectItem value="3months">Last 3 Months</SelectItem>
                <SelectItem value="6months">Last 6 Months</SelectItem>
                <SelectItem value="1year">Last Year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Patients
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,847</div>
              <div className="flex items-center gap-1 text-xs text-green-600">
                <TrendingUp className="h-3 w-3" />
                +12% from last period
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Appointments
              </CardTitle>
              <CalendarCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5,847</div>
              <div className="flex items-center gap-1 text-xs text-green-600">
                <TrendingUp className="h-3 w-3" />
                +8% from last period
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$363,500</div>
              <div className="flex items-center gap-1 text-xs text-green-600">
                <TrendingUp className="h-3 w-3" />
                +18% from last period
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Avg. Satisfaction
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">94.5%</div>
              <div className="flex items-center gap-1 text-xs text-green-600">
                <TrendingUp className="h-3 w-3" />
                +2% from last period
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Patient Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex h-[250px] items-end justify-between gap-4">
                {monthlyData.map((data) => (
                  <div
                    key={data.month}
                    className="flex flex-1 flex-col items-center gap-2"
                  >
                    <div className="text-xs text-muted-foreground">
                      {data.patients}
                    </div>
                    <div
                      className="w-full rounded-t-md bg-blue-500 transition-all hover:bg-blue-600"
                      style={{ height: `${(data.patients / maxPatients) * 200}px` }}
                    />
                    <span className="text-xs font-medium">{data.month}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Revenue Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex h-[250px] items-end justify-between gap-4">
                {monthlyData.map((data) => (
                  <div
                    key={data.month}
                    className="flex flex-1 flex-col items-center gap-2"
                  >
                    <div className="text-xs text-muted-foreground">
                      ${(data.revenue / 1000).toFixed(1)}k
                    </div>
                    <div
                      className="w-full rounded-t-md bg-primary transition-all hover:bg-primary/80"
                      style={{ height: `${(data.revenue / maxRevenue) * 200}px` }}
                    />
                    <span className="text-xs font-medium">{data.month}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Department Performance</CardTitle>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-3 w-3" />
                Filter
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Department</TableHead>
                  <TableHead>Patients</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead>Trend</TableHead>
                  <TableHead>Satisfaction</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {departmentPerformance.map((dept) => (
                  <TableRow key={dept.department}>
                    <TableCell className="font-medium">{dept.department}</TableCell>
                    <TableCell>{dept.patients}</TableCell>
                    <TableCell>${dept.revenue.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          dept.revenue > 40000
                            ? "border-green-500 text-green-600"
                            : "border-amber-500 text-amber-600"
                        }
                      >
                        {dept.revenue > 40000 ? (
                          <TrendingUp className="mr-1 h-3 w-3" />
                        ) : (
                          <TrendingDown className="mr-1 h-3 w-3" />
                        )}
                        {dept.revenue > 40000 ? "High" : "Medium"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-16 rounded-full bg-muted">
                          <div
                            className="h-2 rounded-full bg-green-500"
                            style={{ width: `${dept.satisfaction}%` }}
                          />
                        </div>
                        <span className="text-sm">{dept.satisfaction}%</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
