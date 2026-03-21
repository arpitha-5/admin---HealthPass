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
  Search,
  Filter,
  Eye,
  CheckCircle,
  XCircle,
  AlertTriangle,
  FileText,
  DollarSign,
  Clock,
  User,
  Calendar,
  Download,
} from "lucide-react"

const mockBills = [
  {
    id: "BLL001",
    patientName: "Sarah Johnson",
    patientId: "PT001",
    date: "2024-01-15",
    amount: 1500.00,
    status: "pending",
    category: "Consultation",
    description: "General consultation and follow-up",
    attachments: 2,
    submittedBy: "Metro Hospital",
  },
  {
    id: "BLL002",
    patientName: "Michael Chen",
    patientId: "PT002",
    date: "2024-01-14",
    amount: 3200.00,
    status: "approved",
    category: "Procedure",
    description: "Minor surgical procedure",
    attachments: 4,
    submittedBy: "City Diagnostics",
  },
  {
    id: "BLL003",
    patientName: "Emma Davis",
    patientId: "PT003",
    date: "2024-01-13",
    amount: 850.00,
    status: "pending",
    category: "Lab Tests",
    description: "Blood work and imaging",
    attachments: 3,
    submittedBy: "HealthFirst Lab",
  },
  {
    id: "BLL004",
    patientName: "Robert Wilson",
    patientId: "PT004",
    date: "2024-01-12",
    amount: 4500.00,
    status: "flagged",
    category: "Surgery",
    description: "Major surgery and post-op care",
    attachments: 6,
    submittedBy: "Metro Hospital",
  },
  {
    id: "BLL005",
    patientName: "Lisa Anderson",
    patientId: "PT005",
    date: "2024-01-11",
    amount: 200.00,
    status: "rejected",
    category: "Consultation",
    description: "Follow-up visit",
    attachments: 1,
    submittedBy: "City Clinic",
  },
  {
    id: "BLL006",
    patientName: "James Martinez",
    patientId: "PT006",
    date: "2024-01-10",
    amount: 1200.00,
    status: "pending",
    category: "Prescription",
    description: "Specialized medications",
    attachments: 2,
    submittedBy: "PharmaPlus",
  },
]

const statusConfig = {
  pending: { label: "Pending", variant: "secondary" as const, icon: Clock },
  approved: { label: "Approved", variant: "default" as const, icon: CheckCircle },
  rejected: { label: "Rejected", variant: "destructive" as const, icon: XCircle },
  flagged: { label: "Flagged", variant: "secondary" as const, icon: AlertTriangle },
}

interface BillDetails {
  id: string
  patientName: string
  patientId: string
  date: string
  amount: number
  status: string
  category: string
  description: string
  attachments: number
  submittedBy: string
  reviewedBy?: string
  reviewedDate?: string
  notes?: string
}

