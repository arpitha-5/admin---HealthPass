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
import { Minus, Plus, Ticket, Clock, User, Calendar, History } from "lucide-react"

const mockFreeVisits = [
  {
    id: "FV001",
    userName: "Sarah Johnson",
    userId: "PT001",
    totalVisits: 3,
    usedVisits: 1,
    remainingVisits: 2,
    validUntil: "2026-04-30",
    status: "active",
  },
  {
    id: "FV002",
    userName: "Michael Chen",
    userId: "PT002",
    totalVisits: 5,
    usedVisits: 5,
    remainingVisits: 0,
    validUntil: "2026-03-25",
    status: "expired",
  },
  {
    id: "FV003",
    userName: "Emma Davis",
    userId: "PT003",
    totalVisits: 2,
    usedVisits: 0,
    remainingVisits: 2,
    validUntil: "2026-05-15",
    status: "active",
  },
  {
    id: "FV004",
    userName: "Robert Wilson",
    userId: "PT004",
    totalVisits: 4,
    usedVisits: 2,
    remainingVisits: 2,
    validUntil: "2026-04-10",
    status: "active",
  },
  {
    id: "FV005",
    userName: "Lisa Anderson",
    userId: "PT005",
    totalVisits: 1,
    usedVisits: 1,
    remainingVisits: 0,
    validUntil: "2026-03-20",
    status: "expired",
  },
]

const mockAuditLog = [
  {
    id: "LOG001",
    userId: "PT001",
    userName: "Sarah Johnson",
    action: "increase",
    previousCount: 2,
    newCount: 3,
    reason: "Promotional bonus",
    adjustedBy: "Admin User",
    adjustedAt: "2026-03-21 10:30",
  },
  {
    id: "LOG002",
    userId: "PT002",
    userName: "Michael Chen",
    action: "decrease",
    previousCount: 6,
    newCount: 5,
    reason: "Correction - unused visits",
    adjustedBy: "Admin User",
    adjustedAt: "2026-03-20 14:15",
  },
  {
    id: "LOG003",
    userId: "PT003",
    userName: "Emma Davis",
    action: "increase",
    previousCount: 1,
    newCount: 2,
    reason: "Customer retention",
    adjustedBy: "Admin User",
    adjustedAt: "2026-03-19 09:00",
  },
  {
    id: "LOG004",
    userId: "PT004",
    userName: "Robert Wilson",
    action: "increase",
    previousCount: 3,
    newCount: 4,
    reason: "Referral reward",
    adjustedBy: "Admin User",
    adjustedAt: "2026-03-18 16:45",
  },
  {
    id: "LOG005",
    userId: "PT005",
    userName: "Lisa Anderson",
    action: "decrease",
    previousCount: 2,
    newCount: 1,
    reason: "Expired visits",
    adjustedBy: "System",
    adjustedAt: "2026-03-17 00:00",
  },
]

