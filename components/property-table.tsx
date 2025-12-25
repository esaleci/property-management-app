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
import { MoreHorizontal, Eye, Edit, Trash, Search } from "lucide-react"
import Link from "next/link"
import { properties } from "@/lib/data"
import { Card, CardContent } from "@/components/ui/card"
import { PropertyImageGallery } from "@/components/property-image-gallery"

export function PropertyTable() {
  const [data, setData] = useState(properties)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const filteredData = data.filter((property) => {
    const matchesSearch = property.address.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || property.status === statusFilter
    const matchesType = typeFilter === "all" || property.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex items-center relative flex-1">
          <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search properties..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Occupied">Occupied</SelectItem>
              <SelectItem value="Vacant">Vacant</SelectItem>
              <SelectItem value="Maintenance">Maintenance</SelectItem>
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Apartment">Apartment</SelectItem>
              <SelectItem value="House">House</SelectItem>
              <SelectItem value="Commercial">Commercial</SelectItem>
              <SelectItem value="Land">Land</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="rounded-md border hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Property</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Rent</TableHead>
              <TableHead>Bedrooms</TableHead>
              <TableHead>Bathrooms</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No properties found.
                </TableCell>
              </TableRow>
            ) : (
              filteredData.map((property) => (
                <TableRow key={property.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="w-16 h-12 rounded overflow-hidden bg-gray-100 flex-shrink-0 border">
                        {property.images && property.images.length > 0 ? (
                          <img
                            src={property.images[0] || "/placeholder.svg"}
                            alt={property.address}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="font-medium">{property.address}</div>
                        <div className="text-sm text-muted-foreground">
                          {property.city}, {property.state}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{property.type}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        property.status === "Occupied"
                          ? "default"
                          : property.status === "Vacant"
                            ? "outline"
                            : "secondary"
                      }
                    >
                      {property.status}
                    </Badge>
                  </TableCell>
                  <TableCell>${property.rent.toLocaleString()}</TableCell>
                  <TableCell>{property.bedrooms}</TableCell>
                  <TableCell>{property.bathrooms}</TableCell>
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
                          <Link href={`/dashboard/properties/${property.id}`} className="flex items-center">
                            <Eye className="mr-2 h-4 w-4" />
                            <span>View details</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Link href={`/dashboard/properties/edit/${property.id}`} className="flex items-center">
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Edit property</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Trash className="mr-2 h-4 w-4" />
                          <span>Delete property</span>
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
          <div className="text-center py-10 text-muted-foreground">No properties found.</div>
        ) : (
          filteredData.map((property) => (
            <Card key={property.id}>
              <CardContent className="p-4">
                <div className="space-y-4">
                  {/* Property Image */}
                  <PropertyImageGallery
                    images={property.images || []}
                    propertyName={property.address}
                    className="w-full"
                    size="medium"
                  />

                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{property.address}</h3>
                      <p className="text-sm text-muted-foreground">{property.type}</p>
                    </div>
                    <Badge
                      variant={
                        property.status === "Occupied"
                          ? "default"
                          : property.status === "Vacant"
                            ? "outline"
                            : "secondary"
                      }
                    >
                      {property.status}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Rent</p>
                      <p>${property.rent.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Bedrooms</p>
                      <p>{property.bedrooms}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Bathrooms</p>
                      <p>{property.bathrooms}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Sq. Ft.</p>
                      <p>{property.squareFeet}</p>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <Link href={`/dashboard/properties/${property.id}`}>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </Link>
                    <Link href={`/dashboard/properties/edit/${property.id}`}>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
