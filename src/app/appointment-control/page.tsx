"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
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
  CalendarCog,
  AlertTriangle,
  Calendar,
  Clock,
  User,
  Search,
  Filter,
  Eye,
  XCircle,
  CheckCircle,
  AlertCircle,
  Repeat,
  Ban,
} from "lucide-react"

const mockConflicts = [
  {
    id: "CF001",
    type: "double_booking",
    patientName: "Sarah Johnson",
    patientId: "PT001",
    doctorName: "Dr. Emily Watson",
    doctorId: "DR001",
    date: "2024-01-15",
    conflictSlots: ["10:00 AM", "10:30 AM"],
    status: "pending",
  },
  {
    id: "CF002",
    type: "overlapping",
    patientName: "Michael Chen",
    patientId: "PT002",
    doctorName: "Dr. James Wilson",
    doctorId: "DR002",
    date: "2024-01-14",
    conflictSlots: ["2:00 PM", "3:00 PM"],
    status: "resolved",
  },
  {
    id: "CF003",
    type: "double_booking",
    patientName: "Emma Davis",
    patientId: "PT003",
    doctorName: "Dr. Sarah Miller",
    doctorId: "DR003",
    date: "2024-01-15",
    conflictSlots: ["11:00 AM", "11:30 AM"],
    status: "pending",
  },
  {
    id: "CF004",
    type: "resource_conflict",
    patientName: "Robert Wilson",
    patientId: "PT004",
    doctorName: "Dr. Emily Watson",
    doctorId: "DR001",
    date: "2024-01-13",
    conflictSlots: ["9:00 AM"],
    status: "resolved",
  },
]

const mockNoShows = [
  {
    id: "NS001",
    patientName: "Lisa Anderson",
    patientId: "PT005",
    doctorName: "Dr. James Wilson",
    doctorId: "DR002",
    scheduledDate: "2024-01-15",
    scheduledTime: "10:00 AM",
    noShowCount: 3,
    warningLevel: "high",
    lastNoShow: "2024-01-15",
    totalAppointments: 8,
  },
  {
    id: "NS002",
    patientName: "James Martinez",
    patientId: "PT006",
    doctorName: "Dr. Sarah Miller",
    doctorId: "DR003",
    scheduledDate: "2024-01-14",
    scheduledTime: "2:00 PM",
    noShowCount: 2,
    warningLevel: "medium",
    lastNoShow: "2024-01-14",
    totalAppointments: 5,
  },
  {
    id: "NS003",
    patientName: "Jennifer Taylor",
    patientId: "PT007",
    doctorName: "Dr. Emily Watson",
    doctorId: "DR001",
    scheduledDate: "2024-01-13",
    scheduledTime: "11:00 AM",
    noShowCount: 2,
    warningLevel: "medium",
    lastNoShow: "2024-01-13",
    totalAppointments: 4,
  },
  {
    id: "NS004",
    patientName: "David Brown",
    patientId: "PT008",
    doctorName: "Dr. Robert Lee",
    doctorId: "DR004",
    scheduledDate: "2024-01-12",
    scheduledTime: "3:00 PM",
    noShowCount: 4,
    warningLevel: "critical",
    lastNoShow: "2024-01-12",
    totalAppointments: 10,
  },
  {
    id: "NS005",
    patientName: "Amanda White",
    patientId: "PT009",
    doctorName: "Dr. James Wilson",
    doctorId: "DR002",
    scheduledDate: "2024-01-11",
    scheduledTime: "9:00 AM",
    noShowCount: 1,
    warningLevel: "low",
    lastNoShow: "2024-01-11",
    totalAppointments: 3,
  },
]

const conflictTypeConfig = {
  double_booking: { label: "Double Booking", icon: Repeat, color: "text-orange-500" },
  overlapping: { label: "Overlapping", icon: AlertCircle, color: "text-yellow-500" },
  resource_conflict: { label: "Resource Conflict", icon: Calendar, color: "text-red-500" },
}

