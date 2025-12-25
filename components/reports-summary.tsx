"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, TrendingUp, Users, Wrench } from "lucide-react"
import { properties, tenants, maintenanceRequests } from "@/lib/data"

export function ReportsSummary() {
  const totalRevenue = tenants.reduce((sum, tenant) => sum + tenant.rentAmount, 0)
  const occupancyRate = Math.round((properties.filter((p) => p.status === "Occupied").length / properties.length) * 100)
  const activeTenants = tenants.filter((t) => t.paymentStatus === "Current").length
  const pendingMaintenance = maintenanceRequests.filter((r) => r.status === "Open").length

  return (
    <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-xl sm:text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">+12.5% from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Occupancy</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-xl sm:text-2xl font-bold">{occupancyRate}%</div>
          <p className="text-xs text-muted-foreground">+5% from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Tenants</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-xl sm:text-2xl font-bold">{activeTenants}</div>
          <p className="text-xs text-muted-foreground">{tenants.length - activeTenants} with issues</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Maintenance</CardTitle>
          <Wrench className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-xl sm:text-2xl font-bold">{pendingMaintenance}</div>
          <p className="text-xs text-muted-foreground">3 high priority</p>
        </CardContent>
      </Card>
    </div>
  )
}
