"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Bell,
  Send,

  Users,
  Calendar,


  Clock,

  User,
  FileText,
} from "lucide-react"

const notificationTemplates = [
  {
    id: "TPL001",
    name: "Doctor Unavailable",
    title: "Doctor Unavailable Notice",
    message: "We regret to inform you that Dr. {doctor_name} will be unavailable from {date}. All appointments have been rescheduled.",
    category: "Hospital",
  },
  {
    id: "TPL002",
    name: "Maintenance Alert",
    title: "Scheduled Maintenance",
    message: "Our systems will undergo scheduled maintenance on {date} from {time}. Some services may be temporarily unavailable.",
    category: "System",
  },
  {
    id: "TPL003",
    name: "Appointment Reminder",
    title: "Upcoming Appointment Reminder",
    message: "This is a reminder that you have an appointment with Dr. {doctor_name} on {date} at {time}.",
    category: "Patient",
  },
  {
    id: "TPL004",
    name: "Credit Added",
    title: "Credits Added to Wallet",
    message: "Your wallet has been credited with {amount} credits. Current balance: {balance}.",
    category: "Billing",
  },
  {
    id: "TPL005",
    name: "Policy Update",
    title: "Insurance Policy Update",
    message: "There has been an update to your insurance policy. Please review the changes in your account.",
    category: "Insurance",
  },
]

const notificationHistory = [
  {
    id: "NTF001",
    title: "System Maintenance Notice",
    message: "Our systems will undergo scheduled maintenance on January 20th.",
    target: "All Users",
    sentBy: "Admin User",
    sentAt: "2024-01-15 10:30",
    status: "sent",
    recipients: 1250,
  },
  {
    id: "NTF002",
    title: "New Feature Available",
    message: "We've added new features to improve your experience.",
    target: "All Patients",
    sentBy: "Admin User",
    sentAt: "2024-01-14 14:20",
    status: "sent",
    recipients: 980,
  },
  {
    id: "NTF003",
    title: "Holiday Schedule",
    message: "Please note our modified holiday operating hours.",
    target: "All Users",
    sentBy: "Admin User",
    sentAt: "2024-01-13 09:00",
    status: "sent",
    recipients: 1250,
  },
  {
    id: "NTF004",
    title: "Dr. Smith Unavailable",
    message: "Dr. Smith will be on leave from Jan 18-20.",
    target: "Dr. Smith's Patients",
    sentBy: "Admin User",
    sentAt: "2024-01-12 16:45",
    status: "sent",
    recipients: 45,
  },
  {
    id: "NTF005",
    title: "Credit Promotion",
    message: "Get 20% extra credits on all top-ups this week!",
    target: "Active Users",
    sentBy: "Admin User",
    sentAt: "2024-01-11 11:00",
    status: "sent",
    recipients: 780,
  },
]

const statusConfig = {
  sent: { label: "Sent", variant: "default" as const },
  pending: { label: "Pending", variant: "secondary" as const },
  failed: { label: "Failed", variant: "destructive" as const },
}

const targetOptions = [
  { value: "all", label: "All Users", icon: Users },
  { value: "all_patients", label: "All Patients", icon: User },
  { value: "all_doctors", label: "All Doctors", icon: User },
  { value: "active_users", label: "Active Users (Last 30 Days)", icon: Clock },
  { value: "insurance_users", label: "Insurance Users", icon: FileText },
]