const warningConfig = {
  low: { label: "Low", className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300" },
  medium: { label: "Medium", className: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300" },
  high: { label: "High", className: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300" },
  critical: { label: "Critical", className: "bg-red-600 text-white" },
}

export default function AppointmentControlPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [conflictFilter, setConflictFilter] = useState("all")
  const [warningFilter, setWarningFilter] = useState("all")
  const [selectedConflict, setSelectedConflict] = useState<typeof mockConflicts[0] | null>(null)
  const [selectedNoShow, setSelectedNoShow] = useState<typeof mockNoShows[0] | null>(null)
  const [isConflictModalOpen, setIsConflictModalOpen] = useState(false)
  const [isNoShowModalOpen, setIsNoShowModalOpen] = useState(false)

  const filteredConflicts = mockConflicts.filter((conflict) => {
    const matchesSearch =
      conflict.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conflict.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conflict.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = conflictFilter === "all" || conflict.status === conflictFilter
    return matchesSearch && matchesStatus
  })

  const filteredNoShows = mockNoShows.filter((noShow) => {
    const matchesSearch =
      noShow.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      noShow.patientId.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesWarning = warningFilter === "all" || noShow.warningLevel === warningFilter
    return matchesSearch && matchesWarning
  })

  const handleViewConflict = (conflict: typeof mockConflicts[0]) => {
    setSelectedConflict(conflict)
    setIsConflictModalOpen(true)
  }

  const handleViewNoShow = (noShow: typeof mockNoShows[0]) => {
    setSelectedNoShow(noShow)
    setIsNoShowModalOpen(true)
  }

  const handleResolveConflict = () => {
    console.log("Resolve conflict:", selectedConflict?.id)
    setIsConflictModalOpen(false)
  }

  const handleCancelAppointment = () => {
    console.log("Cancel appointment:", selectedNoShow?.id)
    setIsNoShowModalOpen(false)
  }

  const handleBlockPatient = () => {
    console.log("Block patient:", selectedNoShow?.patientId)
    setIsNoShowModalOpen(false)
  }

  const pendingConflicts = mockConflicts.filter((c) => c.status === "pending").length
  const criticalNoShows = mockNoShows.filter((n) => n.warningLevel === "critical" || n.warningLevel === "high").length

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Appointment Control</h1>
          <p className="text-muted-foreground">
            Manage booking conflicts and track no-show patterns
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-orange-200 dark:border-orange-900">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Conflicts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-500">{pendingConflicts}</div>
              <p className="text-xs text-muted-foreground">Need resolution</p>
            </CardContent>
          </Card>

          <Card className="border-red-200 dark:border-red-900">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Critical No-Shows</CardTitle>
              <XCircle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">{criticalNoShows}</div>
              <p className="text-xs text-muted-foreground">High priority</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Conflicts</CardTitle>
              <CalendarCog className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockConflicts.length}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total No-Shows</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockNoShows.length}</div>
              <p className="text-xs text-muted-foreground">Patients tracked</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle>Booking Conflicts</CardTitle>
                <CardDescription>
                  Double booking and scheduling conflicts requiring attention
                </CardDescription>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search conflicts..."
                    className="pl-8 w-full sm:w-[200px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={conflictFilter} onValueChange={setConflictFilter}>
                  <SelectTrigger className="w-full sm:w-[150px]">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredConflicts.map((conflict) => {
                const type = conflictTypeConfig[conflict.type as keyof typeof conflictTypeConfig]
                const TypeIcon = type?.icon || AlertCircle
                return (
                  <div
                    key={conflict.id}
                    className={`rounded-lg border p-4 ${
                      conflict.status === "pending"
                        ? "border-orange-200 bg-orange-50 dark:border-orange-900 dark:bg-orange-950/20"
                        : "border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950/20"
                    }`}
                  >
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex items-start gap-4">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-full ${
                          conflict.status === "pending" ? "bg-orange-100 dark:bg-orange-900" : "bg-green-100 dark:bg-green-900"
                        }`}>
                          <TypeIcon className={`h-5 w-5 ${type?.color || "text-muted-foreground"}`} />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">{type?.label || "Conflict"}</span>
                            <Badge variant={conflict.status === "pending" ? "secondary" : "default"}>
                              {conflict.status === "pending" ? "Pending" : "Resolved"}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {conflict.patientName} with {conflict.doctorName} on {conflict.date}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            Conflicting slots: {conflict.conflictSlots.join(", ")}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewConflict(conflict)}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          Details
                        </Button>
                        {conflict.status === "pending" && (
                          <Button size="sm" onClick={handleResolveConflict}>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Resolve
                          </Button>
                        )}
                      </div>
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
                <CardTitle>No-Show Tracking</CardTitle>
                <CardDescription>
                  Patients with multiple missed appointments
                </CardDescription>
              </div>
              <Select value={warningFilter} onValueChange={setWarningFilter}>
                <SelectTrigger className="w-full sm:w-[150px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Warning Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Scheduled</TableHead>
                  <TableHead>No-Show Count</TableHead>
                  <TableHead>Warning</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredNoShows.map((noShow) => {
                  const warning = warningConfig[noShow.warningLevel as keyof typeof warningConfig]
                  return (
                    <TableRow key={noShow.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className={`flex h-8 w-8 items-center justify-center rounded-full ${
                            noShow.warningLevel === "critical" || noShow.warningLevel === "high"
                              ? "bg-red-100 dark:bg-red-900"
                              : "bg-muted"
                          }`}>
                            <User className={`h-4 w-4 ${
                              noShow.warningLevel === "critical" || noShow.warningLevel === "high"
                                ? "text-red-500"
                                : "text-muted-foreground"
                            }`} />
                          </div>
                          <div>
                            <div className="font-medium">{noShow.patientName}</div>
                            <div className="text-xs text-muted-foreground">{noShow.patientId}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <span className="text-sm">{noShow.doctorName}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-sm">
                            <Calendar className="h-3 w-3 text-muted-foreground" />
                            {noShow.scheduledDate}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {noShow.scheduledTime}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Badge variant={noShow.noShowCount >= 3 ? "destructive" : "secondary"}>
                            {noShow.noShowCount} no-shows
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            / {noShow.totalAppointments} total
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={warning.className}>
                          {noShow.warningLevel === "critical" && (
                            <AlertTriangle className="mr-1 h-3 w-3" />
                          )}
                          {warning.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewNoShow(noShow)}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isConflictModalOpen} onOpenChange={setIsConflictModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Conflict Details - {selectedConflict?.id}</DialogTitle>
            <DialogDescription>
              {selectedConflict?.type === "double_booking" ? "Double Booking" : "Conflict"} detected
            </DialogDescription>
          </DialogHeader>
          {selectedConflict && (
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs">Patient</Label>
                  <p className="font-medium">{selectedConflict.patientName}</p>
                  <p className="text-sm text-muted-foreground">{selectedConflict.patientId}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs">Doctor</Label>
                  <p className="font-medium">{selectedConflict.doctorName}</p>
                  <p className="text-sm text-muted-foreground">{selectedConflict.doctorId}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs">Date</Label>
                  <p className="font-medium">{selectedConflict.date}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs">Status</Label>
                  <Badge variant={selectedConflict.status === "pending" ? "secondary" : "default"}>
                    {selectedConflict.status}
                  </Badge>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Conflicting Time Slots</Label>
                <div className="flex gap-2">
                  {selectedConflict.conflictSlots.map((slot) => (
                    <Badge key={slot} variant="outline" className="text-sm">
                      {slot}
                    </Badge>
                  ))}
                </div>
              </div>

              {selectedConflict.status === "pending" && (
                <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                  <Button variant="outline">
                    <XCircle className="mr-2 h-4 w-4" />
                    Cancel One
                  </Button>
                  <Button onClick={handleResolveConflict}>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Resolve Conflict
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isNoShowModalOpen} onOpenChange={setIsNoShowModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>No-Show Details - {selectedNoShow?.id}</DialogTitle>
            <DialogDescription>
              Patient has missed {selectedNoShow?.noShowCount} appointments
            </DialogDescription>
          </DialogHeader>
          {selectedNoShow && (
            <div className="space-y-4">
              <div className={`rounded-lg border p-4 ${
                selectedNoShow.warningLevel === "critical" || selectedNoShow.warningLevel === "high"
                  ? "border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/20"
                  : "bg-muted"
              }`}>
                <div className="flex items-center gap-2">
                  <AlertTriangle className={`h-5 w-5 ${
                    selectedNoShow.warningLevel === "critical" || selectedNoShow.warningLevel === "high"
                      ? "text-red-500"
                      : "text-yellow-500"
                  }`} />
                  <span className="font-semibold">
                    {selectedNoShow.warningLevel.toUpperCase()} WARNING
                  </span>
                </div>
                <p className="mt-2 text-sm">
                  This patient has missed {selectedNoShow.noShowCount} out of {selectedNoShow.totalAppointments} appointments.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs">Patient</Label>
                  <p className="font-medium">{selectedNoShow.patientName}</p>
                  <p className="text-sm text-muted-foreground">{selectedNoShow.patientId}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs">Doctor</Label>
                  <p className="font-medium">{selectedNoShow.doctorName}</p>
                  <p className="text-sm text-muted-foreground">{selectedNoShow.doctorId}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs">Scheduled Date</Label>
                  <p className="font-medium">{selectedNoShow.scheduledDate}</p>
                  <p className="text-sm text-muted-foreground">{selectedNoShow.scheduledTime}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs">Last No-Show</Label>
                  <p className="font-medium">{selectedNoShow.lastNoShow}</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Actions</Label>
                <div className="flex flex-col gap-2">
                  <Button variant="outline" onClick={handleCancelAppointment}>
                    <XCircle className="mr-2 h-4 w-4" />
                    Cancel Future Appointments
                  </Button>
                  <Button variant="destructive" onClick={handleBlockPatient}>
                    <Ban className="mr-2 h-4 w-4" />
                    Block Patient
                  </Button>
                  <Button variant="secondary">
                    Send Reminder
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
