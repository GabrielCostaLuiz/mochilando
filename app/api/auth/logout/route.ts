import { signOut } from "@/lib/authjs/auth"
// import { cookies } from "next/headers"

export async function GET() {
  // await cookies()
  await signOut({ redirect: true, redirectTo: "/explorer" })
}
