import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

export interface Appointment {
  id: string
  patient: string
  doctor: string
  date: string
  time: string
  type: string
  status: "Completed" | "Scheduled" | "In Progress" | "Cancelled" | "No-show"
  location: string
}

const mockAppointments: Appointment[] = [
  {
    id: "1",
    patient: "Sarah Johnson",
    doctor: "Dr. Michael Chen",
    date: "2024-01-15",
    time: "9:00 AM",
    type: "General Checkup",
    status: "Completed",
    location: "Room 101",
  },
  {
    id: "2",
    patient: "Robert Williams",
    doctor: "Dr. Emily Davis",
    date: "2024-01-15",
    time: "10:30 AM",
    type: "Follow-up",
    status: "Scheduled",
    location: "Room 203",
  },
  {
    id: "3",
    patient: "Maria Garcia",
    doctor: "Dr. James Wilson",
    date: "2024-01-15",
    time: "11:45 AM",
    type: "Consultation",
    status: "In Progress",
    location: "Room 105",
  },
  {
    id: "4",
    patient: "David Brown",
    doctor: "Dr. Sarah Miller",
    date: "2024-01-15",
    time: "1:00 PM",
    type: "Lab Results",
    status: "Scheduled",
    location: "Room 102",
  },
  {
    id: "5",
    patient: "Jennifer Taylor",
    doctor: "Dr. Michael Chen",
    date: "2024-01-15",
    time: "2:30 PM",
    type: "Annual Physical",
    status: "Scheduled",
    location: "Room 101",
  },
  {
    id: "6",
    patient: "Michael Anderson",
    doctor: "Dr. Lisa Brown",
    date: "2024-01-15",
    time: "3:45 PM",
    type: "Teleconsultation",
    status: "Scheduled",
    location: "Online",
  },
]

export function useAppointments() {
  return useQuery({
    queryKey: ["appointments"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return mockAppointments
    },
  })
}

export function useCreateAppointment() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: Omit<Appointment, "id">) => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return { id: String(Date.now()), ...data }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] })
    },
  })
}

export function useUpdateAppointment() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: Appointment) => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] })
    },
  })
}

export function useDeleteAppointment() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return { id }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] })
    },
  })
}
