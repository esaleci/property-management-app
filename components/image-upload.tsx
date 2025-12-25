"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { X, Upload } from "lucide-react"
import { cn } from "@/lib/utils"

interface ImageUploadProps {
  value: string[]
  onChange: (images: string[]) => void
  maxImages?: number
  className?: string
}

export function ImageUpload({ value = [], onChange, maxImages = 10, className }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (value.length + acceptedFiles.length > maxImages) {
        alert(`Maximum ${maxImages} images allowed`)
        return
      }

      setIsUploading(true)

      try {
        // Convert files to base64 URLs for demo purposes
        // In a real app, you would upload to a cloud storage service
        const newImages = await Promise.all(
          acceptedFiles.map((file) => {
            return new Promise<string>((resolve) => {
              const reader = new FileReader()
              reader.onload = () => resolve(reader.result as string)
              reader.readAsDataURL(file)
            })
          }),
        )

        onChange([...value, ...newImages])
      } catch (error) {
        console.error("Error uploading images:", error)
      } finally {
        setIsUploading(false)
      }
    },
    [value, onChange, maxImages],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    multiple: true,
    disabled: isUploading || value.length >= maxImages,
  })

  const removeImage = (index: number) => {
    const newImages = value.filter((_, i) => i !== index)
    onChange(newImages)
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Upload Area */}
      <Card
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed cursor-pointer transition-colors",
          isDragActive && "border-primary bg-primary/5",
          (isUploading || value.length >= maxImages) && "cursor-not-allowed opacity-50",
        )}
      >
        <CardContent className="flex flex-col items-center justify-center p-6 text-center">
          <input {...getInputProps()} />
          <Upload className="h-10 w-10 text-muted-foreground mb-4" />
          <div className="space-y-2">
            <p className="text-sm font-medium">
              {isDragActive ? "Drop images here" : "Click to upload or drag and drop"}
            </p>
            <p className="text-xs text-muted-foreground">PNG, JPG, JPEG, WEBP up to 10MB each</p>
            <p className="text-xs text-muted-foreground">
              {value.length}/{maxImages} images uploaded
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Image Preview Grid - Much smaller thumbnails */}
      {value.length > 0 && (
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">
          {value.map((image, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square rounded-md overflow-hidden bg-gray-100 border">
                <img
                  src={image || "/placeholder.svg"}
                  alt={`Property image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute -top-2 -right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg z-10"
                onClick={() => removeImage(index)}
              >
                <X className="h-3 w-3" />
              </Button>
              {/* Image number indicator */}
              <div className="absolute bottom-1 left-1 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                {index + 1}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Status */}
      {isUploading && (
        <div className="flex items-center justify-center p-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          <span className="ml-2 text-sm text-muted-foreground">Uploading images...</span>
        </div>
      )}
    </div>
  )
}
