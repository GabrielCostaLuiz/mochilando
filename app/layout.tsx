import { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import Head from "next/head"

// Importing fonts with correct variables
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})


export const metadata: Metadata = {
  title: {
    default: "Mochilando - Viagens Econômicas",
    template: "%s | Mochilando - Viagens Econômicas",
  },
  description: "Mochilando: Roteiros econômicos para sua próxima aventura",
  openGraph: {
    title: "Mochilando - Viagens Econômicas",
    description:
      "Encontre os melhores roteiros de viagem baratos e dicas para curtir com pouco dinheiro",
    images: [
      {
        url: "/images/og-image.jpg",  
        width: 1200,
        height: 630,
        alt: "Mochilando - Viagens Econômicas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@MochilandoApp",
    title: "Mochilando - Viagens Econômicas",
    description:
      "Encontre os melhores roteiros de viagem baratos e dicas para curtir com pouco dinheiro",
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <Head>
        <meta name="apple-mobile-web-app-title" content="Mochilando" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
