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
  avatar?: string
  createdAt: string
  updatedAt: string
}

export interface CreateDoctorDto {
  name: string
  specialty: string
  department: string
  email: string
  phone: string
  location: string
  experience: string
}

export interface UpdateDoctorDto extends Partial<CreateDoctorDto> {
  status?: Doctor["status"]
}
