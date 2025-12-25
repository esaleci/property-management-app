"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import type { Property } from "@/lib/property-data"

interface PropertyMapProps {
  properties: Property[]
  favorites: number[]
  onToggleFavorite: (e: React.MouseEvent, id: number) => void
  onSelectProperty: (property: Property) => void
}

export default function PropertyMap({ properties, favorites, onSelectProperty }: PropertyMapProps) {
  const mapRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [mapReady, setMapReady] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const leafletRef = useRef<any>(null)

  useEffect(() => {
    let isMounted = true

    const loadLeaflet = async () => {
      try {
        const existingLink = document.querySelector('link[href*="leaflet"]')
        if (!existingLink) {
          const link = document.createElement("link")
          link.rel = "stylesheet"
          link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          link.crossOrigin = ""
          document.head.appendChild(link)

          await new Promise<void>((resolve) => {
            link.onload = () => resolve()
            setTimeout(resolve, 1000) // Fallback timeout
          })
        }

        const L = (await import("leaflet")).default
        leafletRef.current = L

        if (isMounted) {
          setIsLoaded(true)
        }
      } catch (err) {
        console.log("[v0] Error loading Leaflet:", err)
        if (isMounted) {
          setError("Failed to load map")
        }
      }
    }

    loadLeaflet()

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    if (!mapContainerRef.current || !isLoaded || !leafletRef.current || mapRef.current) return

    const L = leafletRef.current

    try {
      console.log("[v0] Creating map instance")

      const map = L.map(mapContainerRef.current, {
        center: [39.8283, -98.5795],
        zoom: 4,
      })

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map)

      mapRef.current = map

      setTimeout(() => {
        map.invalidateSize()
        setMapReady(true)
        console.log("[v0] Map ready")
      }, 200)
    } catch (err) {
      console.log("[v0] Error creating map:", err)
      setError("Failed to create map")
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
        setMapReady(false)
      }
    }
  }, [isLoaded])

  useEffect(() => {
    if (!mapRef.current || !mapReady || !leafletRef.current) return

    const L = leafletRef.current
    const map = mapRef.current

    // Clear existing markers
    markersRef.current.forEach((marker) => marker.remove())
    markersRef.current = []

    console.log("[v0] Adding markers for", properties.length, "properties")

    const defaultIcon = L.icon({
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    })

    const favoriteIcon = L.icon({
      iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
      iconRetinaUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
      shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    })

    if (properties.length > 0) {
      const bounds = L.latLngBounds([])

      properties.forEach((property) => {
        if (!property.coordinates?.lat || !property.coordinates?.lng) return

        const isFavorite = favorites.includes(property.id)
        const marker = L.marker([property.coordinates.lat, property.coordinates.lng], {
          icon: isFavorite ? favoriteIcon : defaultIcon,
        })

        const popupContent = `
          <div style="min-width: 200px; font-family: system-ui, sans-serif;">
            <img src="${property.images[0]}" alt="${property.title}" style="width: 100%; height: 120px; object-fit: cover; border-radius: 8px; margin-bottom: 8px;" onerror="this.style.display='none'" />
            <h3 style="margin: 0 0 4px 0; font-size: 14px; font-weight: 600; color: #1a1a1a;">${property.title}</h3>
            <p style="margin: 0 0 8px 0; font-size: 12px; color: #666;">${property.city}, ${property.state}</p>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span style="font-size: 16px; font-weight: 700; color: #0d9488;">$${property.price.toLocaleString()}/${property.priceType}</span>
              <span style="font-size: 11px; color: #888;">${property.bedrooms} bed • ${property.bathrooms} bath</span>
            </div>
          </div>
        `

        marker.bindPopup(popupContent)
        marker.on("click", () => {
          onSelectProperty(property)
        })

        marker.addTo(map)
        markersRef.current.push(marker)
        bounds.extend([property.coordinates.lat, property.coordinates.lng])
      })

      if (bounds.isValid()) {
        map.fitBounds(bounds, { padding: [50, 50], maxZoom: 12 })
      }
    }

    console.log("[v0] Markers added successfully")
  }, [properties, favorites, onSelectProperty, mapReady])

  if (error) {
    return (
      <div className="w-full h-[600px] rounded-xl bg-muted flex items-center justify-center">
        <div className="text-destructive">{error}</div>
      </div>
    )
  }

  return (
    <div className="relative w-full h-[600px] rounded-xl overflow-hidden">
      <div ref={mapContainerRef} className="w-full h-full bg-muted" style={{ zIndex: 1 }} />
      {(!isLoaded || !mapReady) && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted rounded-xl z-10">
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <span className="text-muted-foreground">Loading map...</span>
          </div>
        </div>
      )}
    </div>
  )
}
