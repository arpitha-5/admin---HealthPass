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
import { useHospitals, useCreateHospital, useUpdateHospital, useDeleteHospital, useSuspendHospital, useRestoreHospital } from "@/hooks/use-hospitals"
import type { Hospital, EntityStatus } from "@/types/entity"
import { Plus, Search, MoreVertical, Edit, Trash2, Pause, Play, Building2 } from "lucide-react"

const statusColors: Record<EntityStatus, string> = {
  Active: "bg-green-500",
  Suspended: "bg-yellow-500",
  Disabled: "bg-red-500",
}

export default function HospitalsPage() {
  const { data: hospitals = [], isLoading } = useHospitals()
  const createHospital = useCreateHospital()
  const updateHospital = useUpdateHospital()
  const deleteHospital = useDeleteHospital()
  const suspendHospital = useSuspendHospital()
  const restoreHospital = useRestoreHospital()

  const [search, setSearch] = useState("")
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isSuspendOpen, setIsSuspendOpen] = useState(false)
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null)
  const [suspendDays, setSuspendDays] = useState(7)

  const [formData, setFormData] = useState<Partial<Hospital>>({
    name: "",
    address: "",
    phone: "",
    email: "",
    specialty: "",
    beds: 0,
    status: "Active",
    rating: 4.0,
  })

  const filteredHospitals = hospitals.filter((h) =>
    h.name.toLowerCase().includes(search.toLowerCase()) ||
    h.address.toLowerCase().includes(search.toLowerCase())
  )

  const handleAdd = () => {
    setFormData({
      name: "",
      address: "",
      phone: "",
      email: "",
      specialty: "",
      beds: 0,
      status: "Active",
      rating: 4.0,
    })
    setIsAddOpen(true)
  }

  const handleEdit = (hospital: Hospital) => {
    setSelectedHospital(hospital)
    setFormData({ ...hospital })
    setIsEditOpen(true)
  }

  const handleDelete = (hospital: Hospital) => {
    setSelectedHospital(hospital)
    setIsDeleteOpen(true)
  }

  const handleSuspend = (hospital: Hospital) => {
    setSelectedHospital(hospital)
    setSuspendDays(7)
    setIsSuspendOpen(true)
  }

  const handleRestore = (hospital: Hospital) => {
    restoreHospital.mutate(hospital.id)
  }

  const submitAdd = () => {
    createHospital.mutate(formData as Omit<Hospital, "id" | "createdAt">)
    setIsAddOpen(false)
  }

  const submitEdit = () => {
    if (selectedHospital) {
      updateHospital.mutate({ ...selectedHospital, ...formData } as Hospital)
    }
    setIsEditOpen(false)
  }

  const submitDelete = () => {
    if (selectedHospital) {
      deleteHospital.mutate(selectedHospital.id)
    }
    setIsDeleteOpen(false)
  }

  const submitSuspend = () => {
    if (selectedHospital) {
      suspendHospital.mutate({ id: selectedHospital.id, days: suspendDays })
    }
    setIsSuspendOpen(false)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Hospitals Management</h1>
            <p className="text-muted-foreground">Manage hospital profiles and status</p>
          </div>
          <Button onClick={handleAdd}>
            <Plus className="mr-2 h-4 w-4" />
            Add Hospital
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              All Hospitals ({filteredHospitals.length})
            </CardTitle>
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search hospitals..."
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
                    <TableHead>Specialty</TableHead>
                    <TableHead>Beds</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Suspended Until</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredHospitals.map((hospital) => (
                    <TableRow key={hospital.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{hospital.name}</div>
                          <div className="text-sm text-muted-foreground">{hospital.address}</div>
                        </div>
                      </TableCell>
                      <TableCell>{hospital.specialty}</TableCell>
                      <TableCell>{hospital.beds}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{hospital.rating}/5</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={statusColors[hospital.status] + " text-white"}>
                          {hospital.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {hospital.status === "Suspended" && hospital.suspendedUntil ? (
                          <Badge variant="outline">{hospital.suspendedUntil}</Badge>
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
                            <DropdownMenuItem onClick={() => handleEdit(hospital)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            {hospital.status === "Suspended" ? (
                              <DropdownMenuItem onClick={() => handleRestore(hospital)}>
                                <Play className="mr-2 h-4 w-4" />
                                Restore
                              </DropdownMenuItem>
                            ) : hospital.status === "Active" ? (
                              <DropdownMenuItem onClick={() => handleSuspend(hospital)}>
                                <Pause className="mr-2 h-4 w-4" />
                                Suspend
                              </DropdownMenuItem>
                            ) : null}
                            <DropdownMenuItem
                              onClick={() => handleDelete(hospital)}
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
            <DialogTitle>Add New Hospital</DialogTitle>
            <DialogDescription>Enter hospital details</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              placeholder="Hospital Name"
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
            <div className="grid grid-cols-2 gap-4">
              <Input
                placeholder="Specialty"
                value={formData.specialty}
                onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
              />
              <Input
                type="number"
                placeholder="Number of Beds"
                value={formData.beds}
                onChange={(e) => setFormData({ ...formData, beds: parseInt(e.target.value) || 0 })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddOpen(false)}>Cancel</Button>
            <Button onClick={submitAdd}>Add Hospital</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Hospital</DialogTitle>
            <DialogDescription>Update hospital details</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              placeholder="Hospital Name"
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
            <div className="grid grid-cols-2 gap-4">
              <Input
                placeholder="Specialty"
                value={formData.specialty}
                onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
              />
              <Input
                type="number"
                placeholder="Number of Beds"
                value={formData.beds}
                onChange={(e) => setFormData({ ...formData, beds: parseInt(e.target.value) || 0 })}
              />
            </div>
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
            <DialogTitle>Delete Hospital</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedHospital?.name}? This action cannot be undone.
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
            <DialogTitle>Suspend Hospital</DialogTitle>
            <DialogDescription>
              Suspend {selectedHospital?.name} for a specific number of days
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
            <Button onClick={submitSuspend}>Suspend Hospital</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}
