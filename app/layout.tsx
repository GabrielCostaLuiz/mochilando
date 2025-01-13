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
    type: "website",
    locale: "pt_BR",
    url: "https://mochilando.vercel.app/",
    siteName: "Mochilando - Viagens Econômicas",
    images: [
      {
        url: "https://mochilando.vercel.app/placeholder.png",
        width: 1200,
        height: 630,
        alt: "Mochilando - Viagens Econômicas",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    site: "https://mochilando.vercel.app/",
    title: "Mochilando - Viagens Econômicas",
    description:
      "Encontre os melhores roteiros de viagem baratos e dicas para curtir com pouco dinheiro",
    images: ["https://mochilando.vercel.app/placeholder.png"],
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
