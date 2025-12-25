"use client"

import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Edit, Trash, MapPin, Bed, Bath, Maximize, User, Building } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { properties, tenants } from "@/lib/data"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function PropertyDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const [selectedImage, setSelectedImage] = useState(0)

  const property = properties.find((p) => p.id === Number(params.id))
  const propertyTenants = tenants.filter((t) => t.propertyId === Number(params.id))

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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/properties">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">{property.address}</h2>
            <p className="text-gray-500">
              {property.city}, {property.state} {property.zip}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href={`/dashboard/properties/edit/${property.id}`}>
            <Button variant="outline">
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
          </Link>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Property</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this property? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction className="bg-red-600 hover:bg-red-700">Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Image Gallery */}
          <Card>
            <CardContent className="p-0">
              <div className="relative aspect-video">
                <img
                  src={property.images?.[selectedImage] || "/placeholder.svg?height=400&width=600&query=property"}
                  alt={property.address}
                  className="w-full h-full object-cover rounded-t-lg"
                />
                <Badge
                  className={`absolute top-4 left-4 ${
                    property.status === "Occupied"
                      ? "bg-emerald-500"
                      : property.status === "Vacant"
                        ? "bg-blue-500"
                        : "bg-orange-500"
                  }`}
                >
                  {property.status}
                </Badge>
              </div>
              {property.images && property.images.length > 1 && (
                <div className="flex gap-2 p-4 overflow-x-auto">
                  {property.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`flex-shrink-0 w-20 h-16 rounded-md overflow-hidden border-2 ${
                        selectedImage === idx ? "border-emerald-500" : "border-transparent"
                      }`}
                    >
                      <img src={img || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Property Details */}
          <Card>
            <CardHeader>
              <CardTitle>Property Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                  <Bed className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Bedrooms</p>
                    <p className="font-semibold text-gray-900">{property.bedrooms}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                  <Bath className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Bathrooms</p>
                    <p className="font-semibold text-gray-900">{property.bathrooms}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                  <Maximize className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Square Feet</p>
                    <p className="font-semibold text-gray-900">{property.squareFeet?.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                  <Building className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Type</p>
                    <p className="font-semibold text-gray-900">{property.type}</p>
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600">
                  {property.description ||
                    "Beautiful property located in a prime location. This property offers modern amenities and is well-maintained."}
                </p>
              </div>

              <Separator className="my-6" />

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Features & Amenities</h3>
                <div className="flex flex-wrap gap-2">
                  {["Air Conditioning", "Heating", "Parking", "Laundry", "Dishwasher", "Pet Friendly"].map(
                    (feature) => (
                      <Badge key={feature} variant="outline" className="bg-gray-50">
                        {feature}
                      </Badge>
                    ),
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Pricing Card */}
          <Card>
            <CardHeader>
              <CardTitle>Pricing</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Monthly Rent</span>
                  <span className="text-2xl font-bold text-emerald-600">${property.rent?.toLocaleString()}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Security Deposit</span>
                  <span className="font-semibold">${property.rent?.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Year Built</span>
                  <span className="font-semibold">{property.yearBuilt || "N/A"}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Current Tenants */}
          <Card>
            <CardHeader>
              <CardTitle>Current Tenants</CardTitle>
              <CardDescription>
                {propertyTenants.length > 0
                  ? `${propertyTenants.length} tenant(s) in this property`
                  : "No tenants currently"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {propertyTenants.length > 0 ? (
                <div className="space-y-4">
                  {propertyTenants.map((tenant) => (
                    <div key={tenant.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                        <User className="h-5 w-5 text-emerald-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">
                          {tenant.firstName} {tenant.lastName}
                        </p>
                        <p className="text-sm text-gray-500">{tenant.email}</p>
                      </div>
                      <Link href={`/dashboard/tenants/${tenant.id}`}>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <User className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                  <p className="text-gray-500">No tenants assigned</p>
                  <Link href="/dashboard/tenants/add">
                    <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                      Add Tenant
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Location */}
          <Card>
            <CardHeader>
              <CardTitle>Location</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                <MapPin className="h-8 w-8 text-gray-400" />
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-gray-400 mt-1" />
                <div>
                  <p className="font-medium text-gray-900">{property.address}</p>
                  <p className="text-sm text-gray-500">
                    {property.city}, {property.state} {property.zip}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
