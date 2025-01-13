
import NextAuth from "next-auth"

// import { firebaseCert } from "../firebase/firebase"
// import { FirebaseAdapter } from "@next-auth/firebase-adapter"
// import client from "@/lib/db"
import { PrismaAdapter } from "@auth/prisma-adapter"

import { authConfig } from "./auth.config"
import { prisma } from "@/lib/prisma"


export async function getUserId(email: string) {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
    select: {
      id: true,
    },
    // cacheStrategy: { swr: 60, ttl: 60 },
  })

  return user?.id
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt", maxAge: 604800 },
  pages: {
    signIn: "/auth/signin",
  },
  events: {
    createUser: async ({ user }) => {
      console.log("usuario criado ", user)
    },
    signOut: async ({}) => {
      console.log("saindo do app")
    },
  },
  //   linkAccount: async ({ account, profile, user }) => {
  //     console.log("Profile", profile)
  //     console.log("Conta vinculada ao usuário:", user.id)
  //     console.log("Detalhes da conta vinculada:", account)

  //     if (user?.id) {
  //       try {
  //         await prisma.account.create({
  //           data: {
  //             provider: account.provider,
  //             providerAccountId: account.providerAccountId,
  //             type: account.type,
  //             access_token: account.access_token,
  //             expires_at: account.expires_at,
  //             token_type: account.token_type,
  //             scope: account.scope,
  //             id_token: account.id_token,
  //             session_state: profile.id,
  //             userId: user.id, // Certifique-se de que o userId seja uma string válida
  //           },
  //         });

  //         console.log(
  //           `Conta do provedor "${account.provider}" vinculada ao usuário "${user.id}".`
  //         );
  //       } catch (error) {
  //         console.error("Erro ao salvar informações da conta vinculada:", error);
  //       }
  //     } else {
  //       console.error("Erro: usuário não possui ID.");
  //     }
  //   },
  // },
  
  //   callbacks: {
  //     jwt({ token, user,account,profile,session,trigger }) {
  //       console.log("token", token)
  //       console.log("user", user)
  //       console.log("account", account)
  //       console.log("profile", profile)
  //       console.log("session", session)
  //       console.log("trigger",trigger)
  //       if (user) {
  //         // User is available during sign-in
  //         token.sub = user.id
  //       }
  //       return token
  //     },
  //     session({ session, user }) {
  //       session.user.id = user.id
  //       return session
  //     },

  // },
  callbacks: {
    async session({ session }) {
      const userId = await getUserId(session.user.email)
      return {
        ...session,
        user: {
          ...session.user,
          id: userId,
        },
      }
    },
  },

  ...authConfig,
})
