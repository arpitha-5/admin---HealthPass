import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

export interface Doctor {
  id: string
  name: string
  specialty: string
  department: string
  email: string
  phone: string
  location: string
  status: "Available" | "Busy" | "On Leave"
  rating: number
  patients: number
  experience: string
}

const mockDoctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. Michael Chen",
    specialty: "Cardiology",
    department: "Cardiology",
    email: "michael.chen@healthpass.com",
    phone: "+1 (555) 123-4567",
    location: "Building A, Floor 3",
    status: "Available",
    rating: 4.9,
    patients: 248,
    experience: "15 years",
  },
  {
    id: "2",
    name: "Dr. Emily Davis",
    specialty: "Dermatology",
    department: "Dermatology",
    email: "emily.davis@healthpass.com",
    phone: "+1 (555) 234-5678",
    location: "Building A, Floor 2",
    status: "Available",
    rating: 4.8,
    patients: 185,
    experience: "12 years",
  },
  {
    id: "3",
    name: "Dr. James Wilson",
    specialty: "Orthopedics",
    department: "Orthopedics",
    email: "james.wilson@healthpass.com",
    phone: "+1 (555) 345-6789",
    location: "Building B, Floor 1",
    status: "On Leave",
    rating: 4.7,
    patients: 156,
    experience: "10 years",
  },
  {
    id: "4",
    name: "Dr. Sarah Miller",
    specialty: "Pediatrics",
    department: "Pediatrics",
    email: "sarah.miller@healthpass.com",
    phone: "+1 (555) 456-7890",
    location: "Building A, Floor 4",
    status: "Available",
    rating: 4.9,
    patients: 312,
    experience: "18 years",
  },
  {
    id: "5",
    name: "Dr. Lisa Brown",
    specialty: "Neurology",
    department: "Neurology",
    email: "lisa.brown@healthpass.com",
    phone: "+1 (555) 567-8901",
    location: "Building B, Floor 2",
    status: "Busy",
    rating: 4.6,
    patients: 142,
    experience: "8 years",
  },
  {
    id: "6",
    name: "Dr. Robert Taylor",
    specialty: "General Medicine",
    department: "General",
    email: "robert.taylor@healthpass.com",
    phone: "+1 (555) 678-9012",
    location: "Building A, Floor 1",
    status: "Available",
    rating: 4.8,
    patients: 425,
    experience: "20 years",
  },
]

export function useDoctors() {
  return useQuery({
    queryKey: ["doctors"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return mockDoctors
    },
  })
}

export function useCreateDoctor() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: Omit<Doctor, "id">) => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return { id: String(Date.now()), ...data }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctors"] })
    },
  })
}

export function useUpdateDoctor() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: Doctor) => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctors"] })
    },
  })
}

export function useDeleteDoctor() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return { id }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctors"] })
    },
  })
}
