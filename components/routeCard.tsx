/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Clock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import ButtonLike from "./buttonLike"
import { useSession } from "next-auth/react"

export default function RouteCard({ route }: any) {
  let duration = 0

  route?.routeDetails?.forEach((transport: any) => {
    const [hours, minutes] = transport.duration.split(":").map(Number)
    const totalMinutes = hours * 60 + minutes
    duration += totalMinutes
  })

  // const totalHours = Math.floor(duration / 60)
  // const totalMinutes = duration % 60

  // const formattedDuration = `${String(totalHours).padStart(2, "0")}:${String(
  //   totalMinutes
  // ).padStart(2, "0")}h`

  const createdAtFormatted = new Date(route!.createdAt).toLocaleDateString(
    "pt-BR",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  )
  const { data: session } = useSession()

  const isLiked = route.savedBy.filter(
    (saved: any) => saved.userId === session?.user?.id
  )

  return (
    <div
      key={route.id}
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow "
    >
      <div className="relative">
        <Image
          src={route.placeholderUrl}
          alt={route.title}
          width={400}
          crossOrigin="anonymous"
          height={400}
          className="w-full h-48 object-cover rounded-t-xl"
        />
        <ButtonLike
          routeId={route.id}
          variant="default"
          liked={isLiked.length > 0 ? true : false}
        />

        {/* <div className="absolute bottom-4 left-4 flex gap-2">
           {route.tags.map((tag, i) => (
             <span
               key={i}
               className="bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm"
             >
               {tag}
             </span>
           ))} 
        </div> */}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2">{route.title}</h3>
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {createdAtFormatted}
          </div>
          {/* <div className="flex items-center gap-1">
            <Bus className="w-4 h-4" />
            {route.transport}
          </div> */}
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-600">A partir de</div>
            <div className="text-lg font-bold text-blue-600">
              R${route.minPrice.toFixed(2)}
            </div>
          </div>
          <Link
            href={`/itineraries/${route.id}`}
            className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Ver Detalhes
          </Link>
        </div>
      </div>
    </div>
  )
}
