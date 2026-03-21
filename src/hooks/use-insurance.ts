import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import type { Insurance } from "@/types/insurance"

const mockInsurances: Insurance[] = [
  {
    id: "INS001",
    policyName: "Premium Health Plus",
    providerName: "BlueCross Insurance",
    coverageAmount: 500000,
    validityDate: "2027-06-30",
    status: "Active",
    createdAt: "2024-01-15",
  },
  {
    id: "INS002",
    policyName: "Family Coverage Plan",
    providerName: "Aetna Healthcare",
    coverageAmount: 750000,
    validityDate: "2026-12-31",
    status: "Active",
    createdAt: "2024-02-20",
  },
  {
    id: "INS003",
    policyName: "Basic Wellness Cover",
    providerName: "United Health",
    coverageAmount: 250000,
    validityDate: "2026-03-15",
    status: "Disabled",
    createdAt: "2024-03-10",
  },
  {
    id: "INS004",
    policyName: "Senior Citizen Plan",
    providerName: "Medicare Plus",
    coverageAmount: 1000000,
    validityDate: "2028-01-01",
    status: "Active",
    createdAt: "2024-04-05",
  },
  {
    id: "INS005",
    policyName: "Corporate Health Plan",
    providerName: "Cigna Insurance",
    coverageAmount: 2000000,
    validityDate: "2027-09-30",
    status: "Active",
    createdAt: "2024-05-12",
  },
]

export function useInsurances() {
  return useQuery({
    queryKey: ["insurances"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return mockInsurances
    },
  })
}

export function useCreateInsurance() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: Omit<Insurance, "id" | "createdAt">) => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return {
        ...data,
        id: `INS${String(Date.now()).slice(-3)}`,
        createdAt: new Date().toISOString().split("T")[0],
      } as Insurance
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["insurances"] })
    },
  })
}

export function useDeleteInsurance() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return id
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["insurances"] })
    },
  })
}
