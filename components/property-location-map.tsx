"use client"

import { useEffect, useRef, useState } from "react"

interface PropertyLocationMapProps {
  lat: number
  lng: number
  title: string
  address: string
}

export default function PropertyLocationMap({ lat, lng, title, address }: PropertyLocationMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const mapInstanceRef = useRef<any>(null)

  useEffect(() => {
    // Load Leaflet CSS
    if (!document.getElementById("leaflet-css")) {
      const link = document.createElement("link")
      link.id = "leaflet-css"
      link.rel = "stylesheet"
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      document.head.appendChild(link)
    }

    // Load Leaflet JS and initialize map
    const loadMap = async () => {
      const L = (await import("leaflet")).default

      // Fix marker icons
      delete (L.Icon.Default.prototype as any)._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      })

      if (mapRef.current && !mapInstanceRef.current) {
        const map = L.map(mapRef.current).setView([lat, lng], 15)

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map)

        // Custom marker icon
        const customIcon = L.divIcon({
          html: `
            <div style="
              background-color: #0d9488;
              width: 36px;
              height: 36px;
              border-radius: 50% 50% 50% 0;
              transform: rotate(-45deg);
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: 0 4px 12px rgba(0,0,0,0.3);
              border: 3px solid white;
            ">
              <svg style="transform: rotate(45deg); width: 18px; height: 18px; color: white;" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
            </div>
          `,
          className: "custom-marker",
          iconSize: [36, 36],
          iconAnchor: [18, 36],
          popupAnchor: [0, -36],
        })

        const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map)
        marker
          .bindPopup(`
          <div style="padding: 8px; min-width: 200px;">
            <h3 style="font-weight: 600; margin-bottom: 4px; color: #0d9488;">${title}</h3>
            <p style="color: #666; font-size: 13px; margin: 0;">${address}</p>
          </div>
        `)
          .openPopup()

        mapInstanceRef.current = map
        setIsLoaded(true)

        // Force resize
        setTimeout(() => {
          map.invalidateSize()
        }, 100)
      }
    }

    loadMap()

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [lat, lng, title, address])

  return (
    <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
      {!isLoaded && (
        <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
          <span className="text-muted-foreground">Loading map...</span>
        </div>
      )}
      <div ref={mapRef} className="w-full h-full" />
    </div>
  )
}
