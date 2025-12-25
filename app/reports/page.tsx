import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RevenueChart } from "@/components/revenue-chart"
import { OccupancyChart } from "@/components/occupancy-chart"
import { MaintenanceChart } from "@/components/maintenance-chart"
import { PaymentStatusChart } from "@/components/payment-status-chart"
import { PropertyTypeChart } from "@/components/property-type-chart"
import { ReportsTable } from "@/components/reports-table"
import { ReportsSummary } from "@/components/reports-summary"

export const metadata: Metadata = {
  title: "Reports",
  description: "View detailed reports and analytics.",
}

export default function ReportsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 sm:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Reports & Analytics</h2>
      </div>

      <ReportsSummary />

      <Tabs defaultValue="financial" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="occupancy">Occupancy</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          <TabsTrigger value="detailed">Detailed</TabsTrigger>
        </TabsList>

        <TabsContent value="financial" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Revenue Trend</CardTitle>
                <CardDescription>Revenue performance over the last 12 months</CardDescription>
              </CardHeader>
              <CardContent>
                <RevenueChart />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Payment Status Distribution</CardTitle>
                <CardDescription>Current payment status of all tenants</CardDescription>
              </CardHeader>
              <CardContent>
                <PaymentStatusChart />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="occupancy" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Occupancy Rate Trend</CardTitle>
                <CardDescription>Occupancy rates over the last 12 months</CardDescription>
              </CardHeader>
              <CardContent>
                <OccupancyChart />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Property Type Distribution</CardTitle>
                <CardDescription>Breakdown of properties by type</CardDescription>
              </CardHeader>
              <CardContent>
                <PropertyTypeChart />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Maintenance Requests Analysis</CardTitle>
              <CardDescription>Monthly maintenance request trends and status breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <MaintenanceChart />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="detailed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Detailed Property Reports</CardTitle>
              <CardDescription>Comprehensive property performance data</CardDescription>
            </CardHeader>
            <CardContent className="px-0 sm:px-6">
              <ReportsTable />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
