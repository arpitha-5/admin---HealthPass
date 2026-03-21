"use client"

import { DashboardLayout } from "@/components/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { CalendarWithEvents } from "@/components/ui-extensions/calendar-div"
import {
  Plus,
  Calendar as CalendarIcon,
  List,
  Filter,
  Clock,
  Video,
  MapPin,
  Loader2,
  Trash2,
  MoreVertical,
} from "lucide-react"
import { useState } from "react"
import { useAppointments } from "@/hooks/use-appointments"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const statusColors: Record<string, string> = {
  Completed: "bg-green-500",
  Scheduled: "bg-blue-500",
  "In Progress": "bg-amber-500",
  Cancelled: "bg-red-500",
  "No-show": "bg-gray-500",
}

interface NewAppointment {
  patient: string
  doctor: string
  date: string
  time: string
  type: string
  location: string
}

const patients = [
  { id: "PT001", name: "Sarah Johnson" },
  { id: "PT002", name: "Robert Williams" },
  { id: "PT003", name: "Maria Garcia" },
  { id: "PT004", name: "David Brown" },
  { id: "PT005", name: "Emily Davis" },
  { id: "PT006", name: "Michael Chen" },
]

const doctors = [
  { id: "DOC001", name: "Dr. Michael Chen" },
  { id: "DOC002", name: "Dr. Emily Davis" },
  { id: "DOC003", name: "Dr. James Wilson" },
  { id: "DOC004", name: "Dr. Sarah Miller" },
  { id: "DOC005", name: "Dr. Lisa Park" },
]

const timeSlots = [
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM",
]

const appointmentTypes = [
  "General Checkup",
  "Follow-up",
  "Consultation",
  "Teleconsultation",
  "Lab Results",
  "Annual Physical",
]

