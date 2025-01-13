'use client'
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {

    const router = useRouter()

  return (
    <button
      onClick={() => router.back()}
      className="p-2 hover:bg-gray-100 rounded-full"
    >
      <ChevronLeft className="w-6 h-6" />
    </button>
  )
}
