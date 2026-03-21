"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
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
  Search,
  Filter,
  Ticket,
  Clock,
  CheckCircle,
  AlertCircle,
  MessageSquare,

  Calendar,
  Building,
  Send,
  Eye,
} from "lucide-react"

const mockTickets = [
  {
    id: "TKT001",
    subject: "Unable to book appointment",
    description: "User reports that the booking system shows no available slots even though doctor is listed as available.",
    status: "open",
    priority: "high",
    category: "Technical",
    assignedTo: null,
    createdBy: "Sarah Johnson",
    createdAt: "2024-01-15 09:30",
    messages: 3,
  },
  {
    id: "TKT002",
    subject: "Credit not reflecting in wallet",
    description: "User claims they received a promotional credit but it is not showing in their wallet balance.",
    status: "in_progress",
    priority: "medium",
    category: "Billing",
    assignedTo: "Hospital",
    createdBy: "Michael Chen",
    createdAt: "2024-01-14 14:20",
    messages: 5,
  },
  {
    id: "TKT003",
    subject: "Medical record upload failed",
    description: "User is trying to upload a PDF medical record but the system returns an error.",
    status: "resolved",
    priority: "low",
    category: "Technical",
    assignedTo: "Diagnostics",
    createdBy: "Emma Davis",
    createdAt: "2024-01-13 11:45",
    messages: 8,
  },
  {
    id: "TKT004",
    subject: "Insurance claim rejected",
    description: "User's insurance claim was rejected without clear explanation. Needs immediate assistance.",
    status: "open",
    priority: "high",
    category: "Insurance",
    assignedTo: null,
    createdBy: "Robert Wilson",
    createdAt: "2024-01-15 08:15",
    messages: 2,
  },
  {
    id: "TKT005",
    subject: "Doctor unavailable notification",
    description: "User wants to know why their preferred doctor is showing as unavailable.",
    status: "in_progress",
    priority: "medium",
    category: "General",
    assignedTo: "Hospital",
    createdBy: "Lisa Anderson",
    createdAt: "2024-01-14 16:30",
    messages: 4,
  },
  {
    id: "TKT006",
    subject: "Password reset not working",
    description: "User reports not receiving password reset email.",
    status: "resolved",
    priority: "medium",
    category: "Account",
    assignedTo: "Insurance",
    createdBy: "James Martinez",
    createdAt: "2024-01-12 10:00",
    messages: 6,
  },
]

const statusConfig = {
  open: { label: "Open", variant: "destructive" as const, icon: AlertCircle },
  in_progress: { label: "In Progress", variant: "secondary" as const, icon: Clock },
  resolved: { label: "Resolved", variant: "default" as const, icon: CheckCircle },
}

