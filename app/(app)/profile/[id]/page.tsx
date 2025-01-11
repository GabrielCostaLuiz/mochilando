import React from "react"
import { Heart, MessageSquare, Plus, Edit } from "lucide-react"
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
                    src={session?.user?.image ?? "/avatarDefault.png"}
                    alt="Profile"
                    width={400}
                    height={400}
                    priority
                    className="w-full h-full object-cover"
                  />
                </div>
                <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700">
                  <Edit className="h-4 w-4" />
                </button>
              </div>

              <div className="text-center md:text-left">
                <h1 className="text-2xl font-bold text-gray-900 capitalize">
                  {session?.user?.name}
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
                Criar Novo Roteiro/Role
              </Link>
            )}
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Heart className="h-5 w-5 mr-2 text-red-500" />
                Meus Favoritos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* {user.favorites.map((favorite) => (
                  <div
                    key={favorite.id}
                    className="border rounded-lg p-4 hover:bg-gray-50"
                  >
                    <Link href={`/itineraries/${favorite.id}`} passHref>
                      <div className="flex justify-between items-center">
                        <h3 className="font-semibold">{favorite.title}</h3>
                        <div className="flex space-x-4 text-gray-600">
                          <span className="flex items-center">
                            <Heart className="h-4 w-4 mr-1" />
                            {favorite.likes}
                          </span>
                          <span className="flex items-center">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            {favorite.comments}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))} */}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="h-5 w-5 mr-2 text-blue-500" />
                Histórico de Comentários
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* {user.comments.map((comment) => (
                  <div key={comment.id} className="border rounded-lg p-4">
                    <p className="text-gray-700">{comment.text}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm text-gray-500">
                        {comment.date}
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
                ))} */}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
