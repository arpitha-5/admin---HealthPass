import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import type { Hospital, HospitalStats } from "@/types/entity"

const mockHospitals: Hospital[] = [
  {
    id: "H001",
    name: "City General Hospital",
    address: "123 Medical Center Blvd, Downtown",
    phone: "+1 (555) 123-4567",
    email: "contact@citygen.com",
    specialty: "Multi-Specialty",
    beds: 500,
    status: "Active",
    rating: 4.5,
    createdAt: "2023-01-15",
  },
  {
    id: "H002",
    name: "St. Mary's Medical Center",
    address: "456 Healthcare Ave, Westside",
    phone: "+1 (555) 234-5678",
    email: "info@stmarys.med",
    specialty: "Cardiology",
    beds: 350,
    status: "Active",
    rating: 4.7,
    createdAt: "2023-02-20",
  },
  {
    id: "H003",
    name: "Metro Heart Institute",
    address: "789 Cardiac Lane, Eastside",
    phone: "+1 (555) 345-6789",
    email: "care@metroheart.org",
    specialty: "Cardiology",
    beds: 200,
    status: "Suspended",
    suspendedDays: 5,
    suspendedUntil: "2026-03-26",
    rating: 4.2,
    createdAt: "2023-03-10",
  },
  {
    id: "H004",
    name: "Riverside Children's Hospital",
    address: "321 Kids Health Rd, Northside",
    phone: "+1 (555) 456-7890",
    email: "peds@riverside.kids",
    specialty: "Pediatrics",
    beds: 150,
    status: "Active",
    rating: 4.8,
    createdAt: "2023-04-05",
  },
  {
    id: "H005",
    name: "Advanced Neurology Center",
    address: "555 Brain Health Pkwy, Central",
    phone: "+1 (555) 567-8901",
    email: "neuro@advneuro.com",
    specialty: "Neurology",
    beds: 100,
    status: "Disabled",
    rating: 4.4,
    createdAt: "2023-05-12",
  },
]

const mockHospitalStats: HospitalStats = {
  totalAppointments: 12453,
  cancellationRate: 8.5,
  revenue: 2450000,
  avgWaitingTime: "18 min",
  appointmentsTrend: [
    { month: "Jan", count: 1800 },
    { month: "Feb", count: 2100 },
    { month: "Mar", count: 1950 },
    { month: "Apr", count: 2300 },
    { month: "May", count: 2200 },
    { month: "Jun", count: 2103 },
  ],
  revenueTrend: [
    { month: "Jan", amount: 350000 },
    { month: "Feb", amount: 420000 },
    { month: "Mar", amount: 380000 },
    { month: "Apr", amount: 450000 },
    { month: "May", amount: 410000 },
    { month: "Jun", amount: 440000 },
  ],
}

export function useHospitals() {
  return useQuery({
    queryKey: ["hospitals"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return mockHospitals
    },
  })
}

export function useHospitalStats() {
  return useQuery({
    queryKey: ["hospitalStats"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return mockHospitalStats
    },
  })
}

export function useCreateHospital() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: Omit<Hospital, "id" | "createdAt">) => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return {
        ...data,
        id: `H${String(Date.now()).slice(-3)}`,
        createdAt: new Date().toISOString().split("T")[0],
      } as Hospital
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hospitals"] })
    },
  })
}

export function useUpdateHospital() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: Hospital) => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hospitals"] })
    },
  })
}

export function useDeleteHospital() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return id
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hospitals"] })
    },
  })
}

export function useSuspendHospital() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, days }: { id: string; days: number }) => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      const suspendedUntil = new Date()
      suspendedUntil.setDate(suspendedUntil.getDate() + days)
      return { id, suspendedUntil: suspendedUntil.toISOString().split("T")[0], days }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hospitals"] })
    },
  })
}

export function useRestoreHospital() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return id
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hospitals"] })
    },
  })
}
