"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

interface Photo {
  src: string
  alt: string
  date?: string
  location?: string
}

interface PhotoGalleryProps {
  photos?: Photo[]
  title?: string
}

export function PhotoGallery({
  photos = [],
  title = "摄影作品"
}: PhotoGalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)

  // 如果没有提供照片，使用默认照���
  const defaultPhotos: Photo[] = Array.from({ length: 10 }, (_, i) => ({
    src: `/photos/photo-${i + 1}.jpg`,
    alt: `照片 ${i + 1}`,
  }))

  const displayPhotos = photos.length > 0 ? photos : defaultPhotos

  return (
    <section className="py-12 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
        {displayPhotos.map((photo, index) => (
          <Card
            key={index}
            className="overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 aspect-square"
            onClick={() => setSelectedPhoto(photo)}
          >
            <CardContent className="p-0 h-full relative">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
              />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Lightbox */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full">
            <Image
              src={selectedPhoto.src}
              alt={selectedPhoto.alt}
              width={1200}
              height={800}
              className="w-full h-auto object-contain"
            />
            <button
              className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/70"
              onClick={() => setSelectedPhoto(null)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            {(selectedPhoto.date || selectedPhoto.location) && (
              <div className="absolute bottom-4 left-4 right-4 text-white bg-black/50 rounded-lg p-3">
                {selectedPhoto.location && (
                  <p className="text-sm">📍 {selectedPhoto.location}</p>
                )}
                {selectedPhoto.date && (
                  <p className="text-sm">📅 {selectedPhoto.date}</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
