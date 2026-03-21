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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Shield,
  Search,
  Filter,
  Eye,
  CheckCircle,

  AlertTriangle,
  User,
  FileText,

  Building,
  Clock,
  RefreshCw,
  Send,
} from "lucide-react"

const mockInsuranceIssues = [
  {
    id: "INS001",
    userName: "Sarah Johnson",
    userId: "PT001",
    insuranceProvider: "BlueCross Health",
    policyNumber: "BCH-2024-12345",
    issueType: "linking",
    description: "Insurance policy not linking to user account",
    status: "pending",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15",
    assignedTo: null,
    notes: [],
  },
  {
    id: "INS002",
    userName: "Michael Chen",
    userId: "PT002",
    insuranceProvider: "Aetna Plus",
    policyNumber: "AP-2023-98765",
    issueType: "verification",
    description: "Policy expired, needs verification",
    status: "verified",
    createdAt: "2024-01-14",
    updatedAt: "2024-01-15",
    assignedTo: "Insurance Team",
    notes: ["Verified with provider", "Extended until Dec 2024"],
  },
  {
    id: "INS003",
    userName: "Emma Davis",
    userId: "PT003",
    insuranceProvider: "United Care",
    policyNumber: "UC-2024-54321",
    issueType: "escalation",
    description: "Coverage dispute - claim rejected incorrectly",
    status: "escalated",
    createdAt: "2024-01-13",
    updatedAt: "2024-01-15",
    assignedTo: "Escalation Team",
    notes: ["Escalated to supervisor", "Waiting for provider response"],
  },
  {
    id: "INS004",
    userName: "Robert Wilson",
    userId: "PT004",
    insuranceProvider: "Cigna Prime",
    policyNumber: "CP-2023-11111",
    issueType: "linking",
    description: "Multiple policies need consolidation",
    status: "pending",
    createdAt: "2024-01-12",
    updatedAt: "2024-01-12",
    assignedTo: null,
    notes: [],
  },
  {
    id: "INS005",
    userName: "Lisa Anderson",
    userId: "PT005",
    insuranceProvider: "BlueCross Health",
    policyNumber: "BCH-2024-22222",
    issueType: "verification",
    description: "Name mismatch between policy and ID",
    status: "verified",
    createdAt: "2024-01-11",
    updatedAt: "2024-01-14",
    assignedTo: "Verification Team",
    notes: ["Name corrected", "All documents verified"],
  },
  {
    id: "INS006",
    userName: "James Martinez",
    userId: "PT006",
    insuranceProvider: "Humana Gold",
    policyNumber: "HG-2024-33333",
    issueType: "escalation",
    description: "Urgent: Patient needs immediate coverage confirmation",
    status: "escalated",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15",
    assignedTo: "Escalation Team",
    notes: ["Urgent case", "Patient scheduled for surgery tomorrow"],
  },
  {
    id: "INS007",
    userName: "Jennifer Taylor",
    userId: "PT007",
    insuranceProvider: "Aetna Plus",
    policyNumber: "AP-2024-44444",
    issueType: "linking",
    description: "Policy not showing in claims system",
    status: "pending",
    createdAt: "2024-01-10",
    updatedAt: "2024-01-10",
    assignedTo: null,
    notes: [],
  },
]

const statusConfig = {
  pending: { label: "Pending", variant: "secondary" as const, icon: Clock },
  verified: { label: "Verified", variant: "default" as const, icon: CheckCircle },
  escalated: { label: "Escalated", variant: "destructive" as const, icon: AlertTriangle },
}

const issueTypeConfig = {
  linking: { label: "Linking Issue", color: "text-blue-500" },
  verification: { label: "Verification", color: "text-yellow-500" },
  escalation: { label: "Escalation", color: "text-red-500" },
}

interface InsuranceIssue {
  id: string
  userName: string
  userId: string
  insuranceProvider: string
  policyNumber: string
  issueType: string
  description: string
  status: string
  createdAt: string
  updatedAt: string
  assignedTo: string | null
  notes: string[]
}

