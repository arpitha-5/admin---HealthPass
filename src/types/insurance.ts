export interface Insurance {
  id: string
  policyName: string
  providerName: string
  coverageAmount: number
  validityDate: string
  status: "Active" | "Disabled"
  createdAt: string
}
