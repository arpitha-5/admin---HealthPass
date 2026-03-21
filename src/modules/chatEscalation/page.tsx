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
  DialogFooter,
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
import { MessageSquare, Search, CheckCircle, Forward, Clock, User, AlertCircle } from "lucide-react"

const mockEscalatedChats = [
  {
    id: "ESC001",
    userName: "Sarah Johnson",
    userId: "PT001",
    subject: "Appointment Rescheduling Issue",
    message: "I have been trying to reschedule my appointment for the past 3 days but the system keeps giving an error.",
    escalatedAt: "2026-03-21 09:30",
    status: "pending",
    assignedTo: "Support Team",
    priority: "high",
  },
  {
    id: "ESC002",
    userName: "Michael Chen",
    userId: "PT002",
    subject: "Payment Failed but Amount Deducted",
    message: "My payment failed but the amount was deducted from my account. I need a refund immediately.",
    escalatedAt: "2026-03-20 14:15",
    status: "pending",
    assignedTo: "Billing Team",
    priority: "critical",
  },
  {
    id: "ESC003",
    userName: "Emma Davis",
    userId: "PT003",
    subject: "Doctor Complaint",
    message: "The doctor was rude during my consultation and refused to provide proper explanation.",
    escalatedAt: "2026-03-19 11:00",
    status: "resolved",
    assignedTo: "HR Team",
    priority: "medium",
  },
  {
    id: "ESC004",
    userName: "Robert Wilson",
    userId: "PT004",
    subject: "Prescription Not Available",
    message: "The prescribed medicine is not available at any pharmacy in my area.",
    escalatedAt: "2026-03-18 16:45",
    status: "resolved",
    assignedTo: "Pharmacy Team",
    priority: "low",
  },
  {
    id: "ESC005",
    userName: "Lisa Anderson",
    userId: "PT005",
    subject: "Insurance Claim Rejected",
    message: "My insurance claim was rejected without proper explanation. I need urgent clarification.",
    escalatedAt: "2026-03-21 08:00",
    status: "pending",
    assignedTo: "Insurance Team",
    priority: "high",
  },
]

const statusConfig = {
  pending: { label: "Pending", className: "bg-yellow-500 text-white" },
  resolved: { label: "Resolved", className: "bg-green-500 text-white" },
}

const priorityConfig = {
  low: { label: "Low", className: "bg-blue-100 text-blue-800" },
  medium: { label: "Medium", className: "bg-yellow-100 text-yellow-800" },
  high: { label: "High", className: "bg-orange-100 text-orange-800" },
  critical: { label: "Critical", className: "bg-red-500 text-white" },
}

export default function ChatEscalationPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedChat, setSelectedChat] = useState<typeof mockEscalatedChats[0] | null>(null)
  const [isViewOpen, setIsViewOpen] = useState(false)
  const [forwardTo, setForwardTo] = useState("")

  const filteredChats = mockEscalatedChats.filter((chat) => {
    const matchesSearch =
      chat.userName.toLowerCase().includes(search.toLowerCase()) ||
      chat.subject.toLowerCase().includes(search.toLowerCase()) ||
      chat.id.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === "all" || chat.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleView = (chat: typeof mockEscalatedChats[0]) => {
    setSelectedChat(chat)
    setIsViewOpen(true)
  }

  const handleResolve = () => {
    console.log("Resolve chat:", selectedChat?.id)
    setIsViewOpen(false)
  }

  const handleForward = () => {
    console.log("Forward chat:", selectedChat?.id, "to:", forwardTo)
    setIsViewOpen(false)
    setForwardTo("")
  }

  const pendingCount = mockEscalatedChats.filter((c) => c.status === "pending").length
  const criticalCount = mockEscalatedChats.filter((c) => c.priority === "critical").length

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Chat Escalation</h1>
          <p className="text-muted-foreground">Manage escalated support conversations</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Escalations</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockEscalatedChats.length}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Clock className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-500">{pendingCount}</div>
              <p className="text-xs text-muted-foreground">Awaiting response</p>
            </CardContent>
          </Card>

          <Card className="border-red-200 dark:border-red-900">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Critical</CardTitle>
              <AlertCircle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">{criticalCount}</div>
              <p className="text-xs text-muted-foreground">Needs immediate attention</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Resolved</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">
                {mockEscalatedChats.filter((c) => c.status === "resolved").length}
              </div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Escalated Conversations</CardTitle>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search escalations..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Escalated At</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredChats.map((chat) => (
                  <TableRow key={chat.id}>
                    <TableCell className="font-medium">{chat.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="font-medium">{chat.userName}</div>
                          <div className="text-xs text-muted-foreground">{chat.userId}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate">{chat.subject}</TableCell>
                    <TableCell>
                      <Badge className={priorityConfig[chat.priority as keyof typeof priorityConfig].className}>
                        {priorityConfig[chat.priority as keyof typeof priorityConfig].label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={statusConfig[chat.status as keyof typeof statusConfig].className}>
                        {statusConfig[chat.status as keyof typeof statusConfig].label}
                      </Badge>
                    </TableCell>
                    <TableCell>{chat.escalatedAt}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => handleView(chat)}>
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
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Chat Escalation Details</DialogTitle>
            <DialogDescription>{selectedChat?.id}</DialogDescription>
          </DialogHeader>
          {selectedChat && (
            <div className="space-y-4">
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{selectedChat.subject}</span>
                  <Badge className={priorityConfig[selectedChat.priority as keyof typeof priorityConfig].className}>
                    {priorityConfig[selectedChat.priority as keyof typeof priorityConfig].label}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{selectedChat.message}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    {selectedChat.userName} ({selectedChat.userId})
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {selectedChat.escalatedAt}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground">Assigned To</label>
                  <p className="font-medium">{selectedChat.assignedTo}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Status</label>
                  <Badge className={statusConfig[selectedChat.status as keyof typeof statusConfig].className}>
                    {statusConfig[selectedChat.status as keyof typeof statusConfig].label}
                  </Badge>
                </div>
              </div>

              {selectedChat.status === "pending" && (
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium">Forward To</label>
                    <Select value={forwardTo} onValueChange={setForwardTo}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select team" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="billing">Billing Team</SelectItem>
                        <SelectItem value="hr">HR Team</SelectItem>
                        <SelectItem value="insurance">Insurance Team</SelectItem>
                        <SelectItem value="pharmacy">Pharmacy Team</SelectItem>
                        <SelectItem value="management">Management</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              <DialogFooter>
                {selectedChat.status === "pending" ? (
                  <>
                    <Button variant="outline" onClick={() => setIsViewOpen(false)}>
                      Cancel
                    </Button>
                    <Button variant="secondary" onClick={handleForward} disabled={!forwardTo}>
                      <Forward className="mr-2 h-4 w-4" />
                      Forward
                    </Button>
                    <Button onClick={handleResolve}>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Mark Resolved
                    </Button>
                  </>
                ) : (
                  <Button variant="outline" onClick={() => setIsViewOpen(false)}>
                    Close
                  </Button>
                )}
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}
