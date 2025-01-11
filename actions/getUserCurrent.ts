import { prisma } from "@/lib/prisma"

export default async function GetUserpRI() {
  const user = await prisma.user.findFirst({
    where: {
      email: "gabrielbragacostaluiz@gmail.com",
    },
  })
  return user
}
