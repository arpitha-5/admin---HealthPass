import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import type { Diagnostic, DiagnosticStats } from "@/types/entity"

const mockDiagnostics: Diagnostic[] = [
  {
    id: "D001",
    name: "MedLife Diagnostics",
    address: "100 Lab Way, Healthcare District",
    phone: "+1 (555) 111-2222",
    email: "labs@medlife.com",
    tests: ["Blood Test", "X-Ray", "MRI", "CT Scan"],
    status: "Active",
    rating: 4.6,
    createdAt: "2023-01-20",
  },
  {
    id: "D002",
    name: "PathLab Pro",
    address: "200 Test Center Rd, Medical Park",
    phone: "+1 (555) 222-3333",
    email: "info@pathlabpro.com",
    tests: ["Blood Test", "Urine Test", "Biopsy"],
    status: "Active",
    rating: 4.3,
    createdAt: "2023-02-15",
  },
  {
    id: "D003",
    name: "BioScan Imaging",
    address: "300 Imaging Blvd, Tech Valley",
    phone: "+1 (555) 333-4444",
    email: "scan@bioscan.io",
    tests: ["MRI", "CT Scan", "PET Scan", "Ultrasound"],
    status: "Suspended",
    suspendedDays: 3,
    suspendedUntil: "2026-03-24",
    rating: 4.7,
    createdAt: "2023-03-05",
  },
  {
    id: "D004",
    name: "QuickTest Labs",
    address: "400 Fast Results Ave, Downtown",
    phone: "+1 (555) 444-5555",
    email: "quick@quicktest.com",
    tests: ["Blood Test", "COVID Test", "Diabetes Screening"],
    status: "Active",
    rating: 4.4,
    createdAt: "2023-04-10",
  },
  {
    id: "D005",
    name: "GenDX Genetics",
    address: "500 DNA Lane, Science Park",
    phone: "+1 (555) 555-6666",
    email: "genetics@gendx.com",
    tests: ["Genetic Testing", "DNA Analysis", "Carrier Screening"],
    status: "Disabled",
    rating: 4.8,
    createdAt: "2023-05-20",
  },
]

const mockDiagnosticStats: DiagnosticStats = {
  testsConducted: 8567,
  reportTurnaround: "4.2 hrs",
  successRate: 98.5,
  complaints: 23,
  testsTrend: [
    { month: "Jan", count: 1200 },
    { month: "Feb", count: 1350 },
    { month: "Mar", count: 1400 },
    { month: "Apr", count: 1500 },
    { month: "May", count: 1580 },
    { month: "Jun", count: 1537 },
  ],
  turnaroundTrend: [
    { month: "Jan", hours: 6.5 },
    { month: "Feb", hours: 5.8 },
    { month: "Mar", hours: 5.2 },
    { month: "Apr", hours: 4.8 },
    { month: "May", hours: 4.5 },
    { month: "Jun", hours: 4.2 },
  ],
}

export function useDiagnostics() {
  return useQuery({
    queryKey: ["diagnostics"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return mockDiagnostics
    },
  })
}

export function useDiagnosticStats() {
  return useQuery({
    queryKey: ["diagnosticStats"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return mockDiagnosticStats
    },
  })
}

export function useCreateDiagnostic() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: Omit<Diagnostic, "id" | "createdAt">) => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return {
        ...data,
        id: `D${String(Date.now()).slice(-3)}`,
        createdAt: new Date().toISOString().split("T")[0],
      } as Diagnostic
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["diagnostics"] })
    },
  })
}

export function useUpdateDiagnostic() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: Diagnostic) => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["diagnostics"] })
    },
  })
}

export function useDeleteDiagnostic() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return id
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["diagnostics"] })
    },
  })
}

export function useSuspendDiagnostic() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, days }: { id: string; days: number }) => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      const suspendedUntil = new Date()
      suspendedUntil.setDate(suspendedUntil.getDate() + days)
      return { id, suspendedUntil: suspendedUntil.toISOString().split("T")[0], days }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["diagnostics"] })
    },
  })
}

export function useRestoreDiagnostic() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return id
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["diagnostics"] })
    },
  })
}
