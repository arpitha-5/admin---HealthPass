"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  FileBarChart,
  FileText,
  Download,
  Calendar,
  Clock,
  Users,
  CreditCard,
  TrendingUp,

  FileSpreadsheet,
  Presentation,
  Printer,
  Loader2,
} from "lucide-react"

const reportTemplates = [
  {
    id: "RPT001",
    name: "Daily Bookings Report",
    description: "Summary of all appointments booked and completed today",
    icon: Calendar,
    category: "Appointments",
    lastGenerated: "2024-01-15",
  },
  {
    id: "RPT002",
    name: "Credits Usage Report",
    description: "Detailed breakdown of credit transactions and usage",
    icon: CreditCard,
    category: "Financial",
    lastGenerated: "2024-01-14",
  },
  {
    id: "RPT003",
    name: "Patient Registration Report",
    description: "New patient registrations and demographic breakdown",
    icon: Users,
    category: "Patients",
    lastGenerated: "2024-01-13",
  },
  {
    id: "RPT004",
    name: "Doctor Performance Report",
    description: "Individual doctor metrics including consultations and ratings",
    icon: TrendingUp,
    category: "Doctors",
    lastGenerated: "2024-01-12",
  },
  {
    id: "RPT005",
    name: "Revenue Report",
    description: "Comprehensive financial summary including revenue by department",
    icon: FileText,
    category: "Financial",
    lastGenerated: "2024-01-11",
  },
  {
    id: "RPT006",
    name: "Cancellation Report",
    description: "Analysis of appointment cancellations and no-shows",
    icon: FileBarChart,
    category: "Appointments",
    lastGenerated: "2024-01-10",
  },
  {
    id: "RPT007",
    name: "Insurance Claims Report",
    description: "Status of insurance claims and processing times",
    icon: FileText,
    category: "Insurance",
    lastGenerated: "2024-01-09",
  },
  {
    id: "RPT008",
    name: "System Usage Report",
    description: "User activity metrics and system performance indicators",
    icon: TrendingUp,
    category: "System",
    lastGenerated: "2024-01-08",
  },
]

const recentReports = [
  {
    id: "HIST001",
    name: "Daily Bookings Report",
    generatedAt: "2024-01-15 08:00",
    generatedBy: "Admin User",
    format: "PDF",
    size: "245 KB",
  },
  {
    id: "HIST002",
    name: "Credits Usage Report",
    generatedAt: "2024-01-14 09:30",
    generatedBy: "Admin User",
    format: "Excel",
    size: "512 KB",
  },
  {
    id: "HIST003",
    name: "Patient Registration Report",
    generatedAt: "2024-01-13 10:15",
    generatedBy: "Admin User",
    format: "PDF",
    size: "189 KB",
  },
  {
    id: "HIST004",
    name: "Revenue Report - December 2023",
    generatedAt: "2024-01-05 14:00",
    generatedBy: "Admin User",
    format: "PDF",
    size: "1.2 MB",
  },
  {
    id: "HIST005",
    name: "Doctor Performance Report - Q4 2023",
    generatedAt: "2024-01-02 11:00",
    generatedBy: "Admin User",
    format: "Excel",
    size: "856 KB",
  },
]

const formatOptions = [
  { value: "pdf", label: "PDF Document", icon: FileText },
  { value: "excel", label: "Excel Spreadsheet", icon: FileSpreadsheet },
  { value: "csv", label: "CSV File", icon: FileBarChart },
  { value: "pptx", label: "PowerPoint", icon: Presentation },
]

interface ReportTemplate {
  id: string
  name: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  category: string
  lastGenerated: string
}

