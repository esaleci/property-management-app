import type { Metadata } from "next"
import Link from "next/link"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PropertyTable } from "@/components/property-table"

export const metadata: Metadata = {
  title: "Properties",
  description: "Manage your properties.",
}

export default function PropertiesPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Properties</h2>
        <div className="flex items-center space-x-2">
          <Link href="/dashboard/properties/add">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Property
            </Button>
          </Link>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Property Inventory</CardTitle>
          <CardDescription>Manage your property portfolio. You have 20 properties in your inventory.</CardDescription>
        </CardHeader>
        <CardContent>
          <PropertyTable />
        </CardContent>
      </Card>
    </div>
  )
}
