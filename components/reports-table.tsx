"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { properties, tenants } from "@/lib/data"
import { Card, CardContent } from "@/components/ui/card"

export function ReportsTable() {
  const propertyReports = properties.map((property) => {
    const tenant = tenants.find((t) => t.propertyId === property.id)
    const monthlyRevenue = tenant ? tenant.rentAmount : 0
    const annualRevenue = monthlyRevenue * 12
    const occupancyMonths = property.status === "Occupied" ? 12 : 8 // Assume 8 months if vacant
    const actualRevenue = (annualRevenue * occupancyMonths) / 12

    return {
      ...property,
      tenant: tenant ? `${tenant.firstName} ${tenant.lastName}` : "Vacant",
      monthlyRevenue,
      annualRevenue,
      actualRevenue,
      occupancyRate: Math.round((occupancyMonths / 12) * 100),
    }
  })

  return (
    <>
      {/* Desktop Table View */}
      <div className="rounded-md border hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Property</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Tenant</TableHead>
              <TableHead>Monthly Revenue</TableHead>
              <TableHead>Annual Revenue</TableHead>
              <TableHead>Occupancy Rate</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {propertyReports.map((property) => (
              <TableRow key={property.id}>
                <TableCell className="font-medium">{property.address}</TableCell>
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
                <TableCell>{property.tenant}</TableCell>
                <TableCell>${property.monthlyRevenue.toLocaleString()}</TableCell>
                <TableCell>${property.actualRevenue.toLocaleString()}</TableCell>
                <TableCell>{property.occupancyRate}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Card View */}
      <div className="grid grid-cols-1 gap-4 md:hidden px-4">
        {propertyReports.map((property) => (
          <Card key={property.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{property.address}</h3>
                  <p className="text-sm text-muted-foreground">{property.type}</p>
                </div>
                <Badge
                  variant={
                    property.status === "Occupied" ? "default" : property.status === "Vacant" ? "outline" : "secondary"
                  }
                >
                  {property.status}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Tenant</p>
                  <p>{property.tenant}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Monthly Revenue</p>
                  <p>${property.monthlyRevenue.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Annual Revenue</p>
                  <p>${property.actualRevenue.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Occupancy Rate</p>
                  <p>{property.occupancyRate}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  )
}
