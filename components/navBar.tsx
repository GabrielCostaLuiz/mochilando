/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import FormLogout from "./formLogout"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

export default function NavBar() {
  const [image, setImage] = useState("/avatarDefault.png")
  const { data: session } = useSession()
  const path = usePathname()
  const router = useRouter()

  useEffect(() => {
    if (session?.user?.image) {
      setImage(session.user.image)
    }
  }, [session])

  async function handleLogoutGoogle(e: any) {
    e.preventDefault()

    await fetch("/api/auth/logout")

    router.push("/")
  }

  return (
    <nav
      className={`bg-white border-b ${
        path.includes("itineraries") && "hidden"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/explorer" className="text-xl font-bold text-blue-600">
            Explorar
          </Link>

          {session ? (
            <div className="w-8 h-8 bg-gray-200 rounded-full">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage src={image} width={100} height={100} />
                    <AvatarFallback>
                      {session?.user?.name?.slice(0, 2) ?? "A"}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link
                      href={`/profile/${session.user?.id}`}
                      aria-label="Entre no seu perfil"
                      className="w-full"
                    >
                      Perfil
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <FormLogout logout={handleLogoutGoogle} />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div>
              <Link
                href="/auth/signin"
                className=" px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                aria-label="Entre na sua conta"
              >
                Fazer Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