export default function NotificationsPage() {
  const [title, setTitle] = useState("")
  const [message, setMessage] = useState("")
  const [target, setTarget] = useState("")
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [isSendConfirmOpen, setIsSendConfirmOpen] = useState(false)

  const handleSelectTemplate = (template: typeof notificationTemplates[0]) => {
    setTitle(template.title)
    setMessage(template.message)
  }

  const handlePreview = () => {
    setIsPreviewOpen(true)
  }

  const handleSend = () => {
    console.log("Send notification:", { title, message, target })
    setIsSendConfirmOpen(false)
    setTitle("")
    setMessage("")
    setTarget("")
  }

  const handleSendConfirm = () => {
    setIsSendConfirmOpen(true)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground">
            Send notifications to users and view notification history
          </p>
        </div>

        <Tabs defaultValue="compose" className="space-y-6">
          <TabsList>
            <TabsTrigger value="compose">
              <Send className="mr-2 h-4 w-4" />
              Compose
            </TabsTrigger>
            <TabsTrigger value="templates">
              <FileText className="mr-2 h-4 w-4" />
              Templates
            </TabsTrigger>
            <TabsTrigger value="history">
              <Clock className="mr-2 h-4 w-4" />
              History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="compose">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Compose Notification</CardTitle>
                  <CardDescription>
                    Create and send notifications to users
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Notification Title</Label>
                    <Input
                      id="title"
                      placeholder="Enter notification title..."
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Enter your message..."
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="target">Target Users</Label>
                    <Select value={target} onValueChange={setTarget}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select target users" />
                      </SelectTrigger>
                      <SelectContent>
                        {targetOptions.map((option) => {
                          const Icon = option.icon
                          return (
                            <SelectItem key={option.value} value={option.value}>
                              <div className="flex items-center gap-2">
                                <Icon className="h-4 w-4" />
                                {option.label}
                              </div>
                            </SelectItem>
                          )
                        })}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex flex-col gap-2 sm:flex-row">
                    <Button
                      variant="outline"
                      onClick={handlePreview}
                      disabled={!title || !message}
                    >
                      <Bell className="mr-2 h-4 w-4" />
                      Preview
                    </Button>
                    <Button
                      onClick={handleSendConfirm}
                      disabled={!title || !message || !target}
                    >
                      <Send className="mr-2 h-4 w-4" />
                      Send Notification
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Templates</CardTitle>
                  <CardDescription>
                    Use predefined templates for common notifications
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {notificationTemplates.map((template) => (
                      <div
                        key={template.id}
                        className="flex items-start justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{template.name}</span>
                            <Badge variant="secondary" className="text-xs">
                              {template.category}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {template.title}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleSelectTemplate(template)}
                        >
                          Use
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="templates">
            <Card>
              <CardHeader>
                <CardTitle>Notification Templates</CardTitle>
                <CardDescription>
                  Browse and manage predefined notification templates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {notificationTemplates.map((template) => (
                    <div
                      key={template.id}
                      className="rounded-lg border p-4 space-y-3"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium">{template.name}</h3>
                          <Badge variant="secondary" className="mt-1 text-xs">
                            {template.category}
                          </Badge>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-muted-foreground text-xs">Title</Label>
                        <p className="text-sm">{template.title}</p>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-muted-foreground text-xs">Message</Label>
                        <p className="text-sm text-muted-foreground line-clamp-3">
                          {template.message}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() => handleSelectTemplate(template)}
                        >
                          Use Template
                        </Button>
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Notification History</CardTitle>
                <CardDescription>
                  View previously sent notifications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Target</TableHead>
                      <TableHead>Recipients</TableHead>
                      <TableHead>Sent By</TableHead>
                      <TableHead>Sent At</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {notificationHistory.map((notification) => (
                      <TableRow key={notification.id}>
                        <TableCell className="font-medium">
                          {notification.id}
                        </TableCell>
                        <TableCell>
                          <div className="max-w-[200px]">
                            <div className="font-medium truncate">
                              {notification.title}
                            </div>
                            <div className="text-xs text-muted-foreground truncate">
                              {notification.message}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{notification.target}</TableCell>
                        <TableCell>{notification.recipients}</TableCell>
                        <TableCell>{notification.sentBy}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3 text-muted-foreground" />
                            {notification.sentAt}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              statusConfig[notification.status as keyof typeof statusConfig]
                                .variant
                            }
                          >
                            {
                              statusConfig[notification.status as keyof typeof statusConfig]
                                .label
                            }
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Notification Preview</DialogTitle>
            <DialogDescription>
              Preview how the notification will appear to users
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="rounded-lg border bg-card p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                  <Bell className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-medium">{title || "Notification Title"}</p>
                  <p className="text-xs text-muted-foreground">HealthPass</p>
                </div>
              </div>
              <p className="text-sm">
                {message || "Your notification message will appear here..."}
              </p>
            </div>
            <div className="flex justify-end">
              <Button onClick={() => setIsPreviewOpen(false)}>Close</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isSendConfirmOpen} onOpenChange={setIsSendConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Send Notification</DialogTitle>
            <DialogDescription>
              Are you sure you want to send this notification?
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="rounded-lg bg-muted p-4 space-y-2">
              <div>
                <Label className="text-muted-foreground text-xs">Title</Label>
                <p className="font-medium">{title}</p>
              </div>
              <div>
                <Label className="text-muted-foreground text-xs">Target</Label>
                <p className="font-medium">
                  {targetOptions.find((o) => o.value === target)?.label || target}
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setIsSendConfirmOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleSend}>
                <Send className="mr-2 h-4 w-4" />
                Send Now
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}
