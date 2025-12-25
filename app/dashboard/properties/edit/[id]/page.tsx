"use client"

import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PropertyForm } from "@/components/property-form"
import { properties } from "@/lib/data"

export default function EditPropertyPage() {
  const params = useParams()
  const router = useRouter()

  const property = properties.find((p) => p.id === Number(params.id))

  if (!property) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Property Not Found</h2>
          <p className="text-gray-500 mt-2">The property you're looking for doesn't exist.</p>
          <Link href="/dashboard/properties">
            <Button className="mt-4">Back to Properties</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4 p-4 sm:p-8 pt-6">
      <div className="flex items-center gap-4">
        <Link href={`/dashboard/properties/${property.id}`}>
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Edit Property</h2>
          <p className="text-gray-500">{property.address}</p>
        </div>
      </div>

      <PropertyForm property={property} isEditing />
    </div>
  )
}
