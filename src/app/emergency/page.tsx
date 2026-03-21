"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertTriangle,
  AlertCircle,
  Building,
  Power,
  PowerOff,
  Bell,
  Clock,
  User,
  Calendar,
  Shield,
  CheckCircle,

  Plus,
} from "lucide-react"

const mockIncidents = [
  {
    id: "INC001",
    type: "system_outage",
    title: "Server Downtime",
    description: "Main application server experienced 30 minutes of downtime due to power failure",
    severity: "high",
    status: "resolved",
    reportedAt: "2024-01-15 10:30",
    resolvedAt: "2024-01-15 11:00",
    reportedBy: "System Admin",
  },
  {
    id: "INC002",
    type: "security_breach",
    title: "Unauthorized Access Attempt",
    description: "Multiple failed login attempts detected from suspicious IP addresses",
    severity: "critical",
    status: "resolved",
    reportedAt: "2024-01-14 15:45",
    resolvedAt: "2024-01-14 16:30",
    reportedBy: "Security Team",
  },
  {
    id: "INC003",
    type: "data_loss",
    title: "Database Sync Issue",
    description: "Temporary data synchronization failure between primary and backup databases",
    severity: "medium",
    status: "resolved",
    reportedAt: "2024-01-13 09:15",
    resolvedAt: "2024-01-13 09:45",
    reportedBy: "Database Admin",
  },
  {
    id: "INC004",
    type: "service_degradation",
    title: "Slow Response Times",
    description: "Application experiencing unusually slow response times during peak hours",
    severity: "low",
    status: "investigating",
    reportedAt: "2024-01-15 08:00",
    resolvedAt: null,
    reportedBy: "Monitoring System",
  },
]

