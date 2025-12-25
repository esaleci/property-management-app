import type { Metadata } from "next"
import { properties } from "@/lib/property-data"
import { PropertyDetails } from "@/components/property-details"
import { notFound } from "next/navigation"

interface Props {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const property = properties.find((p) => p.id === Number.parseInt(params.id))

  if (!property) {
    return {
      title: "Property Not Found",
    }
  }

  return {
    title: `${property.title} - PropertyManager`,
    description: property.description,
  }
}

export default function PropertyPage({ params }: Props) {
  const property = properties.find((p) => p.id === Number.parseInt(params.id))

  if (!property) {
    notFound()
  }

  return <PropertyDetails property={property} />
}
