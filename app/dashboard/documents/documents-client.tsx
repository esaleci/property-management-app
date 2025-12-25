"use client"

import { useState } from "react"
import {
  Search,
  FileText,
  Download,
  Eye,
  Trash,
  MoreHorizontal,
  Upload,
  File,
  FileSpreadsheet,
  Folder,
  Calendar,
  Building,
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

// Mock documents data
const documents = [
  {
    id: 1,
    name: "Lease Agreement - 456 Oak Avenue",
    type: "Lease",
    property: "456 Oak Avenue, Brooklyn",
    uploadedBy: "Admin",
    uploadedAt: "2024-12-15",
    size: "2.4 MB",
    fileType: "pdf",
  },
  {
    id: 2,
    name: "Property Insurance Certificate",
    type: "Insurance",
    property: "All Properties",
    uploadedBy: "Admin",
    uploadedAt: "2024-12-10",
    size: "1.8 MB",
    fileType: "pdf",
  },
  {
    id: 3,
    name: "Tenant ID - John Smith",
    type: "Identity",
    property: "456 Oak Avenue, Brooklyn",
    uploadedBy: "John Smith",
    uploadedAt: "2024-12-01",
    size: "856 KB",
    fileType: "image",
  },
  {
    id: 4,
    name: "Maintenance Report - December 2024",
    type: "Report",
    property: "All Properties",
    uploadedBy: "Admin",
    uploadedAt: "2024-12-20",
    size: "3.2 MB",
    fileType: "spreadsheet",
  },
  {
    id: 5,
    name: "Property Photos - 303 Birch Blvd",
    type: "Photos",
    property: "303 Birch Blvd, New York",
    uploadedBy: "Admin",
    uploadedAt: "2024-11-28",
    size: "15.6 MB",
    fileType: "folder",
  },
  {
    id: 6,
    name: "Lease Agreement - 606 Spruce Street",
    type: "Lease",
    property: "606 Spruce Street, Bronx",
    uploadedBy: "Admin",
    uploadedAt: "2024-12-05",
    size: "2.1 MB",
    fileType: "pdf",
  },
  {
    id: 7,
    name: "Tax Documents 2024",
    type: "Tax",
    property: "All Properties",
    uploadedBy: "Admin",
    uploadedAt: "2024-12-18",
    size: "4.5 MB",
    fileType: "pdf",
  },
  {
    id: 8,
    name: "Inspection Report - 808 Redwood Road",
    type: "Inspection",
    property: "808 Redwood Road, New York",
    uploadedBy: "Inspector",
    uploadedAt: "2024-12-12",
    size: "5.8 MB",
    fileType: "pdf",
  },
]

export function DocumentsClient() {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "all" || doc.type === typeFilter
    return matchesSearch && matchesType
  })

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case "pdf":
        return <FileText className="h-8 w-8 text-red-500" />
      case "image":
        return <File className="h-8 w-8 text-blue-500" />
      case "spreadsheet":
        return <FileSpreadsheet className="h-8 w-8 text-green-500" />
      case "folder":
        return <Folder className="h-8 w-8 text-yellow-500" />
      default:
        return <File className="h-8 w-8 text-gray-500" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Lease":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Insurance":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "Identity":
        return "bg-green-100 text-green-800 border-green-200"
      case "Report":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "Photos":
        return "bg-pink-100 text-pink-800 border-pink-200"
      case "Tax":
        return "bg-red-100 text-red-800 border-red-200"
      case "Inspection":
        return "bg-cyan-100 text-cyan-800 border-cyan-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 sm:p-8 pt-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">Documents</h2>
          <p className="text-gray-500">Manage property documents and files</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Upload className="mr-2 h-4 w-4" />
              Upload Document
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Upload Document</DialogTitle>
              <DialogDescription>Upload a new document to your property management system.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="file">File</Label>
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center hover:border-emerald-500 transition-colors cursor-pointer">
                  <Upload className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-400 mt-1">PDF, Images, Spreadsheets up to 50MB</p>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="docType">Document Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Lease">Lease Agreement</SelectItem>
                    <SelectItem value="Insurance">Insurance</SelectItem>
                    <SelectItem value="Identity">Identity Document</SelectItem>
                    <SelectItem value="Report">Report</SelectItem>
                    <SelectItem value="Photos">Photos</SelectItem>
                    <SelectItem value="Tax">Tax Document</SelectItem>
                    <SelectItem value="Inspection">Inspection</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="property">Property</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select property" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Properties</SelectItem>
                    <SelectItem value="1">456 Oak Avenue, Brooklyn</SelectItem>
                    <SelectItem value="2">303 Birch Blvd, New York</SelectItem>
                    <SelectItem value="3">606 Spruce Street, Bronx</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={() => setIsDialogOpen(false)}>
                Upload
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Documents</CardTitle>
            <FileText className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{documents.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Lease Agreements</CardTitle>
            <File className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{documents.filter((d) => d.type === "Lease").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Reports</CardTitle>
            <FileSpreadsheet className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {documents.filter((d) => d.type === "Report").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Storage Used</CardTitle>
            <Folder className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">36.2 MB</div>
          </CardContent>
        </Card>
      </div>

      {/* Documents Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Documents</CardTitle>
          <CardDescription>View and manage all your property documents</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center relative flex-1">
                <Search className="absolute left-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search documents..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Document Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Lease">Lease Agreement</SelectItem>
                  <SelectItem value="Insurance">Insurance</SelectItem>
                  <SelectItem value="Identity">Identity</SelectItem>
                  <SelectItem value="Report">Report</SelectItem>
                  <SelectItem value="Photos">Photos</SelectItem>
                  <SelectItem value="Tax">Tax</SelectItem>
                  <SelectItem value="Inspection">Inspection</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Desktop Table */}
            <div className="rounded-md border hidden md:block">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Document</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Property</TableHead>
                    <TableHead>Uploaded</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDocuments.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          {getFileIcon(doc.fileType)}
                          <div>
                            <div className="font-medium text-gray-900">{doc.name}</div>
                            <div className="text-sm text-gray-500">by {doc.uploadedBy}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getTypeColor(doc.type)} variant="outline">
                          {doc.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Building className="h-3 w-3" />
                          {doc.property}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Calendar className="h-3 w-3" />
                          {new Date(doc.uploadedAt).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-gray-500">{doc.size}</TableCell>
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
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash className="mr-2 h-4 w-4" />
                              Delete
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
              {filteredDocuments.map((doc) => (
                <Card key={doc.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      {getFileIcon(doc.fileType)}
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-gray-900">{doc.name}</h3>
                            <p className="text-sm text-gray-500">{doc.property}</p>
                          </div>
                          <Badge className={getTypeColor(doc.type)} variant="outline">
                            {doc.type}
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center mt-3">
                          <span className="text-sm text-gray-500">{doc.size}</span>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
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
