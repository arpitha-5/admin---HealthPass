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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useDiagnostics, useCreateDiagnostic, useUpdateDiagnostic, useDeleteDiagnostic, useSuspendDiagnostic, useRestoreDiagnostic } from "@/hooks/use-diagnostics"
import type { Diagnostic, EntityStatus } from "@/types/entity"
import { Plus, Search, MoreVertical, Edit, Trash2, Pause, Play, TestTube } from "lucide-react"

const statusColors: Record<EntityStatus, string> = {
  Active: "bg-green-500",
  Suspended: "bg-yellow-500",
  Disabled: "bg-red-500",
}

export default function DiagnosticsPage() {
  const { data: diagnostics = [], isLoading } = useDiagnostics()
  const createDiagnostic = useCreateDiagnostic()
  const updateDiagnostic = useUpdateDiagnostic()
  const deleteDiagnostic = useDeleteDiagnostic()
  const suspendDiagnostic = useSuspendDiagnostic()
  const restoreDiagnostic = useRestoreDiagnostic()

  const [search, setSearch] = useState("")
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isSuspendOpen, setIsSuspendOpen] = useState(false)
  const [selectedDiagnostic, setSelectedDiagnostic] = useState<Diagnostic | null>(null)
  const [suspendDays, setSuspendDays] = useState(7)

  const [formData, setFormData] = useState<Partial<Diagnostic>>({
    name: "",
    address: "",
    phone: "",
    email: "",
    tests: [],
    status: "Active",
    rating: 4.0,
  })

  const filteredDiagnostics = diagnostics.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.address.toLowerCase().includes(search.toLowerCase())
  )

  const handleAdd = () => {
    setFormData({
      name: "",
      address: "",
      phone: "",
      email: "",
      tests: [],
      status: "Active",
      rating: 4.0,
    })
    setIsAddOpen(true)
  }

  const handleEdit = (diagnostic: Diagnostic) => {
    setSelectedDiagnostic(diagnostic)
    setFormData({ ...diagnostic })
    setIsEditOpen(true)
  }

  const handleDelete = (diagnostic: Diagnostic) => {
    setSelectedDiagnostic(diagnostic)
    setIsDeleteOpen(true)
  }

  const handleSuspend = (diagnostic: Diagnostic) => {
    setSelectedDiagnostic(diagnostic)
    setSuspendDays(7)
    setIsSuspendOpen(true)
  }

  const handleRestore = (diagnostic: Diagnostic) => {
    restoreDiagnostic.mutate(diagnostic.id)
  }

  const submitAdd = () => {
    createDiagnostic.mutate(formData as Omit<Diagnostic, "id" | "createdAt">)
    setIsAddOpen(false)
  }

  const submitEdit = () => {
    if (selectedDiagnostic) {
      updateDiagnostic.mutate({ ...selectedDiagnostic, ...formData } as Diagnostic)
    }
    setIsEditOpen(false)
  }

  const submitDelete = () => {
    if (selectedDiagnostic) {
      deleteDiagnostic.mutate(selectedDiagnostic.id)
    }
    setIsDeleteOpen(false)
  }

  const submitSuspend = () => {
    if (selectedDiagnostic) {
      suspendDiagnostic.mutate({ id: selectedDiagnostic.id, days: suspendDays })
    }
    setIsSuspendOpen(false)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Diagnostics Management</h1>
            <p className="text-muted-foreground">Manage diagnostic center profiles and status</p>
          </div>
          <Button onClick={handleAdd}>
            <Plus className="mr-2 h-4 w-4" />
            Add Diagnostic Center
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TestTube className="h-5 w-5" />
              All Diagnostics ({filteredDiagnostics.length})
            </CardTitle>
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search diagnostics..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8 text-muted-foreground">Loading...</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Tests Offered</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Suspended Until</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDiagnostics.map((diagnostic) => (
                    <TableRow key={diagnostic.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{diagnostic.name}</div>
                          <div className="text-sm text-muted-foreground">{diagnostic.address}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {diagnostic.tests.slice(0, 2).map((test) => (
                            <Badge key={test} variant="outline" className="text-xs">
                              {test}
                            </Badge>
                          ))}
                          {diagnostic.tests.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{diagnostic.tests.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{diagnostic.rating}/5</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={statusColors[diagnostic.status] + " text-white"}>
                          {diagnostic.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {diagnostic.status === "Suspended" && diagnostic.suspendedUntil ? (
                          <Badge variant="outline">{diagnostic.suspendedUntil}</Badge>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEdit(diagnostic)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            {diagnostic.status === "Suspended" ? (
                              <DropdownMenuItem onClick={() => handleRestore(diagnostic)}>
                                <Play className="mr-2 h-4 w-4" />
                                Restore
                              </DropdownMenuItem>
                            ) : diagnostic.status === "Active" ? (
                              <DropdownMenuItem onClick={() => handleSuspend(diagnostic)}>
                                <Pause className="mr-2 h-4 w-4" />
                                Suspend
                              </DropdownMenuItem>
                            ) : null}
                            <DropdownMenuItem
                              onClick={() => handleDelete(diagnostic)}
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
            )}
          </CardContent>
        </Card>
      </div>

      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Diagnostic Center</DialogTitle>
            <DialogDescription>Enter diagnostic center details</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              placeholder="Diagnostic Center Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <Input
              placeholder="Address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
              <Input
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <Input
              placeholder="Tests (comma separated)"
              value={formData.tests?.join(", ")}
              onChange={(e) => setFormData({ ...formData, tests: e.target.value.split(",").map(t => t.trim()) })}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddOpen(false)}>Cancel</Button>
            <Button onClick={submitAdd}>Add Diagnostic</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Diagnostic Center</DialogTitle>
            <DialogDescription>Update diagnostic center details</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              placeholder="Diagnostic Center Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <Input
              placeholder="Address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
              <Input
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <Input
              placeholder="Tests (comma separated)"
              value={formData.tests?.join(", ")}
              onChange={(e) => setFormData({ ...formData, tests: e.target.value.split(",").map(t => t.trim()) })}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>Cancel</Button>
            <Button onClick={submitEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Diagnostic Center</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedDiagnostic?.name}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={submitDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isSuspendOpen} onOpenChange={setIsSuspendOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Suspend Diagnostic Center</DialogTitle>
            <DialogDescription>
              Suspend {selectedDiagnostic?.name} for a specific number of days
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <label className="text-sm font-medium">Number of Days</label>
            <Input
              type="number"
              value={suspendDays}
              onChange={(e) => setSuspendDays(parseInt(e.target.value) || 0)}
              className="mt-2"
              min={1}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSuspendOpen(false)}>Cancel</Button>
            <Button onClick={submitSuspend}>Suspend Diagnostic</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}
