"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAppointmentsReport, useBillsReport, useRevenueReport, usePerformanceReport, AppointmentReport, BillReport, RevenueReport, PerformanceReport } from "@/hooks/use-reports"
import * as XLSX from "xlsx"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, FileSpreadsheet, Calendar, Receipt, DollarSign, TrendingUp } from "lucide-react"

type ReportType = "appointments" | "bills" | "revenue" | "performance"

export default function ReportsExportPage() {
  const { data: appointments = [] } = useAppointmentsReport()
  const { data: bills = [] } = useBillsReport()
  const { data: revenue = [] } = useRevenueReport()
  const { data: performance = [] } = usePerformanceReport()
  const [exporting, setExporting] = useState<ReportType | null>(null)

  const exportToExcel = (type: ReportType) => {
    setExporting(type)
    
    let data: (AppointmentReport | BillReport | RevenueReport | PerformanceReport)[] = []
    let filename = ""

    switch (type) {
      case "appointments":
        data = appointments
        filename = "appointments_report.xlsx"
        break
      case "bills":
        data = bills
        filename = "bills_report.xlsx"
        break
      case "revenue":
        data = revenue
        filename = "revenue_report.xlsx"
        break
      case "performance":
        data = performance
        filename = "performance_report.xlsx"
        break
    }

    const ws = XLSX.utils.json_to_sheet(data)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, "Report")
    XLSX.writeFile(wb, filename)
    
    setTimeout(() => setExporting(null), 1000)
  }

  const reportCards = [
    {
      type: "appointments" as ReportType,
      title: "Appointments Report",
      description: "Export all appointment data including patient info, doctors, and status",
      icon: Calendar,
      color: "bg-blue-100 text-blue-700",
      count: appointments.length,
    },
    {
      type: "bills" as ReportType,
      title: "Bills Report",
      description: "Export billing information with payment status and amounts",
      icon: Receipt,
      color: "bg-green-100 text-green-700",
      count: bills.length,
    },
    {
      type: "revenue" as ReportType,
      title: "Revenue Report",
      description: "Export revenue data by entity with transaction counts",
      icon: DollarSign,
      color: "bg-yellow-100 text-yellow-700",
      count: revenue.length,
    },
    {
      type: "performance" as ReportType,
      title: "Performance Report",
      description: "Export entity performance metrics including ratings and satisfaction",
      icon: TrendingUp,
      color: "bg-purple-100 text-purple-700",
      count: performance.length,
    },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports Export</h1>
          <p className="text-muted-foreground">Download detailed reports in Excel format</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {reportCards.map((card) => (
            <Card key={card.type} className="relative overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-lg ${card.color}`}>
                    <card.icon className="h-5 w-5" />
                  </div>
                  <span className="text-sm text-muted-foreground">{card.count} records</span>
                </div>
                <CardTitle className="text-lg mt-2">{card.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{card.description}</p>
                <Button
                  className="w-full"
                  onClick={() => exportToExcel(card.type)}
                  disabled={exporting === card.type}
                >
                  {exporting === card.type ? (
                    "Exporting..."
                  ) : (
                    <>
                      <Download className="mr-2 h-4 w-4" />
                      Export Excel
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileSpreadsheet className="h-5 w-5" />
              Report Preview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="appointments" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="appointments">Appointments</TabsTrigger>
                <TabsTrigger value="bills">Bills</TabsTrigger>
                <TabsTrigger value="revenue">Revenue</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
              </TabsList>

              <TabsContent value="appointments" className="mt-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Patient</TableHead>
                      <TableHead>Doctor</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {appointments.slice(0, 5).map((apt) => (
                      <TableRow key={apt.id}>
                        <TableCell className="font-medium">{apt.id}</TableCell>
                        <TableCell>{apt.patientName}</TableCell>
                        <TableCell>{apt.doctorName}</TableCell>
                        <TableCell>{apt.date}</TableCell>
                        <TableCell>{apt.status}</TableCell>
                        <TableCell>${apt.amount}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>

              <TabsContent value="bills" className="mt-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Patient</TableHead>
                      <TableHead>Hospital</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bills.slice(0, 5).map((bill) => (
                      <TableRow key={bill.id}>
                        <TableCell className="font-medium">{bill.id}</TableCell>
                        <TableCell>{bill.patientName}</TableCell>
                        <TableCell>{bill.hospitalName}</TableCell>
                        <TableCell>{bill.service}</TableCell>
                        <TableCell>${bill.amount}</TableCell>
                        <TableCell>{bill.status}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>

              <TabsContent value="revenue" className="mt-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Entity</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>Transactions</TableHead>
                      <TableHead>Period</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {revenue.slice(0, 5).map((rev) => (
                      <TableRow key={rev.id}>
                        <TableCell className="font-medium">{rev.id}</TableCell>
                        <TableCell>{rev.entityName}</TableCell>
                        <TableCell>{rev.entityType}</TableCell>
                        <TableCell>${rev.revenue.toLocaleString()}</TableCell>
                        <TableCell>{rev.transactions}</TableCell>
                        <TableCell>{rev.period}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>

              <TabsContent value="performance" className="mt-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Entity</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Appointments</TableHead>
                      <TableHead>Satisfaction</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {performance.slice(0, 5).map((perf) => (
                      <TableRow key={perf.id}>
                        <TableCell className="font-medium">{perf.id}</TableCell>
                        <TableCell>{perf.entityName}</TableCell>
                        <TableCell>{perf.entityType}</TableCell>
                        <TableCell>{perf.rating}/5</TableCell>
                        <TableCell>{perf.appointments}</TableCell>
                        <TableCell>{perf.satisfaction}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
