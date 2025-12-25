"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MoreHorizontal, Eye, Edit, Trash, Search, Phone, Mail } from "lucide-react"
import Link from "next/link"
import { tenants, properties } from "@/lib/data"
import { Card, CardContent } from "@/components/ui/card"

export function TenantsTable() {
  const [data, setData] = useState(tenants)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredData = data.filter((tenant) => {
    const fullName = `${tenant.firstName} ${tenant.lastName}`.toLowerCase()
    const matchesSearch =
      fullName.includes(searchTerm.toLowerCase()) || tenant.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || tenant.paymentStatus === statusFilter

    return matchesSearch && matchesStatus
  })

  const getPropertyAddress = (propertyId: number) => {
    const property = properties.find((p) => p.id === propertyId)
    return property ? property.address : "Unknown"
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex items-center relative flex-1">
          <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tenants..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue placeholder="Payment Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Current">Current</SelectItem>
              <SelectItem value="Late">Late</SelectItem>
              <SelectItem value="Overdue">Overdue</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="rounded-md border hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Property</TableHead>
              <TableHead>Lease Period</TableHead>
              <TableHead>Rent</TableHead>
              <TableHead>Payment Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No tenants found.
                </TableCell>
              </TableRow>
            ) : (
              filteredData.map((tenant) => (
                <TableRow key={tenant.id}>
                  <TableCell className="font-medium">
                    {tenant.firstName} {tenant.lastName}
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm">
                        <Mail className="mr-1 h-3 w-3" />
                        {tenant.email}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Phone className="mr-1 h-3 w-3" />
                        {tenant.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getPropertyAddress(tenant.propertyId)}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{new Date(tenant.leaseStart).toLocaleDateString()}</div>
                      <div className="text-muted-foreground">to {new Date(tenant.leaseEnd).toLocaleDateString()}</div>
                    </div>
                  </TableCell>
                  <TableCell>${tenant.rentAmount.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        tenant.paymentStatus === "Current"
                          ? "default"
                          : tenant.paymentStatus === "Late"
                            ? "destructive"
                            : "secondary"
                      }
                    >
                      {tenant.paymentStatus}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Link href={`/dashboard/tenants/${tenant.id}`} className="flex items-center">
                            <Eye className="mr-2 h-4 w-4" />
                            <span>View details</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Link href={`/dashboard/tenants/edit/${tenant.id}`} className="flex items-center">
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Edit tenant</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Trash className="mr-2 h-4 w-4" />
                          <span>Remove tenant</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Card View */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {filteredData.length === 0 ? (
          <div className="text-center py-10 text-muted-foreground">No tenants found.</div>
        ) : (
          filteredData.map((tenant) => (
            <Card key={tenant.id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">
                      {tenant.firstName} {tenant.lastName}
                    </h3>
                    <p className="text-sm text-muted-foreground">{getPropertyAddress(tenant.propertyId)}</p>
                  </div>
                  <Badge
                    variant={
                      tenant.paymentStatus === "Current"
                        ? "default"
                        : tenant.paymentStatus === "Late"
                          ? "destructive"
                          : "secondary"
                    }
                  >
                    {tenant.paymentStatus}
                  </Badge>
                </div>
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex items-center">
                    <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{tenant.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{tenant.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-muted-foreground mr-2">Rent:</span>
                    <span>${tenant.rentAmount.toLocaleString()}/month</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-muted-foreground mr-2">Lease:</span>
                    <span>
                      {new Date(tenant.leaseStart).toLocaleDateString()} -{" "}
                      {new Date(tenant.leaseEnd).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <Link href={`/dashboard/tenants/${tenant.id}`}>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </Link>
                  <Link href={`/dashboard/tenants/edit/${tenant.id}`}>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
