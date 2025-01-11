import { prisma } from "@/lib/prisma"
import { NextResponse, type NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const email = searchParams.get("email")
  try {
    // Consulta no banco de dados pelo e-mail
    const prismaUser = await prisma.user.findFirst({
      where: {
        email: email,
      },
    })

    if (!prismaUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }



    // Retorna os dados do usuário autenticado e do Prisma
    return NextResponse.json({
      message: "User authenticated successfully",
      prismaUser,
    })
  } catch (error) {
    console.error("Erro no endpoint GET:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