export default function AppointmentsPage() {
  const { data: appointments = [], isLoading } = useAppointments()
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedAppointment, setSelectedAppointment] = useState<typeof appointments[0] | null>(null)
  const [statusFilter, setStatusFilter] = useState("all")

  const [newAppointment, setNewAppointment] = useState<NewAppointment>({
    patient: "",
    doctor: "",
    date: "",
    time: "",
    type: "",
    location: "",
  })

  const calendarEvents = appointments.map((apt) => ({
    id: apt.id,
    title: apt.patient,
    date: new Date(apt.date),
    type: "appointment" as const,
  }))

  const filteredAppointments = appointments.filter((apt) => {
    if (statusFilter === "all") return true
    return apt.status.toLowerCase() === statusFilter.toLowerCase()
  })

  const handleAddAppointment = () => {
    if (!newAppointment.patient || !newAppointment.doctor || !newAppointment.date || !newAppointment.time) {
      return
    }
    console.log("Adding appointment:", newAppointment)
    setIsAddDialogOpen(false)
    setNewAppointment({
      patient: "",
      doctor: "",
      date: "",
      time: "",
      type: "",
      location: "",
    })
  }

  const handleDeleteClick = (apt: typeof appointments[0]) => {
    setSelectedAppointment(apt)
    setIsDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = () => {
    console.log("Deleting appointment:", selectedAppointment?.id)
    setIsDeleteDialogOpen(false)
    setSelectedAppointment(null)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Appointments</h1>
            <p className="text-muted-foreground">
              Manage and schedule patient appointments.
            </p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Appointment
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Schedule New Appointment</DialogTitle>
                <DialogDescription>
                  Fill in the appointment details below.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label>Patient *</Label>
                  <Select value={newAppointment.patient} onValueChange={(value) => setNewAppointment({ ...newAppointment, patient: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select patient" />
                    </SelectTrigger>
                    <SelectContent>
                      {patients.map((p) => (
                        <SelectItem key={p.id} value={p.name}>
                          {p.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Doctor *</Label>
                  <Select value={newAppointment.doctor} onValueChange={(value) => setNewAppointment({ ...newAppointment, doctor: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select doctor" />
                    </SelectTrigger>
                    <SelectContent>
                      {doctors.map((d) => (
                        <SelectItem key={d.id} value={d.name}>
                          {d.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Date *</Label>
                    <Input
                      type="date"
                      value={newAppointment.date}
                      onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Time *</Label>
                    <Select value={newAppointment.time} onValueChange={(value) => setNewAppointment({ ...newAppointment, time: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Appointment Type</Label>
                  <Select value={newAppointment.type} onValueChange={(value) => setNewAppointment({ ...newAppointment, type: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {appointmentTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Location / Room</Label>
                  <Input
                    placeholder="Room 101"
                    value={newAppointment.location}
                    onChange={(e) => setNewAppointment({ ...newAppointment, location: e.target.value })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleAddAppointment}
                  disabled={!newAppointment.patient || !newAppointment.doctor || !newAppointment.date || !newAppointment.time}
                >
                  Schedule
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="calendar" className="space-y-4">
          <TabsList>
            <TabsTrigger value="calendar" className="gap-2">
              <CalendarIcon className="h-4 w-4" />
              Calendar
            </TabsTrigger>
            <TabsTrigger value="list" className="gap-2">
              <List className="h-4 w-4" />
              List View
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calendar" className="space-y-4">
            <div className="grid gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Calendar</CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="flex h-[400px] items-center justify-center">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : (
                    <CalendarWithEvents
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      events={calendarEvents}
                      className="w-full"
                    />
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">
                    {selectedDate.toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {isLoading ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    </div>
                  ) : appointments.length > 0 ? (
                    appointments.slice(0, 6).map((apt) => (
                      <div
                        key={apt.id}
                        className="flex items-start gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/50"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 shrink-0">
                          <Clock className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <p className="font-semibold">{apt.time}</p>
                            <Badge className={statusColors[apt.status]}>{apt.status}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{apt.patient}</p>
                          <p className="text-xs text-muted-foreground">
                            {apt.type} - {apt.doctor}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-sm text-muted-foreground py-8">
                      No appointments for this date.
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="list">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <CardTitle className="text-lg">All Appointments ({appointments.length})</CardTitle>
                  <div className="flex items-center gap-2">
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="scheduled">Scheduled</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="in progress">In Progress</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                        <SelectItem value="no-show">No-show</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex h-[300px] items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : (
                    <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="font-semibold">Patient</TableHead>
                          <TableHead className="font-semibold">Doctor</TableHead>
                          <TableHead className="font-semibold">Date & Time</TableHead>
                          <TableHead className="font-semibold">Type</TableHead>
                          <TableHead className="font-semibold">Location</TableHead>
                          <TableHead className="font-semibold">Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredAppointments.map((apt) => (
                          <TableRow key={apt.id} className="hover:bg-muted/50">
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8">
                                  <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                                    {apt.patient.split(" ").map((n) => n[0]).join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="font-semibold">{apt.patient}</span>
                              </div>
                            </TableCell>
                            <TableCell>{apt.doctor}</TableCell>
                            <TableCell>
                              <div>
                                <div className="font-medium">{apt.date}</div>
                                <div className="text-sm text-muted-foreground">
                                  {apt.time}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                {apt.type === "Teleconsultation" ? (
                                  <Video className="h-3 w-3 text-muted-foreground" />
                                ) : (
                                  <MapPin className="h-3 w-3 text-muted-foreground" />
                                )}
                                {apt.type}
                              </div>
                            </TableCell>
                            <TableCell>{apt.location}</TableCell>
                            <TableCell>
                              <Badge className={statusColors[apt.status]}>
                                {apt.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem
                                    onClick={() => handleDeleteClick(apt)}
                                    className="text-red-600"
                                  >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Appointment</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this appointment? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {selectedAppointment && (
            <div className="rounded-lg border p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                  <CalendarIcon className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="font-medium">{selectedAppointment.patient}</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedAppointment.date} at {selectedAppointment.time}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {selectedAppointment.type} with {selectedAppointment.doctor}
                  </p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Appointment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}
