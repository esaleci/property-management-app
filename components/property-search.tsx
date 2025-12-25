"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { properties, type Property } from "@/lib/property-data"
import { searchLocations, highlightMatch, type Location } from "@/lib/locations-data"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  SlidersHorizontal,
  Heart,
  MapPin,
  Bed,
  Bath,
  Maximize,
  ChevronLeft,
  ChevronRight,
  X,
  Map,
  LayoutGrid,
  Eye,
  Building,
  BadgeCheck,
  Star,
} from "lucide-react"
import Link from "next/link"
import dynamic from "next/dynamic"

const PropertyMap = dynamic(() => import("@/components/property-map").then((mod) => mod.PropertyMap), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] bg-muted rounded-xl flex items-center justify-center">
      <div className="text-muted-foreground">Loading map...</div>
    </div>
  ),
})

interface PropertySearchProps {
  showFavoritesOnly?: boolean
  onFavoritesChange?: (count: number) => void
}

export function PropertySearch({ showFavoritesOnly = false, onFavoritesChange }: PropertySearchProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)
  const [showLocationDropdown, setShowLocationDropdown] = useState(false)
  const [selectedType, setSelectedType] = useState("all")
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")
  const [bedrooms, setBedrooms] = useState("all")
  const [showFilters, setShowFilters] = useState(false)
  const [favorites, setFavorites] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("featured")
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12
  const searchRef = useRef<HTMLDivElement>(null)

  const filteredLocations = searchLocations(searchQuery)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowLocationDropdown(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    const savedFavorites = localStorage.getItem("propertyFavorites")
    if (savedFavorites) {
      const parsed = JSON.parse(savedFavorites)
      setFavorites(parsed)
    }
  }, [onFavoritesChange])

  const toggleFavorite = (propertyId: string) => {
    setFavorites((prev) => {
      const newFavorites = prev.includes(propertyId) ? prev.filter((id) => id !== propertyId) : [...prev, propertyId]
      localStorage.setItem("propertyFavorites", JSON.stringify(newFavorites))
      return newFavorites
    })
  }

  useEffect(() => {
    onFavoritesChange?.(favorites.length)
  }, [favorites.length, onFavoritesChange])

  const handleSelectLocation = (location: Location) => {
    setSelectedLocation(location)
    setSearchQuery(location.name)
    setShowLocationDropdown(false)
  }

  const clearLocation = () => {
    setSelectedLocation(null)
    setSearchQuery("")
  }

  const filteredProperties = properties.filter((property) => {
    if (selectedLocation) {
      const locationName = selectedLocation.name.toLowerCase()
      const propertyAddress = (property.address || "").toLowerCase()
      const propertyNeighborhood = (property.neighborhood || "").toLowerCase()

      const matchesLocation =
        propertyAddress.includes(locationName) ||
        propertyNeighborhood.includes(locationName) ||
        (selectedLocation.type === "city" && propertyAddress.includes(locationName)) ||
        (selectedLocation.type === "area" && propertyNeighborhood.includes(locationName))

      if (!matchesLocation) return false
    }

    if (selectedType !== "all" && property.type !== selectedType) return false

    const propertyPrice = property.price ?? 0
    if (minPrice && propertyPrice < Number.parseInt(minPrice)) return false
    if (maxPrice && propertyPrice > Number.parseInt(maxPrice)) return false

    if (bedrooms !== "all") {
      const bedroomCount = property.bedrooms ?? 0
      if (bedrooms === "4+" && bedroomCount < 4) return false
      else if (bedrooms !== "4+" && bedroomCount !== Number.parseInt(bedrooms)) return false
    }

    if (showFavoritesOnly && !favorites.includes(property.id.toString())) return false

    return true
  })

  const sortedProperties = [...filteredProperties].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return (a.price ?? 0) - (b.price ?? 0)
      case "price-high":
        return (b.price ?? 0) - (a.price ?? 0)
      case "size":
        return (b.squareMeters ?? 0) - (a.squareMeters ?? 0)
      case "newest":
        return new Date(b.dateAdded || 0).getTime() - new Date(a.dateAdded || 0).getTime()
      default:
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
    }
  })

  const totalPages = Math.ceil(sortedProperties.length / itemsPerPage)
  const paginatedProperties = sortedProperties.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedLocation, selectedType, minPrice, maxPrice, bedrooms, showFavoritesOnly, sortBy])

  const clearFilters = () => {
    setSelectedLocation(null)
    setSearchQuery("")
    setSelectedType("all")
    setMinPrice("")
    setMaxPrice("")
    setBedrooms("all")
    setSortBy("featured")
  }

  return (
    <div className="space-y-6 w-full">
      <div className="bg-card border border-border rounded-xl p-4 mb-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1" ref={searchRef}>
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
            <Input
              type="text"
              placeholder="Search by city, area, or community..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setSelectedLocation(null)
                setShowLocationDropdown(true)
              }}
              onFocus={() => setShowLocationDropdown(true)}
              className="pl-12 pr-10 h-12 bg-background border-input text-foreground placeholder:text-muted-foreground"
            />
            {(searchQuery || selectedLocation) && (
              <button
                onClick={clearLocation}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            <AnimatePresence>
              {showLocationDropdown && filteredLocations.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-xl z-50 max-h-80 overflow-y-auto"
                >
                  <div className="py-2">
                    {!searchQuery && (
                      <p className="text-xs text-muted-foreground px-4 py-2 font-medium uppercase tracking-wide">
                        Popular Cities
                      </p>
                    )}
                    {filteredLocations.map((location) => {
                      const highlight = highlightMatch(location.name, searchQuery)
                      const typeIcon =
                        location.type === "city" ? (
                          <Building className="w-4 h-4 text-primary flex-shrink-0" />
                        ) : (
                          <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                        )

                      return (
                        <button
                          key={location.id}
                          onClick={() => handleSelectLocation(location)}
                          className="w-full text-left px-4 py-3 hover:bg-accent flex items-center gap-3 transition-colors border-b border-border/50 last:border-b-0"
                        >
                          {typeIcon}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              {highlight ? (
                                <span className="text-foreground">
                                  {highlight.before}
                                  <span className="font-bold text-primary">{highlight.match}</span>
                                  {highlight.after}
                                </span>
                              ) : (
                                <span className="text-foreground">{location.name}</span>
                              )}
                              {location.parent && (
                                <span className="text-muted-foreground text-sm">({location.parent})</span>
                              )}
                            </div>
                            {location.propertyCount && (
                              <p className="text-xs text-muted-foreground mt-0.5">
                                {location.propertyCount} properties
                              </p>
                            )}
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Button
            onClick={() => setShowLocationDropdown(false)}
            className="h-12 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
          >
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>

          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="h-12 border-input text-foreground hover:bg-accent"
          >
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>

        {selectedLocation && (
          <div className="mt-3 flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Searching in:</span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium">
              <MapPin className="w-3.5 h-3.5" />
              {selectedLocation.name}
              {selectedLocation.parent && <span className="text-primary/70">, {selectedLocation.parent}</span>}
              <button onClick={clearLocation} className="ml-1 hover:bg-primary/20 rounded-full p-0.5 transition-colors">
                <X className="w-3 h-3" />
              </button>
            </span>
          </div>
        )}

        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pt-4 mt-4 border-t border-border grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Min Price</label>
                <Input
                  type="number"
                  placeholder="Min price"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="bg-background border-input text-foreground"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Max Price</label>
                <Input
                  type="number"
                  placeholder="Max price"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="bg-background border-input text-foreground"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Bedrooms</label>
                <Select value={bedrooms} onValueChange={setBedrooms}>
                  <SelectTrigger className="bg-background border-input text-foreground">
                    <SelectValue placeholder="Bedrooms" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any</SelectItem>
                    <SelectItem value="1">1+</SelectItem>
                    <SelectItem value="2">2+</SelectItem>
                    <SelectItem value="3">3+</SelectItem>
                    <SelectItem value="4">4+</SelectItem>
                    <SelectItem value="5">5+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button
                  variant="ghost"
                  onClick={clearFilters}
                  className="w-full text-muted-foreground hover:text-foreground"
                >
                  Clear All Filters
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">{sortedProperties.length} Properties Found</h2>
          <p className="text-muted-foreground">
            {selectedLocation ? `Properties in ${selectedLocation.name}` : "Showing all available properties"}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-40 bg-background border-input text-foreground">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="size">Size: Largest</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex rounded-lg border border-border overflow-hidden">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="rounded-none"
            >
              <LayoutGrid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "map" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("map")}
              className="rounded-none"
            >
              <Map className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {viewMode === "grid" ? (
        <>
          {paginatedProperties.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {paginatedProperties.map((property, index) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  index={index}
                  isFavorite={favorites.includes(property.id.toString())}
                  onToggleFavorite={() => toggleFavorite(property.id.toString())}
                />
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">No properties found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your location or filters</p>
              <Button onClick={clearFilters} variant="outline">
                Clear All Filters
              </Button>
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <Button variant="outline" size="sm" onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
                First
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>

              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum
                if (totalPages <= 5) {
                  pageNum = i + 1
                } else if (currentPage <= 3) {
                  pageNum = i + 1
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i
                } else {
                  pageNum = currentPage - 2 + i
                }
                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </Button>
                )
              })}

              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
              >
                Last
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="h-[600px] rounded-xl overflow-hidden border border-border">
          <PropertyMap properties={sortedProperties} favorites={favorites} onSelectProperty={() => {}} />
        </div>
      )}
    </div>
  )
}

function PropertyCard({
  property,
  index,
  isFavorite,
  onToggleFavorite,
}: {
  property: Property
  index: number
  isFavorite: boolean
  onToggleFavorite: () => void
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
      <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 border-border bg-white">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={property.images?.[0] || "/placeholder.svg?height=300&width=400&query=modern property"}
            alt={property.title || "Property"}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          <div className="absolute top-3 left-3 flex gap-2">
            {property.verified && (
              <div
                className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center shadow-md"
                title="Verified"
              >
                <BadgeCheck className="w-5 h-5 text-white" />
              </div>
            )}
            {property.featured && (
              <div
                className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center shadow-md"
                title="Featured"
              >
                <Star className="w-5 h-5 text-white" />
              </div>
            )}
          </div>

          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onToggleFavorite()
            }}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition-colors shadow-md border border-gray-200"
          >
            <Heart className={`w-5 h-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-500"}`} />
          </button>

          <div className="absolute bottom-3 left-3">
            <span className="bg-white/95 backdrop-blur-sm text-gray-900 text-lg font-bold px-3 py-1.5 rounded-lg shadow-sm">
              ${(property.price ?? 0).toLocaleString()}
              <span className="text-sm font-normal text-gray-500 ml-1">/{property.priceType || "month"}</span>
            </span>
          </div>
        </div>

        <CardContent className="p-4 bg-white">
          <h3 className="font-semibold text-gray-900 truncate mb-1 group-hover:text-emerald-600 transition-colors">
            {property.title || "Untitled Property"}
          </h3>

          <p className="text-sm text-gray-500 flex items-center gap-1 mb-3">
            <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
            <span className="truncate">{property.city || property.address || "Unknown location"}</span>
          </p>

          <div className="flex items-center justify-between text-xs mb-4 py-2 px-2 bg-gray-50 rounded-lg border border-gray-100">
            <div className="flex items-center gap-1">
              <Bed className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
              <span className="text-gray-900 font-medium">{property.bedrooms ?? 0}</span>
              <span className="text-gray-500 hidden sm:inline">Beds</span>
            </div>
            <div className="flex items-center gap-1">
              <Bath className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
              <span className="text-gray-900 font-medium">{property.bathrooms ?? 0}</span>
              <span className="text-gray-500 hidden sm:inline">Baths</span>
            </div>
            <div className="flex items-center gap-1">
              <Maximize className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
              <span className="text-gray-900 font-medium">{(property.squareMeters ?? 0).toLocaleString()}</span>
              <span className="text-gray-500 hidden sm:inline">m²</span>
            </div>
          </div>

          <Link href={`/property/${property.id}`} className="block">
            <button className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2.5 px-4 rounded-lg transition-colors">
              <Eye className="w-4 h-4" />
              <span>View Details</span>
            </button>
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  )
}