export default function BillsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedBill, setSelectedBill] = useState<BillDetails | null>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)

  const filteredBills = mockBills.filter((bill) => {
    const matchesSearch =
      bill.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bill.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bill.category.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || bill.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleViewBill = (bill: typeof mockBills[0]) => {
    setSelectedBill({
      ...bill,
      reviewedBy: bill.status !== "pending" ? "Admin User" : undefined,
      reviewedDate: bill.status !== "pending" ? "2024-01-15" : undefined,
      notes: bill.status === "flagged" ? "Duplicate billing detected - requires investigation" : undefined,
    })
    setIsViewModalOpen(true)
  }

  const handleApprove = () => {
    console.log("Approve bill:", selectedBill?.id)
    setIsViewModalOpen(false)
  }

  const handleReject = () => {
    console.log("Reject bill:", selectedBill?.id)
    setIsViewModalOpen(false)
  }

  const handleFlag = () => {
    console.log("Flag bill:", selectedBill?.id)
    setIsViewModalOpen(false)
  }

  const pendingCount = mockBills.filter((b) => b.status === "pending").length
  const totalAmount = mockBills
    .filter((b) => b.status === "approved")
    .reduce((sum, b) => sum + b.amount, 0)
  const flaggedCount = mockBills.filter((b) => b.status === "flagged").length

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Bill Management</h1>
          <p className="text-muted-foreground">
            Review and manage uploaded bills from healthcare providers
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Bills</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockBills.length}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingCount}</div>
              <p className="text-xs text-muted-foreground">Awaiting approval</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved Amount</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalAmount.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Total approved</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Flagged Bills</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{flaggedCount}</div>
              <p className="text-xs text-muted-foreground">Requires attention</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <CardTitle>Bill Records</CardTitle>
              <div className="flex flex-col gap-2 sm:flex-row">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search bills..."
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
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="flagged">Flagged</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Bill ID</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBills.map((bill) => {
                  const status = statusConfig[bill.status as keyof typeof statusConfig]
                  const StatusIcon = status.icon
                  return (
                    <TableRow key={bill.id}>
                      <TableCell className="font-medium">{bill.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                            <User className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium">{bill.patientName}</div>
                            <div className="text-xs text-muted-foreground">{bill.patientId}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          {bill.date}
                        </div>
                      </TableCell>
                      <TableCell>{bill.category}</TableCell>
                      <TableCell className="text-right font-medium">
                        ${bill.amount.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Badge variant={status.variant} className="gap-1">
                          <StatusIcon className="h-3 w-3" />
                          {status.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleViewBill(bill)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {bill.status === "pending" && (
                            <>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-green-600 hover:text-green-700 hover:bg-green-50"
                                onClick={handleApprove}
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                onClick={handleReject}
                              >
                                <XCircle className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50"
                                onClick={handleFlag}
                              >
                                <AlertTriangle className="h-4 w-4" />
                              </Button>
                            </>
                          )}
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
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Bill Details</DialogTitle>
            <DialogDescription>
              View complete details of bill {selectedBill?.id}
            </DialogDescription>
          </DialogHeader>
          {selectedBill && (
            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Patient Name</Label>
                  <p className="font-medium">{selectedBill.patientName}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Patient ID</Label>
                  <p className="font-medium">{selectedBill.patientId}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Bill Date</Label>
                  <p className="font-medium">{selectedBill.date}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Amount</Label>
                  <p className="font-medium text-lg">
                    ${selectedBill.amount.toLocaleString()}
                  </p>
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Category</Label>
                  <p className="font-medium">{selectedBill.category}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Submitted By</Label>
                  <p className="font-medium">{selectedBill.submittedBy}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Attachments</Label>
                  <p className="font-medium">{selectedBill.attachments} files</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Status</Label>
                  <Badge
                    variant={
                      statusConfig[selectedBill.status as keyof typeof statusConfig]
                        .variant
                    }
                  >
                    {statusConfig[selectedBill.status as keyof typeof statusConfig].label}
                  </Badge>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-muted-foreground">Description</Label>
                <p>{selectedBill.description}</p>
              </div>

              {selectedBill.notes && (
                <div className="space-y-2 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-950">
                  <Label className="text-yellow-800 dark:text-yellow-200">
                    Review Notes
                  </Label>
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">
                    {selectedBill.notes}
                  </p>
                </div>
              )}

              {selectedBill.reviewedBy && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">Reviewed By</Label>
                    <p className="font-medium">{selectedBill.reviewedBy}</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">Reviewed Date</Label>
                    <p className="font-medium">{selectedBill.reviewedDate}</p>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label className="text-muted-foreground">Add Notes</Label>
                <Textarea
                  placeholder="Enter review notes..."
                  rows={3}
                />
              </div>

              <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                <Button variant="outline" className="w-full sm:w-auto">
                  <Download className="mr-2 h-4 w-4" />
                  Download Attachments
                </Button>
                {selectedBill.status === "pending" && (
                  <>
                    <Button
                      variant="destructive"
                      onClick={handleReject}
                      className="w-full sm:w-auto"
                    >
                      <XCircle className="mr-2 h-4 w-4" />
                      Reject
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={handleFlag}
                      className="w-full sm:w-auto"
                    >
                      <AlertTriangle className="mr-2 h-4 w-4" />
                      Flag
                    </Button>
                    <Button onClick={handleApprove} className="w-full sm:w-auto">
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Approve
                    </Button>
                  </>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}
