"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { useDiscounts, useUpdateDiscount, useCreateDiscount, useDeleteDiscount } from "@/hooks/use-discounts"
import { useHospitals } from "@/hooks/use-hospitals"
import { useDiagnostics } from "@/hooks/use-diagnostics"
import { useMedicalStores } from "@/hooks/use-medical-stores"
import type { Discount } from "@/types/entity"
import { Percent, Building2, TestTube, Pill, Plus, Trash2 } from "lucide-react"
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreVertical } from "lucide-react"

export default function DiscountControlPage() {
  const { data: discounts = [], isLoading } = useDiscounts()
  const { data: hospitals = [] } = useHospitals()
  const { data: diagnostics = [] } = useDiagnostics()
  const { data: medicalStores = [] } = useMedicalStores()
  const updateDiscount = useUpdateDiscount()
  const createDiscount = useCreateDiscount()
  const deleteDiscount = useDeleteDiscount()

  const [isAddOpen, setIsAddOpen] = useState(false)
  const [globalDiscount, setGlobalDiscount] = useState(5)
  const [newDiscount, setNewDiscount] = useState({
    entityId: "",
    entityName: "",
    entityType: "hospital" as "hospital" | "diagnostic" | "medicalStore",
    discountPercent: 10,
    isGlobal: false,
    isActive: true,
  })

  const handleGlobalDiscountChange = (value: number[]) => {
    setGlobalDiscount(value[0])
  }

  const handleEntityDiscountChange = (id: string, value: number[]) => {
    const discount = discounts.find((d) => d.id === id)
    if (discount) {
      updateDiscount.mutate({ ...discount, discountPercent: value[0] })
    }
  }

  const handleAddEntityDiscount = () => {
    let entityName = ""
    if (newDiscount.entityType === "hospital") {
      const entity = hospitals.find((h: { id: string }) => h.id === newDiscount.entityId)
      entityName = entity?.name || ""
    } else if (newDiscount.entityType === "diagnostic") {
      const entity = diagnostics.find((d: { id: string }) => d.id === newDiscount.entityId)
      entityName = entity?.name || ""
    } else {
      const entity = medicalStores.find((s: { id: string }) => s.id === newDiscount.entityId)
      entityName = entity?.name || ""
    }
    createDiscount.mutate({ ...newDiscount, entityName })
    setIsAddOpen(false)
    setNewDiscount({
      entityId: "",
      entityName: "",
      entityType: "hospital",
      discountPercent: 10,
      isGlobal: false,
      isActive: true,
    })
  }

  const getEntityIcon = (type: string) => {
    switch (type) {
      case "hospital":
        return Building2
      case "diagnostic":
        return TestTube
      case "medicalStore":
        return Pill
      default:
        return Building2
    }
  }

  const getEntityColor = (type: string) => {
    switch (type) {
      case "hospital":
        return "bg-red-100 text-red-700"
      case "diagnostic":
        return "bg-purple-100 text-purple-700"
      case "medicalStore":
        return "bg-teal-100 text-teal-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const hospitalOptions = hospitals.map((h: { id: string; name: string }) => ({ id: h.id, name: h.name }))
  const diagnosticOptions = diagnostics.map((d: { id: string; name: string }) => ({ id: d.id, name: d.name }))
  const storeOptions = medicalStores.map((s: { id: string; name: string }) => ({ id: s.id, name: s.name }))

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Discount Control</h1>
            <p className="text-muted-foreground">Manage global and entity-specific discounts</p>
          </div>
          <Button onClick={() => setIsAddOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Entity Discount
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Percent className="h-5 w-5" />
              Global Discount
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Current Global Discount</span>
                <Badge className="bg-primary text-primary-foreground text-lg px-3 py-1">
                  {globalDiscount}%
                </Badge>
              </div>
              <Slider
                value={[globalDiscount]}
                onValueChange={handleGlobalDiscountChange}
                max={50}
                step={1}
                className="py-4"
              />
              <p className="text-sm text-muted-foreground">
                This discount will be applied to all transactions platform-wide.
                Individual entity discounts may override this.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Entity-Specific Discounts</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8 text-muted-foreground">Loading...</div>
            ) : (
              <div className="space-y-4">
                {discounts
                  .filter((d: Discount) => !d.isGlobal)
                  .map((discount: Discount) => (
                    <div
                      key={discount.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-lg ${getEntityColor(discount.entityType)}`}>
                          {(() => {
                            const Icon = getEntityIcon(discount.entityType)
                            return <Icon className="h-5 w-5" />
                          })()}
                        </div>
                        <div>
                          <div className="font-medium">{discount.entityName}</div>
                          <div className="text-sm text-muted-foreground capitalize">
                            {discount.entityType}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-48">
                          <Slider
                            value={[discount.discountPercent]}
                            onValueChange={(value) =>
                              handleEntityDiscountChange(discount.id, value)
                            }
                            max={50}
                            step={1}
                          />
                        </div>
                        <Badge
                          className={`text-lg px-3 py-1 ${
                            discount.discountPercent > 20
                              ? "bg-red-500 text-white"
                              : "bg-green-500 text-white"
                          }`}
                        >
                          {discount.discountPercent}%
                        </Badge>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => deleteDiscount.mutate(discount.id)}
                              className="text-red-600"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Remove
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Entity Discount</DialogTitle>
            <DialogDescription>
              Set a specific discount for a hospital, diagnostic, or medical store
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Entity Type</label>
              <Select
                value={newDiscount.entityType}
                onValueChange={(value) =>
                  setNewDiscount({ ...newDiscount, entityType: value as typeof newDiscount.entityType, entityId: "" })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hospital">Hospital</SelectItem>
                  <SelectItem value="diagnostic">Diagnostic Center</SelectItem>
                  <SelectItem value="medicalStore">Medical Store</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Select Entity</label>
              <Select
                value={newDiscount.entityId}
                onValueChange={(value) => setNewDiscount({ ...newDiscount, entityId: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select entity" />
                </SelectTrigger>
                <SelectContent>
                  {newDiscount.entityType === "hospital" &&
                    hospitalOptions.map((h) => (
                      <SelectItem key={h.id} value={h.id}>
                        {h.name}
                      </SelectItem>
                    ))}
                  {newDiscount.entityType === "diagnostic" &&
                    diagnosticOptions.map((d) => (
                      <SelectItem key={d.id} value={d.id}>
                        {d.name}
                      </SelectItem>
                    ))}
                  {newDiscount.entityType === "medicalStore" &&
                    storeOptions.map((s) => (
                      <SelectItem key={s.id} value={s.id}>
                        {s.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Discount Percentage: {newDiscount.discountPercent}%
              </label>
              <Slider
                value={[newDiscount.discountPercent]}
                onValueChange={(value) =>
                  setNewDiscount({ ...newDiscount, discountPercent: value[0] })
                }
                max={50}
                step={1}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddEntityDiscount} disabled={!newDiscount.entityId}>
              Add Discount
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}
