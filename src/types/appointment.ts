export interface Appointment {
  id: string
  patient: string
  patientId: string
  doctor: string
  doctorId: string
  date: string
  time: string
  type: "General Checkup" | "Follow-up" | "Consultation" | "Teleconsultation" | "Lab Results" | "Annual Physical"
  status: "Scheduled" | "Completed" | "In Progress" | "Cancelled" | "No-show"
  location: string
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface CreateAppointmentDto {
  patientId: string
  doctorId: string
  date: string
  time: string
  type: Appointment["type"]
  location: string
  notes?: string
}

export interface UpdateAppointmentDto extends Partial<CreateAppointmentDto> {
  status?: Appointment["status"]
}
