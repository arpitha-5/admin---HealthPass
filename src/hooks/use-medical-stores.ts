import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import type { MedicalStore, MedicalStoreStats } from "@/types/entity"

const mockMedicalStores: MedicalStore[] = [
  {
    id: "MS001",
    name: "HealthPlus Pharmacy",
    address: "101 Medicine Street, Downtown",
    phone: "+1 (555) 100-2000",
    email: "rx@healthplus.com",
    licenseNumber: "PHM-2023-001",
    status: "Active",
    rating: 4.5,
    createdAt: "2023-01-10",
  },
  {
    id: "MS002",
    name: "MedCorner Drugstore",
    address: "202 Pill Row, Westside",
    phone: "+1 (555) 200-3000",
    email: "info@medcorner.com",
    licenseNumber: "PHM-2023-002",
    status: "Active",
    rating: 4.2,
    createdAt: "2023-02-25",
  },
  {
    id: "MS003",
    name: "CareMeds Dispensary",
    address: "303 Remedy Lane, Eastside",
    phone: "+1 (555) 300-4000",
    email: "pharmacy@caremeds.com",
    licenseNumber: "PHM-2023-003",
    status: "Suspended",
    suspendedDays: 7,
    suspendedUntil: "2026-03-28",
    rating: 4.0,
    createdAt: "2023-03-15",
  },
  {
    id: "MS004",
    name: "QuickCare Pharmacy",
    address: "404 Fast Med Blvd, Northside",
    phone: "+1 (555) 400-5000",
    email: "rx@quickcare.com",
    licenseNumber: "PHM-2023-004",
    status: "Active",
    rating: 4.6,
    createdAt: "2023-04-20",
  },
  {
    id: "MS005",
    name: "Wellness Pharmacy",
    address: "505 Health Hub, Central",
    phone: "+1 (555) 500-6000",
    email: "wellness@pharma.com",
    licenseNumber: "PHM-2023-005",
    status: "Disabled",
    rating: 4.3,
    createdAt: "2023-05-30",
  },
]

const mockMedicalStoreStats: MedicalStoreStats = {
  ordersFulfilled: 45678,
  inventoryUsage: 78,
  revenue: 1890000,
  customerFeedback: 4.4,
  ordersTrend: [
    { month: "Jan", count: 6800 },
    { month: "Feb", count: 7200 },
    { month: "Mar", count: 7500 },
    { month: "Apr", count: 7800 },
    { month: "May", count: 8100 },
    { month: "Jun", count: 8278 },
  ],
  feedbackTrend: [
    { month: "Jan", rating: 4.2 },
    { month: "Feb", rating: 4.3 },
    { month: "Mar", rating: 4.3 },
    { month: "Apr", rating: 4.4 },
    { month: "May", rating: 4.4 },
    { month: "Jun", rating: 4.4 },
  ],
}

export function useMedicalStores() {
  return useQuery({
    queryKey: ["medicalStores"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return mockMedicalStores
    },
  })
}

export function useMedicalStoreStats() {
  return useQuery({
    queryKey: ["medicalStoreStats"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return mockMedicalStoreStats
    },
  })
}

export function useCreateMedicalStore() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: Omit<MedicalStore, "id" | "createdAt">) => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return {
        ...data,
        id: `MS${String(Date.now()).slice(-3)}`,
        createdAt: new Date().toISOString().split("T")[0],
      } as MedicalStore
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["medicalStores"] })
    },
  })
}

export function useUpdateMedicalStore() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: MedicalStore) => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["medicalStores"] })
    },
  })
}

export function useDeleteMedicalStore() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return id
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["medicalStores"] })
    },
  })
}

export function useSuspendMedicalStore() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, days }: { id: string; days: number }) => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      const suspendedUntil = new Date()
      suspendedUntil.setDate(suspendedUntil.getDate() + days)
      return { id, suspendedUntil: suspendedUntil.toISOString().split("T")[0], days }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["medicalStores"] })
    },
  })
}

export function useRestoreMedicalStore() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return id
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["medicalStores"] })
    },
  })
}
