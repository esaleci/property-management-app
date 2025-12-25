import type { Metadata } from "next"
import { TenantForm } from "@/components/tenant-form"

export const metadata: Metadata = {
  title: "Add Tenant",
  description: "Add a new tenant to your property.",
}

export default function AddTenantPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Add Tenant</h2>
        <p className="text-muted-foreground">Add a new tenant to your property portfolio.</p>
      </div>
      <TenantForm />
    </div>
  )
}
