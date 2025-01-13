/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react"
import {
  MapPin,

  Clock,
  DollarSign,


  Star,

} from "lucide-react"
import Image from "next/image"

import { prisma } from "@/lib/prisma"
import BackButton from "@/components/backButton"
import Link from "next/link"
import Carousel from "@/components/carousel"
import ButtonLike from "@/components/buttonLike"
import InputComment from "@/components/inputComment"
import { auth } from "@/lib/authjs/auth"

type Params = Promise<{ id: string }>

async function getRoute(id: string) {
  const routeDetails = await prisma.route.findUnique({
    where: {
      id: id,
    },
    include: {
      user: true,
      routeDetails: true,
      photos: true,
      steps: true,
      savedBy: true,
      comments: {
        include: {
          user: true,
        },
      },
    },
  })

  return routeDetails
}

export async function generateMetadata({ params }: { params: Params }) {
  const { id } = await params

  const itineraries = await getRoute(id)

  return {
    title: itineraries!.title,
    description: `Roteiro para ir de ${itineraries!.title}`,
    openGraph: {
      title: itineraries!.title,
      description: `Roteiro para ir de ${itineraries!.title}`,
      images: [
        {
          url: itineraries!.placeholderUrl,
          width: 1200,
          height: 630,
        },
      ],
    },
  }
}

