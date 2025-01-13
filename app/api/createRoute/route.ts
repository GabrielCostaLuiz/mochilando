/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/lib/prisma"
import { NextResponse, type NextRequest } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { routeData } = await request.json()

    let path = await prisma.path.findFirst({
      where: {
        AND: [
          { origin: routeData.path.origin },
          { destination: routeData.path.destination },
        ],
      },
      include: {
        routes: true,
      },
    })

    if (!path) {
      path = await prisma.path.create({
        data: {
          origin: routeData.path.origin,
          destination: routeData.path.destination,
        },
        include: {
          routes: true,
        },
      })
    }

    const newRoute = await prisma.route.create({
      data: {
        title: routeData.title,
        pathId: path.id,
        description: routeData.description,
        groupIdPinataImages: routeData.groupIdPinataImages,
        routeDetails: {
          create: routeData.transportSteps.map((data: any) => ({
            title: data.title,
            price: parseFloat(data.price),
            duration: data.duration,
            details: data.details,
          })),
        },
        steps: {
          create: routeData.steps.map((step: any) => ({
            title: step.title,
            description: step.description,
          })),
        },
        minPrice: parseFloat(routeData.minPrice),
        maxPrice: parseFloat(routeData.maxPrice),
        tips: routeData.tips,
        placeholderUrl: routeData.placeholderUrl,
        userId: routeData.userId,
        photos: routeData.photos
          ? {
              create: routeData.photos.map((url: { url: string }) => ({
                url: [url.url],
                userId: routeData.userId,
              })),
            }
          : undefined,
      },
      include: {
        path: {
          include: {
            routes: true,
          },
        },
        photos: true,
        routeDetails: true,
        steps: true,
      },
    })

    // await prisma.path.update({
    //   where: {
    //     id: path.id,
    //   },
    //   data: {
    //     routes: {
    //       connect: {
    //         id: newRoute.id,
    //       },
    //     },
    //   },
    //   include: {
    //     routes: true,
    //   },
    // })

    return NextResponse.json(
      {
        success: true,
        data: newRoute,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Error creating route:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create route",
      },
      { status: 500 }
    )
  }
}
