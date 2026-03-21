"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {

  CreditCard,
  TrendingUp,
  TrendingDown,
  Pause,
  Play,
  Search,
  Filter,
  ArrowUpRight,
  ArrowDownRight,

  Calendar,
  User,

} from "lucide-react"

const mockTransactions = [
  {
    id: "TXN001",
    userName: "Sarah Johnson",
    userId: "PT001",
    type: "credit",
    amount: 500,
    date: "2024-01-15",
    description: "Welcome bonus credits",
    balance: 500,
  },
  {
    id: "TXN002",
    userName: "Michael Chen",
    userId: "PT002",
    type: "debit",
    amount: 150,
    date: "2024-01-14",
    description: "Lab test payment",
    balance: 350,
  },
  {
    id: "TXN003",
    userName: "Emma Davis",
    userId: "PT003",
    type: "credit",
    amount: 1000,
    date: "2024-01-13",
    description: "Monthly credit allocation",
    balance: 1000,
  },
  {
    id: "TXN004",
    userName: "Robert Wilson",
    userId: "PT004",
    type: "debit",
    amount: 200,
    date: "2024-01-12",
    description: "Consultation fee",
    balance: 800,
  },
  {
    id: "TXN005",
    userName: "Lisa Anderson",
    userId: "PT005",
    type: "credit",
    amount: 250,
    date: "2024-01-11",
    description: "Referral bonus",
    balance: 250,
  },
  {
    id: "TXN006",
    userName: "James Martinez",
    userId: "PT006",
    type: "debit",
    amount: 75,
    date: "2024-01-10",
    description: "Prescription discount",
    balance: 175,
  },
  {
    id: "TXN007",
    userName: "Jennifer Taylor",
    userId: "PT007",
    type: "credit",
    amount: 750,
    date: "2024-01-09",
    description: "Insurance top-up",
    balance: 750,
  },
  {
    id: "TXN008",
    userName: "David Brown",
    userId: "PT008",
    type: "debit",
    amount: 300,
    date: "2024-01-08",
    description: "Procedure co-payment",
    balance: 450,
  },
]

const totalIssued = 125000
const totalUsed = 78500
const totalRemaining = 46500

export default function WalletPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [distributionPaused, setDistributionPaused] = useState(false)

  const filteredTransactions = mockTransactions.filter((txn) => {
    const matchesSearch =
      txn.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = typeFilter === "all" || txn.type === typeFilter
    return matchesSearch && matchesType
  })

  const handleToggleDistribution = () => {
    setDistributionPaused(!distributionPaused)
  }

  const issuedPercentage = (totalUsed / totalIssued) * 100

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Wallet & Credit Management</h1>
          <p className="text-muted-foreground">
            Monitor credit distribution and track transaction history
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-2 border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Credits Issued</CardTitle>
              <CreditCard className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                ${totalIssued.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Credits Used</CardTitle>
              <TrendingDown className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">
                ${totalUsed.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                {issuedPercentage.toFixed(1)}% of issued
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Credits Remaining</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">
                ${totalRemaining.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                {(100 - issuedPercentage).toFixed(1)}% available
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle>Credit Distribution Control</CardTitle>
                <CardDescription>
                  Manage automatic credit allocation to users
                </CardDescription>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Switch
                    id="distribution-toggle"
                    checked={!distributionPaused}
                    onCheckedChange={handleToggleDistribution}
                  />
                  <Label htmlFor="distribution-toggle" className="font-medium">
                    {distributionPaused ? "Paused" : "Active"}
                  </Label>
                </div>
                <Button
                  variant={distributionPaused ? "default" : "destructive"}
                  onClick={handleToggleDistribution}
                >
                  {distributionPaused ? (
                    <>
                      <Play className="mr-2 h-4 w-4" />
                      Resume
                    </>
                  ) : (
                    <>
                      <Pause className="mr-2 h-4 w-4" />
                      Pause
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {distributionPaused && (
              <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-950">
                <div className="flex items-center gap-2 text-yellow-800 dark:text-yellow-200">
                  <Pause className="h-5 w-5" />
                  <span className="font-medium">
                    Credit distribution is currently paused. No new credits will be allocated to users.
                  </span>
                </div>
              </div>
            )}
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Usage Progress</span>
                  <span className="text-muted-foreground">
                    ${totalUsed.toLocaleString()} / ${totalIssued.toLocaleString()}
                  </span>
                </div>
                <div className="h-3 w-full overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{ width: `${issuedPercentage}%` }}
                  />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs">Daily Limit</Label>
                  <Input type="number" defaultValue="10000" />
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs">Monthly Allocation</Label>
                  <Input type="number" defaultValue="50000" />
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs">Auto-Topup Threshold</Label>
                  <Input type="number" defaultValue="100" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <CardTitle>Transaction History</CardTitle>
              <div className="flex flex-col gap-2 sm:flex-row">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search transactions..."
                    className="pl-8 w-full sm:w-[250px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-full sm:w-[150px]">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="credit">Credits</SelectItem>
                    <SelectItem value="debit">Debits</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-right">Balance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((txn) => (
                  <TableRow key={txn.id}>
                    <TableCell className="font-medium">{txn.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                          <User className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">{txn.userName}</div>
                          <div className="text-xs text-muted-foreground">{txn.userId}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={txn.type === "credit" ? "default" : "secondary"}
                        className="gap-1"
                      >
                        {txn.type === "credit" ? (
                          <ArrowUpRight className="h-3 w-3" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3" />
                        )}
                        {txn.type === "credit" ? "Credit" : "Debit"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        {txn.date}
                      </div>
                    </TableCell>
                    <TableCell>{txn.description}</TableCell>
                    <TableCell
                      className={`text-right font-medium ${
                        txn.type === "credit" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {txn.type === "credit" ? "+" : "-"}${txn.amount.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      ${txn.balance.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
