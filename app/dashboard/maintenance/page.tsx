"use client"

import { useState } from "react"
import {
  Plus,
  Search,
  Wrench,
  Clock,
  CheckCircle,
  AlertTriangle,
  MoreHorizontal,
  Eye,
  Edit,
  Trash,
  Calendar,
  Building,
  User,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

// Mock maintenance data
const maintenanceRequests = [
  {
    id: 1,
    title: "Broken AC Unit",
    description: "Air conditioning not working in bedroom",
    property: "456 Oak Avenue, Brooklyn",
    tenant: "John Smith",
    priority: "High",
    status: "In Progress",
    createdAt: "2024-12-20",
    assignedTo: "Mike's HVAC Services",
  },
  {
    id: 2,
    title: "Leaking Faucet",
    description: "Kitchen faucet is leaking constantly",
    property: "303 Birch Blvd, New York",
    tenant: "Sarah Johnson",
    priority: "Medium",
    status: "Pending",
    createdAt: "2024-12-22",
    assignedTo: null,
  },
  {
    id: 3,
    title: "Broken Window Lock",
    description: "Living room window lock is broken",
    property: "606 Spruce Street, Bronx",
    tenant: "Michael Brown",
    priority: "Low",
    status: "Completed",
    createdAt: "2024-12-15",
    assignedTo: "Quick Fix Repairs",
  },
  {
    id: 4,
    title: "Electrical Issue",
    description: "Power outlet not working in kitchen",
    property: "808 Redwood Road, New York",
    tenant: "Emily Davis",
    priority: "High",
    status: "Pending",
    createdAt: "2024-12-23",
    assignedTo: null,
  },
  {
    id: 5,
    title: "Clogged Drain",
    description: "Bathroom sink is draining slowly",
    property: "1212 Magnolia Drive, Staten Island",
    tenant: "David Wilson",
    priority: "Medium",
    status: "In Progress",
    createdAt: "2024-12-21",
    assignedTo: "Pro Plumbing Co.",
  },
  {
    id: 6,
    title: "Heater Not Working",
    description: "Central heating system not functioning",
    property: "1515 Walnut Way, Queens",
    tenant: "Lisa Anderson",
    priority: "High",
    status: "Pending",
    createdAt: "2024-12-24",
    assignedTo: null,
  },
  {
    id: 7,
    title: "Door Hinge Repair",
    description: "Front door hinge is loose",
    property: "789 Pine Road, Manhattan",
    tenant: "Robert Taylor",
    priority: "Low",
    status: "Completed",
    createdAt: "2024-12-10",
    assignedTo: "Handy Home Services",
  },
]

export default function MaintenancePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const filteredRequests = maintenanceRequests.filter((request) => {
    const matchesSearch =
      request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.property.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || request.status === statusFilter
    const matchesPriority = priorityFilter === "all" || request.priority === priorityFilter
    return matchesSearch && matchesStatus && matchesPriority
  })

  const stats = {
    total: maintenanceRequests.length,
    pending: maintenanceRequests.filter((r) => r.status === "Pending").length,
    inProgress: maintenanceRequests.filter((r) => r.status === "In Progress").length,
    completed: maintenanceRequests.filter((r) => r.status === "Completed").length,
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800 border-red-200"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-emerald-100 text-emerald-800 border-emerald-200"
      case "In Progress":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Pending":
        return "bg-orange-100 text-orange-800 border-orange-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 sm:p-8 pt-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">Maintenance</h2>
          <p className="text-gray-500">Manage maintenance requests and work orders</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="mr-2 h-4 w-4" />
              New Request
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create Maintenance Request</DialogTitle>
              <DialogDescription>Fill in the details for the new maintenance request.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="Brief description of the issue" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="property">Property</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select property" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">456 Oak Avenue, Brooklyn</SelectItem>
                    <SelectItem value="2">303 Birch Blvd, New York</SelectItem>
                    <SelectItem value="3">606 Spruce Street, Bronx</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="priority">Priority</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Detailed description of the issue" rows={4} />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={() => setIsDialogOpen(false)}>
                Create Request
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Requests</CardTitle>
            <Wrench className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Pending</CardTitle>
            <Clock className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.pending}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">In Progress</CardTitle>
            <AlertTriangle className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.inProgress}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">{stats.completed}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Maintenance Requests</CardTitle>
          <CardDescription>View and manage all maintenance requests</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center relative flex-1">
                <Search className="absolute left-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search requests..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priority</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Table */}
            <div className="rounded-md border hidden md:block">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Request</TableHead>
                    <TableHead>Property</TableHead>
                    <TableHead>Tenant</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium text-gray-900">{request.title}</div>
                          <div className="text-sm text-gray-500 truncate max-w-[200px]">{request.description}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Building className="h-3 w-3" />
                          {request.property}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <User className="h-3 w-3" />
                          {request.tenant}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getPriorityColor(request.priority)} variant="outline">
                          {request.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(request.status)} variant="outline">
                          {request.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Calendar className="h-3 w-3" />
                          {new Date(request.createdAt).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Request
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash className="mr-2 h-4 w-4" />
                              Delete Request
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Mobile Cards */}
            <div className="grid gap-4 md:hidden">
              {filteredRequests.map((request) => (
                <Card key={request.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-medium text-gray-900">{request.title}</h3>
                        <p className="text-sm text-gray-500">{request.property}</p>
                      </div>
                      <div className="flex gap-2">
                        <Badge className={getPriorityColor(request.priority)} variant="outline">
                          {request.priority}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{request.description}</p>
                    <div className="flex justify-between items-center">
                      <Badge className={getStatusColor(request.status)} variant="outline">
                        {request.status}
                      </Badge>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
