export interface Patient {
  id: string
  name: string
  email: string
  phone: string
  dob: string
  gender: "Male" | "Female" | "Other"
  bloodType: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-"
  status: "Active" | "Inactive"
  lastVisit: string
  createdAt: string
  updatedAt: string
}

export interface CreatePatientDto {
  name: string
  email: string
  phone: string
  dob: string
  gender: Patient["gender"]
  bloodType: Patient["bloodType"]
}

export interface UpdatePatientDto extends Partial<CreatePatientDto> {
  status?: Patient["status"]
}
