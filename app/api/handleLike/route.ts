import { auth } from "@/lib/authjs/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { NextResponse, type NextRequest } from "next/server"

export async function POST(request: NextRequest) {
  const { routeId, pathName } = await request.json()

  const user = await auth()

  if (!user?.user?.id) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }

  const alredyLikeRoute = await prisma.savedRoute.findFirst({
    where: {
      routeId: routeId,
      userId: user.user.id,
    },
  })



  if (!alredyLikeRoute) {
    await prisma.savedRoute.create({
      data: {
        routeId: routeId,
        userId: user.user.id,
      },
    })

    await prisma.route.update({
      where: { id: routeId },
      data: { likes: { increment: 1 } },
    })

    revalidatePath(pathName)
    return NextResponse.json(
      { message: "Route saved successfully" },
      { status: 201 }
    )
  }

  if (alredyLikeRoute) {
    await prisma.savedRoute.delete({
      where: {
        id: alredyLikeRoute.id,
      },
    })

    await prisma.route.update({
      where: { id: routeId },
      data: { likes: { decrement: 1 } },
    })

    revalidatePath(pathName)
    return NextResponse.json(
      { message: "Route unsaved successfully", status: "204" },
      { status: 200 }
    )
  }
}
