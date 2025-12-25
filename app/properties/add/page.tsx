import type { Metadata } from "next"
import { PropertyForm } from "@/components/property-form"

export const metadata: Metadata = {
  title: "Add Property",
  description: "Add a new property to your portfolio.",
}

export default function AddPropertyPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Add Property</h2>
        <p className="text-muted-foreground">Add a new property to your portfolio.</p>
      </div>
      <PropertyForm />
    </div>
  )
}