export default async function RouteDetails({ params }: { params: Params }) {
  const { id } = await params
  const route = await getRoute(id)
  const session = await auth()

  // let duration = 0

  // route?.routeDetails?.forEach((transport) => {
  //   const [hours, minutes] = transport.duration.split(":").map(Number) // Separar horas e minutos
  //   const totalMinutes = hours * 60 + minutes // Converter horas para minutos e somar
  //   duration += totalMinutes // Somar a duração atual com a acumulada
  // })

  // const totalHours = Math.floor(duration / 60)
  // const totalMinutes = duration % 60

  // const formattedDuration = `${String(totalHours).padStart(2, "0")}:${String(
  //   totalMinutes
  // ).padStart(2, "0")}h`
  // console.log(formattedDuration)

  const createdAtFormatted = new Date(route!.createdAt).toLocaleDateString(
    "pt-BR",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  )

  const findShortestDuration = (route: any) => {
    if (!route?.routeDetails?.length) return null; 
  
    const shortestDuration = route.routeDetails.reduce((minDuration: any, transport: any) => {
      const [hours, minutes] = transport.duration.split(":").map(Number); 
      const totalMinutes = hours * 60 + minutes; 
  
      return totalMinutes < minDuration ? totalMinutes : minDuration; 
    }, Infinity); 

    const totalHours = Math.floor(shortestDuration / 60);
  const remainingMinutes = shortestDuration % 60;

  const formattedDuration = `${String(totalHours).padStart(2, "0")}:${String(
    remainingMinutes
  ).padStart(2, "0")}h`;

  return formattedDuration;
};

const shortestDuration = findShortestDuration(route);



  // const [isLiked, setIsLiked] = useState(false)

  // const route = {
  //   id: 1,
  //   title: "São Paulo → Rio de Janeiro",
  //   description:
  //     "Um roteiro econômico e prático para ir de São Paulo ao Rio de Janeiro usando apenas transporte público. Ideal para viajantes que buscam economia sem abrir mão do conforto.",
  //   author: "Marina Silva",
  //   authorImage: "/api/placeholder/40/40",
  //   rating: 4.8,
  //   reviews: 234,
  //   duration: "8h",
  //   totalCost: "R$ 280",
  //   date: "Atualizado em 15 jan 2025",
  //   images: [
  //     "/api/placeholder/800/400",
  //     "/api/placeholder/800/400",
  //     "/api/placeholder/800/400",
  //   ],
  //   transportTips: [
  //     {
  //       title: "Ônibus Executivo",
  //       price: "R$ 120",
  //       duration: "6h",
  //       details: "Saídas a cada 30 minutos do Terminal Tietê",
  //     },
  //     {
  //       title: "Metrô + Transfer",
  //       price: "R$ 25",
  //       duration: "1h",
  //       details: "Linha azul até a estação central",
  //     },
  //   ],
  //   steps: [
  //     {
  //       title: "Saída de São Paulo",
  //       description:
  //         "Pegue o ônibus no Terminal Tietê, plataforma 15. Compre o bilhete com antecedência para melhores preços.",
  //     },
  //     {
  //       title: "Chegada no Rio",
  //       description:
  //         "Desembarque na Rodoviária Novo Rio e pegue o metrô na estação próxima.",
  //     },
  //   ],
  //   tips: [
  //     "Compre as passagens com antecedência para economia de até 40%",
  //     "Evite horários de pico para maior conforto",
  //     "Tenha dinheiro trocado para pequenas despesas",
  //     "Download do mapa offline do Google Maps é recomendado",
  //   ],
  //   comments: [
  //     {
  //       id: 1,
  //       user: "João Pedro",
  //       avatar: "/api/placeholder/40/40",
  //       date: "2 dias atrás",
  //       content:
  //         "Segui esse roteiro na semana passada e foi perfeito! Economia real e dicas muito úteis.",
  //       likes: 12,
  //     },
  //     {
  //       id: 2,
  //       user: "Ana Clara",
  //       avatar: "/api/placeholder/40/40",
  //       date: "5 dias atrás",
  //       content:
  //         "As dicas de horário foram excelentes. Consegui passagens bem em conta!",
  //       likes: 8,
  //     },
  //   ],
  // }

  // const router = useRouter()

  // const steps = [
  //   {
  //     title: "Saída de São Paulo",
  //     description:
  //       "Pegue o ônibus no Terminal Tietê, plataforma 15. Compre o bilhete com antecedência para melhores preços.",
  //   },
  //   {
  //     title: "Chegada no Rio",
  //     description:
  //       "Desembarque na Rodoviária Novo Rio e pegue o metrô na estação próxima.",
  //   },
  // ]

  const isLiked = route?.savedBy.filter(
    (saved) => saved.userId === session?.user?.id
  )


  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <BackButton />
            <div className="flex items-center gap-4">
              {/* <button className="p-2 hover:bg-gray-100 rounded-full">
                <Share2 className="w-6 h-6" />
              </button> */}
              {/* <button
                className="p-2 hover:bg-gray-100 rounded-full"
                onClick={() => setIsLiked(!isLiked)}
              >
                <Heart
                  className={`w-6 h-6 ${
                    isLiked ? "fill-red-500 text-red-500" : "text-gray-600"
                  }`}
                />
              </button> */}
              <ButtonLike
                routeId={route!.id}
                variant="complex"
                liked={isLiked && isLiked.length > 0 ? true : false}
              />
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 py-6">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-blue-600 mb-2">
            <MapPin className="w-5 h-5" />
            <span className="text-sm font-medium">{route?.title}</span>
          </div>
          <h1 className="text-2xl font-bold mb-4">
            Roteiro Econômico: {route?.title}
          </h1>
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              Média de {shortestDuration}
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="w-4 h-4" />
              Entre R${route?.minPrice?.toFixed(2)} à R${route?.maxPrice?.toFixed(2)}
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4" fill="currentColor" />
              {route?.likes} (likes)
            </div>
          </div>
        </div>

        <div className="mb-8">
          {/* <div className="grid grid-cols-[repeat(auto-fit,minmax(10rem,1fr))] gap-2 rounded-xl overflow-hidden"> */}
          <div>
            {/* {route?.photos.map((photo, index) => (
              <Image
                key={photo.id}
                src={photo.url[0]}
                width={400}
                height={400}
                className="w-full h-96 object-cover "
                alt={`Foto ${index + 1} do roteiro ${route.title}`}
              />
            ))} */}
            <Carousel images={route?.photos} />
          </div>
        </div>

        <div className="flex items-center gap-3 mb-8">
          <Link href={`/profile/${route?.user.id}`} className="flex gap-2">
            <Image
              src={route?.user.image ?? "/avatarDefault.png"}
              width={400}
              height={400}
              className="w-10 h-10 rounded-full"
              alt={`Foto do ${route?.user.name}`}
            />
            <div>
              <p className="font-medium">{route?.user.name}</p>
              <p className="text-sm text-gray-600">{createdAtFormatted}</p>
            </div>
          </Link>
        </div>

        <div className="bg-white rounded-xl p-6 mb-6">
          <h2 className="text-lg font-bold mb-4">Sobre o Roteiro</h2>
          <p className="text-gray-600 mb-6">{route?.description}</p>

          <h3 className="font-bold mb-4">Opções de Transporte</h3>
          <div className="space-y-4 mb-6">
            {route?.routeDetails.map((tip, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-slate-200 rounded-lg "
              >
                <div>
                  <h4 className="font-medium">{tip.title}</h4>
                  <p className="text-sm text-gray-600">{tip.details}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-blue-600">
                    R${tip.price.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-600">{tip.duration}h</p>
                </div>
              </div>
            ))}
          </div>

          <h3 className="font-bold mb-4">Passo a Passo</h3>
          <div className="space-y-4 mb-6">
            {route?.steps.map((step, index) => (
              <div key={index} className="border-l-2 border-blue-600 pl-4">
                <h4 className="font-medium mb-2">{step.title}</h4>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            ))}
          </div>

          {route?.tips && route.tips.length > 0 && (
            <>
              <h3 className="font-bold mb-4">Dicas Importantes</h3>
              <ul className="space-y-2 mb-6">
                {route?.tips.map((tip, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-gray-600"
                  >
                    <div className="w-5 h-5 mt-0.5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 text-sm">{index + 1}</span>
                    </div>
                    {tip}
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* <button className="w-full bg-yellow-400 text-gray-800 py-3 rounded-lg font-medium hover:bg-yellow-500 transition-colors flex items-center justify-center gap-2">
            <Download className="w-5 h-5" />
            Salvar PDF
          </button> */}
        </div>

        <div className="bg-white rounded-xl p-6">
          <h2 className="text-lg font-bold mb-6">Comentários</h2>
          <div className="space-y-6">
            {route?.comments.map((comment) => (
              <div
                key={comment.id}
                className="border-b last:border-0 pb-6 last:pb-0"
              >
                <div className="flex items-start gap-3">
                  <Image
                    src={comment.user.image ?? "/avatarDefault.png"}
                    width={400}
                    height={400}
                    className="w-10 h-10 rounded-full"
                    alt={comment.user.name ?? "Imagem avatar default"}
                  />
                  <div className="flex-grow">
                    <div className="flex items-center justify-between mb-2">
                      <Link href={`/profile/${comment.user.id}`}>
                        <h4 className="font-medium">{comment.user.name}</h4>
                      </Link>
                      <span className="text-sm text-gray-600">
                        {new Date(comment.createdAt).toLocaleDateString(
                          "pt-BR",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3">{comment.content}</p>
                    {/* <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600">
                      <ThumbsUp className="w-4 h-4" />
                      {comment.likes}
                    </button> */}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <InputComment idRoute={route!.id} />
        </div>
      </div>
    </div>
  )
}
