"use server"

import { auth } from "@/lib/authjs/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

// import { prisma } from "@/lib/prisma"

// export default async function GetRoles() {
//   const roles = await prisma.role.findMany()
//   console.log(roles)
//   return roles
// }

export default async function handleComment(content: string, routeId: string) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      throw new Error("Usuário não autenticado.")
    }

    const comment = await prisma.comment.create({
      data: {
        content: content,
        userId: session.user.id,
        routeId: routeId,
      },
    })

    revalidatePath(`/rota/${routeId}`)

    return comment
  } catch (error) {
    console.error("Erro ao adicionar comentário:", error)

    throw new Error(
      "Não foi possível adicionar o comentário. Tente novamente mais tarde."
    )
  }
}
