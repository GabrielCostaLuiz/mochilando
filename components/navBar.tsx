"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function NavBar() {
  const path = usePathname()
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

          <div className="w-8 h-8 bg-gray-200 rounded-full">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/profile">Perfil</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  )
}
