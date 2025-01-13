"use client"

import clsx from "clsx"
import { Heart } from "lucide-react"
import { usePathname } from "next/navigation"
import React, { useState } from "react"

export default function ButtonLike({
  variant = "default",
  routeId,
  liked,
}: {
  variant: "default" | "complex"
  routeId: string
  liked: boolean
}) {
  const [isLiked, setIsLiked] = useState(liked)
  const path = usePathname()

  async function handleLike() {
    const response = await fetch("/api/handleLike", {
      method: "POST",
      body: JSON.stringify({
        routeId: routeId,
        pathName: path,
      }),
    })

    // const data = await response.json()

    if (response.ok) {
      if (response.status === 200) {
        setIsLiked(false)
      }

      if (response.status === 201) {
        setIsLiked(true)
      }
    }
  }

  const icons = {
    default: (
      <Heart
        className={`w-5 h-5 ${
          isLiked ? "fill-red-500 text-red-500" : "text-gray-600"
        }`}
      />
    ),

    complex: (
      <Heart
        className={`w-6 h-6 ${
          isLiked ? "fill-red-500 text-red-500" : "text-gray-600"
        }`}
      />
    ),
  }

  return (
    <button
      className={clsx("bg-red-5 00", {
        "absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors":
          variant === "default",
        "p-2 hover:bg-gray-100 rounded-full": variant === "complex",
      })}
      onClick={handleLike}
    >
      {icons[variant]}
    </button>
  )
}
