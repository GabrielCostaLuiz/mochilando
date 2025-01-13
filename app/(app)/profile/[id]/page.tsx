import React from "react"
import { Heart, MessageSquare, Plus, Route, Star } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { auth } from "@/lib/authjs/auth"
import { prisma } from "@/lib/prisma"

type Params = Promise<{ id: string }>

async function getUser(id: string) {
  const userDb = await prisma.user.findUnique({
    where: {
      id: id,
    },
    include: {
      routes: {
        include: {
          comments: true,
        },
      },
      savedRoutes: {
        include: {
          route: {
            include: {
              comments: true,
            },
          },
        },
      },
      comments: {
        include: {
          route: true,
        },
      },
    },
  })

  return userDb
}

export async function generateMetadata({ params }: { params: Params }) {
  const { id } = await params

  const user = await getUser(id)

  return {
    title: user!.name,
    description: `Perfil de ${user!.name}`,
    openGraph: {
      title: user!.name,
      description: `Perfil de ${user!.name}`,
      images: [
        {
          url: user!.image!,
          width: 1200,
          height: 630,
        },
      ],
    },
  }
}

export default async function Profile({ params }: { params: Params }) {
  const { id } = await params
  const userDb = await getUser(id)

  const formattedDate = new Date(userDb!.createdAt).toLocaleDateString(
    "pt-BR",
    {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }
  )
  const session = await auth()

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-900">
                  Você não está logado
                </h1>
                <p className="text-gray-500 mt-2">
                  Para acessar essa página, você precisa estar logado.
                </p>
                <Link
                  href="/auth/signin"
                  className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Fazer Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="flex flex-col md:flex-row items-center space-x-0 md:space-x-6 mb-6">
              <div className="relative mb-4 md:mb-0">
                <div className="w-32 h-32 rounded-full border-4 border-yellow-400 overflow-hidden">
                  <Image
                    src={userDb?.image ?? "/avatarDefault.png"}
                    alt="Profile"
                    width={400}
                    height={400}
                    priority
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700">
                  <Edit className="h-4 w-4" />
                </button> */}
              </div>

              <div className="text-center md:text-left">
                <h1 className="text-2xl font-bold text-gray-900 capitalize">
                  {userDb?.name ?? "Usuário"}
                </h1>
                {/* <div className="flex items-center justify-center md:justify-start text-gray-600 mt-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{user.location}</span>
                </div> */}
                <p className="text-gray-500 mt-1">
                  Membro desde {formattedDate}
                </p>
              </div>
            </div>

            {session?.user?.id === id && (
              <Link
                href={`/itineraries/${id}/create`}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 flex items-center justify-center"
              >
                <Plus className="h-5 w-5 mr-2" />
                Criar Novo Roteiro
              </Link>
            )}
          </div>

          {session?.user?.id === id && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="h-5 w-5 mr-2 text-red-500" />
                  Meus Favoritos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userDb?.savedRoutes && userDb.savedRoutes.length > 0 ? (
                    <>
                      {userDb?.savedRoutes.map((favorite) => (
                        <div
                          key={favorite.id}
                          className="border rounded-lg p-4 hover:bg-gray-50"
                        >
                          <Link href={`/itineraries/${favorite.route.id}`} passHref>
                            <div className="flex justify-between items-center">
                              <h3 className="font-semibold">
                                {favorite.route.title}
                              </h3>
                              <div className="flex space-x-4 text-gray-600">
                                <span className="flex items-center">
                                  <Heart className="h-4 w-4 mr-1" />
                                  {favorite.route.likes}
                                </span>
                                <span className="flex items-center">
                                  <MessageSquare className="h-4 w-4 mr-1" />
                                  {favorite.route.comments.length}
                                </span>
                              </div>
                            </div>
                          </Link>
                        </div>
                      ))}
                    </>
                  ) : (
                    <p className="text-gray-500">
                      Você ainda não tem nenhum roteiro favorito.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Route className="h-5 w-5 mr-2 text-green-500" />
                {session?.user?.id === id
                  ? "Meus Roteiros"
                  : `Roteiros de ${userDb?.name}`}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userDb?.routes && userDb.routes.length > 0 ? (
                  <>
                    {userDb?.routes.map((routes) => (
                      <div
                        key={routes.id}
                        className="border rounded-lg p-4 hover:bg-gray-50"
                      >
                        <Link href={`/itineraries/${routes.id}`} passHref>
                          <div className="flex justify-between items-center">
                            <h3 className="font-semibold">{routes.title}</h3>
                            <div className="flex space-x-4 text-gray-600">
                              <span className="flex items-center">
                                <Heart className="h-4 w-4 mr-1" />
                                {routes.likes}
                              </span>
                              <span className="flex items-center">
                                <MessageSquare className="h-4 w-4 mr-1" />
                                {routes.comments.length}
                              </span>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </>
                ) : (
                  <p className="text-gray-500">
                    {session?.user?.id === id
                      ? "Você ainda não criou nenhum roteiro."
                      : `O ${userDb?.name} ainda não criou nenhum roteiro.`}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {session?.user?.id === id && (
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageSquare className="h-5 w-5 mr-2 text-blue-500" />
                    Histórico de Comentários
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userDb?.comments && userDb.comments.length > 0 ? (
                      <>
                        {userDb?.comments.map((comment) => (
                          <div
                            key={comment.id}
                            className="border rounded-lg p-4"
                          >
                            <Link href={`/itineraries/${comment.routeId}`}>
                              <p className="text-blue-600">
                                Roteiro: {comment.route?.title}
                              </p>
                            </Link>
                            <p className="text-gray-700"> {comment.content}</p>
                            <div className="flex justify-between items-center mt-2">
                              <span className="text-sm text-gray-500">
                                {new Date(comment.createdAt).toLocaleDateString(
                                  "pt-BR",
                                  {
                                    day: "2-digit",
                                    month: "long",
                                    year: "numeric",
                                  }
                                )}
                              </span>
                              <div className="flex space-x-2">
                                <Star className="h-4 w-4 text-yellow-400" />
                                <Star className="h-4 w-4 text-yellow-400" />
                                <Star className="h-4 w-4 text-yellow-400" />
                                <Star className="h-4 w-4 text-yellow-400" />
                                <Star className="h-4 w-4 text-yellow-400" />
                              </div>
                            </div>
                          </div>
                        ))}
                      </>
                    ) : (
                      <p className="text-gray-500">
                        Você ainda não fez nenhum comentário.
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/*
               #TODO : Adicionar o histórico de comentários primeiro os 3 primeiros e depois um botão para ver mais
               */}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
