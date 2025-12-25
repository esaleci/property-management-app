"use client"

import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TenantForm } from "@/components/tenant-form"
import { tenants } from "@/lib/data"

export default function EditTenantPage() {
  const params = useParams()
  const router = useRouter()

  const tenant = tenants.find((t) => t.id === Number(params.id))

  if (!tenant) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Tenant Not Found</h2>
          <p className="text-gray-500 mt-2">The tenant you're looking for doesn't exist.</p>
          <Link href="/dashboard/tenants">
            <Button className="mt-4">Back to Tenants</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4 p-4 sm:p-8 pt-6">
      <div className="flex items-center gap-4">
        <Link href={`/dashboard/tenants/${tenant.id}`}>
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Edit Tenant</h2>
          <p className="text-gray-500">
            {tenant.firstName} {tenant.lastName}
          </p>
        </div>
      </div>

      <TenantForm tenant={tenant} isEditing />
    </div>
  )
}
