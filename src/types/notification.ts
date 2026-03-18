export interface Notification {
  id: string
  title: string
  message: string
  type: "appointment" | "patient" | "system" | "alert"
  read: boolean
  createdAt: string
}

export interface MedicalRecord {
  id: string
  patientId: string
  patient: string
  type: "Diagnosis" | "Prescription" | "Lab Result" | "Imaging"
  category: string
  title: string
  doctor: string
  doctorId: string
  date: string
  status: "Completed" | "Pending" | "Active"
  fileUrl?: string
}

export interface DashboardStats {
  totalPatients: number
  patientsChange: number
  appointmentsToday: number
  appointmentsChange: number
  pendingTasks: number
  pendingChange: number
  monthlyRevenue: number
  revenueChange: number
}
