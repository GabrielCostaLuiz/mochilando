import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const roles = await prisma.role.findMany()

    return NextResponse.json({ roles }, { status: 200 })
  } catch (error) {
    console.error("Erro ao buscar roles:", error)
    return NextResponse.json(
      { message: "Erro ao buscar roles" },
      { status: 500 }
    )
  }
}
