export type EntityStatus = "Active" | "Suspended" | "Disabled"

export interface Hospital {
  id: string
  name: string
  address: string
  phone: string
  email: string
  specialty: string
  beds: number
  status: EntityStatus
  suspendedUntil?: string
  suspendedDays?: number
  rating: number
  createdAt: string
}

export interface Diagnostic {
  id: string
  name: string
  address: string
  phone: string
  email: string
  tests: string[]
  status: EntityStatus
  suspendedUntil?: string
  suspendedDays?: number
  rating: number
  createdAt: string
}

export interface MedicalStore {
  id: string
  name: string
  address: string
  phone: string
  email: string
  licenseNumber: string
  status: EntityStatus
  suspendedUntil?: string
  suspendedDays?: number
  rating: number
  createdAt: string
}

export interface HospitalStats {
  totalAppointments: number
  cancellationRate: number
  revenue: number
  avgWaitingTime: string
  appointmentsTrend: { month: string; count: number }[]
  revenueTrend: { month: string; amount: number }[]
}

export interface DiagnosticStats {
  testsConducted: number
  reportTurnaround: string
  successRate: number
  complaints: number
  testsTrend: { month: string; count: number }[]
  turnaroundTrend: { month: string; hours: number }[]
}

export interface MedicalStoreStats {
  ordersFulfilled: number
  inventoryUsage: number
  revenue: number
  customerFeedback: number
  ordersTrend: { month: string; count: number }[]
  feedbackTrend: { month: string; rating: number }[]
}

export interface Discount {
  id: string
  entityId: string
  entityName: string
  entityType: "hospital" | "diagnostic" | "medicalStore"
  discountPercent: number
  isGlobal: boolean
  validUntil?: string
  isActive: boolean
}
