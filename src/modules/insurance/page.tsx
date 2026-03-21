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
import { useInsurances, useCreateInsurance, useDeleteInsurance } from "@/hooks/use-insurance"
import type { Insurance } from "@/types/insurance"
import { Plus, Search, Trash2, Shield } from "lucide-react"

export default function InsurancePage() {
  const { data: insurances = [], isLoading } = useInsurances()
  const createInsurance = useCreateInsurance()
  const deleteInsurance = useDeleteInsurance()

  const [search, setSearch] = useState("")
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [selectedInsurance, setSelectedInsurance] = useState<Insurance | null>(null)

  const [formData, setFormData] = useState<Partial<Insurance>>({
    policyName: "",
    providerName: "",
    coverageAmount: 0,
    validityDate: "",
    status: "Active",
  })

  const filteredInsurances = insurances.filter((i) =>
    i.policyName.toLowerCase().includes(search.toLowerCase()) ||
    i.providerName.toLowerCase().includes(search.toLowerCase())
  )

  const handleAdd = () => {
    setFormData({
      policyName: "",
      providerName: "",
      coverageAmount: 0,
      validityDate: "",
      status: "Active",
    })
    setIsAddOpen(true)
  }

  const handleDelete = (insurance: Insurance) => {
    setSelectedInsurance(insurance)
    setIsDeleteOpen(true)
  }

  const submitAdd = () => {
    createInsurance.mutate(formData as Omit<Insurance, "id" | "createdAt">)
    setIsAddOpen(false)
  }

  const submitDelete = () => {
    if (selectedInsurance) {
      deleteInsurance.mutate(selectedInsurance.id)
    }
    setIsDeleteOpen(false)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Insurance Management</h1>
            <p className="text-muted-foreground">Manage insurance policies and providers</p>
          </div>
          <Button onClick={handleAdd}>
            <Plus className="mr-2 h-4 w-4" />
            Add Insurance
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              All Insurance Policies ({filteredInsurances.length})
            </CardTitle>
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search policies..."
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
                    <TableHead>Policy Name</TableHead>
                    <TableHead>Provider</TableHead>
                    <TableHead>Coverage Amount</TableHead>
                    <TableHead>Validity Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInsurances.map((insurance) => (
                    <TableRow key={insurance.id}>
                      <TableCell className="font-medium">{insurance.policyName}</TableCell>
                      <TableCell>{insurance.providerName}</TableCell>
                      <TableCell>${insurance.coverageAmount.toLocaleString()}</TableCell>
                      <TableCell>{insurance.validityDate}</TableCell>
                      <TableCell>
                        <Badge className={insurance.status === "Active" ? "bg-green-500 text-white" : "bg-red-500 text-white"}>
                          {insurance.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(insurance)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
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
            <DialogTitle>Add New Insurance Policy</DialogTitle>
            <DialogDescription>Enter insurance policy details</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              placeholder="Policy Name"
              value={formData.policyName}
              onChange={(e) => setFormData({ ...formData, policyName: e.target.value })}
            />
            <Input
              placeholder="Provider Name"
              value={formData.providerName}
              onChange={(e) => setFormData({ ...formData, providerName: e.target.value })}
            />
            <Input
              type="number"
              placeholder="Coverage Amount"
              value={formData.coverageAmount || ""}
              onChange={(e) => setFormData({ ...formData, coverageAmount: parseInt(e.target.value) || 0 })}
            />
            <Input
              type="date"
              placeholder="Validity Date"
              value={formData.validityDate}
              onChange={(e) => setFormData({ ...formData, validityDate: e.target.value })}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddOpen(false)}>Cancel</Button>
            <Button onClick={submitAdd}>Add Policy</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Insurance Policy</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedInsurance?.policyName}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={submitDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}