const priorityConfig = {
  low: { label: "Low", className: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" },
  medium: { label: "Medium", className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300" },
  high: { label: "High", className: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300" },
}

const departments = ["Hospital", "Diagnostics", "Insurance"]

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedTicket, setSelectedTicket] = useState<typeof mockTickets[0] | null>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [assignDepartment, setAssignDepartment] = useState("")
  const [replyMessage, setReplyMessage] = useState("")

  const filteredTickets = mockTickets.filter((ticket) => {
    const matchesSearch =
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.createdBy.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleViewTicket = (ticket: typeof mockTickets[0]) => {
    setSelectedTicket(ticket)
    setAssignDepartment(ticket.assignedTo || "")
    setIsViewModalOpen(true)
  }

  const handleAssign = () => {
    console.log("Assign ticket:", selectedTicket?.id, "to", assignDepartment)
  }

  const handleSendReply = () => {
    console.log("Reply to ticket:", selectedTicket?.id, replyMessage)
    setReplyMessage("")
  }

  const handleUpdateStatus = (status: string) => {
    console.log("Update ticket:", selectedTicket?.id, "status to", status)
    if (selectedTicket) {
      setSelectedTicket({ ...selectedTicket, status: status as typeof selectedTicket.status })
    }
  }

  const openCount = mockTickets.filter((t) => t.status === "open").length
  const inProgressCount = mockTickets.filter((t) => t.status === "in_progress").length
  const resolvedCount = mockTickets.filter((t) => t.status === "resolved").length

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Support Tickets</h1>
          <p className="text-muted-foreground">
            Manage and respond to user support requests
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Tickets</CardTitle>
              <Ticket className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockTickets.length}</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>

          <Card className="border-red-200 dark:border-red-900">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Open</CardTitle>
              <AlertCircle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">{openCount}</div>
              <p className="text-xs text-muted-foreground">Needs attention</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <Clock className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-500">{inProgressCount}</div>
              <p className="text-xs text-muted-foreground">Being worked on</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Resolved</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">{resolvedCount}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <CardTitle>Ticket List</CardTitle>
              <div className="flex flex-col gap-2 sm:flex-row">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search tickets..."
                    className="pl-8 w-full sm:w-[250px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-[150px]">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ticket ID</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTickets.map((ticket) => {
                  const status = statusConfig[ticket.status as keyof typeof statusConfig]
                  const StatusIcon = status.icon
                  const priority = priorityConfig[ticket.priority as keyof typeof priorityConfig]
                  return (
                    <TableRow key={ticket.id}>
                      <TableCell className="font-medium">{ticket.id}</TableCell>
                      <TableCell>
                        <div className="max-w-[200px]">
                          <div className="font-medium truncate">{ticket.subject}</div>
                          <div className="text-xs text-muted-foreground truncate">
                            {ticket.description}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{ticket.category}</TableCell>
                      <TableCell>
                        <Badge className={priority.className}>{priority.label}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={status.variant} className="gap-1">
                          <StatusIcon className="h-3 w-3" />
                          {status.label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {ticket.assignedTo ? (
                          <div className="flex items-center gap-1">
                            <Building className="h-3 w-3 text-muted-foreground" />
                            {ticket.assignedTo}
                          </div>
                        ) : (
                          <span className="text-muted-foreground">Unassigned</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          {ticket.createdAt}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleViewTicket(ticket)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleViewTicket(ticket)}
                          >
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Ticket Details - {selectedTicket?.id}</DialogTitle>
            <DialogDescription>{selectedTicket?.subject}</DialogDescription>
          </DialogHeader>
          {selectedTicket && (
            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs">Status</Label>
                  <Badge
                    variant={
                      statusConfig[selectedTicket.status as keyof typeof statusConfig]
                        .variant
                    }
                  >
                    {
                      statusConfig[selectedTicket.status as keyof typeof statusConfig]
                        .label
                    }
                  </Badge>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs">Priority</Label>
                  <Badge
                    className={
                      priorityConfig[selectedTicket.priority as keyof typeof priorityConfig]
                        .className
                    }
                  >
                    {
                      priorityConfig[selectedTicket.priority as keyof typeof priorityConfig]
                        .label
                    }
                  </Badge>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs">Category</Label>
                  <p className="font-medium">{selectedTicket.category}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs">Created By</Label>
                  <p className="font-medium">{selectedTicket.createdBy}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs">Created At</Label>
                  <p className="font-medium">{selectedTicket.createdAt}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs">Messages</Label>
                  <p className="font-medium">{selectedTicket.messages}</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-muted-foreground">Description</Label>
                <div className="rounded-lg bg-muted p-4">
                  <p>{selectedTicket.description}</p>
                </div>
              </div>

              <div className="space-y-3">
                <Label>Assign To Department</Label>
                <div className="flex gap-2">
                  <Select value={assignDepartment} onValueChange={setAssignDepartment}>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button onClick={handleAssign} disabled={!assignDepartment}>
                    Assign
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                <Label>Quick Status Update</Label>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(statusConfig).map(([key, config]) => {
                    const Icon = config.icon
                    return (
                      <Button
                        key={key}
                        variant={
                          selectedTicket.status === key ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => handleUpdateStatus(key)}
                      >
                        <Icon className="mr-2 h-4 w-4" />
                        {config.label}
                      </Button>
                    )
                  })}
                </div>
              </div>

              <div className="space-y-3">
                <Label>Reply to Ticket</Label>
                <Textarea
                  placeholder="Type your reply..."
                  rows={4}
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                />
                <div className="flex justify-end">
                  <Button disabled={!replyMessage.trim()} onClick={handleSendReply}>
                    <Send className="mr-2 h-4 w-4" />
                    Send Reply
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
