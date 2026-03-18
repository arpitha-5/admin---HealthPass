import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

export interface Patient {
  id: string
  name: string
  email: string
  phone: string
  dob: string
  gender: string
  bloodType: string
  status: "Active" | "Inactive"
  lastVisit: string
}

const mockPatients: Patient[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    dob: "1985-03-15",
    gender: "Female",
    bloodType: "A+",
    status: "Active",
    lastVisit: "2024-01-15",
  },
  {
    id: "2",
    name: "Robert Williams",
    email: "robert.w@email.com",
    phone: "+1 (555) 234-5678",
    dob: "1978-07-22",
    gender: "Male",
    bloodType: "O+",
    status: "Active",
    lastVisit: "2024-01-14",
  },
  {
    id: "3",
    name: "Maria Garcia",
    email: "maria.garcia@email.com",
    phone: "+1 (555) 345-6789",
    dob: "1990-11-08",
    gender: "Female",
    bloodType: "B-",
    status: "Active",
    lastVisit: "2024-01-13",
  },
  {
    id: "4",
    name: "David Brown",
    email: "david.brown@email.com",
    phone: "+1 (555) 456-7890",
    dob: "1965-05-30",
    gender: "Male",
    bloodType: "AB+",
    status: "Inactive",
    lastVisit: "2023-12-20",
  },
  {
    id: "5",
    name: "Jennifer Taylor",
    email: "jennifer.t@email.com",
    phone: "+1 (555) 567-8901",
    dob: "1995-09-12",
    gender: "Female",
    bloodType: "O-",
    status: "Active",
    lastVisit: "2024-01-12",
  },
  {
    id: "6",
    name: "Michael Anderson",
    email: "m.anderson@email.com",
    phone: "+1 (555) 678-9012",
    dob: "1988-01-25",
    gender: "Male",
    bloodType: "A-",
    status: "Active",
    lastVisit: "2024-01-11",
  },
  {
    id: "7",
    name: "Emily Davis",
    email: "emily.davis@email.com",
    phone: "+1 (555) 789-0123",
    dob: "1992-04-18",
    gender: "Female",
    bloodType: "B+",
    status: "Active",
    lastVisit: "2024-01-10",
  },
]

export function usePatients() {
  return useQuery({
    queryKey: ["patients"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return mockPatients
    },
  })
}

export function useCreatePatient() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: Omit<Patient, "id">) => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return { id: String(Date.now()), ...data }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patients"] })
    },
  })
}

export function useUpdatePatient() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: Patient) => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patients"] })
    },
  })
}

export function useDeletePatient() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return { id }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patients"] })
    },
  })
}
