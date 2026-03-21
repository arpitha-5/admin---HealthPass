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
import { useMedicalStores, useCreateMedicalStore, useUpdateMedicalStore, useDeleteMedicalStore, useSuspendMedicalStore, useRestoreMedicalStore } from "@/hooks/use-medical-stores"
import type { MedicalStore, EntityStatus } from "@/types/entity"
import { Plus, Search, MoreVertical, Edit, Trash2, Pause, Play, Pill } from "lucide-react"

const statusColors: Record<EntityStatus, string> = {
  Active: "bg-green-500",
  Suspended: "bg-yellow-500",
  Disabled: "bg-red-500",
}

export default function MedicalStoresPage() {
  const { data: medicalStores = [], isLoading } = useMedicalStores()
  const createMedicalStore = useCreateMedicalStore()
  const updateMedicalStore = useUpdateMedicalStore()
  const deleteMedicalStore = useDeleteMedicalStore()
  const suspendMedicalStore = useSuspendMedicalStore()
  const restoreMedicalStore = useRestoreMedicalStore()

  const [search, setSearch] = useState("")
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isSuspendOpen, setIsSuspendOpen] = useState(false)
  const [selectedStore, setSelectedStore] = useState<MedicalStore | null>(null)
  const [suspendDays, setSuspendDays] = useState(7)

  const [formData, setFormData] = useState<Partial<MedicalStore>>({
    name: "",
    address: "",
    phone: "",
    email: "",
    licenseNumber: "",
    status: "Active",
    rating: 4.0,
  })

  const filteredStores = medicalStores.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.address.toLowerCase().includes(search.toLowerCase())
  )

  const handleAdd = () => {
    setFormData({
      name: "",
      address: "",
      phone: "",
      email: "",
      licenseNumber: "",
      status: "Active",
      rating: 4.0,
    })
    setIsAddOpen(true)
  }

  const handleEdit = (store: MedicalStore) => {
    setSelectedStore(store)
    setFormData({ ...store })
    setIsEditOpen(true)
  }

  const handleDelete = (store: MedicalStore) => {
    setSelectedStore(store)
    setIsDeleteOpen(true)
  }

  const handleSuspend = (store: MedicalStore) => {
    setSelectedStore(store)
    setSuspendDays(7)
    setIsSuspendOpen(true)
  }

  const handleRestore = (store: MedicalStore) => {
    restoreMedicalStore.mutate(store.id)
  }

  const submitAdd = () => {
    createMedicalStore.mutate(formData as Omit<MedicalStore, "id" | "createdAt">)
    setIsAddOpen(false)
  }

  const submitEdit = () => {
    if (selectedStore) {
      updateMedicalStore.mutate({ ...selectedStore, ...formData } as MedicalStore)
    }
    setIsEditOpen(false)
  }

  const submitDelete = () => {
    if (selectedStore) {
      deleteMedicalStore.mutate(selectedStore.id)
    }
    setIsDeleteOpen(false)
  }

  const submitSuspend = () => {
    if (selectedStore) {
      suspendMedicalStore.mutate({ id: selectedStore.id, days: suspendDays })
    }
    setIsSuspendOpen(false)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Medical Stores Management</h1>
            <p className="text-muted-foreground">Manage pharmacy profiles and status</p>
          </div>
          <Button onClick={handleAdd}>
            <Plus className="mr-2 h-4 w-4" />
            Add Medical Store
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Pill className="h-5 w-5" />
              All Medical Stores ({filteredStores.length})
            </CardTitle>
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search stores..."
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
                    <TableHead>License Number</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Suspended Until</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStores.map((store) => (
                    <TableRow key={store.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{store.name}</div>
                          <div className="text-sm text-muted-foreground">{store.address}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{store.licenseNumber}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{store.rating}/5</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={statusColors[store.status] + " text-white"}>
                          {store.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {store.status === "Suspended" && store.suspendedUntil ? (
                          <Badge variant="outline">{store.suspendedUntil}</Badge>
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
                            <DropdownMenuItem onClick={() => handleEdit(store)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            {store.status === "Suspended" ? (
                              <DropdownMenuItem onClick={() => handleRestore(store)}>
                                <Play className="mr-2 h-4 w-4" />
                                Restore
                              </DropdownMenuItem>
                            ) : store.status === "Active" ? (
                              <DropdownMenuItem onClick={() => handleSuspend(store)}>
                                <Pause className="mr-2 h-4 w-4" />
                                Suspend
                              </DropdownMenuItem>
                            ) : null}
                            <DropdownMenuItem
                              onClick={() => handleDelete(store)}
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
            <DialogTitle>Add New Medical Store</DialogTitle>
            <DialogDescription>Enter pharmacy details</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              placeholder="Store Name"
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
              placeholder="License Number"
              value={formData.licenseNumber}
              onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddOpen(false)}>Cancel</Button>
            <Button onClick={submitAdd}>Add Store</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Medical Store</DialogTitle>
            <DialogDescription>Update pharmacy details</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              placeholder="Store Name"
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
              placeholder="License Number"
              value={formData.licenseNumber}
              onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
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
            <DialogTitle>Delete Medical Store</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedStore?.name}? This action cannot be undone.
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
            <DialogTitle>Suspend Medical Store</DialogTitle>
            <DialogDescription>
              Suspend {selectedStore?.name} for a specific number of days
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
            <Button onClick={submitSuspend}>Suspend Store</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}
