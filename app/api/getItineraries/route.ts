import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const itineraries = await prisma.route.findMany({
      include: {
        routeDetails: true,
        savedBy: true,
      },
    })

    return NextResponse.json({ itineraries }, { status: 200 })
  } catch (error) {
    console.error("Erro ao buscar itineraries:", error)
    return NextResponse.json(
      { message: "Erro ao buscar itineraries" },
      { status: 500 }
    )
  }
}
