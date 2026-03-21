"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import {
  ShieldAlert,
  Search,
  Filter,
  AlertTriangle,
  User,
  Clock,
  FileText,
  Eye,
  Ban,
  CheckCircle,
  XCircle,
  Copy,
  Calendar,
  MapPin,
  CreditCard,
  FileWarning,
  RefreshCw,
} from "lucide-react"

const mockFlaggedActivities = [
  {
    id: "FRA001",
    type: "duplicate_referral",
    label: "Duplicate Referral",
    userName: "Sarah Johnson",
    userId: "PT001",
    date: "2024-01-15",
    time: "14:30",
    severity: "high",
    description: "Same medical referral submitted 3 times within 24 hours",
    location: "Metro Hospital",
    status: "investigating",
    evidence: ["Multiple submission IPs", "Identical documents", "Rapid timing"],
  },
  {
    id: "FRA002",
    type: "suspicious_activity",
    label: "Suspicious Activity",
    userName: "Michael Chen",
    userId: "PT002",
    date: "2024-01-14",
    time: "09:15",
    severity: "medium",
    description: "Unusual login patterns from multiple locations",
    location: "City Diagnostics",
    status: "pending",
    evidence: ["Multiple IPs", "Unusual timing", "New device"],
  },
  {
    id: "FRA003",
    type: "credit_fraud",
    label: "Credit Abuse",
    userName: "Emma Davis",
    userId: "PT003",
    date: "2024-01-13",
    time: "16:45",
    severity: "high",
    description: "Attempted to claim credit bonus multiple times using different accounts",
    location: "Online",
    status: "confirmed",
    evidence: ["Same email pattern", "Shared payment method", "Cross-account linking"],
  },
  {
    id: "FRA004",
    type: "identity_theft",
    label: "Identity Mismatch",
    userName: "Robert Wilson",
    userId: "PT004",
    date: "2024-01-12",
    time: "11:20",
    severity: "high",
    description: "Patient identity does not match insurance records",
    location: "HealthFirst Clinic",
    status: "resolved",
    evidence: ["Name mismatch", "DOB discrepancy", "Policy not found"],
  },
  {
    id: "FRA005",
    type: "billing_fraud",
    label: "Duplicate Billing",
    userName: "Lisa Anderson",
    userId: "PT005",
    date: "2024-01-11",
    time: "08:00",
    severity: "medium",
    description: "Same procedure billed to both insurance and patient",
    location: "Metro Hospital",
    status: "investigating",
    evidence: ["Double billing detected", "Amount discrepancy", "Timing overlap"],
  },
  {
    id: "FRA006",
    type: "suspicious_activity",
    label: "Appointment Scam",
    userName: "James Martinez",
    userId: "PT006",
    date: "2024-01-10",
    time: "13:30",
    severity: "low",
    description: "Multiple no-shows followed by urgent appointment requests",
    location: "Online Booking",
    status: "dismissed",
    evidence: ["Pattern of no-shows", "Last-minute bookings"],
  },
]

const typeConfig = {
  duplicate_referral: { label: "Duplicate Referral", icon: Copy, color: "text-orange-500" },
  suspicious_activity: { label: "Suspicious Activity", icon: AlertTriangle, color: "text-yellow-500" },
  credit_fraud: { label: "Credit Fraud", icon: CreditCard, color: "text-red-500" },
  identity_theft: { label: "Identity Theft", icon: User, color: "text-red-600" },
  billing_fraud: { label: "Billing Fraud", icon: FileText, color: "text-orange-600" },
  appointment_scam: { label: "Appointment Scam", icon: Calendar, color: "text-yellow-600" },
}

