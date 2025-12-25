"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface PropertyImageGalleryProps {
  images: string[]
  propertyName: string
  className?: string
  size?: "small" | "medium" | "large"
}

export function PropertyImageGallery({ images, propertyName, className, size = "medium" }: PropertyImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  if (!images || images.length === 0) {
    const sizeClasses = {
      small: "aspect-video h-20",
      medium: "aspect-video h-32",
      large: "aspect-video h-48",
    }

    return (
      <div className={cn(sizeClasses[size], "bg-gray-100 rounded-lg flex items-center justify-center", className)}>
        <div className="text-center text-muted-foreground">
          <div className="w-8 h-8 mx-auto mb-2 bg-gray-200 rounded-lg flex items-center justify-center">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <p className="text-xs">No images</p>
        </div>
      </div>
    )
  }

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length)
  }

  const sizeClasses = {
    small: "aspect-video h-20",
    medium: "aspect-video h-32",
    large: "aspect-video h-48",
  }

  return (
    <div className={className}>
      {/* Main Image */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <div className="relative cursor-pointer group">
            <div className={cn(sizeClasses[size], "rounded-lg overflow-hidden bg-gray-100 border")}>
              <img
                src={images[0] || "/placeholder.svg"}
                alt={`${propertyName} - Main image`}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
            </div>
            {images.length > 1 && (
              <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                +{images.length - 1} more
              </div>
            )}
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded-lg flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 px-3 py-1 rounded text-sm font-medium">
                View Gallery
              </div>
            </div>
          </div>
        </DialogTrigger>

        <DialogContent className="max-w-4xl w-full p-0">
          <div className="relative">
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 z-10 bg-black/50 text-white hover:bg-black/70"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>

            {/* Main Image Display */}
            <div className="relative aspect-video bg-black">
              <img
                src={images[selectedImage] || "/placeholder.svg"}
                alt={`${propertyName} - Image ${selectedImage + 1}`}
                className="w-full h-full object-contain"
              />

              {/* Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                    onClick={nextImage}
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </>
              )}

              {/* Image Counter */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded text-sm">
                {selectedImage + 1} / {images.length}
              </div>
            </div>

            {/* Thumbnail Strip */}
            {images.length > 1 && (
              <div className="p-4 bg-gray-50 max-h-24 overflow-hidden">
                <div className="flex gap-2 overflow-x-auto">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={cn(
                        "flex-shrink-0 w-16 h-16 rounded overflow-hidden border-2 transition-colors",
                        selectedImage === index ? "border-primary" : "border-transparent",
                      )}
                    >
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`${propertyName} - Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Small Thumbnail Grid (for property cards) */}
      {images.length > 1 && size !== "small" && (
        <div className="grid grid-cols-4 gap-1 mt-2">
          {images.slice(1, 5).map((image, index) => (
            <div key={index} className="aspect-square rounded overflow-hidden bg-gray-100 h-12">
              <img
                src={image || "/placeholder.svg"}
                alt={`${propertyName} - Image ${index + 2}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
