"use client"

import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Edit, Trash, Mail, Phone, Calendar, DollarSign, Building, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { tenants, properties } from "@/lib/data"
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

export default function TenantDetailsPage() {
  const params = useParams()
  const router = useRouter()

  const tenant = tenants.find((t) => t.id === Number(params.id))
  const property = tenant ? properties.find((p) => p.id === tenant.propertyId) : null

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Current":
        return "bg-emerald-100 text-emerald-800 border-emerald-200"
      case "Late":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Overdue":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 sm:p-8 pt-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/tenants">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="text-xl bg-emerald-100 text-emerald-700">
                {tenant.firstName[0]}
                {tenant.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                {tenant.firstName} {tenant.lastName}
              </h2>
              <p className="text-gray-500">Tenant ID: #{tenant.id}</p>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href={`/dashboard/tenants/edit/${tenant.id}`}>
            <Button variant="outline">
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
          </Link>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <Trash className="mr-2 h-4 w-4" />
                Remove
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Remove Tenant</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to remove this tenant? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction className="bg-red-600 hover:bg-red-700">Remove</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium text-gray-900">{tenant.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium text-gray-900">{tenant.phone}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lease Information */}
          <Card>
            <CardHeader>
              <CardTitle>Lease Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Lease Start</p>
                    <p className="font-medium text-gray-900">{new Date(tenant.leaseStart).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Lease End</p>
                    <p className="font-medium text-gray-900">{new Date(tenant.leaseEnd).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <DollarSign className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Monthly Rent</p>
                    <p className="font-medium text-gray-900">${tenant.rentAmount.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <DollarSign className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Security Deposit</p>
                    <p className="font-medium text-gray-900">${tenant.rentAmount.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment History */}
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>Recent payment transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { date: "Dec 1, 2024", amount: tenant.rentAmount, status: "Paid" },
                  { date: "Nov 1, 2024", amount: tenant.rentAmount, status: "Paid" },
                  { date: "Oct 1, 2024", amount: tenant.rentAmount, status: "Paid" },
                ].map((payment, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">${payment.amount.toLocaleString()}</p>
                      <p className="text-sm text-gray-500">{payment.date}</p>
                    </div>
                    <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">{payment.status}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Payment Status */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <Badge className={`${getStatusColor(tenant.paymentStatus)} text-lg px-4 py-2`}>
                  {tenant.paymentStatus}
                </Badge>
                <p className="text-sm text-gray-500 mt-4">Next payment due: Jan 1, 2025</p>
              </div>
            </CardContent>
          </Card>

          {/* Property */}
          {property && (
            <Card>
              <CardHeader>
                <CardTitle>Assigned Property</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
                    <img
                      src={property.images?.[0] || "/placeholder.svg?height=200&width=300&query=property"}
                      alt={property.address}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-start gap-2">
                      <Building className="h-4 w-4 text-gray-400 mt-1" />
                      <div>
                        <p className="font-medium text-gray-900">{property.address}</p>
                        <p className="text-sm text-gray-500">
                          {property.city}, {property.state}
                        </p>
                      </div>
                    </div>
                    <Link href={`/dashboard/properties/${property.id}`}>
                      <Button variant="outline" className="w-full mt-4 bg-transparent">
                        View Property
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Documents */}
          <Card>
            <CardHeader>
              <CardTitle>Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {["Lease Agreement", "ID Copy", "Employment Verification"].map((doc) => (
                  <div key={doc} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <FileText className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-700 flex-1">{doc}</span>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