const severityConfig = {
  low: { label: "Low", className: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" },
  medium: { label: "Medium", className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300" },
  high: { label: "High", className: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300" },
  critical: { label: "Critical", className: "bg-red-600 text-white" },
}

const incidentTypeConfig = {
  system_outage: { label: "System Outage", icon: AlertCircle, color: "text-red-500" },
  security_breach: { label: "Security Breach", icon: Shield, color: "text-red-600" },
  data_loss: { label: "Data Loss", icon: AlertTriangle, color: "text-orange-500" },
  service_degradation: { label: "Service Degradation", icon: Clock, color: "text-yellow-500" },
}

export default function EmergencyPage() {
  const [hospitalEnabled, setHospitalEnabled] = useState(true)
  const [showDisableDialog, setShowDisableDialog] = useState(false)
  const [disableReason, setDisableReason] = useState("")
  const [isAddIncidentOpen, setIsAddIncidentOpen] = useState(false)
  const [newIncident, setNewIncident] = useState({
    type: "",
    title: "",
    description: "",
    severity: "",
  })

  const handleToggleHospital = () => {
    if (hospitalEnabled) {
      setShowDisableDialog(true)
    } else {
      setHospitalEnabled(true)
    }
  }

  const handleConfirmDisable = () => {
    console.log("Disable hospital:", disableReason)
    setHospitalEnabled(false)
    setShowDisableDialog(false)
    setDisableReason("")
  }

  const handleAddIncident = () => {
    console.log("Add incident:", newIncident)
    setIsAddIncidentOpen(false)
    setNewIncident({ type: "", title: "", description: "", severity: "" })
  }

  const activeIncidents = mockIncidents.filter((i) => i.status !== "resolved").length
  const criticalIncidents = mockIncidents.filter((i) => i.severity === "critical" && i.status !== "resolved").length

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {!hospitalEnabled && (
          <div className="rounded-lg border-2 border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-950/30">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-6 w-6 text-red-600" />
              <div>
                <h2 className="font-semibold text-red-800 dark:text-red-200">
                  Hospital Temporarily Disabled
                </h2>
                <p className="text-sm text-red-700 dark:text-red-300">
                  The hospital is currently not accepting appointments or services.
                </p>
              </div>
            </div>
          </div>
        )}

        <div>
          <h1 className="text-3xl font-bold tracking-tight">Emergency Control</h1>
          <p className="text-muted-foreground">
            Manage hospital availability and system incidents
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className={!hospitalEnabled ? "border-red-200 dark:border-red-900" : "border-green-200 dark:border-green-900"}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Hospital Status</CardTitle>
              {hospitalEnabled ? (
                <Power className="h-4 w-4 text-green-500" />
              ) : (
                <PowerOff className="h-4 w-4 text-red-500" />
              )}
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${hospitalEnabled ? "text-green-500" : "text-red-500"}`}>
                {hospitalEnabled ? "Active" : "Disabled"}
              </div>
              <p className="text-xs text-muted-foreground">
                {hospitalEnabled ? "Accepting appointments" : "No new appointments"}
              </p>
            </CardContent>
          </Card>

          <Card className="border-red-200 dark:border-red-900">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Critical Incidents</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">{criticalIncidents}</div>
              <p className="text-xs text-muted-foreground">Need immediate attention</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Incidents</CardTitle>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeIncidents}</div>
              <p className="text-xs text-muted-foreground">Under investigation</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Incidents</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockIncidents.length}</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle>Hospital Control</CardTitle>
                <CardDescription>
                  Enable or disable hospital services
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className={`flex h-12 w-12 items-center justify-center rounded-full ${
                  hospitalEnabled
                    ? "bg-green-100 dark:bg-green-900"
                    : "bg-red-100 dark:bg-red-900"
                }`}>
                  <Building className={`h-6 w-6 ${
                    hospitalEnabled ? "text-green-500" : "text-red-500"
                  }`} />
                </div>
                <div>
                  <h3 className="font-semibold">
                    {hospitalEnabled ? "Hospital is Active" : "Hospital is Disabled"}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {hospitalEnabled
                      ? "All services and appointments are available"
                      : "No services or appointments are available"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Switch
                    id="hospital-toggle"
                    checked={hospitalEnabled}
                    onCheckedChange={handleToggleHospital}
                  />
                  <Label htmlFor="hospital-toggle" className="font-medium">
                    {hospitalEnabled ? "Enabled" : "Disabled"}
                  </Label>
                </div>
                <Button
                  variant={hospitalEnabled ? "destructive" : "default"}
                  onClick={handleToggleHospital}
                >
                  {hospitalEnabled ? (
                    <>
                      <PowerOff className="mr-2 h-4 w-4" />
                      Disable Hospital
                    </>
                  ) : (
                    <>
                      <Power className="mr-2 h-4 w-4" />
                      Enable Hospital
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle>System Incidents</CardTitle>
                <CardDescription>
                  Monitor and manage system incidents
                </CardDescription>
              </div>
              <Button onClick={() => setIsAddIncidentOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Report Incident
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockIncidents.map((incident) => {
                const type = incidentTypeConfig[incident.type as keyof typeof incidentTypeConfig]
                const TypeIcon = type?.icon || AlertCircle
                const severity = severityConfig[incident.severity as keyof typeof severityConfig]
                return (
                  <div
                    key={incident.id}
                    className={`rounded-lg border p-4 ${
                      incident.status !== "resolved"
                        ? incident.severity === "critical"
                          ? "border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/20"
                          : incident.severity === "high"
                            ? "border-orange-200 bg-orange-50 dark:border-orange-900 dark:bg-orange-950/20"
                            : "border-yellow-200 bg-yellow-50 dark:border-yellow-900 dark:bg-yellow-950/20"
                        : "border-border bg-card"
                    }`}
                  >
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div className="flex items-start gap-4">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-full ${
                          incident.severity === "critical"
                            ? "bg-red-100 dark:bg-red-900"
                            : incident.severity === "high"
                              ? "bg-orange-100 dark:bg-orange-900"
                              : incident.severity === "medium"
                                ? "bg-yellow-100 dark:bg-yellow-900"
                                : "bg-blue-100 dark:bg-blue-900"
                        }`}>
                          <TypeIcon className={`h-5 w-5 ${type?.color || "text-muted-foreground"}`} />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-semibold">{incident.title}</span>
                            <Badge className={severity.className}>{severity.label}</Badge>
                            <Badge variant={incident.status === "resolved" ? "default" : "secondary"}>
                              {incident.status === "resolved" ? (
                                <CheckCircle className="mr-1 h-3 w-3" />
                              ) : (
                                <Clock className="mr-1 h-3 w-3" />
                              )}
                              {incident.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{incident.description}</p>
                          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              {incident.reportedBy}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {incident.reportedAt}
                            </span>
                            {incident.resolvedAt && (
                              <span className="flex items-center gap-1 text-green-600">
                                <CheckCircle className="h-3 w-3" />
                                Resolved: {incident.resolvedAt}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={showDisableDialog} onOpenChange={setShowDisableDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Disable Hospital Services</DialogTitle>
            <DialogDescription>
              Are you sure you want to disable hospital services? This will prevent all new appointments and services.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950/20">
              <div className="flex items-center gap-2 text-red-800 dark:text-red-200">
                <AlertTriangle className="h-5 w-5" />
                <span className="font-medium">Warning</span>
              </div>
              <p className="mt-2 text-sm text-red-700 dark:text-red-300">
                Disabling hospital services will affect all users and pending appointments.
                Please provide a reason for disabling.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="reason">Reason for disabling</Label>
              <Textarea
                id="reason"
                placeholder="Enter reason for disabling hospital services..."
                rows={4}
                value={disableReason}
                onChange={(e) => setDisableReason(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDisableDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmDisable} disabled={!disableReason.trim()}>
              <PowerOff className="mr-2 h-4 w-4" />
              Disable Hospital
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isAddIncidentOpen} onOpenChange={setIsAddIncidentOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Report New Incident</DialogTitle>
            <DialogDescription>
              Create a new system incident record
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Incident Type</Label>
              <select
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                value={newIncident.type}
                onChange={(e) => setNewIncident({ ...newIncident, type: e.target.value })}
              >
                <option value="">Select type</option>
                <option value="system_outage">System Outage</option>
                <option value="security_breach">Security Breach</option>
                <option value="data_loss">Data Loss</option>
                <option value="service_degradation">Service Degradation</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label>Title</Label>
              <input
                type="text"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="Incident title"
                value={newIncident.title}
                onChange={(e) => setNewIncident({ ...newIncident, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Severity</Label>
              <select
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                value={newIncident.severity}
                onChange={(e) => setNewIncident({ ...newIncident, severity: e.target.value })}
              >
                <option value="">Select severity</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <textarea
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="Describe the incident..."
                rows={4}
                value={newIncident.description}
                onChange={(e) => setNewIncident({ ...newIncident, description: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddIncidentOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddIncident} disabled={!newIncident.type || !newIncident.title || !newIncident.severity}>
              <Plus className="mr-2 h-4 w-4" />
              Report Incident
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}