export default function ReportsPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<ReportTemplate | null>(null)
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false)
  const [dateRange, setDateRange] = useState("30d")
  const [exportFormat, setExportFormat] = useState("pdf")
  const [isGenerating, setIsGenerating] = useState(false)
  const [categoryFilter, setCategoryFilter] = useState("all")

  const filteredTemplates = reportTemplates.filter((template) => {
    return categoryFilter === "all" || template.category.toLowerCase() === categoryFilter.toLowerCase()
  })

  const handleGenerateReport = async () => {
    if (!selectedTemplate) return
    
    setIsGenerating(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsGenerating(false)
    setIsGenerateModalOpen(false)
    setSelectedTemplate(null)
  }

  const handleOpenGenerateModal = (template: ReportTemplate) => {
    setSelectedTemplate(template)
    setIsGenerateModalOpen(true)
  }

  const categories = [...new Set(reportTemplates.map((t) => t.category))]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
          <p className="text-muted-foreground">
            Generate and export operational reports
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available Reports</CardTitle>
              <FileBarChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{reportTemplates.length}</div>
              <p className="text-xs text-muted-foreground">Report templates</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Generated Today</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {recentReports.filter((r) => r.generatedAt.startsWith("2024-01-15")).length}
              </div>
              <p className="text-xs text-muted-foreground">Reports generated</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{recentReports.length}</div>
              <p className="text-xs text-muted-foreground">In history</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Quick Export</CardTitle>
              <Download className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <FileText className="mr-1 h-4 w-4" />
                  PDF
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <FileSpreadsheet className="mr-1 h-4 w-4" />
                  Excel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle>Report Templates</CardTitle>
                <CardDescription>
                  Select a template to generate a new report
                </CardDescription>
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat.toLowerCase()}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredTemplates.map((template) => {
                const Icon = template.icon
                return (
                  <div
                    key={template.id}
                    className="rounded-lg border p-4 transition-colors hover:bg-muted/50 cursor-pointer"
                    onClick={() => handleOpenGenerateModal(template)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <h3 className="font-medium leading-none">{template.name}</h3>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {template.description}
                        </p>
                        <div className="flex items-center gap-2 pt-1">
                          <Badge variant="secondary" className="text-xs">
                            {template.category}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground pt-1">
                          Last: {template.lastGenerated}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button size="sm" className="flex-1" onClick={() => handleOpenGenerateModal(template)}>
                        <FileBarChart className="mr-2 h-4 w-4" />
                        Generate
                      </Button>
                      <Button size="sm" variant="outline">
                        <Printer className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle>Recent Reports</CardTitle>
                <CardDescription>
                  Previously generated reports available for download
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Download All
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentReports.map((report) => (
                <div
                  key={report.id}
                  className="flex flex-col gap-3 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                      {report.format === "PDF" ? (
                        <FileText className="h-5 w-5 text-red-500" />
                      ) : (
                        <FileSpreadsheet className="h-5 w-5 text-green-500" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium">{report.name}</h4>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {report.generatedAt}
                        </span>
                        <span>•</span>
                        <span>{report.generatedBy}</span>
                        <span>•</span>
                        <Badge variant="outline" className="text-xs">
                          {report.format}
                        </Badge>
                        <span>•</span>
                        <span>{report.size}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Printer className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common report generation shortcuts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Button variant="outline" className="h-auto flex-col py-4 gap-2">
                <Calendar className="h-6 w-6" />
                <span className="text-sm">Daily Bookings</span>
              </Button>
              <Button variant="outline" className="h-auto flex-col py-4 gap-2">
                <CreditCard className="h-6 w-6" />
                <span className="text-sm">Credits Usage</span>
              </Button>
              <Button variant="outline" className="h-auto flex-col py-4 gap-2">
                <Users className="h-6 w-6" />
                <span className="text-sm">Patient Summary</span>
              </Button>
              <Button variant="outline" className="h-auto flex-col py-4 gap-2">
                <TrendingUp className="h-6 w-6" />
                <span className="text-sm">Performance</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isGenerateModalOpen} onOpenChange={setIsGenerateModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Generate Report</DialogTitle>
            <DialogDescription>
              Configure options for {selectedTemplate?.name}
            </DialogDescription>
          </DialogHeader>
          {selectedTemplate && (
            <div className="space-y-6">
              <div className="rounded-lg bg-muted p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    {(() => {
                      const Icon = selectedTemplate.icon
                      return <Icon className="h-5 w-5 text-primary" />
                    })()}
                  </div>
                  <div>
                    <h4 className="font-medium">{selectedTemplate.name}</h4>
                    <p className="text-sm text-muted-foreground">{selectedTemplate.description}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Date Range</Label>
                  <Select value={dateRange} onValueChange={setDateRange}>
                    <SelectTrigger>
                      <Calendar className="mr-2 h-4 w-4" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="7d">Last 7 Days</SelectItem>
                      <SelectItem value="30d">Last 30 Days</SelectItem>
                      <SelectItem value="90d">Last 90 Days</SelectItem>
                      <SelectItem value="1y">Last Year</SelectItem>
                      <SelectItem value="custom">Custom Range</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Export Format</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {formatOptions.map((format) => {
                      const Icon = format.icon
                      return (
                        <button
                          key={format.value}
                          type="button"
                          className={`flex items-center gap-2 rounded-lg border p-3 text-left transition-colors ${
                            exportFormat === format.value
                              ? "border-primary bg-primary/10"
                              : "hover:bg-muted"
                          }`}
                          onClick={() => setExportFormat(format.value)}
                        >
                          <Icon className="h-5 w-5" />
                          <span className="text-sm font-medium">{format.label}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Email Report (Optional)</Label>
                  <Input
                    type="email"
                    placeholder="Enter email address to receive report"
                  />
                  <p className="text-xs text-muted-foreground">
                    Leave empty to download directly
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsGenerateModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleGenerateReport} disabled={isGenerating}>
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <FileBarChart className="mr-2 h-4 w-4" />
                      Generate Report
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}
