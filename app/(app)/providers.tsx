import { auth } from "@/lib/authjs/auth"
import { prisma } from "@/lib/prisma"
import { SessionProvider } from "next-auth/react"

export default async function Providers({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (session) {
    const user = await prisma.user.findFirst({
      where: {
        email: session?.user?.email,
      },
      select: {
        id: true,
      },
      

    },
    
  )

    session.user!.id = user ? user.id : ""
  }

  return <SessionProvider session={session}>{children}</SessionProvider>
}
