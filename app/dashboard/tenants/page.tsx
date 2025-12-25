import type { Metadata } from "next"
import Link from "next/link"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TenantsTable } from "@/components/tenants-table"

export const metadata: Metadata = {
  title: "Tenants",
  description: "Manage your tenants.",
}

export default function TenantsPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Tenants</h2>
        <div className="flex items-center space-x-2">
          <Link href="/dashboard/tenants/add">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Tenant
            </Button>
          </Link>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Tenant Directory</CardTitle>
          <CardDescription>Manage your tenant information. You have 20 tenants across your properties.</CardDescription>
        </CardHeader>
        <CardContent>
          <TenantsTable />
        </CardContent>
      </Card>
    </div>
  )
}