const severityConfig = {
  low: { label: "Low", className: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" },
  medium: { label: "Medium", className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300" },
  high: { label: "High", className: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300" },
}

const statusConfig = {
  pending: { label: "Pending Review", variant: "secondary" as const },
  investigating: { label: "Investigating", variant: "secondary" as const },
  confirmed: { label: "Confirmed", variant: "destructive" as const },
  resolved: { label: "Resolved", variant: "default" as const },
  dismissed: { label: "Dismissed", variant: "secondary" as const },
}

interface FlaggedItem {
  id: string
  type: string
  label: string
  userName: string
  userId: string
  date: string
  time: string
  severity: string
  description: string
  location: string
  status: string
  evidence: string[]
}

export default function FraudPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [severityFilter, setSeverityFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedItem, setSelectedItem] = useState<FlaggedItem | null>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)

  const filteredActivities = mockFlaggedActivities.filter((item) => {
    const matchesSearch =
      item.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSeverity = severityFilter === "all" || item.severity === severityFilter
    const matchesStatus = statusFilter === "all" || item.status === statusFilter
    return matchesSearch && matchesSeverity && matchesStatus
  })

  const handleViewDetails = (item: FlaggedItem) => {
    setSelectedItem(item)
    setIsViewModalOpen(true)
  }

  const handleBlockUser = () => {
    console.log("Block user:", selectedItem?.userId)
  }

  const handleMarkResolved = () => {
    console.log("Mark as resolved:", selectedItem?.id)
    setIsViewModalOpen(false)
  }

  const handleDismiss = () => {
    console.log("Dismiss case:", selectedItem?.id)
    setIsViewModalOpen(false)
  }

  const highSeverityCount = mockFlaggedActivities.filter((a) => a.severity === "high").length
  const pendingCount = mockFlaggedActivities.filter((a) => a.status === "pending" || a.status === "investigating").length

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Fraud Detection</h1>
          <p className="text-muted-foreground">
            Monitor and investigate flagged user activities
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-red-200 dark:border-red-900">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">High Priority Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">{highSeverityCount}</div>
              <p className="text-xs text-muted-foreground">Requires immediate action</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
              <Clock className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-500">{pendingCount}</div>
              <p className="text-xs text-muted-foreground">Under investigation</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Flagged</CardTitle>
              <ShieldAlert className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockFlaggedActivities.length}</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Resolved</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">
                {mockFlaggedActivities.filter((a) => a.status === "resolved").length}
              </div>
              <p className="text-xs text-muted-foreground">Cases closed</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle>Flagged Activities</CardTitle>
                <CardDescription>
                  Review suspicious activities and take action
                </CardDescription>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search..."
                    className="pl-8 w-full sm:w-[200px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={severityFilter} onValueChange={setSeverityFilter}>
                  <SelectTrigger className="w-full sm:w-[130px]">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Severity</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-[150px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="investigating">Investigating</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="dismissed">Dismissed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredActivities.map((item) => {
                const type = typeConfig[item.type as keyof typeof typeConfig]
                const TypeIcon = type?.icon || AlertTriangle
                const severity = severityConfig[item.severity as keyof typeof severityConfig]
                const status = statusConfig[item.status as keyof typeof statusConfig]
                return (
                  <div
                    key={item.id}
                    className={`rounded-lg border p-4 transition-colors ${
                      item.severity === "high"
                        ? "border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/20"
                        : item.severity === "medium"
                          ? "border-yellow-200 bg-yellow-50 dark:border-yellow-900 dark:bg-yellow-950/20"
                          : "border-border bg-card"
                    }`}
                  >
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex items-start gap-4">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-full ${
                            item.severity === "high"
                              ? "bg-red-100 dark:bg-red-900"
                              : item.severity === "medium"
                                ? "bg-yellow-100 dark:bg-yellow-900"
                                : "bg-muted"
                          }`}
                        >
                          <TypeIcon className={`h-5 w-5 ${type?.color || "text-muted-foreground"}`} />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">{type?.label || item.label}</span>
                            <Badge className={severity.className}>{severity.label}</Badge>
                            <Badge variant={status.variant}>{status.label}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              {item.userName} ({item.userId})
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {item.date} at {item.time}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {item.location}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewDetails(item)}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Fraud Case Details - {selectedItem?.id}</DialogTitle>
            <DialogDescription>
              {selectedItem?.label} - {selectedItem?.severity.toUpperCase()} SEVERITY
            </DialogDescription>
          </DialogHeader>
          {selectedItem && (
            <div className="space-y-6">
              <div className={`rounded-lg border p-4 ${
                selectedItem.severity === "high"
                  ? "border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/20"
                  : selectedItem.severity === "medium"
                    ? "border-yellow-200 bg-yellow-50 dark:border-yellow-900 dark:bg-yellow-950/20"
                    : "bg-muted"
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className={`h-5 w-5 ${
                    selectedItem.severity === "high" ? "text-red-500" : "text-yellow-500"
                  }`} />
                  <span className="font-semibold">{selectedItem.severity.toUpperCase()} PRIORITY</span>
                </div>
                <p className="text-sm">{selectedItem.description}</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs">User</Label>
                  <p className="font-medium">{selectedItem.userName}</p>
                  <p className="text-sm text-muted-foreground">{selectedItem.userId}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs">Date & Time</Label>
                  <p className="font-medium">{selectedItem.date}</p>
                  <p className="text-sm text-muted-foreground">{selectedItem.time}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs">Location</Label>
                  <p className="font-medium">{selectedItem.location}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs">Status</Label>
                  <Badge variant={statusConfig[selectedItem.status as keyof typeof statusConfig].variant}>
                    {statusConfig[selectedItem.status as keyof typeof statusConfig].label}
                  </Badge>
                </div>
              </div>

              <div className="space-y-3">
                <Label>Evidence Collected</Label>
                <div className="flex flex-wrap gap-2">
                  {selectedItem.evidence.map((item, index) => (
                    <Badge key={index} variant="secondary" className="gap-1">
                      <FileWarning className="h-3 w-3" />
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Label>Quick Actions</Label>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Button variant="destructive" onClick={handleBlockUser}>
                    <Ban className="mr-2 h-4 w-4" />
                    Block User
                  </Button>
                  <Button variant="default" onClick={handleMarkResolved}>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Mark Resolved
                  </Button>
                  <Button variant="outline" onClick={handleDismiss}>
                    <XCircle className="mr-2 h-4 w-4" />
                    Dismiss Case
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Add Investigation Notes</Label>
                <textarea
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  rows={3}
                  placeholder="Enter notes about this case..."
                />
                <div className="flex justify-end">
                  <Button size="sm">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Save Notes
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}
