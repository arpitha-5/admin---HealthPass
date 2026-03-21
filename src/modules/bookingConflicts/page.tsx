"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import { CalendarClock, AlertTriangle, Search, User, Calendar, Clock, CheckCircle } from "lucide-react"

const mockConflicts = [
  {
    id: "CON001",
    type: "double_booking",
    patientName: "Sarah Johnson",
    patientId: "PT001",
    doctorName: "Dr. Emily White",
    doctorId: "DOC001",
    date: "2026-03-25",
    conflictingSlots: ["09:00 AM", "09:30 AM"],
    hospital: "City General Hospital",
    status: "pending",
    reportedAt: "2026-03-21 10:30",
  },
  {
    id: "CON002",
    type: "double_booking",
    patientName: "Michael Chen",
    patientId: "PT002",
    doctorName: "Dr. Sarah Johnson",
    doctorId: "DOC002",
    date: "2026-03-24",
    conflictingSlots: ["02:00 PM", "02:30 PM"],
    hospital: "St. Mary's Medical Center",
    status: "resolved",
    reportedAt: "2026-03-20 14:15",
  },
  {
    id: "CON003",
    type: "overlapping",
    patientName: "Emma Davis",
    patientId: "PT003",
    doctorName: "Dr. Michael Lee",
    doctorId: "DOC003",
    date: "2026-03-23",
    conflictingSlots: ["11:00 AM"],
    hospital: "Metro Heart Institute",
    status: "pending",
    reportedAt: "2026-03-21 09:00",
  },
  {
    id: "CON004",
    type: "double_booking",
    patientName: "Robert Wilson",
    patientId: "PT004",
    doctorName: "Dr. Lisa Park",
    doctorId: "DOC004",
    date: "2026-03-22",
    conflictingSlots: ["03:00 PM", "03:15 PM"],
    hospital: "City General Hospital",
    status: "resolved",
    reportedAt: "2026-03-19 16:45",
  },
  {
    id: "CON005",
    type: "overlapping",
    patientName: "Lisa Anderson",
    patientId: "PT005",
    doctorName: "Dr. James Wilson",
    doctorId: "DOC005",
    date: "2026-03-26",
    conflictingSlots: ["10:00 AM"],
    hospital: "Riverside Children's Hospital",
    status: "pending",
    reportedAt: "2026-03-21 11:20",
  },
]

const statusConfig = {
  pending: { label: "Pending", className: "bg-yellow-500 text-white" },
  resolved: { label: "Resolved", className: "bg-green-500 text-white" },
}

const typeConfig = {
  double_booking: { label: "Double Booking", className: "bg-red-100 text-red-800" },
  overlapping: { label: "Overlapping", className: "bg-orange-100 text-orange-800" },
}

export default function BookingConflictsPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedConflict, setSelectedConflict] = useState<typeof mockConflicts[0] | null>(null)
  const [isViewOpen, setIsViewOpen] = useState(false)

  const filteredConflicts = mockConflicts.filter((conflict) => {
    const matchesSearch =
      conflict.patientName.toLowerCase().includes(search.toLowerCase()) ||
      conflict.doctorName.toLowerCase().includes(search.toLowerCase()) ||
      conflict.id.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === "all" || conflict.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleView = (conflict: typeof mockConflicts[0]) => {
    setSelectedConflict(conflict)
    setIsViewOpen(true)
  }

  const handleResolve = () => {
    console.log("Resolve conflict:", selectedConflict?.id)
    setIsViewOpen(false)
  }

  const pendingCount = mockConflicts.filter((c) => c.status === "pending").length
  const doubleBookingCount = mockConflicts.filter((c) => c.type === "double_booking").length

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Booking Conflicts</h1>
          <p className="text-muted-foreground">Detect and resolve double booking and overlapping appointments</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Conflicts</CardTitle>
              <CalendarClock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockConflicts.length}</div>
              <p className="text-xs text-muted-foreground">Detected this month</p>
            </CardContent>
          </Card>

          <Card className="border-yellow-200 dark:border-yellow-900">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-500">{pendingCount}</div>
              <p className="text-xs text-muted-foreground">Need resolution</p>
            </CardContent>
          </Card>

          <Card className="border-red-200 dark:border-red-900">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Double Bookings</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">{doubleBookingCount}</div>
              <p className="text-xs text-muted-foreground">Same slot booked twice</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Resolved</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">
                {mockConflicts.filter((c) => c.status === "resolved").length}
              </div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Conflict List</CardTitle>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search conflicts..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={statusFilter === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter("all")}
                >
                  All
                </Button>
                <Button
                  variant={statusFilter === "pending" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter("pending")}
                >
                  Pending
                </Button>
                <Button
                  variant={statusFilter === "resolved" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter("resolved")}
                >
                  Resolved
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Conflicting Slots</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredConflicts.map((conflict) => (
                  <TableRow
                    key={conflict.id}
                    className={conflict.status === "pending" ? "bg-yellow-50/50 dark:bg-yellow-950/20" : ""}
                  >
                    <TableCell className="font-medium">{conflict.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="font-medium">{conflict.patientName}</div>
                          <div className="text-xs text-muted-foreground">{conflict.patientId}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{conflict.doctorName}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        {conflict.date}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {conflict.conflictingSlots.map((slot) => (
                          <Badge key={slot} variant="outline" className="text-xs">
                            {slot}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={typeConfig[conflict.type as keyof typeof typeConfig].className}>
                        {typeConfig[conflict.type as keyof typeof typeConfig].label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={statusConfig[conflict.status as keyof typeof statusConfig].className}>
                        {statusConfig[conflict.status as keyof typeof statusConfig].label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => handleView(conflict)}>
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Booking Conflict Details</DialogTitle>
            <DialogDescription>{selectedConflict?.id}</DialogDescription>
          </DialogHeader>
          {selectedConflict && (
            <div className="space-y-4">
              <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950/20">
                <div className="flex items-center gap-2 text-red-800 dark:text-red-200 mb-2">
                  <AlertTriangle className="h-5 w-5" />
                  <span className="font-semibold">Conflict Alert</span>
                </div>
                <p className="text-sm text-red-700 dark:text-red-300">
                  {selectedConflict.type === "double_booking"
                    ? "This time slot has been booked multiple times for the same doctor."
                    : "This appointment overlaps with another scheduled appointment."}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground">Patient</label>
                  <p className="font-medium">{selectedConflict.patientName}</p>
                  <p className="text-sm text-muted-foreground">{selectedConflict.patientId}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Doctor</label>
                  <p className="font-medium">{selectedConflict.doctorName}</p>
                  <p className="text-sm text-muted-foreground">{selectedConflict.doctorId}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Hospital</label>
                  <p className="font-medium">{selectedConflict.hospital}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Date</label>
                  <p className="font-medium">{selectedConflict.date}</p>
                </div>
              </div>

              <div>
                <label className="text-sm text-muted-foreground">Conflicting Time Slots</label>
                <div className="flex gap-2 mt-2">
                  {selectedConflict.conflictingSlots.map((slot) => (
                    <Badge key={slot} variant="outline" className="text-lg px-3 py-1">
                      <Clock className="h-4 w-4 mr-1" />
                      {slot}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsViewOpen(false)}>
                  Cancel
                </Button>
                {selectedConflict.status === "pending" && (
                  <Button onClick={handleResolve}>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Mark Resolved
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}
