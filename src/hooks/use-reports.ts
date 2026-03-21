import { useQuery } from "@tanstack/react-query"

export interface AppointmentReport {
  id: string
  patientName: string
  doctorName: string
  date: string
  time: string
  status: string
  type: string
  location: string
  amount: number
}

export interface BillReport {
  id: string
  patientName: string
  hospitalName: string
  service: string
  amount: number
  status: string
  date: string
  paymentMethod: string
}

export interface RevenueReport {
  id: string
  entityName: string
  entityType: string
  revenue: number
  transactions: number
  period: string
}

export interface PerformanceReport {
  id: string
  entityName: string
  entityType: string
  rating: number
  appointments: number
  revenue: number
  satisfaction: number
}

const mockAppointments: AppointmentReport[] = [
  { id: "APT001", patientName: "John Smith", doctorName: "Dr. Sarah Johnson", date: "2026-03-15", time: "09:00 AM", status: "Completed", type: "General Checkup", location: "City General Hospital", amount: 150 },
  { id: "APT002", patientName: "Emily Davis", doctorName: "Dr. Michael Chen", date: "2026-03-15", time: "10:30 AM", status: "Completed", type: "Follow-up", location: "St. Mary's Medical Center", amount: 100 },
  { id: "APT003", patientName: "Robert Wilson", doctorName: "Dr. Lisa Park", date: "2026-03-16", time: "11:00 AM", status: "Scheduled", type: "Consultation", location: "Metro Heart Institute", amount: 200 },
  { id: "APT004", patientName: "Maria Garcia", doctorName: "Dr. James Lee", date: "2026-03-16", time: "02:00 PM", status: "Cancelled", type: "Teleconsultation", location: "City General Hospital", amount: 75 },
  { id: "APT005", patientName: "David Brown", doctorName: "Dr. Emily White", date: "2026-03-17", time: "03:30 PM", status: "Completed", type: "Annual Physical", location: "Riverside Children's Hospital", amount: 180 },
]

const mockBills: BillReport[] = [
  { id: "BILL001", patientName: "John Smith", hospitalName: "City General Hospital", service: "Consultation", amount: 150, status: "Paid", date: "2026-03-15", paymentMethod: "Credit Card" },
  { id: "BILL002", patientName: "Emily Davis", hospitalName: "St. Mary's Medical Center", service: "Lab Tests", amount: 350, status: "Paid", date: "2026-03-14", paymentMethod: "Insurance" },
  { id: "BILL003", patientName: "Robert Wilson", hospitalName: "Metro Heart Institute", service: "ECG", amount: 200, status: "Pending", date: "2026-03-16", paymentMethod: "Cash" },
  { id: "BILL004", patientName: "Maria Garcia", hospitalName: "City General Hospital", service: "X-Ray", amount: 250, status: "Paid", date: "2026-03-13", paymentMethod: "Credit Card" },
  { id: "BILL005", patientName: "David Brown", hospitalName: "Riverside Children's Hospital", service: "Vaccination", amount: 180, status: "Paid", date: "2026-03-17", paymentMethod: "Insurance" },
]

const mockRevenue: RevenueReport[] = [
  { id: "REV001", entityName: "City General Hospital", entityType: "Hospital", revenue: 450000, transactions: 1250, period: "March 2026" },
  { id: "REV002", entityName: "St. Mary's Medical Center", entityType: "Hospital", revenue: 320000, transactions: 890, period: "March 2026" },
  { id: "REV003", entityName: "MedLife Diagnostics", entityType: "Diagnostic", revenue: 180000, transactions: 2100, period: "March 2026" },
  { id: "REV004", entityName: "PathLab Pro", entityType: "Diagnostic", revenue: 95000, transactions: 1100, period: "March 2026" },
  { id: "REV005", entityName: "HealthPlus Pharmacy", entityType: "Medical Store", revenue: 280000, transactions: 3500, period: "March 2026" },
]

const mockPerformance: PerformanceReport[] = [
  { id: "PERF001", entityName: "City General Hospital", entityType: "Hospital", rating: 4.5, appointments: 1250, revenue: 450000, satisfaction: 92 },
  { id: "PERF002", entityName: "St. Mary's Medical Center", entityType: "Hospital", rating: 4.7, appointments: 890, revenue: 320000, satisfaction: 95 },
  { id: "PERF003", entityName: "MedLife Diagnostics", entityType: "Diagnostic", rating: 4.6, appointments: 2100, revenue: 180000, satisfaction: 94 },
  { id: "PERF004", entityName: "PathLab Pro", entityType: "Diagnostic", rating: 4.3, appointments: 1100, revenue: 95000, satisfaction: 88 },
  { id: "PERF005", entityName: "HealthPlus Pharmacy", entityType: "Medical Store", rating: 4.5, appointments: 3500, revenue: 280000, satisfaction: 91 },
]

export function useAppointmentsReport() {
  return useQuery({
    queryKey: ["appointmentsReport"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return mockAppointments
    },
  })
}

export function useBillsReport() {
  return useQuery({
    queryKey: ["billsReport"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return mockBills
    },
  })
}

export function useRevenueReport() {
  return useQuery({
    queryKey: ["revenueReport"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return mockRevenue
    },
  })
}

export function usePerformanceReport() {
  return useQuery({
    queryKey: ["performanceReport"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return mockPerformance
    },
  })
}
