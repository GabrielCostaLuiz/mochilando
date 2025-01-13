/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import Image from "next/image"
import { useState } from "react"

export default function Carousel({ images }: any) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const photos = images || []

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length) // Vai para a próxima imagem
  }

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? photos.length - 1 : prevIndex - 1
    )
  }
  return (
    <div className="relative w-full overflow-hidden rounded-xl">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`, // Move o carrossel
        }}
      >
        {photos.map((photo: any, index: any) => (
          <div
            key={photo.id}
            className="flex-shrink-0 w-full"
            style={{ width: "100%" }}
          >
            <Image
              src={photo.url[0]}
              width={400}
              crossOrigin="anonymous"
              height={400}
              className="w-full h-96 object-cover bg-center"
              alt={`Foto ${index + 1} do roteiro`}
            />
          </div>
        ))}
      </div>

      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10 hover:bg-opacity-75"
      >
        &larr;
      </button>
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10 hover:bg-opacity-75"
      >
        &rarr;
      </button>
    </div>
  )
}
