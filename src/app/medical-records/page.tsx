"use client"

import { DashboardLayout } from "@/components/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
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
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Filter,
  FileText,
  Pill,
  TestTube,
  Image as ImageIcon,
  Upload,
  Download,
  Eye,
  Calendar,
  User,
} from "lucide-react"
import { useState } from "react"

const records = [
  {
    id: "1",
    patient: "Sarah Johnson",
    type: "Diagnosis",
    category: "General",
    title: "Annual Physical Examination",
    doctor: "Dr. Michael Chen",
    date: "2024-01-15",
    status: "Completed",
  },
  {
    id: "2",
    patient: "Robert Williams",
    type: "Prescription",
    category: "Medication",
    title: "Blood Pressure Medication",
    doctor: "Dr. Emily Davis",
    date: "2024-01-14",
    status: "Active",
  },
  {
    id: "3",
    patient: "Maria Garcia",
    type: "Lab Result",
    category: "Blood Test",
    title: "Complete Blood Count (CBC)",
    doctor: "Dr. James Wilson",
    date: "2024-01-13",
    status: "Completed",
  },
  {
    id: "4",
    patient: "David Brown",
    type: "Imaging",
    category: "X-Ray",
    title: "Chest X-Ray",
    doctor: "Dr. Sarah Miller",
    date: "2024-01-12",
    status: "Completed",
  },
  {
    id: "5",
    patient: "Jennifer Taylor",
    type: "Diagnosis",
    category: "Cardiology",
    title: "ECG Analysis",
    doctor: "Dr. Michael Chen",
    date: "2024-01-11",
    status: "Completed",
  },
  {
    id: "6",
    patient: "Michael Anderson",
    type: "Lab Result",
    category: "Urinalysis",
    title: "Routine Urinalysis",
    doctor: "Dr. Lisa Brown",
    date: "2024-01-10",
    status: "Pending",
  },
]

const typeIcons: Record<string, typeof FileText> = {
  Diagnosis: FileText,
  Prescription: Pill,
  "Lab Result": TestTube,
  Imaging: ImageIcon,
}

const typeColors: Record<string, string> = {
  Diagnosis: "bg-blue-500",
  Prescription: "bg-green-500",
  "Lab Result": "bg-purple-500",
  Imaging: "bg-orange-500",
}

export default function MedicalRecordsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType] = useState("all")

  const filteredRecords = records.filter((record) => {
    const matchesSearch =
      record.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = selectedType === "all" || record.type === selectedType
    return matchesSearch && matchesType
  })

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Medical Records</h1>
            <p className="text-muted-foreground">
              Access and manage patient medical history.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Record
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Upload Medical Record</DialogTitle>
                  <DialogDescription>
                    Upload a new medical record document.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex h-40 items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25">
                  <div className="text-center">
                    <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">
                      Drag and drop files here, or click to browse
                    </p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Records</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,847</div>
              <p className="text-xs text-muted-foreground">+156 this month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Diagnoses</CardTitle>
              <FileText className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,245</div>
              <p className="text-xs text-muted-foreground">+45 this month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Lab Results</CardTitle>
              <TestTube className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">892</div>
              <p className="text-xs text-muted-foreground">+78 this month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Imaging</CardTitle>
              <ImageIcon className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">710</div>
              <p className="text-xs text-muted-foreground">+33 this month</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Records</TabsTrigger>
            <TabsTrigger value="diagnosis">Diagnoses</TabsTrigger>
            <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
            <TabsTrigger value="lab">Lab Results</TabsTrigger>
            <TabsTrigger value="imaging">Imaging</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="relative w-full sm:w-[300px]">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search records..."
                      className="pl-9"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Patient</TableHead>
                      <TableHead>Record</TableHead>
                      <TableHead>Doctor</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRecords.map((record) => {
                      const IconComponent = typeIcons[record.type]
                      return (
                        <TableRow key={record.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div
                                className={`rounded-lg p-2 ${typeColors[record.type]}`}
                              >
                                <IconComponent className="h-4 w-4 text-white" />
                              </div>
                              <div>
                                <div className="font-medium">{record.type}</div>
                                <div className="text-xs text-muted-foreground">
                                  {record.category}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <User className="h-3 w-3 text-muted-foreground" />
                              {record.patient}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="max-w-[200px]">
                              <div className="font-medium truncate">
                                {record.title}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{record.doctor}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3 text-muted-foreground" />
                              {record.date}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                record.status === "Completed"
                                  ? "default"
                                  : record.status === "Active"
                                  ? "secondary"
                                  : "outline"
                              }
                              className={
                                record.status === "Completed"
                                  ? "bg-green-500"
                                  : record.status === "Pending"
                                  ? "bg-amber-500"
                                  : ""
                              }
                            >
                              {record.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Button variant="ghost" size="icon">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="diagnosis">
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">
                  Diagnoses records will be displayed here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="prescriptions">
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">
                  Prescription records will be displayed here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="lab">
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">
                  Lab results will be displayed here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="imaging">
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">
                  Imaging records will be displayed here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
