"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import dynamic from "next/dynamic"
import Link from "next/link"
import {
  ArrowLeft,
  Heart,
  Share2,
  MapPin,
  Bed,
  Bath,
  Square,
  Calendar,
  Building,
  Check,
  ChevronLeft,
  ChevronRight,
  X,
  Phone,
  Mail,
  MessageSquare,
  User,
  Printer,
  Home,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import type { Property } from "@/lib/property-data"

// Dynamic import for map component
const PropertyLocationMap = dynamic(() => import("@/components/property-location-map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] bg-muted animate-pulse rounded-lg flex items-center justify-center">
      <span className="text-muted-foreground">Loading map...</span>
    </div>
  ),
})

interface PropertyDetailsProps {
  property: Property
}

export function PropertyDetails({ property }: PropertyDetailsProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showGallery, setShowGallery] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: `Hi, I'm interested in the property "${property.title}" at ${property.address}. Please contact me with more information.`,
  })
  const [formSubmitted, setFormSubmitted] = useState(false)

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem("propertyFavorites")
    if (savedFavorites) {
      const favorites = JSON.parse(savedFavorites)
      setIsFavorite(favorites.includes(property.id))
    }
  }, [property.id])

  const toggleFavorite = () => {
    const savedFavorites = localStorage.getItem("propertyFavorites")
    let favorites = savedFavorites ? JSON.parse(savedFavorites) : []

    if (isFavorite) {
      favorites = favorites.filter((id: number) => id !== property.id)
    } else {
      favorites.push(property.id)
    }

    localStorage.setItem("propertyFavorites", JSON.stringify(favorites))
    setIsFavorite(!isFavorite)
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length)
  }

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Contact form submitted:", contactForm)
    setFormSubmitted(true)
    setTimeout(() => setFormSubmitted(false), 3000)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: property.description,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Search</span>
            </Link>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm" onClick={() => window.print()}>
                <Printer className="w-4 h-4 mr-2" />
                Print
              </Button>
              <Button
                variant={isFavorite ? "default" : "outline"}
                size="sm"
                onClick={toggleFavorite}
                className={isFavorite ? "bg-red-500 hover:bg-red-600 border-red-500" : ""}
              >
                <Heart className={`w-4 h-4 mr-2 ${isFavorite ? "fill-white" : ""}`} />
                {isFavorite ? "Saved" : "Save"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Image Gallery Section */}
        <section className="mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Main Image */}
            <motion.div
              className="relative h-[300px] md:h-[400px] lg:h-[500px] rounded-xl overflow-hidden cursor-pointer group"
              onClick={() => setShowGallery(true)}
              whileHover={{ scale: 1.01 }}
            >
              <img
                src={property.images[currentImageIndex] || "/placeholder.svg"}
                alt={property.title}
                className="w-full h-full object-cover"
              />

              {/* Navigation Arrows */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  prevImage()
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-card/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-card"
              >
                <ChevronLeft className="w-5 h-5 text-foreground" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  nextImage()
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-card/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-card"
              >
                <ChevronRight className="w-5 h-5 text-foreground" />
              </button>

              {/* Image Counter */}
              <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-card/90 backdrop-blur-sm rounded-lg text-sm font-medium text-foreground">
                {currentImageIndex + 1} / {property.images.length} Photos
              </div>

              {/* View Gallery Button */}
              <div className="absolute bottom-4 right-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                View All Photos
              </div>

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <Badge
                  className={`${property.status === "Available" ? "bg-green-500" : property.status === "Rented" ? "bg-amber-500" : "bg-red-500"} text-white border-0`}
                >
                  {property.status}
                </Badge>
                {property.featured && <Badge className="bg-amber-500 text-white border-0">Featured</Badge>}
                {property.verified && (
                  <Badge className="bg-primary text-primary-foreground border-0">
                    <Check className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>
            </motion.div>

            {/* Thumbnail Grid */}
            <div className="grid grid-cols-2 gap-4">
              {property.images.slice(1, 5).map((image, index) => (
                <motion.div
                  key={index}
                  className="relative h-[140px] md:h-[190px] lg:h-[240px] rounded-xl overflow-hidden cursor-pointer"
                  onClick={() => {
                    setCurrentImageIndex(index + 1)
                    setShowGallery(true)
                  }}
                  whileHover={{ scale: 1.02 }}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`View ${index + 2}`}
                    className="w-full h-full object-cover"
                  />
                  {index === 3 && property.images.length > 5 && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <span className="text-white font-semibold text-lg">+{property.images.length - 5} more</span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title & Price Section */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">{property.title}</h1>
                    <div className="flex items-center text-muted-foreground mb-4">
                      <MapPin className="w-5 h-5 mr-2 text-primary" />
                      <span>
                        {property.address}, {property.city}, {property.state} {property.zipCode}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <Badge variant="secondary" className="text-sm py-1 px-3">
                        <Building className="w-4 h-4 mr-1" />
                        {property.type}
                      </Badge>
                      <Badge variant="secondary" className="text-sm py-1 px-3">
                        <Calendar className="w-4 h-4 mr-1" />
                        Built {property.yearBuilt}
                      </Badge>
                      <Badge variant="secondary" className="text-sm py-1 px-3">
                        Added {new Date(property.dateAdded).toLocaleDateString()}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl md:text-4xl font-bold text-primary">
                      ${property.price.toLocaleString()}
                    </div>
                    <div className="text-muted-foreground">per {property.priceType}</div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
                  <div className="text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mx-auto mb-2">
                      <Bed className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-2xl font-bold text-foreground">
                      {property.bedrooms === 0 ? "Studio" : property.bedrooms}
                    </div>
                    <div className="text-sm text-muted-foreground">Bedrooms</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mx-auto mb-2">
                      <Bath className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-2xl font-bold text-foreground">{property.bathrooms}</div>
                    <div className="text-sm text-muted-foreground">Bathrooms</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mx-auto mb-2">
                      <Square className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-2xl font-bold text-foreground">{property.squareMeters}</div>
                    <div className="text-sm text-muted-foreground">m² Area</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{property.description}</p>
              </CardContent>
            </Card>

            {/* Features & Amenities */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Features & Amenities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {property.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg"
                    >
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-sm text-foreground">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Location Map */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-xl overflow-hidden">
                  <PropertyLocationMap
                    lat={property.coordinates.lat}
                    lng={property.coordinates.lng}
                    title={property.title}
                    address={property.address}
                  />
                </div>
                <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">Full Address:</strong> {property.address}, {property.city},{" "}
                    {property.state} {property.zipCode}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Agent Card */}
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">Contact Agent</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Agent Info */}
                <div className="flex items-center gap-4 pb-4 border-b border-border">
                  <img
                    src={property.agent.image || "/placeholder.svg"}
                    alt={property.agent.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-primary"
                  />
                  <div>
                    <h3 className="font-semibold text-foreground">{property.agent.name}</h3>
                    <p className="text-sm text-muted-foreground">Property Agent</p>
                  </div>
                </div>

                {/* Quick Contact */}
                <div className="space-y-3">
                  <a
                    href={`tel:${property.agent.phone}`}
                    className="flex items-center gap-3 p-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                    <span className="font-medium">{property.agent.phone}</span>
                  </a>
                  <a
                    href={`mailto:${property.agent.email}`}
                    className="flex items-center gap-3 p-3 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    <span className="text-sm">{property.agent.email}</span>
                  </a>
                </div>

                {/* Contact Form */}
                <form onSubmit={handleContactSubmit} className="space-y-4 pt-4 border-t border-border">
                  <h4 className="font-medium text-foreground">Send a Message</h4>

                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="name"
                        placeholder="John Doe"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={contactForm.phone}
                        onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="I'm interested in this property..."
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      rows={4}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={formSubmitted}>
                    {formSubmitted ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Message Sent!
                      </>
                    ) : (
                      <>
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Full Screen Gallery Modal */}
      <AnimatePresence>
        {showGallery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
            onClick={() => setShowGallery(false)}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowGallery(false)}
              className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors z-10"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Navigation */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                prevImage()
              }}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors z-10"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                nextImage()
              }}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors z-10"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            {/* Main Image */}
            <motion.img
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              src={property.images[currentImageIndex]}
              alt={property.title}
              className="max-w-[90vw] max-h-[80vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Image Counter */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white text-lg">
              {currentImageIndex + 1} / {property.images.length}
            </div>

            {/* Thumbnails */}
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2">
              {property.images.map((img, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation()
                    setCurrentImageIndex(index)
                  }}
                  className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                    index === currentImageIndex
                      ? "border-primary scale-110"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img || "/placeholder.svg"}
                    alt={`Thumb ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-primary hover:opacity-80 transition-opacity">
            <Home className="w-5 h-5" />
            <span className="font-semibold">PropertyManager</span>
          </Link>
          <p className="text-sm text-muted-foreground mt-2">
            © {new Date().getFullYear()} PropertyManager. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