export default function InsuranceIssuesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [selectedIssue, setSelectedIssue] = useState<InsuranceIssue | null>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [newNote, setNewNote] = useState("")

  const filteredIssues = mockInsuranceIssues.filter((issue) => {
    const matchesSearch =
      issue.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.userId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.policyNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.insuranceProvider.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || issue.status === statusFilter
    const matchesType = typeFilter === "all" || issue.issueType === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  const handleViewIssue = (issue: InsuranceIssue) => {
    setSelectedIssue(issue)
    setIsViewModalOpen(true)
  }

  const handleAddNote = () => {
    console.log("Add note to:", selectedIssue?.id, newNote)
    setNewNote("")
  }

  const handleMarkVerified = () => {
    console.log("Mark verified:", selectedIssue?.id)
    setIsViewModalOpen(false)
  }

  const handleEscalate = () => {
    console.log("Escalate:", selectedIssue?.id)
    setIsViewModalOpen(false)
  }

  const pendingCount = mockInsuranceIssues.filter((i) => i.status === "pending").length
  const escalatedCount = mockInsuranceIssues.filter((i) => i.status === "escalated").length

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Insurance Issues</h1>
          <p className="text-muted-foreground">
            Manage insurance policy linking and verification issues
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Issues</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockInsuranceIssues.length}</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>

          <Card className="border-yellow-200 dark:border-yellow-900">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Clock className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-500">{pendingCount}</div>
              <p className="text-xs text-muted-foreground">Awaiting action</p>
            </CardContent>
          </Card>

          <Card className="border-red-200 dark:border-red-900">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Escalated</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">{escalatedCount}</div>
              <p className="text-xs text-muted-foreground">Needs attention</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Verified</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">
                {mockInsuranceIssues.filter((i) => i.status === "verified").length}
              </div>
              <p className="text-xs text-muted-foreground">Resolved</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <CardTitle>Insurance Issues List</CardTitle>
              <div className="flex flex-col gap-2 sm:flex-row">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search issues..."
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
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="verified">Verified</SelectItem>
                    <SelectItem value="escalated">Escalated</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-full sm:w-[150px]">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="linking">Linking</SelectItem>
                    <SelectItem value="verification">Verification</SelectItem>
                    <SelectItem value="escalation">Escalation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Issue ID</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Insurance Provider</TableHead>
                  <TableHead>Policy Number</TableHead>
                  <TableHead>Issue Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredIssues.map((issue) => {
                  const status = statusConfig[issue.status as keyof typeof statusConfig]
                  const StatusIcon = status.icon
                  const issueType = issueTypeConfig[issue.issueType as keyof typeof issueTypeConfig]
                  return (
                    <TableRow key={issue.id}>
                      <TableCell className="font-medium">{issue.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                            <User className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium">{issue.userName}</div>
                            <div className="text-xs text-muted-foreground">{issue.userId}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Building className="h-3 w-3 text-muted-foreground" />
                          {issue.insuranceProvider}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <FileText className="h-3 w-3 text-muted-foreground" />
                          {issue.policyNumber}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={`text-sm font-medium ${issueType?.color}`}>
                          {issueType?.label}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge variant={status.variant} className="gap-1">
                          <StatusIcon className="h-3 w-3" />
                          {status.label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {issue.assignedTo ? (
                          <span className="text-sm">{issue.assignedTo}</span>
                        ) : (
                          <span className="text-muted-foreground text-sm">Unassigned</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewIssue(issue)}
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

      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Insurance Issue Details - {selectedIssue?.id}</DialogTitle>
            <DialogDescription>{selectedIssue?.description}</DialogDescription>
          </DialogHeader>
          {selectedIssue && (
            <div className="space-y-6">
              <div className={`rounded-lg border p-4 ${
                selectedIssue.status === "escalated"
                  ? "border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/20"
                  : selectedIssue.status === "pending"
                    ? "border-yellow-200 bg-yellow-50 dark:border-yellow-900 dark:bg-yellow-950/20"
                    : "border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950/20"
              }`}>
                <Badge variant={
                  statusConfig[selectedIssue.status as keyof typeof statusConfig].variant
                } className="gap-1">
                  {(() => {
                    const Icon = statusConfig[selectedIssue.status as keyof typeof statusConfig].icon
                    return <Icon className="h-3 w-3" />
                  })()}
                  {statusConfig[selectedIssue.status as keyof typeof statusConfig].label}
                </Badge>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs">User</Label>
                  <p className="font-medium">{selectedIssue.userName}</p>
                  <p className="text-sm text-muted-foreground">{selectedIssue.userId}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs">Insurance Provider</Label>
                  <p className="font-medium">{selectedIssue.insuranceProvider}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs">Policy Number</Label>
                  <p className="font-medium">{selectedIssue.policyNumber}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs">Issue Type</Label>
                  <span className={`font-medium ${issueTypeConfig[selectedIssue.issueType as keyof typeof issueTypeConfig]?.color}`}>
                    {issueTypeConfig[selectedIssue.issueType as keyof typeof issueTypeConfig]?.label}
                  </span>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs">Created</Label>
                  <p className="font-medium">{selectedIssue.createdAt}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs">Last Updated</Label>
                  <p className="font-medium">{selectedIssue.updatedAt}</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Notes</Label>
                <div className="space-y-2 max-h-[150px] overflow-y-auto rounded-lg bg-muted p-3">
                  {selectedIssue.notes.length > 0 ? (
                    selectedIssue.notes.map((note, index) => (
                      <div key={index} className="text-sm">
                        • {note}
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">No notes yet</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Add Note</Label>
                <div className="flex gap-2">
                  <Textarea
                    placeholder="Add a note..."
                    rows={2}
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={handleAddNote} disabled={!newNote.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Actions</Label>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Button
                    variant="default"
                    onClick={handleMarkVerified}
                    disabled={selectedIssue.status === "verified"}
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Mark as Verified
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={handleEscalate}
                    disabled={selectedIssue.status === "escalated"}
                  >
                    <AlertTriangle className="mr-2 h-4 w-4" />
                    Escalate
                  </Button>
                  <Button variant="outline">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Reassign
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