export default function FreeVisitsPage() {
  const [selectedUser, setSelectedUser] = useState<typeof mockFreeVisits[0] | null>(null)
  const [isAdjustOpen, setIsAdjustOpen] = useState(false)
  const [adjustment, setAdjustment] = useState(0)
  const [reason, setReason] = useState("")
  const [activeTab, setActiveTab] = useState<"visits" | "audit">("visits")

  const handleAdjust = (user: typeof mockFreeVisits[0]) => {
    setSelectedUser(user)
    setAdjustment(0)
    setReason("")
    setIsAdjustOpen(true)
  }

  const handleSubmitAdjustment = () => {
    console.log("Adjust visits:", {
      userId: selectedUser?.userId,
      adjustment,
      reason,
    })
    setIsAdjustOpen(false)
  }

  const activeCount = mockFreeVisits.filter((v) => v.status === "active").length
  const totalRemaining = mockFreeVisits.reduce((sum, v) => sum + v.remainingVisits, 0)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Free Visit Control</h1>
          <p className="text-muted-foreground">Manage free visit allocations and track usage</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Ticket className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockFreeVisits.length}</div>
              <p className="text-xs text-muted-foreground">With free visits</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active</CardTitle>
              <Badge className="bg-green-500 text-white h-4 w-4 p-0 rounded-full" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">{activeCount}</div>
              <p className="text-xs text-muted-foreground">Not expired</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Remaining</CardTitle>
              <Ticket className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-500">{totalRemaining}</div>
              <p className="text-xs text-muted-foreground">Free visits left</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Expired</CardTitle>
              <Clock className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">
                {mockFreeVisits.filter((v) => v.status === "expired").length}
              </div>
              <p className="text-xs text-muted-foreground">Visits used up</p>
            </CardContent>
          </Card>
        </div>

        <div className="flex gap-2 border-b">
          <Button
            variant={activeTab === "visits" ? "default" : "ghost"}
            onClick={() => setActiveTab("visits")}
          >
            <Ticket className="mr-2 h-4 w-4" />
            Free Visits
          </Button>
          <Button
            variant={activeTab === "audit" ? "default" : "ghost"}
            onClick={() => setActiveTab("audit")}
          >
            <History className="mr-2 h-4 w-4" />
            Audit Log
          </Button>
        </div>

        {activeTab === "visits" ? (
          <Card>
            <CardHeader>
              <CardTitle>User Free Visit Allocations</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Total Visits</TableHead>
                    <TableHead>Used</TableHead>
                    <TableHead>Remaining</TableHead>
                    <TableHead>Valid Until</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockFreeVisits.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <div className="font-medium">{user.userName}</div>
                            <div className="text-xs text-muted-foreground">{user.userId}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{user.totalVisits}</TableCell>
                      <TableCell>{user.usedVisits}</TableCell>
                      <TableCell>
                        <Badge className={user.remainingVisits > 0 ? "bg-green-500 text-white" : "bg-red-500 text-white"}>
                          {user.remainingVisits}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          {user.validUntil}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={user.status === "active" ? "bg-green-500 text-white" : "bg-gray-500 text-white"}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" onClick={() => handleAdjust(user)}>
                          Adjust
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Audit Log</CardTitle>
              <p className="text-sm text-muted-foreground">History of all free visit adjustments</p>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Previous</TableHead>
                    <TableHead>New</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Adjusted By</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockAuditLog.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell>{log.adjustedAt}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{log.userName}</div>
                          <div className="text-xs text-muted-foreground">{log.userId}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={log.action === "increase" ? "bg-green-500 text-white" : "bg-red-500 text-white"}>
                          {log.action === "increase" ? (
                            <Plus className="mr-1 h-3 w-3" />
                          ) : (
                            <Minus className="mr-1 h-3 w-3" />
                          )}
                          {log.action}
                        </Badge>
                      </TableCell>
                      <TableCell>{log.previousCount}</TableCell>
                      <TableCell className="font-medium">{log.newCount}</TableCell>
                      <TableCell className="text-muted-foreground">{log.reason}</TableCell>
                      <TableCell>{log.adjustedBy}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>

      <Dialog open={isAdjustOpen} onOpenChange={setIsAdjustOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adjust Free Visits</DialogTitle>
            <DialogDescription>
              {selectedUser?.userName} ({selectedUser?.userId})
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-4 p-4 bg-muted rounded-lg">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Current</p>
                <p className="text-3xl font-bold">{selectedUser?.remainingVisits}</p>
              </div>
              <div className="text-2xl">→</div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">After</p>
                <p className="text-3xl font-bold text-green-500">
                  {Math.max(0, (selectedUser?.remainingVisits || 0) + adjustment)}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setAdjustment((a) => a - 1)}
                disabled={adjustment <= -((selectedUser?.remainingVisits || 0))}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Input
                type="number"
                value={adjustment}
                onChange={(e) => setAdjustment(parseInt(e.target.value) || 0)}
                className="w-20 text-center"
              />
              <Button variant="outline" size="icon" onClick={() => setAdjustment((a) => a + 1)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <div>
              <label className="text-sm font-medium">Reason for adjustment</label>
              <Input
                placeholder="Enter reason..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="mt-2"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAdjustOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitAdjustment} disabled={adjustment === 0 || !reason.trim()}>
              Apply Adjustment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}
