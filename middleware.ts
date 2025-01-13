import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

import { authConfig } from "./lib/authjs/auth.config"
import NextAuth from "next-auth"

const urlWeb = process.env.URL_WEB

const { auth } = NextAuth(authConfig)

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith("/auth")) {
    const session = await auth()

    if (session) {
      return NextResponse.redirect(new URL("/explorer", request.url))
    }
  }

  if (pathname.startsWith("/profile")) {
    const session = await auth()
    if (!session) {
      return NextResponse.redirect(new URL("/auth/signin", request.url))
    }
  }

  if (pathname.startsWith("/itineraries/")) {
    const session = await auth()

    if (!session) {
      return NextResponse.redirect(new URL("/auth/signin", request.url))
    }

    const response = await fetch(
      `${urlWeb}/api/auth/getUserCurrent?email=${session.user?.email}`
    )
    const data = await response.json()

    const match = pathname.match(/^\/itineraries\/([^/]+)\/create$/)
    if (match) {
      const idFromPath = match[1]
      const sessionId = data.prismaUser.id

      if (idFromPath !== sessionId) {
        return NextResponse.redirect(
          new URL(`/itineraries/${sessionId}/create`, request.url)
        )
      }
    }
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
}
