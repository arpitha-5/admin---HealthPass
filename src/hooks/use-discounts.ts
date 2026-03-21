import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import type { Discount } from "@/types/entity"

const mockDiscounts: Discount[] = [
  {
    id: "DISC001",
    entityId: "H001",
    entityName: "City General Hospital",
    entityType: "hospital",
    discountPercent: 15,
    isGlobal: false,
    isActive: true,
  },
  {
    id: "DISC002",
    entityId: "D001",
    entityName: "MedLife Diagnostics",
    entityType: "diagnostic",
    discountPercent: 20,
    isGlobal: false,
    isActive: true,
  },
  {
    id: "DISC003",
    entityId: "MS001",
    entityName: "HealthPlus Pharmacy",
    entityType: "medicalStore",
    discountPercent: 10,
    isGlobal: false,
    isActive: true,
  },
  {
    id: "DISC004",
    entityId: "global",
    entityName: "Global Discount",
    entityType: "hospital",
    discountPercent: 5,
    isGlobal: true,
    isActive: true,
  },
]

export function useDiscounts() {
  return useQuery({
    queryKey: ["discounts"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return mockDiscounts
    },
  })
}

export function useUpdateDiscount() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: Discount) => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["discounts"] })
    },
  })
}

export function useCreateDiscount() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: Omit<Discount, "id">) => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return {
        ...data,
        id: `DISC${String(Date.now()).slice(-3)}`,
      } as Discount
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["discounts"] })
    },
  })
}

export function useDeleteDiscount() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return id
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["discounts"] })
    },
  })
}
